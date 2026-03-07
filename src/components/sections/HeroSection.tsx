"use client";
import { Linkedin, Github, Mail } from "lucide-react";
import { MinimalistHero } from "@/components/ui/minimalist-hero";
import { personal } from "@/data/personal";

const navLinks = [
  { label: "PROJECTS", href: "#projects" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

const socialLinks = [
  { icon: Linkedin, href: personal.linkedin },
  { icon: Github, href: personal.github || "#" },
  { icon: Mail, href: `mailto:${personal.email}` },
];

export function HeroSection() {
  return (
    <section id="hero">
      <MinimalistHero
        logoText="Reghunaath"
        navLinks={navLinks}
        name={personal.name}
        subtitle={personal.subtitle}
        introText={personal.intro}
        resumeLink={personal.resumePath}
        socialLinks={socialLinks}
        locationText={personal.location}
      />
    </section>
  );
}
