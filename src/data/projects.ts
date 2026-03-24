export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  award?: string;
}

export const projects: Project[] = [
  {
    title: "RescueLine AI",
    description:
      "AI-powered disaster response platform that connects displaced individuals with emergency services and volunteers in real time. Processes live 911 call transcripts to auto-classify incidents, assign responders, and surface resource gaps on a command dashboard.",
    tags: ["React", "FastAPI", "Gemini", "Python", "WebSockets"],
    github: "", // TODO
    demo: "", // TODO
    award: "🏆 1st Place — $700",
  },
  {
    title: "LeadCatch AI",
    description:
      "Autonomous AI sales agent that scrapes LinkedIn, qualifies leads using LLM scoring, drafts personalized outreach emails, and syncs to CRM — reducing manual SDR work from hours to minutes per campaign.",
    tags: ["Next.js", "OpenAI", "LangChain", "Postgres", "Puppeteer"],
    github: "", // TODO
    demo: "", // TODO
    award: "🥈 2nd Place — $1,500",
  },
];
