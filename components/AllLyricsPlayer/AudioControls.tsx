import { Button } from "@/components/ui/button";
import TranslationToggle from "./TranslationToggle";
import { Dispatch, SetStateAction } from "react";
import PlayPauseToggler from "./PlayPauseToggler";

type AudioControlsProps = {
  isReplaying: boolean;
  isPlaying: boolean;
  togglePlayPause: () => void;
  changePlaybackRate: () => void;
  playbackRate: number;
  showTranslation: boolean;
  setShowTranslation: Dispatch<SetStateAction<boolean>>;
};

export default function AudioControls({
  isReplaying,
  isPlaying,
  togglePlayPause,
  changePlaybackRate,
  playbackRate,
  showTranslation,
  setShowTranslation,
}: AudioControlsProps) {
  const playPauseAriaLabel = isPlaying ? "Pause" : "Play";

  return (
    <div
      className={`w-full bg-white/95 fixed bottom-0 left-0 flex items-center py-4 px-4 ${
        isReplaying || isPlaying ? "justify-center" : "justify-between"
      }`}
    >
      {!isPlaying && !isReplaying && (
        <>
          <TranslationToggle
            showTranslation={showTranslation}
            setShowTranslation={setShowTranslation}
          />

          <Button
            variant="ghost"
            className="font-extrabold text-2xl order-3"
            onClick={changePlaybackRate}
            aria-label={`Change playback rate to ${playbackRate}x`}
          >
            {playbackRate}x
          </Button>
        </>
      )}
      {!isReplaying ? (
        <PlayPauseToggler
          isPlaying={isPlaying}
          isReplaying={isReplaying}
          togglePlayPause={togglePlayPause}
          playPauseAriaLabel={playPauseAriaLabel}
        />
      ) : (
        <p
          className="w-full text-zinc-950 px-4 py-2 font-bold text-center text-xl"
          aria-label="Replaying..."
        >
          ...
        </p>
      )}
    </div>
  );
}
