"use client";
import { FadeIn } from "@/components/ui/fade-in";
import { cn } from "@/lib/utils";

interface PromptLineProps {
  command: string;
  path?: string;
  className?: string;
  animate?: boolean;
}

export function PromptLine({
  command,
  path = "~",
  className,
  animate = true,
}: PromptLineProps) {
  const content = (
    <div className={cn("text-sm leading-relaxed select-none", className)}>
      <span className="text-t-dim">reghu@portfolio:</span>
      <span className="text-t-green crt-glow">{path}</span>
      <span className="text-t-dim">$ </span>
      <span className="text-t-blue crt-glow">{command}</span>
    </div>
  );

  if (!animate) return content;

  return <FadeIn>{content}</FadeIn>;
}
