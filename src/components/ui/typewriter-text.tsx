"use client";
import { useEffect, useState } from "react";

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  loop?: boolean;
  cursor?: boolean;
  className?: string;
}

export function TypewriterText({
  text,
  speed = 80,
  deleteSpeed = 40,
  delay = 2000,
  loop = true,
  cursor = true,
  className,
}: TypewriterProps) {
  const texts = Array.isArray(text) ? text : [text];
  const [displayed, setDisplayed] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1));
        } else if (loop) {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((i) => (i + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, textIndex, texts, speed, deleteSpeed, delay, loop]);

  return (
    <span className={className}>
      {displayed}
      {cursor && <span className="animate-blink">▋</span>}
    </span>
  );
}
