/* ─── REGHU.EXE — rooms, furniture, doors ───────────────────────────────── */
/* global window */

window.World = (function () {
  const T = 16; // tile px
  const COLS = 20,
    ROWS = 13; // 320 x 208

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
        "#########nn#########",
        "#########..#########",
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
        w: {
          to: "library",
          spawn: [290, 108],
          face: "left",
          hint: "education/",
        },
        e: {
          to: "office",
          spawn: [30, 108],
          face: "right",
          hint: "experience/",
        },
      },
      /* hotel-lobby layout: centered reception with a walkway around each
         side (cols 6 and 13), symmetric waiting corners, warm accents */
      tint: "rgba(240,160,70,0.05)",
      furniture: [
        /* north corners */
        { painter: "palmPlant", x: 0.5, y: 0, w: 2, h: 3 },
        { painter: "palmPlant", x: 17.5, y: 0, w: 2, h: 3 },
        /* fire extinguisher, bottom-aligned against the right corner palm */
        { painter: "fireExtinguisher", x: 16.5, y: 0.33, w: 1, h: 2 },
        /* framed world map, wall face between the corner palm and the door */
        {
          painter: "wallMap",
          x: 5,
          y: 0,
          w: 2,
          h: 2,
          wallMounted: true,
          dialog: "hub-map",
        },
        /* centered reception — the hospital-pack U counter, reworked white
           and 96x37 px (cols 7-12; open behind the receptionist). Bottom
           edge stays at row 6 (y=96) for the intro walk-up; the counter's
           bottom edge depth-sorts it over the receptionist's feet. */
        { painter: "receptionist", x: 9.5, y: 3.875, w: 1, h: 1 },
        {
          painter: "receptionCounter",
          x: 7,
          y: 3.6875,
          w: 6,
          h: 2.3125,
          dialog: "lobby-reception",
        },
        /* coffee mug resting on the front counter's white top face, just
           beside the receptionist's right hand; sortY pins it just past the
           counter's depth line (row 6) so the counter doesn't paint over it,
           while a player at the desk front (feet ~y 103) still draws on top.
           Hitbox bottom stays on the counter's floor line so the
           front-facing interact probe (which lands well below the visual
           counter line) can still reach it — the mug painter pulls the
           sprite up so the cup's base sits on the countertop instead of at
           the box's bottom */
        {
          painter: "mug",
          x: 8.625,
          y: 5.125,
          w: 1,
          h: 0.8125,
          solid: false,
          sortY: 6.05,
          dialog: "hub-mug",
        },
        /* desk telephone on the counter's left run — uses the mug's trick:
           box bottom on the counter floor line for the probe, sprite
           pulled up onto the white top face by the painter */
        {
          painter: "deskPhone",
          x: 7.375,
          y: 5.125,
          w: 1,
          h: 0.8125,
          solid: false,
          sortY: 6.05,
          dialog: "hub-phone",
        },
        /* forest-green rug with a brass ring — sits against the burgundy carpet */
        {
          painter: "rug",
          x: 6,
          y: 7,
          w: 8,
          h: 3,
          solid: false,
          c1: "#24422e",
          c2: "#a87e3e",
        },
        {
          painter: "trophyBig",
          x: 12,
          y: 6,
          w: 1,
          h: 1,
          dialog: "hub-trophy",
          requires: "questDone",
        },
      ],
      cat: true,
    },

    arcade: {
      label: "~/projects",
      floor: "floorCarpetTiles",
      map: [
        "####################",
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
        "#########ss#########",
      ],
      doors: {
        s: { to: "hub", spawn: [160, 36], face: "down", hint: "lobby/" },
      },
      furniture: [
        /* five computers centered on the room: 1 tile off each wall,
           uniform 1.5-tile gaps */
        {
          painter: "computerDesk",
          x: 2,
          y: 2,
          w: 2,
          h: 1.5,
          dialog: "proj-rescueline",
        },
        {
          painter: "computerDesk",
          x: 5.5,
          y: 2,
          w: 2,
          h: 1.5,
          dialog: "proj-doodlpop",
        },
        {
          painter: "computerDesk",
          x: 9,
          y: 2,
          w: 2,
          h: 1.5,
          dialog: "proj-leadcatch",
        },
        {
          painter: "computerDesk",
          x: 12.5,
          y: 2,
          w: 2,
          h: 1.5,
          dialog: "proj-snapback",
        },
        {
          painter: "computerDesk",
          x: 16,
          y: 2,
          w: 2,
          h: 1.5,
          dialog: "proj-deadpool",
        },
        /* stools centered in front of each desk (walkable) */
        { painter: "stool", x: 2.5, y: 3.5, w: 1, h: 1, solid: false },
        { painter: "stool", x: 6, y: 3.5, w: 1, h: 1, solid: false },
        { painter: "stool", x: 9.5, y: 3.5, w: 1, h: 1, solid: false },
        { painter: "stool", x: 13, y: 3.5, w: 1, h: 1, solid: false },
        { painter: "stool", x: 16.5, y: 3.5, w: 1, h: 1, solid: false },
        /* greenery in the bottom corners */
        { painter: "pottedBush", x: 1, y: 10, w: 2, h: 2 },
        { painter: "pottedPlant", x: 18, y: 10, w: 1, h: 2 },
      ],
    },

    office: {
      label: "~/experience",
      floor: "floorCarpetTiles",
      map: [
        "####################",
        "####################",
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
      /* open-plan cubicle farm like the Modern Office pack's reference room:
         two rows of partition-walled workstations (one per experience entry,
         company-colored screens), each with an office chair in the open
         front — the chair tile is walkable, and idling on it sits the player
         at the desk. Per cubicle: a solid back rect (partition + desk, the
         dialog target), two thin solid side-wall strips flanking the mouth,
         and the non-solid chair. Corridor row ~5.5-6.9 (the west door lane)
         stays clear between the rows. */
      furniture: [
        {
          painter: "whiteboard",
          x: 14.4375,
          y: 0.27,
          w: 1.875,
          h: 1.4375,
          wallMounted: true,
        },
        /* top row — backs against the north wall */
        {
          /* nudged 1px left (and widened to match) so its left post overlaps
             the west wall's own inner-face edge line instead of sitting
             1px to the right of it — otherwise the two navy lines sit
             side by side and read as a doubled/thicker wall */
          painter: "cubicle",
          x: 0.9375,
          y: 2,
          w: 4.0625,
          h: 2.625,
          dialog: "exp-quantu",
          color: "#e3b341",
          deskItem: "quantu",
        },
        { painter: "cubicleSide", x: 0.9375, y: 4.625, w: 0.1875, h: 0.875 },
        { painter: "cubicleSide", x: 4.8125, y: 4.625, w: 0.1875, h: 0.875 },
        {
          painter: "officeChair",
          x: 2.5,
          y: 4.125,
          w: 1,
          h: 1.3125,
          solid: false,
          sortY: 5.4375,
        },
        {
          painter: "cubicle",
          x: 5,
          y: 2,
          w: 4,
          h: 2.625,
          dialog: "exp-neu-ta",
          color: "#f85149",
          deskItem: "neuta",
          noLeftPost: true,
        },
        { painter: "cubicleSide", x: 8.8125, y: 4.625, w: 0.1875, h: 0.875 },
        {
          painter: "officeChair",
          x: 6.5,
          y: 4.125,
          w: 1,
          h: 1.3125,
          solid: false,
          sortY: 5.4375,
        },
        {
          painter: "cubicle",
          x: 9,
          y: 2,
          w: 4,
          h: 2.625,
          dialog: "exp-infosys",
          color: "#58a6ff",
          deskItem: "infosys",
          noLeftPost: true,
        },
        { painter: "cubicleSide", x: 12.8125, y: 4.625, w: 0.1875, h: 0.875 },
        {
          painter: "officeChair",
          x: 10.5,
          y: 4.125,
          w: 1,
          h: 1.3125,
          solid: false,
          sortY: 5.4375,
        },
        /* bottom row — gray desks, partitions standing free on the carpet */
        {
          painter: "cubicle",
          x: 5,
          y: 7,
          w: 4,
          h: 2.625,
          dialog: "exp-danske-se",
          color: "#3fb950",
          desk: "gray",
          deskItem: "danskeSe",
        },
        { painter: "cubicleSide", x: 5, y: 9.625, w: 0.1875, h: 0.875 },
        { painter: "cubicleSide", x: 8.8125, y: 9.625, w: 0.1875, h: 0.875 },
        {
          painter: "officeChair",
          x: 6.5,
          y: 9.125,
          w: 1,
          h: 1.3125,
          solid: false,
          sortY: 10.4375,
        },
        {
          painter: "cubicle",
          x: 9,
          y: 7,
          w: 4,
          h: 2.625,
          dialog: "exp-danske-app",
          color: "#a371f7",
          desk: "gray",
          deskItem: "danskeApp",
          noLeftPost: true,
        },
        { painter: "cubicleSide", x: 12.8125, y: 9.625, w: 0.1875, h: 0.875 },
        {
          painter: "officeChair",
          x: 10.5,
          y: 9.125,
          w: 1,
          h: 1.3125,
          solid: false,
          sortY: 10.4375,
        },
        {
          painter: "waterCooler",
          x: 18.1875,
          y: 1,
          w: 0.8125,
          h: 1.875,
          dialog: "exp-cooler",
        },
        { painter: "pottedPlant", x: 1, y: 10, w: 1, h: 2 },
        { painter: "pottedPlant", x: 18, y: 10, w: 1, h: 2 },
      ],
    },

    library: {
      label: "~/education",
      floor: "floorCarpetTiles",
      map: [
        "####################",
        "####################",
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
        /* pack library shelves (47px = 3 tiles wide) lined down the west
           wall; the top one overlaps the wall face like the pack rooms */
        { painter: "bookshelf", x: 1, y: 2, w: 3, h: 2, dialog: "edu-shelf" },
        { painter: "bookshelf", x: 1, y: 5, w: 3, h: 2, dialog: "edu-shelf" },
        /* hung centered on the two-tile wall face */
        {
          painter: "diploma",
          x: 8,
          y: 0.6875,
          w: 1,
          h: 1,
          dialog: "edu-neu",
          school: "neu",
          wallMounted: true,
        },
        {
          painter: "diploma",
          x: 11,
          y: 0.6875,
          w: 1,
          h: 1,
          dialog: "edu-vit",
          school: "vit",
          wallMounted: true,
        },
        /* open-book display stand, centered on the room (sprite is 17x29 —
           the tall pedestal top rises well above its 1.25-tile footprint) */
        {
          painter: "lectern",
          x: 9.375,
          y: 6,
          w: 1.25,
          h: 1.25,
          dialog: "edu-paper",
        },
        { painter: "bookshelf", x: 1, y: 8, w: 3, h: 2, dialog: "edu-shelf" },
        /* greenery on the right side — clear of the east door row (6). The
           bush grid has ~5px transparent margins, so it's nudged right to
           sit flush against the bottom-right corner walls */
        { painter: "palmPlant", x: 17.5, y: 0, w: 2, h: 3 },
        { painter: "pottedBush", x: 17.5, y: 10, w: 2, h: 2 },
      ],
    },

    comms: {
      label: "~/contact",
      floor: "floorCarpetTiles",
      map: [
        "#########nn#########",
        "#########..#########",
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
        {
          painter: "kiosk",
          x: 2,
          y: 2,
          w: 2,
          h: 2,
          dialog: "contact-email",
          icon: "mail",
          color: "#3fb950",
        },
        {
          painter: "kiosk",
          x: 5,
          y: 2,
          w: 2,
          h: 2,
          dialog: "contact-phone",
          icon: "phone",
          color: "#58a6ff",
        },
        {
          painter: "kiosk",
          x: 13,
          y: 2,
          w: 2,
          h: 2,
          dialog: "contact-linkedin",
          icon: "in",
          color: "#79c0ff",
        },
        {
          painter: "kiosk",
          x: 16,
          y: 2,
          w: 2,
          h: 2,
          dialog: "contact-github",
          icon: "gh",
          color: "#a371f7",
        },
        {
          painter: "printer",
          x: 1,
          y: 6,
          w: 2,
          h: 1.4,
          dialog: "contact-printer",
        },
        {
          painter: "serverRack",
          x: 17,
          y: 7,
          w: 2,
          h: 3,
          dialog: "contact-server",
        },
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
          if (d)
            room.doorRects.push({
              x: c * T,
              y: r * T,
              w: T,
              h: T,
              door: d,
              ch: ch,
            });
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

  return {
    rooms: rooms,
    T: T,
    COLS: COLS,
    ROWS: ROWS,
    STAMP_ROOMS: STAMP_ROOMS,
  };
})();
