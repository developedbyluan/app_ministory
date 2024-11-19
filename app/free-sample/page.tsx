"use client";

import { useState, useEffect, useRef } from "react";
import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";
import ProgressBar from "@/components/AllLyricsPlayer/ProgressBar";
import StandardPlayer from "@/components/StandardPlayer";
import AutoPausePlayer from "@/components/AutoPausePlayer";

import { createStore, set, get } from "idb-keyval";

import { lyrics } from "./lyrics";
import { phrasesCollection } from "@/app/free-sample/phrases-collection";

const AUDIO_URL = "./The Race MS.mp3";

import { currentDate } from "@/helpers/current-date";
// const currentDate = "2024-11-29";

export default function FreeSamplePage() {
  const [showAutoPausePlayer, setShowAutoPausePlayer] = useState(false);

  const [totalPlayTime, setTotalPlayTime] = useState(0);
  const lastPlayedTimeRef = useRef(0);
  const totalPlayTimeRef = useRef(0);
  const lessonDataRef = useRef({});

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
    const userStore = createStore("msa--user", "total-training-time");

    get("the-race-ms", userStore)
      .then((storedTime) => {
        if (storedTime) {
          console.log("storedTime", storedTime);
          const totalPlayTime = storedTime[currentDate] || 0;
          setTotalPlayTime(totalPlayTime);
          totalPlayTimeRef.current = totalPlayTime;
          lessonDataRef.current = storedTime;
        }
      })
      .catch((error) => {
        console.error("Error getting total training time:", error);
      });
  }, []);

  useEffect(() => {
    console.log("lessonDataRef", lessonDataRef.current);
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

      const userStore = createStore("msa--user", "total-training-time");
      const updatedLessonData = {
        ...lessonDataRef.current,
        [currentDate]: newTotalPlayTime,
      };

      set("the-race-ms", updatedLessonData, userStore)
        .then(() => {
          console.log("Total training time set for today");
          lessonDataRef.current = updatedLessonData;
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
          phrasesCollection={phrasesCollection}
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
