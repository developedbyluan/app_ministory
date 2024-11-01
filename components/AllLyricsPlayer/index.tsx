"use client";

import { useState, useEffect } from "react";
import { useDataContext } from "@/contexts/DataContext";
import { createStore, get } from "idb-keyval";
import LyricsDisplay from "./LyricsDisplay";
import useAllLyricsPlayer from "@/hooks/use-all-lyrics-player";
import { ministoryDB } from "@/data/ministoryDB";

import { Lyric } from "@/types/types";

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
          <button
            disabled={isReplaying}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 text-zinc-50 bg-zinc-950 px-4 py-2 rounded-md text-lg"
            onClick={togglePlayPause}
          >
            {isReplaying ? "Replaying" : isPlaying ? "Pause" : "Play"}
          </button>
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
