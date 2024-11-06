// import { explanationaryDB } from "@/data/explanationaryDB";
import { explanationaryDB } from "@/data/msa--english/explanationary";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Languages, Repeat1, StepBack, StepForward, X } from "lucide-react";
import PhrasePopover from "./PhrasePopover";

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
  const explanationary = explanationaryDB.get(audioKey);
  const [currentExplanationaryIndex, setCurrentExplanationaryIndex] =
    useState<number>(activeLyricIndex);

  return (
    <div className="absolute pt-8 px-4 inset-0 bottom-[5.25rem] rounded-b-xl bg-white">
      <div className="h-3/4 bg-slate-50 flex flex-col justify-center items-start">
        {explanationary && explanationary[currentExplanationaryIndex] ? (
          <div>
            <PhrasePopover
              phrases={explanationary[currentExplanationaryIndex].phrases}
            />
          </div>
        ) : (
          <p>No explanationary found</p>
        )}
      </div>
      <div className="w-full bg-zinc-950 p-4 rounded-tl-xl rounded-tr-xl fixed bottom-0 left-0 right-0 flex items-center justify-between">
        <button
          className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-300"
          onClick={() => setShowAutoPauseMode(false)}
        >
          <X />
        </button>

        <button
          className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-300"
          onClick={() => {
            setCurrentExplanationaryIndex((prev) => prev - 1);
          }}
        >
          <StepBack />
        </button>
        <button
          className="bg-zinc-600 p-2 rounded-full hover:bg-zinc-500 transition-colors duration-300"
          onClick={() => {
            setCurrentExplanationaryIndex((prev) => prev + 1);
          }}
        >
          <StepForward size={36} />
        </button>
        <button className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-300">
          <Languages />
        </button>
        <button className="bg-zinc-800 p-2 rounded-full hover:bg-zinc-700 transition-colors duration-300">
          <Repeat1 />
        </button>
      </div>
    </div>
  );
}
