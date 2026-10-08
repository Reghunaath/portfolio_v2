"use client";
import { useState } from "react";
import { Mail, Linkedin, Github, Copy, Check } from "lucide-react";
import { PromptLine } from "@/components/ui/prompt-line";
import { personal } from "@/data/personal";

const linkedinDisplay = personal.linkedin.replace("https://www.", "").replace("https://", "");
const githubDisplay = personal.github
  ? personal.github.replace("https://github.com/", "github.com/")
  : "github.com/[TBD]";

const linkClass =
  "text-t-blue hover:text-t-cyan hover:underline underline-offset-4 transition-colors";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-auto pl-2 text-t-dim hover:text-t-cyan transition-colors shrink-0"
      title="Copy to clipboard"
    >
      {copied ? <Check size={12} className="text-t-green" /> : <Copy size={12} />}
    </button>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="pt-16 md:pt-24 pb-12">
      <PromptLine command="cat contact.json" />

      <div className="mt-4 max-w-lg border border-t-border bg-t-bg/80 rounded overflow-hidden">
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
            <div className="flex items-center gap-3">
              <a href={`mailto:${personal.email}`} className={`flex items-center gap-3 ${linkClass}`}>
                <Mail size={14} className="text-t-dim shrink-0" />
                {personal.email}
              </a>
              <CopyButton text={personal.email} />
            </div>
            <div className="flex items-center gap-3">
              <a href={`mailto:${personal.personalEmail}`} className={`flex items-center gap-3 ${linkClass}`}>
                <Mail size={14} className="text-t-dim shrink-0" />
                {personal.personalEmail}
              </a>
              <CopyButton text={personal.personalEmail!} />
            </div>
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
          </div>
        </div>
      </div>
    </section>
  );
}
