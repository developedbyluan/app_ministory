import { useState, useRef, useEffect } from "react";
import { Lyric } from "@/types/types";

import { useDataContext } from "@/contexts/DataContext";
import { createStore, get } from "idb-keyval";

type UseAllLyricsPlayerProps = {
  audioKey: string | null;
  lyrics: Lyric[] | undefined;
};

export default function useAllLyricsPlayer({
  audioKey,
  lyrics,
}: UseAllLyricsPlayerProps) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLyricIndex, setActiveLyricIndex] = useState<number>(-1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const lyricRefsArray = useRef<HTMLParagraphElement[]>([]);

  const [isReplaying, setIsReplaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [showTranslation, setShowTranslation] = useState(false);

  const [progress, setProgress] = useState(0);

  const [scrollLyricIntoView, setScrollLyricIntoView] = useState(false);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { audioFile } = useDataContext();

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

    if (newActiveLyricIndex !== activeLyricIndex || scrollLyricIntoView) {
      setActiveLyricIndex(newActiveLyricIndex);
    }

    if (newActiveLyricIndex !== -1) {
      lyricRefsArray.current[newActiveLyricIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      setScrollLyricIntoView(false);
    }

    const newProgress =
      (currentTime /
        (lyrics[lyrics.length - 1].endTime - lyrics[0].startTime)) *
      100;
    setProgress(newProgress);
  }, [
    currentTime,
    lyrics,
    activeLyricIndex,
    showTranslation,
    scrollLyricIntoView,
  ]);

  useEffect(() => {
    if (!audioKey) return;

    if (audioFile) {
      setAudioUrl(URL.createObjectURL(audioFile));
      return;
    }

    const customStore = createStore("msa--english", "mp3");

    get(audioKey, customStore).then((file) => {
      if (!file) {
        throw new Error("No audio file found in local database");
      }
      setAudioUrl(URL.createObjectURL(file));
    });
  }, [audioFile, audioKey]);

  function handleLyricClick(clickedLyricIndex: number, startTime: number) {
    if (isPlaying) return;

    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = startTime;
    audio.play();
    setIsPlaying(true);
  }

  function togglePlayPause() {
    if (isReplaying) return;

    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    audio.play();
    setIsPlaying(true);
  }

  function changePlaybackRate() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = playbackRate > 1.5 ? 0.75 : playbackRate + 0.25;
    setPlaybackRate(audio.playbackRate);
  }

  function handleReplay(
    lyricIndex: number,
    startTime: number,
    endTime: number
  ) {
    if (isPlaying) return;

    const audio = audioRef.current;

    if (!audio) return;

    audio.currentTime = startTime;
    audio.play();
    setIsPlaying(true);
    setIsReplaying(true);
    setActiveLyricIndex(lyricIndex);
    setTimeout(() => {
      audio.currentTime = endTime;
      audio.pause();
      setIsPlaying(false);
      setIsReplaying(false);
    }, ((endTime - startTime) * 1000) / playbackRate);
  }

  return {
    currentTime,
    setCurrentTime,
    audioRef,
    lyricRefsArray,
    handleLyricClick,
    isPlaying,
    activeLyricIndex,
    togglePlayPause,
    isReplaying,
    playbackRate,
    changePlaybackRate,
    showTranslation,
    setShowTranslation,
    progress,
    audioUrl,
    setScrollLyricIntoView,
    handleReplay,
  };
}
