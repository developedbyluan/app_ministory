"use client";

import { useState, useEffect } from "react";
import { useDataContext } from "@/contexts/DataContext";
import { createStore, get } from "idb-keyval";

export default function AllLyricsPlayer({ audioKey }: { audioKey: string }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { audioFile } = useDataContext();

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

  return <div>{audioUrl && <audio src={audioUrl} controls />}</div>;
}
