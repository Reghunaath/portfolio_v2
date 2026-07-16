"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { posthog } from "@/lib/posthog";

// Invites the visitor to try the gamified portfolio. Shown on every visit,
// once the hero animation has had a moment to settle. Dismissal (either button,
// Esc, or backdrop) only closes it for the current page load.
export function GamePromptModal() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const dismiss = useCallback(() => {
    setOpen(false);
    posthog.capture("game_invite_dismissed");
  }, []);

  useEffect(() => {
    // Let the hero animation settle before inviting them away from it.
    const t = setTimeout(() => {
      setOpen(true);
      posthog.capture("game_invite_shown");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  // Lock body scroll + wire Esc-to-dismiss while the popup is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, dismiss]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-labelledby="game-invite-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex w-full max-w-md flex-col overflow-hidden border border-t-border bg-t-bg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 border-b border-t-border bg-t-surface px-3 py-3 md:py-2">
              <div className="group flex items-center gap-2 md:gap-1.5">
                <button
                  onClick={dismiss}
                  className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-t-red transition-all md:h-3 md:w-3"
                  aria-label="Close"
                >
                  <span className="text-[8px] font-black leading-none text-black opacity-0 transition-opacity group-hover:opacity-100">
                    ✕
                  </span>
                </button>
                <span
                  className="h-5 w-5 rounded-full bg-t-yellow md:h-3 md:w-3"
                  aria-hidden="true"
                />
                <span
                  className="h-5 w-5 rounded-full bg-t-green md:h-3 md:w-3"
                  aria-hidden="true"
                />
              </div>
              <span className="ml-1 flex-1 truncate text-xs text-t-dim">
                $ cat whats-new.txt
              </span>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-3 px-5 py-5">
              <h2
                id="game-invite-title"
                className="text-base font-bold text-t-green crt-glow"
              >
                <span aria-hidden="true">🕹️ </span>I built a playable version of
                this portfolio
              </h2>
              <p className="text-sm leading-relaxed text-t-text">
                I recently developed a gamified version of my portfolio, a
                little pixel world you can actually walk around in. I&apos;ve
                put a lot of effort into it, and I&apos;d genuinely love for you
                to check it out.
              </p>

              <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
                <button
                  onClick={dismiss}
                  className="select-none border border-t-border bg-t-button px-4 py-2 text-xs text-t-dim transition-colors hover:bg-t-border hover:text-t-text"
                >
                  Stay on the classic site
                </button>
                {/* /game is a static standalone app (redirect -> /game/index.html
                    in next.config.ts), not a Next page — a full navigation via a
                    plain anchor is intended, not a client-side route transition. */}
                <motion.a
                  href="/game"
                  onClick={() => posthog.capture("game_invite_accepted")}
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          boxShadow: [
                            "0 0 0px rgba(63,185,80,0)",
                            "0 0 20px rgba(63,185,80,0.6)",
                            "0 0 0px rgba(63,185,80,0)",
                          ],
                        }
                  }
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex select-none items-center justify-center gap-2 border border-t-green bg-t-green px-4 py-2 text-xs font-bold text-black transition-colors hover:brightness-110"
                >
                  <span aria-hidden="true">🎮</span>
                  <span>Play the gamified portfolio</span>
                  <span aria-hidden="true">→</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
