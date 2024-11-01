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
    <div className="w-full bg-zinc-50/80 fixed bottom-0 flex justify-between py-4 px-4">
      {!isReplaying ? (
        <button
          disabled={isReplaying}
          className="text-zinc-50 bg-zinc-950 px-4 py-2 rounded-md text-lg"
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      ) : (
        <p className="w-full text-zinc-950 px-4 py-2 font-bold text-center text-xl">
          Replaying...
        </p>
      )}
      {!isReplaying && !isPlaying && (
        <button
          className="text-zinc-50 bg-zinc-950 px-4 py-2 rounded-md text-lg"
          onClick={changePlaybackRate}
        >
          {playbackRate}x
        </button>
      )}
    </div>
  );
}
