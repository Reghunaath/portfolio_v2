# portfolio_v2

Personal portfolio of Reghunaath Ajith Kumar Ahila (MS Data Science @ Northeastern,
full-stack/AI engineer). Two experiences live in this repo:

1. **Main site** — a terminal-themed single-page portfolio (Next.js, repo root).
2. **Game** — `public/game/`: a standalone gamified pixel-art version where
   visitors walk between rooms. Fully static, zero dependencies, independent of
   the Next.js app — it lives under `public/` so Next serves it verbatim at
   `/game/` (see `next.config.ts` for the `/game` → `/game/` → `index.html`
   redirect+rewrite that keeps the clean route working past the `[slug]`
   catch-all). The main site links to it from the Hero CTA
   (`./portfolio-quest.exe`, PostHog `game_opened`). See `public/game/CLAUDE.md`
   for its architecture — don't modify main-site files when working on the game,
   and vice versa.

## Commands

```bash
npm run dev     # Next.js dev server (Turbopack) at localhost:3000
npm run build   # production build
npm run lint    # eslint
npx serve public/game  # serve the game standalone (or open public/game/index.html)
                       # via the Next site it's at /game (npm run dev)
```

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS v4 (`@theme inline` in
`globals.css`, no tailwind.config) · framer-motion · PostHog (`src/lib/posthog.ts`)
· react-pdf (resume modal). TypeScript. `.env.local` holds secrets (PostHog, etc.).

## Layout

- `src/app/page.tsx` — the single page: section components in order, wrapped by
  `TerminalTitleBar`.
- `src/app/api/visitors/route.ts` — unique-visitor counter (rendered as pixel
  digits by `commits-grid.tsx`).
- `src/app/[slug]/route.ts` — short-link redirects.
- `src/components/sections/` — Hero, Projects, Experience, Education, Contact.
- `src/components/ui/` — terminal-styled building blocks (prompt lines, cards,
  modals, typewriter, title bar).
- `src/data/*.ts` — **single source of all content** (personal, projects,
  experience, education, publications). Content edits happen here, not in
  components. The game mirrors this content in `public/game/js/data.js` — keep
  them in sync when content changes.
- `src/app/globals.css` — terminal color tokens (`--t-*`, GitHub-dark palette),
  CRT scanline overlay, `crt-glow` utility. Font: JetBrains Mono everywhere.
- **Resume PDF** lives in two served copies — `public/resume.pdf` (main site) and
  `public/game/resume.pdf` (game). Whenever the resume changes, replace BOTH
  files, and also update the in-game resume printer: the `sheet` text on the
  `hub-resume` dialog in `public/game/js/data.js` is a manual mirror of the PDF's
  content (rendered as a printed page at the lobby copier), so re-sync it to the
  new PDF.

## User preferences

> **IMPORTANT — READ BEFORE BUILDING ANYTHING**
>
> **If you have ANY questions about a requirement, ask and confirm with me first.
> NEVER hallucinate or assume missing details.** You MUST be highly confident
> about the requirements before you start building anything. When a request is
> ambiguous, underspecified, or open to multiple interpretations: stop, ask
> clarifying questions, get confirmation — then build. Asking is always cheaper
> than building the wrong thing.

## Conventions

- Visual language: macOS-terminal chrome (traffic dots, `~/section` paths),
  GitHub-dark colors, phosphor-green accent `#3fb950`. The game intentionally
  shares this language.
- Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`).
- Branches: `main` is the PR target; `reghu` is the working branch for the main
  site; `game` holds the game.
- PostHog events are snake_case (`resume_opened`, `demo_video_opened`).
