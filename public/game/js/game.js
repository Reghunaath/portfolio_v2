/* ─── REGHU.EXE — engine: loop, input, collision, quest, audio ──────────── */
/* global window, document, localStorage, requestAnimationFrame, performance */
/* global World, Sprites, UI, GAME_DATA */

(function () {
  "use strict";

  const T = World.T,
    VW = World.COLS * T,
    VH = World.ROWS * T;
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  canvas.width = VW;
  canvas.height = VH;
  ctx.imageSmoothingEnabled = false;

  const reduceMotion = UI.reduceMotion;

  /* ── persistent state ─────────────────────────────────────────────── */
  const SAVE_KEY = "reghu-quest-v1";
  let save = {
    seen: [],
    rooms: [],
    coffee: 0,
    sound: true,
    done: false,
    name: "",
    nameSkipped: false,
    feedback: null, // { rating, comment, at, pct, name } once given
    feedbackAsked: false, // the receptionist asks for feedback exactly once
    basement: false, // the odd library book was pulled; the staircase exists
    basementNumber: null, // finder ordinal assigned by /api/basement, once claimed
  };
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) save = Object.assign(save, JSON.parse(raw));
  } catch (e) {
    /* private mode etc. */
  }
  function persist() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch (e) {
      /* no-op */
    }
  }

  /* ── audio: tiny square-wave chiptune blips ───────────────────────── */
  let audioCtx = null;
  function beep(freq, dur, vol, type, when) {
    if (!save.sound) return;
    try {
      if (!audioCtx)
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const t0 = audioCtx.currentTime + (when || 0);
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type || "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol || 0.04, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t0);
      osc.stop(t0 + dur + 0.02);
    } catch (e) {
      /* audio unavailable */
    }
  }
  const sfx = {
    open: function () {
      beep(660, 0.08, 0.04);
      beep(880, 0.1, 0.04, "square", 0.06);
    },
    close: function () {
      beep(440, 0.08, 0.03);
    },
    door: function () {
      beep(220, 0.12, 0.05, "triangle");
      beep(330, 0.12, 0.05, "triangle", 0.08);
    },
    stamp: function () {
      beep(880, 0.07, 0.05);
      beep(1174, 0.12, 0.05, "square", 0.07);
    },
    fanfare: function () {
      [523, 659, 784, 1046, 784, 1046].forEach(function (f, i) {
        beep(f, 0.14, 0.05, "square", i * 0.12);
      });
    },
    coffee: function () {
      beep(392, 0.06, 0.04);
      beep(523, 0.09, 0.04, "square", 0.05);
    },
    crash: function () {
      /* descending power-down warble */
      [440, 330, 247, 165, 110].forEach(function (f, i) {
        beep(f, 0.16, 0.06, "sawtooth", i * 0.1);
      });
    },
    rumble: function () {
      /* low stone-grinding descent — the library floor sliding open. A
         sustained ~2s rumble: overlapping low triangle grinds stepping
         downward (132→~58 Hz), timed to end as the shake settles. */
      for (let i = 0; i < 13; i++) {
        beep(132 - i * 6, 0.3, 0.06, "triangle", i * 0.15);
      }
    },
    stairStep: function () {
      /* soft low stone tick as each tread grinds into place */
      beep(140, 0.05, 0.035, "triangle");
    },
  };

  /* ── input ────────────────────────────────────────────────────────── */
  const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    run: false,
  };
  let actionQueued = false;

  /* Cancel the next click (capture phase, before it reaches any target) — used
     after a touch/tap on the A button, whose compatibility click would
     otherwise leak to whatever the button was hidden over. */
  function swallowNextClick() {
    const kill = function (e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      clearTimeout(timer);
    };
    const timer = setTimeout(function () {
      document.removeEventListener("click", kill, true);
    }, 700);
    document.addEventListener("click", kill, { capture: true, once: true });
  }

  const KEYMAP = {
    ArrowUp: "up",
    KeyW: "up",
    ArrowDown: "down",
    KeyS: "down",
    ArrowLeft: "left",
    KeyA: "left",
    ArrowRight: "right",
    KeyD: "right",
    ShiftLeft: "run",
    ShiftRight: "run",
  };

  document.addEventListener("keydown", function (ev) {
    /* never treat typing in a text field as game input */
    const tgt = ev.target;
    if (tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA")) return;
    if (ev.code === "KeyM") {
      save.sound = !save.sound;
      persist();
      updateSoundBtn();
      UI.toast(save.sound ? "sound on" : "sound off", 1200);
      return;
    }
    if (ev.code === "Escape") {
      if (UI.isOpen()) {
        UI.closeDialog();
        sfx.close();
      }
      return;
    }
    if (ev.code === "KeyE" || ev.code === "Enter" || ev.code === "Space") {
      ev.preventDefault();
      /* ignore key auto-repeat: a held key must not insta-skip the
         dialog typewriter or re-trigger interactions */
      if (!ev.repeat) actionQueued = true;
      return;
    }
    const k = KEYMAP[ev.code];
    if (k) {
      ev.preventDefault();
      keys[k] = true;
    }
  });
  document.addEventListener("keyup", function (ev) {
    const k = KEYMAP[ev.code];
    if (k) keys[k] = false;
  });
  /* losing focus (alt-tab, or a dialog link opening a new tab) swallows the
     keyup — release everything so the player doesn't keep auto-walking */
  function releaseKeys() {
    Object.keys(keys).forEach(function (k) {
      keys[k] = false;
    });
  }
  window.addEventListener("blur", releaseKeys);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) releaseKeys();
  });

  /* touch controls */
  function bindTouch(id, key) {
    const b = document.getElementById(id);
    if (!b) return;
    const on = function (ev) {
      ev.preventDefault();
      keys[key] = true;
    };
    const off = function (ev) {
      ev.preventDefault();
      keys[key] = false;
    };
    b.addEventListener("pointerdown", on);
    b.addEventListener("pointerup", off);
    b.addEventListener("pointerleave", off);
    b.addEventListener("pointercancel", off);
  }
  bindTouch("dp-up", "up");
  bindTouch("dp-down", "down");
  bindTouch("dp-left", "left");
  bindTouch("dp-right", "right");
  const btnA = document.getElementById("btn-a");
  if (btnA) {
    btnA.addEventListener("pointerdown", function (ev) {
      ev.preventDefault();
      actionQueued = true;
      /* A tap also emits a compatibility "click" a moment later. Opening a
         dialog hides the touch controls (CSS), so by the time that click
         lands this button is display:none and the click falls through to the
         dialog underneath — and for a short message box (e.g. the cat) the ✕
         sits right where this button was, closing it the instant it opened.
         Swallow the one ghost click that this tap produces. */
      swallowNextClick();
    });
  }

  const soundBtn = document.getElementById("hud-sound");
  function updateSoundBtn() {
    soundBtn.textContent = save.sound ? "♪" : "∅";
    soundBtn.setAttribute(
      "aria-label",
      save.sound ? "mute sound (M)" : "unmute sound (M)",
    );
  }
  soundBtn.addEventListener("click", function () {
    save.sound = !save.sound;
    persist();
    updateSoundBtn();
  });

  /* ── player ───────────────────────────────────────────────────────── */
  const player = {
    x: 160,
    y: 172, // feet center, px
    dir: "up",
    moving: false,
    animT: 0,
    w: 9,
    h: 6, // feet collision box
  };
  let room = World.rooms.hub;
  let fade = { a: 0, dir: 0, cb: null }; // screen fade for transitions
  let transitionLock = false;

  /* screen-shake, in logical px — amplitude decays linearly to 0 over `dur`.
     Used when the library floor grinds open for the hidden staircase.
     Honored by render() (translates the whole scene, dark-filling the exposed
     edge) and skipped entirely under reduced motion. */
  const shakeFx = { t: 0, dur: 0, amp: 0 };
  function startShake(dur, amp) {
    shakeFx.dur = dur;
    shakeFx.t = dur;
    shakeFx.amp = amp;
  }
  /* the odd library book was just pulled and the floor is mid-shake: keep the
     staircase hidden (and non-solid, and un-enterable) until the rumble
     settles, then revealStair() drops it into view (see update / pullOddBook) */
  let stairRevealPending = false;
  /* after the shake the staircase builds in one tread at a time (bottom-up:
     nearest step first, each higher step grinding open behind it, descending
     into the dark) instead of popping in whole. The stairsDown painter reads
     the reveal fraction off the furniture's `reveal`; entry stays disabled
     until the build finishes. Skipped under reduced motion. */
  const STAIR_STEPS = 8; // treads revealed one at a time
  const STAIR_STEP_DUR = 0.16; // seconds each tread waits before the next
  let stairRevealAnim = null; // { step, t, f } while building; null = idle/done

  /* first-visit check-in cutscene: the player enters through the front door
     and walks up the center aisle to the reception desk before the
     receptionist greets them. Input is ignored while it runs. */
  let intro = null; // { ty: target feet y, wait: pause before the prompt }
  const INTRO_X = 160; // center of the doormat / desk front
  const INTRO_DOOR_Y = 186; // standing on the doormat
  const INTRO_DESK_Y = 103; // right below the reception desk, facing up

  /* the cat (hub only) — the pack's lounging cat has no walk frames, so it
     stays put on its spot and plays the 12-frame tail-sweep loop */
  const cat = {
    x: 220,
    y: 120,
    frame: 0,
    animT: 0,
    rect: function () {
      return { x: this.x - 13, y: this.y - 4, w: 26, h: 8 };
    },
  };

  /* ── receptionist feedback greeter ─────────────────────────────────────
     Once the visitor has explored more than GREET_PCT, the receptionist
     leaves her desk and walks over — in whatever room they're in — to thank
     them and ask for a rating. She enters from the door back to the lobby
     (or from her desk when they're already in the lobby), walks up to the
     player, asks exactly once, then heads back out. */
  const GREET_PCT = 25; // ask after strictly more than this % explored
  const GREET_SPEED = 74; // px/s — a touch slower than the player's walk
  const GREET_GAP = 18; // she stops this far directly in front of the player
  let pendingGreeter = false; // crossed the threshold; waiting for a calm moment
  const greeter = {
    active: false,
    phase: "idle", // "enter" → "ask" → "leave"
    x: 0,
    y: 0,
    dir: "down",
    faceDir: "down", // cardinal she'll face the player from
    moving: false,
    animT: 0,
    homeX: 0, // entry point, to retreat to when leaving
    homeY: 0,
    path: null, // BFS waypoints she's currently following
    wp: 0, // index into path
    timer: 0, // seconds in the current phase (walk-timeout failsafe)
  };

  function feetRect(px, py) {
    return {
      x: px - player.w / 2,
      y: py - player.h / 2,
      w: player.w,
      h: player.h,
    };
  }
  function hit(a, b) {
    return (
      a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
    );
  }
  function furnitureActive(f) {
    if (f.requires === "questDone") return save.done;
    if (f.requires === "basement") return !!save.basement && !stairRevealPending;
    return true;
  }
  function roomSolids() {
    const list = room.solids.filter(function (s) {
      return !s.furn || furnitureActive(s.furn);
    });
    if (room.cat) list.push(cat.rect());
    return list;
  }

  /* ── quest ────────────────────────────────────────────────────────── */
  const CORE = GAME_DATA.coreIds;
  function questPct() {
    const seen = save.seen.filter(function (id) {
      return CORE.indexOf(id) !== -1;
    });
    return Math.min(100, Math.round((seen.length / CORE.length) * 100));
  }
  function refreshHud() {
    UI.setQuest(questPct());
    const visited = {};
    World.STAMP_ROOMS.forEach(function (r) {
      visited[r] = save.rooms.indexOf(r) !== -1;
    });
    UI.setStamps(visited);
    UI.setCoffee(save.coffee);
  }

  function markSeen(id) {
    const wasCore = CORE.indexOf(id) !== -1;
    if (save.seen.indexOf(id) === -1) {
      save.seen.push(id);
      persist();
      if (wasCore) {
        sfx.stamp();
        const pct = questPct();
        refreshHud();
        /* crossed the explore threshold — arm the receptionist to come over
           and ask for feedback once the player is done with this dialog */
        if (!save.feedbackAsked && pct > GREET_PCT) pendingGreeter = true;
        if (pct >= 100 && !save.done) {
          save.done = true;
          persist();
          setTimeout(function () {
            sfx.fanfare();
            UI.confetti();
            UI.toast("★ 100% EXPLORED — a trophy appeared in the hub ★", 4200);
          }, 350);
        }
      }
    }
  }
  function markRoom(id) {
    if (World.STAMP_ROOMS.indexOf(id) !== -1 && save.rooms.indexOf(id) === -1) {
      save.rooms.push(id);
      persist();
      refreshHud();
      UI.toast("entered " + room.label + "/", 1500);
    }
  }

  /* ── interaction targeting ────────────────────────────────────────── */
  function interactTarget() {
    /* probe: a point ahead of the player's feet, plus proximity fallback */
    const px =
      player.x +
      (player.dir === "left" ? -12 : player.dir === "right" ? 12 : 0);
    const py =
      player.y + (player.dir === "up" ? -14 : player.dir === "down" ? 12 : 0);
    let best = null,
      bestD = 1e9;
    room.furniture.forEach(function (f) {
      if (!f.dialog || !furnitureActive(f)) return;
      /* some furniture (e.g. cubicles) only has an open, walk-up side —
         requireFacing restricts the probe to players approaching from
         that side instead of reaching through the back/sides */
      if (f.requireFacing && player.dir !== f.requireFacing) return;
      /* frontSide: only reachable from the open, room-facing side — the player
         must both face that way AND stand outside the footprint on that side.
         Blocks interacting while standing on top of / inside the furniture
         (e.g. wedged in the gap between two stacked server racks). */
      if (f.frontSide) {
        const sides = Array.isArray(f.frontSide) ? f.frontSide : [f.frontSide];
        const reachable = sides.some(function (fs) {
          if (fs === "left")
            return player.dir === "left" && player.x >= f.px + f.pw;
          if (fs === "right")
            return player.dir === "right" && player.x <= f.px;
          if (fs === "up") return player.dir === "up" && player.y >= f.py + f.ph;
          if (fs === "down") return player.dir === "down" && player.y <= f.py;
          return false;
        });
        if (!reachable) return;
      }
      /* interactPad shrinks/grows the probe's hit margin around the
         furniture rect — cubicles use a smaller one so the desk isn't
         triggerable from well out in the corridor */
      const pad = f.interactPad !== undefined ? f.interactPad : 6;
      const grown = {
        x: f.px - pad,
        y: f.py - pad,
        w: f.pw + pad * 2,
        h: f.ph + pad * 2,
      };
      const inside =
        px >= grown.x &&
        px <= grown.x + grown.w &&
        py >= grown.y &&
        py <= grown.y + grown.h;
      if (!inside) return;
      const cx = f.px + f.pw / 2,
        cy = f.py + f.ph / 2;
      const d = Math.abs(cx - player.x) + Math.abs(cy - player.y);
      if (d < bestD) {
        bestD = d;
        best = f;
      }
    });
    /* the cat */
    if (room.cat && !best) {
      const r = cat.rect();
      const grown = { x: r.x - 8, y: r.y - 8, w: r.w + 16, h: r.h + 16 };
      if (
        px >= grown.x &&
        px <= grown.x + grown.w &&
        py >= grown.y &&
        py <= grown.y + grown.h
      ) {
        best = { dialog: "hub-cat", isCat: true };
      }
    }
    return best;
  }

  function doorTarget() {
    const fr = feetRect(player.x, player.y);
    for (let i = 0; i < room.doorRects.length; i++) {
      if (hit(fr, room.doorRects[i])) return room.doorRects[i];
    }
    return null;
  }

  /* ── reception & check-in ─────────────────────────────────────────── */
  function checkInAs(name) {
    save.name = name;
    save.nameSkipped = false;
    persist();
    sfx.stamp();
    UI.toast("checked in — welcome, " + name + "!", 2600);
    /* first thing after checking in: how to get around */
    openControlsHelp();
  }

  /* touch-aware controls reminder — on touch devices the game is driven by
     the on-screen D-pad + A button, on desktop by the keyboard. Shared by the
     standalone primer and the reception desk greeting. */
  function controlsLines() {
    const touch =
      !!(window.matchMedia &&
        window.matchMedia("(pointer: coarse), (max-width: 700px)").matches);
    return touch
      ? [
          "Use the on-screen D-pad to move, and tap the A button to interact.",
          "Most objects in here are interactable — so poke around and explore!",
        ]
      : [
          "Move with WASD or the arrow keys, and press E to interact.",
          "Most objects in here are interactable — so poke around and explore!",
        ];
  }

  /* standalone controls primer, shown right after the intro check-in / skip */
  function openControlsHelp() {
    UI.openDialog(
      {
        path: "~/lobby/reception",
        title: "Front Desk",
        body: ["Here's how to get around:"].concat(controlsLines()),
      },
      {
        onClose: function () {
          sfx.close();
        },
      }
    );
  }

  const DIRECTIONS =
    "Projects are through the north door, experience is east, education west, and every way to reach Reghu is south.";

  /* desk dialog: a greeting + directions + the controls reminder, shown every
     time the visitor talks to the receptionist. The name is entered only once
     (at the intro check-in, openCheckIn) — the desk never re-prompts for it. */
  function openReception() {
    const base = GAME_DATA.dialogs["lobby-reception"];
    const greeting = save.name
      ? "Welcome back, " + save.name + "! Great to see you again."
      : "Welcome to REGHU.EXE — Reghu's walkable portfolio!";
    UI.openDialog(
      {
        path: base.path,
        title: base.title,
        body: [greeting, DIRECTIONS].concat(controlsLines()),
      },
      {
        onClose: function () {
          sfx.close();
        },
      }
    );
  }

  /* first-visit prompt the receptionist opens after the intro walk — the only
     place a name is ever entered */
  function openCheckIn() {
    UI.openNamePrompt({
      path: "~/lobby/reception",
      title: "Front Desk",
      body: [
        "Hello, visitor — welcome to Reghu's portfolio!",
        "Could you enter your name so I can greet you by it? You're welcome to skip this.",
      ],
      placeholder: "your name",
      submitLabel: "check in",
      skipLabel: "skip",
      onSubmit: checkInAs,
      onSkip: function () {
        save.nameSkipped = true;
        persist();
        UI.toast("no problem — enjoy the tour!", 2000);
        /* still show the controls, even though they skipped the name */
        openControlsHelp();
      },
    });
  }

  /* the receptionist's entry point in the current room: standing in the
     doorway back to the lobby (so she walks in through it), facing into the
     room — or her desk when the player is already in the lobby. Positioned so
     she reads as filling the open doorway yet stays fully on-screen. */
  function greeterEntry() {
    if (room.id === "hub") return { x: INTRO_X, y: INTRO_DESK_Y, dir: "down" };
    const rects = room.doorRects.filter(function (dr) {
      return dr.door && dr.door.to === "hub";
    });
    if (!rects.length) return { x: INTRO_X, y: INTRO_DESK_Y, dir: "down" };
    let cx = 0,
      cy = 0;
    rects.forEach(function (dr) {
      cx += dr.x + dr.w / 2;
      cy += dr.y + dr.h / 2;
    });
    cx /= rects.length;
    cy /= rects.length;
    switch (rects[0].ch) {
      case "n":
        return { x: cx, y: 2 * T + 4, dir: "down" }; // just inside the top wall
      case "s":
        return { x: cx, y: cy - 20, dir: "up" };
      case "w":
        return { x: 16, y: cy, dir: "right" }; // near the west jamb (door opens)
      default: // "e"
        return { x: VW - 16, y: cy, dir: "left" }; // near the east jamb
    }
  }

  /* true while the receptionist is walking in from / back out to the lobby
     door — used by the door-swing render so the door opens for her too */
  function greeterUsingDoor() {
    return (
      greeter.active &&
      room.id !== "hub" &&
      (greeter.phase === "enter" || greeter.phase === "leave")
    );
  }

  function startGreeter() {
    pendingGreeter = false;
    const entry = greeterEntry();
    greeter.active = true;
    greeter.homeX = entry.x; // walk back here to exit
    greeter.homeY = entry.y;
    greeter.faceDir = entry.dir; // squares up on this axis in front of the player
    greeter.moving = false;
    greeter.animT = 0;
    greeter.timer = 0;
    if (reduceMotion) {
      /* no walk animation — she appears directly in front of the player and
         asks at once */
      const onRight = player.x < VW / 2;
      greeter.x = onRight
        ? Math.min(VW - 12, player.x + GREET_GAP)
        : Math.max(12, player.x - GREET_GAP);
      greeter.y = player.y;
      greeter.dir = onRight ? "left" : "right";
      greeter.faceDir = greeter.dir;
      facePlayerAtGreeter();
      greeter.phase = "ask";
      sfx.open();
      openFeedback();
      return;
    }
    greeter.x = entry.x;
    greeter.y = entry.y;
    greeter.dir = entry.dir;
    greeter.phase = "enter";
    const fo = chooseFaceOff(); // reachable side to square up on + path to it
    greeter.faceDir = fo.dir;
    greeter.path = fo.path;
    greeter.wp = fo.path.length > 1 ? 1 : 0;
    if (room.id !== "hub") sfx.door(); // the lobby door opens as she steps in
  }

  /* greedy steer toward (tx,ty) with the player's x-then-y wall slide; returns
     the distance still remaining to the target after this step */
  function moveGreeterToward(tx, ty, dt) {
    const dx = tx - greeter.x,
      dy = ty - greeter.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 0.01) {
      greeter.moving = false;
      return 0;
    }
    if (Math.abs(dx) > Math.abs(dy)) greeter.dir = dx > 0 ? "right" : "left";
    else greeter.dir = dy > 0 ? "down" : "up";
    const step = GREET_SPEED * dt;
    const solids = roomSolids();
    let nx = greeter.x + (dx / dist) * step;
    let r = feetRect(nx, greeter.y);
    if (
      !solids.some(function (s) {
        return hit(r, s);
      })
    )
      greeter.x = nx;
    let ny = greeter.y + (dy / dist) * step;
    r = feetRect(greeter.x, ny);
    if (
      !solids.some(function (s) {
        return hit(r, s);
      })
    )
      greeter.y = ny;
    greeter.x = Math.max(6, Math.min(VW - 6, greeter.x));
    greeter.y = Math.max(10, Math.min(VH - 4, greeter.y));
    greeter.moving = true;
    greeter.animT += dt * 8;
    return Math.hypot(tx - greeter.x, ty - greeter.y);
  }

  /* ── path-finding (BFS on the tile grid) so she routes around furniture
     instead of crashing into it ──────────────────────────────────────────── */
  function greeterWalkable(cx, cy, solids) {
    if (cx < 6 || cx > VW - 6 || cy < 10 || cy > VH - 4) return false;
    const fr = feetRect(cx, cy);
    for (let i = 0; i < solids.length; i++)
      if (hit(fr, solids[i])) return false;
    return true;
  }
  /* BFS from (fromX,fromY) to (toX,toY) over walkable tile centers; returns a
     list of waypoints (start→goal, last one the exact goal) or null if the
     goal tile is blocked/unreachable */
  function computePath(fromX, fromY, toX, toY) {
    const cols = World.COLS,
      rows = World.ROWS,
      solids = roomSolids();
    function walk(c, r) {
      return (
        c >= 0 &&
        r >= 0 &&
        c < cols &&
        r < rows &&
        greeterWalkable(c * T + T / 2, r * T + T / 2, solids)
      );
    }
    const clamp = function (v, hi) {
      return Math.max(0, Math.min(hi, v));
    };
    const sc = clamp(Math.round((fromX - T / 2) / T), cols - 1),
      sr = clamp(Math.round((fromY - T / 2) / T), rows - 1),
      gc = clamp(Math.round((toX - T / 2) / T), cols - 1),
      gr = clamp(Math.round((toY - T / 2) / T), rows - 1);
    if (!walk(gc, gr)) return null;
    const prev = new Array(cols * rows).fill(-1);
    const start = sr * cols + sc,
      goal = gr * cols + gc;
    prev[start] = start;
    const queue = [start];
    const dc = [1, -1, 0, 0],
      dr = [0, 0, 1, -1];
    let qi = 0,
      found = false;
    while (qi < queue.length) {
      const k = queue[qi++];
      if (k === goal) {
        found = true;
        break;
      }
      const c = k % cols,
        r = (k - c) / cols;
      for (let d = 0; d < 4; d++) {
        const nc = c + dc[d],
          nr = r + dr[d],
          nk = nr * cols + nc;
        /* connect only if the neighbour is walkable AND the move between the
           two tile centres is actually collision-free — a tile-centre check
           alone misses thin furniture (e.g. the 3px cubicle-side strips) that
           sits between two otherwise-open tiles and would jam her mid-step */
        if (
          nc >= 0 &&
          nr >= 0 &&
          nc < cols &&
          nr < rows &&
          prev[nk] === -1 &&
          walk(nc, nr) &&
          losClear(
            c * T + T / 2,
            r * T + T / 2,
            nc * T + T / 2,
            nr * T + T / 2,
            solids,
          )
        ) {
          prev[nk] = k;
          queue.push(nk);
        }
      }
    }
    if (!found) return null;
    const path = [];
    let k = goal;
    while (k !== start) {
      const c = k % cols,
        r = (k - c) / cols;
      path.unshift({ x: c * T + T / 2, y: r * T + T / 2 });
      k = prev[k];
    }
    path.unshift({ x: sc * T + T / 2, y: sr * T + T / 2 });
    path[path.length - 1] = { x: toX, y: toY }; // land on the exact goal point
    return path;
  }
  function losClear(ax, ay, bx, by, solids) {
    const steps = Math.max(1, Math.ceil(Math.hypot(bx - ax, by - ay) / 4));
    for (let i = 1; i <= steps; i++) {
      const fr = feetRect(
        ax + (bx - ax) * (i / steps),
        ay + (by - ay) * (i / steps),
      );
      for (let j = 0; j < solids.length; j++)
        if (hit(fr, solids[j])) return false;
    }
    return true;
  }
  /* walk the greeter along greeter.path; returns true once it's exhausted */
  function followPath(dt) {
    if (!greeter.path || greeter.wp >= greeter.path.length) return true;
    const solids = roomSolids();
    /* string-pull: skip ahead to the furthest waypoint with a clear line, so
       she cuts corners smoothly instead of hitting every tile centre */
    while (
      greeter.wp + 1 < greeter.path.length &&
      losClear(
        greeter.x,
        greeter.y,
        greeter.path[greeter.wp + 1].x,
        greeter.path[greeter.wp + 1].y,
        solids,
      )
    ) {
      greeter.wp++;
    }
    const wp = greeter.path[greeter.wp];
    const rem = moveGreeterToward(wp.x, wp.y, dt);
    if (rem <= 4 && ++greeter.wp >= greeter.path.length) return true;
    return false;
  }
  /* choose which side of the player to square up on: prefer the axis she came
     in on, but fall back to any side that's walkable AND reachable — so a
     player standing against furniture (e.g. right under the contact desk)
     still gets approached from an open side instead of a crash */
  function chooseFaceOff() {
    const g = GREET_GAP;
    const sides = [
      { dir: "down", x: player.x, y: player.y - g },
      { dir: "up", x: player.x, y: player.y + g },
      { dir: "right", x: player.x - g, y: player.y },
      { dir: "left", x: player.x + g, y: player.y },
    ];
    sides.sort(function (a, b) {
      return (b.dir === greeter.faceDir) - (a.dir === greeter.faceDir);
    });
    for (let i = 0; i < sides.length; i++) {
      const p = computePath(greeter.x, greeter.y, sides[i].x, sides[i].y);
      if (p) {
        sides[i].path = p;
        return sides[i];
      }
    }
    const s = sides[0]; // nothing reachable — greedy fallback to the preferred side
    s.path = [{ x: s.x, y: s.y }];
    return s;
  }

  function stepGreeterEnter(dt) {
    greeter.timer += dt;
    if (followPath(dt) || greeter.timer > 9) arriveGreeter();
  }

  /* turn the player to look at the receptionist while she talks to them */
  function facePlayerAtGreeter() {
    const dx = greeter.x - player.x,
      dy = greeter.y - player.y;
    if (Math.abs(dx) > Math.abs(dy)) player.dir = dx > 0 ? "right" : "left";
    else player.dir = dy > 0 ? "down" : "up";
    player.moving = false;
    player.animT = 0;
  }

  function arriveGreeter() {
    greeter.moving = false;
    greeter.animT = 0;
    greeter.dir = greeter.faceDir; // square up, facing the player head-on
    facePlayerAtGreeter();
    greeter.phase = "ask";
    sfx.open();
    openFeedback();
  }

  function stepGreeterLeave(dt) {
    greeter.timer += dt;
    if (followPath(dt) || greeter.timer > 9) {
      greeter.active = false; // reached the doorway (or gave up) — exit
      greeter.phase = "idle";
      greeter.moving = false;
    }
  }

  function leaveGreeter() {
    if (reduceMotion) {
      greeter.active = false;
      greeter.phase = "idle";
      greeter.moving = false;
      return;
    }
    greeter.phase = "leave";
    greeter.timer = 0;
    greeter.path = computePath(
      greeter.x,
      greeter.y,
      greeter.homeX,
      greeter.homeY,
    ) || [{ x: greeter.homeX, y: greeter.homeY }];
    greeter.wp = greeter.path.length > 1 ? 1 : 0;
  }

  function openFeedback() {
    const who = save.name || "";
    const pct = questPct();
    UI.openFeedbackPrompt({
      path: "~/lobby/reception",
      title: "Front Desk",
      body: [
        (who ? who + ", you've" : "You've") +
          " explored more than " +
          GREET_PCT +
          "% of the portfolio so far, thank you for taking the time to look around!",
        "Before you carry on: how would you rate your visit? A star rating (and any thoughts you'd like to leave) would mean a lot to Reghu.",
      ],
      commentPlaceholder: "anything you'd like to add? (optional)",
      submitLabel: "send feedback",
      dismissLabel: "maybe later",
      onSubmit: function (rating, comment) {
        save.feedback = {
          rating: rating,
          comment: comment,
          at: Date.now(),
          pct: pct,
          name: save.name || null,
        };
        save.feedbackAsked = true;
        persist();
        sfx.stamp();
        UI.toast(
          (who ? "thanks, " + who + "! " : "thank you! ") + rating + "★ noted.",
          3000,
        );
        leaveGreeter();
      },
      onDismiss: function () {
        save.feedbackAsked = true; // asked exactly once, even if declined
        persist();
        sfx.close();
        leaveGreeter();
      },
    });
  }

  /* dev-only: set explored % to the highest value at or below `cap`
     (default: just under the greeter threshold) by trimming/adding core
     dialog ids, and clear the once-only feedback flag. Left just under 25%,
     interacting with one more core item trips the greeter naturally — lets you
     test the real crossing (in any room) without visiting four rooms. Wired to
     a hotkey/badge below, only when DEV is on. */
  function devSetProgress(cap) {
    const total = CORE.length;
    cap = cap == null ? GREET_PCT : cap;
    let n = 0;
    for (let k = 0; k <= total; k++) {
      if (Math.round((k / total) * 100) <= cap) n = k;
    }
    save.seen = save.seen.filter(function (id) {
      return CORE.indexOf(id) === -1; // drop core ids, keep any non-core seen
    });
    for (let i = 0; i < n; i++) save.seen.push(CORE[i]);
    save.feedback = null;
    save.feedbackAsked = false;
    greeter.active = false;
    greeter.phase = "idle";
    greeter.moving = false;
    pendingGreeter = questPct() > GREET_PCT;
    persist();
    refreshHud();
    const p = questPct();
    UI.toast(
      p > GREET_PCT
        ? "dev · explored " + p + "% — greeter armed"
        : "dev · explored " + p + "% — interact once more to trip the greeter",
      2800,
    );
  }

  /* ── server-unplug easter egg ─────────────────────────────────────────
     Interacting with a contact-room server cabinet asks whether to unplug
     it. Saying yes "crashes" the game — a fake kernel panic revealing the
     game was running on that very server — with a [ RESET SERVER ] button
     that reboots (reloads the page; the save is untouched). */
  function openServerPrompt() {
    const base = GAME_DATA.dialogs["contact-server"];
    const def = Object.assign({}, base, {
      body: base.body.concat([
        "There's a chunky power cable running to the wall. Unplug this server?",
      ]),
      links: [
        { label: "yes, unplug it", danger: true, onClick: crashGame },
        { label: "no, leave it running", onClick: UI.closeDialog },
      ],
    });
    UI.openDialog(def, {
      onClose: function () {
        sfx.close();
      },
    });
  }

  let crashed = false;
  function crashGame() {
    crashed = true; // freezes the loop below
    sfx.crash();
    UI.openCrash({
      lines: [
        { text: "A fatal exception has occurred. The system has halted.\n\n" },
        {
          text: "The game was running on the server you just unplugged.\n",
          cls: "crash-hl",
        },
        { text: "\nrack node ...... reghu-01 (contact room)\n" },
        { text: "uptime ......... 0 days, until you touched it\n" },
        {
          text: "fault .......... EX_POWER_LOSS (cable removed by visitor)\n\n",
        },
        {
          text: "Plug it back in to bring the portfolio online.",
          cls: "crash-dim",
        },
      ],
      onReset: function () {
        try {
          sessionStorage.setItem("reghu-rebooted", "1");
        } catch (e) {}
        window.location.reload();
      },
    });
  }

  /* ── hidden-basement easter egg ───────────────────────────────────────
     Every library bookshelf offers a quiet "look closer": one book sticks
     out, pulling it opens a staircase below the middle shelf (persisted via
     save.basement), and the chessboard basement below holds the Finders'
     Ledger — a statue whose plaque shows the visitor's real discovery
     ordinal, claimed once per browser from /api/basement. */
  function openShelfPrompt() {
    const base = GAME_DATA.dialogs["edu-shelf"];
    const def = Object.assign({}, base, {
      links: [{ label: "look closer", onClick: openOddBook }],
    });
    UI.openDialog(def, {
      onClose: function () {
        sfx.close();
      },
    });
  }

  function openOddBook() {
    if (save.basement) {
      /* already pulled — the shelf remembers */
      UI.openDialog(GAME_DATA.dialogs["edu-shelf-pulled"], {
        onClose: function () {
          sfx.close();
        },
      });
      return;
    }
    const base = GAME_DATA.dialogs["edu-shelf-odd"];
    const def = Object.assign({}, base, {
      links: [
        { label: "pull it out", danger: true, onClick: pullOddBook },
        { label: "leave it", onClick: UI.closeDialog },
      ],
    });
    UI.openDialog(def, {
      onClose: function () {
        sfx.close();
      },
    });
  }

  /* the library stair hole (px). The hole itself is solid (rails on the
     sides, void at the top) — the only entrance is its south lip: a thin
     trigger strip just below the rect, entered by walking up against it.
     The strip sits OUTSIDE the solid because collision never lets the feet
     overlap the rect itself. */
  const STAIR_RECT = { x: 24, y: 136, w: 32, h: 32 };
  const STAIR_LIP = {
    x: STAIR_RECT.x + 4,
    y: STAIR_RECT.y + STAIR_RECT.h,
    w: STAIR_RECT.w - 8,
    h: 6,
  };

  function pullOddBook() {
    UI.closeDialog();
    /* remember the discovery immediately (survives a reload mid-shake), but
       hold the staircase hidden — the room shakes as the mechanism grinds,
       and the floor only drops open once the rumble settles */
    save.basement = true;
    persist();
    sfx.rumble();
    if (reduceMotion) {
      revealStair(); // no shake — the floor is simply open
      return;
    }
    stairRevealPending = true;
    startShake(2, 3); // ~2s rumble; ends about when sfx.rumble() does → then revealStair()
  }

  /* the floor finishes sliding open: show the staircase and, if the player
     happens to be standing on that exact patch, shove them clear so they
     aren't swallowed by the walk-in trigger */
  function revealStair() {
    stairRevealPending = false;
    if (hit(feetRect(player.x, player.y), STAIR_RECT)) {
      player.x = 72;
      player.y = 152;
      player.dir = "left";
    }
    UI.toast(
      "The floor slides open — a staircase descends into darkness.",
      3800,
    );
    if (reduceMotion) return; // no build-in — the staircase is simply there
    const f = room.furniture.filter(function (x) {
      return x.painter === "stairsDown";
    })[0];
    if (!f) return;
    f.reveal = 1 / STAIR_STEPS; // nearest tread shows at once, rest build in
    stairRevealAnim = { step: 1, t: 0, f: f };
    sfx.stairStep();
  }

  /* near the south entrance (for the hint line) */
  function nearStairway(pad) {
    return (
      room.id === "library" &&
      save.basement &&
      !stairRevealPending &&
      !stairRevealAnim &&
      hit(feetRect(player.x, player.y), {
        x: STAIR_LIP.x - pad,
        y: STAIR_LIP.y,
        w: STAIR_LIP.w + pad * 2,
        h: STAIR_LIP.h + pad,
      })
    );
  }

  /* walking up against the south lip is the only way in */
  function stairwayEntered() {
    return player.dir === "up" && nearStairway(0);
  }

  /* claim this browser's finder number exactly once. Root-relative URL: the
     game is served at /game/ on the same domain as the Next.js site, so
     "/api/basement" reaches the site API; on file:// or a standalone static
     host the fetch fails and we quietly fall back (no number saved → retried
     on the next plaque interaction). */
  let basementClaimBusy = false;
  function claimBasementNumber() {
    if (save.basementNumber || basementClaimBusy) return;
    basementClaimBusy = true;
    const done = function () {
      basementClaimBusy = false;
    };
    try {
      fetch("/api/basement", { method: "POST" })
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .then(function (data) {
          if (data && typeof data.n === "number") {
            save.basementNumber = data.n;
            persist();
          }
          done();
        })
        .catch(done);
    } catch (e) {
      done(); // file:// can throw synchronously
    }
  }

  function ordinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  function openBasementPlaque() {
    claimBasementNumber(); // no-op if claimed; background retry otherwise
    const base = GAME_DATA.dialogs["basement-plaque"];
    const body = base.body.concat(
      save.basementNumber
        ? [
            "You're the " +
              ordinal(save.basementNumber) +
              " visitor to ever find this room.",
            "Congratulations, Reghu owes you a drink if you ever meet him.",
          ]
        : [
            "You found the hidden room.",
            "Congratulations, Reghu owes you a drink if you ever meet him.",
          ],
    );
    UI.openDialog(Object.assign({}, base, { body: body }), {
      onClose: function () {
        sfx.close();
      },
    });
  }

  /* ── room transition ──────────────────────────────────────────────── */
  function changeRoom(door) {
    if (transitionLock) return;
    /* don't strand the receptionist in the room being left (she can only be
       up during her "leave" retreat here — asking freezes the player) */
    if (greeter.active) {
      greeter.active = false;
      greeter.phase = "idle";
      greeter.moving = false;
    }
    transitionLock = true;
    sfx.door();
    const go = function () {
      room = World.rooms[door.to];
      player.x = door.spawn[0];
      player.y = door.spawn[1];
      player.dir = door.face;
      UI.setPath(room.label);
      markRoom(room.id);
      fade.dir = -1; // fade back in
      fade.cb = function () {
        transitionLock = false;
      };
    };
    if (reduceMotion) {
      fade.a = 0;
      go();
      transitionLock = false;
    } else {
      fade.dir = 1;
      fade.cb = go;
    }
  }

  /* ── update ───────────────────────────────────────────────────────── */
  function update(dt, t) {
    /* fade */
    if (fade.dir !== 0) {
      fade.a += fade.dir * dt * 4.5;
      if (fade.dir > 0 && fade.a >= 1) {
        fade.a = 1;
        fade.dir = 0;
        if (fade.cb) {
          const cb = fade.cb;
          fade.cb = null;
          cb();
        }
      }
      if (fade.dir < 0 && fade.a <= 0) {
        fade.a = 0;
        fade.dir = 0;
        if (fade.cb) {
          const cb = fade.cb;
          fade.cb = null;
          cb();
        }
      }
    }

    /* screen-shake decay; when the library-floor rumble settles, drop the
       hidden staircase into view (runs regardless of dialog/lock state so the
       reveal always lands even if the player wandered off mid-shake) */
    if (shakeFx.t > 0) {
      shakeFx.t -= dt;
      if (shakeFx.t <= 0) {
        shakeFx.t = 0;
        if (stairRevealPending) revealStair();
      }
    }

    /* the staircase grinds open one tread at a time; when the last step lands
       the reveal fraction hits 1 and entry re-enables (see nearStairway) */
    if (stairRevealAnim) {
      stairRevealAnim.t += dt;
      while (stairRevealAnim && stairRevealAnim.t >= STAIR_STEP_DUR) {
        stairRevealAnim.t -= STAIR_STEP_DUR;
        stairRevealAnim.step++;
        sfx.stairStep();
        if (stairRevealAnim.step >= STAIR_STEPS) {
          stairRevealAnim.f.reveal = 1; // fully open
          stairRevealAnim = null;
        } else {
          stairRevealAnim.f.reveal = stairRevealAnim.step / STAIR_STEPS;
        }
      }
    }

    /* dialog consumes the action key */
    if (UI.isOpen()) {
      if (actionQueued) {
        actionQueued = false;
        UI.advanceDialog();
      }
      return;
    }

    if (!transitionLock && greeter.active && greeter.phase === "enter") {
      /* scripted approach — the receptionist walks over to the player; input
         is ignored while she does, same as the check-in intro */
      actionQueued = false;
      UI.setHint("");
      stepGreeterEnter(dt);
    } else if (!transitionLock && intro) {
      /* scripted check-in walk — steered by the game, not the keys. The
         route (col 10 from the doormat to the desk) crosses no solid
         furniture, so collision is skipped on purpose */
      actionQueued = false;
      UI.setHint("");
      if (player.y > intro.ty) {
        player.dir = "up";
        player.moving = true;
        player.y = Math.max(intro.ty, player.y - 84 * dt);
        player.animT += dt * 8;
      } else {
        player.moving = false;
        player.animT = 0;
        intro.wait -= dt;
        if (intro.wait <= 0) {
          intro = null;
          sfx.open();
          openCheckIn();
        }
      }
    } else if (!transitionLock) {
      /* movement */
      let dx = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
      let dy = (keys.down ? 1 : 0) - (keys.up ? 1 : 0);
      player.moving = dx !== 0 || dy !== 0;
      if (player.moving) {
        if (dx !== 0 && dy !== 0) {
          dx *= 0.7071;
          dy *= 0.7071;
        }
        if (Math.abs(dx) > Math.abs(dy)) player.dir = dx > 0 ? "right" : "left";
        else if (dy !== 0) player.dir = dy > 0 ? "down" : "up";
        const speed = (keys.run ? 132 : 84) * dt;
        const solids = roomSolids();
        /* slide: x then y */
        let nx = player.x + dx * speed;
        let rect = feetRect(nx, player.y);
        if (
          !solids.some(function (s) {
            return hit(rect, s);
          })
        )
          player.x = nx;
        let ny = player.y + dy * speed;
        rect = feetRect(player.x, ny);
        if (
          !solids.some(function (s) {
            return hit(rect, s);
          })
        )
          player.y = ny;
        /* clamp inside room */
        player.x = Math.max(6, Math.min(VW - 6, player.x));
        player.y = Math.max(10, Math.min(VH - 4, player.y));
        player.animT += dt * (keys.run ? 12 : 8);
      } else {
        player.animT = 0;
      }

      /* doors */
      const d = doorTarget();
      if (d) changeRoom(d.door);

      /* the open stairway is a walk-in door — entered from below only */
      if (stairwayEntered()) {
        /* kick the claim off now so the number is usually ready by the time
           the player crosses the basement to the ledger */
        claimBasementNumber();
        changeRoom({ to: "basement", spawn: [160, 180], face: "up" });
      }

      /* interact */
      const target = interactTarget();
      if (actionQueued) {
        actionQueued = false;
        if (target) {
          if (target.dialog === "lobby-reception") {
            sfx.open();
            openReception();
            markSeen(target.dialog);
          } else if (target.dialog === "contact-server") {
            sfx.open();
            openServerPrompt();
            markSeen(target.dialog);
          } else if (target.dialog === "edu-shelf") {
            sfx.open();
            openShelfPrompt();
            markSeen(target.dialog);
          } else if (target.dialog === "basement-plaque") {
            sfx.open();
            openBasementPlaque();
            markSeen(target.dialog);
          } else {
            let def = GAME_DATA.dialogs[target.dialog];
            if (def) {
              sfx.open();
              if (def.coffee) {
                save.coffee += 1;
                persist();
                sfx.coffee();
                refreshHud();
              }
              if (target.dialog === "hub-trophy" && save.name) {
                def = Object.assign({}, def, {
                  sub: save.name + " — you explored 100% of the portfolio",
                });
              }
              UI.openDialog(def, {
                /* project computers (+ the contact-room PC) open a full-screen
                   terminal window */
                terminal:
                  target.painter === "computerDesk" ||
                  target.painter === "contactPC",
                /* wall diplomas open as a parchment certificate */
                diploma: target.painter === "diploma",
                /* the research paper on the book stand opens as a scroll */
                scroll: target.painter === "lectern",
                /* the lobby copier + the contact-room resume copier open the
                   resume viewer (embedded PDF + download button, game blurred
                   behind) */
                resume:
                  target.painter === "copier" ||
                  target.painter === "resumeCopier",
                onClose: function () {
                  sfx.close();
                },
              });
              markSeen(target.dialog);
            }
          }
        }
      }

      /* hint line */
      if (target) {
        const def = GAME_DATA.dialogs[target.dialog];
        const key = isTouch() ? "A" : "E";
        UI.setHint("Press " + key + " to " + ((def && def.hint) || "interact"));
      } else if (nearStairway(20)) {
        UI.setHint("walk in → basement/");
      } else {
        const nearDoor = nearestDoorHint();
        UI.setHint(nearDoor ? "walk through → " + nearDoor : defaultHint);
      }

      /* the receptionist retreats after asking — the player is free to move */
      if (greeter.active && greeter.phase === "leave") stepGreeterLeave(dt);

      /* she comes over once the visitor has explored enough and is between
         interactions (no dialog open, not mid-transition or check-in) — but
         never into the hidden basement (greeterEntry has no doorway there);
         she waits until the player resurfaces */
      if (
        pendingGreeter &&
        !greeter.active &&
        !intro &&
        !transitionLock &&
        room.id !== "basement"
      )
        startGreeter();
    }

    /* cat tail-sweep loop (holds the resting frame under reduced motion) */
    if (room.cat && !reduceMotion) {
      cat.animT += dt;
      if (cat.animT > 0.12) {
        cat.animT = 0;
        cat.frame = (cat.frame + 1) % Sprites.CAT_FRAMES.length;
      }
    }

    actionQueued = false;
  }

  function nearestDoorHint() {
    const fr = feetRect(player.x, player.y);
    const near = { x: fr.x - 20, y: fr.y - 20, w: fr.w + 40, h: fr.h + 40 };
    for (let i = 0; i < room.doorRects.length; i++) {
      if (hit(near, room.doorRects[i])) return room.doorRects[i].door.hint;
    }
    return null;
  }
  const defaultHint = isTouch()
    ? "d-pad to move · A to interact"
    : "WASD / arrows to move · E to interact · shift to run";
  function isTouch() {
    return window.matchMedia("(pointer: coarse)").matches;
  }

  /* ── render ───────────────────────────────────────────────────────── */
  function render(t) {
    /* screen-shake: offset the whole scene by a few decaying px. The canvas
       retains last frame's pixels, so translating would smear the exposed
       edge — dark-fill it first (matches the #05070a stage/canvas frame). */
    let shaking = false;
    if (shakeFx.t > 0) {
      const amp = shakeFx.amp * (shakeFx.t / shakeFx.dur); // decays to 0
      const e = shakeFx.dur - shakeFx.t; // elapsed seconds → fast rumble
      const sdx = Math.round(Math.sin(e * 92) * amp);
      const sdy = Math.round(Math.cos(e * 78) * amp);
      if (sdx !== 0 || sdy !== 0) {
        shaking = true;
        ctx.fillStyle = "#05070a";
        ctx.fillRect(0, 0, VW, VH);
        ctx.save();
        ctx.translate(sdx, sdy);
      }
    }

    /* floor + walls */
    const floorPainter = Sprites.TILES[room.floor];
    for (let r = 0; r < World.ROWS; r++) {
      for (let c = 0; c < World.COLS; c++) {
        const ch = room.map[r][c];
        if (ch === "#" || ch === "n") Sprites.TILES.wall(ctx, c, r, room.map);
        else if (ch === "~") Sprites.TILES.windowNight(ctx, c, r, t, room.map);
        else floorPainter(ctx, c, r);
      }
    }
    /* north doors: the pair swings open when the player (or the receptionist
       arriving/leaving through it) is in front of the two-tile gap */
    function northSwingFor(c, ax, ay) {
      if (Math.abs((c + 1) * World.T - ax) > World.T) return 0;
      const dist = Math.max(0, ay - 2 * World.T);
      return Math.floor((21 - dist) / 3); // starts opening at 18px, open at 9px
    }
    function northSwing(c) {
      let k = northSwingFor(c, player.x, player.y);
      if (greeterUsingDoor())
        k = Math.max(k, northSwingFor(c, greeter.x, greeter.y));
      return k;
    }
    for (let c = 0; c < World.COLS; c++) {
      if (room.map[0][c] === "n" && room.map[0][c - 1] !== "n") {
        Sprites.TILES.doorNorth(ctx, c, 0, northSwing(c));
      }
    }
    /* side doors: the leaf swings open as the player (or the arriving/leaving
       receptionist) approaches the gap. vertical_left_1's frames swing into
       the room on the east wall; the west wall gets the same frames mirrored */
    function sideSwingFor(tc, tr, ax, ay) {
      /* only react to an actor standing in front of the doorway (on the
         gap's row) — beside the wall above/below it stays closed */
      if (Math.abs(tr * World.T + 8 - ay) > 8) return 0;
      const dist = Math.abs(tc * World.T + 8 - ax);
      return Math.floor((21 - dist) / 3); // starts opening at 18px, open at 9px
    }
    function sideSwing(tc, tr) {
      let k = sideSwingFor(tc, tr, player.x, player.y);
      if (greeterUsingDoor())
        k = Math.max(k, sideSwingFor(tc, tr, greeter.x, greeter.y));
      return k;
    }
    for (let r = 1; r < World.ROWS; r++) {
      if (room.map[r][0] === "w")
        Sprites.TILES.doorSide(ctx, 0, r, true, sideSwing(0, r));
      if (room.map[r][World.COLS - 1] === "e")
        Sprites.TILES.doorSide(
          ctx,
          World.COLS - 1,
          r,
          false,
          sideSwing(World.COLS - 1, r),
        );
    }
    /* south doors: the back of the closed pair peeking below the strip */
    for (let c = 0; c < World.COLS; c++) {
      if (
        room.map[World.ROWS - 1][c] === "s" &&
        room.map[World.ROWS - 1][c - 1] !== "s"
      ) {
        Sprites.TILES.doorSouth(ctx, c, World.ROWS - 1);
      }
    }

    /* draw furniture + player + cat in y-order for depth */
    const drawables = [];
    room.furniture.forEach(function (f) {
      if (!furnitureActive(f)) return;
      /* while the receptionist is up and walking the lobby, don't also draw
         her standing behind the desk */
      if (greeter.active && room.id === "hub" && f.painter === "receptionist")
        return;
      /* flat items (rugs, mats) and wall art draw beneath everything that
         stands; overhead items (hanging signs) draw above everything;
         sortY (tiles) pins an explicit depth line — e.g. countertop items
         sort just past the counter but still behind a player in front */
      drawables.push({
        y: f.overhead
          ? 1e9
          : f.sortY !== undefined
            ? f.sortY * World.T
            : f.wallMounted || f.solid === false
              ? -1
              : f.py + f.ph,
        draw: function () {
          Sprites.PAINTERS[f.painter](ctx, f.px, f.py, f.pw, f.ph, t, f);
        },
      });
    });
    if (room.cat) {
      drawables.push({
        y: cat.y + 4,
        draw: function () {
          Sprites.drawGrid(
            ctx,
            Sprites.CAT_FRAMES[cat.frame],
            Math.round(cat.x - 14),
            Math.round(cat.y - 11),
            false,
            Sprites.PAL_CAT,
          );
        },
      });
    }
    /* idle on a stool or office chair = seated at the desk (back view) */
    const seated =
      !player.moving &&
      room.furniture.some(function (f) {
        return (
          (f.painter === "stool" ||
            f.painter === "officeChair" ||
            f.painter === "contactChair") &&
          player.x >= f.px &&
          player.x < f.px + f.pw &&
          player.y >= f.py &&
          player.y < f.py + f.ph
        );
      });
    drawables.push({
      y: player.y,
      draw: function () {
        const frames = Sprites.PLAYER_FRAMES[player.dir];
        const idx = player.moving
          ? 1 + (Math.floor(player.animT) % (frames.length - 1))
          : 0;
        const grid = seated
          ? Sprites.PLAYER_SIT_UP
          : frames[Math.min(idx, frames.length - 1)];
        const px = Math.round(player.x - 8),
          py = Math.round(player.y - 25);
        if (!seated) {
          ctx.fillStyle = "rgba(0,0,0,0.3)";
          ctx.fillRect(px + 4, Math.round(player.y) + 1, 8, 2);
        }
        Sprites.drawGrid(ctx, grid, px, py, false); // sheet has native left frames
      },
    });
    /* the receptionist, while she's up walking to/from the player */
    if (greeter.active) {
      drawables.push({
        y: greeter.y,
        draw: function () {
          const frames = Sprites.RECEPTIONIST_WALK[greeter.dir];
          const idx = greeter.moving
            ? 1 + (Math.floor(greeter.animT) % (frames.length - 1))
            : 0;
          const grid = frames[Math.min(idx, frames.length - 1)];
          const px = Math.round(greeter.x - 8),
            py = Math.round(greeter.y - 25);
          ctx.fillStyle = "rgba(0,0,0,0.3)";
          ctx.fillRect(px + 4, Math.round(greeter.y) + 1, 8, 2);
          Sprites.drawGrid(
            ctx,
            grid,
            px,
            py,
            false,
            Sprites.PAL_RECEPTIONIST_WALK,
          );
        },
      });
    }
    drawables.sort(function (a, b) {
      return a.y - b.y;
    });
    drawables.forEach(function (d) {
      d.draw();
    });

    /* interaction glint on top — items mounted high on the wall (whiteboard,
       wall map, diplomas) have no headroom above them for the glint's bob,
       so anchor those off the sprite's bottom edge instead of its top.
       `glintPad` pushes the anchor down for furniture whose rect top sits
       higher than its visible sprite (e.g. the wall-hugging vending machine,
       whose glint would otherwise bob off the top of the screen). */
    const target =
      UI.isOpen() || (greeter.active && greeter.phase === "enter")
        ? null
        : interactTarget();
    if (target && !target.isCat) {
      const glintY = target.wallMounted
        ? target.py + target.ph - 12
        : target.py + (target.glintPad || 0);
      /* round to whole pixels — fractional-width furniture (e.g. the server
         racks at 51px wide) would otherwise center the glint on a half-pixel
         and render it blurry */
      Sprites.glint(
        ctx,
        Math.round(target.px + target.pw / 2),
        Math.round(glintY),
        reduceMotion ? 0 : t,
      );
    } else if (target && target.isCat) {
      Sprites.glint(ctx, cat.x, cat.y - 13, reduceMotion ? 0 : t);
    }

    /* ambient warmth (lobby) */
    if (room.tint) {
      ctx.fillStyle = room.tint;
      ctx.fillRect(0, 0, VW, VH);
    }

    /* transition fade */
    if (fade.a > 0) {
      ctx.fillStyle = "rgba(2,4,8," + fade.a.toFixed(2) + ")";
      ctx.fillRect(0, 0, VW, VH);
    }

    if (shaking) ctx.restore();
  }

  /* ── canvas scaling ───────────────────────────────────────────────── */
  function fitCanvas() {
    const stage = document.getElementById("stage");
    const availW = stage.clientWidth;
    const availH = stage.clientHeight;
    /* uniform contain-scale: grow the 320x208 canvas to the largest size that
       still fits the stage, without cropping or distorting it. Bars on one
       axis are unavoidable when the stage's aspect ratio differs from the
       canvas's; we no longer snap to whole multiples, so those bars are as
       small as they can be (at the cost of slightly uneven scaled pixels). */
    const scale = Math.min(availW / VW, availH / VH);
    canvas.style.width = Math.floor(VW * scale) + "px";
    canvas.style.height = Math.floor(VH * scale) + "px";
  }
  window.addEventListener("resize", fitCanvas);

  /* ── boot screen ──────────────────────────────────────────────────── */
  const boot = document.getElementById("boot");
  const bootText = document.getElementById("boot-text");
  const bootLines = [
    "REGHU-2000 BIOS v5.0",
    "memory check ........ OK",
    "loading world.dat ... OK",
    "loading player.spr .. OK",
    "quests found: 1 — EXPLORE THE PORTFOLIO",
    "",
    "PRESS ENTER / TAP TO START",
  ];
  let bootDone = false;

  function runBoot() {
    if (reduceMotion) {
      bootText.textContent = bootLines.join("\n");
      return;
    }
    let li = 0;
    const iv = setInterval(function () {
      if (li >= bootLines.length) {
        clearInterval(iv);
        return;
      }
      bootText.textContent += bootLines[li] + "\n";
      li++;
    }, 220);
  }

  function startGame() {
    if (bootDone) return;
    bootDone = true;
    boot.classList.add("hidden");
    beep(523, 0.1, 0.05);
    beep(784, 0.16, 0.05, "square", 0.09);
    UI.setPath(room.label);
    refreshHud();
    updateSoundBtn();
    /* returning visitor who's already past the threshold but was never asked:
       arm the greeter so she comes over once they're in control */
    if (!save.feedbackAsked && questPct() > GREET_PCT) pendingGreeter = true;
    let rebooted = false;
    try {
      rebooted = sessionStorage.getItem("reghu-rebooted") === "1";
      if (rebooted) sessionStorage.removeItem("reghu-rebooted");
    } catch (e) {}
    if (rebooted) {
      UI.toast("power restored. let's never speak of this.", 3200);
    } else if (save.name) {
      UI.toast(
        "welcome back, " +
          save.name +
          (save.seen.length > 0 ? " — progress restored" : "!"),
        2600,
      );
    } else if (!save.nameSkipped) {
      /* first visit: enter through the front door and walk to reception */
      player.x = INTRO_X;
      player.dir = "up";
      if (reduceMotion) {
        player.y = INTRO_DESK_Y;
        setTimeout(function () {
          sfx.open();
          openCheckIn();
        }, 400);
      } else {
        player.y = INTRO_DOOR_Y;
        intro = { ty: INTRO_DESK_Y, wait: 0.35 };
      }
    } else if (save.seen.length > 0) {
      UI.toast("welcome back — progress restored", 2200);
    } else {
      UI.toast("explore the rooms. inspect everything.", 2600);
    }
  }
  boot.addEventListener("click", startGame);
  document.addEventListener("keydown", function (ev) {
    if (
      !bootDone &&
      (ev.code === "Enter" || ev.code === "Space" || ev.code === "KeyE")
    ) {
      startGame();
    }
  });

  /* ── main loop ────────────────────────────────────────────────────────
     fixed-timestep accumulator: game speed stays real-time even when
     requestAnimationFrame is throttled (background tab, low-power mode),
     while each physics step stays small enough not to tunnel collisions */
  const STEP = 1 / 60;
  let last = performance.now();
  let acc = 0;
  function loop(now) {
    let frameDt = (now - last) / 1000;
    last = now;
    if (frameDt > 0.5) frameDt = 0.5; // returning from a suspended tab
    const t = now / 1000;
    /* the server is unplugged — the game is "down" until reboot (reload) */
    if (crashed) return;
    if (bootDone) {
      acc += frameDt;
      let steps = 0;
      while (acc >= STEP && steps < 32) {
        update(STEP, t);
        acc -= STEP;
        steps++;
      }
      if (steps === 32) acc = 0; // give up catching up, stay responsive
      render(t);
    }
    requestAnimationFrame(loop);
  }

  /* dev/debug introspection (used by automated playtests) */
  window.__DBG = function () {
    return {
      x: player.x,
      y: player.y,
      room: room.id,
      dir: player.dir,
      boot: bootDone,
      fade: fade.a,
      lock: transitionLock,
      intro: !!intro,
      pct: questPct(),
      greeter: greeter.active ? greeter.phase : false,
      pending: pendingGreeter,
    };
  };

  /* ── dev toggle ─────────────────────────────────────────────────────────
     Only on localhost / file:// / an explicit ?dev=1 — never on the deployed
     portfolio. Shows a small clickable badge (and binds the ` hotkey) that
     sets explored % to just under the greeter threshold, so one more core
     interaction trips the feedback flow. Also exposes
     window.__DEV.progress(cap) for the console. */
  const DEV = (function () {
    try {
      const h = location.hostname;
      return (
        /(^|[?&])dev=1(&|$)/.test(location.search) ||
        h === "localhost" ||
        h === "127.0.0.1" ||
        h === ""
      );
    } catch (e) {
      return false;
    }
  })();
  function initDev() {
    window.__DEV = { progress: devSetProgress };
    document.addEventListener("keydown", function (ev) {
      const tgt = ev.target;
      if (tgt && (tgt.tagName === "INPUT" || tgt.tagName === "TEXTAREA"))
        return;
      if (ev.code === "Backquote") {
        ev.preventDefault();
        devSetProgress();
      }
    });
    const badge = document.createElement("button");
    badge.type = "button";
    badge.textContent = "DEV · set <25%";
    badge.title =
      "dev: set explored % just under the greeter threshold — then interact " +
      "with one more core item to trip it (or press `)";
    badge.style.cssText =
      "position:fixed;left:8px;bottom:8px;z-index:9999;" +
      "font:10px/1 ui-monospace,monospace;color:#3fb950;" +
      "background:rgba(0,0,0,0.6);padding:5px 8px;" +
      "border:1px solid #3fb950;border-radius:4px;cursor:pointer;opacity:0.85;";
    badge.addEventListener("click", function () {
      devSetProgress();
      badge.blur(); // don't keep focus (space/enter would re-fire it)
    });
    badge.addEventListener("keydown", function (e) {
      e.stopPropagation(); // keys on the badge never reach the game engine
    });
    document.body.appendChild(badge);
  }

  UI.init();
  fitCanvas();
  runBoot();
  if (DEV) initDev();
  requestAnimationFrame(loop);
})();
