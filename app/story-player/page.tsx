"use client";

import { useDataContext } from "@/contexts/DataContext";
import { useEffect, useState, Suspense } from "react";
import { createStore, get } from "idb-keyval";
import { useSearchParams } from "next/navigation";

function StoryPlayer() {
  const searchParams = useSearchParams();
  const { audioFile, setAudioFile } = useDataContext();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const audioName = searchParams.get("audio");

    if (!audioName) {
      throw new Error("No audio name provided");
    }

    if (audioFile) {
      setAudioUrl(URL.createObjectURL(audioFile));
      return;
    }

    const customStore = createStore("msa--english", "mp3");

    get(audioName, customStore).then((file) => {
      if (!file) {
        throw new Error("No audio file found");
      }
      setAudioFile(file);
    });
  }, [audioFile, searchParams, setAudioFile]);

  return <div>Audio: {audioUrl && <audio src={audioUrl} controls />}</div>;
}

export default function StoryPlayerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoryPlayer />
    </Suspense>
  );
}
