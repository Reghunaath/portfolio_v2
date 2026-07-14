# REGHU.EXE — Portfolio Quest (game/)

Gamified alternate of the main terminal portfolio: a top-down pixel world where the
visitor walks between rooms, each room being a portfolio section. Fully static —
plain HTML/CSS/JS, no build step, no dependencies, no image assets (all art is
drawn procedurally on canvas). Designed to be droppable into the Next.js app's
`public/` folder and served at `/game/` with zero code changes.

## Run

```bash
npx serve .            # or: python -m http.server 8123
# or just open index.html — classic scripts work on file://
```

## Architecture

Classic `<script>` tags (no ES modules — keeps `file://` working). Load order
matters; each file exposes one global:

| File | Global | Role |
| --- | --- | --- |
| `js/data.js` | `GAME_DATA` | All portfolio content + dialog definitions (mirrors `src/data/*.ts` of the main site). `coreIds` = dialogs with `core: true`, which drive the quest %. |
| `js/sprites.js` | `Sprites` | Pixel-grid sprites (player, cat) + procedural furniture painters + floor/wall tile painters. |
| `js/world.js` | `World` | Room definitions: tile maps, furniture placement, doors/spawns. Precomputes solids/door rects. |
| `js/ui.js` | `UI` | DOM layer: dialog windows, name prompt, HUD, toasts, confetti. |
| `js/game.js` | (IIFE) | Engine: loop, input, collision, room transitions, quest/save state, WebAudio sfx, receptionist check-in flow. |

## Key facts & invariants

- **Canvas**: 320×208 logical px, 16px tiles, rooms are exactly one screen (20×13
  tiles). CSS-scaled with `image-rendering: pixelated`; integer scaling above 2×.
- **Rooms**: `hub` (lobby — the id stays `hub` for save compatibility), `arcade`
  (projects), `office` (experience), `library` (education), `comms` (contact).
- **Map legend**: `#` wall, `~` window wall, `.` floor, `n/s/e/w` walkable door
  tiles that trigger transitions.
- **Top wall is two tile rows** (rows 0–1), like the pack's reference design:
  row 0 = white top strip + start of the face, row 1 = rest of the face.
  Windows (`~`) go in row 1. A north door gap is `n` tiles in row 0 (the dark
  opening that triggers the transition) over plain `.` corridor tiles in row 1.
  First walkable row is row 2 — furniture against the top wall starts at y 2.
- **Furniture schema** (`world.js`): `{painter, x, y, w, h}` in tiles (fractions
  OK) plus flags: `dialog` (id into `GAME_DATA.dialogs`), `solid: false`
  (walkable, drawn beneath actors), `wallMounted` (drawn beneath, no collision —
  wall row is already solid), `overhead` (drawn above everything, e.g. the
  hanging WELCOME sign), `sortY` (explicit depth line in tiles — countertop
  items pin just past the counter's bottom edge so the counter doesn't paint
  over them but a player standing in front still does),
  `requires: "questDone"` (only exists at 100%), plus
  painter-specific extras (`color`, `c1`/`c2`, `icon`, `trophy`,
  cubicle `rig`/`desk`/`papers`/`deskItem`).
- **Depth sort** (`render()` in game.js): flat/wallMounted → `-1`, standing
  furniture/actors → bottom-edge y, overhead → `1e9`. If a sprite "disappears"
  behind something, this sort is the first place to look.
- **Lobby walkways**: the reception counter is centered (a 96x37 px U-shaped
  unit spanning cols 7–12, rows ~3.7–6, open behind the receptionist who
  stands inside the U; its bottom edge stays at row 6 and depth-sorts the
  front counter over her feet). The routes to the north door are the side
  aisles at **col 6 and col 13** — never place solid furniture there. In the other rooms keep **cols 9–10 clear** where they lead to doors.
- **Game loop**: fixed-timestep accumulator (60 steps/s, catch-up cap 32). Never
  scale movement by raw frame dt — throttled tabs run rAF at 1–2fps and the
  accumulator is what keeps game time real-time.
- **Input**: document-level key listeners; typing guard returns early when
  `ev.target` is an INPUT/TEXTAREA (names like "Wade" contain WASD keys). Touch
  D-pad shows via `(pointer: coarse)` or `max-width: 700px`.
- **Save** (`localStorage["reghu-quest-v1"]`): `{seen[], rooms[], coffee, sound,
  done, name, nameSkipped, feedback, feedbackAsked}`. Quest % = seen∩coreIds /
  coreIds. `feedback` is `{rating 1-5, comment, at, pct, name}` once given (kept
  locally only — nothing is sent anywhere yet); `feedbackAsked` gates the
  greeter to fire once. Changing dialog ids invalidates existing saves'
  progress for those items.
- **Check-in flow**: on first start the player spawns on the doormat and
  auto-walks up col 10 to the reception desk (`intro` state in game.js; input
  ignored while it runs, reduced-motion places the player at the desk
  directly), then the check-in prompt opens (`openCheckIn`; skip sets
  `nameSkipped` so it never nags again). The reception desk dialog
  (`openReception`) embeds the same name input inline. Both are built
  dynamically in game.js via `UI.openNamePrompt` (which typewrites like every
  dialog), not read verbatim from data.js.
- **Feedback greeter**: once quest % passes 25 (`GREET_PCT`) and
  `!feedbackAsked`, the receptionist leaves her desk and walks to the player —
  in whatever room they're in — to ask for a star rating + comment
  (`greeter` state machine in game.js: `enter` → `ask` → `leave`). She's armed
  (`pendingGreeter`) the moment the threshold is crossed but only starts once
  no dialog is open (i.e. after the player finishes interacting), and freezes
  input during her approach like the check-in intro. She spawns in the doorway
  back to the lobby (`greeterEntry`, from the room's `doorRects`) and the door
  swings open for her — `northSwing`/`sideSwing` take the max of the player's
  and (while `greeterUsingDoor()`) her position, so it opens as she emerges and
  closes behind her; the arcade's south door is static in the art, so there
  she just walks out of it. She routes to the player with tile-grid BFS
  (`computePath` over `greeterWalkable` tiles; edges are `losClear`-checked so
  thin furniture between two open tiles — e.g. the 3px cubicle-side strips —
  doesn't jam her mid-step; `followPath` string-pulls with `losClear` for
  smooth corners) so she goes around furniture instead of crashing into it,
  and `chooseFaceOff()` picks a walkable+reachable side one
  `GREET_GAP` from the player — preferring her entry axis but falling back
  (e.g. a player standing right under the contact desk gets approached from an
  open side). On arrival she and the player turn to face each other head-on
  (`facePlayerAtGreeter`) for the conversation, then she paths back to that
  doorway and despawns; in the lobby the desk `receptionist` painter is hidden
  while she's up. She
  walks with `Sprites.RECEPTIONIST_WALK` (a separate 4-dir walk cycle from her
  desk idle `RECEPTIONIST_FRAMES`). The prompt is `UI.openFeedbackPrompt`
  (rating required, comment optional; ✕/Esc/tap = dismiss); asked exactly once
  whether submitted or declined. Reduced motion skips the walk (she appears
  beside the player and asks).
- **Reduced motion**: honored everywhere — boot/typewriter/confetti skipped, the
  cat's tail-sweep loop freezes on its resting frame, glints stop bobbing.

## Testing / debugging

- Don't launch a Playwright playtest on your own initiative after a change —
  only do it when the user explicitly asks for one. This overrides the general
  "test UI changes in a browser before reporting done" default for this game.
- `window.__DBG()` returns `{x, y, room, dir, boot, fade, lock, intro, pct,
  greeter, pending}` — used by automated Playwright playtests to steer the
  player.
- **Dev toggle** (only on `localhost` / `127.0.0.1` / `file://` / an explicit
  `?dev=1` — never on the deployed site): a small bottom-left "DEV · set <25%"
  badge and the `` ` `` hotkey both call `devSetProgress()`, which sets
  explored % to the highest value at/under the greeter threshold (20% with the
  current 15 core dialogs) and clears `feedbackAsked` — so interacting with one
  more core item trips the feedback greeter naturally, in whatever room you're
  in, without visiting four rooms. Also exposed as `window.__DEV.progress(cap)`
  (highest % at or below `cap`).
- When driving with Playwright: call `page.bringToFront()` first (occluded
  windows throttle rAF to ~2fps and short key-holds land between frames), and
  avoid `animations: 'disabled'` screenshots (they produce black frames here).
- Syntax check after edits: `node --check js/*.js` (files are plain ES5-ish JS —
  no TS, no modules).

## Asset tooling (`tools/` — dev-only, not shipped)

Utilities for hand-porting specific sprites from a purchased pixel-art pack
into the procedural grid format below, without adding image loading/`drawImage`
to the engine. None of this is referenced by `index.html` or served with the
game.

| File | Role |
| --- | --- |
| `tools/png-to-grid.js` | Node script (built-in `zlib` only, no npm install) — slices a PNG region into the string-grid + palette format `sprites.js` uses (see `drawGrid()`), including multi-frame strips (`--frames`). Run with no args for usage. |
| `tools/composite.js` | Multi-layer companion to `png-to-grid.js`: alpha-composites Character_Generator layer sheets (Body/Eyes/Outfit/Hairstyle, bottom-to-top) into one character and slices its idle+walk frames into the `[idle,walk1..6]`-per-direction grid format (used to port the receptionist's walk cycle, `RECEPTIONIST_WALK`). Run with no args for usage. |
| `tools/gen-manifest.js` | Scans a folder of PNGs and writes `tools/asset-manifest.js` (file paths + dimensions only) for the viewer's file list. Defaults to scanning `game/assets` — pass a different root as the first arg if the pack lives elsewhere. Re-run after adding/replacing pack files. |
| `tools/asset-viewer.html` | Standalone browser tool — open directly (or serve `game/` so the transparency-skip in "extract tiles → gallery" works; file:// taints canvas readback). Browse a pack's sheets at adjustable zoom with a grid overlay, click or drag to select a region, and it generates the exact `png-to-grid.js` command for that selection. |
| `tools/asset-catalog.md` | **Check this first when porting.** Text index of every sprite on the shadowless 16x16 theme sheets — per-item description + bounding box in original sheet pixels (±2px; trim at port time), plus a "Ported so far" section mapping ported sprites to their source sheets and `sprites.js` grid constants. Searching it replaces browsing sheets visually. Keep "Ported so far" updated after each port. |

- `game/assets/` (the pack itself: `1_Interiors`, `2_Characters`,
  `3_Animated_objects`, `4_User_Interface_Elements`, `6_Home_Designs`,
  `Palettes`, plus its `LICENSE.txt`/`READ_ME.txt`) is a local download, not
  committed to the repo (its PNGs fall under the root `.gitignore`'s `*.png`
  rule). Convert only the specific sprites you actually intend to use; the
  pack's commercial license still applies to whatever gets copied in, same as
  if the PNG were used directly.

## Style

- Visual language mirrors the main portfolio: GitHub-dark palette (`--t-*` vars
  in css/style.css), JetBrains Mono for dialog text, Press Start 2P for HUD.
  Dialogs are cream RPG message boxes (dark `#454552` frame, gold inner ring,
  red nameplate title, blinking ▼) with a `~/section/...` path caption — the
  terminal chrome lives in the HUD/shell, not the dialogs. Three dialog modes
  restyle that window via a class on `#dialog` (passed as `opts` to
  `UI.openDialog`, chosen by painter in game.js): `terminal` (project
  computers — full-screen black/green CRT), `diploma` (wall diplomas — a
  full-height parchment certificate with a double gold frame, a monogram
  crest seal (`crest`/`crestColor` in data.js — the game ships no image
  assets), and the GPA badge as a gold seal, over the dimmed game screen;
  no typewriter — the parchment renders whole), `scroll` (the research
  paper on the book stand — a rolled parchment manuscript with rod ends
  sticking out top and bottom), and `resume` (the lobby copier — the resume
  rendered as a white printed page in a regular document font, content from
  `sheet` on the `hub-resume` dialog in data.js which mirrors `resume.pdf`;
  keep both in sync. Download/open-PDF links sit in a footer strip).
- Interactable accent is phosphor green `#3fb950`; awards gold `#e3b341`; the
  lobby is deliberately warmer (burgundy pin-dot carpet floor, forest-green
  rug with a brass ring, amber `tint`); the four section rooms share a wine
  carpet-tile floor (`floorCarpetTiles`); walls are the pack's Generic_Home_1
  system (white wall-top strips, two-tile light-gray face on the top wall, navy
  outlines) — `wall()` in sprites.js is position-aware (corners/sides/second
  face row/door caps) and needs the room map passed in; the lobby reception
  counter is the U-shaped check-in desk hand-ported from
  `19_Hospital_16x16.png` (central U only — wings, and the back monitor-desk
  strip, dropped), stretched to 6 tiles and recolored to the pack's whites.
- Both characters are Character_Generator composites (16x16 sheets): the player
  is Body_02 + Outfit_10_05 (hoodie, greens remapped to a yellow ramp) + Eyes_01 +
  Hairstyle_08_07 (darkened to true black); the
  receptionist is Body_02 + Outfit_06_01 (navy suit, red tie) + Eyes_01 +
  Hairstyle_01_01. Both are ported as 16x26 grids
  (rows 6–31 of each 16x32 sheet cell, feet on the bottom row).
  `PLAYER_FRAMES[dir]` = `[idle, walk1..walk6]` with native left-facing frames —
  the player draw call passes `flipX: false`. The receptionist plays her
  6-frame down idle at the desk (`RECEPTIONIST_FRAMES`) and has a full 4-dir
  walk cycle for the feedback greeter (`RECEPTIONIST_WALK`, `[idle,walk1..6]`
  per direction like the player) generated from the same layers by
  `tools/composite.js`. The sheets' direction blocks are right/up/left/down,
  6 frames each; idle row starts at y 32, walk row at y 64. The pack's sit rows
  (y 128/160) are side-facing only, so the desk-stool sit is derived:
  `PLAYER_SIT_UP` in sprites.js (standing up-frame lowered 3px, legs cut) is
  drawn by game.js whenever the player idles inside a `stool` or
  `officeChair` furniture rect.
- The lobby cat is the pack's `animated_cat.png` (12 frames of 48x16, trimmed
  to 28x15). It's a lounging pose with no walk frames, so it sits at a fixed
  spot playing its tail-sweep loop instead of wandering; the pack's baked
  warm-gray floor shadow is remapped to translucent black in `PAL_CAT`.
- The library's bookshelf (47x39, warm red-brown variant) and open-book
  display stand (17x29, still registered as the `lectern` painter) are ported
  from the pack's `5_Classroom_and_library` shadowless sheet, drawn
  bottom-anchored on their furniture rects. The diplomas stay procedural —
  the pack has no certificate/diploma sprite.
- The experience office is a Modern-Office-pack cubicle farm (mirroring the
  pack's reference room): each experience entry is one cubicle — a solid
  back rect (`cubicle` painter: partition rail/panel with posts poking 11px
  above the rect top, desk tucked 2px under the panel, desk front on the
  rect bottom), two thin solid `cubicleSide` strips flanking the
  open front, and a walkable `officeChair` (sortY pins it over the desk
  front; idling on it sits the player, same as stools). Each desk shows a
  hand-ported, per-company desktop clutter cluster (`deskItem` key into the
  `DESK_ITEMS` map, cropped from the pack's "IT support desk assemblage" row
  — PC tower/filing unit + monitor + a coworker peeking over the top),
  replacing the earlier generic monitor rig + paper pile entirely when set.
  Older cubicle extras (`rig: "dual"` for the dual-monitor arm,
  `color` for its screen tint, `papers`) still exist in `cubicle()` as a
  fallback for any desk without a `deskItem`; `desk: "gray"` (checkered gray
  desk, bottom row) still applies regardless. The old `deskStation` painter
  (Generic's white workstation) is still registered but unused.
  `waterCooler` (13x30, bottom-anchored) and `whiteboard` (30x23, wallMounted
  top-anchored on the wall face — a mounted dashboard with a pie chart +
  line graph) are both hand-ported from the Modern Office sheet; the corner
  plants reuse `pottedPlant`.
- New content goes in data.js (dialog) + world.js (placement) + sprites.js
  (painter, only if a new object type is needed).
- **Always port real sprites from the asset pack — do NOT hand-draw new art
  procedurally (raw `ctx.fillRect`/shape primitives inside a painter) unless the
  user explicitly asks for it.** When a needed object isn't obviously in the
  pack, search `tools/asset-catalog.md` and port with `tools/png-to-grid.js`; if
  the pack genuinely lacks it, ask before drawing. Painters may still compose
  ported grids and add tiny framing pixels, but the object itself must come from
  the pack.
