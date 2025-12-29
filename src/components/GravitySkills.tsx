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
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [gyroSupported, setGyroSupported] = useState(false);

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

    // Gyroscope control
    const clamp = (value: number, min: number, max: number) => {
      return Math.min(Math.max(value, min), max);
    };

    const updateGravity = (event: DeviceOrientationEvent) => {
      if (!gyroEnabled || !engineRef.current) return;

      const orientation = typeof window.orientation !== 'undefined' ? window.orientation : 0;
      const gravity = engineRef.current.gravity;
      const beta = event.beta || 0;
      const gamma = event.gamma || 0;

      if (orientation === 0) {
        gravity.x = clamp(gamma, -90, 90) / 90;
        gravity.y = clamp(beta, -90, 90) / 90;
      } else if (orientation === 180) {
        gravity.x = clamp(gamma, -90, 90) / 90;
        gravity.y = clamp(-beta, -90, 90) / 90;
      } else if (orientation === 90) {
        gravity.x = clamp(beta, -90, 90) / 90;
        gravity.y = clamp(-gamma, -90, 90) / 90;
      } else if (orientation === -90) {
        gravity.x = clamp(-beta, -90, 90) / 90;
        gravity.y = clamp(gamma, -90, 90) / 90;
      }
    };

    // Check if gyroscope is supported
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      setGyroSupported(true);
    }

    // Add event listener for gyroscope
    window.addEventListener('deviceorientation', updateGravity);

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
      window.removeEventListener('deviceorientation', updateGravity);
    };
  }, [gyroEnabled]);

  const handleGyroToggle = async () => {
    if (!gyroEnabled) {
      // Request permission for iOS 13+
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            setGyroEnabled(true);
          } else {
            alert('Permission to access device orientation was denied');
          }
        } catch (error) {
          console.error('Error requesting device orientation permission:', error);
        }
      } else {
        // Non-iOS devices or older iOS versions
        setGyroEnabled(true);
      }
    } else {
      setGyroEnabled(false);
      // Reset gravity to default
      if (engineRef.current) {
        engineRef.current.gravity.x = 0;
        engineRef.current.gravity.y = 0.8;
      }
    }
  };

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

          {/* Gyroscope Toggle Button */}
          {gyroSupported && (
            <div className="absolute top-4 right-4">
              <button
                onClick={handleGyroToggle}
                className={`text-xs font-medium px-4 py-2 rounded-lg backdrop-blur-sm border transition-all ${
                  gyroEnabled
                    ? 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800'
                }`}
              >
                📱 Gyro: {gyroEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          )}
        </div>

        {gyroSupported && (
          <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
            {gyroEnabled ? '🎮 Tilt your device to control gravity!' : '📱 Enable gyroscope to tilt and play'}
          </p>
        )}
      </div>
    </section>
  );
};

export default GravitySkills;