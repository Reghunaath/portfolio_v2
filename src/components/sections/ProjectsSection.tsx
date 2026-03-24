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
      <span className="text-sm text-[#8b949e] opacity-50">[ {children} ]</span>
    );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm border border-[#30363d] px-3 py-1 text-[#58a6ff] hover:bg-[#161b22] hover:text-[#79c0ff] transition-colors inline-block"
    >
      [ {children} ↗ ]
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

      {/* Individual project cat blocks */}
      {projects.map((project, i) => (
        <div key={project.title} className="mb-10">
          <PromptLine
            command={`cat ${project.title.toLowerCase().replace(/\s+/g, "-")}/README.md`}
            path="~/projects"
          />
          <motion.div {...fadeUp(0.1)} className="mt-3 pl-0 flex flex-col gap-3">
            {/* Title */}
            <div>
              <span className="text-[#8b949e] text-sm"># </span>
              <span className="text-[#79c0ff] font-bold text-base">{project.title}</span>
            </div>

            {/* Award */}
            {project.award && (
              <p className="text-sm text-[#e3b341]">award: {project.award}</p>
            )}

            {/* Description */}
            <p className="text-sm text-[#c9d1d9] leading-relaxed max-w-2xl">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-sm text-[#8b949e]">stack:</span>
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
            <div className="flex flex-wrap gap-3">
              <BracketLink href={project.demo}>view demo</BracketLink>
              <BracketLink href={project.github}>github</BracketLink>
            </div>
          </motion.div>
        </div>
      ))}

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
