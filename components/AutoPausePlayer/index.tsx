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
  isReplaying: boolean;
};

export default function AutoPausePlayer({
  lyrics,
  activeLyricIndex,
  handleReplay,
  showTranslation,
  setShowTranslation,
  isPlaying,
  isReplaying,
}: AutoPausePlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(
    activeLyricIndex > -1 ? activeLyricIndex : 0
  );

  function handleNextLyric() {
    console.log("phrasesCollection.length", phrasesCollection.length);
    if (currentIndex <= phrasesCollection.length - 2) {
      console.log("currentIndex", currentIndex);
      setCurrentIndex((prev) => prev + 1);
      handleReplay(
        currentIndex + 1,
        lyrics[currentIndex + 1].startTime,
        lyrics[currentIndex + 1].endTime
      );
    }
  }

  function replaySingleLyric() {
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
      />
    </div>
  );
}
