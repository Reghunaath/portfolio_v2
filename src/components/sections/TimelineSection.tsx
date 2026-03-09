"use client";
import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
import { GlowCard } from "@/components/ui/glow-card";
import { experience } from "@/data/experience";
import { education } from "@/data/education";

function EntryContent({
  name,
  role,
  location,
  period,
  gpa,
  bullets,
  type,
}: {
  name: string;
  role: string;
  location: string;
  period: string;
  gpa?: string;
  bullets: string[];
  type: "work" | "education";
}) {
  const Icon = type === "education" ? GraduationCap : Briefcase;

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div>
        <h4 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
          {name}
        </h4>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Icon className="h-5 w-5 text-neutral-400 shrink-0" />
          <p className="text-neutral-600 dark:text-neutral-400 italic text-lg">
            {role}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg text-neutral-500 dark:text-neutral-500">
            {location} · {period}
          </span>
          {gpa && (
            <span className="text-base font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-2 py-0.5 rounded-full">
              GPA {gpa}
            </span>
          )}
        </div>
      </div>
      {bullets.length > 0 && (
        <ul className="flex flex-col gap-2">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex gap-2 text-md text-neutral-700 dark:text-neutral-300"
            >
              <span className="text-neutral-400 shrink-0 mt-0.5">–</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function makeWorkEntry(exp: (typeof experience)[0]) {
  return (
    <GlowCard>
      <EntryContent
        type="work"
        name={exp.company}
        role={exp.role}
        location={exp.location}
        period={exp.period}
        bullets={exp.bullets}
      />
    </GlowCard>
  );
}

function makeEducationEntry(edu: (typeof education)[0]) {
  return (
    <GlowCard>
      <EntryContent
        type="education"
        name={edu.institution}
        role={edu.degree}
        location={edu.location}
        period={edu.period}
        gpa={edu.gpa}
        bullets={edu.bullets}
      />
    </GlowCard>
  );
}

const workData = [
  { title: "2025", content: makeWorkEntry(experience[0]) },
  { title: "Early 2025", content: makeWorkEntry(experience[1]) },
  { title: "2023", content: makeWorkEntry(experience[2]) },
  { title: "2022", content: makeWorkEntry(experience[3]) },
  { title: "Early 2022", content: makeWorkEntry(experience[4]) },
];

const educationData = [
  { title: "2024", content: makeEducationEntry(education[0]) },
  { title: "2018", content: makeEducationEntry(education[1]) },
];

export function TimelineSection() {
  return (
    <section id="experience">
      <Timeline
        data={workData}
        heading="Work Experience"
        subtitle="My professional journey so far."
      />
      <Timeline
        data={educationData}
        heading="Education"
        subtitle="My academic background."
      />
    </section>
  );
}
