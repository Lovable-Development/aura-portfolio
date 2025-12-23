import Hero from "@/components/Hero";
import GravitySkills from "@/components/GravitySkills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <GravitySkills />
      <Projects />
      <Contact />
      <Navigation />
    </main>
  );
};

export default Index;
