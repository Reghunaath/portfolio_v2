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
  hanging WELCOME sign), `requires: "questDone"` (only exists at 100%), plus
  painter-specific extras (`color`, `c1`/`c2`, `icon`, `trophy`).
- **Depth sort** (`render()` in game.js): flat/wallMounted → `-1`, standing
  furniture/actors → bottom-edge y, overhead → `1e9`. If a sprite "disappears"
  behind something, this sort is the first place to look.
- **Lobby walkways**: the reception desk is centered (cols 7–12, rows 4–5) with
  the receptionist blocking the center behind it. The routes to the north door
  are the side aisles at **col 6 and col 13** — never place solid furniture
  there. In the other rooms keep **cols 9–10 clear** where they lead to doors.
- **Game loop**: fixed-timestep accumulator (60 steps/s, catch-up cap 32). Never
  scale movement by raw frame dt — throttled tabs run rAF at 1–2fps and the
  accumulator is what keeps game time real-time.
- **Input**: document-level key listeners; typing guard returns early when
  `ev.target` is an INPUT/TEXTAREA (names like "Wade" contain WASD keys). Touch
  D-pad shows via `(pointer: coarse)` or `max-width: 700px`.
- **Save** (`localStorage["reghu-quest-v1"]`): `{seen[], rooms[], coffee, sound,
  done, name, nameSkipped}`. Quest % = seen∩coreIds / coreIds. Changing dialog
  ids invalidates existing saves' progress for those items.
- **Check-in flow**: on first start the player spawns on the doormat and
  auto-walks up col 10 to the reception desk (`intro` state in game.js; input
  ignored while it runs, reduced-motion places the player at the desk
  directly), then the check-in prompt opens (`openCheckIn`; skip sets
  `nameSkipped` so it never nags again). The reception desk dialog
  (`openReception`) embeds the same name input inline. Both are built
  dynamically in game.js via `UI.openNamePrompt` (which typewrites like every
  dialog), not read verbatim from data.js.
- **Reduced motion**: honored everywhere — boot/typewriter/confetti skipped, cat
  naps, glints stop bobbing.

## Testing / debugging

- Don't launch a Playwright playtest on your own initiative after a change —
  only do it when the user explicitly asks for one. This overrides the general
  "test UI changes in a browser before reporting done" default for this game.
- `window.__DBG()` returns `{x, y, room, dir, boot, fade, lock}` — used by
  automated Playwright playtests to steer the player.
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
| `tools/gen-manifest.js` | Scans a folder of PNGs and writes `tools/asset-manifest.js` (file paths + dimensions only) for the viewer's file list. Defaults to scanning `game/assets` — pass a different root as the first arg if the pack lives elsewhere. Re-run after adding/replacing pack files. |
| `tools/asset-viewer.html` | Standalone browser tool — open directly (or serve `game/` so the transparency-skip in "extract tiles → gallery" works; file:// taints canvas readback). Browse a pack's sheets at adjustable zoom with a grid overlay, click or drag to select a region, and it generates the exact `png-to-grid.js` command for that selection. |

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
  terminal chrome lives in the HUD/shell, not the dialogs.
- Interactable accent is phosphor green `#3fb950`; awards gold `#e3b341`; the
  lobby is deliberately warmer (burgundy pin-dot carpet floor, forest-green
  rug with a brass ring, amber `tint`); the four section rooms share a wine
  carpet-tile floor (`floorCarpetTiles`); walls are the pack's Generic_Home_1
  system (white wall-top strips, two-tile light-gray face on the top wall, navy
  outlines) — `wall()` in sprites.js is position-aware (corners/sides/second
  face row/door caps) and needs the room map passed in.
- Both characters are Character_Generator composites (16x16 sheets): the player
  is Body_02 + Outfit_10_05 (hoodie, greens remapped to a yellow ramp) + Eyes_01 +
  Hairstyle_08_07 (darkened to true black); the
  receptionist is Body_02 + Outfit_06_01 (navy suit, red tie) + Eyes_01 +
  Hairstyle_01_01. Both are ported as 16x26 grids
  (rows 6–31 of each 16x32 sheet cell, feet on the bottom row).
  `PLAYER_FRAMES[dir]` = `[idle, walk1..walk6]` with native left-facing frames —
  the player draw call passes `flipX: false`. The receptionist plays her
  6-frame down idle. The sheets' direction blocks are right/up/left/down,
  6 frames each; idle row starts at y 32, walk row at y 64. The pack's sit rows
  (y 128/160) are side-facing only, so the desk-stool sit is derived:
  `PLAYER_SIT_UP` in sprites.js (standing up-frame lowered 3px, legs cut) is
  drawn by game.js whenever the player idles inside a `stool` furniture rect.
- New content goes in data.js (dialog) + world.js (placement) + sprites.js
  (painter, only if a new object type is needed).
