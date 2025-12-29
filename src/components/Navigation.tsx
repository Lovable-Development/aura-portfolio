import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Code2,
  FolderOpen,
  Mail,
  Github,
  FileText,
  ExternalLink,
  Download,
  X,
} from "lucide-react";

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "skills", icon: Code2, label: "Skills" },
  { id: "buddy", icon: Github, label: "Buddy" },
  { id: "projects", icon: FolderOpen, label: "Projects" },
  { id: "contact", icon: Mail, label: "Contact" },
];

// Replace this with your actual Google Drive resume link
const RESUME_DRIVE_LINK =
  "https://drive.google.com/file/d/1n7KbHmZt-BFzSmdmI1wxzkIC-8unTk4_/preview";

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
        <div className="glass-panel px-2 py-2 rounded-full shadow-soft">
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
                    <item.icon className="relative z-10 w-4 h-4" />
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
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Resume</span>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm overflow-hidden border-border/50 rounded-md"
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-[90vh] max-w-2xl bg-background rounded-3xl shadow-modal overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-row justify-between items-center ">
                <div className="flex justify-start items-center gap-2 ml-4 my-2">
                  <FileText className="w-6 h-6" />
                  <h1 className="text-xl md:text-xl font-medium text-black tracking-tight">Resume</h1>
                </div>
                <div className="flex justify-end items-center gap-2 mr-4 my-2">
                  <a
                    href={getDownloadLink(RESUME_DRIVE_LINK)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full hover:bg-primary/10"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <a
                    href={RESUME_DRIVE_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full hover:bg-primary/10"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Drive
                  </a>
                  {/* Close Button */}
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="flex items-center justify-center p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-secondary transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <hr className="border-2 mt-2 border-black w-full"></hr>
              <div className="flex-1 h-full">
                <iframe
                  src={getEmbedLink(RESUME_DRIVE_LINK)}
                  className="w-full h-[calc(90vh-60px)]"
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
