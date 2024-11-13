"use client";

import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";
import ProgressBar from "@/components/AllLyricsPlayer/ProgressBar";
import StandardPlayer from "@/components/StandardPlayer";

import { lyrics } from "./lyrics";

export default function FreeSamplePage() {
  const {
    audioRef,
    audioUrl,
    isPlaying,
    showTranslation,
    setShowTranslation,
    togglePlayPause,
    progress,
    handleLyricClick,
    activeLyricIndex,
    lyricRefsArray,
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

      <div id="auto-pause-player"></div>
      {/* <AudioControlsV2
        isPlaying={isPlaying}
        isReplaying={isReplaying}
        onPlayPause={handlePlayPause}
        onReplay={handleReplay}
        showTranslation={showTranslation}
        onShowTranslation={handleShowTranslation}
        type="auto-pause"
      /> */}
    </div>
  );
}
