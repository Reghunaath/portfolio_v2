"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { motion } from "framer-motion";
import { posthog } from "@/lib/posthog";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { personal, navSections } from "@/data/personal";

const ResumeModal = dynamic(
  () => import("@/components/ui/resume-modal").then((m) => m.ResumeModal),
  { ssr: false }
);

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut" as const, delay },
});

const Prompt = ({
  path = "~",
  command,
  delay,
}: {
  path?: string;
  command: string;
  delay: number;
}) => (
  <motion.div {...fadeUp(delay)} className="text-sm leading-relaxed">
    <span className="text-t-dim">reghu@portfolio:</span>
    <span className="text-t-green">{path}</span>
    <span className="text-t-dim">$ </span>
    <span className="text-t-blue">{command}</span>
  </motion.div>
);

export function HeroSection() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [visitorLocation, setVisitorLocation] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((r) => r.json())
      .then((d: { city?: string; country_name?: string }) => {
        if (d.city && d.country_name) setVisitorLocation(`${d.city}, ${d.country_name}`);
        else if (d.city) setVisitorLocation(d.city);
      })
      .catch(() => {});
  }, []);

  const navItems = navSections.map((s) => ({ label: `${s.label}/`, href: `#${s.id}` }));

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-2.5rem)] flex flex-col justify-start py-4"
    >
      {/* Last login line */}
      <motion.p {...fadeUp(0.1)} className="text-xs text-t-dim mb-1">
        Last login: {new Date().toDateString()}{visitorLocation && ` from ${visitorLocation}`}
      </motion.p>

      {/* GIF */}
      <motion.div {...fadeUp(0.25)} className="mb-4">
        <Image
          src="/Man_typing_with_202604020814.gif"
          alt="Man typing"
          width={400}
          height={225}
          unoptimized
          className="rounded-sm"
        />
      </motion.div>

      {/* $ whoami */}
      <div className="flex flex-col gap-1 mb-4">
        <Prompt command="whoami" delay={0.3} />
        <motion.div {...fadeUp(0.5)} className="mt-1 pl-0">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{
              background: "linear-gradient(to right, var(--t-purple), var(--t-purple2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {personal.name}
          </h1>
        </motion.div>
      </div>

      {/* $ cat role.txt */}
      <div className="flex flex-col gap-1 mb-4">
        <Prompt command="cat role.txt" delay={0.7} />
        <motion.div {...fadeUp(0.9)} className="mt-1 flex flex-col gap-1">
          <div className="flex flex-col gap-0.5">
            <p className="text-sm text-t-text leading-relaxed">{personal.intro}</p>
            <p className="text-sm text-t-text leading-relaxed">{personal.intro2}</p>
          </div>
          <div className="text-lg text-t-blue font-medium">
            <span className="text-t-green">&gt; </span>
            <TypewriterText
              text={personal.subtitle}
              loop
              speed={80}
              deleteSpeed={40}
              delay={2000}
              className="text-t-blue"
            />
          </div>
        </motion.div>
      </div>

      {/* $ ls */}
      <div className="flex flex-col gap-1 mb-6">
        <Prompt command="ls" delay={1.1} />
        <motion.div
          {...fadeUp(1.3)}
          className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-1"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs text-t-dim px-3 py-1 inline-block border border-t-border bg-t-button hover:bg-t-border hover:text-t-text transition-colors select-none"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => { posthog.capture("resume_opened"); setResumeOpen(true); }}
            className="text-xs text-t-dim px-3 py-1 border border-t-border bg-t-button hover:bg-t-border hover:text-t-text transition-colors select-none"
          >
            resume.pdf
          </button>
        </motion.div>
      </div>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
