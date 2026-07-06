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

  /* walls hand-ported from the pack's Generic_Home_1 (6_Home_Designs):
     white wall-top strips with navy outlines, light-gray face on the top
     wall, shaded top-of-wall bands running down the sides, white strip +
     void along the bottom. wall() picks the grid from the tile's border
     position and closes runs with a 1px outline cap beside door gaps. */
  const PAL_WALL = {
    o: "#3a3a50", // navy outline
    W: "#fdfdfd", // horizontal top-strip white
    w: "#f8f8f8", // vertical-strip / south-strip white
    F: "#cccccc", // face
    L: "#c6c6c6", // face light row under the cap
    T: "#b4b4b4", // face shadow row
    D: "#a1a1a1", // side band / corner bevel / face bottom shade
    V: "#10141a", // void outside the south wall
  };
  function wallRows(row) {
    const g = [];
    for (let i = 0; i < 16; i++) g.push(row);
    return g;
  }
  /* the top wall is two tiles tall, like the pack's reference design:
     row 0 = white top strip + start of the face, row 1 = rest of the face */
  const WALL_N_GRID = [
    "oooooooooooooooo",
    "WWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWW",
    "oooooooooooooooo",
    "TTTTTTTTTTTTTTTT",
    "LLLLLLLLLLLLLLLL",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
  ];
  const WALL_N2_GRID = [
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "FFFFFFFFFFFFFFFF",
    "TTTTTTTTTTTTTTTT",
    "DDDDDDDDDDDDDDDD",
    "oooooooooooooooo",
  ];
  const WALL_S_GRID = [
    "oooooooooooooooo",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "wwwwwwwwwwwwwwww",
    "oooooooooooooooo",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
  ];
  /* side walls: white top strip outside, shaded band inside — the right
     side is this grid mirrored (flipX), same for the corners below */
  const WALL_SIDE_GRID = wallRows("owwwwwoDDDDDDDDo");
  /* the face's edge shading widens diagonally toward the interior corner,
     one step every ~3 rows (staircase measured off the reference design) */
  const CORNER_TL_GRID = [
    "oooooooooooooooo",
    "owwwwwoWWWWWWWWW",
    "owwwwwoWWWWWWWWW",
    "owwwwwoWWWWWWWWW",
    "owwwwwoWWWWWWWWW",
    "oooooooooooooooo",
    "owwwwwoTTTTTTTTT",
    "owwwwwoDLLLLLLLL",
    "owwwwwoDFFFFFFFF",
    "owwwwwoDDFFFFFFF",
    "owwwwwoDDFFFFFFF",
    "owwwwwoDDFFFFFFF",
    "owwwwwoDDDFFFFFF",
    "owwwwwoDDDFFFFFF",
    "owwwwwoDDDFFFFFF",
    "owwwwwoDDDDFFFFF",
  ];
  const CORNER_TL2_GRID = [
    "owwwwwoDDDDFFFFF",
    "owwwwwoDDDDFFFFF",
    "owwwwwoDDDDFFFFF",
    "owwwwwoDDDDDFFFF",
    "owwwwwoDDDDDFFFF",
    "owwwwwoDDDDDFFFF",
    "owwwwwoDDDDDDFFF",
    "owwwwwoDDDDDDFFF",
    "owwwwwoDDDDDDFFF",
    "owwwwwoDDDDDDDFF",
    "owwwwwoDDDDDDDFF",
    "owwwwwoDDDDDDDFF",
    "owwwwwoDDDDDDDDF",
    "owwwwwoDDDDDDDDT",
    "owwwwwoDDDDDDDDD",
    "owwwwwoDDDDDDDDo",
  ];
  const CORNER_BL_GRID = [
    "owwwwwoooooooooo",
    "owwwwwwwwwwwwwww",
    "owwwwwwwwwwwwwww",
    "owwwwwwwwwwwwwww",
    "owwwwwwwwwwwwwww",
    "oooooooooooooooo",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
    "VVVVVVVVVVVVVVVV",
  ];

  function wall(ctx, tx, ty, map) {
    const x = tx * T, y = ty * T;
    const rows = map ? map.length : 13;
    const cols = map ? map[0].length : 20;
    const edge = tx === 0 || tx === cols - 1;
    const flip = tx === cols - 1; // right side mirrors the left grids
    let grid;
    if (ty === 0) grid = edge ? CORNER_TL_GRID : WALL_N_GRID;
    else if (ty === 1) grid = edge ? CORNER_TL2_GRID : WALL_N2_GRID;
    else if (ty === rows - 1) grid = edge ? CORNER_BL_GRID : WALL_S_GRID;
    else grid = WALL_SIDE_GRID;
    drawGrid(ctx, grid, x, y, flip, PAL_WALL);
    if (!map) return;
    /* door caps: close the wall run with a 1px outline beside a gap */
    function open(r, c) {
      const ch = map[r][c];
      return "#~".indexOf(ch) === -1;
    }
    ctx.fillStyle = PAL_WALL.o;
    if (ty <= 1 || ty === rows - 1) {
      const capH = ty === rows - 1 ? 6 : T; // south strip is only 6px tall
      if (tx > 0 && open(ty, tx - 1)) ctx.fillRect(x, y, 1, capH);
      if (tx < cols - 1 && open(ty, tx + 1)) ctx.fillRect(x + T - 1, y, 1, capH);
    } else {
      if (ty > 0 && open(ty - 1, tx)) ctx.fillRect(x, y, T, 1);
      if (ty < rows - 1 && open(ty + 1, tx)) ctx.fillRect(x, y + T - 1, T, 1);
    }
  }

  /* window on the lower face row (map '~' goes in row 1, under the strip) */
  function windowNight(ctx, tx, ty, t, map) {
    wall(ctx, tx, ty, map);
    const x = tx * T, y = ty * T;
    ctx.fillStyle = PAL_WALL.o;
    ctx.fillRect(x + 1, y + 1, 14, 12);
    ctx.fillStyle = "#0b1524";
    ctx.fillRect(x + 2, y + 2, 12, 10);
    for (let i = 0; i < 5; i++) {
      const sx = x + 2 + (hash2(tx * 7 + i, ty) % 12);
      const sy = y + 2 + (hash2(i, ty * 5 + tx) % 10);
      const tw = (Math.sin(t * 2 + i * 1.7 + tx) + 1) / 2;
      ctx.fillStyle = tw > 0.55 ? "#9ecbff" : "#40506b";
      ctx.fillRect(sx, sy, 1, 1);
    }
    ctx.fillStyle = PAL_WALL.o;
    ctx.fillRect(x + 7, y + 2, 1, 10); // mullion
    ctx.fillRect(x + 2, y + 6, 12, 1); // transom
  }

  /* lobby: Modern Interiors tan/cream diamond-weave carpet tile */
  function floorLobbyCarpet(ctx, tx, ty) {
    drawGrid(ctx, FLOOR_LOBBY_GRID, tx * T, ty * T, false, PAL_FLOOR_LOBBY);
  }

  /* section rooms: Modern Interiors warm herringbone-weave floor tile */
  function floorCarpetTiles(ctx, tx, ty) {
    drawGrid(ctx, FLOOR_ROOM_GRID, tx * T, ty * T, false, PAL_FLOOR_ROOM);
  }

  /* north door: gold lintel + jambs hand-ported from Generic_Home_1's
     furniture layer (16x32 per tile, mirrored pair over the two-tile gap),
     with a dark opening where its leaf used to be. The leaves are now
     animated_door_4's swing frames 0-4 (same tan-wood-with-glass family),
     hinged at the outer jamb so the pair opens outward from the center. */
  const PAL_DOOR = {
    a: "#ca8854",
    b: "#3a3a50",
    c: "#c4dae8",
    d: "#b5754d",
    e: "#e0b870",
    f: "#565972",
    g: "#b5cdcf",
    h: "#ffffff",
    i: "#46465e",
    j: "#a85f46",
    k: "#b35e3f",
    l: "#d18f5b",
    V: "#05070a",
  };
  const DOOR_FRAME_GRID = [
    "................",
    "................",
    "................",
    "bbbbbbbbbbbbbbbb",
    "aaeeeeeeeeeeeeee",
    "aaeeeeeeeeeeeeee",
    "bbiiiiiiiiiiiiii",
    "ddaaaaaaaaaaaaaa",
    "ddaaaaaaaaaaaaaa",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "ddVVVVVVVVVVVVVV",
    "jjVVVVVVVVVVVVVV",
    "bbVVVVVVVVVVVVVV",
    "................",
  ];
  const DOOR_NORTH_FRAMES = [
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".bbbbbbbbbbbbbb.",
      ".baaaaaaaaaaaab.",
      ".babbbbbbbbbiab.",
      ".babcccchcccfab.",
      ".babccccchccfab.",
      ".babhccccchcfab.",
      ".babhhccccchfab.",
      ".babghhcccccfab.",
      ".baifffffffffab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaekab.",
      ".baaaaaaaaadkab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".baaaaaaaaaaaab.",
      ".bjjjjjjjjjjjjb.",
      ".bbbbbbbbbbbbbb.",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".bbbbbbbbbbbbbb.",
      ".baabcccchhcfdb.",
      ".babccccccchfdb.",
      ".babccccccccfdb.",
      ".babhcccccffddb.",
      ".babhhhcffaaddb.",
      ".babghffaaaekdb.",
      ".babffaaaaadkdb.",
      ".babaaaaaaaaddb.",
      ".baaaaaaaaaaddb.",
      ".baaaaaaaaaaddb.",
      ".baaaaaaaaaaddb.",
      ".baaaaaaaaaaddb.",
      ".baaaaaaaaaaddb.",
      ".baaaaaaaaaadjb.",
      ".baaaaaaaadjbbb.",
      ".baaaaaadjbb..b.",
      ".baaaadjbb....b.",
      ".baadjbb......b.",
      ".bdjbb........b.",
      ".bbb..........b.",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".bbbbbbbbbbbbbb.",
      ".bllbcghhhfdb.b.",
      ".blbcccggfddb.b.",
      ".blbhhccfddab.b.",
      ".blbghhfadddb.b.",
      ".babcgfaadddb.b.",
      ".babcfaaadddb.b.",
      ".babfaaaadddb.b.",
      ".babaaaaadddb.b.",
      ".baaaaaaadddb.b.",
      ".baaaaaaadddb.b.",
      ".baaaaaaaddjb.b.",
      ".baaaaaaadjb..b.",
      ".baaaaaaajb...b.",
      ".baaaaaajb....b.",
      ".baaaaajb.....b.",
      ".baaaajb......b.",
      ".baaajb.......b.",
      ".baajb........b.",
      ".bjjb.........b.",
      ".bbb..........b.",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".bbbbbbbbbbbbbb.",
      ".babcggfjb....b.",
      ".babcgfdjb....b.",
      ".babcgfdjb....b.",
      ".babcfddjb....b.",
      ".babcfddjb....b.",
      ".babfdddjb....b.",
      ".bafadddjb....b.",
      ".baaadddjb....b.",
      ".baaadddjb....b.",
      ".baaadddb.....b.",
      ".baaaddjb.....b.",
      ".baaaddb......b.",
      ".baaadjb......b.",
      ".baaadb.......b.",
      ".baaajb.......b.",
      ".baadb........b.",
      ".baajb........b.",
      ".baab.........b.",
      ".bjjb.........b.",
      ".bbb..........b.",
    ],
    [
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      "................",
      ".bbbbbbbbbbbbbb.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".badb.........b.",
      ".bjjb.........b.",
      ".bbb..........b.",
    ],
  ];
  /* k: swing step 0 (closed) .. 4 (fully open) */
  function doorNorth(ctx, tx, ty, k) {
    const x = tx * T, y = ty * T;
    drawGrid(ctx, DOOR_FRAME_GRID, x, y, false, PAL_DOOR);
    drawGrid(ctx, DOOR_FRAME_GRID, x + T, y, true, PAL_DOOR);
    /* leaves sit 1px in from each tile's outer edge, flush with the jambs */
    const leaf = DOOR_NORTH_FRAMES[Math.max(0, Math.min(4, k | 0))];
    drawGrid(ctx, leaf, x + 1, y, false, PAL_DOOR);
    drawGrid(ctx, leaf, x + T - 1, y, true, PAL_DOOR);
  }

  /* south door: the BACK of the same double door, seen from inside the
     room — following the pack's back-door convention (see the museum
     ticket-office door), only a top slice of the leaves peeks out below
     the south wall's strip. The closed leaves FILL the whole tile: top
     outline flush with the wall top, then wood and each leaf's glass
     band stretched to the screen edge — no void, the door itself runs
     off the bottom of the frame. One 16x16 grid per tile, mirrored for
     the right leaf (seam shade meets at the pair's center). Static on
     purpose — a leaf swinging away from the camera shows nothing from
     behind. */
  const DOOR_SOUTH_GRID = [
    "bbbbbbbbbbbbbbbb",
    "baaaaaaaaaaaaaad",
    "baaaaaaaaaaaaaad",
    "babccccccccccfad",
    "babccccccccccfad",
    "babhcccccccccfad",
    "babhcccccccccfad",
    "babccccccccccfad",
    "babccccccccccfad",
    "baifffffffffffad",
    "baaaaaaaaaaaaaad",
    "baaaaaaaaaaaaaad",
    "baaaaaaaaaaaaaad",
    "baaaaaaaaaaaaaad",
    "bjjjjjjjjjjjjjjd",
    "bjjjjjjjjjjjjjjd",
  ];
  function doorSouth(ctx, tx, ty) {
    drawGrid(ctx, DOOR_SOUTH_GRID, tx * T, ty * T, false, PAL_DOOR);
    drawGrid(ctx, DOOR_SOUTH_GRID, (tx + 1) * T, ty * T, true, PAL_DOOR);
  }

  /* side door: animated_door_vertical_left_1, the pack's swing frames 0-4
     (closed -> ajar -> fully open) remapped onto PAL_DOOR. Each frame is
     the pack's full 32x48 cell: edge-on the leaf shows its full standing
     height, which is why side doors run taller than the face-on north
     door — the pack pairs them this way. The leaf swings LEFT, so the
     unflipped frames fit the east wall (opening into the room); flip
     mirrors them for the west. Drawn two rows above the gap so the closed
     leaf's base sits on the gap's bottom edge, inset 2px sideways so the
     closed sliver hugs the wall's inner face. */
  const DOOR_SIDE_FRAMES = [
    [
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "...................bbbb.........",
      "...................baab.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................ieei.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................baab.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
      "...................bddb.........",
    ],
    [
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      ".....................bb.........",
      "....................bab.........",
      "....................bab.........",
      "...................iaab.........",
      "...................iaib.........",
      "..................ieadb.........",
      "..................ieidb.........",
      ".................ieeddb.........",
      ".................ieijdb.........",
      "................ieeajdb.........",
      "................ieiajdb.........",
      "...............ieeajjdb.........",
      "...............ieiajjdb.........",
      "..............ieeajajdb.........",
      "..............ieiajajdb.........",
      ".............ieeajaajdb.........",
      ".............iejajaajdb.........",
      ".............iijeaaaddb.........",
      ".............bjjeaaeddb.........",
      ".............bjjeaaeddb.........",
      ".............bjjeaeaddb.........",
      ".............bjjeaeaddb.........",
      ".............bjjeeaaddb.........",
      ".............bjjeeaaddb.........",
      ".............bjjeaaaddb.........",
      ".............bjjeaaaddb.........",
      ".............bjjaaaadjb.........",
      ".............bjjaaaadb..........",
      ".............bjjeaaaj...........",
      ".............bjjdaaab...........",
      ".............bjjaaaj............",
      ".............bjjaaab............",
      ".............bjjaaj.............",
      ".............bjjaab.............",
      ".............bjjaj..............",
      ".............bjjab..............",
      ".............bjjj...............",
      ".............bjjb...............",
      ".............bjj................",
      ".............bbb................",
      "................................",
    ],
    [
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      ".....................bb.........",
      "....................bab.........",
      "...................iaab.........",
      "..................ieabb.........",
      ".................ieebdb.........",
      "................ieeiddb.........",
      "...............ieeiaddb.........",
      "..............ieeiaajdb.........",
      ".............ieeiaajjdb.........",
      "............ieeiaajajdb.........",
      "...........ieeiaajaajdb.........",
      "..........ieeiaajaaajdb.........",
      ".........ieeiaajaaaajdb.........",
      "........ieeiaajaaaaajdb.........",
      "........ieiaajaaaaaajdb.........",
      "........iijaaaaaaaaajdb.........",
      "........bjjaeaaaaaaaddb.........",
      "........bjjaeaaaaaaeddb.........",
      "........bjjaeaaaaaeaddb.........",
      "........bjjaeaaaaeaaddb.........",
      "........bjjaeaaaeaaaddb.........",
      "........bjjaeaaeaaaaddb.........",
      "........bjjaeaeaaaaaddb.........",
      "........bjjaeeaaaaaaddb.........",
      "........bjjaeaaaaaaaddb.........",
      "........bjjaaaaaaaaaddb.........",
      "........bjjaaaaaaaaadjb.........",
      "........bjjaeaaaaaaajb..........",
      "........bjjjdaaaaaajb...........",
      "........bjjjaaaaaajb............",
      "........bjjaaaaaajb.............",
      "........bjjaaaaajb..............",
      "........bjjaaaajb...............",
      "........bjjaaajb................",
      "........bjjaajb.................",
      "........bjjajb..................",
      "........bjjjb...................",
      "........bjjb....................",
      "........bbb.....................",
      "................................",
      "................................",
    ],
    [
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "....................bbb.........",
      "..................iiaab.........",
      "................iieeaab.........",
      "..............iieeeebbb.........",
      "............iieeeeiiddb.........",
      "..........iieeeeiiaaddb.........",
      "........iieeeeiiaaaaddb.........",
      "......iieeeeiiaaaajjddb.........",
      ".....ieeeeiiaaaajjajddb.........",
      ".....ieeiiaaaajjaaajddb.........",
      ".....iiiaaaajjaaaaajddb.........",
      ".....bjaaajjaaaaaaajddb.........",
      ".....bjaajaaaaaaaaajddb.........",
      ".....bjaeaaaaaaaaaajddb.........",
      ".....bjaeaaaaaaaaaajddb.........",
      ".....bjaeaaaaaaaaaajddb.........",
      ".....bjaeaaaaaaaaaeaddb.........",
      ".....bjaeaaaaaaaeeaaddb.........",
      ".....bjaeaaaaaeeaaaaddb.........",
      ".....bjaeaaaeeaaaaaaddb.........",
      ".....bjaeaeeaaaaaaaaddb.........",
      ".....bjaeeaaaaaaaaaaddb.........",
      ".....bjaaaaaaaaaaaaaddb.........",
      ".....bjaaaaaaaaaaaaaddb.........",
      ".....bjaeaaaaaaaaaaaddb.........",
      ".....bjjdaaaaaaaaaaaddb.........",
      ".....bjjaaaaaaaaaaaajjb.........",
      ".....bjaaaaaaaaaaajjbbb.........",
      ".....bjaaaaaaaaajjbb............",
      ".....bjaaaaaaajjbb..............",
      ".....bjaaaaajjbb................",
      ".....bjaaajjbb..................",
      ".....bjajjbb....................",
      ".....bjjbb......................",
      ".....bbb........................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
    ],
    [
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      ".....iiiiiiiiiiiiiiibbb.........",
      ".....ieeeeeeeeeeeeeeaab.........",
      ".....ieeeeeeeeeeeeeeaab.........",
      ".....iiiiiiiiiiiiiiibbb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaakkkkkkkkkkkddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeaaaaaaaaaakddb.........",
      ".....baaeeeeeeeeeeeaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....bakeaaaaaaaaaaaddb.........",
      ".....bakdaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....baaaaaaaaaaaaaaddb.........",
      ".....bjjjjjjjjjjjjjjjjb.........",
      ".....bbbbbbbbbbbbbbbbbb.........",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
      "................................",
    ],
  ];
  /* k: swing step 0 (closed) .. 4 (fully open); gapRow = door tile's row */
  function doorSide(ctx, tx, gapRow, flip, k) {
    const frame = DOOR_SIDE_FRAMES[Math.max(0, Math.min(4, k | 0))];
    const x = flip ? tx * T + 2 : tx * T + T - 34;
    drawGrid(ctx, frame, x, (gapRow - 2) * T, flip, PAL_DOOR);
  }

  const TILES = { floorLobbyCarpet, floorCarpetTiles, wall, windowNight, doorNorth, doorSide, doorSouth };

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

  /* potted palm hand-ported from 1_Generic_16x16.png's Theme Sorter sheet
     (32x48 — two tiles wide, three tall); lobby corner accent */
  const PAL_PALM = {
    a: "#3a3a50",
    b: "#4e6e61",
    c: "#a9764f",
    d: "#568d61",
    e: "#6b4c2c",
    f: "#9bc246",
    g: "#a79796",
    h: "#916e41",
    i: "#455c5b",
    j: "#f2bd7a",
  };
  const PALM_GRID = [
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "...................aaa..........",
    "......aaaa........affda.........",
    ".....aabffa..aaa.affbaba........",
    "....abaabdfaabbbafdbaaaba.......",
    "....aa..abddaiiiadda...aa.......",
    ".........aaddaiiiaaaaaaa........",
    "........aaaaaiaaaiiddffba.......",
    ".......adfffdbaaaabbbbdfba......",
    "......afffddbaiiiiaaaaadfba.....",
    ".....afdbbbbaabbbba....adda.....",
    "....afdbaaaaaaaddba.....ada.....",
    "....adba....aeadfdba....ada.....",
    "....ada.....aeabffba.....aa.....",
    "....aba.....aheadfba......a.....",
    "....aa......ahhabdfa............",
    "............aehhabfa............",
    "............aheehada............",
    "............ahcchaaa............",
    "............aeccea..............",
    "..........aaaheehaaa............",
    ".........ajeahcchaeca...........",
    ".........ajeaecceaeca...........",
    ".........ajeeeeeeeeca...........",
    ".........ajeeeeeeeeca...........",
    ".........ajjjjjjcjcca...........",
    "........gaaaaaaaaaaaag..........",
    "........gahhhhhhhhhhag..........",
    "........gaccccccccchag..........",
    "........gaccccccccchag..........",
    "........ggaaaaaaaaaagg..........",
    "........gggggggggggggg..........",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
  ];
  function palmPlant(ctx, px, py) {
    drawGrid(ctx, PALM_GRID, px, py, false, PAL_PALM);
  }

  /* framed world map hand-ported from 2_LivingRoom_Black_Shadow_16x16.png
     (32x32 — two tiles wide and tall, navy frame matches PAL_WALL.o); wall art */
  const PAL_MAP = {
    a: "#a4dc77",
    b: "#53aedb",
    c: "#3a3a50",
    d: "#e8dbdd",
    e: "#b9e881",
    f: "#f8f8f8",
    g: "#7ebddd",
    h: "#6fd7ec",
    i: "#5dc4e8",
  };
  const MAP_GRID = [
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "................................",
    "cccccccccccccccccccccccccccccccc",
    "cffffffffffffffffffffffffffffffc",
    "cdhhhheeehaahhhheeeeeehhhhhhhhdc",
    "cdbbbaaabaaabbbaaaaaaaaaaaaaaadc",
    "cdeeeeeieeeeiieeeeeeeeeeeeeeeedc",
    "cdaaaaaabaaabaaaaaaaaaaaaaaaabdc",
    "cdieeeeeiaiiieeeeeeeeeeeeeeeiidc",
    "cdbaaaaaabbbbaaaaaaaaaaaaaaabbdc",
    "cdbbbaaaaabbbababbaaaaaaaaaaabdc",
    "cdbbbaaaabbbbbbbbbbbbbaaaaaaabdc",
    "cdbbbbaabbbbaabbbbabbaaaaaaaabdc",
    "cdbbbbbbbbbbaaaaaaabgbbbbaaaabdc",
    "cdbbbbaaaabbaaaaaabgggbbbbbbbbdc",
    "cdbgbbaaaabbbbaaaabbgggbaaaabbdc",
    "cdbgbbbaaabbgbaaabbbggbbaaabbbdc",
    "cdggbbbaabbbbbaabbbgggbbbbbbbbdc",
    "cdggbbaabbbbbbbbbbbbbbbbbbbbbbdc",
    "cddddddddddddddddddddddddddddddc",
    "cccccccccccccccccccccccccccccccc",
    "................................",
    "................................",
    "................................",
    "................................",
  ];
  function wallMap(ctx, px, py) {
    drawGrid(ctx, MAP_GRID, px, py, false, PAL_MAP);
  }

  /* fire extinguisher hand-ported from 13_Conference_Hall_Black_Shadow_16x16.png
     (16x32 — one tile wide, two tall) */
  const PAL_EXTINGUISHER = {
    a: "#3a3a50",
    b: "#46465e",
    c: "#8b8bab",
    d: "#ebe4f2",
    e: "#e63f38",
    f: "#fc5c46",
    g: "#d93232",
    h: "#a82b2d",
    i: "#50a7e8",
    j: "#f8f8f8",
    k: "#565972",
    l: "#9acaef",
    m: "#6c6e85",
    n: "#b95e64",
    o: "#ff8575",
  };
  const EXTINGUISHER_GRID = [
    "................",
    "................",
    "................",
    "................",
    "........baa.....",
    "......abcccab...",
    ".....accjdaccb..",
    "....acbafnmaaa..",
    "...acbafeebma...",
    "...acbagfffba...",
    "...acbageogha...",
    "...bcbagefgha...",
    "...kckagefgha...",
    "..kck.adefgda...",
    "..bdb.aijjdia...",
    "..aeb.adllida...",
    "...a..aijjdia...",
    "......adllida...",
    "......aedddea...",
    "......ahhhhha...",
    ".......aaaaa....",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
    "................",
  ];
  function fireExtinguisher(ctx, px, py) {
    drawGrid(ctx, EXTINGUISHER_GRID, px, py, false, PAL_EXTINGUISHER);
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
    rug, neonRug, doormat, mug, plant, palmPlant, wallMap, fireExtinguisher,
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
