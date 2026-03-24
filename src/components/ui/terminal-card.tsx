"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TerminalCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export function TerminalCard({
  children,
  className,
  animate = true,
  delay = 0,
}: TerminalCardProps) {
  const content = (
    <div
      className={cn(
        "bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-sm",
        className
      )}
    >
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: "easeOut" as const, delay }}
    >
      {content}
    </motion.div>
  );
}
