"use client";

import { useState, useEffect } from "react";
import { useDataContext } from "@/contexts/DataContext";
import { createStore, get } from "idb-keyval";
import LyricsDisplay from "./LyricsDisplay";
import { ministoryDB } from "@/data/ministoryDB";

import { Lyric } from "@/types/types";

export default function AllLyricsPlayer({ audioKey }: { audioKey: string }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { audioFile } = useDataContext();

  const lyrics: Lyric[] | undefined = ministoryDB.get(audioKey);

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
    audioUrl &&
    audioKey &&
    lyrics && (
      <div>
        <audio src={audioUrl} controls />
        <LyricsDisplay lyrics={lyrics} />
      </div>
    )
  );
}
