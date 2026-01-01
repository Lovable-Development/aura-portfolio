import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import GravitySkills from "@/components/GravitySkills";
import GitHubCompare from "@/components/GitHubCompare";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
          <Hero />
          <GravitySkills />
          <GitHubCompare />
          <Projects onModalChange={setIsProjectModalOpen} />
          <Contact />
          {!isProjectModalOpen && <Navigation />}
    </main>
  );
};

export default Index;
