import { useRef } from "react";

export const useSound = () => {
  const hoverSound = useRef<HTMLAudioElement>(
    new Audio("/sound/hover.mp3")
  );
  const clickSound = useRef<HTMLAudioElement>(
    new Audio("/sound/click.mp3")
  );

  hoverSound.current.volume = 1.0;
  clickSound.current.volume = 0.1;

  const playHover = () => {
    hoverSound.current.currentTime = 0;
    hoverSound.current.play();
  };

  const playClick = () => {
    clickSound.current.currentTime = 0;
    clickSound.current.play();
  };

  return { playHover, playClick };
};
