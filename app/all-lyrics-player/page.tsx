"use client";
import { useState } from "react";

import { useSearchParams } from "next/navigation";
import AllLyricsPlayer from "@/components/AllLyricsPlayer";
import AutoPauseMode from "@/components/AutoPauseMode";

import { cn } from "@/lib/utils";

export default function AllLyricsPlayerPage() {
  const searchParams = useSearchParams();
  const audioKey = searchParams.get("audio");

  const [showAutoPauseMode, setShowAutoPauseMode] = useState(false);

  if (!audioKey) {
    throw new Error("No audio key provided");
  }
  return (
    <div>
      <AllLyricsPlayer
        audioKey={audioKey}
        setShowAutoPauseMode={setShowAutoPauseMode}
      />

      <div
        className={cn(
          "py-8 px-4 fixed inset-0 bg-black transition-transform duration-300 ease-in-out",
          showAutoPauseMode ? "translate-y-0" : "translate-y-full"
        )}
      >
        <AutoPauseMode />
      </div>
    </div>
  );
}
