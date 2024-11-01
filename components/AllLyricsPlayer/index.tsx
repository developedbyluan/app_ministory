"use client";

import { useState, useEffect, useRef } from "react";
import { useDataContext } from "@/contexts/DataContext";
import { createStore, get } from "idb-keyval";
import LyricsDisplay from "./LyricsDisplay";
import { ministoryDB } from "@/data/ministoryDB";

import { Lyric } from "@/types/types";

export default function AllLyricsPlayer({ audioKey }: { audioKey: string }) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { audioFile } = useDataContext();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    console.log("Adding timeupdate event listener");
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", updateTime);

    return () => audio.removeEventListener("timeupdate", updateTime);
  }, [audioUrl]);

  return (
    <div>
      {audioUrl && audioKey && lyrics && (
        <div>
          <audio ref={audioRef} src={audioUrl} controls />
          <LyricsDisplay lyrics={lyrics} />
        </div>
      )}
    </div>
  );
}
