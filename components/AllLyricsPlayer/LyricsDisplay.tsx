import { Lyric } from "@/types/types";

type LyricsDisplayProps = {
  lyrics: Lyric[];
  onLyricClick: (startTime: number, endTime: number) => void;
};

export default function LyricsDisplay({
  lyrics,
  onLyricClick,
}: LyricsDisplayProps) {
  const lyricsElements = lyrics
    ? lyrics.map((lyric) => (
        <p
          key={crypto.randomUUID()}
          className="break-all text-left mb-8 cursor-pointer"
          onClick={() => onLyricClick(lyric.startTime, lyric.endTime)}
        >
          {lyric.text}
        </p>
      ))
    : null;

  return <div>{lyricsElements}</div>;
}
