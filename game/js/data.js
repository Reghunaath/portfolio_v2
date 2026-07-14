/* ─── REGHU.EXE — portfolio content (mirrors src/data of the main site) ─── */
/* global window */

window.GAME_DATA = (function () {
  const personal = {
    name: "Reghunaath Ajith Kumar Ahila",
    shortName: "Reghu",
    roles: ["Full-Stack Engineer", "AI Developer", "4x Hackathon Winner", "Published Researcher"],
    intro: "I build full-stack products end-to-end and ship fast.",
    intro2: "MS Data Science @ Northeastern · 4x Hackathon Winner · Published Researcher.",
    location: "Boston, MA",
    email: "ajithkumarahila.r@northeastern.edu",
    personalEmail: "reghunaath4@gmail.com",
    phone: "+18573519009",
    whatsapp: "+917708418298",
    linkedin: "https://www.linkedin.com/in/reghunaath",
    github: "https://github.com/Reghunaath/",
    mainSite: "/", // when this folder is served from public/game, "/" is the terminal portfolio
    resume: "resume.pdf", // game-local copy (relative) so it resolves on file:// and when served at /game/
  };

  /* Dialog definitions. `core: true` items count toward quest completion. */
  const dialogs = {
    /* ── hub ── */
    "lobby-reception": {
      path: "~/lobby/reception",
      title: "Front Desk",
      body: ["Welcome to REGHU.EXE — Reghu's walkable portfolio!"],
      hint: "check in at the front desk",
    },
    "hub-cat": {
      path: "~/lobby/cat",
      title: "pixel.cat",
      body: ["meow meow meow. (roughly translates to: Reghu is awesome and you should give him a job.)"],
      hint: "pet the cat",
    },
    "hub-mug": {
      path: "~/lobby/coffee",
      title: "Bottomless Coffee",
      body: ["You take a sip. It is somehow still hot. Shipping speed +10%."],
      coffee: true,
      hint: "drink the coffee",
    },
    "hub-phone": {
      path: "~/lobby/phone",
      title: "Front Desk Phone",
      body: [
        "You pick up the receiver. A pre-recorded voice answers:",
        "\"Thank you for calling REGHU.EXE. For projects, walk north. For experience, east. For education, west. To say hello to Reghu himself, head south to ~/contact.\"",
      ],
      hint: "answer the phone",
    },
    /* opens the in-game resume viewer (PDF + download) — rendered by the
       `resume` mode of UI.openDialog, keyed off the `copier` painter in
       game.js, so `url` is read there rather than shown as body text. */
    "hub-resume": {
      path: "~/lobby/resume",
      title: "Resume",
      url: personal.resume,
      core: true,
      hint: "view Reghu's resume",
      /* full text of resume.pdf, rendered as a printed paper sheet by the
         `resume` dialog mode in ui.js — keep in sync when the PDF changes */
      sheet: {
        name: personal.name,
        contact: [personal.email, "linkedin.com/in/reghunaath", "Boston, MA", "(857) 351-9009"],
        sections: [
          {
            heading: "Education",
            entries: [
              {
                title: "Northeastern University",
                note: "Boston, MA, USA",
                date: "Sep 2024 – Apr 2026",
                sub: "Master of Science in Data Science | CGPA: 3.9",
              },
              {
                title: "Vellore Institute of Technology",
                note: "Vellore, TN, India",
                date: "Aug 2018 – Apr 2022",
                sub: "Bachelor of Technology in Computer Science and Engineering | CGPA: 8.56",
              },
            ],
          },
          {
            heading: "Work Experience",
            entries: [
              {
                title: "QuantUniversity",
                note: "Boston, MA",
                date: "Jul 2025 – Aug 2025",
                sub: "Graduate Intern",
                bullets: [
                  "Built a platform using React and FastAPI to enable AI assisted educational content creation and seamless hosting of generated materials, reducing content development time from 5 days to ~3 hours",
                  "Identified and fixed a critical paywall bypass vulnerability in the first week, strengthening platform security",
                  "Designed and implemented authentication and authorization systems addressing all the security and compliance for the ISO and SOC2 certification",
                ],
              },
              {
                title: "Infosys",
                note: "Bengaluru, India",
                date: "Aug 2023 – Jul 2024",
                sub: "Senior Systems Engineer",
                bullets: [
                  "Developed and deployed a full-stack application with a .NET microservice architecture and React.js frontend, modernizing a legacy insurance platform through REST APIs, JWT based authentication, and Redux state management for a seamless user experience.",
                  "Built a .NET rule based recommendation engine integrating 9 external systems through gRPC, SOAP, and REST APIs, with SQL used to cache external system data for efficient rule evaluation and policy recommendations.",
                  "Developed a Python script to auto generate unit test cases and Postman integration test cases from business owned Excel sheets, reducing test case updates from hours to minutes per cycle and saving over 65 hours of manual effort long term.",
                ],
              },
              {
                title: "Danske IT",
                note: "(subsidiary of Danske Bank, acquired by Infosys in 2023), Bengaluru, India",
                date: "Jul 2022 – Aug 2023",
                sub: "Associate Software Engineer",
                bullets: [
                  "Developed and integrated Camunda BPM workflows within the .NET backend to orchestrate customer onboarding processes, automating task execution and service interactions to improve data processing efficiency, fault tolerance, and overall system reliability.",
                  "Built and owned CI/CD pipelines on Azure DevOps, ensuring smooth deployment workflows, version control, and continuous integration across development and production environments.",
                  "Integrated automated load testing with Grafana K6 into the CD pipeline to evaluate system performance and ensure scalability under high traffic",
                  "Independently implemented a monitoring solution using Kibana (Elastic Stack) to provide real time insights and enhance oversight across multiple team projects",
                ],
              },
              {
                sub: "Apprentice",
                date: "Jan 2022 – Jul 2022",
                bullets: [
                  "Gained comprehensive experience in fintech software development, working across testing, DevOps, frontend, and backend in an agile environment",
                  "Improved unit test line coverage from 60% to 95% for .NET backend",
                ],
              },
            ],
          },
          {
            heading: "Projects",
            entries: [
              {
                title: "RescueLine AI",
                body: [
                  "Developed an AI powered emergency call triage system using Twilio, ElevenLabs, and FastAPI to automatically classify and route emergency calls by urgency during natural disasters, when traditional helplines are overwhelmed. Built a real time voice AI agent and live dashboard with WebSocket based updates for emergency coordinators managing high call volumes. Earned 1st place and $700 at Northeastern's Innovaite 2026 Hackathon.",
                ],
              },
              {
                title: "LeadCatch AI",
                body: [
                  "Developed an AI chat assistant powered by ChatGPT and Twilio APIs to turn missed calls into booked appointments for small businesses. Designed a scalable Python backend for multi user handling and automated SMS based lead conversion. Earned 2nd place and $1500 in the \"Best Startup Demonstrating Traction\" category at the Yconic AI Hackathon (Microsoft, Cambridge, MA).",
                ],
              },
            ],
          },
          {
            heading: "Technical Skills",
            entries: [
              {
                pairs: [
                  ["Backend", "C# (.NET), Java (Spring Boot), Python (Django, Flask, FastAPI)"],
                  ["Frontend", "React, Angular, Flutter"],
                  ["DevOps", "AWS, Azure DevOps, git"],
                  ["Other Programming Languages", "C, C++, MATLAB, R, Go"],
                  ["Testing", "JUnit, NUnit, xUnit, Postman, Selenium, k6"],
                  ["ML/AI", "TensorFlow, Keras, PyTorch, scikit-learn, Pandas, Numpy, OpenCV, Matplotlib, Seaborn, Plotly, LLMs, Streamlit, GenAI, LangChain, LangGraph, ElevenLabs, RAG, Claude Code, Cursor"],
                  ["DBMS", "SQL, MongoDB"],
                ],
              },
            ],
          },
          {
            heading: "Publications",
            entries: [
              {
                body: [
                  "Muralidharan, K., Ramesh, A., Rithvik, G., Prem, S., Reghunaath, A. A., & Gopinath, M. P. (2021). 1D Convolution approach to human activity recognition using sensor data and comparison with machine learning algorithms. International Journal of Cognitive Computing in Engineering, 2, 130–143. (63 citations)",
                ],
              },
            ],
          },
        ],
      },
    },
    "hub-map": {
      path: "~/lobby/map",
      title: "World Map",
      body: [
        "Pushpins mark Vellore, Bengaluru, and Boston — everywhere this résumé has actually lived.",
        "There's one more pin, unlabeled, hovering right about where you're reading this from. Reghu is already plotting the coordinates of wherever hires him next.",
      ],
      hint: "study the map",
    },
    "hub-trophy": {
      path: "~/achievement",
      title: "FULL-STACK EXPLORER",
      sub: "you explored 100% of the portfolio",
      body: [
        "Achievement unlocked. You have seen every project, every job, every diploma, and every way to say hello.",
        "The logical next command is:",
        "$ sudo hire-me",
      ],
      links: [
        { label: "email " + personal.shortName, url: "mailto:" + personal.email },
        { label: "linkedin", url: personal.linkedin },
      ],
      hint: "claim the trophy",
    },

    /* ── projects arcade ── */
    "proj-rescueline": {
      path: "~/projects/rescueline-ai",
      title: "RescueLine AI",
      badge: "1st Place — $700 · Innovaite Hackathon",
      body: ["AI-powered emergency call triage system using Twilio, ElevenLabs, and FastAPI to automatically classify and route emergency calls by urgency during natural disasters, when traditional helplines are overwhelmed. Built a real-time voice AI agent and live dashboard with WebSocket-based updates for emergency coordinators managing high call volumes."],
      tags: ["FastAPI", "Twilio", "ElevenLabs", "Python", "WebSockets"],
      links: [
        { label: "github/backend", url: "https://github.com/Reghunaath/RescueLine-AI" },
        { label: "github/frontend", url: "https://github.com/Reghunaath/RescueLineAI-frontend" },
        { label: "watch demo", url: "https://drive.google.com/file/d/1bkyEA9-o23lN8rB-SmwH0s5kbimgiejv/view" },
      ],
      core: true,
      hint: "play RESCUELINE AI",
    },
    "proj-doodlpop": {
      path: "~/projects/doodlpop",
      title: "Doodlpop",
      badge: "1st Place · SharkHack",
      body: ["AI-powered comic book generator that turns a single sentence into a fully illustrated comic. Type a story idea — Doodlpop generates a panel-by-panel script with dialogue and visual descriptions, lets you pick an art style (manga, western, watercolor storybook), edit the script, then illustrates every panel with AI. Supports shareable links, QR code sharing, and PDF export."],
      tags: ["Next.js", "TypeScript", "Gemini", "Vercel", "AI Image Gen"],
      links: [
        { label: "github", url: "https://github.com/Reghunaath/doodlpop" },
        { label: "live demo", url: "https://doodlpop.vercel.app/" },
        { label: "watch demo", url: "https://drive.google.com/file/d/1i0BSCTNWsOek9I7soPHZM4jRBfzFTQMW/view?usp=drive_link" },
      ],
      core: true,
      hint: "play DOODLPOP",
    },
    "proj-leadcatch": {
      path: "~/projects/leadcatch-ai",
      title: "LeadCatch AI",
      badge: "2nd Place — $1,500 · Yconic AI Hackathon",
      body: ["AI chat assistant powered by ChatGPT and Twilio APIs to turn missed calls into booked appointments for small businesses. Designed a scalable Python backend for multi-user handling and automated SMS-based lead conversion."],
      tags: ["Python", "ChatGPT", "Twilio", "SMS", "FastAPI"],
      links: [
        { label: "github", url: "https://github.com/pavithralagisetty/LeadCatch.ai" },
        { label: "watch demo", url: "https://drive.google.com/file/d/1SYBqNUoYoWbJGfC8LH-QmF_O3aPF1Yn1/view?usp=sharing" },
      ],
      core: true,
      hint: "play LEADCATCH AI",
    },
    "proj-snapback": {
      path: "~/projects/snapback",
      title: "SNAPBACK",
      badge: "2nd Place · Babson Generator Build-a-thon",
      body: ["Computer vision tool that measures athletic mobility loss after injury or a long break — no wearables, no clinic visit. Pick your sport, stand in front of your camera, and get a mobility score out of 100 benchmarked against clinical reference ranges. MediaPipe and OpenCV track 33 skeletal landmarks at 30fps and compute joint angles in real time. Outputs a sport-specific gap analysis and a personalised week-by-week return-to-sport exercise plan."],
      tags: ["Python", "MediaPipe", "OpenCV", "Computer Vision", "AI"],
      links: [{ label: "github", url: "https://github.com/Srini-5303/SNAPBACK" }],
      core: true,
      hint: "play SNAPBACK",
    },
    "proj-deadpool": {
      path: "~/projects/deadpool",
      title: "DEADPOOL",
      body: ["DEADPOOL (Dependency Evaluation And Downstream Prediction Of Operational Liabilities) — a multi-agent AI system that identifies operational risks and failure cascades in startups before they become catastrophic. Orchestrates 6 specialist agents (People, Finance, Infrastructure, Product, Legal, Code Audit) running concurrently via LangGraph. Cross-domain cascade expansion using Gemini 2.5 Pro traces how a single failure propagates across the org — producing a 0-100 composite risk score and a plain-language founder briefing."],
      tags: ["LangGraph", "Gemini 2.5 Pro", "FastAPI", "React", "Python", "Multi-Agent"],
      links: [{ label: "github", url: "https://github.com/Ackshay206/DEADPOOL" }],
      core: true,
      hint: "play DEADPOOL",
    },

    /* ── experience office ── */
    "exp-quantu": {
      path: "~/experience/quantuniversity",
      title: "QuantUniversity — Graduate Intern",
      sub: "Boston, MA · Jul 2025 – Aug 2025",
      bullets: [
        "Built a platform using React and FastAPI to enable AI-assisted educational content creation and seamless hosting of generated materials, reducing content development time from 5 days to ~3 hours.",
        "Identified and fixed a critical paywall bypass vulnerability in the first week, strengthening platform security.",
        "Designed and implemented authentication and authorization systems addressing all security and compliance requirements for ISO and SOC2 certification.",
      ],
      tags: ["React", "FastAPI", "Python", "Auth"],
      core: true,
      hint: "inspect the QuantUniversity desk",
    },
    "exp-neu-ta": {
      path: "~/experience/northeastern",
      title: "Northeastern University — Teaching Assistant",
      sub: "Remote · May 2025 – Dec 2025",
      bullets: [
        "Served as TA for CS6620 Fundamentals of Cloud Computing and DS3000 Foundations of Data Science, supporting a combined cohort of graduate and undergraduate students.",
        "Assisted in grading, designing assignments, and holding office hours to clarify concepts and guide students through course material.",
      ],
      tags: ["Cloud Computing", "Data Science"],
      core: true,
      hint: "inspect the TA desk",
    },
    "exp-infosys": {
      path: "~/experience/infosys",
      title: "Infosys — Senior Systems Engineer",
      sub: "Bengaluru, India · Aug 2023 – Jul 2024",
      bullets: [
        "Developed and deployed a full-stack application with a .NET microservice architecture and React.js frontend, modernizing a legacy insurance platform through REST APIs, JWT-based authentication, and Redux state management.",
        "Built a .NET rule-based recommendation engine integrating 9 external systems through gRPC, SOAP, and REST APIs, with SQL caching for efficient rule evaluation and policy recommendations.",
        "Developed a Python script to auto-generate unit test cases and Postman integration test cases from business-owned Excel sheets, saving over 65 hours of manual effort long term.",
      ],
      tags: [".NET", "React", "Redux", "gRPC", "SQL", "Python"],
      core: true,
      hint: "inspect the Infosys desk",
    },
    "exp-danske-se": {
      path: "~/experience/danske-it",
      title: "Danske IT — Associate Software Engineer",
      sub: "Bengaluru, India · Jul 2022 – Aug 2023",
      bullets: [
        "Developed and integrated Camunda BPM workflows within the .NET backend to orchestrate customer onboarding processes, improving data processing efficiency, fault tolerance, and system reliability.",
        "Built and owned CI/CD pipelines on Azure DevOps, ensuring smooth deployment workflows and continuous integration across development and production environments.",
        "Integrated automated load testing with Grafana K6 into the CD pipeline to evaluate system performance and ensure scalability under high traffic.",
        "Independently implemented a monitoring solution using Kibana (Elastic Stack) to provide real-time insights across multiple team projects.",
      ],
      tags: ["Camunda BPM", ".NET", "Azure DevOps", "K6", "Kibana"],
      core: true,
      hint: "inspect the Danske IT desk",
    },
    "exp-danske-app": {
      path: "~/experience/danske-it-apprentice",
      title: "Danske IT — Apprentice",
      sub: "Bengaluru, India · Jan 2022 – Jul 2022",
      bullets: [
        "Gained comprehensive experience in fintech software development, working across testing, DevOps, frontend, and backend in an agile environment.",
        "Improved unit test line coverage from 60% to 95% for .NET backend.",
      ],
      tags: [".NET", "Unit Testing"],
      core: true,
      hint: "inspect the apprentice desk",
    },
    "exp-cooler": {
      path: "~/experience/water-cooler",
      title: "Water Cooler",
      body: ["Unfortunately, there's no one else here at the moment to gossip with."],
      hint: "visit the water cooler",
    },
    "exp-whiteboard": {
      path: "~/experience/dashboard",
      title: "Team Dashboard",
      body: ["Someone drew an architecture diagram on here once. It got erased for a pie chart about snack preferences. Reghu still isn't sure which one shipped to production."],
      hint: "check the dashboard",
    },

    /* ── education library ── */
    "edu-neu": {
      path: "~/education/northeastern",
      title: "Northeastern University",
      sub: "MS Data Science · Boston, MA · 2024 – 2026",
      crest: "N",
      crestColor: "#c93c35",
      badge: "GPA 3.9 / 4.0",
      body: ["Master of Science in Data Science. Also serves as TA for cloud computing and data science courses."],
      core: true,
      hint: "read the Northeastern diploma",
    },
    "edu-vit": {
      path: "~/education/vit-vellore",
      title: "VIT Vellore",
      sub: "B.Tech Computer Science & Engineering · Vellore, India · 2018 – 2022",
      crest: "VIT",
      crestColor: "#1f6feb",
      badge: "GPA 3.42 / 4.0",
      body: ["Bachelor of Technology in Computer Science and Engineering — where the first line of code was written and the last all-nighter definitely was not."],
      core: true,
      hint: "read the VIT diploma",
    },
    "edu-paper": {
      path: "~/education/research",
      title: "1D Convolution approach to human activity recognition using sensor data and comparison with machine learning algorithms",
      sub: "International Journal of Cognitive Computing in Engineering · 2021",
      badge: "63 citations",
      body: ["Classifies six human activities (sitting, standing, walking, stair climbing, laying down) from smartphone accelerometer and gyroscope data. Benchmarks classic ML algorithms — Logistic Regression, Linear & Kernel SVM, Decision Tree, Random Forest — against a proposed feed-forward DNN and 1D CNN. SVM and the proposed 1D CNN emerged as the best-performing models."],
      tags: ["research", "deep learning", "IoT"],
      links: [
        { label: "read paper", url: "https://www.sciencedirect.com/science/article/pii/S2666307421000140" },
        { label: "google scholar", url: "https://scholar.google.com/citations?user=C9GVXKYAAAAJ&hl=en&authuser=1" },
      ],
      core: true,
      hint: "read the glowing paper",
    },
    "edu-shelf": {
      path: "~/education/shelves",
      title: "Library Shelves",
      body: ["Statistics, distributed systems, computer vision, one shelf of pure sci-fi. A library card falls out; it just says 'curiosity'."],
      hint: "browse the shelves",
    },
    "edu-vending": {
      path: "~/education/vending",
      title: "Vending Machine",
      body: ["You insert a dollar. The machine hums, whirs... and keeps it. A snack dangles half dropped behind the glass, mocking you."],
      hint: "buy a snack",
    },

    /* ── contact comms room ── */
    "contact-directline": {
      path: "~/contact/direct",
      title: "Direct Line",
      contacts: [
        { value: personal.email },
        { value: personal.personalEmail },
        { value: personal.phone, note: "US" },
        { value: personal.whatsapp, note: "WhatsApp" },
      ],
      core: true,
      hint: "check the contact desk",
    },
    "contact-links": {
      path: "~/contact/links",
      title: "Link Terminal",
      body: ["Reghu's outbound ports, all open. Pick a destination and connect."],
      links: [
        { label: "linkedin", url: personal.linkedin },
        { label: "github", url: personal.github },
        {
          label: "portfolio",
          onClick: function () {
            window.UI.toast("You're already inside the portfolio. It's portfolios all the way down. 🐢", 3200);
          },
        },
        { label: "google scholar", url: "https://scholar.google.com/citations?user=C9GVXKYAAAAJ&hl=en&authuser=1" },
      ],
      core: true,
      hint: "browse the link terminal",
    },
    "contact-server": {
      path: "~/contact/server-rack",
      title: "Server Rack",
      body: ["Racks of humming metal, LEDs blinking in no particular rhythm."],
      hint: "admire the server rack",
    },
  };

  /* ids that count toward 100% exploration */
  const coreIds = Object.keys(dialogs).filter((k) => dialogs[k].core);

  return { personal, dialogs, coreIds };
})();
