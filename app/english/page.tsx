"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";
import ProgressBar from "@/components/AllLyricsPlayer/ProgressBar";
import StandardPlayer from "@/components/StandardPlayer";
import AutoPausePlayer from "@/components/AutoPausePlayer";

import { createStore, set, get } from "idb-keyval";

import { currentDate } from "@/helpers/current-date";
import { database } from "@/data/msa--english/database";

import { availableLessonsList } from "@/data/available-lessons-list";

import { Phrases, Lyric } from "@/types/types";

const AUDIO_URL = "./The Race MS.mp3";

export default function FreeSamplePage() {
  const [showAutoPausePlayer, setShowAutoPausePlayer] = useState(false);

  const [totalPlayTime, setTotalPlayTime] = useState(0);
  const lastPlayedTimeRef = useRef(0);
  const totalPlayTimeRef = useRef(0);
  const lessonDataRef = useRef({});

  const [indexedDBData, setIndexedDBData] = useState<{
    dictionary: Phrases[];
    lyrics: Lyric[];
  }>({
    dictionary: [],
    lyrics: [],
  });

  const searchParams = useSearchParams();
  const lessonId: IDBValidKey = searchParams.get("id") as IDBValidKey;

  const {
    audioRef,
    audioUrl,
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
    currentTime,
  } = useAllLyricsPlayer({
    audioKey: lessonId as string,
    lyrics: database.get(lessonId as string)?.lyrics || indexedDBData.lyrics,
  });

  useEffect(() => {
    const dictionaryStore = createStore("msa--english", "dictionary");
    const lyricsStore = createStore("msa--english", "lyrics");

    Promise.all([
      get(lessonId, dictionaryStore),
      get(lessonId, lyricsStore),
    ]).then(([dictionary, lyrics]) => {
      setIndexedDBData({ dictionary, lyrics });
    });
  }, [lessonId]);

  useEffect(() => {
    // Check if the user has a total training time for the day
    const userStore = createStore("msa--user", "total-training-time");

    get(lessonId, userStore)
      .then((storedTime) => {
        if (storedTime) {
          const totalPlayTime = storedTime[currentDate] || 0;
          setTotalPlayTime(totalPlayTime);
          totalPlayTimeRef.current = totalPlayTime;
          lessonDataRef.current = storedTime;
        }
      })
      .catch((error) => {
        console.error("Error getting total training time:", error);
      });
  }, [lessonId]);

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

      const userStore = createStore("msa--user", "total-training-time");
      const updatedLessonData = {
        ...lessonDataRef.current,
        [currentDate]: newTotalPlayTime,
      };

      set(lessonId, updatedLessonData, userStore)
        .then(() => {
          lessonDataRef.current = updatedLessonData;
        })
        .catch((error) => {
          console.error("Error setting total training time:", error);
        });

      localStorage.setItem(`${lessonId}--currentTime`, currentTime.toString());
      localStorage.setItem(
        `${lessonId}--activeLyricIndex`,
        activeLyricIndex.toString()
      );
    }
  }, [isPlaying, lessonId, currentTime, activeLyricIndex]);

  return (
    <div className="flex flex-col items-center py-4">
      <ProgressBar progress={progress} />
      <audio ref={audioRef} src={audioUrl || AUDIO_URL} />

      <div className="hidden">Total play time: {totalPlayTime}</div>
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold">
          {availableLessonsList.get(lessonId as string)?.title}
        </h1>
      </div>

      {showAutoPausePlayer ? (
        <AutoPausePlayer
          lyrics={
            indexedDBData.lyrics || database.get(lessonId as string)?.lyrics
          }
          phrasesCollection={
            indexedDBData.dictionary ||
            database.get(lessonId as string)?.dictionary
          }
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
          lyrics={
            indexedDBData.lyrics || database.get(lessonId as string)?.lyrics
          }
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
