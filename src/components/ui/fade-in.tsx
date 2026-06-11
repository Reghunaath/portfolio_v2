"use client";
import { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Direction-aware fade-in:
 * - Scrolling DOWN into view → gentle fade 0 → 1.
 * - Scrolling UP into view → appears instantly, no effect.
 * - Re-arms when fully off-screen, so each downward entry fades again.
 */
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  // Trigger zone excludes the bottom 140px of the viewport, so the fade
  // fires where the eye actually is — not at the screen edge.
  const inTriggerZone = useInView(ref, { margin: "0px 0px -140px 0px" });
  // Plain viewport check, used to re-arm the effect once fully off-screen.
  const inViewport = useInView(ref);

  useEffect(() => {
    if (!inTriggerZone) return;
    const top = ref.current?.getBoundingClientRect().top ?? 0;
    if (top > window.innerHeight / 2) {
      // Entered from below → scrolling down → gentle fade in.
      controls.start({
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut", delay },
      });
    } else {
      // Entered from above (scrolling up) or already on screen at load:
      // appear instantly, no effect.
      controls.set({ opacity: 1 });
    }
  }, [inTriggerZone, controls, delay]);

  useEffect(() => {
    if (inViewport) return;
    // Fully off-screen → reset so the next scroll-down entry fades in again.
    controls.set({ opacity: 0 });
  }, [inViewport, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
