"use client";

import { useSearchParams } from "next/navigation";
import AllLyricsPlayer from "@/components/AllLyricsPlayer";

export default function AllLyricsPlayerPage() {
  const searchParams = useSearchParams();
  const audioKey = searchParams.get("audio");

  if (!audioKey) {
    throw new Error("No audio key provided");
  }
  return <AllLyricsPlayer audioKey={audioKey} />;
}
