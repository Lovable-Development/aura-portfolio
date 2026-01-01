import { useRef, useEffect, useState } from "react";

export const useAudio = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    audioRef.current = new Audio("/audio/space_sound1.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    audioRef.current.play().catch(() => {
      setIsPlaying(false);
    });

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const playAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }

    // setIsPlaying(!isPlaying);
  };
  return { playAudio, isPlaying };
};
