# UI / Design Suggestions

Backlog of design ideas for the portfolio. Items lean into the "the site IS a terminal"
concept rather than generic portfolio patterns.

**Already implemented:**
- ✅ CRT ambiance (#11) — faint scanlines, `crt-glow` phosphor glow (prompts, hero name,
  hero blue text, project titles), green `::selection`, direction-aware `FadeIn` on all
  elements below the hero
- ✅ Mobile award-badge overflow fix on project cards

---

## 🏆 Signature elements

### 1. `neofetch` about-me block (hero upgrade)
The classic terminal trope — and the site has no "about" block. ASCII/SVG avatar left,
system-info right:

```
reghu@portfolio:~$ neofetch

      ████████          reghu @ portfolio
    ██▓▓▓▓▓▓▓▓██        ─────────────────
    ██▓▓██▓▓██▓▓        OS:        Human v25 (Boston build)
    ██▓▓▓▓▓▓▓▓██        Kernel:    MS Data Science, Northeastern
      ██▓▓▓▓██          Shell:     python · typescript · c#
    ██████████████      Uptime:    4 yrs in production
                        Packages:  6 projects, 1 paper (63 citations)
                        Awards:    4x hackathon winner
```

Color-swatch row at the bottom (classic neofetch palette strip) doubles as a
design-system flex.

### 2. Experience as `git log --graph`
Jobs are commits — perfect metaphor for chronology. An SVG branch line connects
colored commit dots:

```
reghu@portfolio:~$ git log --graph career/

●  commit 2025.07  (HEAD -> career)
│  Author: QuantUniversity <Boston, MA>
│  Graduate Intern · 2 mos
│    > Built AI content platform, 5 days → 3 hrs
│
●  commit 2023.08  (tag: v2.0-senior)
│  Author: Infosys <Bengaluru>
╽  ...
```

The vertical spine + dots is one small SVG; bullets stay as-is inside each entry.

### 3. tmux status bar (sticky bottom)
A thin bar fixed to the bottom — doubles as nav (fixes the missing mobile nav for free):

```
[0] reghu@portfolio │ 1:hero 2:projects* 3:experience 4:education 5:contact │ ⏱ visitors: 1.2k │ 06:14
```

Active section highlighted via scroll-spy. On mobile, just the numbered section list.

---

## 🃏 Project card redesign

### 4. Featured + compact split
Six equal cards = scroll fatigue. Instead: top 2 winners as large cards **with
screenshot thumbnails**, the rest as `ls -la` rows that expand on click:

```
$ ls -la projects/ --sort=awards

┌─ rescueline-ai/ ──────────────┐  ┌─ doodlpop/ ───────────────────┐
│ [screenshot in mini terminal] │  │ [screenshot in mini terminal] │
│ 🏆 1st · Innovaite · $700     │  │ 🏆 1st · SharkHack            │
│ AI emergency call triage…     │  │ AI comic book generator…      │
└───────────────────────────────┘  └───────────────────────────────┘

-rwxr--  leadcatch-ai     🥈 2nd  python·twilio   [code] [demo] [img 2]
-rwxr--  snapback         🥈 2nd  mediapipe·cv    [code] [img 4]
-rwxr--  deadpool         —       langgraph       [code] [img 3]
```

Screenshots + lightbox already exist but are hidden behind a button — thumbnails
surface that visual material.

### 5. Box-drawing character borders
Replace CSS borders with actual `┌─┐│└┘` glyph borders (SVG `border-image` or
pseudo-elements). Card headers become `┌─ rescueline-ai/ ─────┐`. The difference
between "styled like a terminal" and "rendered by a terminal."

### 6. Card status line
One CI-style status line at the top of each card: `● shipped` / `◉ live demo` /
`★ award` with colored dots — scannable at a glance, adds rhythm.

---

## 📐 Organization

### 7. Skills overview as `npm ls`
No at-a-glance tech summary exists anywhere; recruiters look for one:

```
reghu@portfolio:~$ npm ls --depth=1
reghu@2026.6.0
├── languages:  python · typescript · c# · sql
├── ai/ml:      langgraph · openai · mediapipe · gemini
├── backend:    fastapi · .net · postgres · redis
└── infra:      azure-devops · vercel · docker · k6
```

### 8. Separate publications from projects
The research paper sits in the same grid as hackathon projects and reads as "another
project." Give it its own `$ ls papers/` prompt with distinct chrome (purple spine,
BibTeX-styled `@article{...}` metadata block). The 63-citation count deserves `★ 63`
badge treatment.

### 9. Contact as an SSH session
```
$ ssh reghu@contact
Connection established.
Last login: today, from your browser
reghu@contact:~$ cat .links
```
Small framing change, big thematic payoff — the visitor grid fits as the "login banner."

---

## ✨ Graphics & atmosphere

### 10. SVG hero scene to replace the GIF
The pixel-art GIF is AI-generated raster — soft, heavy (it's the LCP), doesn't scale.
An inline SVG of the same scene (desk + CRT + scrolling green code animated via CSS)
is crisp at any size, ~10KB, themeable with the CSS variables, and animates only
`transform`/`opacity`.

### 12. figlet ASCII name
Render the name as ASCII block letters in a `<pre>` with the purple gradient applied —
more "terminal" than a styled `<h1>`:

```
██████╗ ███████╗ ██████╗ ██╗  ██╗██╗   ██╗
██╔══██╗██╔════╝██╔════╝ ██║  ██║██║   ██║
██████╔╝█████╗  ██║  ███╗███████║██║   ██║
```

(Full name is long — "REGHU" big + full name as a comment line under it.)

---

## 🔧 Smaller fixes (from the earlier UI review, still open)

- **Mobile nav missing** — title bar shows only traffic dots at 375px; once past the
  hero `ls` buttons there's no way to navigate. (Solved for free by #3 tmux bar.)
- **Visitor counter prints no number** — `echo $UNIQUE_VISITORS` shows only the pixel
  grid; add a plain-text line, e.g. `→ 1234 unique visitors`.
- **Hero GIF is the LCP and lazy-loaded** — add `priority` to the `next/image`, and
  `height: auto` to fix the aspect-ratio console warning. (Moot if #10 lands.)
- **Dead space inside short project cards** — pin tags+links to the card bottom
  (already flex-col; ensure `mt-auto` block behaves on short descriptions).
- **Inconsistent content widths** — experience ~1000px, education ~740px, contact
  ~500px; education/contact leave most of the screen empty at 1440px.
- **No heading structure** — only one `<h1>` on the page; add `sr-only` `<h2>`s per
  section (or make the `$ command` lines real headings) for a11y + SEO.
- **Typewriter duplicates static text** — "4x Hackathon Winner" appears both static
  and in the rotating strings; rotate things not already on screen.
- **Raw phone numbers** — display `+1 (857) 351-9009` while keeping the `tel:` href raw.
