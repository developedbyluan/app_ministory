import { Lyric } from "@/types/types";

type LyricsDisplayProps = {
  lyrics: Lyric[];
  onLyricClick: (clickedLyricIndex: number, startTime: number) => void;
  activeLyricIndex: number;
  lyricRefsArray: React.RefObject<HTMLParagraphElement[]>;
  isPlaying: boolean;
  showTranslation: boolean;
};

export default function LyricsDisplay({
  lyrics,
  onLyricClick,
  activeLyricIndex,
  lyricRefsArray,
  isPlaying,
  showTranslation,
}: LyricsDisplayProps) {
  const lyricsElements = lyrics
    ? lyrics.map((lyric, index) => (
        <p
          key={lyric.id}
          ref={(el) => {
            if (!lyricRefsArray.current) return;
            lyricRefsArray.current[index] = el as HTMLParagraphElement;
          }}
          className={`text-left mb-8 flex flex-col ${
            isPlaying ? "cursor-default" : "cursor-pointer"
          } ${
            isPlaying
              ? activeLyricIndex === index
                ? "font-bold text-zinc-950 text-xl"
                : "text-zinc-500 text-lg"
              : activeLyricIndex === index &&
                index >= 0 &&
                "font-bold text-zinc-950 text-xl"
          } `}
          onClick={() => onLyricClick(index, lyric.startTime)}
        >
          <span>{lyric.text}</span>
          {showTranslation && (
            <span style={{ fontSize: "0.85rem", fontWeight: "normal" }}>
              {lyric.translation}
            </span>
          )}
          {index === lyrics.length - 1 && <span className="h-20" />}
        </p>
      ))
    : null;

  return <div>{lyricsElements}</div>;
}
