import { LucidePlay, LucidePause } from "lucide-react";

type PlayPauseTogglerProps = {
  isPlaying: boolean;
  onPlayPause: () => void;
};

export default function PlayPauseToggler({
  isPlaying,
  onPlayPause,
}: PlayPauseTogglerProps) {
  const ariaLabel = isPlaying ? "Pause" : "Play";
  return (
    <button onClick={onPlayPause} aria-label={ariaLabel}>
      {isPlaying ? (
        <LucidePause stroke="white" fill="white" size={32} />
      ) : (
        <LucidePlay stroke="white" fill="white" size={32} />
      )}
    </button>
  );
}
