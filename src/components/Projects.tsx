import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  images: string[]; // Changed to array
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectsProps {
  onModalChange?: (isOpen: boolean) => void;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "Web Application",
    description:
      "Real-time analytics platform for financial data visualization",
    fullDescription:
      "A comprehensive financial analytics dashboard built for enterprise clients. Features real-time data streaming, interactive charts, and AI-powered insights for market analysis. The platform handles millions of data points daily with sub-second latency.lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    technologies: ["React", "TypeScript", "D3.js", "WebSocket", "PostgreSQL"],
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
    title: "E-Commerce Platform",
    category: "Full Stack",
    description: "Modern shopping experience with headless CMS integration",
    fullDescription:
      "A high-performance e-commerce solution featuring server-side rendering, optimistic UI updates, and a headless CMS for content management. Includes advanced features like AI-powered product recommendations and dynamic pricing.",
    technologies: ["Next.js", "Stripe", "Sanity", "Tailwind CSS"],
    images: [
      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      "linear-gradient(135deg, #f5576c 0%, #ff9a9e 100%)",
      "linear-gradient(135deg, #ff9a9e 0%, #f093fb 100%)",
    ],
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Health Tracking App",
    category: "Mobile & Web",
    description: "Cross-platform health and wellness tracking solution",
    fullDescription:
      "A wellness companion app that syncs across devices, tracking fitness metrics, nutrition, and mental health. Features include wearable device integration, personalized insights, and gamification elements to encourage healthy habits.",
    technologies: ["React Native", "Node.js", "MongoDB", "HealthKit"],
    images: [
      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      "linear-gradient(135deg, #00f2fe 0%, #43e97b 100%)",
      "linear-gradient(135deg, #43e97b 0%, #4facfe 100%)",
    ],
    githubUrl: "#",
  },
  {
    id: 4,
    title: "AI Content Studio",
    category: "AI/ML",
    description: "Generative AI tools for creative professionals",
    fullDescription:
      "An AI-powered creative suite that helps content creators generate, edit, and optimize their work. Includes text generation, image editing, and automated content optimization using cutting-edge machine learning models.",
    technologies: ["Python", "TensorFlow", "FastAPI", "React"],
    images: [
      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      "linear-gradient(135deg, #38f9d7 0%, #667eea 100%)",
      "linear-gradient(135deg, #667eea 0%, #43e97b 100%)",
    ],
    liveUrl: "#",
    githubUrl: "#",
  },
];

const Projects = ({ onModalChange }: ProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({});

  useEffect(() => {
    onModalChange?.(!!selectedProject);
    if (!selectedProject) {
      setCurrentImageIndex(0);
    }
  }, [selectedProject, onModalChange]);

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const timers = projects.map((project, projectIdx) => {
      if (project.images.length <= 1) return null;

      return setInterval(() => {
        setImageIndices((prev) => {
          const current = prev[project.id] ?? 0;
          return {
            ...prev,
            [project.id]:
              current === project.images.length - 1 ? 0 : current + 1,
          };
        });
      }, 3000);
    });

    return () => {
      timers.forEach((t) => t && clearInterval(t));
    };
  }, [projects]);

  return (
    <section id="projects" className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Selected Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card hover-lift">
                {/* Project Image */}
                {/* <div
                  className="h-48 w-full"
                  style={{ background: project.images[0] }}
                /> */}
                {/* Carousel */}
                <div className="relative h-[19rem] w-full overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={imageIndices[project.id] ?? 0}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                        style={{
                          background: project.images[imageIndices[project.id] ?? 0],
                        }}
                      />
                    </AnimatePresence>
  
                    {/* Carousel Controls */}
                    {project.images.length > 1 && (
                      <>
                        {/* Dots */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                          {project.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setImageIndices({ ...imageIndices, [project.id]: idx })}
                              className={`w-2 h-2 rounded-full transition-all ${
                                idx === (imageIndices[project.id] ?? 0)
                                  ? "bg-white w-6"
                                  : "bg-white/50 hover:bg-white/75"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs text-muted-foreground tracking-wider uppercase">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-secondary rounded-full text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 text-muted-foreground">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-[90vh] max-w-2xl bg-background rounded-3xl shadow-modal overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Carousel */}
              <div className="relative h-[35vh] w-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                    style={{
                      background: selectedProject.images[currentImageIndex],
                    }}
                  />
                </AnimatePresence>

                {/* Carousel Controls */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-secondary transition-colors z-10"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-secondary transition-colors z-10"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {selectedProject.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === currentImageIndex
                              ? "bg-white w-6"
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="py-4 overflow-hidden">

              
              <div className="p-8 overflow-y-auto h-full">
                <span className="text-xs text-muted-foreground tracking-wider uppercase">
                  {selectedProject.category}
                </span>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {selectedProject.fullDescription}
                </p>

                {/* Technologies */}
                <div className="mt-6">
                  <p className="text-sm font-medium mb-3">Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm px-3 py-1 bg-secondary rounded-full text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="mt-8 flex gap-4">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      className="flex items-center gap-2 px-4 md:px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover-lift"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      className="flex items-center gap-2 px-4 md:px-6 py-3 border border-border rounded-full text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
