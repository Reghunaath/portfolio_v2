import { cn } from "@/lib/utils";

interface PromptLineProps {
  command: string;
  path?: string;
  className?: string;
}

export function PromptLine({ command, path = "~", className }: PromptLineProps) {
  return (
    <div className={cn("text-sm leading-relaxed select-none", className)}>
      <span className="text-t-dim">reghu@portfolio:</span>
      <span className="text-t-green crt-glow">{path}</span>
      <span className="text-t-dim">$ </span>
      <span className="text-t-blue crt-glow">{command}</span>
    </div>
  );
}
