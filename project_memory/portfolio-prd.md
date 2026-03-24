# PRD: Terminal Portfolio — Reghunaath Ajith Kumar Ahila

## 1. Concept & Philosophy

The website IS a terminal session. Not "terminal-inspired" — actually structured as a continuous shell session that a developer would recognize immediately. The page reads top to bottom like someone's live terminal: commands typed, output printed, session continuing. Every section is a command + its output.

**The contract with the visitor:**
- They feel like they're reading a developer's actual terminal
- The aesthetic signals: "this person lives in a terminal"
- Content communicates in under 30 seconds: "full-stack engineer who ships"

**What this means in practice:**
- Monospace font EVERYWHERE (JetBrains Mono)
- Dark background: `#0d1117`
- A persistent macOS-style terminal title bar pinned at top
- Each section opened by a prompt line: `reghu@portfolio:~$ <command>`
- Outputs styled as terminal text (not heavy cards, not boxes)
- Transitions feel like text being rendered, not UI sliding in

---

## 2. Target Audience

- **Recruiters at tech companies** scanning for full-stack engineers. They see the terminal and immediately categorize: "serious developer."
- **Startup founders** evaluating technical co-founders. The terminal aesthetic signals technical depth.

Both spend under 30 seconds on first visit. The terminal hook grabs attention within 2 seconds.

---

## 3. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16+ (App Router) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Language | TypeScript (strict) |
| Font | JetBrains Mono (Google Fonts, weights 400/500/700) |
| Icons | lucide-react |
| Hosting | Vercel |
| View Counter | CounterAPI.dev |

### Dependencies
```
npm install framer-motion lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-slot
```

### cn() Utility — `src/lib/utils.ts`
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 4. Design System

### 4.1 Color Palette

All colors defined as CSS custom properties in `globals.css`.

```css
--t-bg:      #0d1117;   /* page background */
--t-surface: #161b22;   /* card / elevated surface */
--t-border:  #30363d;   /* borders, dividers */
--t-text:    #c9d1d9;   /* primary text */
--t-dim:     #8b949e;   /* secondary / muted text */
--t-green:   #3fb950;   /* $ prompt symbol, success */
--t-blue:    #58a6ff;   /* links, directory names, commands */
--t-purple:  #a371f7;   /* highlights, gradient start */
--t-purple2: #6ea6fa;   /* gradient end */
--t-yellow:  #e3b341;   /* awards, badges */
--t-red:     #f85149;   /* accent, error states */
--t-cyan:    #79c0ff;   /* special output, headings */
```

Map to Tailwind via `@theme inline` in globals.css.

### 4.2 Typography

**Font:** JetBrains Mono — load via `next/font/google` with variable `--font-jetbrains`.
Every element uses monospace. No serif or sans-serif fallbacks.

**Scale:**
- `text-xs` — metadata, timestamps, comments, dim labels
- `text-sm` — body text, bullet content, most output
- `text-base` — default prompt lines, file headers
- `text-lg` — section category labels
- `text-3xl`–`text-5xl` — hero name only

**Responsive font scaling (root font-size):**

All Tailwind `rem`-based sizes scale proportionally via the root `font-size`:
```css
html { font-size: 14px; }                         /* default / mobile */
@media (min-width: 1280px) { html { font-size: 16px; } }
@media (min-width: 1536px) { html { font-size: 18px; } }
```
No per-component overrides needed — the whole type system scales together.

### 4.3 Spacing & Layout

- **Content alignment:** Left-anchored (no `mx-auto`). Left gutter: `px-6 md:px-12 lg:px-20`
- Section vertical gap: `pt-16 md:pt-24`
- Prompt → output gap: `mt-1`
- Output block → next prompt: `mt-6 md:mt-10`
- Line height: `leading-relaxed`

### 4.4 Interactive States

- Links: `text-[#58a6ff] hover:text-[#79c0ff] transition-colors`
- Terminal bracket buttons: `[ label ]` with `border border-[#30363d] px-3 py-1 text-[#58a6ff] hover:bg-[#161b22] hover:text-[#79c0ff] transition-colors inline-block text-sm`
- Hover on output blocks: subtle `hover:bg-[#161b22]/30` background on individual items

---

## 5. Global Layout

### 5.1 Page Structure

```
<html style="background:#0d1117; font-family:JetBrains Mono">
  <TerminalTitleBar />       ← sticky top, z-50, h-10
  <main pt-10>               ← padding-top to clear title bar
    <div px-6 md:px-12 lg:px-20 pb-24>   ← left-anchored, no max-w
      <HeroSection />        id="hero"
      <ProjectsSection />    id="projects"
      <ExperienceSection />  id="experience"
      <EducationSection />   id="education"
      <ContactSection />     id="contact"
    </div>
  </main>
</html>
```

No animated background. Solid `#0d1117`.

### 5.2 TerminalTitleBar

**File:** `src/components/ui/terminal-title-bar.tsx`

```
● ● ●   reghu@portfolio — bash          ~/  projects  experience  education  contact
```

- Fixed, `h-10`, `bg-[#161b22] border-b border-[#30363d]`, full viewport width
- Left: 3 dots (red/yellow/green) + `reghu@portfolio — bash` in `text-xs text-[#8b949e]`
- Right: nav links, `text-xs text-[#8b949e] hover:text-[#c9d1d9]`, hidden on mobile
- Mobile: hamburger icon (3 bars), nav links hidden

### 5.3 PromptLine

**File:** `src/components/ui/prompt-line.tsx`

Renders a single terminal prompt line:
```
reghu@portfolio:<path>$ <command>
```
- `reghu@portfolio:` in `text-[#8b949e]`
- `<path>` in `text-[#3fb950]`
- `$` in `text-[#8b949e]`
- ` <command>` in `text-[#58a6ff]`
- Animates in via Framer Motion `whileInView` (`opacity 0→1, y 8→0`)
- Props: `command: string`, `path?: string` (default `~`)

---

## 6. Component Architecture

| Component | File | Purpose |
|---|---|---|
| TerminalTitleBar | `src/components/ui/terminal-title-bar.tsx` | Sticky nav bar |
| PromptLine | `src/components/ui/prompt-line.tsx` | `$ command` line with animation |
| TypewriterText | `src/components/ui/typewriter-text.tsx` | Cycling text typewriter |
| TerminalCard | `src/components/ui/terminal-card.tsx` | Surface card for grouped output |

---

## 7. Section Specifications

### 7.1 HeroSection (`src/components/sections/HeroSection.tsx`)

Full viewport height (minus title bar). Staggered boot sequence animation on page load.
Section class: `min-h-[calc(100vh-2.5rem)] flex flex-col justify-center py-8`

```
Last login: Mon Mar 23 2026 from Boston, MA

reghu@portfolio:~$ whoami

  REGHUNAATH AJITH KUMAR AHILA      ← gradient text, text-3xl sm:text-4xl lg:text-5xl

reghu@portfolio:~$ cat role.txt

  > Full-Stack Engineer_            ← TypewriterText cycling subtitles

reghu@portfolio:~$ cat intro.txt

  I build full-stack products end-to-end and ship fast.
  MS Data Science @ Northeastern · 2x Hackathon Winner · Published Researcher.

reghu@portfolio:~$ ls

  projects/   experience/   education/   contact/   resume.pdf

reghu@portfolio:~$ _
```

**Stagger delays:** last-login 0.1s, whoami block 0.3s/0.5s, cat role.txt 0.7s/0.9s, cat intro.txt 1.1s/1.3s, ls 1.5s/1.7s, cursor 1.9s

**Name:** inline `style` with `background: linear-gradient(to right, #a371f7, #6ea6fa)`, `WebkitBackgroundClip: text`, `WebkitTextFillColor: transparent`. Size: `text-3xl sm:text-4xl lg:text-5xl font-bold`.

**ls output:** flex row of `<a>` links in `text-[#58a6ff]`, gap-x-6. Each links to its section anchor or `/resume.pdf`.

**Blinking cursor:** `animate-blink` CSS class from globals.css

---

### 7.2 ProjectsSection (`src/components/sections/ProjectsSection.tsx`)

```
reghu@portfolio:~$ ls -la projects/

  NAME             STACK                           AWARD
  ──────────────── ──────────────────────────────  ──────────────────────
  RescueLine AI/   React · FastAPI · Gemini        🏆 1st Place — $700
  LeadCatch AI/    Next.js · OpenAI · LangChain    🥈 2nd Place — $1,500

reghu@portfolio:~/projects$ cat rescueline-ai/README.md

  # RescueLine AI                             ← text-[#79c0ff] font-bold
  award: 🏆 1st Place — $700                  ← text-[#e3b341]

  [description paragraph]                    ← text-[#c9d1d9] text-sm

  stack:  [React] [FastAPI] [Gemini] [Python]  ← dim brackets

  [ view demo ↗ ]    [ github ↗ ]             ← terminal bracket buttons

reghu@portfolio:~/projects$ cat leadcatch-ai/README.md
  ... (same format)
```

**Table column widths (all `shrink-0`):**
- NAME: `w-44`
- STACK: `w-56`
- AWARD: `w-48 hidden sm:block whitespace-nowrap`

**BibTeX publication block (`cat research/publications.bib`):**
Key column width: `w-16 shrink-0` (fits `journal` at 7 chars).

**`BracketLink` component:** renders `[ label ↗ ]` as a bordered link if `href` is non-empty; renders greyed-out `[ label ]` span (no link) if `href` is empty.

---

### 7.3 ExperienceSection (`src/components/sections/ExperienceSection.tsx`)

```
reghu@portfolio:~$ history --jobs

  #  COMPANY              ROLE                      PERIOD
  ── ──────────────────── ──────────────────────────────── ──────────────────
  1  QuantUniversity      Graduate Intern           Jul 2025 – Aug 2025
  2  Northeastern Univ.   Teaching Assistant        May 2025 – Dec 2025
  3  Infosys              Senior Systems Engineer   Aug 2023 – Jul 2024
  4  Danske IT            Associate Software Eng.   Jul 2022 – Aug 2023
  5  Danske IT            Apprentice                Jan 2022 – Jul 2022

reghu@portfolio:~$ cat jobs/1-quantuniversity.txt
  ...
```

**Desktop table** (`hidden md:block`) — all columns `shrink-0`, no `min-w-max`:
- `#`: `w-6`
- COMPANY: `w-52`
- ROLE: `w-60`
- PERIOD: `w-44`

**Mobile stacked list** (`md:hidden`) — no table, no horizontal overflow:
```
1. QuantUniversity
   Graduate Intern
   Jul 2025 – Aug 2025
```
Each entry: number + company + role stacked vertically, period indented below.

**Job file slugs** — derived from company + role to disambiguate duplicate companies:
```
1-quantuniversity.txt
2-northeastern-university.txt
3-infosys.txt
4-danske-it-associate.txt
5-danske-it-apprentice.txt
```
Slug logic: `role.toLowerCase().includes("apprentice") ? "-apprentice" : role.includes("associate") ? "-associate" : ""`

- Table: `#` in `text-[#8b949e]`, company in `text-[#79c0ff]`, role in `text-[#c9d1d9]`, period in `text-[#8b949e]`
- Job header: company in `text-[#79c0ff]`, rest in `text-[#8b949e]`
- Separator: `─` characters (60 chars)
- Bullets: `>` in `text-[#3fb950]`, content in `text-[#c9d1d9] text-sm`

---

### 7.4 EducationSection (`src/components/sections/EducationSection.tsx`)

```
reghu@portfolio:~$ cat ~/.education

  [2024 – 2026]  Northeastern University · Boston, MA
                 MS Data Science                           GPA: 3.9/4.0

  [2018 – 2022]  VIT Vellore · India
                 B.Tech Computer Science & Engineering     GPA: 3.42/4.0
```

- Year brackets: `text-[#8b949e] text-xs`
- Institution: `text-[#79c0ff] font-medium`
- Degree: `text-[#c9d1d9]`
- GPA: `text-[#e3b341]`
- Layout: stacked on mobile (`flex-col`), side-by-side on `sm+` (`sm:flex-row`)

---

### 7.5 ContactSection (`src/components/sections/ContactSection.tsx`)

Preceded by a terminal session separator that visually divides Education from Contact:
```
# ── end of records ────────────────────────────────────────────────
```
Styled `text-xs text-[#30363d]` — dim, terminal-native, non-intrusive.

```
reghu@portfolio:~$ cat contact.txt

  email     ajithkumarahila.r@northeastern.edu
  linkedin  linkedin.com/in/reghunaath
  github    github.com/[TBD]
  phone     (857)-351-9009
  location  Boston, MA

reghu@portfolio:~$ ./download-resume

  [ Download Resume ↗ ]

reghu@portfolio:~$ uptime

  This terminal has been visited 1,234 times.

reghu@portfolio:~$ exit

  logout
  Saving session...
  ...saving history...done.

  © 2026 Reghunaath Ajith Kumar Ahila
```

- Contact keys: `text-[#8b949e] w-16 shrink-0`
- Contact values: links in `text-[#58a6ff] hover:text-[#79c0ff]`, plain text in `text-[#c9d1d9]`
- View counter: fetches `https://api.counterapi.dev/v1/reghu-portfolio/visits/up`, count in `text-[#e3b341]`, fallback `...`
- Footer lines: `text-xs text-[#8b949e]`

---

## 8. Favicon

**File:** `public/favicon.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="6" fill="#0d1117"/>
  <text x="3" y="23" font-family="monospace" font-size="18" font-weight="700" fill="#3fb950">&gt;_</text>
</svg>
```

Referenced in `layout.tsx` metadata: `icons: { icon: "/favicon.svg" }`.

---

## 9. Data Files

### `src/data/personal.ts`
```typescript
export const personal = {
  name: "Reghunaath Ajith Kumar Ahila",
  subtitle: ["Full-Stack Engineer", "AI Developer", "2x Hackathon Winner", "Published Researcher"],
  intro: "I build full-stack products end-to-end and ship fast.",
  intro2: "MS Data Science @ Northeastern · 2x Hackathon Winner · Published Researcher.",
  location: "Boston, MA",
  email: "ajithkumarahila.r@northeastern.edu",
  phone: "(857)-351-9009",
  linkedin: "https://www.linkedin.com/in/reghunaath",
  github: "", // TODO: add GitHub URL
  resumePath: "/resume.pdf",
};
```

### `src/data/projects.ts`
```typescript
export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  award?: string;
}
export const projects: Project[] = [ ... ]
```

### `src/data/experience.ts`
```typescript
export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
}
export const experience: Experience[] = [ ... ]
```

### `src/data/education.ts`
```typescript
export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  gpa: string;
  bullets: string[];
}
export const education: Education[] = [ ... ]
```

### `src/data/publications.ts`
```typescript
export interface Publication {
  key: string;      // BibTeX key, e.g. "ajith2021activity"
  title: string;
  authors: string;
  journal: string;
  year: number;
  citations: number;
  url: string;
}
export const publications: Publication[] = [ ... ]
```

---

## 10. Animation Spec

| Element | Trigger | Animation |
|---|---|---|
| Hero boot sequence | page load | staggered delays per block, each: `opacity 0→1, y 10→0, 0.4s easeOut` |
| PromptLine (non-hero) | whileInView | `opacity 0→1, y 8→0, 0.35s easeOut, once: true` |
| Output block | whileInView | `opacity 0→1, y 8→0, 0.35s easeOut, delay 0.1s, once: true` |
| Hero name | page load | `opacity 0→1, y 10→0, delay 0.5s` |
| TypewriterText | mount | char-by-char, speed 80ms, deleteSpeed 40ms, delay 2000ms, loop |
| Cursor blink | always | `animate-blink` CSS class (step-end infinite) |
| View counter | mount | fetch CounterAPI.dev, display count; show `...` while loading |

---

## 11. Build Order

1. **Scaffold** — `src/` folders, `globals.css`, `layout.tsx`, `page.tsx` skeleton, `utils.ts`
2. **Data files** — all 5 TypeScript data files with real content
3. **UI primitives** — `TerminalTitleBar`, `PromptLine`, `TypewriterText`, `TerminalCard`
4. **HeroSection** — stagger boot sequence, name gradient, typewriter, ls nav
5. **ProjectsSection** — ls table + cat blocks + publications bib
6. **ExperienceSection** — history table + cat job blocks
7. **EducationSection** — cat ~/.education
8. **ContactSection** — session separator + contact info + download + view counter + footer
9. **Assembly & polish** — page.tsx, responsive test, final `npm run build`

---

## 12. Do NOT Build
- Animated grid background — removed
- GlowCard or BackgroundGradient — removed
- Light mode / dark mode toggle — always dark (terminal IS the dark theme)
- Blog, CMS, contact form, auth
- Images in project cards (terminal doesn't render images)
- Any section not listed above
