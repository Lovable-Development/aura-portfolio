import { createContext, useContext, useRef, useState } from "react";

const AudioContext = createContext<any>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const initAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/space.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15;
    }
  };

  const playAudio = () => {
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider
      value={{ initAudio, playAudio, pauseAudio, isPlaying }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
