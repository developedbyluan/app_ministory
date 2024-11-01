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
          <div className="w-full bg-zinc-50/80 fixed bottom-0 flex justify-center py-4">
            {!isReplaying ? (
              <button
                disabled={isReplaying}
                className="text-zinc-50 bg-zinc-950 px-4 py-2 rounded-md text-lg"
                onClick={togglePlayPause}
              >
                {isPlaying ? "Pause" : "Play"}
              </button>
            ) : (
              <p className="text-zinc-950 px-4 py-2 font-bold text-xl">
                Replaying...
              </p>
            )}
          </div>
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
