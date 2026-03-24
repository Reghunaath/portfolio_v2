import { TerminalTitleBar } from "@/components/ui/terminal-title-bar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";

const navLinks = [
  { label: "~/", href: "#hero" },
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "education", href: "#education" },
  { label: "contact", href: "#contact" },
];

export default function Home() {
  return (
    <>
      <TerminalTitleBar navLinks={navLinks} />
      <main className="pt-10">
        <div className="px-6 md:px-12 lg:px-20 pb-24">
          <HeroSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <ContactSection />
        </div>
      </main>
    </>
  );
}
