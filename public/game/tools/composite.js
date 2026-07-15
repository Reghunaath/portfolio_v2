#!/usr/bin/env node
/* composite.js — dev-only tool (not loaded by the game): composites the
   Character_Generator layer sheets (Body/Eyes/Outfit/Hairstyle/…) into a single
   character and slices its idle+walk frames into the ASCII pixel-grid format
   sprites.js uses — the multi-layer companion to png-to-grid.js, used to port a
   walking NPC without shipping the PNGs or switching to drawImage().
   Pure Node (built-in zlib only) — no npm install needed.

   Character_Generator geometry (16x16 variant sheets, 896x656):
     - each character cell is 16 wide x 32 tall; ported frames are rows 6-31
       (26 rows, feet on the bottom row)
     - animation bands stack vertically: idle at y=32, walk at y=64
     - within a band, direction blocks run right(0) / up(96) / left(192) /
       down(288), 6 frames of 16px each
   Layers must be given bottom-to-top; the generator's order is
   Body -> Eyes -> Outfit -> Hairstyle (-> Accessory).

   Usage:
     node tools/composite.js <body.png> <eyes.png> <outfit.png> <hair.png> \
       --name=RECEPTIONIST [--alpha=128] [--out=path.js]

   Emits `PAL_<NAME>` + `<NAME> = { down:[idle,w1..w6], up:[…], left:[…],
   right:[…] }`, matching PLAYER_FRAMES. */
"use strict";
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

/* ── PNG decode (chunks -> zlib inflate -> per-scanline unfilter) ───────── */
function readPng(buf) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  if (buf.length < 8 || !buf.slice(0, 8).equals(sig)) throw new Error("not a PNG file");
  let off = 8, ihdr = null, plte = null, trns = null;
  const idat = [];
  while (off + 8 <= buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString("ascii", off + 4, off + 8);
    const data = buf.slice(off + 8, off + 8 + len);
    if (type === "IHDR") ihdr = { width: data.readUInt32BE(0), height: data.readUInt32BE(4), bitDepth: data.readUInt8(8), colorType: data.readUInt8(9) };
    else if (type === "PLTE") plte = data;
    else if (type === "tRNS") trns = data;
    else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    off += 8 + len + 4;
  }
  if (!ihdr) throw new Error("missing IHDR chunk");
  if (ihdr.bitDepth !== 8) throw new Error("only 8-bit PNGs are supported (re-export at 8 bits/channel)");
  const channels = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 }[ihdr.colorType];
  if (channels === undefined) throw new Error("unsupported PNG color type " + ihdr.colorType);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = ihdr.width * channels;
  const pixels = [];
  let prev = new Uint8Array(stride), pos = 0;
  for (let y = 0; y < ihdr.height; y++) {
    const filter = raw[pos]; pos += 1;
    const row = raw.slice(pos, pos + stride); pos += stride;
    const out = new Uint8Array(stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? out[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      const rb = row[i];
      let recon;
      switch (filter) {
        case 0: recon = rb; break;
        case 1: recon = rb + a; break;
        case 2: recon = rb + b; break;
        case 3: recon = rb + Math.floor((a + b) / 2); break;
        case 4: { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); recon = rb + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break; }
        default: throw new Error("unsupported PNG filter type " + filter);
      }
      out[i] = recon & 0xff;
    }
    const rp = [];
    for (let x = 0; x < ihdr.width; x++) {
      const base = x * channels;
      let r, g, b, al;
      if (ihdr.colorType === 6) { r = out[base]; g = out[base + 1]; b = out[base + 2]; al = out[base + 3]; }
      else if (ihdr.colorType === 2) { r = out[base]; g = out[base + 1]; b = out[base + 2]; al = 255; }
      else if (ihdr.colorType === 4) { r = g = b = out[base]; al = out[base + 1]; }
      else if (ihdr.colorType === 0) { r = g = b = out[base]; al = 255; }
      else { const idx = out[base]; r = plte[idx * 3]; g = plte[idx * 3 + 1]; b = plte[idx * 3 + 2]; al = trns && idx < trns.length ? trns[idx] : 255; }
      rp.push([r, g, b, al]);
    }
    pixels.push(rp);
    prev = out;
  }
  return { width: ihdr.width, height: ihdr.height, pixels };
}

/* ── compositing + slicing ──────────────────────────────────────────────── */
const BANDS = { idle: 32, walk: 64 };
const BLOCKS = { right: 0, up: 96, left: 192, down: 288 };
const DIRS = ["down", "up", "left", "right"];
const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

/* alpha-composite layers bottom-to-top into one [r,g,b]|null buffer */
function composite(layerFiles, alpha) {
  const layers = layerFiles.map(function (f) { return readPng(fs.readFileSync(f)); });
  const W = Math.min.apply(null, layers.map(function (l) { return l.width; }));
  const H = Math.min.apply(null, layers.map(function (l) { return l.height; }));
  const px = [];
  for (let y = 0; y < H; y++) {
    const row = [];
    for (let x = 0; x < W; x++) {
      let cur = null;
      for (let li = 0; li < layers.length; li++) {
        const p = layers[li].pixels[y][x];
        if (p[3] >= alpha) cur = [p[0], p[1], p[2]];
      }
      row.push(cur);
    }
    px.push(row);
  }
  return { width: W, height: H, pixels: px };
}

/* one 16x26 frame: rows 6..31 of the 16x32 cell at (blockX+fi*16, bandY) */
function frame(img, bandY, blockX, fi) {
  const cells = [];
  for (let ry = 0; ry < 26; ry++) {
    const row = [];
    for (let rx = 0; rx < 16; rx++) {
      const p = img.pixels[bandY + 6 + ry] && img.pixels[bandY + 6 + ry][blockX + fi * 16 + rx];
      row.push(p || null);
    }
    cells.push(row);
  }
  return cells;
}

function hex2(n) { return n.toString(16).padStart(2, "0"); }
function toHex(p) { return "#" + hex2(p[0]) + hex2(p[1]) + hex2(p[2]); }

function main() {
  const args = { _: [] };
  process.argv.slice(2).forEach(function (a) {
    const m = /^--([^=]+)=(.*)$/.exec(a);
    if (m) args[m[1]] = m[2];
    else args._.push(a);
  });
  if (args._.length < 1 || !args.name) {
    console.error("usage: node tools/composite.js <layer1.png> <layer2.png> … --name=NAME [--alpha=128] [--out=path.js]\n(layers bottom-to-top: Body Eyes Outfit Hairstyle)");
    process.exit(1);
  }
  const alpha = parseInt(args.alpha || "128", 10);
  const name = args.name.toUpperCase();
  const img = composite(args._, alpha);

  /* per direction: [idle frame 0, walk frames 0..5] — same as PLAYER_FRAMES */
  const sets = {};
  DIRS.forEach(function (d) {
    const arr = [frame(img, BANDS.idle, BLOCKS[d], 0)];
    for (let fi = 0; fi < 6; fi++) arr.push(frame(img, BANDS.walk, BLOCKS[d], fi));
    sets[d] = arr;
  });

  /* one shared palette, most-frequent color -> earliest letter */
  const counts = new Map();
  DIRS.forEach(function (d) { sets[d].forEach(function (cells) { cells.forEach(function (row) { row.forEach(function (c) { if (c) { const h = toHex(c); counts.set(h, (counts.get(h) || 0) + 1); } }); }); }); });
  const ordered = Array.from(counts.keys()).sort(function (a, b) { return counts.get(b) - counts.get(a); });
  if (ordered.length > LETTERS.length) throw new Error("sprite uses " + ordered.length + " colors — more than the " + LETTERS.length + " letters available");
  const c2l = new Map();
  ordered.forEach(function (h, i) { c2l.set(h, LETTERS[i]); });

  const lines = [];
  const srcs = args._.map(function (f) { return path.basename(f); }).join(" + ");
  lines.push("  /* generated by tools/composite.js from " + srcs + " */");
  lines.push("  const PAL_" + name + " = {");
  ordered.forEach(function (h) { lines.push("    " + c2l.get(h) + ': "' + h + '",'); });
  lines.push("  };");
  lines.push("  const " + name + " = {");
  DIRS.forEach(function (d) {
    lines.push("    " + d + ": [");
    sets[d].forEach(function (cells) {
      lines.push("      [");
      cells.forEach(function (row) { lines.push('        "' + row.map(function (c) { return c ? c2l.get(toHex(c)) : "."; }).join("") + '",'); });
      lines.push("      ],");
    });
    lines.push("    ],");
  });
  lines.push("  };");
  const output = lines.join("\n") + "\n";
  if (args.out) { fs.writeFileSync(args.out, output); console.error("wrote " + args.out); }
  else process.stdout.write(output);
}

main();
