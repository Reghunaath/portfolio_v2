# CLAUDE.md — Portfolio Website

## 1. Tech Stack
- Framework: Next.js 16+ (App Router) with TypeScript (strict)
- Styling: Tailwind CSS **v4** (uses `@import "tailwindcss"` and `@theme inline` — not v3)
- Animations: Framer Motion
- Icons: lucide-react
- Utilities: clsx, tailwind-merge (for the `cn()` helper), class-variance-authority, @radix-ui/react-slot
- Font: JetBrains Mono via `next/font/google` (weights 400, 500, 700)
- Hosting: Vercel
- View Counter: CounterAPI.dev (free REST API, no auth)

## 2. Design System
The site IS a terminal session — not "terminal-inspired." Monospace everywhere, always dark.

**Color palette** — all defined as CSS custom properties in `globals.css`, mapped via `@theme inline`:
```
--t-bg:      #0d1117   page background
--t-surface: #161b22   elevated surfaces / cards
--t-border:  #30363d   borders, dividers
--t-text:    #c9d1d9   primary text
--t-dim:     #8b949e   secondary / muted text
--t-green:   #3fb950   $ prompt symbol, success
--t-blue:    #58a6ff   links, commands
--t-purple:  #a371f7   gradient start (hero name)
--t-purple2: #6ea6fa   gradient end (hero name)
--t-yellow:  #e3b341   awards, badges
--t-red:     #f85149   accents
--t-cyan:    #79c0ff   section headings, special output
```

**Layout:** Left-anchored (no `mx-auto`). Gutter: `px-6 md:px-12 lg:px-20`.

**Root font scaling:**
```css
html { font-size: 14px; }
@media (min-width: 1280px) { html { font-size: 16px; } }
@media (min-width: 1536px) { html { font-size: 18px; } }
```

## 3. Project Structure
- Single Next.js app. No monorepo, no separate backend.
- All content lives in TypeScript data files under `src/data/`.
- UI primitives go in `src/components/ui/` — do not rebuild these from scratch.
- Section-level components go in `src/components/sections/`.
- `cn()` utility lives in `src/lib/utils.ts`.
- Static assets (ASCII art HTML, favicon, resume PDF) go in `public/`.
- Project images go in `public/images/projects/<project-slug>/` (e.g. `rescueline-ai/`, `leadcatch-ai/`).

```
src/
├── data/
│   ├── personal.ts
│   ├── projects.ts
│   ├── publications.ts
│   ├── experience.ts
│   └── education.ts
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── terminal-title-bar.tsx
│       ├── prompt-line.tsx
│       ├── typewriter-text.tsx
│       └── terminal-card.tsx
├── lib/
│   └── utils.ts
└── app/
    ├── layout.tsx
    ├── page.tsx
    └── globals.css
public/
├── favicon.svg
├── Gemini_Generated_Image_mihbcymihbcymihb_1.html   ← ASCII art (loaded by page.tsx)
├── resume.pdf
└── images/
    └── projects/
        ├── rescueline-ai/     ← screenshots for RescueLine AI
        └── leadcatch-ai/      ← screenshots for LeadCatch AI
project_memory/
└── portfolio-prd.md   ← requirements reference
```

## 4. PRD Is the Source of Truth
- The file `project_memory/portfolio-prd.md` contains all product requirements, section specs, and data structures.
- Follow the PRD exactly. Do not add features, sections, or UI elements not described in the PRD.
- **⚠️ IMPORTANT: If you need to deviate from the PRD for any reason (technical limitation, ambiguity, better approach), STOP and inform me in highlighted text before proceeding. Do not silently deviate.**
- **⚠️ IMPORTANT: If any requirement in the PRD is unclear or missing detail, ASK me a clarifying question before implementing. Do not guess.**

## 5. Component Rules
The 4 UI primitives are:
- **`TerminalTitleBar`** — sticky top nav bar with macOS traffic dots. Do not change brand text (`reghu@portfolio — bash`).
- **`PromptLine`** — renders `reghu@portfolio:<path>$ <command>` with Framer Motion `whileInView` animation. Props: `command`, `path` (default `~`).
- **`TypewriterText`** — cycles through a string array char-by-char. Speed: 80ms type / 40ms delete / 2000ms delay / infinite loop.
- **`TerminalCard`** — elevated surface card (`bg-[#161b22] border border-[#30363d]`) for grouped output blocks.

Rules:
- Do not rebuild these components from scratch unless specifically asked.
- Do not refactor, rename, or restructure beyond what the task requires.
- If a component doesn't work as expected (import issues, SSR problems, etc.), flag it before changing the component code.

## 6. Code Quality
- All code must be TypeScript. No `.js` files.
- No `any` types unless absolutely necessary and documented with a comment.
- Use interfaces/types for all component props and data shapes.
- One component per file.
- Use `"use client"` directive only on components that need it (animations, hooks, browser APIs). Keep server components where possible.
- Use concise variable names in dense logic but descriptive names for props, state, and functions.

## 7. UI/UX Rules
- Single-page site. Five sections: Hero, Projects & Publications, Experience, Education, Contact.
- Smooth scroll navigation between sections via anchor links.
- Mobile-first responsive design. Test at 375px (mobile) and 1440px (desktop).
- Always dark — no light mode, no dark mode toggle. The terminal IS the dark theme.
- All images use `next/image` with proper alt text and placeholder fallbacks.
- Font loaded via `next/font/google` to prevent layout shift.
- Animations must be GPU-accelerated (transform/opacity only).
- Project cards may include a small image window styled as a mini terminal window (macOS traffic dots title bar + `next/image`). The `image` field on `Project` is optional — cards without an image render normally.
- Every section must handle: content loading gracefully, and failed API calls (view counter fallback to `...`).

## 8. Data Management
- All portfolio content (personal info, projects, publications, experience, education) is hardcoded in TypeScript files under `src/data/`.
- No CMS, no database, no API for content.
- The only external API call is the view counter (CounterAPI.dev) in the contact section.
- Data file shapes are defined in the PRD (Section 9). Follow them exactly.
- Mark all placeholder content (missing images, empty URLs) with `// TODO` comments.

## 9. Do NOT Build
- Animated grid background
- GlowCard, BackgroundGradient, Timeline, MinimalistHero — these components no longer exist
- Blog or writing section
- CMS or admin interface
- Contact form or form backend
- ~~Analytics or tracking~~ (PostHog is now integrated — see Section 10)
- Light mode / dark mode toggle
- Authentication
- Comments or social features
- Loading spinners between sections (content is static)
- Any section or feature not in the PRD

## 10. Dependencies to Install
```
npm install framer-motion lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot posthog-js
```

No other packages should be added without asking me first.

## 11. CSS Animations (globals.css)
Only one custom animation is needed — `blink` for the terminal cursor:
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@utility animate-blink {
  animation: blink 1s step-end infinite;
}
```

The `highlight` and `flash` keyframes are used by `CommitsGrid` — do not remove them.

## 12. Environment
- No `.env` file needed. The CounterAPI.dev endpoint is public and requires no key.
- If a key is needed later (e.g. swapping to a different counter service), add `.env.local` with `NEXT_PUBLIC_COUNTER_API_URL`.

## 13. File Management
- Keep `README.md` updated with setup instructions and tech choices.
- `project_memory/portfolio-prd.md` is the requirements reference — do not delete it.
- This `CLAUDE.md` stays in project root as the working instructions reference.
- Gitignore: `node_modules/`, `.next/`, `.env.local`, `.vercel/`
