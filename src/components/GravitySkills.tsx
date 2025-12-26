import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const skills = [
  { name: "React", icon: "⚛️", color: "#61dafb" },
  { name: "TypeScript", icon: "📘", color: "#3178c6" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Python", icon: "🐍", color: "#3776ab" },
  { name: "GraphQL", icon: "◈", color: "#e10098" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "Docker", icon: "🐳", color: "#2496ed" },
  { name: "AWS", icon: "☁️", color: "#ff9900" },
  { name: "Git", icon: "📦", color: "#f05032" },
  { name: "Figma", icon: "🎨", color: "#f24e1e" },
  { name: "Next.js", icon: "▲", color: "#000000" },
  { name: "Tailwind", icon: "💨", color: "#06b6d4" },
];

const GravitySkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [skillPositions, setSkillPositions] = useState<{ x: number; y: number; angle: number; id: number }[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.offsetWidth;
    const height = 500;

    canvas.width = width;
    canvas.height = height;

    // Create engine with gentle gravity
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0.8 },
      constraintIterations: 6,
      positionIterations: 10,
      velocityIterations: 8,
    });
    engineRef.current = engine;

    // Create renderer
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

    // Create walls with proper thickness
    const wallThickness = 60;
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      friction: 0.6,
      restitution: 0.2,
    };
    
    const walls = [
      Matter.Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, wallOptions), // floor
      Matter.Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions), // left
      Matter.Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 2, wallOptions), // right
      Matter.Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, wallOptions), // ceiling
    ];

    // Create skill bodies in a grid layout to prevent initial collision
    const gridCols = 4;
    const gridRows = 3;
    const spacing = 100;
    const startX = (width - (gridCols - 1) * spacing) / 2;
    const startY = 80;

    const bodies = skills.map((_, index) => {
      const col = index % gridCols;
      const row = Math.floor(index / gridCols);
      const x = startX + col * spacing;
      const y = startY + row * spacing;
      
      return Matter.Bodies.circle(x, y, 35, {
        restitution: 0.4,
        friction: 0.6,
        frictionAir: 0.01,
        density: 0.001,
        label: `skill-${index}`,
        render: {
          fillStyle: skills[index].color,
        },
        slop: 0.05,
      });
    });

    // Initialize positions
    const initialPositions = bodies.map((body, id) => ({
      x: body.position.x,
      y: body.position.y,
      angle: body.angle,
      id
    }));
    setSkillPositions(initialPositions);

    Matter.Composite.add(engine.world, [...walls, ...bodies]);

    // Mouse control with smooth interaction
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.08,
        damping: 0.5,
        render: { visible: false }
      }
    });

    // Track dragging state
    Matter.Events.on(mouseConstraint, 'startdrag', () => {
      setIsDragging(true);
    });

    Matter.Events.on(mouseConstraint, 'enddrag', (event) => {
      setIsDragging(false);
      const body = (event as any).body;
      if (body) {
        // Limit velocity on release for smoother experience
        const maxVelocity = 12;
        const velocity = body.velocity;
        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
        if (speed > maxVelocity) {
          const scale = maxVelocity / speed;
          Matter.Body.setVelocity(body, {
            x: velocity.x * scale,
            y: velocity.y * scale
          });
        }
        
        // Limit angular velocity
        const maxAngularVelocity = 0.2;
        if (Math.abs(body.angularVelocity) > maxAngularVelocity) {
          Matter.Body.setAngularVelocity(
            body, 
            Math.sign(body.angularVelocity) * maxAngularVelocity
          );
        }
      }
    });

    Matter.Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Update skill positions smoothly
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
    const runner = Matter.Runner.create({
      delta: 1000 / 60,
      isFixed: true,
    });
    Matter.Runner.run(runner, engine);

    // Animation loop
    let animationId: number;
    const animate = () => {
      updatePositions();
      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.offsetWidth;
      canvas.width = newWidth;
      
      // Update wall positions
      Matter.Body.setPosition(walls[0], { x: newWidth / 2, y: height + wallThickness / 2 });
      Matter.Body.setPosition(walls[2], { x: newWidth + wallThickness / 2, y: height / 2 });
      Matter.Body.setPosition(walls[3], { x: newWidth / 2, y: -wallThickness / 2 });
      
      // Scale positions
      Matter.Body.scale(walls[0], newWidth / width, 1);
      Matter.Body.scale(walls[3], newWidth / width, 1);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      Matter.Render.stop(render);
      Matter.World.clear(engine.world, false);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="skills" className="py-24 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.3em] uppercase mb-4 text-blue-600 dark:text-blue-400 font-medium">
            Technologies
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Skills & Tools
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Drag, drop, and stack the technologies I work with daily.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative w-full h-[500px] rounded-3xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-200 dark:border-gray-700 overflow-hidden shadow-2xl"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          
          {skillPositions.map((pos) => (
            <div
              key={pos.id}
              className="absolute pointer-events-none transition-transform"
              style={{
                left: pos.x - 35,
                top: pos.y - 35,
                transform: `rotate(${pos.angle}rad)`,
                width: '70px',
                height: '70px',
              }}
            >
              <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform">
                <span className="text-3xl">{skills[pos.id].icon}</span>
              </div>
            </div>
          ))}

          {/* Skill Labels */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center flex-wrap gap-2 px-4 pointer-events-none">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-gray-800/80 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-300 dark:border-gray-600"
              >
                {skill.name}
              </span>
            ))}
          </div>

          {/* Instructions */}
          <div className="absolute top-4 left-4 text-xs text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-3 py-2 rounded-lg backdrop-blur-sm border border-gray-300 dark:border-gray-600">
            💡 Drag & drop to interact • Stack them up!
          </div>
        </div>
      </div>
    </section>
  );
};

export default GravitySkills;