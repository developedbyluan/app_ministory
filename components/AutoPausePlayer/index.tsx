"use client";

import { Dispatch, SetStateAction, useState } from "react";
import PhrasePopovers from "./PhrasePopovers";
import AudioControlsV2 from "@/components/AudioControlsV2";
import { Lyric, Phrases } from "@/types/types";
import WordList from "@/components/AutoPauseMode/WordList";
import { useSpeech } from "@/hooks/useSpeech";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

type AutoPausePlayerProps = {
  lyrics: Lyric[];
  phrasesCollection: Phrases[];
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
  phrasesCollection,
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
  const [showWordList, setShowWordList] = useState(false);

  const { speakPhrase } = useSpeech();

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
      <div className="w-full flex flex-col justify-center h-5/6 mt-14 px-4">
        <PhrasePopovers
          sentenceAsPhrases={phrasesCollection[currentIndex]}
          showIpa={false}
        />
        {showTranslation && (
          <p
            className="text-zinc-800 text-sm mx-1"
            style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
          >
            {lyrics[currentIndex].translation}
          </p>
        )}
        <button
          onClick={() => setShowWordList((prev) => !prev)}
          className="flex items-center gap-x-1 mx-auto text-xs text-gray-600"
        >
          {showWordList ? "hide" : "show"} word list
          {showWordList ? (
            <ChevronUpIcon width={16} height={16} />
          ) : (
            <ChevronDownIcon width={16} height={16} />
          )}
        </button>
        {showWordList && (
          <div className="h-3/5 overflow-y-auto pb-4 bg-zinc-100 mt-4 rounded-t-xl">
            <WordList
              phrases={phrasesCollection[currentIndex].phrases}
              isReplaying={isReplaying}
              speakPhrase={speakPhrase}
            />
          </div>
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
