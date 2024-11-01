import { Lyric } from "@/types/types";

type LyricsDisplayProps = {
  lyrics: Lyric[];
  onLyricClick: (
    clickedLyricIndex: number,
    startTime: number,
    endTime: number
  ) => void;
  activeLyricIndex: number;
  lyricRefsArray: React.RefObject<HTMLParagraphElement[]>;
  isPlaying: boolean;
};

export default function LyricsDisplay({
  lyrics,
  onLyricClick,
  activeLyricIndex,
  lyricRefsArray,
  isPlaying,
}: LyricsDisplayProps) {
  const lyricsElements = lyrics
    ? lyrics.map((lyric, index) => (
        <p
          ref={(el) => {
            if (!lyricRefsArray.current) return;
            lyricRefsArray.current[index] = el as HTMLParagraphElement;
          }}
          key={crypto.randomUUID()}
          className={`text-left mb-8 ${
            isPlaying ? "cursor-default" : "cursor-pointer"
          } ${
            isPlaying
              ? activeLyricIndex === index
                ? "font-bold text-zinc-950 text-xl"
                : "text-zinc-600"
              : activeLyricIndex === index &&
                index >= 0 &&
                "font-bold text-zinc-950 text-xl"
          }`}
          onClick={() => onLyricClick(index, lyric.startTime, lyric.endTime)}
        >
          {lyric.text}
        </p>
      ))
    : null;

  return <div>{lyricsElements}</div>;
}
