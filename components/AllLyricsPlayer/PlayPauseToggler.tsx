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
      className={`flex gap-2 justify-center items-center p-2 rounded-full transition-colors duration-200 ease-in-out ${
        isPlaying
          ? "bg-zinc-950 text-zinc-400 shadow-inner font-bold text-xl border-2 border-zinc-400"
          : "bg-zinc-400 text-zinc-950 font-bold text-xl shadow-[0_0_0_2px_inset_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]"
      }`}
    >
      {isPlaying ? <Pause size={36} /> : <Play size={36} />}
    </button>
  );
}
