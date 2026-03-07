"use client";
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Typewriter } from "./typewriter-text";
import { AnimatedGradientText } from "@/registry/magicui/animated-gradient-text";

const Boxes = dynamic(() => import("./boxes").then((m) => m.Boxes), {
  ssr: false,
});

interface HeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  name: string;
  subtitle: string[];
  introText: string;
  resumeLink: string;
  socialLinks: { icon: LucideIcon; href: string }[];
  locationText: string;
  className?: string;
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground"
  >
    {children}
  </a>
);

const SocialIcon = ({
  href,
  icon: Icon,
}: {
  href: string;
  icon: LucideIcon;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground/60 transition-colors hover:text-foreground"
  >
    <Icon className="h-5 w-5" />
  </a>
);

export const MinimalistHero = ({
  logoText,
  navLinks,
  name,
  subtitle,
  introText,
  resumeLink,
  socialLinks,
  locationText,
  className,
}: HeroProps) => {
  return (
    <div
      className={cn(
        "relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12",
        className
      )}
    >
      {/* Background boxes */}
      <Boxes />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-background/70 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Header */}
      <header className="z-30 flex w-full max-w-7xl items-center justify-between">
        <div />
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

      {/* Main Content — centered single column */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center flex-grow pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-7xl md:text-8xl lg:text-9xl font-extrabold"
        >
          <AnimatedGradientText colorFrom="#7bb0ff" colorTo="#a77bff" speed={6}>
            {name}
          </AnimatedGradientText>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-4 text-xl md:text-2xl text-indigo-500 dark:text-indigo-400 font-medium tracking-wide"
        >
          <Typewriter
            text={subtitle}
            loop
            speed={100}
            deleteSpeed={50}
            delay={1500}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 max-w-md text-base leading-loose text-foreground/70 italic [font-family:var(--font-lora)]"
        >
          {introText}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 pointer-events-auto inline-flex"
          >
            <span className="rounded-full bg-gradient-to-r from-[#7bb0ff] to-[#a77bff] p-px">
              <span className="flex items-center gap-1.5 rounded-full bg-background px-5 py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-background/90">
                View Resume
              </span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll down arrow */}
      <motion.a
        href="#experience"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 1.5 },
          y: { duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
        }}
        className="z-30 flex flex-col items-center gap-1 text-foreground/40 hover:text-foreground transition-colors pointer-events-auto translate-y-5"
        aria-label="Scroll to experience"
      >
        <span className="text-xs font-medium tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="h-6 w-6" />
      </motion.a>

      {/* Footer */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="flex items-center space-x-4"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
