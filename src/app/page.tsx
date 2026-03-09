"use client";
import { HeroSection } from "@/components/sections/HeroSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import dynamic from "next/dynamic";

const Boxes = dynamic(() => import("@/components/ui/boxes").then((m) => m.Boxes), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative">
      {/* Global animated grid background */}
      <div className="fixed inset-0 z-0">
        <Boxes />
      </div>
      <div className="fixed inset-0 z-[1] bg-background/70 pointer-events-none" />

      {/* Page content */}
      <div className="relative z-[2] pointer-events-none">
        <HeroSection />
        <TimelineSection />
      </div>
    </main>
  );
}
