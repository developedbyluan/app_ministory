import { explanationaryDB } from "@/data/explanationaryDB";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { X } from "lucide-react";

type AutoPauseModeProps = {
  activeLyricIndex: number;
  audioKey: string;
  setShowAutoPauseMode: Dispatch<SetStateAction<boolean>>;
};

export default function AutoPauseMode({
  activeLyricIndex,
  audioKey,
  setShowAutoPauseMode,
}: AutoPauseModeProps) {
  const explanationary = explanationaryDB.get(`e-${audioKey}`);
  const [currentExplanationaryIndex, setCurrentExplanationaryIndex] =
    useState<number>(0);

  useEffect(() => {
    if (!activeLyricIndex || !explanationary) return;
    if (activeLyricIndex < 0) return;
    setCurrentExplanationaryIndex(activeLyricIndex);
  }, [explanationary, activeLyricIndex]);

  return (
    <div className="absolute pt-8 px-4 inset-0 bottom-[5.25rem] rounded-b-xl bg-white">
      <div>
        {explanationary && explanationary[currentExplanationaryIndex] ? (
          <p>{explanationary[currentExplanationaryIndex].english_sentence}</p>
        ) : (
          <p>No explanationary found</p>
        )}
      </div>
      <div className="w-full bg-zinc-950 p-4 rounded-tl-xl rounded-tr-xl fixed bottom-0 left-0 right-0 flex items-center justify-between">
        <p>AudioControls for AutoPauseMode</p>
        <button
          className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-300"
          onClick={() => setShowAutoPauseMode(false)}
        >
          <X />
        </button>
      </div>
    </div>
  );
}
