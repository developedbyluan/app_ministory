import { Pause, Play } from "lucide-react";

type PlayPauseTogglerProps = {
  isPlaying: boolean;
  isReplaying: boolean;
  togglePlayPause: () => void;
  playPauseAriaLabel: string;
};

export default function PlayPauseToggler({
  isPlaying,
  isReplaying,
  togglePlayPause,
  playPauseAriaLabel,
}: PlayPauseTogglerProps) {
  return (
    <button
      disabled={isReplaying}
      onClick={togglePlayPause}
      aria-label={playPauseAriaLabel}
      className={`flex gap-2 justify-center items-center px-4 py-2 rounded-full transition-all duration-300 ease-in-out border-2 ${
        isPlaying
          ? "bg-black text-white shadow-inner font-bold text-xl border-white"
          : "bg-white text-black font-bold text-xl shadow-[0_0_0_2px_inset_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] "
      }`}
    >
      {isPlaying ? "Pause" : "Play"}
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
}
