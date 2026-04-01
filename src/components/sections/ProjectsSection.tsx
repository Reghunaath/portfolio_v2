"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PromptLine } from "@/components/ui/prompt-line";
import { MediaModal, MediaModalProps } from "@/components/ui/media-modal";
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
  const [modal, setModal] = useState<MediaModalProps | null>(null);

  return (
    <section id="projects" className="pt-16 md:pt-24">
      <AnimatePresence>
        {modal && <MediaModal {...modal} onClose={() => setModal(null)} />}
      </AnimatePresence>
      {/* ls -la */}
      <PromptLine command="ls -la projects/" />

      {/* Project + Publication cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-10">
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
                {project.githubBackend || project.githubFrontend ? (
                  <>
                    {project.githubBackend && <BracketLink href={project.githubBackend}>github/backend</BracketLink>}
                    {project.githubFrontend && <BracketLink href={project.githubFrontend}>github/frontend</BracketLink>}
                  </>
                ) : (
                  <BracketLink href={project.github}>github</BracketLink>
                )}
                {project.demoVideo && (
                  <button
                    onClick={() => setModal({ type: "video", title: project.title, url: project.demoVideo!, onClose: () => setModal(null) })}
                    className="text-xs text-[#8b949e] px-3 py-1 border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] hover:text-[#c9d1d9] transition-colors"
                  >
                    watch demo
                  </button>
                )}
                {project.images && project.images.length > 0 && (
                  <button
                    onClick={() => setModal({ type: "images", images: project.images!, title: project.title, startIdx: 0, onClose: () => setModal(null) })}
                    className="text-xs text-[#8b949e] px-3 py-1 border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] hover:text-[#c9d1d9] transition-colors"
                  >
                    images [{project.images.length}]
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {publications.map((pub, i) => (
          <motion.div
            key={pub.key}
            {...fadeUp(0.1 + (projects.length + i) * 0.08)}
            className="border border-[#30363d] bg-[#0d1117]/80 hover:border-[#a371f7]/50 transition-colors group flex flex-col"
          >
            {/* Card title bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#30363d] bg-[#161b22]/60">
              <span className="text-[#8b949e] text-xs">$</span>
              <span className="text-[#8b949e] text-xs">cat research/{pub.key}.pdf</span>
            </div>

            {/* Card body */}
            <div className="px-4 py-4 flex flex-col gap-3 flex-1">
              {/* Title + citation badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[#8b949e] text-sm">@ </span>
                  <span className="text-[#a371f7] font-bold text-base group-hover:text-[#c49bf7] transition-colors">
                    {pub.title}
                  </span>
                </div>
                <span className="text-xs text-[#e3b341] whitespace-nowrap shrink-0">
                  ★ {pub.citations} citations
                </span>
              </div>

              {/* Journal + year */}
              <p className="text-sm text-[#c9d1d9] leading-relaxed mt-auto">
                {pub.journal}, {pub.year}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-xs text-[#8b949e] border border-[#30363d] px-2 py-0.5">[research]</span>
                <span className="text-xs text-[#8b949e] border border-[#30363d] px-2 py-0.5">[deep learning]</span>
                <span className="text-xs text-[#8b949e] border border-[#30363d] px-2 py-0.5">[IoT]</span>
              </div>

              {/* Link */}
              <div className="flex flex-wrap gap-3 pt-1">
                <BracketLink href={pub.url}>read paper</BracketLink>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
