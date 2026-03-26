"use client";
import { motion } from "framer-motion";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { personal } from "@/data/personal";

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
    <span className="text-[#8b949e]">reghu@portfolio:</span>
    <span className="text-[#3fb950]">{path}</span>
    <span className="text-[#8b949e]">$ </span>
    <span className="text-[#58a6ff]">{command}</span>
  </motion.div>
);

export function HeroSection({ asciiHtml }: { asciiHtml: string }) {
  const navItems = [
    { label: "projects/", href: "#projects" },
    { label: "experience/", href: "#experience" },
    { label: "education/", href: "#education" },
    { label: "contact/", href: "#contact" },
    { label: "resume.pdf", href: personal.resumePath },
  ];

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-2.5rem)] flex flex-col justify-start py-4"
    >
      {/* Last login line */}
      <motion.p {...fadeUp(0.1)} className="text-xs text-[#8b949e] mb-1">
        Last login: Mon Mar 23 2026 from {personal.location}
      </motion.p>

      {/* ASCII art */}
      <motion.div
        {...fadeUp(0.15)}
        className="mb-3 overflow-hidden"
        style={{ width: "250px", height: "255px" }}
      >
        <div
          className="ascii-art"
          dangerouslySetInnerHTML={{ __html: asciiHtml }}
          style={{
            fontSize: "3.5px",
            lineHeight: 1.1,
            letterSpacing: 0,
            fontFamily: "monospace",
            fontWeight: "bold",
            marginTop: "-105px",
            marginLeft: "-195px",
          }}
        />
      </motion.div>

      {/* $ whoami */}
      <div className="flex flex-col gap-1 mb-4">
        <Prompt command="whoami" delay={0.3} />
        <motion.div {...fadeUp(0.5)} className="mt-1 pl-0">
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
            style={{
              background: "linear-gradient(to right, #a371f7, #6ea6fa)",
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
            <p className="text-sm text-[#c9d1d9] leading-relaxed">{personal.intro}</p>
            <p className="text-sm text-[#c9d1d9] leading-relaxed">{personal.intro2}</p>
          </div>
          <div className="text-lg text-[#58a6ff] font-medium">
            <span className="text-[#3fb950]">&gt; </span>
            <TypewriterText
              text={personal.subtitle}
              loop
              speed={80}
              deleteSpeed={40}
              delay={2000}
              className="text-[#58a6ff]"
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
              className="text-xs text-[#8b949e] px-3 py-1 inline-block border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] hover:text-[#c9d1d9] transition-colors select-none"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
