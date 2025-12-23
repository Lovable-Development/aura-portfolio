import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { motion } from "framer-motion";

const skills = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "GraphQL", icon: "◈" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "Git", icon: "📦" },
  { name: "Figma", icon: "🎨" },
  { name: "Next.js", icon: "▲" },
  { name: "Tailwind", icon: "💨" },
];

const GravitySkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [skillPositions, setSkillPositions] = useState<{ x: number; y: number; angle: number; id: number }[]>([]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.offsetWidth;
    const height = 500;

    canvas.width = width;
    canvas.height = height;

    // Create engine
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8 }
    });
    engineRef.current = engine;

    // Create renderer (invisible - we render React components)
    const render = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio
      }
    });

    // Create walls
    const wallOptions = { isStatic: true, render: { visible: false } };
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + 30, width, 60, wallOptions), // floor
      Matter.Bodies.rectangle(-30, height / 2, 60, height, wallOptions), // left
      Matter.Bodies.rectangle(width + 30, height / 2, 60, height, wallOptions), // right
    ];

    // Create skill bodies
    const bodies = skills.map((_, index) => {
      const x = Math.random() * (width - 100) + 50;
      const y = Math.random() * -400 - 50;
      return Matter.Bodies.rectangle(x, y, 70, 70, {
        chamfer: { radius: 16 },
        restitution: 0.4,
        friction: 0.3,
        frictionAir: 0.01,
        label: `skill-${index}`,
      });
    });

    Matter.Composite.add(engine.world, [...walls, ...bodies]);

    // Mouse control
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Matter.Composite.add(engine.world, mouseConstraint);

    // Keep mouse in sync
    render.mouse = mouse;

    // Update skill positions
    const updatePositions = () => {
      const positions = bodies.map((body, id) => ({
        x: body.position.x,
        y: body.position.y,
        angle: body.angle,
        id
      }));
      setSkillPositions(positions);
    };

    // Run engine
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Animation loop
    const animate = () => {
      updatePositions();
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.offsetWidth;
      canvas.width = newWidth;
      
      // Update walls
      Matter.Body.setPosition(walls[0], { x: newWidth / 2, y: height + 30 });
      Matter.Body.setPosition(walls[2], { x: newWidth + 30, y: height / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Render.stop(render);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="skills" className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
            Technologies
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Skills & Tools
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">
            Drag, throw, and play with the technologies I work with daily.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full h-[500px] rounded-3xl bg-secondary/30 border border-border overflow-hidden"
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          
          {skillPositions.map((pos) => (
            <div
              key={pos.id}
              className="skill-icon absolute pointer-events-none"
              style={{
                left: pos.x - 35,
                top: pos.y - 35,
                transform: `rotate(${pos.angle}rad)`,
              }}
            >
              <span className="text-2xl">{skills[pos.id].icon}</span>
            </div>
          ))}

          {/* Skill Labels */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center flex-wrap gap-2 px-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full backdrop-blur-sm"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default GravitySkills;
