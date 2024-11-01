import { useState, useRef, useEffect } from "react";

export default function useAllLyricsPlayer({
  audioUrl,
}: {
  audioUrl: string | null;
}) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLyricIndex, setActiveLyricIndex] = useState<number>(-1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", updateTime);

    return () => audio.removeEventListener("timeupdate", updateTime);
  }, [audioUrl]);

  function handleLyricClick(
    clickedLyricIndex: number,
    startTime: number,
    endTime: number
  ) {
    if (isPlaying) return;

    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = startTime;
    audio.play();
    setIsPlaying(true);
    setActiveLyricIndex(clickedLyricIndex);
    setTimeout(() => {
      audio.currentTime = endTime;
      audio.pause();
      setIsPlaying(false);
      setActiveLyricIndex(-1);
    }, (endTime - startTime) * 1000);
  }
  return {
    currentTime,
    setCurrentTime,
    audioRef,
    handleLyricClick,
    isPlaying,
    activeLyricIndex,
  };
}
