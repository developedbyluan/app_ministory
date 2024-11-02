import { Button } from "@/components/ui/button";
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
    <Button
      variant="playPause"
      disabled={isReplaying}
      onClick={togglePlayPause}
      aria-label={playPauseAriaLabel}
      className={`w-20 h-20 rounded-full fixed left-1/2 -translate-x-1/2 bottom-2 transition-all duration-300 ease-in-out ${
        isPlaying ? "" : "bg-secondary text-black border-2 border-black"
      }`}
    >
      {isPlaying ? <Pause /> : <Play />}
    </Button>
  );
}
