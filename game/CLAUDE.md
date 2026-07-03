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

- `window.__DBG()` returns `{x, y, room, dir, boot, fade, lock}` — used by
  automated Playwright playtests to steer the player.
- When driving with Playwright: call `page.bringToFront()` first (occluded
  windows throttle rAF to ~2fps and short key-holds land between frames), and
  avoid `animations: 'disabled'` screenshots (they produce black frames here).
- Syntax check after edits: `node --check js/*.js` (files are plain ES5-ish JS —
  no TS, no modules).

## Style

- Visual language mirrors the main portfolio: GitHub-dark palette (`--t-*` vars
  in css/style.css), JetBrains Mono for dialog text, Press Start 2P for HUD.
  Dialogs are cream RPG message boxes (dark `#454552` frame, gold inner ring,
  red nameplate title, blinking ▼) with a `~/section/...` path caption — the
  terminal chrome lives in the HUD/shell, not the dialogs.
- Interactable accent is phosphor green `#3fb950`; awards gold `#e3b341`; the
  lobby is deliberately warmer (burgundy pin-dot carpet floor, forest-green
  rug with a brass ring, amber `tint`); the four section rooms share a wine
  carpet-tile floor (`floorCarpetTiles`); all walls are warm brick.
- New content goes in data.js (dialog) + world.js (placement) + sprites.js
  (painter, only if a new object type is needed).
