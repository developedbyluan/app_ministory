import { useState, useRef, useEffect } from "react";
import { Lyric } from "@/types/types";

import { createStore, get } from "idb-keyval";

type UseAllLyricsPlayerProps = {
  audioKey: string | null;
  lyrics: Lyric[] | undefined;
};

export default function useAllLyricsPlayer({
  audioKey,
  lyrics,
}: UseAllLyricsPlayerProps) {
  const [currentTime, setCurrentTime] = useState<number>(
    localStorage.getItem(`${audioKey}--currentTime`)
      ? parseInt(localStorage.getItem(`${audioKey}--currentTime`) || "0")
      : 0
  );
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

  const replayTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", updateTime);

    return () => audio.removeEventListener("timeupdate", updateTime);
  }, [audioUrl]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.addEventListener("loadedmetadata", () => {
      const localStorageCurrentTime = localStorage.getItem(
        `${audioKey}--currentTime`
      )
        ? parseInt(localStorage.getItem(`${audioKey}--currentTime`) || "0")
        : 0;

      audio.currentTime = localStorageCurrentTime;
    });
  }, [audioKey]);

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

    const customStore = createStore("msa--english", "mp3");

    get(audioKey, customStore).then((file) => {
      if (!file) {
        throw new Error("No audio file found in local database");
      }
      try {
        setAudioUrl(URL.createObjectURL(file));
      } catch (error) {
        // if the file is not a blob, create a blob
        if (!(file instanceof Blob)) {
          const blob = new Blob([file], { type: "audio/mp3" });
          setAudioUrl(URL.createObjectURL(blob));
        } else {
          console.error("Error creating object URL", error);
        }
      }
    });
  }, [audioKey]);

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
    replayTimeoutRef.current = setTimeout(() => {
      audio.currentTime = endTime;
      audio.pause();
      setIsPlaying(false);
      setIsReplaying(false);
    }, ((endTime - startTime) * 1000) / playbackRate);
  }

  function clearReplayTimeout() {
    if (!audioRef.current) return;

    if (replayTimeoutRef.current) {
      clearTimeout(replayTimeoutRef.current);
      replayTimeoutRef.current = null;

      if (lyrics && activeLyricIndex > -1) {
        audioRef.current.currentTime = lyrics[activeLyricIndex].startTime;
        audioRef.current.pause();
      }
    }
  }

  return {
    currentTime,
    setCurrentTime,
    audioRef,
    lyricRefsArray,
    handleLyricClick,
    isPlaying,
    setIsPlaying,
    activeLyricIndex,
    togglePlayPause,
    isReplaying,
    setIsReplaying,
    playbackRate,
    changePlaybackRate,
    showTranslation,
    setShowTranslation,
    progress,
    audioUrl,
    setScrollLyricIntoView,
    handleReplay,
    clearReplayTimeout,
  };
}
