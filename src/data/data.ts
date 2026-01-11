import { Project } from "../types/types";
import { ExperienceItem } from "../types/types";
import gwennie1 from "../../public/gif/gwennie1.gif"
import gwennie2 from "../../public/gif/gwennie2.gif"
import gwennie3 from "../../public/gif/gwennie3.gif"
import portfolio1 from "../../public/gif/portfolio1.gif"
import portfolio2 from "../../public/gif/portfolio2.gif"
// import portfolio3 from "../../public/gif/portfolio3.gif"
import hmi1 from "../../public/gif/hmi1.gif"
import hmi2 from "../../public/gif/hmi2.gif"
// import hmi3 from "../../public/gif/hmi3.gif"
import mayoor1 from "../../public/gif/mayoor1.gif"
import mayoor2 from "../../public/gif/mayoor2.gif"
import mayoor3 from "../../public/gif/mayoor3.gif"

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
      gwennie1,
      gwennie2,
      gwennie3,
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
      mayoor1,
      mayoor2,
      mayoor3
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
      hmi1,
      hmi2,
      // hmi3,
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
      portfolio1,
      portfolio2,
      // portfolio3,
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const ExperiencesData: ExperienceItem[] = [
    {
    id: 1,
    role: "Software Engineer",
    company: "FusionHawk",
    location: "New Delhi, India",
    duration: "Jan 2026 - Present",
    description: "Leading Automation, Ai integration, Solution Building, Development.",
    skills: ["Zoho", "Automations", "Node.js"],
  },
  {
    id: 2,
    role: "Zoho Developer",
    company: "Tempsens",
    location: "Udaipur, India ",
    duration: "Oct 2025 - Jan 2026",
    description: "Leading frontend architecture and mentoring junior developers.",
    skills: ["Zoho", "Automations", "Node.js"],
  },
  {
    id: 3,
    role: "Software Developer Intern",
    company: "Nessco India",
    location: "Jaipur, India",
    duration: "May 2025 - Jul 2025",
    description: "Built scalable web applications using React and Node.js.",
    skills: ["React", "MongoDB", "AWS"],
  },
  {
    id: 4,
    role: "Backend Developer",
    company: "CodeUp",
    location: "Jaipur, India",
    duration: "Oct 2024 - Apr 2025",
    description: "Crafted responsive interfaces and improved UX performance.",
    skills: ["Node.js", "SQL", "Database Design", "REST APIs"],
  },
  {
    id: 5,
    role: "Software Developer Intern",
    company: "Nessco India",
    location: "Jaipur, India",
    duration: "Jul 2024 - Sep 2024",
    description: "Developed landing pages and maintained client websites.",
    skills: ["HTML", "CSS", "JavaScript"],
  },
];