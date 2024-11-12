import { cn } from "@/lib/utils";

type PauseTouchAreaProps = {
  isPlaying: boolean;
  isReplaying: boolean;
  onPlayPause: () => void;
  onReplay: () => void;
};

export default function PauseTouchArea({
  isPlaying,
  isReplaying,
  onPlayPause,
  onReplay,
}: PauseTouchAreaProps) {
  function handleClick() {
    if (isPlaying) {
      onPlayPause();
    }

    if (isReplaying) {
      onReplay();
    }
  }
  return (
    <div
      id="pause-touch-area"
      role="button"
      aria-label="Pause audio"
      onClick={handleClick}
      className={cn(
        "fixed inset-0 bg-zinc-400/50 z-50",
        isPlaying || isReplaying ? "block" : "hidden"
      )}
    ></div>
  );
}
