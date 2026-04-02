"use client";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Phone } from "lucide-react";
import { PromptLine } from "@/components/ui/prompt-line";
import { personal } from "@/data/personal";
import { fadeUp } from "@/lib/animations";

const linkedinDisplay = personal.linkedin.replace("https://www.", "").replace("https://", "");
const githubDisplay = personal.github
  ? personal.github.replace("https://github.com/", "github.com/")
  : "github.com/[TBD]";

const linkClass =
  "text-t-blue hover:text-t-cyan hover:underline underline-offset-4 transition-colors";

export function ContactSection() {
  return (
    <section id="contact" className="pt-16 md:pt-24 pb-12">
      <PromptLine command="cat contact.json" />

      <motion.div
        {...fadeUp(0.1)}
        className="mt-4 max-w-lg border border-t-border bg-t-bg/80 rounded overflow-hidden"
      >
        {/* Title bar */}
        <div className="px-4 py-2 bg-t-surface/60 border-b border-t-border">
          <span className="text-t-dim text-xs">contact.json</span>
        </div>

        {/* Body */}
        <div className="px-5 py-4">
          <div className="text-t-cyan font-bold text-base">{personal.name}</div>
          <div className="text-t-dim text-xs mt-0.5">
            Full-Stack Engineer · {personal.location}
          </div>

          <div className="border-t border-t-border my-3" />

          <div className="flex flex-col gap-2.5 text-sm">
            <a href={`mailto:${personal.email}`} className={`flex items-center gap-3 ${linkClass}`}>
              <Mail size={14} className="text-t-dim shrink-0" />
              {personal.email}
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 ${linkClass}`}>
              <Linkedin size={14} className="text-t-dim shrink-0" />
              {linkedinDisplay}
            </a>
            {personal.github ? (
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-3 ${linkClass}`}>
                <Github size={14} className="text-t-dim shrink-0" />
                {githubDisplay}
              </a>
            ) : (
              <div className="flex items-center gap-3 text-t-dim">
                <Github size={14} className="shrink-0" />
                {githubDisplay}
              </div>
            )}
            <div className="flex items-center gap-3 text-t-text">
              <Phone size={14} className="text-t-dim shrink-0" />
              {personal.phone}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
