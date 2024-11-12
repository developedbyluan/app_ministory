"use client";
// import { useState } from "react";
import AudioControlsV2 from "@/components/AudioControlsV2";
import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";

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
    handlePlayPause,
    handleReplay,
    handleShowTranslation,
  } = useAllLyricsPlayer({
    audioKey: "the-race-ms",
    lyrics: [
      {
        id: 1,
        text: "Hello",
        ipa: "Həˈləʊ",
        translation: "Hello",
        startTime: 0,
        endTime: 10,
        imgUrl: "",
        altText: "",
        imgCredit: "",
        type: "intro",
      },
    ],
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
      {audioUrl && <audio ref={audioRef} src={audioUrl} controls />}
      <div id="standard-player"></div>
      {/* <AudioControlsV2
          isPlaying={isPlaying}
        isReplaying={isReplaying}
        onPlayPause={handlePlayPause}
        type="standard"
        showTranslation={showTranslation}
        onShowTranslation={handleShowTranslation}
      /> */}

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
