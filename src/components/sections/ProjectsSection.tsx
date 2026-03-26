"use client";
import { motion } from "framer-motion";
import { PromptLine } from "@/components/ui/prompt-line";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.35, ease: "easeOut" as const, delay },
});

function BracketLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  if (!href)
    return (
      <span className="text-xs text-[#8b949e] opacity-40 px-3 py-1 inline-block select-none border border-[#30363d] bg-[#21262d]">
        {children}
      </span>
    );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-[#8b949e] px-3 py-1 inline-block border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] hover:text-[#c9d1d9] transition-colors select-none"
    >
      {children}
    </a>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="pt-16 md:pt-24">
      {/* ls -la */}
      <PromptLine command="ls -la projects/" />

      <motion.div {...fadeUp(0.1)} className="mt-3 mb-10 text-sm">
        {/* Table header */}
        <div className="text-[#8b949e] flex gap-4 mb-1 text-xs">
          <span className="w-44 shrink-0">NAME</span>
          <span className="w-56 shrink-0">STACK</span>
          <span className="w-48 shrink-0 hidden sm:block">AWARD</span>
        </div>
        <div className="text-[#8b949e] flex gap-4 mb-2 text-xs">
          <span className="w-44 shrink-0">{"─".repeat(18)}</span>
          <span className="w-56 shrink-0">{"─".repeat(28)}</span>
          <span className="w-48 shrink-0 hidden sm:block">{"─".repeat(22)}</span>
        </div>
        {projects.map((p) => (
          <div key={p.title} className="flex gap-4 items-baseline">
            <span className="w-44 shrink-0 text-[#58a6ff]">{p.title}/</span>
            <span className="w-56 shrink-0 text-[#8b949e]">{p.tags.slice(0, 3).join(" · ")}</span>
            {p.award && (
              <span className="w-48 shrink-0 text-[#e3b341] hidden sm:block whitespace-nowrap">{p.award}</span>
            )}
          </div>
        ))}
      </motion.div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            {...fadeUp(0.1 + i * 0.08)}
            className="border border-[#30363d] bg-[#0d1117]/80 hover:border-[#58a6ff]/50 transition-colors group flex flex-col"
          >
            {/* Card title bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#30363d] bg-[#161b22]/60">
              <span className="text-[#8b949e] text-xs">$</span>
              <span className="text-[#8b949e] text-xs">
                cat {project.title.toLowerCase().replace(/\s+/g, "-")}/README.md
              </span>
            </div>

            {/* Card body */}
            <div className="px-4 py-4 flex flex-col gap-3 flex-1">
              {/* Title + Award */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[#8b949e] text-sm"># </span>
                  <span className="text-[#79c0ff] font-bold text-base group-hover:text-[#a5d6ff] transition-colors">
                    {project.title}
                  </span>
                </div>
                {project.award && (
                  <span className="text-xs text-[#e3b341] whitespace-nowrap shrink-0">
                    {project.award}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-[#c9d1d9] leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 items-center mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#8b949e] border border-[#30363d] px-2 py-0.5"
                  >
                    [{tag}]
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 pt-1">
                <BracketLink href={project.demo}>view demo</BracketLink>
                <BracketLink href={project.github}>github</BracketLink>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Publications */}
      <PromptLine command="cat research/publications.bib" path="~/projects" />
      <motion.div {...fadeUp(0.1)} className="mt-3 flex flex-col gap-4">
        {publications.map((pub) => (
          <div key={pub.key} className="flex flex-col gap-1 text-sm pl-2 border-l border-[#30363d]">
            <div>
              <span className="text-[#8b949e]">@article&#123;</span>
              <span className="text-[#79c0ff]">{pub.key}</span>
              <span className="text-[#8b949e]">,</span>
            </div>
            <div className="pl-4 flex gap-2">
              <span className="text-[#8b949e] w-16 shrink-0">title</span>
              <span className="text-[#8b949e]">= </span>
              <span className="text-[#c9d1d9]">&quot;{pub.title}&quot;,</span>
            </div>
            <div className="pl-4 flex gap-2">
              <span className="text-[#8b949e] w-16 shrink-0">journal</span>
              <span className="text-[#8b949e]">= </span>
              <span className="text-[#c9d1d9]">&quot;{pub.journal}&quot;,</span>
            </div>
            <div className="pl-4 flex gap-2">
              <span className="text-[#8b949e] w-16 shrink-0">year</span>
              <span className="text-[#8b949e]">= </span>
              <span className="text-[#c9d1d9]">{pub.year},</span>
            </div>
            <div className="pl-4 flex gap-2">
              <span className="text-[#8b949e] w-16 shrink-0">cited</span>
              <span className="text-[#8b949e]">= </span>
              <span className="text-[#e3b341]">{pub.citations}</span>
            </div>
            <div>
              <span className="text-[#8b949e]">&#125;</span>
            </div>
            <div className="mt-2">
              <BracketLink href={pub.url}>read paper</BracketLink>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
