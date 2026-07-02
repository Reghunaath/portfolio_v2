"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { posthog } from "@/lib/posthog";
import { PromptLine } from "@/components/ui/prompt-line";
import { BracketLink } from "@/components/ui/bracket-link";
import { PortfolioCard } from "@/components/ui/portfolio-card";
import type { MediaModalProps } from "@/components/ui/media-modal";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";

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

      <PromptLine command="ls -la projects/" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mb-10">
        {projects.map((project) => (
          <PortfolioCard
            key={project.title}
            variant="project"
            command={`cat ${project.title.toLowerCase().replace(/\s+/g, "-")}/README.md`}
            titlePrefix="#"
            title={project.title}
            badge={project.award}
            body={
              <p className="text-sm text-t-text leading-relaxed">
                {project.description}
              </p>
            }
            tags={project.tags}
            links={
              <>
                {project.githubBackend || project.githubFrontend ? (
                  <>
                    {project.githubBackend && (
                      <BracketLink href={project.githubBackend}>github/backend</BracketLink>
                    )}
                    {project.githubFrontend && (
                      <BracketLink href={project.githubFrontend}>github/frontend</BracketLink>
                    )}
                  </>
                ) : (
                  <BracketLink href={project.github}>github</BracketLink>
                )}
                {project.live && (
                  <BracketLink href={project.live}>live demo</BracketLink>
                )}
                {project.demoVideo && (
                  <button
                    onClick={() => {
                      posthog.capture("demo_video_opened", { project: project.title });
                      setModal({ type: "video", title: project.title, url: project.demoVideo!, onClose: () => setModal(null) });
                    }}
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
              </>
            }
          />
        ))}

        {publications.map((pub) => (
          <PortfolioCard
            key={pub.key}
            variant="publication"
            command={`cat research/${pub.key}.pdf`}
            titlePrefix="@"
            title={pub.title}
            badge={`★ ${pub.citations} citations`}
            body={
              <>
                <p className="text-sm text-t-text leading-relaxed">{pub.description}</p>
                <p className="text-sm text-t-dim">{pub.journal}, {pub.year}</p>
              </>
            }
            tags={["research", "deep learning", "IoT"]}
            links={
              <>
                <BracketLink href={pub.url}>read paper</BracketLink>
                {pub.scholarUrl && (
                  <BracketLink href={pub.scholarUrl}>google scholar</BracketLink>
                )}
              </>
            }
          />
        ))}
      </div>
    </section>
  );
}
