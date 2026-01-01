import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
  highlight: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Senior Developer",
    company: "Tech Corp",
    duration: "2023 - Present",
    description: "Leading frontend architecture and mentoring junior developers.",
    highlight: "01",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "StartupXYZ",
    duration: "2021 - 2023",
    description: "Built scalable web applications using React and Node.js.",
    highlight: "02",
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Digital Agency",
    duration: "2019 - 2021",
    description: "Crafted responsive interfaces and improved UX performance.",
    highlight: "03",
  },
  {
    id: 4,
    role: "Junior Developer",
    company: "WebStudio",
    duration: "2018 - 2019",
    description: "Developed landing pages and maintained client websites.",
    highlight: "04",
  },
];

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section id="experience" ref={containerRef} className="py-24 md:py-32 bg-background overflow-hidden">
      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-sm font-mono text-muted-foreground mb-2 tracking-widest uppercase">
              Career Path
            </p>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Experience
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">Scroll to explore</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>

      {/* Horizontal scroll cards */}
      <motion.div 
        style={{ x }}
        className="flex gap-6 px-6 md:px-12"
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative flex-shrink-0 w-[320px] md:w-[400px]"
          >
            {/* Large number background */}
            <span className="absolute -top-8 -left-2 text-[120px] md:text-[160px] font-bold text-muted/30 leading-none select-none pointer-events-none z-0 transition-colors duration-300 group-hover:text-muted/50">
              {exp.highlight}
            </span>

            {/* Card content */}
            <div className="relative z-10 pt-16 md:pt-20">
              {/* Duration badge */}
              <span className="inline-block px-3 py-1 text-xs font-mono bg-secondary text-muted-foreground rounded-full mb-4">
                {exp.duration}
              </span>

              {/* Role */}
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:translate-x-2 transition-transform duration-300">
                {exp.role}
              </h3>

              {/* Company */}
              <p className="text-lg text-muted-foreground font-medium mb-4">
                @ {exp.company}
              </p>

              {/* Divider */}
              <div className="w-12 h-[2px] bg-foreground mb-4 group-hover:w-20 transition-all duration-300" />

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-24 md:w-48" />
      </motion.div>

      {/* Mobile swipe hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs text-muted-foreground mt-8 md:hidden"
      >
        ← Swipe to explore →
      </motion.p>
    </section>
  );
};

export default Experience;
