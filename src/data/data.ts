import { Project } from "../types/types";

export const ProjectsData: Project[] = [
  {
    id: 1,
    title: "Gwennie Events",
    category: "Web Application",
    description:
      "A minimal luxury website built for client to elevate a premium event brand.",
    fullDescription:
      "A client-based luxury event website built with a royal yet minimal design language, aligned with the brand’s premium identity.\n\n" +
      "Handled the complete execution — UI design, content structuring, and logo alignment — ensuring the website feels elegant, timeless, and conversion-focused.\n\n" +
      "The experience prioritizes clean typography, balanced layouts, and subtle interactions to communicate trust and sophistication without visual noise.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    images: [
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "linear-gradient(135deg, #764ba2 0%, #f093fb 100%)",
      "linear-gradient(135deg, #f093fb 0%, #667eea 100%)",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Outcome Based Learning System",
    category: "Web Application",
    description: "An academic platform for mapping and tracking learning outcomes.",
    fullDescription:
      "A team-based academic web application designed and delivered, focused on Outcome Based Education (OBE) workflows. Planned the system end-to-end and led the technical execution, handling backend architecture, API design, and database modeling, while also contributing to the frontend.\n\n" +
      "The platform manages the structured relationship between Assessment Criteria (AC), Learning Outcomes (LO), and Reported Outcomes (RO), ensuring accurate mapping, evaluation, and outcome tracking in an academic environment.",
    technologies: ["React", "Node.js", "Express", "MySQL", "REST APIs", "Database Design", "OAuth", "PWA"],
    images: [
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #f5576c 0%, #ff9a9e 100%)",
      "linear-gradient(135deg, #ff9a9e 0%, #f093fb 100%)",
    ],
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Real-Time IOT Machine Controller",
    category: "Web & IoT Application",
    description: "A real-time web app for centralized machine monitoring and control.",
    fullDescription:
      "A real-time IoT-based web application designed to monitor and control multiple HMI-connected machines from a single interface. The system is built on a publish–subscribe architecture, enabling low-latency, real-time data flow between machines and the web dashboard.\n\n" +
      "I worked on the real-time communication layer and backend, implementing a scalable Node.js-based system to handle live machine states, controls, and status updates reliably.",
    technologies: ["Node.js", "InoTouchPad", "MQTT", "Express", "REST APIs", "publish–subscribe architecture"],
    images: [
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #00f2fe 0%, #43e97b 100%)",
      "linear-gradient(135deg, #43e97b 0%, #4facfe 100%)",
    ],
    githubUrl: "#",
  },
  {
    id: 4,
    title: "My Portfolio",
    category: "Web Application",
    description: "An interactive portfolio focused on feel, motion, and clarity.",
    fullDescription:
      "A minimalist, experience-driven developer portfolio designed to make visitors feel the interface rather than just scroll through it. The project explores interaction, motion, and atmosphere while keeping the visual language restrained and timeless.\n\n" +
      "The focus was on crafting a calm yet engaging user journey through subtle details — from micro-interactions to ambient feedback — without breaking performance or clarity.\n\n" +
      "This portfolio acts as both a personal product and a UI/UX playground, balancing creativity with usability.\n\n"+
      "Key Features : \n\n" +
      "-Minimal preloader for smooth entry\n" +
      "-Interactive character for engagement\n" +
      "-Gravity-based interactive skills section\n" +
      "-GitHub Buddy for profile comparison\n" +
      "-Ambient sound for immersive atmosphere",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Matter.js", "Framer Motion"],
    images: [
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #38f9d7 0%, #667eea 100%)",
      "linear-gradient(135deg, #667eea 0%, #43e97b 100%)",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
];