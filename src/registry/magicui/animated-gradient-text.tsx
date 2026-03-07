"use client";

import { cn } from "@/lib/utils";
import type * as React from "react";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function AnimatedGradientText({
  children,
  className,
  speed = 2,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
}: AnimatedGradientTextProps) {
  return (
    <span
      style={
        {
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--speed": `${speed}s`,
        } as React.CSSProperties
      }
      className={cn(
        "animate-gradient bg-[linear-gradient(90deg,var(--color-from),var(--color-to),var(--color-from))] bg-[length:200%_auto] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
