type AudioControlsProps = {
  isReplaying: boolean;
  isPlaying: boolean;
  togglePlayPause: () => void;
};

export default function AudioControls({
  isReplaying,
  isPlaying,
  togglePlayPause,
}: AudioControlsProps) {
  return (
    <div className="w-full bg-zinc-50/80 fixed bottom-0 flex justify-center py-4">
      {!isReplaying ? (
        <button
          disabled={isReplaying}
          className="text-zinc-50 bg-zinc-950 px-4 py-2 rounded-md text-lg"
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      ) : (
        <p className="text-zinc-950 px-4 py-2 font-bold text-xl">
          Replaying...
        </p>
      )}
    </div>
  );
}
