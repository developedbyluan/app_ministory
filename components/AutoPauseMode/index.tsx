import { explanationaryDB } from "@/data/msa--english/explanationary";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Languages, Repeat1, StepBack, StepForward, X } from "lucide-react";
import PhrasePopover from "./PhrasePopover";
import { Lyric } from "@/types/types";
import WordList from "./WordList";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type AutoPauseModeProps = {
  activeLyricIndex: number;
  audioKey: string;
  setShowAutoPauseMode: Dispatch<SetStateAction<boolean>>;
  handleLyricClick: (index: number, startTime: number, endTime: number) => void;
  lyrics: Lyric[] | undefined;
  setScrollLyricIntoView: Dispatch<SetStateAction<boolean>>;
  isReplaying: boolean;
  showTranslation: boolean;
  setShowTranslation: Dispatch<SetStateAction<boolean>>;
};

export default function AutoPauseMode({
  activeLyricIndex,
  audioKey,
  setShowAutoPauseMode,
  handleLyricClick,
  lyrics,
  setScrollLyricIntoView,
  isReplaying,
  showTranslation,
  setShowTranslation,
}: AutoPauseModeProps) {
  const explanationary = explanationaryDB.get(audioKey);
  const [currentExplanationaryIndex, setCurrentExplanationaryIndex] =
    useState<number>(activeLyricIndex);

  function stepForward() {
    if (!explanationary || !lyrics) return;
    if (currentExplanationaryIndex >= explanationary.length - 1) return;
    handleLyricClick(
      currentExplanationaryIndex + 1,
      lyrics[currentExplanationaryIndex + 1].startTime,
      lyrics[currentExplanationaryIndex + 1].endTime
    );
    setCurrentExplanationaryIndex((prev) => prev + 1);
  }

  function stepBack() {
    if (currentExplanationaryIndex <= 0 || !lyrics) return;
    handleLyricClick(
      currentExplanationaryIndex - 1,
      lyrics[currentExplanationaryIndex - 1].startTime,
      lyrics[currentExplanationaryIndex - 1].endTime
    );
    setCurrentExplanationaryIndex((prev) => prev - 1);
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
              className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-300"
              onClick={() => {
                setShowAutoPauseMode(false);
                setScrollLyricIntoView(true);
              }}
            >
              <X />
            </button>

            <button
              className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-300"
              onClick={stepBack}
            >
              <StepBack />
            </button>
            <button
              className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-300"
              onClick={stepForward}
            >
              <StepForward size={36} />
            </button>
            <button
              className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-300"
              onClick={() => setShowTranslation((prev) => !prev)}
            >
              <Languages />
            </button>
            <button
              className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-300"
              onClick={() => {
                if (!lyrics) return;
                handleLyricClick(
                  currentExplanationaryIndex,
                  lyrics[currentExplanationaryIndex].startTime,
                  lyrics[currentExplanationaryIndex].endTime
                );
              }}
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
