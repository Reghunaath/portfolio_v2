"use client";
import { motion } from "framer-motion";
import { PromptLine } from "@/components/ui/prompt-line";
import { education } from "@/data/education";
import { computeDuration } from "@/lib/duration";
import { fadeUp } from "@/lib/animations";

export function EducationSection() {
  return (
    <section id="education" className="pt-16 md:pt-24">
      <PromptLine command="cat ~/.education" />

      <div className="mt-6 ml-1 flex flex-col max-w-3xl">
        {education.map((edu, i) => (
          <motion.div key={i} {...fadeUp(0.05 * i)}>
            <div className="my-1.5 border-t-2 border-t-t-purple bg-t-surface/60 border-x border-b border-t-border rounded-b px-4 py-4">
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <span className="text-t-cyan font-medium text-sm">{edu.institution}</span>
                <span className="text-t-yellow text-xs shrink-0">GPA: {edu.gpa}</span>
              </div>
              <div className="flex items-baseline justify-between gap-2 flex-wrap mt-0.5">
                <span className="text-t-text text-sm">{edu.degree}</span>
                <span className="text-t-dim text-xs shrink-0">
                  {edu.location} · {edu.period} · {computeDuration(edu.period)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
