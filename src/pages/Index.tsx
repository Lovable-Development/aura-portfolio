import { useState } from "react";
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

  return (
    <AudioProvider>
      <SmoothCursor />
      <main className="min-h-screen bg-background">
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
