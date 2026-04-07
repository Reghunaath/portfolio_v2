"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { posthog } from "@/lib/posthog";
import { PromptLine } from "@/components/ui/prompt-line";
import { BracketLink } from "@/components/ui/bracket-link";
import type { MediaModalProps } from "@/components/ui/media-modal";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { fadeUp } from "@/lib/animations";

const MediaModal = dynamic(
  () => import("@/components/ui/media-modal").then((m) => m.MediaModal),
  { ssr: false }
);

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
            className="border border-t-border bg-t-bg/80 hover:border-t-blue/50 transition-colors group flex flex-col"
          >
            {/* Card title bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-t-border bg-t-surface/60">
              <span className="text-t-dim text-xs">$</span>
              <span className="text-t-dim text-xs">
                cat {project.title.toLowerCase().replace(/\s+/g, "-")}/README.md
              </span>
            </div>

            {/* Card body */}
            <div className="px-4 py-4 flex flex-col gap-3 flex-1">
              {/* Title + Award */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-t-dim text-sm"># </span>
                  <span className="text-t-cyan font-bold text-base group-hover:text-[#a5d6ff] transition-colors">
                    {project.title}
                  </span>
                </div>
                {project.award && (
                  <span className="text-xs text-t-yellow whitespace-nowrap shrink-0">
                    {project.award}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-t-text leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 items-center mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-t-dim border border-t-border px-2 py-0.5"
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
                {project.live && (
                  <BracketLink href={project.live}>live demo</BracketLink>
                )}
                {project.demoVideo && (
                  <button
                    onClick={() => { posthog.capture("demo_video_opened", { project: project.title }); setModal({ type: "video", title: project.title, url: project.demoVideo!, onClose: () => setModal(null) }); }}
                    className="text-xs text-t-dim px-3 py-1 border border-t-border bg-t-button hover:bg-t-border hover:text-t-text transition-colors"
                  >
                    watch demo
                  </button>
                )}
                {project.images && project.images.length > 0 && (
                  <button
                    onClick={() => setModal({ type: "images", images: project.images!, title: project.title, startIdx: 0, onClose: () => setModal(null) })}
                    className="text-xs text-t-dim px-3 py-1 border border-t-border bg-t-button hover:bg-t-border hover:text-t-text transition-colors"
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
            className="border border-t-border bg-t-bg/80 hover:border-t-purple/50 transition-colors group flex flex-col"
          >
            {/* Card title bar */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-t-border bg-t-surface/60">
              <span className="text-t-dim text-xs">$</span>
              <span className="text-t-dim text-xs">cat research/{pub.key}.pdf</span>
            </div>

            {/* Card body */}
            <div className="px-4 py-4 flex flex-col gap-3 flex-1">
              {/* Title + citation badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-t-dim text-sm">@ </span>
                  <span className="text-t-purple font-bold text-base group-hover:text-[#c49bf7] transition-colors">
                    {pub.title}
                  </span>
                </div>
                <span className="text-xs text-t-yellow whitespace-nowrap shrink-0">
                  ★ {pub.citations} citations
                </span>
              </div>

              {/* Journal + year */}
              <p className="text-sm text-t-text leading-relaxed mt-auto">
                {pub.journal}, {pub.year}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 items-center">
                <span className="text-xs text-t-dim border border-t-border px-2 py-0.5">[research]</span>
                <span className="text-xs text-t-dim border border-t-border px-2 py-0.5">[deep learning]</span>
                <span className="text-xs text-t-dim border border-t-border px-2 py-0.5">[IoT]</span>
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
