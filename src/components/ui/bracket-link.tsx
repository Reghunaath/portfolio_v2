import type { ReactNode } from "react";

export function BracketLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (!href)
    return (
      <span className="text-xs text-t-dim opacity-40 px-3 py-1 inline-block select-none border border-t-border bg-t-button">
        {children}
      </span>
    );
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-t-dim px-3 py-1 inline-block border border-t-border bg-t-button hover:bg-t-border hover:text-t-text transition-colors select-none"
    >
      {children}
    </a>
  );
}
