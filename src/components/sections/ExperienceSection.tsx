"use client";
import { motion } from "framer-motion";
import { PromptLine } from "@/components/ui/prompt-line";
import { experience } from "@/data/experience";
import { computeDuration } from "@/lib/duration";
import { fadeUp } from "@/lib/animations";

export function ExperienceSection() {
  return (
    <section id="experience" className="pt-16 md:pt-24">
      <PromptLine command="history --jobs" />

      <div className="mt-6 ml-1 flex flex-col max-w-5xl">
        {experience.map((exp, i) => (
          <motion.div key={i} {...fadeUp(0.05 * i)} className="relative">
            {/* Spine */}
            <div
              className="absolute left-[3px] w-px bg-t-border"
              style={{
                top: i === 0 ? "10px" : "0",
                bottom: i === experience.length - 1 ? "calc(100% - 10px)" : "0",
              }}
            />

            {/* Dot */}
            <div className="absolute left-0 top-[10px] w-[7px] h-[7px] rounded-full bg-t-blue z-10" />

            {/* Header row */}
            <div className="pl-5 pr-3 py-2.5 flex items-center gap-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-t-cyan font-medium text-sm whitespace-nowrap">
                  {exp.company}
                </span>
                <span className="text-t-dim text-sm">—</span>
                <span className="text-t-text text-sm truncate">{exp.role}</span>
              </div>
              <span className="text-t-dim text-xs hidden md:inline shrink-0">
                {exp.period} · {computeDuration(exp.period)}
              </span>
            </div>

            {/* Detail card */}
            <div className="ml-5 mb-4 bg-t-surface border border-t-border rounded px-4 py-3">
              <div className="text-t-dim text-xs mb-2">
                {exp.location} · {exp.period} · {computeDuration(exp.period)}
              </div>
              <div className="border-t border-t-border mb-3" />
              <ul className="flex flex-col gap-1.5">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 text-sm leading-relaxed">
                    <span className="text-t-green shrink-0 mt-px">&gt;</span>
                    <span className="text-t-text">{bullet}</span>
                  </li>
                ))}
              </ul>

              {exp.tech && exp.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-t-border">
                  {exp.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-t-dim border border-t-border px-2 py-0.5"
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
