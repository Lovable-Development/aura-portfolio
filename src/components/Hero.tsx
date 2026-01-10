import { motion } from "framer-motion";
import Parallax from "./Parallax";
import { useSound } from "@/hooks/use-sound";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { BorderBeam } from "@/components/ui/border-beam";

const floatingSymbols = [
  { symbol: "{", x: "10%", y: "15%", delay: 0, size: "text-4xl" },
  { symbol: "}", x: "90%", y: "20%", delay: 0.5, size: "text-5xl" },
  { symbol: ";", x: "25%", y: "82%", delay: 2.5, size: "text-6xl" },
  { symbol: "</>", x: "20%", y: "25%", delay: 3, size: "text-3xl" },
  { symbol: "{ }", x: "5%", y: "40%", delay: 4, size: "text-3xl" },
  { symbol: "!", x: "75%", y: "75%", delay: 5.5, size: "text-6xl" },
];

const Hero = () => {
  const { playHover, playClick } = useSound();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid Background */}
      {/* <div className="absolute inset-0 grid-background opacity-80" /> */}

      {/* Floating Code Symbols */}
      {floatingSymbols.map((item, index) => (
        <motion.span
          key={index}
          className={`floating-symbol font-mono ${item.size} text-foreground font-light`}
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.08, 0.15, 0.08],
            y: [0, -12, 0, -6, 0],
            x: [0, 4, 0, -4, 0],
            rotate: [0, 3, 0, -3, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 7 + index * 0.4,
            delay: item.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.symbol}
        </motion.span>
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          className="mt-3 flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Parallax />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase ">
            <TypingAnimation
              startOnView
              typeSpeed={60}
              words={["Software Developer", "Zoho Developer", "3D Animator"]}
              loop
            />
            {/* Software Developer */}
          </p>
        </motion.div>

        {/* <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Sachin Gupta
        </motion.h1> */}
        <motion.div className="flex justify-center overflow-hidden">
          {"Sachin Gupta".split("").map((letter, i) => (
            <motion.h1
              key={i}
              className="inline-block text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tight text-foreground"
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.h1>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-md mx-auto font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Crafting elegant digital experiences through clean code and thoughtful
          design.
        </motion.p>

        <motion.div
          className="mt-12 flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <a
            href="#projects"
            className="ml-3 px-8 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium hover-lift "
            onMouseEnter={playHover}
            onClick={playClick}
          >
            View Work
          </a>
          <BorderBeam duration={8} size={100} />
          <a
            href="#contact"
            className="ml-6 px-8 py-3 border border-border rounded-full text-sm font-medium text-foreground hover-lift hover:bg-secondary hover:shadow-lg"
            onMouseEnter={playHover}
            onClick={playClick}
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
