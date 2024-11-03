"use client";

import { Dispatch, SetStateAction } from "react";
import LyricsDisplay from "./LyricsDisplay";
import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";
import { ministoryDB } from "@/data/ministoryDB";

import { Lyric } from "@/types/types";
import AudioControls from "./AudioControls";
import ProgressBar from "./ProgressBar";

type AllLyricsPlayerProps = {
  audioKey: string;
  setShowAutoPauseMode: Dispatch<SetStateAction<boolean>>;
  showAutoPauseMode: boolean;
};

export default function AllLyricsPlayer({
  audioKey,
  setShowAutoPauseMode,
  showAutoPauseMode,
}: AllLyricsPlayerProps) {
  const lyrics: Lyric[] | undefined = ministoryDB.get(audioKey);

  const {
    audioRef,
    lyricRefsArray,
    handleLyricClick,
    activeLyricIndex,
    isPlaying,
    togglePlayPause,
    isReplaying,
    playbackRate,
    changePlaybackRate,
    showTranslation,
    setShowTranslation,
    progress,
    audioUrl,
  } = useAllLyricsPlayer({
    audioKey,
    lyrics,
  });

  return (
    <div>
      {audioUrl && audioKey && lyrics && (
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
              lyrics={lyrics}
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
