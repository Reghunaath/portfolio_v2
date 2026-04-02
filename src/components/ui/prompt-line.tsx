"use client";
import { motion } from "framer-motion";
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
      <span className="text-t-green">{path}</span>
      <span className="text-t-dim">$ </span>
      <span className="text-t-blue">{command}</span>
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: "easeOut" as const }}
    >
      {content}
    </motion.div>
  );
}
