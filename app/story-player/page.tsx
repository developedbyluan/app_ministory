"use client";

import { useDataContext } from "@/contexts/DataContext";
import { useEffect, useState } from "react";

export default function StoryPlayerPage() {
  const { audioFile } = useDataContext();
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if (audioFile) {
      setAudioUrl(URL.createObjectURL(audioFile));
    }
  }, [audioFile]);

  return <div>{audioUrl && <audio src={audioUrl} controls />}</div>;
}
