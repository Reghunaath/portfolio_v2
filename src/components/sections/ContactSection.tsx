"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PromptLine } from "@/components/ui/prompt-line";
import { personal } from "@/data/personal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.35, ease: "easeOut" as const, delay },
});

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-4 text-sm leading-relaxed">
      <span className="text-[#8b949e] w-16 shrink-0">{label}</span>
      {href ? (
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-[#58a6ff] hover:text-[#79c0ff] hover:underline underline-offset-4 transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="text-[#c9d1d9]">{value}</span>
      )}
    </div>
  );
}

function ViewCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.counterapi.dev/v1/reghu-portfolio/visits/up")
      .then((r) => r.json())
      .then((d) => setCount(d?.count ?? null))
      .catch(() => setCount(null));
  }, []);

  return (
    <span className="text-[#c9d1d9]">
      This terminal has been visited{" "}
      {count !== null ? (
        <span className="text-[#e3b341]">{count.toLocaleString()}</span>
      ) : (
        <span className="text-[#8b949e]">...</span>
      )}{" "}
      times.
    </span>
  );
}

export function ContactSection() {
  const linkedinDisplay = personal.linkedin.replace("https://www.", "").replace("https://", "");
  const githubDisplay = personal.github
    ? personal.github.replace("https://github.com/", "github.com/")
    : "github.com/[TBD]";

  return (
    <section id="contact" className="pt-16 md:pt-24 pb-12">
      {/* Session separator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-xs text-[#30363d] mb-10 select-none"
      >
        {"# ── end of records " + "─".repeat(48)}
      </motion.div>

      {/* cat contact.txt */}
      <PromptLine command="cat contact.txt" />
      <motion.div {...fadeUp(0.1)} className="mt-3 flex flex-col gap-1 mb-10">
        <ContactRow label="email" value={personal.email} href={`mailto:${personal.email}`} />
        <ContactRow label="linkedin" value={linkedinDisplay} href={personal.linkedin} />
        <ContactRow label="github" value={githubDisplay} href={personal.github || undefined} />
        <ContactRow label="phone" value={personal.phone} />
        <ContactRow label="location" value={personal.location} />
      </motion.div>

      {/* ./download-resume */}
      <PromptLine command="./download-resume" />
      <motion.div {...fadeUp(0.1)} className="mt-3 mb-10">
        <a
          href={personal.resumePath}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm border border-[#30363d] px-4 py-1.5 text-[#58a6ff] hover:bg-[#161b22] hover:text-[#79c0ff] transition-colors inline-block"
        >
          [ Download Resume ↗ ]
        </a>
      </motion.div>

      {/* uptime */}
      <PromptLine command="uptime" />
      <motion.div {...fadeUp(0.1)} className="mt-3 mb-10 text-sm">
        <ViewCounter />
      </motion.div>

      {/* exit */}
      <PromptLine command="exit" />
      <motion.div {...fadeUp(0.1)} className="mt-3 flex flex-col gap-0.5 text-xs text-[#8b949e]">
        <p>logout</p>
        <p>Saving session...</p>
        <p>...saving history...done.</p>
        <p className="mt-4 text-[#8b949e]">
          © 2026 Reghunaath Ajith Kumar Ahila
        </p>
      </motion.div>
    </section>
  );
}
