"use client";

import { useState, useEffect } from "react";
import { useDataContext } from "@/contexts/DataContext";
import { createStore, get } from "idb-keyval";
import LyricsDisplay from "./LyricsDisplay";
import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";
import { ministoryDB } from "@/data/ministoryDB";

import { Lyric } from "@/types/types";
import AudioControls from "./AudioControls";

export default function AllLyricsPlayer({ audioKey }: { audioKey: string }) {
  const lyrics: Lyric[] | undefined = ministoryDB.get(audioKey);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { audioFile } = useDataContext();
  const {
    audioRef,
    lyricRefsArray,
    handleLyricClick,
    activeLyricIndex,
    isPlaying,
    togglePlayPause,
    isReplaying,
  } = useAllLyricsPlayer({
    audioUrl,
    lyrics,
  });

  useEffect(() => {
    if (!audioKey) return;

    if (audioFile) {
      setAudioUrl(URL.createObjectURL(audioFile));
      return;
    }

    const customStore = createStore("msa--english", "mp3");

    get(audioKey, customStore).then((file) => {
      if (!file) {
        throw new Error("No audio file found in local database");
      }
      setAudioUrl(URL.createObjectURL(file));
    });
  }, [audioFile, audioKey]);

  return (
    <div>
      {audioUrl && audioKey && lyrics && (
        <div>
          <audio ref={audioRef} src={audioUrl} controls />
          <AudioControls
            isReplaying={isReplaying}
            isPlaying={isPlaying}
            togglePlayPause={togglePlayPause}
          />
          <LyricsDisplay
            lyrics={lyrics}
            onLyricClick={handleLyricClick}
            activeLyricIndex={activeLyricIndex}
            isPlaying={isPlaying}
            lyricRefsArray={lyricRefsArray}
          />
        </div>
      )}
    </div>
  );
}
