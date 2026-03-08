export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    company: "QuantUniversity",
    role: "Graduate Intern",
    location: "Boston, MA",
    period: "Jul 2025 – Aug 2025",
    bullets: [
      "Built a platform using React and FastAPI to enable AI-assisted educational content creation and seamless hosting of generated materials, reducing content development time from 5 days to ~3 hours.",
      "Identified and fixed a critical paywall bypass vulnerability in the first week, strengthening platform security.",
      "Designed and implemented authentication and authorization systems addressing all security and compliance requirements for ISO and SOC2 certification.",
    ],
  },
  {
    company: "Northeastern University",
    role: "Teaching Assistant",
    location: "Remote",
    period: "May 2025 – Dec 2025",
    bullets: [
      "Served as TA for CS6620 Fundamentals of Cloud Computing and DS3000 Foundations of Data Science, supporting a combined cohort of graduate and undergraduate students.",
      "Assisted in grading, designing assignments, and holding office hours to clarify concepts and guide students through course material.",
    ],
  },
  {
    company: "Infosys",
    role: "Senior Systems Engineer",
    location: "Bengaluru, India",
    period: "Aug 2023 – Jul 2024",
    bullets: [
      "Developed and deployed a full-stack application with a .NET microservice architecture and React.js frontend, modernizing a legacy insurance platform through REST APIs, JWT-based authentication, and Redux state management.",
      "Built a .NET rule-based recommendation engine integrating 9 external systems through gRPC, SOAP, and REST APIs, with SQL caching for efficient rule evaluation and policy recommendations.",
      "Developed a Python script to auto-generate unit test cases and Postman integration test cases from business-owned Excel sheets, saving over 65 hours of manual effort long term.",
    ],
  },
  {
    company: "Danske IT",
    role: "Associate Software Engineer",
    location: "Bengaluru, India",
    period: "Jul 2022 – Aug 2023",
    bullets: [
      "Developed and integrated Camunda BPM workflows within the .NET backend to orchestrate customer onboarding processes, improving data processing efficiency, fault tolerance, and system reliability.",
      "Built and owned CI/CD pipelines on Azure DevOps, ensuring smooth deployment workflows and continuous integration across development and production environments.",
      "Integrated automated load testing with Grafana K6 into the CD pipeline to evaluate system performance and ensure scalability under high traffic.",
      "Independently implemented a monitoring solution using Kibana (Elastic Stack) to provide real-time insights across multiple team projects.",
    ],
  },
  {
    company: "Danske IT",
    role: "Apprentice",
    location: "Bengaluru, India",
    period: "Jan 2022 – Jul 2022",
    bullets: [
      "Gained comprehensive experience in fintech software development, working across testing, DevOps, frontend, and backend in an agile environment.",
      "Improved unit test line coverage from 60% to 95% for .NET backend.",
    ],
  },
];
