"use client";
// import { useState } from "react";
import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";
import AudioControlsV2 from "@/components/AudioControlsV2";

import { lyrics } from "./lyrics";

export default function FreeSamplePage() {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isReplaying, setIsReplaying] = useState(false);
  // const [showTranslation, setShowTranslation] = useState(false);

  const {
    audioRef,
    audioUrl,
    isPlaying,
    isReplaying,
    showTranslation,
    togglePlayPause,
    handleReplay,
    handleShowTranslation,
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
      {audioUrl && <audio ref={audioRef} src={audioUrl} />}

      <div id="standard-player">
        <AudioControlsV2
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
          showTranslation={showTranslation}
          onShowTranslation={handleShowTranslation}
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
