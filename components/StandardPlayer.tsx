import { Lyric } from "@/types/types";
import LyricsDisplay from "./AllLyricsPlayer/LyricsDisplay";
import AudioControlsV2 from "./AudioControlsV2";
import { Dispatch, SetStateAction } from "react";

type StandardPlayerProps = {
  lyrics: Lyric[];
  handleLyricClick: (clickedLyricIndex: number, startTime: number) => void;
  activeLyricIndex: number;
  lyricRefsArray: React.RefObject<HTMLParagraphElement[]>;
  isPlaying: boolean;
  showTranslation: boolean;
  togglePlayPause: () => void;
  setShowTranslation: Dispatch<SetStateAction<boolean>>;
  setShowAutoPausePlayer: Dispatch<SetStateAction<boolean>>;
};

export default function StandardPlayer({
  lyrics,
  handleLyricClick,
  activeLyricIndex,
  lyricRefsArray,
  isPlaying,
  showTranslation,
  togglePlayPause,
  setShowTranslation,
  setShowAutoPausePlayer,
}: StandardPlayerProps) {
  return (
    <div id="standard-player" className="pt-10 px-7">
      <LyricsDisplay
        lyrics={lyrics}
        onLyricClick={handleLyricClick}
        activeLyricIndex={activeLyricIndex}
        lyricRefsArray={lyricRefsArray}
        isPlaying={isPlaying}
        showTranslation={showTranslation}
      />
      <AudioControlsV2
        isPlaying={isPlaying}
        onPlayPause={togglePlayPause}
        showTranslation={showTranslation}
        onShowTranslation={() => setShowTranslation((prev) => !prev)}
        type="standard"
        setShowAutoPausePlayer={setShowAutoPausePlayer}
      />
    </div>
  );
}
