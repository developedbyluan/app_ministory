import { LucidePlay, LucidePause, PointerOff } from "lucide-react";
import { cn } from "@/lib/utils";

type PlayPauseTogglerProps = {
  isPlaying: boolean;
  onPlayPause: () => void;
  isReplaying: boolean;
};

export default function PlayPauseToggler({
  isPlaying,
  onPlayPause,
  isReplaying,
}: PlayPauseTogglerProps) {
  const ariaLabel = isPlaying ? "Pause" : "Play";
  return (
    <button
      onClick={onPlayPause}
      aria-label={ariaLabel}
      disabled={isReplaying}
      className={cn(isReplaying ? "opacity-10" : "opacity-100")}
    >
      {isReplaying ? (
        <PointerOff color="white" size={32} />
      ) : isPlaying ? (
        <LucidePause stroke="white" fill="white" size={32} />
      ) : (
        <LucidePlay stroke="white" fill="white" size={32} />
      )}
    </button>
  );
}
