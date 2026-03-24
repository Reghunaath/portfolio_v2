export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  gpa: string;
  bullets: string[];
}

export const education: Education[] = [
  {
    institution: "Northeastern University",
    degree: "MS Data Science",
    location: "Boston, MA",
    period: "2024 – 2026",
    gpa: "3.9/4.0",
    bullets: [],
  },
  {
    institution: "VIT Vellore",
    degree: "B.Tech Computer Science & Engineering",
    location: "India",
    period: "2018 – 2022",
    gpa: "3.42/4.0",
    bullets: [],
  },
];
