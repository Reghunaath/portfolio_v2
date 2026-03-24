"use client";
import { motion } from "framer-motion";
import { PromptLine } from "@/components/ui/prompt-line";
import { education } from "@/data/education";

const fadeUp = {
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.35, ease: "easeOut" as const, delay: 0.1 },
};

export function EducationSection() {
  return (
    <section id="education" className="pt-16 md:pt-24">
      <PromptLine command="cat ~/.education" />

      <motion.div {...fadeUp} className="mt-4 flex flex-col gap-6 text-sm">
        {education.map((edu, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:gap-6 gap-1">
            {/* Year bracket */}
            <span className="text-xs text-[#8b949e] shrink-0 sm:pt-0.5 sm:w-24">
              [{edu.period}]
            </span>
            {/* Details */}
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-[#79c0ff] font-medium">{edu.institution}</span>
                <span className="text-[#8b949e] text-xs">· {edu.location}</span>
              </div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-[#c9d1d9]">{edu.degree}</span>
                <span className="text-[#e3b341] text-xs">GPA: {edu.gpa}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
