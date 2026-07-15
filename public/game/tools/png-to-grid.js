#!/usr/bin/env node
/* png-to-grid.js — dev-only tool (not loaded by the game): slices a PNG into
   the ASCII pixel-grid format sprites.js uses (string rows + a letter->hex
   palette), so a store-bought sprite's shape can be hand-ported into the
   procedural renderer without shipping the PNG or switching to drawImage().
   Pure Node (only the built-in zlib module) — no npm install needed.

   Usage:
     node tools/png-to-grid.js <file.png> [options]

   Options:
     --x=0 --y=0        top-left of the first frame, in source pixels
     --w=W --h=H         frame size, in source pixels (default: whole image)
     --frames=1           number of frames to slice, left to right
     --gap=0              pixel gap between frames (e.g. spritesheet margins)
     --name=SPRITE         identifier used in the generated JS
     --alpha=128            alpha values below this become "." (transparent)
     --out=path.js          write to a file instead of stdout

   Only 8-bit PNGs are supported (color types 0/2/3/4/6) — re-export at
   8 bits/channel if the source file uses 16-bit channels. */
"use strict";
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

function parseArgs(argv) {
  const args = { _: [] };
  argv.forEach(function (a) {
    const m = /^--([^=]+)=(.*)$/.exec(a);
    if (m) args[m[1]] = m[2];
    else args._.push(a);
  });
  return args;
}

/* ── PNG decode (chunks -> zlib inflate -> per-scanline unfilter) ───────── */

function readPng(buf) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (buf.length < 8 || !buf.slice(0, 8).equals(sig)) {
    throw new Error("not a PNG file");
  }
  let off = 8;
  let ihdr = null;
  let plte = null;
  let trns = null;
  const idatChunks = [];
  while (off + 8 <= buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    const data = buf.slice(off + 8, off + 8 + len);
    if (type === "IHDR") {
      ihdr = {
        width: data.readUInt32BE(0),
        height: data.readUInt32BE(4),
        bitDepth: data.readUInt8(8),
        colorType: data.readUInt8(9),
      };
    } else if (type === "PLTE") {
      plte = data;
    } else if (type === "tRNS") {
      trns = data;
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") {
      break;
    }
    off += 8 + len + 4; // data + CRC (unchecked — trusted local input)
  }
  if (!ihdr) throw new Error("missing IHDR chunk");
  if (ihdr.bitDepth !== 8) {
    throw new Error(
      "only 8-bit PNGs are supported (this file is " + ihdr.bitDepth +
      "-bit) — re-export it at 8 bits/channel"
    );
  }
  const channelsByType = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };
  const bpp = channelsByType[ihdr.colorType];
  if (bpp === undefined) {
    throw new Error("unsupported PNG color type " + ihdr.colorType);
  }

  const raw = zlib.inflateSync(Buffer.concat(idatChunks));
  const stride = ihdr.width * bpp;
  const pixels = []; // rows of [r,g,b,a]
  let prevRow = new Uint8Array(stride);
  let pos = 0;
  for (let y = 0; y < ihdr.height; y++) {
    const filter = raw[pos];
    pos += 1;
    const row = raw.slice(pos, pos + stride);
    pos += stride;
    const out = new Uint8Array(stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? out[i - bpp] : 0;
      const b = prevRow[i];
      const c = i >= bpp ? prevRow[i - bpp] : 0;
      const rawByte = row[i];
      let recon;
      switch (filter) {
        case 0: recon = rawByte; break;
        case 1: recon = rawByte + a; break;
        case 2: recon = rawByte + b; break;
        case 3: recon = rawByte + Math.floor((a + b) / 2); break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
          recon = rawByte + pr;
          break;
        }
        default:
          throw new Error("unsupported PNG filter type " + filter);
      }
      out[i] = recon & 0xff;
    }
    const rowPixels = [];
    for (let x = 0; x < ihdr.width; x++) {
      const base = x * bpp;
      let r, g, b, al;
      if (ihdr.colorType === 6) {
        r = out[base]; g = out[base + 1]; b = out[base + 2]; al = out[base + 3];
      } else if (ihdr.colorType === 2) {
        r = out[base]; g = out[base + 1]; b = out[base + 2]; al = 255;
      } else if (ihdr.colorType === 4) {
        r = g = b = out[base]; al = out[base + 1];
      } else if (ihdr.colorType === 0) {
        r = g = b = out[base]; al = 255;
      } else { // colorType 3: palette index
        const idx = out[base];
        r = plte[idx * 3]; g = plte[idx * 3 + 1]; b = plte[idx * 3 + 2];
        al = trns && idx < trns.length ? trns[idx] : 255;
      }
      rowPixels.push([r, g, b, al]);
    }
    pixels.push(rowPixels);
    prevRow = out;
  }
  return { width: ihdr.width, height: ihdr.height, pixels };
}

/* ── pixels -> letter grid ────────────────────────────────────────────── */

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

function hex2(n) { return n.toString(16).padStart(2, "0"); }
function toHex(r, g, b) { return "#" + hex2(r) + hex2(g) + hex2(b); }

/* returns a WxH grid of hex-string-or-null (null = transparent) */
function cropPixels(img, x, y, w, h, alphaThreshold) {
  const cells = [];
  for (let ry = 0; ry < h; ry++) {
    const row = [];
    for (let rx = 0; rx < w; rx++) {
      const srcRow = img.pixels[y + ry];
      const px = srcRow && srcRow[x + rx];
      row.push(!px || px[3] < alphaThreshold ? null : toHex(px[0], px[1], px[2]));
    }
    cells.push(row);
  }
  return cells;
}

/* one shared palette across all frames, most-frequent color gets the
   earliest/shortest-looking letter (purely cosmetic, doesn't affect output) */
function buildPalette(frames) {
  const counts = new Map();
  frames.forEach(function (cells) {
    cells.forEach(function (row) {
      row.forEach(function (c) {
        if (c !== null) counts.set(c, (counts.get(c) || 0) + 1);
      });
    });
  });
  const ordered = Array.from(counts.keys()).sort(function (a, b) {
    return counts.get(b) - counts.get(a);
  });
  if (ordered.length > LETTERS.length) {
    throw new Error(
      "sprite uses " + ordered.length + " distinct colors — more than the " +
      LETTERS.length + " available letters. Crop a smaller region or " +
      "flatten similar colors in an image editor first."
    );
  }
  const colorToLetter = new Map();
  ordered.forEach(function (c, i) { colorToLetter.set(c, LETTERS[i]); });
  return colorToLetter;
}

function cellsToGrid(cells, colorToLetter) {
  return cells.map(function (row) {
    return row.map(function (c) { return c === null ? "." : colorToLetter.get(c); }).join("");
  });
}

/* ── main ─────────────────────────────────────────────────────────────── */

function main() {
  const args = parseArgs(process.argv.slice(2));
  const file = args._[0];
  if (!file) {
    console.error("usage: node tools/png-to-grid.js <file.png> [--x=0 --y=0 --w=16 --h=16 --frames=1 --gap=0 --name=SPRITE --alpha=128 --out=path.js]");
    process.exit(1);
  }
  const buf = fs.readFileSync(file);
  const img = readPng(buf);

  const x = parseInt(args.x || "0", 10);
  const y = parseInt(args.y || "0", 10);
  const w = parseInt(args.w || String(img.width), 10);
  const h = parseInt(args.h || String(img.height), 10);
  const frameCount = parseInt(args.frames || "1", 10);
  const gap = parseInt(args.gap || "0", 10);
  const name = (args.name || "SPRITE").toUpperCase();
  const alphaThreshold = parseInt(args.alpha || "128", 10);

  const frames = [];
  for (let i = 0; i < frameCount; i++) {
    frames.push(cropPixels(img, x + i * (w + gap), y, w, h, alphaThreshold));
  }
  const colorToLetter = buildPalette(frames);
  const palette = {};
  colorToLetter.forEach(function (letter, c) { palette[letter] = c; });

  const src = path.relative(process.cwd(), file).replace(/\\/g, "/");
  const lines = [];
  lines.push("/* generated by tools/png-to-grid.js from " + src +
    " @ (" + x + "," + y + ") " + w + "x" + h +
    (frameCount > 1 ? ", " + frameCount + " frames" : "") + " */");
  lines.push("const PAL_" + name + " = {");
  colorToLetter.forEach(function (letter, c) {
    lines.push("  " + letter + ": \"" + c + "\",");
  });
  lines.push("};");

  const gridToLines = function (grid) {
    return grid.map(function (row) { return "  \"" + row + "\","; });
  };

  if (frameCount === 1) {
    lines.push("const " + name + "_GRID = [");
    lines.push.apply(lines, gridToLines(cellsToGrid(frames[0], colorToLetter)));
    lines.push("];");
  } else {
    lines.push("const " + name + "_FRAMES = [");
    frames.forEach(function (cells) {
      lines.push("  [");
      cellsToGrid(cells, colorToLetter).forEach(function (row) {
        lines.push("    \"" + row + "\",");
      });
      lines.push("  ],");
    });
    lines.push("];");
  }

  const output = lines.join("\n") + "\n";
  if (args.out) {
    fs.writeFileSync(args.out, output);
    console.error("wrote " + args.out);
  } else {
    process.stdout.write(output);
  }
}

main();
