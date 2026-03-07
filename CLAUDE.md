# CLAUDE.md — Portfolio Website

## 1. Tech Stack
- Framework: Next.js (App Router) with TypeScript
- Styling: TailwindCSS
- Animations: Framer Motion
- Icons: lucide-react
- Utilities: clsx, tailwind-merge (for the `cn()` helper), class-variance-authority, @radix-ui/react-slot
- Font: Inter via `next/font/google`
- Hosting: Vercel
- View Counter: CounterAPI.dev (free REST API, no auth)

## 2. Project Structure
- Single Next.js app. No monorepo, no separate backend.
- All content lives in TypeScript data files under `src/data/`.
- Provided UI components go in `src/components/ui/` — these are pre-built and should not be rebuilt from scratch.
- Section-level components go in `src/components/sections/`.
- `cn()` utility lives in `src/lib/utils.ts`.
- Static assets (images, resume PDF) go in `public/`.

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
│   │   ├── TimelineSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── minimalist-hero.tsx
│       ├── typewriter-text.tsx
│       ├── timeline.tsx
│       ├── background-gradient.tsx
│       ├── contact-card.tsx
│       ├── commits-grid.tsx
│       └── button.tsx
├── lib/
│   └── utils.ts
└── app/
    ├── layout.tsx
    ├── page.tsx
    └── globals.css
```

## 3. PRD Is the Source of Truth
- The file `PRD.md` in the project root contains all product requirements, section specs, component source code, and data structures.
- Follow the PRD exactly. Do not add features, sections, or UI elements not described in the PRD.
- **⚠️ IMPORTANT: If you need to deviate from the PRD for any reason (technical limitation, ambiguity, better approach), STOP and inform me in highlighted text before proceeding. Do not silently deviate.**
- **⚠️ IMPORTANT: If any requirement in the PRD is unclear or missing detail, ASK me a clarifying question before implementing. Do not guess.**

## 4. Component Rules
- The PRD contains provided component source code (Section 5). Use these components directly.
- Each provided component has a "Required adaptation" note. Only make the changes described there. Do not refactor, rename, or restructure beyond what's specified.
- Components marked "use as-is" must not be modified at all.
- Components marked with specific adaptations (e.g. MinimalistHero → centered layout, Timeline → header text change) should be modified only in the ways described.
- If a provided component doesn't work as expected in the Next.js environment (import issues, SSR problems, etc.), flag it to me before changing the component code.

## 5. Code Quality
- All code must be TypeScript. No `.js` files.
- No `any` types unless absolutely necessary and documented with a comment.
- Use interfaces/types for all component props and data shapes.
- One component per file.
- Use `"use client"` directive only on components that need it (animations, hooks, browser APIs). Keep server components where possible.
- Use concise variable names in dense logic but descriptive names for props, state, and functions.

## 6. UI/UX Rules
- Single-page site. Four sections: Hero, Projects & Publications, Experience & Education, Contact.
- Smooth scroll navigation between sections via anchor links.
- Mobile-first responsive design. Test at 375px (mobile) and 1440px (desktop).
- Dark mode supported via Tailwind `dark:` classes and `prefers-color-scheme`. No manual toggle.
- All images use `next/image` with proper alt text and placeholder fallbacks.
- Font loaded via `next/font/google` to prevent layout shift.
- Animations must be GPU-accelerated (transform/opacity only). The provided components already handle this with `will-change-transform`.
- Every section must handle: content loading gracefully, missing images (placeholders), and failed API calls (view counter fallback).

## 7. Data Management
- All portfolio content (personal info, projects, publications, experience, education) is hardcoded in TypeScript files under `src/data/`.
- No CMS, no database, no API for content.
- The only external API call is the view counter (CounterAPI.dev) in the contact section.
- Data file shapes are defined in the PRD (Section 8). Follow them exactly.
- Mark all placeholder content (missing images, empty URLs) with `// TODO` comments.

## 8. Build Order
Follow this exact order. Complete each step fully before moving to the next.
**⚠️ IMPORTANT: After completing each step, run `npm run build` to verify no errors, then STOP and inform me what was done. Wait for my approval before starting the next step.**

1. Project scaffolding (Next.js, TypeScript, Tailwind, dependencies, folder structure, `cn()` utility, globals.css with required animations)
2. Data files (all TypeScript data files under `src/data/` with content from resume)
3. Provided UI components (copy all provided components into `src/components/ui/`, verify they compile)
4. Hero section (adapt MinimalistHero to centered layout, integrate Typewriter, wire up nav links)
5. Projects & Publications section (BackgroundGradient cards in grid, project/publication data)
6. Experience & Education section (Timeline with all work and education entries, header text updated)
7. Contact section (ContactCard with contact info, LiquidButton for resume download, CommitsGrid with view counter API, social links)
8. Navigation (sticky nav that works across all sections, smooth scroll, mobile hamburger menu)
9. Polish (responsive testing, placeholder images, meta tags, Open Graph, favicon, final build verification)

## 9. Do NOT Build
- Blog or writing section
- CMS or admin interface
- Contact form or form backend
- Analytics or tracking (beyond the view counter)
- Dark mode toggle (system preference only)
- Authentication
- Comments or social features
- Loading spinners between sections (content is static)
- Any section or feature not in the PRD

## 10. Dependencies to Install
```
npm install framer-motion lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot
```

No other packages should be added without asking me first.

## 11. CSS Animations (globals.css)
The CommitsGrid component requires these custom animations. Add them to `globals.css`:
```css
@keyframes highlight {
  0% { background-color: transparent; }
  50% { background-color: var(--highlight); }
  100% { background-color: var(--highlight); }
}

@keyframes flash {
  0%, 100% { background-color: transparent; }
  50% { background-color: #0d4429; }
}

.animate-highlight {
  animation: highlight 0.6s ease-in-out forwards;
}

.animate-flash {
  animation: flash 2s ease-in-out infinite;
}
```

## 12. Environment
- No `.env` file needed for v1. The CounterAPI.dev endpoint is public and requires no key.
- If a key is needed later (e.g. swapping to a different counter service), add `.env.local` with `NEXT_PUBLIC_COUNTER_API_URL`.

## 13. File Management
- Keep `README.md` updated with setup instructions and tech choices.
- `PRD.md` stays in project root as the requirements reference.
- This `CLAUDE.md` stays in project root as the build instructions reference.
- Gitignore: `node_modules/`, `.next/`, `.env.local`, `.vercel/`
