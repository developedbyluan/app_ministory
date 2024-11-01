import { useState, useRef, useEffect } from "react";

export default function useAllLyricsPlayer({
  audioUrl,
}: {
  audioUrl: string | null;
}) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", updateTime);

    return () => audio.removeEventListener("timeupdate", updateTime);
  }, [audioUrl]);
  return { currentTime, setCurrentTime, audioRef };
}
