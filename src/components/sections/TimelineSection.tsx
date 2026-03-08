"use client";
import React from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";
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

const workData = [
  {
    title: "2025",
    content: (
      <EntryContent
        type="work"
        name={experience[0].company}
        role={experience[0].role}
        location={experience[0].location}
        period={experience[0].period}
        bullets={experience[0].bullets}
      />
    ),
  },
  {
    title: "Early 2025",
    content: (
      <EntryContent
        type="work"
        name={experience[1].company}
        role={experience[1].role}
        location={experience[1].location}
        period={experience[1].period}
        bullets={experience[1].bullets}
      />
    ),
  },
  {
    title: "2023",
    content: (
      <EntryContent
        type="work"
        name={experience[2].company}
        role={experience[2].role}
        location={experience[2].location}
        period={experience[2].period}
        bullets={experience[2].bullets}
      />
    ),
  },
  {
    title: "2022",
    content: (
      <EntryContent
        type="work"
        name={experience[3].company}
        role={experience[3].role}
        location={experience[3].location}
        period={experience[3].period}
        bullets={experience[3].bullets}
      />
    ),
  },
  {
    title: "Early 2022",
    content: (
      <EntryContent
        type="work"
        name={experience[4].company}
        role={experience[4].role}
        location={experience[4].location}
        period={experience[4].period}
        bullets={experience[4].bullets}
      />
    ),
  },
];

const educationData = [
  {
    title: "2024",
    content: (
      <EntryContent
        type="education"
        name={education[0].institution}
        role={education[0].degree}
        location={education[0].location}
        period={education[0].period}
        gpa={education[0].gpa}
        bullets={education[0].bullets}
      />
    ),
  },
  {
    title: "2018",
    content: (
      <EntryContent
        type="education"
        name={education[1].institution}
        role={education[1].degree}
        location={education[1].location}
        period={education[1].period}
        gpa={education[1].gpa}
        bullets={education[1].bullets}
      />
    ),
  },
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
