"use client";

import { useState, useEffect, useRef } from "react";
import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";
import ProgressBar from "@/components/AllLyricsPlayer/ProgressBar";
import StandardPlayer from "@/components/StandardPlayer";
import AutoPausePlayer from "@/components/AutoPausePlayer";

import { createStore, set, get } from "idb-keyval";

import { lyrics } from "./lyrics";

const AUDIO_URL = "./The Race MS.mp3";

export default function FreeSamplePage() {
  const [showAutoPausePlayer, setShowAutoPausePlayer] = useState(false);

  const [totalPlayTime, setTotalPlayTime] = useState(0);
  const lastPlayedTimeRef = useRef(0);
  const totalPlayTimeRef = useRef(0);

  const {
    audioRef,
    isPlaying,
    setIsPlaying,
    isReplaying,
    setIsReplaying,
    showTranslation,
    setShowTranslation,
    togglePlayPause,
    progress,
    handleLyricClick,
    activeLyricIndex,
    lyricRefsArray,
    handleReplay,
    clearReplayTimeout,
    setScrollLyricIntoView,
  } = useAllLyricsPlayer({
    audioKey: "the-race-ms",
    lyrics: lyrics,
  });

  useEffect(() => {
    // Check if the user has a total training time for the day
    const userStore = createStore(
      "msa--user",
      "the-race-ms--total-training-time"
    );
    const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    get(currentDate, userStore)
      .then((storedTime) => {
        if (storedTime) {
          setTotalPlayTime(storedTime);
          totalPlayTimeRef.current = storedTime;
        }
      })
      .catch((error) => {
        console.error("Error getting total training time:", error);
      });
  }, []);

  useEffect(() => {
    if (isPlaying) {
      lastPlayedTimeRef.current = Date.now();
      return;
    }

    if (lastPlayedTimeRef.current > 0) {
      const recentTotalPlayTime =
        (Date.now() - lastPlayedTimeRef.current) / 1000;
      totalPlayTimeRef.current += recentTotalPlayTime;

      const newTotalPlayTime = totalPlayTimeRef.current;
      setTotalPlayTime(newTotalPlayTime);

      const userStore = createStore(
        "msa--user",
        "the-race-ms--total-training-time"
      );
      const currentDate = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

      set(currentDate, newTotalPlayTime, userStore)
        .then(() => {
          console.log("Total training time set for today");
        })
        .catch((error) => {
          console.error("Error setting total training time:", error);
        });
    }
  }, [isPlaying]);

  return (
    <div>
      <ProgressBar progress={progress} />
      <audio ref={audioRef} src={AUDIO_URL} />

      <div>Total play time: {totalPlayTime}</div>

      {showAutoPausePlayer ? (
        <AutoPausePlayer
          lyrics={lyrics}
          activeLyricIndex={activeLyricIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isReplaying={isReplaying}
          setIsReplaying={setIsReplaying}
          showTranslation={showTranslation}
          setShowTranslation={setShowTranslation}
          handleReplay={handleReplay}
          clearReplayTimeout={clearReplayTimeout}
          setShowAutoPausePlayer={setShowAutoPausePlayer}
          setScrollLyricIntoView={setScrollLyricIntoView}
        />
      ) : (
        <StandardPlayer
          lyrics={lyrics}
          handleLyricClick={handleLyricClick}
          activeLyricIndex={activeLyricIndex}
          lyricRefsArray={lyricRefsArray}
          isPlaying={isPlaying}
          showTranslation={showTranslation}
          togglePlayPause={togglePlayPause}
          setShowTranslation={setShowTranslation}
          setShowAutoPausePlayer={setShowAutoPausePlayer}
        />
      )}
    </div>
  );
}
