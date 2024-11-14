"use client";

import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";
import ProgressBar from "@/components/AllLyricsPlayer/ProgressBar";
import StandardPlayer from "@/components/StandardPlayer";
import AutoPausePlayer from "@/components/AutoPausePlayer";

import { lyrics } from "./lyrics";

export default function FreeSamplePage() {
  const {
    audioRef,
    audioUrl,
    isPlaying,
    isReplaying,
    showTranslation,
    setShowTranslation,
    togglePlayPause,
    progress,
    handleLyricClick,
    activeLyricIndex,
    lyricRefsArray,
    handleReplay,
  } = useAllLyricsPlayer({
    audioKey: "the-race-ms",
    lyrics: lyrics,
  });

  return (
    <div>
      <ProgressBar progress={progress} />
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}

      <StandardPlayer
        lyrics={lyrics}
        handleLyricClick={handleLyricClick}
        activeLyricIndex={activeLyricIndex}
        lyricRefsArray={lyricRefsArray}
        isPlaying={isPlaying}
        showTranslation={showTranslation}
        togglePlayPause={togglePlayPause}
        setShowTranslation={setShowTranslation}
      />

      <AutoPausePlayer
        lyrics={lyrics}
        activeLyricIndex={activeLyricIndex}
        isPlaying={isPlaying}
        isReplaying={isReplaying}
        showTranslation={showTranslation}
        setShowTranslation={setShowTranslation}
        handleReplay={handleReplay}
      />
    </div>
  );
}
