"use client";
import { useState } from "react";

import { useSearchParams } from "next/navigation";
import AllLyricsPlayer from "@/components/AllLyricsPlayer";
import AutoPauseMode from "@/components/AutoPauseMode";

import { cn } from "@/lib/utils";

import { lyricsCollection } from "@/data/msa--english/lyrics-collection";
import { Lyric } from "@/types/types";

import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";

export default function AllLyricsPlayerPage() {
  const searchParams = useSearchParams();
  const audioKey = searchParams.get("audio");

  const [showAutoPauseMode, setShowAutoPauseMode] = useState(false);

  if (!audioKey) {
    throw new Error("No audio key provided");
  }

  const lyrics: Lyric[] | undefined = lyricsCollection.get(audioKey);

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
      <AllLyricsPlayer
        audioRef={audioRef}
        lyricRefsArray={lyricRefsArray}
        handleLyricClick={handleLyricClick}
        activeLyricIndex={activeLyricIndex}
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        isReplaying={isReplaying}
        playbackRate={playbackRate}
        changePlaybackRate={changePlaybackRate}
        showTranslation={showTranslation}
        setShowTranslation={setShowTranslation}
        progress={progress}
        audioUrl={audioUrl}
        showAutoPauseMode={showAutoPauseMode}
        setShowAutoPauseMode={setShowAutoPauseMode}
        lyrics={lyrics}
      />
      <div
        className={cn(
          "py-8 px-4 fixed inset-0 bg-black transition-transform duration-500 ease-in-out",
          showAutoPauseMode
            ? "translate-y-0"
            : "translate-y-full bg-white duration-300"
        )}
      >
        {showAutoPauseMode && (
          <AutoPauseMode
            activeLyricIndex={activeLyricIndex}
            audioKey={audioKey}
            setShowAutoPauseMode={setShowAutoPauseMode}
          />
        )}
      </div>
    </div>
  );
}
