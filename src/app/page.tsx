import fs from "fs";
import path from "path";
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
  const htmlPath = path.join(
    process.cwd(),
    "public",
    "Gemini_Generated_Image_mihbcymihbcymihb_1.html"
  );
  const raw = fs.readFileSync(htmlPath, "utf-8");
  const bodyMatch = raw.match(/<body>([\s\S]*?)<\/body>/i);
  const asciiHtml = bodyMatch ? bodyMatch[1] : "";

  return (
    <>
      <TerminalTitleBar navLinks={navLinks} />
      <main className="pt-10">
        <div className="px-1 md:px-2 lg:px-3 pb-24">
          <HeroSection asciiHtml={asciiHtml} />
          <ProjectsSection />
          <ExperienceSection />
          <EducationSection />
          <ContactSection />
        </div>
      </main>
    </>
  );
}
