export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  demo: string;
  award?: string;
}

export const projects: Project[] = [
  {
    title: "RescueLine AI",
    description:
      "AI-powered emergency call triage system using Twilio, ElevenLabs, and FastAPI. Automatically classifies and routes emergency calls by urgency. Real-time voice AI agent with WebSocket-based live dashboard.",
    tags: ["FastAPI", "Twilio", "ElevenLabs", "WebSocket"],
    image: "/images/rescueline.png", // TODO: add screenshot
    github: "", // TODO: add GitHub URL
    demo: "", // TODO: add demo URL
    award: "1st Place, $700 — Innovate 2026 Hackathon",
  },
  {
    title: "LeadCatch AI",
    description:
      "AI chat assistant that turns missed calls into booked appointments for small businesses. Scalable Python backend for multi-user handling with automated SMS-based lead conversion.",
    tags: ["Python", "ChatGPT API", "Twilio"],
    image: "/images/leadcatch.png", // TODO: add screenshot
    github: "", // TODO: add GitHub URL
    demo: "", // TODO: add demo URL
    award: "2nd Place, $1500 — Yconic AI Hackathon",
  },
];
