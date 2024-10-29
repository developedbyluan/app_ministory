"use client";

// import { useDataContext } from "@/contexts/DataContext";
import { useEffect, useState } from "react";
import { get } from "idb-keyval";

export default function StoryPlayerPage() {
  // const { audioFile } = useDataContext();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   if (audioFile) {
  //     setAudioUrl(URL.createObjectURL(audioFile));
  //   }
  // }, [audioFile]);

  useEffect(() => {
    get("Day of the Dead MS.mp3").then((file) => {
      setAudioUrl(URL.createObjectURL(file));
    });
  }, []);

  return (
    <div>
      {/* Using ContextAPI: {audioUrl && <audio src={audioUrl} controls />} */}
      <div>Using IDB: {audioUrl && <audio src={audioUrl} controls />}</div>
    </div>
  );
}
