import { Lyric } from "@/types/types";

export default function LyricsDisplay({ lyrics }: { lyrics: Lyric[] }) {
  function onLyricClick(startTime: number, endTime: number) {
    console.log(startTime, endTime);
  }

  const lyricsElements = lyrics
    ? lyrics.map((lyric) => (
        <button
          key={crypto.randomUUID()}
          className="break-all text-left mb-8 cursor-pointer"
          onClick={() => onLyricClick(lyric.startTime, lyric.endTime)}
        >
          {lyric.text}
        </button>
      ))
    : null;

  return <div>{lyricsElements}</div>;
}
