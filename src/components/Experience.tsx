import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  duration: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Senior Developer",
    company: "Tech Corp",
    duration: "2023 - Present",
    description: "Leading frontend architecture and mentoring junior developers.",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "StartupXYZ",
    duration: "2021 - 2023",
    description: "Built scalable web applications using React and Node.js.",
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Digital Agency",
    duration: "2019 - 2021",
    description: "Crafted responsive interfaces and improved UX performance.",
  },
  {
    id: 4,
    role: "Junior Developer",
    company: "WebStudio",
    duration: "2018 - 2019",
    description: "Developed landing pages and maintained client websites.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A journey through my professional career
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border -translate-y-1/2 hidden md:block" />

          {/* Scrollable container */}
          <div className="flex gap-6 md:gap-0 overflow-x-auto pb-8 md:pb-0 scrollbar-hide snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-4">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex-shrink-0 w-72 md:w-auto snap-center ${
                  index % 2 === 0 ? 'md:self-start md:pb-20' : 'md:self-end md:pt-20'
                }`}
              >
                {/* Connector dot */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground border-4 border-background z-10"
                  style={{ top: index % 2 === 0 ? 'auto' : '0', bottom: index % 2 === 0 ? '0' : 'auto' }}
                />

                {/* Vertical connector line */}
                <div
                  className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-[2px] h-8 bg-border ${
                    index % 2 === 0 ? 'bottom-4' : 'top-4'
                  }`}
                />

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-panel rounded-2xl p-6 hover:shadow-lg transition-all duration-300 h-full"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <Briefcase className="w-5 h-5 text-foreground" />
                  </div>

                  {/* Role & Company */}
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    {exp.company}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.duration}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile scroll hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mt-4 md:hidden"
        >
          Swipe to explore →
        </motion.p>
      </div>
    </section>
  );
};

export default Experience;
