import React from "react";
import PlayPauseToggler from "./AudioControlsV2Children/PlayPauseToggler";
import StepForwardButton from "./AudioControlsV2Children/StepForwardButton";

interface AudioControlsProps {
  isPlaying?: boolean;
  onPlayPause?: () => void;
  isReplaying?: boolean;
  type: "standard" | "audio-pause";
}

export default function AudioControlsV2({
  isPlaying = false,
  onPlayPause = () => {},
  isReplaying = false,
  type = "standard",
}: AudioControlsProps) {
  return (
    <div className="w-full fixed bottom-0 left-0 right-0 px-1 pb-3">
      <div className="mx-auto bg-gradient-to-r from-zinc-700 via-zinc-700 to-zinc-600 rounded-3xl px-5 py-5 flex justify-between items-center">
        {type === "standard" && (
          <PlayPauseToggler
            isPlaying={isPlaying}
            onPlayPause={onPlayPause}
            isReplaying={isReplaying}
          />
        )}

        {type === "audio-pause" && (
          <StepForwardButton isReplaying={isReplaying} />
        )}
      </div>
    </div>
  );
}
