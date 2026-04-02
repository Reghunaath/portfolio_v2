import { TerminalTitleBar } from "@/components/ui/terminal-title-bar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { VisitCounterGrid } from "@/components/ui/visit-counter-grid";
import { navSections } from "@/data/personal";

const navLinks = [
  { label: "~/", href: "#hero" },
  ...navSections.map((s) => ({ label: s.label, href: `#${s.id}` })),
];

export default function Home() {
  return (
    <>
      <TerminalTitleBar navLinks={navLinks} />
      <main className="pt-10">
        <div className="px-1 md:px-2 lg:px-3 pb-24">
          <HeroSection />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <ContactSection />
          <VisitCounterGrid />
        </div>
      </main>
    </>
  );
}
