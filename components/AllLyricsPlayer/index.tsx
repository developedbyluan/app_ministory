"use client";

import { Dispatch, SetStateAction } from "react";
import LyricsDisplay from "./LyricsDisplay";
import AudioControls from "./AudioControls";
import ProgressBar from "./ProgressBar";
import { Lyric } from "@/types/types";

type AllLyricsPlayerProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
  lyricRefsArray: React.RefObject<HTMLParagraphElement[]>;
  handleLyricClick: (clickedLyricIndex: number, startTime: number) => void;
  activeLyricIndex: number;
  isPlaying: boolean;
  togglePlayPause: () => void;
  isReplaying: boolean;
  playbackRate: number;
  changePlaybackRate: () => void;
  setShowTranslation: Dispatch<SetStateAction<boolean>>;
  showTranslation: boolean;
  progress: number;
  audioUrl: string | null;
  lyrics: Lyric[] | undefined;
  setShowAutoPauseMode: Dispatch<SetStateAction<boolean>>;
  showAutoPauseMode: boolean;
};

export default function AllLyricsPlayer({
  audioRef,
  lyricRefsArray,
  handleLyricClick,
  activeLyricIndex,
  isPlaying,
  togglePlayPause,
  isReplaying,
  playbackRate,
  changePlaybackRate,
  setShowTranslation,
  showTranslation,
  progress,
  audioUrl,
  lyrics,
  setShowAutoPauseMode,
  showAutoPauseMode,
}: AllLyricsPlayerProps) {
  return (
    <div>
      {audioUrl && (
        <div className="px-4 py-8">
          <ProgressBar progress={progress} />
          <audio ref={audioRef} src={audioUrl} />
          <AudioControls
            isReplaying={isReplaying}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
            changePlaybackRate={changePlaybackRate}
            playbackRate={playbackRate}
            setShowTranslation={setShowTranslation}
            showTranslation={showTranslation}
            setShowAutoPauseMode={setShowAutoPauseMode}
          />
          {!showAutoPauseMode && (
            <LyricsDisplay
              lyrics={lyrics || []}
              onLyricClick={handleLyricClick}
              activeLyricIndex={activeLyricIndex}
              isPlaying={isPlaying}
              lyricRefsArray={lyricRefsArray}
              showTranslation={showTranslation}
            />
          )}
        </div>
      )}
    </div>
  );
}
