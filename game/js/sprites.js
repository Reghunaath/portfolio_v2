/* ─── REGHU.EXE — pixel sprites & procedural painters ───────────────────── */
/* global window */

window.Sprites = (function () {
  /* palette for character grids */
  const PAL = {
    O: "#10141a", // outline
    H: "#1d232b", // hair
    S: "#e8b48b", // skin
    E: "#10141a", // eyes
    G: "#2ea043", // hoodie
    D: "#1f7a33", // hoodie shade
    J: "#3d5875", // jeans
    B: "#1c222b", // boots
    C: "#8b949e", // cat fur
    c: "#161b22", // cat eyes/stripes
    W: "#e6edf3", // white
  };

  /* 10x14 player — down / up / side (side is mirrored for left) */
  const P_DOWN_STAND = [
    "..HHHHHH..",
    ".HHHHHHHH.",
    ".HHHHHHHH.",
    ".HSSSSSSH.",
    ".SSESSESS.",
    ".SSSSSSSS.",
    ".DGGGGGGD.",
    ".GGGGGGGG.",
    "SGGGGGGGGS",
    ".GGDDDDGG.",
    ".GGGGGGGG.",
    "..JJ..JJ..",
    "..JJ..JJ..",
    "..BB..BB..",
  ];
  const P_DOWN_A = P_DOWN_STAND.slice(0, 11).concat([
    "..JJ..JJ..",
    "..JJ..BB..",
    "..BB......",
  ]);
  const P_DOWN_B = P_DOWN_STAND.slice(0, 11).concat([
    "..JJ..JJ..",
    "..BB..JJ..",
    "......BB..",
  ]);

  const P_UP_STAND = [
    "..HHHHHH..",
    ".HHHHHHHH.",
    ".HHHHHHHH.",
    ".HHHHHHHH.",
    ".HHHHHHHH.",
    ".HHHHHHHH.",
    ".DGGGGGGD.",
    ".GGGGGGGG.",
    "SGGGGGGGGS",
    ".GGGGGGGG.",
    ".GGGGGGGG.",
    "..JJ..JJ..",
    "..JJ..JJ..",
    "..BB..BB..",
  ];
  const P_UP_A = P_UP_STAND.slice(0, 11).concat([
    "..JJ..JJ..",
    "..JJ..BB..",
    "..BB......",
  ]);
  const P_UP_B = P_UP_STAND.slice(0, 11).concat([
    "..JJ..JJ..",
    "..BB..JJ..",
    "......BB..",
  ]);

  const P_SIDE_STAND = [
    "..HHHHHH..",
    ".HHHHHHHH.",
    ".HHHHHHHH.",
    ".HHHSSSS..",
    ".HHHSSES..",
    ".HHHSSSS..",
    ".DGGGGGD..",
    ".GGGGGGG..",
    ".GGGGGGGS.",
    ".GGGDDGG..",
    ".GGGGGGG..",
    "...JJJJ...",
    "...JJJJ...",
    "...BBBB...",
  ];
  const P_SIDE_A = P_SIDE_STAND.slice(0, 11).concat([
    "...JJJJ...",
    "..JJ..JJ..",
    "..BB..BB..",
  ]);

  const PLAYER_FRAMES = {
    down: [P_DOWN_STAND, P_DOWN_A, P_DOWN_STAND, P_DOWN_B],
    up: [P_UP_STAND, P_UP_A, P_UP_STAND, P_UP_B],
    right: [P_SIDE_STAND, P_SIDE_A, P_SIDE_STAND, P_SIDE_A],
    left: [P_SIDE_STAND, P_SIDE_A, P_SIDE_STAND, P_SIDE_A], // drawn flipped
  };

  /* 12x8 ginger cat, two tail frames */
  const CAT_A = [
    "..C..C......",
    "..CCCC......",
    "..CcCc......",
    "..CCCC...C..",
    ".CCtCCtCCC..",
    ".CCtCCtCC...",
    ".CC..CC.....",
    "............",
  ];
  const CAT_B = [
    "..C..C......",
    "..CCCC......",
    "..CcCc......",
    "..CCCC......",
    ".CCtCCtCC.C.",
    ".CCtCCtCCC..",
    ".CC..CC.....",
    "............",
  ];
  const CAT_FRAMES = [CAT_A, CAT_B];
  const PAL_CAT = { C: "#d97a3d", c: "#3a2010", t: "#a8531f" };

  /* warm variant used by the lobby receptionist */
  const PAL_RECEPTIONIST = Object.assign({}, PAL, {
    H: "#5a3825", // warm brown hair
    G: "#c76b3f", // terracotta sweater
    D: "#a3542e",
    J: "#584a63",
    B: "#2b2233",
  });

  function drawGrid(ctx, grid, px, py, flipX, pal) {
    const colors = pal || PAL;
    for (let r = 0; r < grid.length; r++) {
      const row = grid[r];
      for (let c = 0; c < row.length; c++) {
        const ch = flipX ? row[row.length - 1 - c] : row[c];
        if (ch === ".") continue;
        const col = colors[ch];
        if (!col) continue;
        ctx.fillStyle = col;
        ctx.fillRect(px + c, py + r, 1, 1);
      }
    }
  }

  /* deterministic pseudo-random 0..99 from two ints */
  function hash2(i, j) {
    let h = (i * 374761393 + j * 668265263) | 0;
    h = (h ^ (h >> 13)) * 1274126177;
    return Math.abs(h % 100);
  }

  /* ── tiles ─────────────────────────────────────────────────────────── */
  const T = 16;

  /* floor tiles hand-ported from the Modern Interiors "Room Builder" floor
     sheet via tools/png-to-grid.js (see game/CLAUDE.md) */
  const PAL_FLOOR_LOBBY = { a: "#b99e86", b: "#d0be9c" };
  const FLOOR_LOBBY_GRID = [
    "abababababababab",
    "babababababababa",
    "abaaaaaaaaaaaaab",
    "baabbbbbbbbbbaba",
    "ababaaaaaaaabaab",
    "baabaaaaaaaababa",
    "ababaabbbbaabaab",
    "baabaabbbbaababa",
    "ababaabbbbaabaab",
    "baabaabbbbaababa",
    "ababaaaaaaaabaab",
    "baabaaaaaaaababa",
    "ababbbbbbbbbbaab",
    "baaaaaaaaaaaaaba",
    "abababababababab",
    "babababababababa",
  ];

  const PAL_FLOOR_ROOM = {
    a: "#e8d8cb", b: "#e1d1c5", c: "#bfb2a7", d: "#e9d8cc", e: "#ebdace",
    f: "#dfd0c3", g: "#d5c7bb", h: "#d9cabe", i: "#d7c9bc", j: "#dbccc0",
    k: "#e7d7ca", l: "#e0d1c4", m: "#ccbbb3",
  };
  const FLOOR_ROOM_GRID = [
    "aaaaaaaaaaaaaaam",
    "fhigffhiglfhigfc",
    "abbjaabbjaabbjac",
    "deekddeekddeekdc",
    "fhiglfhiglfhigfc",
    "abbjaabbjaabbjac",
    "deekddeekddeekdc",
    "fhiglfhiglfhigfc",
    "abbjaabbjaabbjac",
    "deekddeekddeekdc",
    "fhiglfhiglfhigfc",
    "abbjaabbjaabbjac",
    "deekddeekddeekdc",
    "fhiglfhiglfhigfc",
    "abbjaabbjaabbjam",
    "mcccccccccccccmg",
  ];

  /* warm brick: hotel reds — every room's '#' tiles and window backing */
  function wall(ctx, tx, ty) {
    const x = tx * T, y = ty * T;
    ctx.fillStyle = "#332522";
    ctx.fillRect(x, y, T, T);
    ctx.fillStyle = "#3e2e29";
    ctx.fillRect(x, y, T, 3); // top highlight
    ctx.fillStyle = "#241a17";
    ctx.fillRect(x, y + T - 3, T, 3); // base lip
    ctx.fillStyle = "#3c2b26";
    if ((tx + ty) % 2 === 0) ctx.fillRect(x + 2, y + 6, 5, 4); // brick hint
    else ctx.fillRect(x + 9, y + 6, 5, 4);
  }

  function windowNight(ctx, tx, ty, t) {
    wall(ctx, tx, ty);
    const x = tx * T + 2, y = ty * T + 3;
    ctx.fillStyle = "#10141a";
    ctx.fillRect(x - 1, y - 1, 14, 11);
    ctx.fillStyle = "#0b1524";
    ctx.fillRect(x, y, 12, 9);
    for (let i = 0; i < 5; i++) {
      const sx = x + (hash2(tx * 7 + i, ty) % 12);
      const sy = y + (hash2(i, ty * 5 + tx) % 9);
      const tw = (Math.sin(t * 2 + i * 1.7 + tx) + 1) / 2;
      ctx.fillStyle = tw > 0.55 ? "#9ecbff" : "#40506b";
      ctx.fillRect(sx, sy, 1, 1);
    }
    ctx.fillStyle = "#10141a";
    ctx.fillRect(x + 5, y, 1, 9); // mullion
  }

  /* lobby: Modern Interiors tan/cream diamond-weave carpet tile */
  function floorLobbyCarpet(ctx, tx, ty) {
    drawGrid(ctx, FLOOR_LOBBY_GRID, tx * T, ty * T, false, PAL_FLOOR_LOBBY);
  }

  /* section rooms: Modern Interiors warm herringbone-weave floor tile */
  function floorCarpetTiles(ctx, tx, ty) {
    drawGrid(ctx, FLOOR_ROOM_GRID, tx * T, ty * T, false, PAL_FLOOR_ROOM);
  }

  const TILES = { floorLobbyCarpet, floorCarpetTiles, wall, windowNight };

  /* ── furniture painters ────────────────────────────────────────────── */
  /* each painter: (ctx, px, py, w, h, t, obj) — px/py/w/h in pixels     */

  function shadow(ctx, px, py, w) {
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.fillRect(px + 1, py - 2, w - 2, 3);
  }

  function rug(ctx, px, py, w, h, t, obj) {
    const c1 = (obj && obj.c1) || "#1e3a2f";
    const c2 = (obj && obj.c2) || "#2a5240";
    ctx.fillStyle = c1;
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = c2;
    ctx.fillRect(px + 3, py + 3, w - 6, h - 6);
    ctx.fillStyle = c1;
    ctx.fillRect(px + 6, py + 6, w - 12, h - 12);
  }

  function neonRug(ctx, px, py, w, h, t) {
    ctx.fillStyle = "#171226";
    ctx.fillRect(px, py, w, h);
    const glow = (Math.sin(t * 2.2) + 1) / 2;
    ctx.fillStyle = glow > 0.5 ? "#6e40c9" : "#553098";
    ctx.fillRect(px + 2, py + 2, w - 4, 1);
    ctx.fillRect(px + 2, py + h - 3, w - 4, 1);
    ctx.fillRect(px + 2, py + 2, 1, h - 4);
    ctx.fillRect(px + w - 3, py + 2, 1, h - 4);
  }

  function doormat(ctx, px, py, w, h) {
    ctx.fillStyle = "#5b4632";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#6d5540";
    ctx.fillRect(px + 2, py + 2, w - 4, h - 4);
  }

  /* just the mug — no table beneath it, drawn near the top of its box so it
     sits on a counter even when the box is stretched tall for hit-testing */
  function mug(ctx, px, py, w, h, t) {
    ctx.fillStyle = "#f85149";
    ctx.fillRect(px + w / 2 - 2, py + 6, 4, 4);
    ctx.fillStyle = "#c93c35";
    ctx.fillRect(px + w / 2 + 2, py + 7, 1, 2);
    /* steam */
    const s = Math.floor(t * 3) % 3;
    ctx.fillStyle = "rgba(230,237,243,0.5)";
    ctx.fillRect(px + w / 2 - 1 + s, py + 3 - s, 1, 1);
  }

  function plant(ctx, px, py, w, h) {
    ctx.fillStyle = "#8a4b32";
    ctx.fillRect(px + w / 2 - 3, py + h - 5, 6, 5);
    ctx.fillStyle = "#2ea043";
    ctx.fillRect(px + w / 2 - 1, py + 2, 2, h - 6);
    ctx.fillRect(px + w / 2 - 5, py + 4, 4, 2);
    ctx.fillRect(px + w / 2 + 1, py + 3, 4, 2);
    ctx.fillRect(px + w / 2 - 4, py + 8, 3, 2);
    ctx.fillRect(px + w / 2 + 2, py + 7, 3, 2);
    ctx.fillStyle = "#1f7a33";
    ctx.fillRect(px + w / 2 - 3, py + 5, 2, 1);
    ctx.fillRect(px + w / 2 + 2, py + 4, 2, 1);
  }

  function arcadeCab(ctx, px, py, w, h, t, obj) {
    const body = obj.color || "#6e40c9";
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#10141a";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = body;
    ctx.fillRect(px + 1, py + 1, w - 2, h - 2);
    /* marquee */
    ctx.fillStyle = "#10141a";
    ctx.fillRect(px + 2, py + 2, w - 4, 4);
    const mOn = (Math.sin(t * 4 + px) + 1) / 2 > 0.2;
    ctx.fillStyle = mOn ? obj.marquee || "#e3b341" : "#5a4a12";
    ctx.fillRect(px + 3, py + 3, w - 6, 2);
    /* screen */
    ctx.fillStyle = "#05070a";
    ctx.fillRect(px + 3, py + 8, w - 6, 10);
    ctx.fillStyle = obj.screen || "#aff5b4";
    const fx = Math.floor(t * 4) % 4;
    ctx.fillRect(px + 4 + fx, py + 10, 2, 2); // bouncing pixel "game"
    ctx.fillRect(px + w - 7 - fx, py + 14, 2, 2);
    /* controls */
    ctx.fillStyle = "#161b22";
    ctx.fillRect(px + 2, py + 19, w - 4, 4);
    ctx.fillStyle = "#f85149";
    ctx.fillRect(px + 4, py + 20, 2, 2);
    ctx.fillStyle = "#58a6ff";
    ctx.fillRect(px + 8, py + 20, 2, 2);
    /* trophy on top for award winners */
    if (obj.trophy) {
      ctx.fillStyle = "#e3b341";
      ctx.fillRect(px + w / 2 - 2, py - 4, 4, 3);
      ctx.fillRect(px + w / 2 - 1, py - 1, 2, 1);
      const sp = Math.floor(t * 2) % 2;
      if (sp === 0) {
        ctx.fillStyle = "#fff8c5";
        ctx.fillRect(px + w / 2 + 3, py - 5, 1, 1);
      }
    }
  }

  function clawMachine(ctx, px, py, w, h, t) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#10141a";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#c93c8f";
    ctx.fillRect(px + 1, py + 1, w - 2, h - 2);
    ctx.fillStyle = "#0b1524";
    ctx.fillRect(px + 3, py + 4, w - 6, h - 12);
    /* claw */
    const cx = px + 4 + ((Math.floor(t * 3) % (w - 10)));
    ctx.fillStyle = "#8b949e";
    ctx.fillRect(cx, py + 5, 1, 3);
    ctx.fillRect(cx - 1, py + 8, 3, 1);
    /* prizes */
    ctx.fillStyle = "#e3b341";
    ctx.fillRect(px + 4, py + h - 11, 3, 3);
    ctx.fillStyle = "#3fb950";
    ctx.fillRect(px + 9, py + h - 10, 3, 2);
    ctx.fillStyle = "#161b22";
    ctx.fillRect(px + 2, py + h - 6, w - 4, 4);
  }

  function deskStation(ctx, px, py, w, h, t, obj) {
    shadow(ctx, px, py + h, w);
    /* chair below desk */
    ctx.fillStyle = "#161b22";
    ctx.fillRect(px + w / 2 - 4, py + h - 4, 8, 4);
    /* desk */
    ctx.fillStyle = "#2b2117";
    ctx.fillRect(px, py + 6, w, h - 8);
    ctx.fillStyle = "#3a2d1f";
    ctx.fillRect(px, py + 6, w, 2);
    /* monitor with company accent */
    ctx.fillStyle = "#10141a";
    ctx.fillRect(px + w / 2 - 6, py, 12, 9);
    ctx.fillStyle = "#05070a";
    ctx.fillRect(px + w / 2 - 5, py + 1, 10, 7);
    ctx.fillStyle = obj.color || "#58a6ff";
    const blink = (Math.sin(t * 2.5 + px * 0.3) + 1) / 2;
    ctx.fillRect(px + w / 2 - 4, py + 2, blink > 0.4 ? 6 : 3, 1);
    ctx.fillRect(px + w / 2 - 4, py + 4, 4, 1);
    ctx.fillRect(px + w / 2 - 4, py + 6, blink > 0.6 ? 7 : 5, 1);
    /* papers */
    ctx.fillStyle = "#c9d1d9";
    ctx.fillRect(px + 2, py + 9, 4, 3);
    /* nameplate */
    ctx.fillStyle = obj.color || "#58a6ff";
    ctx.fillRect(px + w - 7, py + 10, 5, 2);
  }

  function waterCooler(ctx, px, py, w, h, t) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#c9d1d9";
    ctx.fillRect(px + 2, py + 6, w - 4, h - 6);
    ctx.fillStyle = "#58a6ff";
    ctx.fillRect(px + 3, py, w - 6, 7);
    ctx.fillStyle = "#79c0ff";
    const bub = Math.floor(t * 2) % 4;
    ctx.fillRect(px + 4 + bub, py + 5 - bub, 1, 1);
    ctx.fillStyle = "#464f5d";
    ctx.fillRect(px + 3, py + 9, 2, 2);
  }

  function whiteboard(ctx, px, py, w, h) {
    ctx.fillStyle = "#10141a";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#e6edf3";
    ctx.fillRect(px + 1, py + 1, w - 2, h - 2);
    ctx.fillStyle = "#f85149";
    ctx.fillRect(px + 3, py + 3, 10, 1);
    ctx.fillStyle = "#1f6feb";
    ctx.fillRect(px + 3, py + 6, 16, 1);
    ctx.fillRect(px + 3, py + 9, 7, 1);
    ctx.fillStyle = "#3fb950";
    ctx.fillRect(px + 22, py + 5, 6, 5); // green sticky
  }

  function bookshelf(ctx, px, py, w, h) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#2b2117";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#20180f";
    const spineCols = ["#a371f7", "#58a6ff", "#3fb950", "#e3b341", "#f85149", "#6e7681"];
    for (let shelf = 0; shelf < 2; shelf++) {
      const sy = py + 3 + shelf * ((h - 6) / 2 + 1);
      ctx.fillStyle = "#20180f";
      ctx.fillRect(px + 2, sy, w - 4, (h - 8) / 2);
      let bx = px + 3;
      let i = 0;
      while (bx < px + w - 5) {
        const bw = 2 + (hash2(bx, sy) % 2);
        ctx.fillStyle = spineCols[hash2(bx * 3, shelf + Math.floor(py)) % spineCols.length];
        const bh = (h - 10) / 2 - (hash2(bx, shelf) % 2);
        ctx.fillRect(bx, sy + ((h - 8) / 2 - bh), bw, bh);
        bx += bw + 1;
        i++;
      }
    }
  }

  function diploma(ctx, px, py, w, h, t, obj) {
    ctx.fillStyle = "#e3b341";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#fdf6e3";
    ctx.fillRect(px + 1, py + 1, w - 2, h - 2);
    ctx.fillStyle = "#8b949e";
    ctx.fillRect(px + 3, py + 3, w - 6, 1);
    ctx.fillRect(px + 3, py + 5, w - 8, 1);
    ctx.fillStyle = obj.color || "#c93c35";
    ctx.fillRect(px + w / 2 - 1, py + h - 4, 3, 2); // seal
  }

  function lectern(ctx, px, py, w, h, t) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#2b2117";
    ctx.fillRect(px + w / 2 - 2, py + 6, 4, h - 6);
    ctx.fillRect(px + 1, py + 3, w - 2, 5);
    /* glowing paper */
    const pulse = (Math.sin(t * 3) + 1) / 2;
    ctx.fillStyle = pulse > 0.5 ? "#fff8c5" : "#f5edb8";
    ctx.fillRect(px + 3, py, w - 6, 5);
    ctx.fillStyle = "#8b6f1d";
    ctx.fillRect(px + 4, py + 1, w - 9, 1);
    ctx.fillRect(px + 4, py + 3, w - 11, 1);
    if (pulse > 0.7) {
      ctx.fillStyle = "rgba(227,179,65,0.65)";
      ctx.fillRect(px + 2, py - 1, 1, 1);
      ctx.fillRect(px + w - 3, py + 2, 1, 1);
    }
  }

  function globe(ctx, px, py, w, h) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#2b2117";
    ctx.fillRect(px + w / 2 - 2, py + h - 4, 4, 4);
    ctx.fillStyle = "#1f6feb";
    ctx.fillRect(px + 2, py + 1, w - 4, h - 6);
    ctx.fillRect(px + 1, py + 2, w - 2, h - 8);
    ctx.fillStyle = "#3fb950";
    ctx.fillRect(px + 3, py + 3, 3, 2);
    ctx.fillRect(px + 7, py + 5, 4, 2);
    ctx.fillRect(px + 4, py + 8, 2, 1);
  }

  function kiosk(ctx, px, py, w, h, t, obj) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#10141a";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#1c2530";
    ctx.fillRect(px + 1, py + 1, w - 2, h - 2);
    /* screen area */
    ctx.fillStyle = "#05070a";
    ctx.fillRect(px + 3, py + 3, w - 6, 12);
    const accent = obj.color || "#3fb950";
    ctx.fillStyle = accent;
    const icon = obj.icon;
    const cx = px + w / 2, cy = py + 9;
    if (icon === "mail") {
      ctx.fillRect(cx - 5, cy - 3, 10, 7);
      ctx.fillStyle = "#05070a";
      ctx.fillRect(cx - 4, cy - 2, 8, 1);
      ctx.fillStyle = accent;
      ctx.fillRect(cx - 3, cy - 1, 2, 1);
      ctx.fillRect(cx + 1, cy - 1, 2, 1);
      ctx.fillRect(cx - 1, cy, 2, 1);
    } else if (icon === "phone") {
      ctx.fillRect(cx - 4, cy - 4, 3, 3);
      ctx.fillRect(cx - 2, cy - 1, 2, 2);
      ctx.fillRect(cx, cy + 1, 2, 2);
      ctx.fillRect(cx + 2, cy + 2, 3, 3);
    } else if (icon === "in") {
      ctx.fillRect(cx - 5, cy - 4, 10, 9);
      ctx.fillStyle = "#05070a";
      ctx.fillRect(cx - 3, cy - 2, 1, 5);
      ctx.fillRect(cx - 1, cy - 2, 1, 1);
      ctx.fillRect(cx - 1, cy, 1, 3);
      ctx.fillRect(cx + 1, cy - 1, 2, 4);
    } else if (icon === "gh") {
      ctx.fillRect(cx - 4, cy - 4, 8, 7); // head
      ctx.fillRect(cx - 5, cy - 5, 2, 2); // ears
      ctx.fillRect(cx + 3, cy - 5, 2, 2);
      ctx.fillStyle = "#05070a";
      ctx.fillRect(cx - 2, cy - 2, 1, 1); // eyes
      ctx.fillRect(cx + 1, cy - 2, 1, 1);
    }
    /* blinking status led */
    const on = Math.floor(t * 2 + px) % 2 === 0;
    ctx.fillStyle = on ? accent : "#30363d";
    ctx.fillRect(px + w - 4, py + h - 5, 2, 2);
  }

  function printer(ctx, px, py, w, h, t) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#464f5d";
    ctx.fillRect(px, py + 3, w, h - 3);
    ctx.fillStyle = "#30363d";
    ctx.fillRect(px + 2, py + 5, w - 4, 3);
    /* paper feeding out */
    const feed = Math.floor(t * 2) % 4;
    ctx.fillStyle = "#e6edf3";
    ctx.fillRect(px + 3, py - feed, w - 6, 3 + feed);
    ctx.fillStyle = "#8b949e";
    ctx.fillRect(px + 4, py - feed + 1, w - 9, 1);
  }

  function serverRack(ctx, px, py, w, h, t) {
    shadow(ctx, px, py + h, w);
    ctx.fillStyle = "#10141a";
    ctx.fillRect(px, py, w, h);
    ctx.fillStyle = "#1c2128";
    ctx.fillRect(px + 1, py + 1, w - 2, h - 2);
    for (let u = 0; u < 4; u++) {
      const uy = py + 3 + u * 6;
      ctx.fillStyle = "#0d1117";
      ctx.fillRect(px + 2, uy, w - 4, 4);
      for (let l = 0; l < 3; l++) {
        const on = hash2(u * 3 + l, Math.floor(t * 3)) < 55;
        ctx.fillStyle = on ? (l === 0 ? "#3fb950" : l === 1 ? "#e3b341" : "#f85149") : "#21262d";
        ctx.fillRect(px + 3 + l * 3, uy + 1, 2, 2);
      }
    }
  }

  function trophyBig(ctx, px, py, w, h, t) {
    const pulse = (Math.sin(t * 3) + 1) / 2;
    ctx.fillStyle = "#e3b341";
    ctx.fillRect(px + w / 2 - 4, py + 2, 8, 6); // cup
    ctx.fillRect(px + w / 2 - 6, py + 3, 2, 3); // handles
    ctx.fillRect(px + w / 2 + 4, py + 3, 2, 3);
    ctx.fillRect(px + w / 2 - 2, py + 8, 4, 2); // stem
    ctx.fillRect(px + w / 2 - 4, py + 10, 8, 2); // base
    ctx.fillStyle = "#fff8c5";
    ctx.fillRect(px + w / 2 - 3, py + 3, 2, 2); // shine
    if (pulse > 0.6) {
      ctx.fillRect(px + w / 2 + 5, py, 1, 1);
      ctx.fillRect(px + w / 2 - 7, py + 6, 1, 1);
    }
  }

  function receptionDesk(ctx, px, py, w, h, t) {
    shadow(ctx, px, py + h, w);
    /* counter top */
    ctx.fillStyle = "#a06b3d";
    ctx.fillRect(px, py + 6, w, 2);
    ctx.fillStyle = "#8a5a33";
    ctx.fillRect(px, py + 8, w, 5);
    /* front face with panel seams */
    ctx.fillStyle = "#6b4226";
    ctx.fillRect(px, py + 13, w, h - 13);
    ctx.fillStyle = "#5a3720";
    for (let sx = px + 8; sx < px + w - 4; sx += 10) {
      ctx.fillRect(sx, py + 15, 1, h - 17);
    }
    /* flower in a vase (offset so it doesn't overlap the receptionist) */
    const fx = px + w - 20;
    ctx.fillStyle = "#58a6ff";
    ctx.fillRect(fx, py + 5, 3, 3);
    ctx.fillStyle = "#3fb950";
    ctx.fillRect(fx + 1, py + 2, 1, 3);
    ctx.fillStyle = "#f778ba";
    ctx.fillRect(fx, py, 3, 2);
    /* service bell, with a periodic glint */
    ctx.fillStyle = "#e3b341";
    ctx.fillRect(px + w - 10, py + 8, 4, 3);
    ctx.fillRect(px + w - 9, py + 7, 2, 1);
    if (Math.floor(t * 1.5) % 3 === 0) {
      ctx.fillStyle = "#fff8c5";
      ctx.fillRect(px + w - 10, py + 8, 1, 1);
    }
  }

  function receptionist(ctx, px, py, w, h, t) {
    const bob = Math.floor(((Math.sin(t * 1.6) + 1) / 2) * 2);
    drawGrid(ctx, P_DOWN_STAND, px + (w - 10) / 2, py + h - 14 - bob, false, PAL_RECEPTIONIST);
  }

  function lobbyLamp(ctx, px, py, w, h, t) {
    /* pole + base */
    ctx.fillStyle = "#2b2117";
    ctx.fillRect(px + w / 2 - 1, py + 6, 2, h - 8);
    ctx.fillRect(px + w / 2 - 3, py + h - 3, 6, 2);
    /* shade */
    ctx.fillStyle = "#e3b341";
    ctx.fillRect(px + w / 2 - 4, py + 2, 8, 4);
    ctx.fillStyle = "#fff8c5";
    ctx.fillRect(px + w / 2 - 3, py + 6, 6, 1);
  }

  const PAINTERS = {
    rug, neonRug, doormat, mug, plant,
    arcadeCab, clawMachine, deskStation, waterCooler, whiteboard, bookshelf,
    diploma, lectern, globe, kiosk, printer, serverRack, trophyBig,
    receptionDesk, receptionist, lobbyLamp,
  };

  /* bobbing "!" glint above an interactable */
  function glint(ctx, cx, py, t) {
    const bob = Math.floor(((Math.sin(t * 4) + 1) / 2) * 3);
    const y = py - 10 - bob;
    ctx.fillStyle = "#0d1117";
    ctx.fillRect(cx - 2, y - 1, 5, 9);
    ctx.fillStyle = "#3fb950";
    ctx.fillRect(cx - 1, y, 3, 5);
    ctx.fillRect(cx - 1, y + 6, 3, 2);
  }

  return { PAL, PLAYER_FRAMES, CAT_FRAMES, PAL_CAT, drawGrid, TILES, PAINTERS, glint, hash2, T };
})();
