"use client";
import { motion } from "framer-motion";
import { PromptLine } from "@/components/ui/prompt-line";
import { experience } from "@/data/experience";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.35, ease: "easeOut" as const, delay },
});

export function ExperienceSection() {
  return (
    <section id="experience" className="pt-16 md:pt-24">
      {/* Summary table */}
      <PromptLine command="history --jobs" />

      <motion.div {...fadeUp(0.1)} className="mt-3 mb-10 text-sm">
        {/* Desktop table */}
        <div className="hidden md:block">
          <div className="text-[#8b949e] text-xs flex gap-3 mb-1">
            <span className="w-6 shrink-0">#</span>
            <span className="w-52 shrink-0">COMPANY</span>
            <span className="w-60 shrink-0">ROLE</span>
            <span className="w-44 shrink-0">PERIOD</span>
          </div>
          <div className="text-[#8b949e] text-xs flex gap-3 mb-2">
            <span className="w-6 shrink-0">{"─".repeat(2)}</span>
            <span className="w-52 shrink-0">{"─".repeat(22)}</span>
            <span className="w-60 shrink-0">{"─".repeat(26)}</span>
            <span className="w-44 shrink-0">{"─".repeat(18)}</span>
          </div>
          {experience.map((exp, i) => (
            <div key={i} className="flex gap-3 leading-relaxed">
              <span className="w-6 shrink-0 text-[#8b949e]">{i + 1}</span>
              <span className="w-52 shrink-0 text-[#79c0ff]">{exp.company}</span>
              <span className="w-60 shrink-0 text-[#c9d1d9]">{exp.role}</span>
              <span className="w-44 shrink-0 text-[#8b949e]">{exp.period}</span>
            </div>
          ))}
        </div>
        {/* Mobile stacked list */}
        <div className="md:hidden flex flex-col gap-3">
          {experience.map((exp, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <div className="flex gap-2 items-start">
                <span className="text-[#8b949e] text-xs shrink-0 mt-0.5">{i + 1}.</span>
                <div className="flex flex-col">
                  <span className="text-[#79c0ff]">{exp.company}</span>
                  <span className="text-[#c9d1d9] text-xs">{exp.role}</span>
                </div>
              </div>
              <span className="text-[#8b949e] text-xs pl-4">{exp.period}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Individual job detail blocks */}
      {experience.map((exp, i) => {
        const role = exp.role.toLowerCase();
        const companySuffix = role.includes("apprentice") ? "-apprentice"
          : role.includes("associate") ? "-associate"
          : "";
        const slug = `${exp.company.toLowerCase().replace(/\s+/g, "-")}${companySuffix}`;
        return (
          <div key={i} className="mb-10">
            <PromptLine command={`cat jobs/${i + 1}-${slug}.txt`} />
            <motion.div {...fadeUp(0.1)} className="mt-3 flex flex-col gap-2 text-sm">
              {/* Job header */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-sm">
                <span className="text-[#79c0ff] font-medium">[{exp.company}]</span>
                <span className="text-[#c9d1d9]">{exp.role}</span>
                <span className="text-[#8b949e]">·</span>
                <span className="text-[#8b949e]">{exp.location}</span>
                <span className="text-[#8b949e]">·</span>
                <span className="text-[#8b949e]">{exp.period}</span>
              </div>
              {/* Separator */}
              <div className="text-[#30363d] text-xs">{"─".repeat(60)}</div>
              {/* Bullets */}
              <ul className="flex flex-col gap-1.5">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 leading-relaxed">
                    <span className="text-[#3fb950] shrink-0">&gt;</span>
                    <span className="text-[#c9d1d9]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
