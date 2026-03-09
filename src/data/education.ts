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
    degree: "Masters of Science in Data Science",
    location: "Boston, MA",
    period: "2024 – 2026",
    gpa: "3.9/4.0",
    bullets: [],
  },
  {
    institution: "Vellore Institute of Technology",
    degree: "Bachelors of Technology in Computer Science and Engineering",
    location: "Vellore, India",
    period: "2018 – 2022",
    gpa: "3.42/4.0",
    bullets: [],
  },
];
