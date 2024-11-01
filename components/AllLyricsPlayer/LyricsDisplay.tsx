import { Lyric } from "@/types/types";

type LyricsDisplayProps = {
  lyrics: Lyric[];
  onLyricClick: (
    clickedLyricIndex: number,
    startTime: number,
    endTime: number
  ) => void;
  activeLyricIndex: number;
  isPlaying: boolean;
};

export default function LyricsDisplay({
  lyrics,
  onLyricClick,
  activeLyricIndex,
  isPlaying,
}: LyricsDisplayProps) {
  const lyricsElements = lyrics
    ? lyrics.map((lyric, index) => (
        <p
          key={crypto.randomUUID()}
          className={`text-left mb-8 ${
            !isPlaying ? "cursor-pointer" : "cursor-default"
          }  ${
            !isPlaying
              ? "text-zinc-950"
              : activeLyricIndex === index
              ? "font-bold"
              : "text-zinc-500"
          }`}
          onClick={() => onLyricClick(index, lyric.startTime, lyric.endTime)}
        >
          {lyric.text}
        </p>
      ))
    : null;

  return <div>{lyricsElements}</div>;
}
