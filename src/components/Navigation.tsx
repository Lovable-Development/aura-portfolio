import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Code2,
  FolderOpen,
  User,
  Github,
  FileText,
  ExternalLink,
  Download,
  X,
  Volume2,
  VolumeOff,
  BriefcaseBusiness,
} from "lucide-react";
import { useAudio } from "@/hooks/AudioContext";
import { Dock,DockIcon } from "./ui/dock";


const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "buddy", icon: Github, label: "Buddy" },
  { id: "experience", icon: BriefcaseBusiness, label: "Experience" },
  { id: "projects", icon: FolderOpen, label: "Projects" },
  { id: "contact", icon: User, label: "Contact" },
];

// Replace this with your actual Google Drive resume link
const RESUME_DRIVE_LINK = import.meta.env.VITE_RESUME_DRIVE_LINK;

// Convert Google Drive view link to embed link
const getEmbedLink = (driveLink: string) => {
  const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return driveLink;
};

// Convert Google Drive view link to download link
const getDownloadLink = (driveLink: string) => {
  const match = driveLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }
  return driveLink;
};

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { playAudio, pauseAudio, isPlaying } = useAudio();

  const toggleSound = () => {
    isPlaying ? pauseAudio() : playAudio();
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="glass-panel px-2 py-2 rounded-full shadow-soft border-2">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <item.icon className="relative z-10 w-5 h-5" />
                    <span className="relative z-10 hidden sm:inline">
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
            {/* Resume Button */}
            <li>
              <button
                onClick={() => setIsResumeOpen(true)}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-primary/10"
              >
                <FileText className="relative z-10 w-5 h-5" />
                <span className="hidden sm:inline">Resume</span>
              </button>
            </li>
            {/* Sound Toggle Button */}
            <li>
              <button
                onClick={toggleSound}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 text-muted-foreground hover:text-foreground hover:bg-primary/10"
              >
                {isPlaying ? (
                  <Volume2 className="relative z-10 w-5 h-5" />
                ) : (
                  <VolumeOff className="relative z-10 w-5 h-5" />
                )}
                <span className="hidden sm:inline">Sound</span>
              </button>
            </li>
          </ul>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/10 backdrop-blur-md"
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl h-[85vh] bg-background rounded-2xl shadow-2xl overflow-hidden border border-border"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground tracking-tight">
                    Resume
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={getDownloadLink(RESUME_DRIVE_LINK)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-secondary"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <a
                    href={RESUME_DRIVE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-secondary"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="hidden sm:inline">Open</span>
                  </a>
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {/* Content */}
              <div className="h-[calc(85vh-65px)]">
                <iframe
                  src={getEmbedLink(RESUME_DRIVE_LINK)}
                  className="w-full h-full"
                  allow="autoplay"
                  title="Resume Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
