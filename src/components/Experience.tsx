import { motion } from 'framer-motion';
import { BriefcaseBusiness, Calendar, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    role: "Zoho Developer",
    company: "Tempsens",
    location: "Udaipur, India ",
    duration: "Oct 2025 - Present",
    description: "Leading frontend architecture and mentoring junior developers.",
    skills: ["Zoho", "Automations", "Node.js"],
  },
  {
    id: 2,
    role: "Software Developer Intern",
    company: "Nessco India",
    location: "Jaipur, India",
    duration: "2021 - 2023",
    description: "Built scalable web applications using React and Node.js.",
    skills: ["React", "MongoDB", "AWS"],
  },
  {
    id: 3,
    role: "Backend Developer",
    company: "CodeUp",
    location: "Jaipur, India",
    duration: "2019 - 2021",
    description: "Crafted responsive interfaces and improved UX performance.",
    skills: ["Node.js", "SQL", "Database Design", "REST APIs"],
  },
  {
    id: 4,
    role: "Software Developer Intern",
    company: "Nessco India",
    location: "Jaipur, India",
    duration: "2018 - 2019",
    description: "Developed landing pages and maintained client websites.",
    skills: ["HTML", "CSS", "JavaScript"],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            A journey through my professional career
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-5 h-5 rounded-full bg-background border-4 border-primary -translate-x-1/2 mt-6 z-10" />

                {/* Content card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass-panel  rounded-2xl bg-secondary border border-border p-6 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Duration badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-foreground mb-4">
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </div>

                    {/* Role & Company */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                        <BriefcaseBusiness className="w-5 h-5 text-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Empty space for alternating layout on desktop */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
