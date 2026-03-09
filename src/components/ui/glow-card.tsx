"use client";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", String(e.clientX));
    el.style.setProperty("--y", String(e.clientY));
    el.style.setProperty("--xp", String((e.clientX - rect.left) / rect.width));
    el.style.setProperty("--yp", String((e.clientY - rect.top) / rect.height));
    el.style.setProperty("--bg-spot-opacity", "0.07");
    el.style.setProperty("--border-spot-opacity", "0.9");
    el.style.setProperty("--border-light-opacity", "0.4");
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--bg-spot-opacity", "0");
    el.style.setProperty("--border-spot-opacity", "0");
    el.style.setProperty("--border-light-opacity", "0");
  };

  return (
    <div
      ref={ref}
      data-glow
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("glow-card-base p-5", className)}
      style={
        {
          "--glow-b": "1",
          "--glow-r": "12",
          "--glow-size": "300",
          "--glow-base": "220",
          "--glow-spread": "60",
          "--glow-sat": "70",
          "--glow-lit": "55",
          "--bg-spot-opacity": "0",
          "--border-spot-opacity": "0",
          "--border-light-opacity": "0",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
