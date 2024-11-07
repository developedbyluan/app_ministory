import TranslationToggle from "./TranslationToggle";
import { Dispatch, SetStateAction } from "react";
import PlayPauseToggler from "./PlayPauseToggler";
import { PanelBottomOpenIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

type AudioControlsProps = {
  isReplaying: boolean;
  isPlaying: boolean;
  togglePlayPause: () => void;
  changePlaybackRate: () => void;
  playbackRate: number;
  showTranslation: boolean;
  setShowTranslation: Dispatch<SetStateAction<boolean>>;
  setShowAutoPauseMode: Dispatch<SetStateAction<boolean>>;
};

export default function AudioControls({
  isReplaying,
  isPlaying,
  togglePlayPause,
  changePlaybackRate,
  playbackRate,
  showTranslation,
  setShowTranslation,
  setShowAutoPauseMode,
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
        <>
          <button
            className="bg-zinc-400 p-2 rounded-full hover:bg-zinc-100 transition-colors duration-300 order-1"
            onClick={() => router.push("/upload-audio")}
            aria-label="Close"
          >
            <X />
          </button>
          <div className="order-4">
            <TranslationToggle
              showTranslation={showTranslation}
              setShowTranslation={setShowTranslation}
            />
          </div>

          <button
            className="font-bold text-zinc-400 text-lg order-2"
            onClick={changePlaybackRate}
            aria-label={`Change playback rate to ${playbackRate}x`}
          >
            {playbackRate.toFixed(2)}x
          </button>

          <button
            className="bg-zinc-400 p-2 rounded-full font-bold order-5"
            aria-label="Open Auto-Pause Mode"
            onClick={() => setShowAutoPauseMode(true)}
          >
            <PanelBottomOpenIcon size={24} />
          </button>
        </>
      )}
      {!isReplaying ? (
        <div className="order-3">
          <PlayPauseToggler
            isPlaying={isPlaying}
            isReplaying={isReplaying}
            togglePlayPause={togglePlayPause}
            playPauseAriaLabel={playPauseAriaLabel}
          />
        </div>
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
