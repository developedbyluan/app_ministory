import { dayOfTheDeadMs } from "@/data/day-of-the-dead-ms";
import { Lyric } from "@/types/types";

type LyricsDisplayProps = {
  lyricsKey: string;
};
export default function LyricsDisplay({ lyricsKey }: LyricsDisplayProps) {
  const lyricsDB: { [key: string]: Lyric[] } = {
    "day-of-the-dead-ms": dayOfTheDeadMs,
  };

  function onLyricClick(startTime: number, endTime: number) {
    console.log(startTime, endTime);
  }

  const lyricsElements = lyricsDB[lyricsKey].map((lyric, index) => (
    <button
      key={crypto.randomUUID()}
      className="break-words text-left mb-8"
      onClick={() => onLyricClick(lyric.startTime, lyric.endTime)}
    >
      {lyric.text}
    </button>
  ));

  return <div>{lyricsElements}</div>;
}
