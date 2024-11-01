import { useState, useRef, useEffect } from "react";
import { Lyric } from "@/types/types";

type UseAllLyricsPlayerProps = {
  audioUrl: string | null;
  lyrics: Lyric[] | undefined;
};

export default function useAllLyricsPlayer({
  audioUrl,
  lyrics,
}: UseAllLyricsPlayerProps) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLyricIndex, setActiveLyricIndex] = useState<number>(-1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricRefsArray = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", updateTime);

    return () => audio.removeEventListener("timeupdate", updateTime);
  }, [audioUrl]);

  useEffect(() => {
    if (!lyrics) return;

    const newActiveLyricIndex = lyrics?.findIndex((lyric, index) => {
      const newLyric = lyrics[index + 1];
      return (
        currentTime >= lyric.startTime &&
        (!newLyric || currentTime <= newLyric.startTime)
      );
    });

    if (newActiveLyricIndex !== activeLyricIndex) {
      setActiveLyricIndex(newActiveLyricIndex);
    }

    if (newActiveLyricIndex !== -1) {
      lyricRefsArray.current[newActiveLyricIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [currentTime, lyrics, activeLyricIndex]);

  function handleLyricClick(
    clickedLyricIndex: number,
    startTime: number,
    endTime: number
  ) {
    if (isPlaying) return;

    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = startTime;
    console.log("startTime", startTime);
    audio.play();
    setIsPlaying(true);
    setActiveLyricIndex(clickedLyricIndex);
    setTimeout(() => {
      audio.currentTime = endTime;
      audio.pause();
      setIsPlaying(false);
      setActiveLyricIndex(-1);
      console.log("currentTime", currentTime);
    }, (endTime - startTime) * 1000);
  }
  return {
    currentTime,
    setCurrentTime,
    audioRef,
    lyricRefsArray,
    handleLyricClick,
    isPlaying,
    activeLyricIndex,
  };
}
