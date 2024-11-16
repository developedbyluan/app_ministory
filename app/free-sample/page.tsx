"use client";

import { useState, useEffect } from "react";
import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";
import ProgressBar from "@/components/AllLyricsPlayer/ProgressBar";
import StandardPlayer from "@/components/StandardPlayer";
import AutoPausePlayer from "@/components/AutoPausePlayer";

import { createStore, set, get } from "idb-keyval";

import { lyrics } from "./lyrics";

const AUDIO_URL = "./The Race MS.mp3";

export default function FreeSamplePage() {
  const [showAutoPausePlayer, setShowAutoPausePlayer] = useState(false);
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
      .then((value) => {
        console.log("Total training time:", value);

        if (typeof value === "number") {
          return;
        }

        set(currentDate, 0, userStore)
          .then(() => {
            console.log("Total training time set for today");
          })
          .catch((error) => {
            console.error("Error setting total training time:", error);
          });
      })
      .catch((error) => {
        console.error("Error getting total training time:", error);
      });
  }, []);

  return (
    <div>
      <ProgressBar progress={progress} />
      <audio ref={audioRef} src={AUDIO_URL} />

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
