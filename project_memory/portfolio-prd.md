# PRD: Portfolio Website — Reghunaath Ajith Kumar Ahila

## 1. Overview

A single-page portfolio website for a full-stack engineer targeting recruiters at tech companies and startup founders. The site should feel minimalist, polished, and animated.

**Owner:** Reghunaath Ajith Kumar Ahila
**Target launch:** v1 MVP
**Live URL:** TBD (deploy to Vercel)

---

## 2. Target Audience

- **Recruiters at tech companies** looking for full-stack engineers. They scan quickly, care about tech stack, impact metrics, and project demos.
- **Startup founders** evaluating potential hires or technical co-founders. They care about breadth, shipping speed, and end-to-end product building.

Both audiences spend under 30 seconds on a first visit. The site must communicate "full-stack engineer who ships" within that window.

---

## 3. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | **Next.js (App Router)** | Vercel-native, React-based, matches all reference components |
| Styling | **Tailwind CSS** | All reference components use Tailwind |
| Animations | **Framer Motion** | All reference components use Framer Motion |
| Language | **TypeScript** | Type safety, matches reference component patterns |
| Hosting | **Vercel** | Zero-config Next.js deploys |
| UI Primitives | **Install as needed** | No full shadcn/ui setup. Install individual deps as the provided components require them. |

### Key Dependencies (derived from provided components)
- `framer-motion` — all animations
- `lucide-react` — icons throughout
- `clsx` + `tailwind-merge` — for the `cn()` utility
- `class-variance-authority` — used by Button component
- `@radix-ui/react-slot` — used by Button component

### cn() Utility
All provided components use a `cn()` helper. Implement it at `@/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### What NOT to Use
- No CMS. Content is hardcoded in TypeScript data files.
- No form backend. Contact section displays info only.
- No analytics for v1.
- No shadcn/ui CLI or full setup. Just install the specific packages the provided components need.

---

## 4. Site Structure

Single page, four sections, smooth-scroll navigation.

```
[Nav Bar — fixed/sticky]
├── Hero Section
├── Projects & Publications
├── Work Experience & Education
└── Contact
```

---

## 5. Provided Components (Source Code)

### CRITICAL: Use these components directly. Adapt only where specified in Section 6. Do not rebuild from scratch.

### 5.1 MinimalistHero Component

**File:** `src/components/ui/minimalist-hero.tsx`

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12',
        className
      )}
    >
      {/* Header */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold tracking-wider"
        >
          {logoText}
        </motion.div>
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col space-y-1.5 md:hidden"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-6 bg-foreground"></span>
          <span className="block h-0.5 w-6 bg-foreground"></span>
          <span className="block h-0.5 w-5 bg-foreground"></span>
        </motion.button>
      </header>

      {/* Main Content Area */}
      <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="z-20 order-2 md:order-1 text-center md:text-left"
        >
          <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">{mainText}</p>
          <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font">
            Read More
          </a>
        </motion.div>

        {/* Center Image with Circle */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="absolute z-0 h-[300px] w-[300px] rounded-full bg-yellow-400/90 md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
            ></motion.div>
            <motion.img
                src={imageSrc}
                alt={imageAlt}
                className="relative z-10 h-auto w-56 object-cover md:w-64 scale-150 lg:w-72"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = `https://placehold.co/400x600/eab308/ffffff?text=Image+Not+Found`;
                }}
            />
        </div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="z-20 order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
```

**Required adaptation:** Remove the three-column grid, center image, and circle. Convert to centered single-column layout with large name text + intro below. Keep header, footer, all animations and timing curves. See Section 6.2 for details.

---

### 5.2 Timeline Component

**File:** `src/components/ui/timeline.tsx`

```tsx
"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Changelog from my journey
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          I&apos;ve been working on Aceternity for the past 2 years. Here&apos;s
          a timeline of my journey.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
```

**Required adaptation:** Change the hardcoded section header text ("Changelog from my journey" and the Aceternity description) to "Experience & Education" with subtitle "My professional journey so far." Everything else used as-is.

---

### 5.3 BackgroundGradient Component

**File:** `src/components/ui/background-gradient.tsx`

```tsx
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform",
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
```

**Required adaptation:** None. Use as-is. Wrap project/publication card content inside this component.

---

### 5.4 ContactCard Component

**File:** `src/components/ui/contact-card.tsx`

```tsx
import React from 'react';
import { cn } from '@/lib/utils';
import {
  LucideIcon,
  PlusIcon,
} from 'lucide-react';

type ContactInfoProps = React.ComponentProps<'div'> & {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ContactCardProps = React.ComponentProps<'div'> & {
  title?: string;
  description?: string;
  contactInfo?: ContactInfoProps[];
  formSectionClassName?: string;
};

export function ContactCard({
  title = 'Contact With Us',
  description = 'If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day.',
  contactInfo,
  className,
  formSectionClassName,
  children,
  ...props
}: ContactCardProps) {
  return (
    <div
      className={cn(
        'bg-card border relative grid h-full w-full shadow md:grid-cols-2 lg:grid-cols-3',
        className,
      )}
      {...props}
    >
      <PlusIcon className="absolute -top-3 -left-3 h-6 w-6" />
      <PlusIcon className="absolute -top-3 -right-3 h-6 w-6" />
      <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6" />
      <PlusIcon className="absolute -right-3 -bottom-3 h-6 w-6" />

      <div className="flex flex-col justify-between lg:col-span-2">
        <div className="relative h-full space-y-4 px-4 py-8 md:p-8">
          <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base lg:text-lg">
            {description}
          </p>
          <div className="grid gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
            {contactInfo?.map((info, index) => (
              <ContactInfo key={index} {...info} />
            ))}
          </div>
        </div>
      </div>

      <div
        className={cn(
          'bg-muted/40 flex h-full w-full items-center border-t p-5 md:col-span-1 md:border-t-0 md:border-l',
          formSectionClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

function ContactInfo({
  icon: Icon,
  label,
  value,
  className,
  ...props
}: ContactInfoProps) {
  return (
    <div className={cn('flex items-center gap-3 py-3', className)} {...props}>
      <div className="bg-muted/40 rounded-lg p-3">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-muted-foreground text-xs">{value}</p>
      </div>
    </div>
  );
}
```

**Required adaptation:** Instead of a form as `children`, pass resume download button + social links as the right panel content. Keep everything else as-is.

---

### 5.5 Typewriter Component

**File:** `src/components/ui/typewriter-text.tsx`

```tsx
"use client";
import * as React from "react"
import { useEffect, useState } from "react";
 
export interface TypewriterProps {
  text: string | string[];
  speed?: number;
  cursor?: string;
  loop?: boolean;
  deleteSpeed?: number;
  delay?: number;
  className?: string;
}
 
export function Typewriter({
  text,
  speed = 100,
  cursor = "|",
  loop = false,
  deleteSpeed = 50,
  delay = 1500,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArrayIndex, setTextArrayIndex] = useState(0);
 
  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[textArrayIndex] || "";
 
  useEffect(() => {
    if (!currentText) return;
 
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < currentText.length) {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText((prev) => prev.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentIndex(0);
            setTextArrayIndex((prev) => (prev + 1) % textArray.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed,
    );
 
    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    isDeleting,
    currentText,
    loop,
    speed,
    deleteSpeed,
    delay,
    displayText,
    text,
  ]);
 
  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">{cursor}</span>
    </span>
  );
}
```

**Required adaptation:** None. Use as-is in the Hero section for the subtitle/role text or intro text.

---

### 5.7 CommitsGrid Component

**File:** `src/components/ui/commits-grid.tsx`

```tsx
"use client" 

import * as React from "react"
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

export const CommitsGrid = ({ text }: { text: string }) => {
  const cleanString = (str: string): string => {
    const upperStr = str.toUpperCase();
    const withoutAccents = upperStr
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const allowedChars = Object.keys(letterPatterns);
    return withoutAccents
      .split("")
      .filter((char) => allowedChars.includes(char))
      .join("");
  };

  const generateHighlightedCells = (text: string) => {
    const cleanedText = cleanString(text);
    const width = Math.max(cleanedText.length * 6, 6) + 1;
    let currentPosition = 1;
    const highlightedCells: number[] = [];

    cleanedText
      .toUpperCase()
      .split("")
      .forEach((char) => {
        if (letterPatterns[char]) {
          const pattern = letterPatterns[char].map((pos) => {
            const row = Math.floor(pos / 50);
            const col = pos % 50;
            return (row + 1) * width + col + currentPosition;
          });
          highlightedCells.push(...pattern);
        }
        currentPosition += 6;
      });

    return {
      cells: highlightedCells,
      width,
      height: 9,
    };
  };

  const {
    cells: highlightedCells,
    width: gridWidth,
    height: gridHeight,
  } = generateHighlightedCells(text);

  const getRandomColor = () => {
    const commitColors = ["#48d55d", "#016d32", "#0d4429"];
    const randomIndex = Math.floor(Math.random() * commitColors.length);
    return commitColors[randomIndex];
  };

  const getRandomDelay = () => `${(Math.random() * 0.6).toFixed(1)}s`;
  const getRandomFlash = () => +(Math.random() < 0.3);

  return (
    <section
      className="w-full max-w-xl bg-card border grid p-1.5 sm:p-3 gap-0.5 sm:gap-1 rounded-[10px] sm:rounded-[15px]"
      style={{
        gridTemplateColumns: `repeat(${gridWidth}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${gridHeight}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: gridWidth * gridHeight }).map((_, index) => {
        const isHighlighted = highlightedCells.includes(index);
        const shouldFlash = !isHighlighted && getRandomFlash();

        return (
          <div
            key={index}
            className={cn(
              `border h-full w-full aspect-square rounded-[4px] sm:rounded-[3px]`,
              isHighlighted ? "animate-highlight" : "",
              shouldFlash ? "animate-flash" : "",
              !isHighlighted && !shouldFlash ? "bg-card" : ""
            )}
            style={
              {
                animationDelay: getRandomDelay(),
                "--highlight": getRandomColor(),
              } as CSSProperties
            }
          />
        );
      })}
    </section>
  );
};

const letterPatterns: { [key: string]: number[] } = {
  A: [1, 2, 3, 50, 100, 150, 200, 250, 300, 54, 104, 154, 204, 254, 304, 151, 152, 153],
  B: [0, 1, 2, 3, 4, 50, 100, 150, 151, 200, 250, 300, 301, 302, 303, 304, 54, 104, 152, 153, 204, 254, 303],
  C: [0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 301, 302, 303, 304],
  D: [0, 1, 2, 3, 50, 100, 150, 200, 250, 300, 301, 302, 54, 104, 154, 204, 254, 303],
  E: [0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 301, 302, 303, 304, 151, 152],
  F: [0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 151, 152, 153],
  G: [0, 1, 2, 3, 4, 50, 100, 150, 200, 250, 300, 301, 302, 303, 153, 204, 154, 304, 254],
  H: [0, 50, 100, 150, 200, 250, 300, 151, 152, 153, 4, 54, 104, 154, 204, 254, 304],
  I: [0, 1, 2, 3, 4, 52, 102, 152, 202, 252, 300, 301, 302, 303, 304],
  J: [0, 1, 2, 3, 4, 52, 102, 152, 202, 250, 252, 302, 300, 301],
  K: [0, 4, 50, 100, 150, 200, 250, 300, 151, 152, 103, 54, 203, 254, 304],
  L: [0, 50, 100, 150, 200, 250, 300, 301, 302, 303, 304],
  M: [0, 50, 100, 150, 200, 250, 300, 51, 102, 53, 4, 54, 104, 154, 204, 254, 304],
  N: [0, 50, 100, 150, 200, 250, 300, 51, 102, 153, 204, 4, 54, 104, 154, 204, 254, 304],
  O: [1, 2, 3, 50, 100, 150, 200, 250, 301, 302, 303, 54, 104, 154, 204, 254],
  P: [0, 50, 100, 150, 200, 250, 300, 1, 2, 3, 54, 104, 151, 152, 153],
  Q: [1, 2, 3, 50, 100, 150, 200, 250, 301, 302, 54, 104, 154, 204, 202, 253, 304],
  R: [0, 50, 100, 150, 200, 250, 300, 1, 2, 3, 54, 104, 151, 152, 153, 204, 254, 304],
  S: [1, 2, 3, 4, 50, 100, 151, 152, 153, 204, 254, 300, 301, 302, 303],
  T: [0, 1, 2, 3, 4, 52, 102, 152, 202, 252, 302],
  U: [0, 50, 100, 150, 200, 250, 301, 302, 303, 4, 54, 104, 154, 204, 254],
  V: [0, 50, 100, 150, 200, 251, 302, 4, 54, 104, 154, 204, 253],
  W: [0, 50, 100, 150, 200, 250, 301, 152, 202, 252, 4, 54, 104, 154, 204, 254, 303],
  X: [0, 50, 203, 254, 304, 4, 54, 152, 101, 103, 201, 250, 300],
  Y: [0, 50, 101, 152, 202, 252, 302, 4, 54, 103],
  Z: [0, 1, 2, 3, 4, 54, 103, 152, 201, 250, 300, 301, 302, 303, 304],
  "0": [1, 2, 3, 50, 100, 150, 200, 250, 301, 302, 303, 54, 104, 154, 204, 254],
  "1": [1, 52, 102, 152, 202, 252, 302, 0, 2, 300, 301, 302, 303, 304],
  "2": [0, 1, 2, 3, 54, 104, 152, 153, 201, 250, 300, 301, 302, 303, 304],
  "3": [0, 1, 2, 3, 54, 104, 152, 153, 204, 254, 300, 301, 302, 303],
  "4": [0, 50, 100, 150, 4, 54, 104, 151, 152, 153, 154, 204, 254, 304],
  "5": [0, 1, 2, 3, 4, 50, 100, 151, 152, 153, 204, 254, 300, 301, 302, 303],
  "6": [1, 2, 3, 50, 100, 150, 151, 152, 153, 200, 250, 301, 302, 204, 254, 303],
  "7": [0, 1, 2, 3, 4, 54, 103, 152, 201, 250, 300],
  "8": [1, 2, 3, 50, 100, 151, 152, 153, 200, 250, 301, 302, 303, 54, 104, 204, 254],
  "9": [1, 2, 3, 50, 100, 151, 152, 153, 154, 204, 254, 304, 54, 104],
  " ": [],
};
```

**Required CSS animations:** Add these to `globals.css`:
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

**Required adaptation:** None to the component itself. Use as-is. The text prop will be dynamically set from the view count fetched via API.

**File:** `src/components/ui/button.tsx`

```tsx
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-primary-foreground hover:bg-destructive/90",
        cool: "dark:inset-shadow-2xs dark:inset-shadow-white/10 bg-linear-to-t border border-b-2 border-zinc-950/40 from-primary to-primary/85 shadow-md shadow-primary/20 ring-1 ring-inset ring-white/25 transition-[filter] duration-200 hover:brightness-110 active:brightness-90 dark:border-x-0 text-primary-foreground dark:text-primary-foreground dark:border-t-0 dark:border-primary/50 dark:ring-white/5",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants, liquidbuttonVariants, LiquidButton }

const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:scale-105 duration-300 transition text-primary",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 text-xs gap-1.5 px-4 has-[>svg]:px-4",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-md px-8 has-[>svg]:px-6",
        xxl: "h-14 rounded-md px-10 has-[>svg]:px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "xxl",
    },
  }
)

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof liquidbuttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <>
      <Comp
        data-slot="button"
        className={cn(
          "relative",
          liquidbuttonVariants({ variant, size, className })
        )}
        {...props}
      >
        <div className="absolute top-0 left-0 z-0 h-full w-full rounded-full 
            shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)] 
        transition-all 
        dark:shadow-[0_0_8px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3.5px_rgba(255,255,255,0.09),inset_-3px_-3px_0.5px_-3.5px_rgba(255,255,255,0.85),inset_1px_1px_1px_-0.5px_rgba(255,255,255,0.6),inset_-1px_-1px_1px_-0.5px_rgba(255,255,255,0.6),inset_0_0_6px_6px_rgba(255,255,255,0.12),inset_0_0_2px_2px_rgba(255,255,255,0.06),0_0_12px_rgba(0,0,0,0.15)]" />
        <div
          className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-md"
          style={{ backdropFilter: 'url("#container-glass")' }}
        />

        <div className="pointer-events-none z-10 ">
          {children}
        </div>
        <GlassFilter />
      </Comp>
    </>
  )
}

function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
```

**Required adaptation:** None. Use `LiquidButton` for the "Download Resume" button in the contact section. The standard `Button` is also available for any other uses. The file exports both.

**Usage in contact section:**
```tsx
import { LiquidButton } from "@/components/ui/button";

<a href="/resume.pdf" download>
  <LiquidButton size="lg">Download Resume</LiquidButton>
</a>
```

---

## 6. Section Specifications

### 6.1 Navigation

Extracted from the MinimalistHero component's header.

**Behavior:** Fixed top nav, visible on all sections. Smooth-scrolls to section anchors on click.

**Elements:**
- Logo/name text (left) — "Reghunaath" or a stylized short version, bold, `tracking-wider`
- Nav links (right, desktop) — PROJECTS, EXPERIENCE, CONTACT
- Hamburger menu (mobile) — three-line icon from the MinimalistHero component

**Animations (from MinimalistHero):**
- Logo: `opacity: 0, x: -20` → `opacity: 1, x: 0`, 0.5s
- Hamburger: `opacity: 0, x: 20` → `opacity: 1, x: 0`, 0.5s

**Note:** The nav in MinimalistHero is part of the hero component. For a single-page site, extract the nav into a shared sticky Navbar component that persists across all sections, or keep it within the hero and add a separate sticky nav that appears on scroll past the hero. Decide based on what feels cleanest.

---

### 6.2 Hero Section

**Base component:** `MinimalistHero` (adapted)

**Layout change:** Remove the three-column grid. Replace with a centered single-column layout:
- Large bold text (your name) — centered, dominant
- Subtitle (role) — centered below name
- Short intro paragraph — centered, max-width constrained
- "View Resume" link below

**Keep from MinimalistHero:**
- Full viewport height (`h-screen`)
- Header (nav) at top
- Footer strip at bottom: social links (left), location text (right)
- All animation easing curves (`[0.22, 1, 0.36, 1]`)
- Background color and font styling

**Remove from MinimalistHero:**
- Center image + circle (the `imageSrc`, `imageAlt` props and related elements)
- Three-column grid layout
- `overlayText` as a side column

**Content:**
- Large text: "Reghunaath" in `text-7xl md:text-8xl lg:text-9xl font-extrabold`
- Subtitle: Use the **Typewriter** component with `loop: true` to cycle through roles/descriptors. Example: `text={["Full-Stack Engineer", "AI Builder", "Hackathon Winner"]}` with `speed={100}` and appropriate styling.
- Intro: "I build end-to-end products with React, Python, and .NET. Currently pursuing my Master's in Data Science at Northeastern."
- Social links: LinkedIn, GitHub, Email (lucide-react icons)
- Location: "Boston, MA"

**Animations (adapted):**
- Large text: `opacity: 0, y: 20` → visible, 0.6s, 0.4s delay
- Subtitle: `opacity: 0, y: 20` → visible, 0.6s, 0.6s delay
- Intro text: `opacity: 0, y: 20` → visible, 0.6s, 0.8s delay
- Social links: `opacity: 0, y: 20` → visible, 0.5s, 1.0s delay
- Location: `opacity: 0, y: 20` → visible, 0.5s, 1.1s delay

**Modified props interface:**
```typescript
interface HeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  name: string;
  subtitle: string;
  introText: string;
  resumeLink: string;
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}
```

---

### 6.3 Projects & Publications

**Base component:** `BackgroundGradient` (used as-is, wrapping custom card content)

**Layout:** Section with a header, then a responsive grid of BackgroundGradient cards.
- Desktop: 2 columns for projects, full-width for publication
- Mobile: single column
- Gap: `gap-8`

**Section header:**
- Title: "Projects & Publications" — `text-lg md:text-4xl font-bold`
- Subtitle: "Things I've built and research I've contributed to." — `text-sm md:text-base text-neutral-700 dark:text-neutral-300`

**Card content (Projects):**

Each project wrapped in `<BackgroundGradient className="rounded-[22px] p-4 sm:p-10 bg-white dark:bg-zinc-900">`:
- Project screenshot at top (`next/image`, `object-cover`, placeholder if unavailable)
- Project title — `text-base sm:text-xl font-bold`
- Description — `text-sm text-neutral-600 dark:text-neutral-400`, 2-3 lines
- Tech stack tags — small inline badges/pills
- Award badge if applicable
- GitHub + demo links as icon buttons

**Card content (Publications):**

Same BackgroundGradient wrapper:
- Publication title — bold
- Authors — your name highlighted
- Journal, year
- Citation count badge — "56 citations"
- Link to paper

**Data (from resume):**

Projects:
1. **RescueLine AI** — AI emergency call triage. Tags: FastAPI, Twilio, ElevenLabs, WebSocket. Award: 1st place, $700, Innovate 2026 Hackathon.
2. **LeadCatch AI** — AI chat assistant for missed calls. Tags: Python, ChatGPT API, Twilio. Award: 2nd place, $1500, Yconic AI Hackathon.

Publications:
1. **1D Convolution approach to human activity recognition using sensor data and comparison with machine learning algorithms** — Muralidharan, K., Ramesh, A., Rithvik, G., Prem, S., **Reghunaath, A. A.**, & Gopinath, M. P. (2021). International Journal of Cognitive Computing in Engineering, 2, 130-143. 56 citations.

**Animations:**
- Cards: fade in + slide up on scroll, staggered (0.1s delay between each)
- BackgroundGradient: animated gradient loop runs continuously (built into the component)

---

### 6.4 Work Experience & Education

**Base component:** `Timeline` (used as-is, header text changed)

**Data entries (reverse chronological, work first, then education):**

```typescript
const timelineData = [
  {
    title: "2025",
    content: /* QuantUniversity — Graduate Intern */
  },
  {
    title: "2023–2024",
    content: /* Infosys — Senior Systems Engineer */
  },
  {
    title: "2022–2023",
    content: /* Danske IT — Associate Software Engineer */
  },
  {
    title: "Early 2022",
    content: /* Danske IT — Apprentice */
  },
  {
    title: "2024–2026",
    content: /* Northeastern University — MS Data Science */
  },
  {
    title: "2018–2022",
    content: /* VIT Vellore — BTech CSE */
  },
];
```

**Content per entry:** React node containing:
- Company/University name — bold
- Role/Degree
- Location
- 2-4 key achievement bullets
- Optional: 2x2 image grid if screenshots are available

**Section header adaptation:** Change "Changelog from my journey" → "Experience & Education" and subtitle → "My professional journey so far."

---

### 6.5 Contact

**Base component:** `ContactCard` (adapted — form replaced)

**Left panel (spans 2 cols on lg):**
- Title: "Get in touch"
- Subtitle: "Have a role, a project, or just want to say hi? Here's how to reach me."
- Contact info grid (using built-in ContactInfo sub-component):
  - Email: ajithkumarahila.r@northeastern.edu (MailIcon)
  - Phone: (857)-351-9009 (PhoneIcon)
  - Location: Boston, MA (MapPinIcon)

**Right panel (replaces form children):**
- "Download Resume" using the `LiquidButton` component (`size="lg"`) wrapped in an `<a>` tag pointing to `/resume.pdf`
- Social links with labels: LinkedIn, GitHub
- **Visitor count** displayed using the `CommitsGrid` component. Fetch count from CounterAPI.dev on page load, then render `<CommitsGrid text="{count} VIEWS" />`.
- Styled within the existing `bg-muted/40` panel

**Visitor count implementation:**
- **API:** Use [CounterAPI.dev](https://counterapi.dev/) (free, unlimited, no auth required)
- **Behavior:** On page load, hit the CounterAPI endpoint to increment and retrieve the current count. Pass the count as a string (e.g. `"1234 VIEWS"`) to the `CommitsGrid` component's `text` prop.
- **Fallback:** If the API call fails, show a static fallback like `"HELLO"` or hide the grid.
- **Key:** Use a unique namespace/key like `reghunaath-portfolio/views` to avoid collisions.
- **Note:** CounterAPI.dev is a free third-party service. If it goes down or is discontinued, swap to Abacus (abacus.jasoncameron.dev) as a fallback with minimal code changes (same REST pattern).

---

## 7. Global Design Specs

### Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `background` | `#ffffff` | `#0a0a0a` / `neutral-950` | Page background |
| `foreground` | `#0a0a0a` | `#fafafa` | Primary text |
| `foreground/60` | 60% opacity | 60% opacity | Nav links, muted text |
| `foreground/80` | 80% opacity | 80% opacity | Body text |
| `muted` | `#f5f5f5` | `#171717` | Card backgrounds |
| `border` | `#e5e5e5` | `#262626` | Card borders |

**Dark mode:** Support via `prefers-color-scheme` using Tailwind's `dark:` prefix. The provided components already use dark mode classes. No manual toggle for v1.

### Typography
- Font: **Inter** via `next/font/google`
- Hero name: `text-7xl md:text-8xl lg:text-9xl font-extrabold`
- Section headers: `text-lg md:text-4xl font-bold`
- Body: `text-sm md:text-base font-normal`, relaxed leading
- Nav: `text-sm font-medium tracking-widest`

### Spacing
- Max width: `max-w-7xl` across all sections
- Section padding: `py-20 px-4 md:px-8 lg:px-10`
- Hero: `p-8 md:p-12`, `h-screen`

---

## 8. Data Architecture

All content in TypeScript data files.

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
│       ├── minimalist-hero.tsx      // PROVIDED — adapted
│       ├── typewriter-text.tsx      // PROVIDED — as-is
│       ├── timeline.tsx             // PROVIDED — header text changed
│       ├── background-gradient.tsx  // PROVIDED — as-is
│       ├── contact-card.tsx         // PROVIDED — adapted
│       ├── commits-grid.tsx         // PROVIDED — as-is
│       └── button.tsx               // PROVIDED — LiquidButton used for resume
├── lib/
│   └── utils.ts
└── app/
    ├── layout.tsx
    ├── page.tsx
    └── globals.css
```

**Data file examples:**

```typescript
// data/personal.ts
export const personal = {
  name: "Reghunaath",
  subtitle: "Full-Stack Engineer",
  intro: "I build end-to-end products with React, Python, and .NET. Currently pursuing my Master's in Data Science at Northeastern.",
  location: "Boston, MA",
  email: "ajithkumarahila.r@northeastern.edu",
  phone: "(857)-351-9009",
  linkedin: "https://www.linkedin.com/in/reghunaath",
  github: "",  // TODO: add GitHub URL
  resumePath: "/resume.pdf",
};

// data/projects.ts
export const projects = [
  {
    title: "RescueLine AI",
    description: "AI-powered emergency call triage system using Twilio, ElevenLabs, and FastAPI. Automatically classifies and routes emergency calls by urgency. Real-time voice AI agent with WebSocket-based live dashboard.",
    tags: ["FastAPI", "Twilio", "ElevenLabs", "WebSocket"],
    image: "/images/rescueline.png",  // TODO: add screenshot
    github: "",
    demo: "",
    award: "1st Place, $700 — Innovate 2026 Hackathon",
  },
  {
    title: "LeadCatch AI",
    description: "AI chat assistant that turns missed calls into booked appointments for small businesses. Scalable Python backend for multi-user handling with automated SMS-based lead conversion.",
    tags: ["Python", "ChatGPT API", "Twilio"],
    image: "/images/leadcatch.png",  // TODO: add screenshot
    github: "",
    demo: "",
    award: "2nd Place, $1500 — Yconic AI Hackathon",
  },
];

// data/publications.ts
export const publications = [
  {
    title: "1D Convolution approach to human activity recognition using sensor data and comparison with machine learning algorithms",
    authors: "Muralidharan, K., Ramesh, A., Rithvik, G., Prem, S., Reghunaath, A. A., & Gopinath, M. P.",
    journal: "International Journal of Cognitive Computing in Engineering",
    volume: "2",
    pages: "130-143",
    year: 2021,
    citations: 56,
    url: "",  // TODO: add paper link
  },
];
```

---

## 9. Performance Requirements

- Lighthouse: 90+ all categories
- FCP: < 1.5s
- Images: `next/image` with lazy loading and responsive sizes
- Fonts: `next/font/google` for Inter
- Animations: `will-change-transform` (already in provided components), GPU-accelerated

---

## 10. Content Placeholders

| Asset | Placeholder | Comment |
|-------|-------------|---------|
| Project screenshots | `placehold.co/500x300` with project name | Mark with `// TODO` |
| Resume PDF | Empty path `/public/resume.pdf` | Swap later |
| GitHub URLs | Empty strings | Swap later |

---

## 11. Out of Scope for v1

- Blog
- CMS
- Contact form / backend
- Analytics
- Dark mode toggle (system preference only)
- Custom domain
- SEO beyond basic meta tags and Open Graph

---

## 12. Acceptance Criteria

1. All four sections render correctly on desktop (1440px) and mobile (375px)
2. Nav links smooth-scroll to correct section anchors
3. Mobile hamburger menu opens and dismisses
4. Hero entrance animations play on page load with correct stagger timing
5. BackgroundGradient cards render with animated gradient borders
6. Timeline scroll-driven progress animation works (gradient line fills on scroll)
7. Timeline sticky year labels work correctly
8. Contact card renders with contact info and resume download button
9. All content comes from TypeScript data files
10. **Provided components are used directly, adapted only where specified in this PRD**
11. `next/image` used for all images with alt text and fallback placeholders
12. Deploys to Vercel with no build errors
13. Lighthouse performance >= 90
