import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import GravitySkills from "@/components/GravitySkills";
import Experience from "@/components/Experience";
import GitHubCompare from "@/components/GitHubCompare";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import { AudioProvider } from "@/hooks/AudioContext";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

const Index = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setShowCursor(mq.matches);

    const handleChange = (e: MediaQueryListEvent) => setShowCursor(e.matches);

    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <AudioProvider>
      {showCursor && <SmoothCursor />}

      <main className="relative min-h-screen bg-background">
        {/* Grid Background */}
        <div className="absolute inset-0 grid-background opacity-80" />
        {isLoading ? (
          <Preloader onComplete={() => setIsLoading(false)} />
        ) : (
          <>
            <Hero />
            <GravitySkills />
            <GitHubCompare />
            <Experience />
            <Projects onModalChange={setIsProjectModalOpen} />
            <Contact />
            {!isProjectModalOpen && <Navigation />}
          </>
        )}
      </main>
    </AudioProvider>
  );
};

export default Index;
