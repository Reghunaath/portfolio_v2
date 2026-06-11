"use client";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

interface PortfolioCardProps {
  command: string;
  titlePrefix: string;
  title: string;
  variant: "project" | "publication";
  badge?: string;
  body: React.ReactNode;
  tags: string[];
  links: React.ReactNode;
  delay?: number;
}

export function PortfolioCard({
  command,
  titlePrefix,
  title,
  variant,
  badge,
  body,
  tags,
  links,
  delay = 0,
}: PortfolioCardProps) {
  const isPublication = variant === "publication";

  return (
    <FadeIn
      delay={delay}
      className={cn(
        "border border-t-border bg-t-bg/80 transition-colors group flex flex-col",
        isPublication ? "hover:border-t-purple/50" : "hover:border-t-blue/50"
      )}
    >
      <div className="flex items-center gap-2 px-4 py-2 border-b border-t-border bg-t-surface/60">
        <span className="text-t-dim text-xs">$</span>
        <span className="text-t-dim text-xs">{command}</span>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
          <div>
            <span className="text-t-dim text-sm">{titlePrefix} </span>
            <span
              className={cn(
                "font-bold text-base transition-colors crt-glow",
                isPublication
                  ? "text-t-purple group-hover:text-[#c49bf7]"
                  : "text-t-cyan group-hover:text-[#a5d6ff]"
              )}
            >
              {title}
            </span>
          </div>
          {badge && (
            <span className="text-xs text-t-yellow sm:whitespace-nowrap sm:shrink-0">
              {badge}
            </span>
          )}
        </div>

        {body}

        <div className="flex flex-wrap gap-1.5 items-center mt-auto">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-t-dim border border-t-border px-2 py-0.5"
            >
              [{tag}]
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 pt-1">{links}</div>
      </div>
    </FadeIn>
  );
}
