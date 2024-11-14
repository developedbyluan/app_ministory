"use client";

import { Dispatch, SetStateAction, useState } from "react";
import PhrasePopovers from "./PhrasePopovers";
import { phrasesCollection } from "@/app/free-sample/phrases-collection";
import AudioControlsV2 from "../AudioControlsV2";
import { Lyric } from "@/types/types";

type AutoPausePlayerProps = {
  lyrics: Lyric[];
  activeLyricIndex: number;
  handleReplay: (
    lyricIndex: number,
    startTime: number,
    endTime: number
  ) => void;
  showTranslation: boolean;
  setShowTranslation: Dispatch<SetStateAction<boolean>>;
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  isReplaying: boolean;
  setIsReplaying: Dispatch<SetStateAction<boolean>>;
  clearReplayTimeout: () => void;
  setShowAutoPausePlayer: Dispatch<SetStateAction<boolean>>;
  setScrollLyricIntoView: Dispatch<SetStateAction<boolean>>;
};

export default function AutoPausePlayer({
  lyrics,
  activeLyricIndex,
  handleReplay,
  showTranslation,
  setShowTranslation,
  isPlaying,
  setIsPlaying,
  isReplaying,
  setIsReplaying,
  clearReplayTimeout,
  setShowAutoPausePlayer,
  setScrollLyricIntoView,
}: AutoPausePlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(
    activeLyricIndex > -1 ? activeLyricIndex : 0
  );

  function handleNextLyric() {
    if (currentIndex >= phrasesCollection.length - 1) return;

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    handleReplay(
      nextIndex,
      lyrics[nextIndex].startTime,
      lyrics[nextIndex].endTime
    );
  }

  function replaySingleLyric() {
    if (isReplaying) {
      clearReplayTimeout();
      setIsReplaying((prev) => !prev);
      setIsPlaying((prev) => !prev);
      return;
    }

    if (currentIndex < lyrics.length - 1) {
      handleReplay(
        currentIndex,
        lyrics[currentIndex].startTime,
        lyrics[currentIndex].endTime
      );
    }
  }
  return (
    <div className="fixed inset-0 z-40 bg-zinc-50 flex h-svh justify-center">
      <div className="flex flex-col justify-center h-5/6 bg-red-100 mt-14 px-4">
        <PhrasePopovers
          sentenceAsPhrases={phrasesCollection[currentIndex]}
          showIpa={false}
        />
        {showTranslation && (
          <p className="text-gray-700 text-sm mx-1">
            {lyrics[currentIndex].translation}
          </p>
        )}
      </div>
      <AudioControlsV2
        type="auto-pause"
        isPlaying={isPlaying}
        isReplaying={isReplaying}
        showTranslation={showTranslation}
        onShowTranslation={() => setShowTranslation((prev) => !prev)}
        onReplay={replaySingleLyric}
        onNext={handleNextLyric}
        setShowAutoPausePlayer={setShowAutoPausePlayer}
        setScrollLyricIntoView={setScrollLyricIntoView}
      />
    </div>
  );
}
