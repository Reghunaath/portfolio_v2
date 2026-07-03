# REGHU.EXE — Portfolio Quest

A gamified, walkable version of the portfolio. You play the green-hoodie guy from the
main site's hero GIF, exploring a pixel studio at night. Each room is a portfolio
section:

| Room | Section |
| --- | --- |
| `~/lobby` | Lobby — reception desk with a receptionist who checks you in by name (skippable), plus a cat and coffee |
| `~/projects` (north door) | Arcade — one cabinet per project, trophies on award winners |
| `~/experience` (east door) | Office — one desk per job |
| `~/education` (west door) | Library — diplomas + the published paper on a glowing lectern |
| `~/contact` (south door) | Comms room — email / phone / LinkedIn / GitHub kiosks |

Inspecting every core item fills the **EXPLORED %** tracker. At 100% a trophy spawns
in the hub (confetti included) with a `sudo hire-me` prompt.

## Controls

- **Move:** WASD / arrow keys (hold Shift to run)
- **Interact:** E / Enter / Space
- **Close dialog:** Esc (or E again)
- **Sound toggle:** M
- **Mobile:** on-screen D-pad + A button

## Run it

Everything is static — no build step, no dependencies.

```bash
# from the repo root
npx serve game
# or
python -m http.server 8080 --directory game
```

Opening `game/index.html` directly in a browser also works.

## Ship it with the main site

Copy this folder into `public/` of the Next.js app (e.g. `public/game/`) and it will
be served at `/game/index.html` with zero code changes. The "Resume Printer" and
"terminal portfolio" links point to `/` — the main site root — so they resolve
correctly once hosted there.

## Notes

- On first launch the player walks in from the front door to the reception desk,
  where the receptionist asks for the visitor's name ("skip" declines, and it
  won't nag again). The name personalizes greetings and the 100% trophy, and can
  be changed anytime at the front desk.
- Progress (explored %, coffee count, visitor name, sound preference) persists in `localStorage`.
- `prefers-reduced-motion` is respected: no boot animation, no typewriter, no
  confetti, the cat naps.
- All art is drawn procedurally on a canvas — there are no image assets.
