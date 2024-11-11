import React from "react";
import PlayPauseToggler from "./PlayPauseToggler";
import StepForwardButton from "./StepForwardButton";
import ReplayAudioButton from "./ReplayAudioButton";

import { cn } from "@/lib/utils";

interface AudioControlsProps {
  isPlaying?: boolean;
  onPlayPause?: () => void;
  isReplaying?: boolean;
  onReplay?: () => void;
  type: "standard" | "auto-pause";
}

export default function AudioControlsV2({
  isPlaying = false,
  onPlayPause = () => {},
  isReplaying = false,
  onReplay,
  type = "standard",
}: AudioControlsProps) {
  return (
    <div
      className={cn(
        "transition-all duration-[3000ms] ease-in-out",
        isReplaying ? "hidden" : "block"
      )}
    >
      <div className="w-full fixed bottom-0 left-0 right-0 px-1 pb-3">
        <div className="mx-auto bg-gradient-to-r from-zinc-700 via-zinc-700 to-zinc-600 rounded-3xl px-5 py-5 flex justify-between items-center">
          {type === "standard" && (
            <PlayPauseToggler isPlaying={isPlaying} onPlayPause={onPlayPause} />
          )}

          {type === "auto-pause" && (
            <>
              <StepForwardButton onPlaySingleLyric={onReplay} />
              <ReplayAudioButton onReplay={onReplay} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
