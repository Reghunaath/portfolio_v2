/* ─── REGHU.EXE — rooms, furniture, doors ───────────────────────────────── */
/* global window */

window.World = (function () {
  const T = 16; // tile px
  const COLS = 20, ROWS = 13; // 320 x 208

  /*
   * map legend: '#' wall · '~' window wall · '.' floor
   *             'n','s','e','w' door tiles (walkable, trigger a transition)
   * furniture: x,y,w,h in tiles; painter from Sprites.PAINTERS
   *            dialog → id in GAME_DATA.dialogs; solid defaults true
   */

  const rooms = {
    hub: {
      label: "~/lobby",
      floor: "floorLobbyCarpet",
      map: [
        "###~~####nn####~~###",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "w..................e",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#########ss#########",
      ],
      doors: {
        n: { to: "arcade", spawn: [160, 180], face: "up", hint: "projects/" },
        s: { to: "comms", spawn: [160, 36], face: "down", hint: "contact/" },
        w: { to: "library", spawn: [290, 108], face: "left", hint: "education/" },
        e: { to: "office", spawn: [30, 108], face: "right", hint: "experience/" },
      },
      /* hotel-lobby layout: centered reception with a walkway around each
         side (cols 6 and 13), symmetric waiting corners, warm accents */
      tint: "rgba(240,160,70,0.05)",
      furniture: [
        /* north corners */
        { painter: "plant", x: 1, y: 1, w: 1, h: 2 },
        { painter: "plant", x: 18, y: 1, w: 1, h: 2 },
        /* centered reception */
        { painter: "receptionist", x: 9.5, y: 3.5, w: 1, h: 1 },
        { painter: "receptionDesk", x: 7, y: 4, w: 6, h: 2, dialog: "lobby-reception" },
        /* coffee mug on the counter's left end; overhead so it draws above the
           desk instead of being painted over by it. Hitbox matches the desk's
           full height so the front-facing interact probe (which lands well
           below the visual counter line) can still reach it */
        { painter: "mug", x: 8, y: 4, w: 1, h: 2, solid: false, overhead: true, dialog: "hub-mug" },
        /* tucked right against the desk; non-solid so the col 6/13 aisles stay walkable */
        { painter: "lobbyLamp", x: 6, y: 4, w: 1, h: 2, solid: false },
        { painter: "lobbyLamp", x: 13, y: 4, w: 1, h: 2, solid: false },
        /* forest-green rug with a brass ring — sits against the burgundy carpet */
        { painter: "rug", x: 6, y: 7, w: 8, h: 3, solid: false, c1: "#24422e", c2: "#a87e3e" },
        /* corner plant */
        { painter: "plant", x: 1, y: 10, w: 1, h: 2 },
        /* entrance */
        { painter: "doormat", x: 8, y: 11, w: 4, h: 1, solid: false },
        { painter: "trophyBig", x: 12, y: 6, w: 1, h: 1, dialog: "hub-trophy", requires: "questDone" },
      ],
      cat: true,
    },

    arcade: {
      label: "~/projects",
      floor: "floorCarpetTiles",
      map: [
        "####################",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#########ss#########",
      ],
      doors: {
        s: { to: "hub", spawn: [160, 36], face: "down", hint: "lobby/" },
      },
      furniture: [
        { painter: "arcadeCab", x: 2, y: 1, w: 2, h: 1.5, dialog: "proj-rescueline", color: "#a13232", screen: "#ffb3ab", trophy: true },
        { painter: "arcadeCab", x: 5, y: 1, w: 2, h: 1.5, dialog: "proj-doodlpop", color: "#6e40c9", screen: "#d2a8ff", trophy: true },
        { painter: "arcadeCab", x: 8, y: 1, w: 2, h: 1.5, dialog: "proj-leadcatch", color: "#1f6feb", screen: "#a5d6ff", trophy: true },
        { painter: "arcadeCab", x: 11, y: 1, w: 2, h: 1.5, dialog: "proj-snapback", color: "#2da44e", screen: "#aff5b4", trophy: true },
        { painter: "arcadeCab", x: 14, y: 1, w: 2, h: 1.5, dialog: "proj-deadpool", color: "#57606a", screen: "#ff7b72" },
        { painter: "neonRug", x: 7, y: 6, w: 6, h: 3, solid: false },
        { painter: "clawMachine", x: 17, y: 8, w: 2, h: 2.2, dialog: "proj-claw" },
        { painter: "plant", x: 1, y: 10, w: 1, h: 2 },
      ],
    },

    office: {
      label: "~/experience",
      floor: "floorCarpetTiles",
      map: [
        "####################",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "w..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "####################",
      ],
      doors: {
        w: { to: "hub", spawn: [290, 108], face: "left", hint: "lobby/" },
      },
      furniture: [
        { painter: "whiteboard", x: 8, y: 0, w: 2.5, h: 1, solid: false },
        { painter: "deskStation", x: 2, y: 2, w: 3, h: 2, dialog: "exp-quantu", color: "#e3b341" },
        { painter: "deskStation", x: 8, y: 2, w: 3, h: 2, dialog: "exp-neu-ta", color: "#f85149" },
        { painter: "deskStation", x: 14, y: 2, w: 3, h: 2, dialog: "exp-infosys", color: "#58a6ff" },
        { painter: "deskStation", x: 5, y: 7, w: 3, h: 2, dialog: "exp-danske-se", color: "#3fb950" },
        { painter: "deskStation", x: 11, y: 7, w: 3, h: 2, dialog: "exp-danske-app", color: "#a371f7" },
        { painter: "waterCooler", x: 18, y: 1, w: 1, h: 2, dialog: "exp-cooler" },
        { painter: "plant", x: 1, y: 10, w: 1, h: 2 },
      ],
    },

    library: {
      label: "~/education",
      floor: "floorCarpetTiles",
      map: [
        "####################",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................e",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "####################",
      ],
      doors: {
        e: { to: "hub", spawn: [30, 108], face: "right", hint: "lobby/" },
      },
      furniture: [
        { painter: "bookshelf", x: 2, y: 1, w: 4, h: 2, dialog: "edu-shelf" },
        { painter: "bookshelf", x: 14, y: 1, w: 4, h: 2, dialog: "edu-shelf" },
        { painter: "diploma", x: 8, y: 0, w: 1, h: 1, dialog: "edu-neu", color: "#c93c35", wallMounted: true },
        { painter: "diploma", x: 11, y: 0, w: 1, h: 1, dialog: "edu-vit", color: "#1f6feb", wallMounted: true },
        { painter: "lectern", x: 9, y: 6, w: 2, h: 1.2, dialog: "edu-paper" },
        { painter: "bookshelf", x: 3, y: 9, w: 4, h: 2, dialog: "edu-shelf" },
        { painter: "globe", x: 16, y: 9, w: 1, h: 1, dialog: "edu-globe" },
        { painter: "plant", x: 1, y: 9, w: 1, h: 2 },
      ],
    },

    comms: {
      label: "~/contact",
      floor: "floorCarpetTiles",
      map: [
        "#########nn#########",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "#..................#",
        "####################",
      ],
      doors: {
        n: { to: "hub", spawn: [160, 180], face: "up", hint: "lobby/" },
      },
      furniture: [
        { painter: "kiosk", x: 2, y: 1, w: 2, h: 2, dialog: "contact-email", icon: "mail", color: "#3fb950" },
        { painter: "kiosk", x: 5, y: 1, w: 2, h: 2, dialog: "contact-phone", icon: "phone", color: "#58a6ff" },
        { painter: "kiosk", x: 13, y: 1, w: 2, h: 2, dialog: "contact-linkedin", icon: "in", color: "#79c0ff" },
        { painter: "kiosk", x: 16, y: 1, w: 2, h: 2, dialog: "contact-github", icon: "gh", color: "#a371f7" },
        { painter: "printer", x: 1, y: 6, w: 2, h: 1.4, dialog: "contact-printer" },
        { painter: "serverRack", x: 17, y: 7, w: 2, h: 3, dialog: "contact-server" },
        { painter: "rug", x: 6, y: 5, w: 8, h: 4, solid: false },
      ],
    },
  };

  /* room-visit stamps shown in the HUD */
  const STAMP_ROOMS = ["arcade", "office", "library", "comms"];

  /* precompute per-room: solid tile rects, door rects, furniture px rects */
  Object.keys(rooms).forEach(function (id) {
    const room = rooms[id];
    room.id = id;
    room.solids = [];
    room.doorRects = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const ch = room.map[r][c];
        if (ch === "#" || ch === "~") {
          room.solids.push({ x: c * T, y: r * T, w: T, h: T });
        } else if ("nsew".indexOf(ch) !== -1) {
          const d = room.doors[ch];
          if (d) room.doorRects.push({ x: c * T, y: r * T, w: T, h: T, door: d, ch: ch });
        }
      }
    }
    room.furniture.forEach(function (f) {
      f.px = f.x * T;
      f.py = f.y * T;
      f.pw = f.w * T;
      f.ph = f.h * T;
      if (f.solid !== false && !f.wallMounted) {
        room.solids.push({ x: f.px, y: f.py, w: f.pw, h: f.ph, furn: f });
      }
    });
  });

  return { rooms: rooms, T: T, COLS: COLS, ROWS: ROWS, STAMP_ROOMS: STAMP_ROOMS };
})();
