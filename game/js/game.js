/* ─── REGHU.EXE — engine: loop, input, collision, quest, audio ──────────── */
/* global window, document, localStorage, requestAnimationFrame, performance */
/* global World, Sprites, UI, GAME_DATA */

(function () {
  "use strict";

  const T = World.T, VW = World.COLS * T, VH = World.ROWS * T;
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  canvas.width = VW;
  canvas.height = VH;
  ctx.imageSmoothingEnabled = false;

  const reduceMotion = UI.reduceMotion;

  /* ── persistent state ─────────────────────────────────────────────── */
  const SAVE_KEY = "reghu-quest-v1";
  let save = { seen: [], rooms: [], coffee: 0, sound: true, done: false, name: "", nameSkipped: false };
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) save = Object.assign(save, JSON.parse(raw));
  } catch (e) { /* private mode etc. */ }
  function persist() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* no-op */ }
  }

  /* ── audio: tiny square-wave chiptune blips ───────────────────────── */
  let audioCtx = null;
  function beep(freq, dur, vol, type, when) {
    if (!save.sound) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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
    } catch (e) { /* audio unavailable */ }
  }
  const sfx = {
    open: function () { beep(660, 0.08, 0.04); beep(880, 0.1, 0.04, "square", 0.06); },
    close: function () { beep(440, 0.08, 0.03); },
    door: function () { beep(220, 0.12, 0.05, "triangle"); beep(330, 0.12, 0.05, "triangle", 0.08); },
    stamp: function () { beep(880, 0.07, 0.05); beep(1174, 0.12, 0.05, "square", 0.07); },
    fanfare: function () {
      [523, 659, 784, 1046, 784, 1046].forEach(function (f, i) {
        beep(f, 0.14, 0.05, "square", i * 0.12);
      });
    },
    coffee: function () { beep(392, 0.06, 0.04); beep(523, 0.09, 0.04, "square", 0.05); },
  };

  /* ── input ────────────────────────────────────────────────────────── */
  const keys = { up: false, down: false, left: false, right: false, run: false };
  let actionQueued = false;

  const KEYMAP = {
    ArrowUp: "up", KeyW: "up",
    ArrowDown: "down", KeyS: "down",
    ArrowLeft: "left", KeyA: "left",
    ArrowRight: "right", KeyD: "right",
    ShiftLeft: "run", ShiftRight: "run",
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
      if (UI.isOpen()) { UI.closeDialog(); sfx.close(); }
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

  /* touch controls */
  function bindTouch(id, key) {
    const b = document.getElementById(id);
    if (!b) return;
    const on = function (ev) { ev.preventDefault(); keys[key] = true; };
    const off = function (ev) { ev.preventDefault(); keys[key] = false; };
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
    });
  }

  const soundBtn = document.getElementById("hud-sound");
  function updateSoundBtn() {
    soundBtn.textContent = save.sound ? "♪" : "∅";
    soundBtn.setAttribute("aria-label", save.sound ? "mute sound (M)" : "unmute sound (M)");
  }
  soundBtn.addEventListener("click", function () {
    save.sound = !save.sound;
    persist();
    updateSoundBtn();
  });

  /* ── player ───────────────────────────────────────────────────────── */
  const player = {
    x: 160, y: 172, // feet center, px
    dir: "up",
    moving: false,
    animT: 0,
    w: 9, h: 6, // feet collision box
  };
  let room = World.rooms.hub;
  let fade = { a: 0, dir: 0, cb: null }; // screen fade for transitions
  let transitionLock = false;

  /* first-visit check-in cutscene: the player enters through the front door
     and walks up the center aisle to the reception desk before the
     receptionist greets them. Input is ignored while it runs. */
  let intro = null; // { ty: target feet y, wait: pause before the prompt }
  const INTRO_X = 160; // center of the doormat / desk front
  const INTRO_DOOR_Y = 186; // standing on the doormat
  const INTRO_DESK_Y = 103; // right below the reception desk, facing up

  /* the cat (hub only) */
  const cat = {
    x: 220, y: 120, tx: 220, ty: 120, frame: 0, animT: 0, waitT: 2,
    rect: function () { return { x: this.x - 6, y: this.y - 4, w: 12, h: 8 }; },
  };

  function feetRect(px, py) {
    return { x: px - player.w / 2, y: py - player.h / 2, w: player.w, h: player.h };
  }
  function hit(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }
  function furnitureActive(f) {
    if (f.requires === "questDone") return save.done;
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
    const seen = save.seen.filter(function (id) { return CORE.indexOf(id) !== -1; });
    return Math.min(100, Math.round((seen.length / CORE.length) * 100));
  }
  function refreshHud() {
    UI.setQuest(questPct());
    const visited = {};
    World.STAMP_ROOMS.forEach(function (r) { visited[r] = save.rooms.indexOf(r) !== -1; });
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
    const px = player.x + (player.dir === "left" ? -12 : player.dir === "right" ? 12 : 0);
    const py = player.y + (player.dir === "up" ? -14 : player.dir === "down" ? 12 : 0);
    let best = null, bestD = 1e9;
    room.furniture.forEach(function (f) {
      if (!f.dialog || !furnitureActive(f)) return;
      const grown = { x: f.px - 6, y: f.py - 6, w: f.pw + 12, h: f.ph + 12 };
      const inside =
        px >= grown.x && px <= grown.x + grown.w &&
        py >= grown.y && py <= grown.y + grown.h;
      if (!inside) return;
      const cx = f.px + f.pw / 2, cy = f.py + f.ph / 2;
      const d = Math.abs(cx - player.x) + Math.abs(cy - player.y);
      if (d < bestD) { bestD = d; best = f; }
    });
    /* the cat */
    if (room.cat && !best) {
      const r = cat.rect();
      const grown = { x: r.x - 8, y: r.y - 8, w: r.w + 16, h: r.h + 16 };
      if (px >= grown.x && px <= grown.x + grown.w && py >= grown.y && py <= grown.y + grown.h) {
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
  }

  const DIRECTIONS =
    "Projects are through the north door, experience is east, education west, and every way to reach Reghu is south.";

  /* desk dialog: welcome + directions with the guest-book input inline —
     no extra click needed to enter or change the name */
  function openReception() {
    const base = GAME_DATA.dialogs["lobby-reception"];
    UI.openNamePrompt({
      path: base.path,
      title: base.title,
      body: save.name
        ? [
            "Welcome back, " + save.name + "! Great to see you again.",
            DIRECTIONS,
            "Checked in under the wrong name? Type a new one below.",
          ]
        : [
            "Welcome to REGHU.EXE — Reghu's walkable portfolio!",
            DIRECTIONS,
            "Could you enter your name below so I can greet you by it?",
          ],
      placeholder: "your name",
      submitLabel: save.name ? "update name" : "check in",
      skipLabel: save.name ? "close" : "skip",
      onSubmit: checkInAs,
      onClose: function () { sfx.close(); },
    });
  }

  /* first-visit prompt the receptionist opens after the intro walk */
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
      },
    });
  }

  /* ── room transition ──────────────────────────────────────────────── */
  function changeRoom(door) {
    if (transitionLock) return;
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
      fade.cb = function () { transitionLock = false; };
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
      if (fade.dir > 0 && fade.a >= 1) { fade.a = 1; fade.dir = 0; if (fade.cb) { const cb = fade.cb; fade.cb = null; cb(); } }
      if (fade.dir < 0 && fade.a <= 0) { fade.a = 0; fade.dir = 0; if (fade.cb) { const cb = fade.cb; fade.cb = null; cb(); } }
    }

    /* dialog consumes the action key */
    if (UI.isOpen()) {
      if (actionQueued) {
        actionQueued = false;
        UI.advanceDialog();
      }
      return;
    }

    if (!transitionLock && intro) {
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
        if (dx !== 0 && dy !== 0) { dx *= 0.7071; dy *= 0.7071; }
        if (Math.abs(dx) > Math.abs(dy)) player.dir = dx > 0 ? "right" : "left";
        else if (dy !== 0) player.dir = dy > 0 ? "down" : "up";
        const speed = (keys.run ? 132 : 84) * dt;
        const solids = roomSolids();
        /* slide: x then y */
        let nx = player.x + dx * speed;
        let rect = feetRect(nx, player.y);
        if (!solids.some(function (s) { return hit(rect, s); })) player.x = nx;
        let ny = player.y + dy * speed;
        rect = feetRect(player.x, ny);
        if (!solids.some(function (s) { return hit(rect, s); })) player.y = ny;
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

      /* interact */
      const target = interactTarget();
      if (actionQueued) {
        actionQueued = false;
        if (target) {
          if (target.dialog === "lobby-reception") {
            sfx.open();
            openReception();
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
                def = Object.assign({}, def, { sub: save.name + " — you explored 100% of the portfolio" });
              }
              UI.openDialog(def, { onClose: function () { sfx.close(); } });
              markSeen(target.dialog);
            }
          }
        }
      }

      /* hint line */
      if (target) {
        const def = GAME_DATA.dialogs[target.dialog];
        UI.setHint("E — " + ((def && def.hint) || "interact"));
      } else {
        const nearDoor = nearestDoorHint();
        UI.setHint(nearDoor ? "walk through → " + nearDoor : defaultHint);
      }
    }

    /* cat wander */
    if (room.cat) {
      cat.animT += dt;
      if (cat.animT > 0.4) { cat.animT = 0; cat.frame = 1 - cat.frame; }
      if (!reduceMotion) {
        cat.waitT -= dt;
        if (cat.waitT <= 0) {
          cat.tx = 96 + Math.random() * 128;
          cat.ty = 88 + Math.random() * 72;
          cat.waitT = 3 + Math.random() * 5;
        }
        const cdx = cat.tx - cat.x, cdy = cat.ty - cat.y;
        const dist = Math.hypot(cdx, cdy);
        if (dist > 2) {
          cat.x += (cdx / dist) * 18 * dt;
          cat.y += (cdy / dist) * 18 * dt;
        }
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
  const defaultHint = isTouch() ? "d-pad to move · A to interact" : "WASD / arrows to move · E to interact · shift to run";
  function isTouch() {
    return window.matchMedia("(pointer: coarse)").matches;
  }

  /* ── render ───────────────────────────────────────────────────────── */
  function render(t) {
    /* floor + walls */
    const floorPainter = Sprites.TILES[room.floor];
    for (let r = 0; r < World.ROWS; r++) {
      for (let c = 0; c < World.COLS; c++) {
        const ch = room.map[r][c];
        if (ch === "#") Sprites.TILES.wall(ctx, c, r, room.map);
        else if (ch === "~") Sprites.TILES.windowNight(ctx, c, r, t, room.map);
        else floorPainter(ctx, c, r);
      }
    }
    /* doors: dark opening + chevron */
    room.doorRects.forEach(function (d) {
      ctx.fillStyle = "#05070a";
      ctx.fillRect(d.x, d.y, d.w, d.h);
      ctx.fillStyle = "#1a202b";
      if (d.ch === "n" || d.ch === "s") {
        ctx.fillRect(d.x, d.y, 1, d.h);
        ctx.fillRect(d.x + d.w - 1, d.y, 1, d.h);
      } else {
        ctx.fillRect(d.x, d.y, d.w, 1);
        ctx.fillRect(d.x, d.y + d.h - 1, d.w, 1);
      }
      const bob = reduceMotion ? 0 : Math.floor(((Math.sin(t * 3) + 1) / 2) * 2);
      ctx.fillStyle = "#3fb950";
      const cx = d.x + d.w / 2, cy = d.y + d.h / 2;
      if (d.ch === "n") { ctx.fillRect(cx - 1, cy - 2 - bob, 2, 2); ctx.fillRect(cx - 2, cy - bob, 4, 1); }
      else if (d.ch === "s") { ctx.fillRect(cx - 1, cy + 1 + bob, 2, 2); ctx.fillRect(cx - 2, cy + bob, 4, 1); }
      else if (d.ch === "w") { ctx.fillRect(cx - 2 - bob, cy - 1, 2, 2); ctx.fillRect(cx - bob, cy - 2, 1, 4); }
      else { ctx.fillRect(cx + 1 + bob, cy - 1, 2, 2); ctx.fillRect(cx + bob, cy - 2, 1, 4); }
    });

    /* draw furniture + player + cat in y-order for depth */
    const drawables = [];
    room.furniture.forEach(function (f) {
      if (!furnitureActive(f)) return;
      /* flat items (rugs, mats) and wall art draw beneath everything that
         stands; overhead items (hanging signs) draw above everything */
      drawables.push({
        y: f.overhead ? 1e9 : f.wallMounted || f.solid === false ? -1 : f.py + f.ph,
        draw: function () {
          Sprites.PAINTERS[f.painter](ctx, f.px, f.py, f.pw, f.ph, t, f);
        },
      });
    });
    if (room.cat) {
      drawables.push({
        y: cat.y + 4,
        draw: function () {
          const facingLeft = cat.tx < cat.x;
          Sprites.drawGrid(ctx, Sprites.CAT_FRAMES[cat.frame], Math.round(cat.x - 6), Math.round(cat.y - 4), facingLeft, Sprites.PAL_CAT);
        },
      });
    }
    drawables.push({
      y: player.y,
      draw: function () {
        const frames = Sprites.PLAYER_FRAMES[player.dir];
        const idx = player.moving ? 1 + (Math.floor(player.animT) % (frames.length - 1)) : 0;
        const grid = frames[Math.min(idx, frames.length - 1)];
        const px = Math.round(player.x - 5), py = Math.round(player.y - 13);
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(px + 1, Math.round(player.y) + 1, 8, 2);
        Sprites.drawGrid(ctx, grid, px, py, player.dir === "left");
      },
    });
    drawables.sort(function (a, b) { return a.y - b.y; });
    drawables.forEach(function (d) { d.draw(); });

    /* interaction glint on top */
    const target = UI.isOpen() ? null : interactTarget();
    if (target && !target.isCat) {
      Sprites.glint(ctx, target.px + target.pw / 2, target.py, reduceMotion ? 0 : t);
    } else if (target && target.isCat) {
      Sprites.glint(ctx, cat.x, cat.y - 6, reduceMotion ? 0 : t);
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
  }

  /* ── canvas scaling ───────────────────────────────────────────────── */
  function fitCanvas() {
    const stage = document.getElementById("stage");
    const availW = stage.clientWidth;
    const availH = stage.clientHeight;
    let scale = Math.min(availW / VW, availH / VH);
    if (scale > 2) scale = Math.floor(scale); // integer scaling when large
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
      if (li >= bootLines.length) { clearInterval(iv); return; }
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
    if (save.name) {
      UI.toast("welcome back, " + save.name + (save.seen.length > 0 ? " — progress restored" : "!"), 2600);
    } else if (!save.nameSkipped) {
      /* first visit: enter through the front door and walk to reception */
      player.x = INTRO_X;
      player.dir = "up";
      if (reduceMotion) {
        player.y = INTRO_DESK_Y;
        setTimeout(function () { sfx.open(); openCheckIn(); }, 400);
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
    if (!bootDone && (ev.code === "Enter" || ev.code === "Space" || ev.code === "KeyE")) {
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
    return { x: player.x, y: player.y, room: room.id, dir: player.dir, boot: bootDone, fade: fade.a, lock: transitionLock, intro: !!intro };
  };

  UI.init();
  fitCanvas();
  runBoot();
  requestAnimationFrame(loop);
})();
