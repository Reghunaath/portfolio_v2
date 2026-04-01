export interface ProjectImage {
  src: string;
  label: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  githubBackend?: string;
  githubFrontend?: string;
  demo: string;
  demoVideo?: string;
  award?: string;
  images?: ProjectImage[];
}

export const projects: Project[] = [
  {
    title: "RescueLine AI",
    description:
      "AI-powered emergency call triage system using Twilio, ElevenLabs, and FastAPI to automatically classify and route emergency calls by urgency during natural disasters, when traditional helplines are overwhelmed. Built a real-time voice AI agent and live dashboard with WebSocket-based updates for emergency coordinators managing high call volumes.",
    tags: ["FastAPI", "Twilio", "ElevenLabs", "Python", "WebSockets"],
    github: "",
    githubBackend: "https://github.com/Reghunaath/RescueLine-AI",
    githubFrontend: "https://github.com/Reghunaath/RescueLineAI-frontend",
    demo: "https://example.com", // TODO
    award: "🏆 1st Place — $700",
    images: [
      { src: "/images/projects/rescueline-ai/1772765427156.jpg", label: "live-dashboard.jpg" },
      { src: "/images/projects/rescueline-ai/1772765427362.jpg", label: "prize-check.jpg" },
    ],
  },
  {
    title: "LeadCatch AI",
    description:
      "AI chat assistant powered by ChatGPT and Twilio APIs to turn missed calls into booked appointments for small businesses. Designed a scalable Python backend for multi-user handling and automated SMS-based lead conversion.",
    tags: ["Python", "ChatGPT", "Twilio", "SMS", "FastAPI"],
    github: "https://github.com/pavithralagisetty/LeadCatch.ai",
    demo: "https://example.com", // TODO
    demoVideo: "https://drive.google.com/file/d/1SYBqNUoYoWbJGfC8LH-QmF_O3aPF1Yn1/view?usp=sharing",
    award: "🥈 2nd Place — $1,500 · Yconic AI Hackathon",
    images: [
      { src: "/images/projects/leadcatch-ai/Screenshot 2026-04-01 025549.png", label: "sms-conversation-demo.png" },
      { src: "/images/projects/leadcatch-ai/WhatsApp Image 2026-04-01 at 2.57.30 AM.jpeg", label: "hackathon-award.jpeg" },
    ],
  },
];
