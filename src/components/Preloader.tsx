import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const codeSymbols = ['{', '}', '<', '/>', ';', '( )', '[ ]', '&&'];

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        >
          {/* Floating symbols */}
          {codeSymbols.map((symbol, i) => (
            <motion.span
              key={i}
              className="absolute text-muted-foreground/10 font-mono text-2xl md:text-4xl select-none"
              initial={{ 
                opacity: 0,
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
              }}
              animate={{ 
                opacity: [0, 0.3, 0],
                x: Math.random() * 600 - 300,
                y: Math.random() * 600 - 300,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            >
              {symbol}
            </motion.span>
          ))}

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Name with stagger animation */}
            <motion.div className="flex overflow-hidden">
              {'PORTFOLIO'.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-3xl md:text-5xl font-bold tracking-[0.3em] text-foreground"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative h-[2px] bg-border overflow-hidden"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-foreground"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </motion.div>

            {/* Percentage */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm font-mono text-muted-foreground tracking-widest"
            >
              {Math.round(progress)}%
            </motion.span>
          </div>

          {/* Bottom text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 text-xs text-muted-foreground tracking-[0.2em] uppercase"
          >
            Loading experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
