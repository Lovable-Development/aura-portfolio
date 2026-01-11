import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { motion } from "framer-motion";

const skills = [
  {
    name: "NextJS",
    icon: "▲",
    bg: "bg-neutral-900",
    text: "text-white",
  },

  {
    name: "React",
    icon: "⚛️",
    bg: "bg-cyan-100 border-cyan-300",
    text: "text-black",
  },
  {
    name: "TypeScript",
    icon: "TS",
    bg: "bg-blue-100 border-blue-300",
    text: "text-neutral-900 text-shadow-lg",
  },
  {
    name: "JavaScript",
    icon: "JS",
    bg: "bg-yellow-100 border-yellow-300",
    text: "text-yellow-700",
  },
  {
    name: "NodeJS",
    icon: "⬢",
    bg: "bg-green-100 border-green-300",
    text: "text-green-700",
  },
  {
    name: "Python",
    icon: "🐍",
    bg: "bg-blue-50 border-blue-300",
    text: "text-blue-700",
  },
  {
    name: "PostgreSQL",
    icon: "🐘",
    bg: "bg-indigo-100 border-indigo-300",
    text: "text-indigo-700",
  },
  {
    name: "SQL",
    icon: "◈",
    bg: "bg-pink-100 border-pink-300",
    text: "text-pink-700",
  },
  {
    name: "Git",
    icon: "⎇",
    bg: "bg-orange-100 border-orange-300",
    text: "text-orange-700",
  },
  {
    name: "Tailwind CSS",
    icon: "💨",
    bg: "bg-sky-100 border-sky-300",
    text: "text-sky-700",
  },
  {
    name: "AI",
    icon: "🤖",
    bg: "bg-purple-100 border-purple-300",
    text: "text-purple-700",
  },
  {
    name: "Automation",
    icon: "⚙️",
    bg: "bg-amber-100 border-amber-300",
    text: "text-amber-700",
  },
  {
    name: "Blender",
    icon: "",
    bg: "bg-[#e88114]",
    text: "text-[#255686]",
  },
];

type SkillBodyMeta = {
  width: number;
  height: number;
};

const GravitySkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const [skillPositions, setSkillPositions] = useState<
    {
      x: number;
      y: number;
      angle: number;
      id: number;
      width: number;
      height: number;
    }[]
  >([]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.offsetWidth;
    const height = 500;

    canvas.width = width;
    canvas.height = height;

    // Create engine with smoother physics
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1.5 },
      constraintIterations: 4,
      positionIterations: 8,
      velocityIterations: 6,
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
        pixelRatio: window.devicePixelRatio,
      },
    });

    // Create thicker walls to prevent escape
    const wallThickness = 100;
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
      friction: 0.8,
      restitution: 0.3,
    };
    const walls = [
      Matter.Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width + wallThickness * 2,
        wallThickness,
        wallOptions
      ), // floor
      Matter.Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height + wallThickness,
        wallOptions
      ), // left
      Matter.Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height + wallThickness,
        wallOptions
      ), // right
      Matter.Bodies.rectangle(
        width / 2,
        -wallThickness / 2,
        width + wallThickness * 2,
        wallThickness,
        wallOptions
      ), // ceiling
    ];

    function measureSkill(
      icon: string | React.ReactElement,
      text: string,
      font = "16px Inter"
    ) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;

      ctx.font = font;

      const textWidth = ctx.measureText(text).width;
      const iconStr = typeof icon === "string" ? icon : "📦";
      const iconWidth = ctx.measureText(iconStr).width;

      const paddingX = 24;
      const paddingY = 20;

      const width = textWidth + iconWidth + paddingX * 2;
      const height = 40 + paddingY; // single-line chip height

      return { width, height };
    }

    // Create skill bodies - spawn inside visible area
    const bodies = skills.map((skill, index) => {
      const { width: bodyWidth, height: bodyHeight } = measureSkill(
        skill.icon,
        skill.name
      );

      const x = Math.random() * (width - bodyWidth) + bodyWidth / 2;
      const y = 50 + Math.random() * 100;

      const body = Matter.Bodies.rectangle(x, y, bodyWidth, bodyHeight, {
        chamfer: { radius: 20 },
        restitution: 0.8,
        friction: 0.5,
        frictionAir: 0.02,
        density: 0.0025,
        label: `skill-${index}`,
      });

      // 👇 attach size metadata
      (body as Matter.Body & { meta: SkillBodyMeta }).meta = {
        width: bodyWidth,
        height: bodyHeight,
      };

      return body;
    });

    // Initialize positions immediately
    const initialPositions = bodies.map((body, id) => ({
      x: body.position.x,
      y: body.position.y,
      angle: body.angle,
      id,
      width: (body as Matter.Body & { meta: SkillBodyMeta }).meta.width,
      height: (body as Matter.Body & { meta: SkillBodyMeta }).meta.height,
    }));
    setSkillPositions(initialPositions);

    Matter.Composite.add(engine.world, [...walls, ...bodies]);

    // Mouse control with smoother interaction
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.05,
        damping: 0.1,
        length: 20,
        render: { visible: false },
      },
    });

    // Limit velocity on release to prevent throwing too hard
    Matter.Events.on(mouseConstraint, "enddrag", (event) => {
      const body = (event as unknown as { body: Matter.Body | null }).body;
      if (body) {
        const maxVelocity = 15;
        const velocity = body.velocity;
        const speed = Math.sqrt(
          velocity.x * velocity.x + velocity.y * velocity.y
        );
        if (speed > maxVelocity) {
          const scale = maxVelocity / speed;
          Matter.Body.setVelocity(body, {
            x: velocity.x * scale,
            y: velocity.y * scale,
          });
        }
      }
    });

    Matter.Composite.add(engine.world, mouseConstraint);

    // Keep mouse in sync
    render.mouse = mouse;

    // Update skill positions
    const updatePositions = () => {
      const positions = bodies.map((body, id) => {
        const meta = (body as Matter.Body & { meta: SkillBodyMeta }).meta;

        return {
          x: body.position.x,
          y: body.position.y,
          angle: body.angle,
          id,
          width: meta.width,
          height: meta.height,
        };
      });

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
    <section id="skills" className="relative py-24 px-4">
      {/* Grid Background */}
      {/* <div className="absolute inset-0 grid-background opacity-80" /> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="relative text-center mb-12">
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
          className="relative w-full h-[500px] rounded-3xl bg-gray-200/30 border border-border overflow-hidden"
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          {skillPositions.map((pos) => {
            const skill = skills[pos.id];

            return (
              <div
                key={pos.id}
                className={`absolute flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-md shadow-sm pointer-events-none select-none ${skill.bg} ${skill.text}`}
                style={{
                  width: pos.width,
                  height: pos.height,
                  left: pos.x - pos.width / 2,
                  top: pos.y - pos.height / 2,
                  transform: `rotate(${pos.angle}rad)`,
                }}
              >
                <span className="text-sm">{skill.icon}</span>
                <span className="text-lg font-bold whitespace-nowrap text-shadow-lg/30">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Skill Labels */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center flex-wrap gap-2 px-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-full backdrop-blur-sm border border-muted-foreground"
            >
              {skill.name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default GravitySkills;
