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
        "bg-[#161b22] border-b border-[#30363d]",
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
        <span className="text-xs text-[#8b949e] hidden sm:block">
          reghu@portfolio — bash
        </span>
      </div>

      {/* Right: nav links */}
      <nav className="hidden md:flex items-center gap-5">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-xs text-[#8b949e] hover:text-[#c9d1d9] transition-colors tracking-wider"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Mobile: hamburger */}
      <button className="flex flex-col gap-1 md:hidden" aria-label="Menu">
        <span className="block h-0.5 w-5 bg-[#8b949e]" />
        <span className="block h-0.5 w-5 bg-[#8b949e]" />
        <span className="block h-0.5 w-3.5 bg-[#8b949e]" />
      </button>
    </header>
  );
}
