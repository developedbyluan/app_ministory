import { explanationaryDB } from "@/data/msa--english/explanationary";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Repeat1, StepBack, StepForward, X } from "lucide-react";
import PhrasePopover from "./PhrasePopover";
import { Lyric } from "@/types/types";
import WordList from "./WordList";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import TranslationToggle from "../AllLyricsPlayer/TranslationToggle";
import { useSpeech } from "@/hooks/useSpeech";

type AutoPauseModeProps = {
  activeLyricIndex: number;
  audioKey: string;
  setShowAutoPauseMode: Dispatch<SetStateAction<boolean>>;
  lyrics: Lyric[] | undefined;
  setScrollLyricIntoView: Dispatch<SetStateAction<boolean>>;
  isReplaying: boolean;
  showTranslation: boolean;
  setShowTranslation: Dispatch<SetStateAction<boolean>>;
  handleReplay: (
    lyricIndex: number,
    startTime: number,
    endTime: number
  ) => void;
};

export default function AutoPauseMode({
  activeLyricIndex,
  audioKey,
  setShowAutoPauseMode,
  lyrics,
  setScrollLyricIntoView,
  isReplaying,
  showTranslation,
  setShowTranslation,
  handleReplay,
}: AutoPauseModeProps) {
  const explanationary = explanationaryDB.get(audioKey);
  const [currentExplanationaryIndex, setCurrentExplanationaryIndex] =
    useState<number>(activeLyricIndex);
  const { speakPhrase } = useSpeech();
  function stepForward() {
    if (!explanationary || !lyrics) return;
    if (currentExplanationaryIndex >= explanationary.length - 1) return;
    handleReplay(
      currentExplanationaryIndex + 1,
      lyrics[currentExplanationaryIndex + 1].startTime,
      lyrics[currentExplanationaryIndex + 1].endTime
    );
    setCurrentExplanationaryIndex((prev) => prev + 1);
  }

  function stepBack() {
    if (currentExplanationaryIndex <= 0 || !lyrics) return;
    handleReplay(
      currentExplanationaryIndex - 1,
      lyrics[currentExplanationaryIndex - 1].startTime,
      lyrics[currentExplanationaryIndex - 1].endTime
    );
    setCurrentExplanationaryIndex((prev) => prev - 1);
  }

  function replayLyric() {
    if (!lyrics) return;
    handleReplay(
      currentExplanationaryIndex,
      lyrics[currentExplanationaryIndex].startTime,
      lyrics[currentExplanationaryIndex].endTime
    );
  }

  return (
    <div className="h-5/6 overflow-y-auto">
      <div className="relative h-full flex flex-col justify-evenly gap-y-4">
        {explanationary && explanationary[currentExplanationaryIndex] ? (
          <>
            <div>
              <PhrasePopover
                phrases={explanationary[currentExplanationaryIndex].phrases}
                isReplaying={isReplaying}
              />
              {showTranslation && (
                <div className="text-sm text-gray-800">
                  {lyrics?.[currentExplanationaryIndex].translation}
                </div>
              )}
            </div>
            {showTranslation && (
              <ScrollArea className="h-2/3 overflow-y-auto border-t">
                <WordList
                  phrases={explanationary![currentExplanationaryIndex].phrases}
                  speakPhrase={speakPhrase}
                  isReplaying={isReplaying}
                />
              </ScrollArea>
            )}
          </>
        ) : (
          <p>No explanationary found</p>
        )}
      </div>
      <div className="w-full bg-zinc-950 p-4 rounded-tl-xl rounded-tr-xl absolute bottom-0 left-0 right-0">
        {!isReplaying ? (
          <div
            id="auto-pause-mode-controls"
            className="flex items-center justify-between"
          >
            <button
              className="bg-zinc-400 p-2 rounded-full hover:bg-zinc-100 transition-colors duration-300"
              onClick={() => {
                setShowAutoPauseMode(false);
                setScrollLyricIntoView(true);
              }}
            >
              <X />
            </button>

            <button
              className="bg-zinc-400 p-2 rounded-full hover:bg-zinc-100 transition-colors duration-300"
              onClick={stepBack}
            >
              <StepBack />
            </button>
            <button
              className="bg-zinc-400 p-2 rounded-full hover:bg-zinc-100 transition-colors duration-300"
              onClick={stepForward}
            >
              <StepForward size={36} />
            </button>

            <TranslationToggle
              showTranslation={showTranslation}
              setShowTranslation={setShowTranslation}
            />

            <button
              className="bg-zinc-400 p-2 rounded-full hover:bg-zinc-100 transition-colors duration-300"
              onClick={replayLyric}
            >
              <Repeat1 />
            </button>
          </div>
        ) : (
          <p className="text-center text-white">...</p>
        )}
      </div>
    </div>
  );
}
