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
  live?: string;
  demoVideo?: string;
  award?: string;
  images?: ProjectImage[];
}

export const projects: Project[] = [
  {
    title: "RescueLine AI",
    description:
      "AI powered emergency call triage system using Twilio, ElevenLabs, and FastAPI to automatically classify and route emergency calls by urgency during natural disasters, when traditional helplines are overwhelmed. Built a real time voice AI agent and live dashboard with WebSocket based updates for emergency coordinators managing high call volumes.",
    tags: ["FastAPI", "Twilio", "ElevenLabs", "Python", "WebSockets"],
    github: "",
    githubBackend: "https://github.com/Reghunaath/RescueLine-AI",
    githubFrontend: "https://github.com/Reghunaath/RescueLineAI-frontend",
    demoVideo:
      "https://drive.google.com/file/d/1bkyEA9-o23lN8rB-SmwH0s5kbimgiejv/view",
    award: "🏆 1st Place — $700 · Innovaite Hackathon",
    images: [
      {
        src: "/images/projects/rescueline-ai/1772765427156.jpg",
        label: "live-dashboard.jpg",
      },
      {
        src: "/images/projects/rescueline-ai/1772765427362.jpg",
        label: "prize-check.jpg",
      },
    ],
  },
  {
    title: "Doodlpop",
    description:
      "AI powered comic book generator that turns a single sentence into a fully illustrated comic. Type a story idea, Doodlpop generates a panel by panel script with dialogue and visual descriptions, lets you pick an art style (manga, western, watercolor storybook), edit the script, then illustrates every panel with AI. Supports shareable links, QR code sharing, and PDF export.",
    tags: ["Next.js", "TypeScript", "Gemini", "Vercel", "AI Image Gen"],
    github: "https://github.com/Reghunaath/doodlpop",
    live: "https://doodlpop.vercel.app/",
    demoVideo:
      "https://drive.google.com/file/d/1i0BSCTNWsOek9I7soPHZM4jRBfzFTQMW/view?usp=drive_link",
    award: "🏆 1st Place · SharkHack",
    images: [
      {
        src: "/images/projects/doodlpop/screenshot-app.png",
        label: "app-screenshot.png",
      },
      {
        src: "/images/projects/doodlpop/team-1.jpeg",
        label: "hackathon-1.jpeg",
      },
      {
        src: "/images/projects/doodlpop/team-2.jpeg",
        label: "hackathon-2.jpeg",
      },
      { src: "/images/projects/doodlpop/award.jpg", label: "award.jpg" },
    ],
  },
  {
    title: "LeadCatch AI",
    description:
      "Automated SMS based lead conversion powered by OpenAI and Twilio APIs, with a scalable Python backend for multi user handling. After a small business or a trade worker misses a call, an AI agent texts the caller back within seconds, answers their questions, qualifies the lead, and books an appointment straight into the owner's schedule. Turns missed calls, which would otherwise walk away as lost revenue, into booked jobs without the owner ever having to pick up the phone.",
    tags: ["Python", "OpenAI", "Twilio", "SMS", "FastAPI"],
    github: "https://github.com/pavithralagisetty/LeadCatch.ai",
    demoVideo:
      "https://drive.google.com/file/d/1SYBqNUoYoWbJGfC8LH-QmF_O3aPF1Yn1/view?usp=sharing",
    award: "🥈 2nd Place — $1,500 · Yconic AI Hackathon",
    images: [
      {
        src: "/images/projects/leadcatch-ai/Screenshot 2026-04-01 025549.png",
        label: "sms-conversation-demo.png",
      },
      {
        src: "/images/projects/leadcatch-ai/WhatsApp Image 2026-04-01 at 2.57.30 AM.jpeg",
        label: "hackathon-award.jpeg",
      },
    ],
  },
  {
    title: "SNAPBACK",
    description:
      "Computer vision tool that measures athletic mobility loss after injury or a long break, no wearables, no clinic visit. Pick your sport, stand in front of your camera, and get a mobility score out of 100 benchmarked against clinical reference ranges. MediaPipe and OpenCV track 33 skeletal landmarks at 30fps and compute joint angles in real time. Outputs a sport specific gap analysis and a personalised week by week return to sport exercise plan with sets, reps, and reasoning.",
    tags: ["Python", "MediaPipe", "OpenCV", "Computer Vision", "AI"],
    github: "https://github.com/Srini-5303/SNAPBACK",
    award: "🥈 2nd Place · Babson Generator Build-a-thon",
    images: [
      { src: "/images/projects/snapback/demo-screenshot.png", label: "demo-screenshot.png" },
      { src: "/images/projects/snapback/cv-screenshot.png", label: "cv-screenshot.png" },
      { src: "/images/projects/snapback/plan-screenshot.png", label: "plan-screenshot.png" },
      { src: "/images/projects/snapback/team.jpeg", label: "team.jpeg" },
    ],
  },
  {
    title: "DEADPOOL",
    description:
      "DEADPOOL (Dependency Evaluation And Downstream Prediction Of Operational Liabilities), a multi agent AI system that identifies operational risks and failure cascades in startups before they become catastrophic. Orchestrated 6 specialist agents (People, Finance, Infrastructure, Product, Legal, Code Audit) running concurrently via LangGraph. Cross domain cascade expansion using Gemini 2.5 Pro traces how a single failure propagates across the org, producing a 0–100 composite risk score and a plain language founder briefing.",
    tags: ["LangGraph", "Gemini 2.5 Pro", "FastAPI", "React", "Python", "Multi-Agent"],
    github: "https://github.com/Ackshay206/DEADPOOL",
    images: [
      { src: "/images/projects/deadpool/landing.png", label: "landing.png" },
      { src: "/images/projects/deadpool/dashboard.png", label: "dashboard.png" },
      { src: "/images/projects/deadpool/cascade-chains.png", label: "cascade-chains.png" },
    ],
  },
];
