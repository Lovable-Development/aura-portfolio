import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "Web Application",
    description: "Real-time analytics platform for financial data visualization",
    fullDescription: "A comprehensive financial analytics dashboard built for enterprise clients. Features real-time data streaming, interactive charts, and AI-powered insights for market analysis. The platform handles millions of data points daily with sub-second latency.",
    technologies: ["React", "TypeScript", "D3.js", "WebSocket", "PostgreSQL"],
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    category: "Full Stack",
    description: "Modern shopping experience with headless CMS integration",
    fullDescription: "A high-performance e-commerce solution featuring server-side rendering, optimistic UI updates, and a headless CMS for content management. Includes advanced features like AI-powered product recommendations and dynamic pricing.",
    technologies: ["Next.js", "Stripe", "Sanity", "Tailwind CSS"],
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "Health Tracking App",
    category: "Mobile & Web",
    description: "Cross-platform health and wellness tracking solution",
    fullDescription: "A wellness companion app that syncs across devices, tracking fitness metrics, nutrition, and mental health. Features include wearable device integration, personalized insights, and gamification elements to encourage healthy habits.",
    technologies: ["React Native", "Node.js", "MongoDB", "HealthKit"],
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "AI Content Studio",
    category: "AI/ML",
    description: "Generative AI tools for creative professionals",
    fullDescription: "An AI-powered creative suite that helps content creators generate, edit, and optimize their work. Includes text generation, image editing, and automated content optimization using cutting-edge machine learning models.",
    technologies: ["Python", "TensorFlow", "FastAPI", "React"],
    image: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    liveUrl: "#",
    githubUrl: "#"
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
                <div
                  className="h-48 w-full"
                  style={{ background: project.image }}
                />
                
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
              className="relative w-full max-w-2xl bg-background rounded-3xl shadow-modal overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              <div
                className="h-[19rem] w-full"
                style={{ background: selectedProject.image }}
              />

              {/* Content */}
              <div className="p-8">
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
                      className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover-lift"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      className="flex items-center gap-2 px-6 py-3 border border-border rounded-full text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
                  )}
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
