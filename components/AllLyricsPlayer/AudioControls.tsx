import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

type AudioControlsProps = {
  isReplaying: boolean;
  isPlaying: boolean;
  togglePlayPause: () => void;
  changePlaybackRate: () => void;
  playbackRate: number;
};

export default function AudioControls({
  isReplaying,
  isPlaying,
  togglePlayPause,
  changePlaybackRate,
  playbackRate,
}: AudioControlsProps) {
  return (
    <div className="w-full bg-zinc-500/80 fixed bottom-0 flex justify-between py-4 px-4">
      {!isReplaying ? (
        <Button
          variant="playPause"
          disabled={isReplaying}
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
          {isPlaying ? <Pause /> : <Play />}
        </Button>
      ) : (
        <p className="w-full text-zinc-950 px-4 py-2 font-bold text-center text-xl">
          Replaying...
        </p>
      )}
      {!isReplaying && !isPlaying && (
        <Button
          variant="ghost"
          className="font-extrabold text-2xl"
          onClick={changePlaybackRate}
        >
          {playbackRate}x
        </Button>
      )}
    </div>
  );
}
