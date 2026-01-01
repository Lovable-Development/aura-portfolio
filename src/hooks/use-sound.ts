import { useRef } from "react";

export const useSound = () => {
  const hoverSound = useRef<HTMLAudioElement>(
    new Audio("/sound/hover.wav")
  );
  const clickSound = useRef<HTMLAudioElement>(
    new Audio("/sound/click.wav")
  );

  hoverSound.current.volume = 0.3;
  clickSound.current.volume = 0.4;

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
