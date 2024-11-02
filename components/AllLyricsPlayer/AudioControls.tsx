import TranslationToggle from "./TranslationToggle";
import { Dispatch, SetStateAction } from "react";
import PlayPauseToggler from "./PlayPauseToggler";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

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

  const router = useRouter();
  return (
    <div
      className={`w-full bg-zinc-950 fixed bottom-0 left-0 right-0 flex items-center py-4 px-4 rounded-tl-xl rounded-tr-xl ${
        isReplaying || isPlaying ? "justify-center" : "justify-between"
      }`}
    >
      {!isPlaying && !isReplaying && (
        <button
          className="bg-transparent text-zinc-200 font-bold"
          onClick={() => router.back()}
          aria-label="Close"
        >
          <X />
        </button>
      )}
      <>
        <TranslationToggle
          showTranslation={showTranslation}
          setShowTranslation={setShowTranslation}
        />

        <button
          className="font-bold text-zinc-200 text-lg order-3"
          onClick={changePlaybackRate}
          aria-label={`Change playback rate to ${playbackRate}x`}
        >
          {playbackRate.toFixed(2)}x
        </button>
      </>
      {!isReplaying ? (
        <PlayPauseToggler
          isPlaying={isPlaying}
          isReplaying={isReplaying}
          togglePlayPause={togglePlayPause}
          playPauseAriaLabel={playPauseAriaLabel}
        />
      ) : (
        <p
          className="w-full text-white px-4 py-2 font-bold text-center text-xl"
          aria-label="Replaying..."
        >
          ...
        </p>
      )}
    </div>
  );
}
