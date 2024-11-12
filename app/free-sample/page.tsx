"use client";
// import { useState } from "react";
import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";
import AudioControlsV2 from "@/components/AudioControlsV2";

import { lyrics } from "./lyrics";
import ProgressBar from "@/components/AllLyricsPlayer/ProgressBar";
import LyricsDisplay from "@/components/AllLyricsPlayer/LyricsDisplay";

export default function FreeSamplePage() {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isReplaying, setIsReplaying] = useState(false);
  // const [showTranslation, setShowTranslation] = useState(false);

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

  // const handlePlayPause = () => {
  //   setIsPlaying((prev) => !prev);
  // };

  // const handleReplay = () => {
  //   setIsReplaying((prev) => !prev);
  //   setTimeout(() => {
  //     setIsReplaying(false);
  //   }, 1000);
  // };

  // const handleShowTranslation = () => {
  //   setShowTranslation((prev) => !prev);
  // };

  return (
    <div>
      <ProgressBar progress={progress} />
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}

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
        />
      </div>

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
