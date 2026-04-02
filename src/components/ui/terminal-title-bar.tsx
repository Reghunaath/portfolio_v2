"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface TerminalTitleBarProps {
  navLinks: { label: string; href: string }[];
  className?: string;
}

export function TerminalTitleBar({ navLinks, className }: TerminalTitleBarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 h-10 flex items-center justify-between px-4",
        "bg-t-surface border-b border-t-border",
        className
      )}
    >
      {/* Left: traffic-light dots + path */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-t-dim hidden sm:block">
          reghu@portfolio — bash
        </span>
      </div>

      {/* Right: nav links */}
      <nav className="hidden md:flex items-center gap-5">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs text-t-dim hover:text-t-text transition-colors tracking-wider"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
