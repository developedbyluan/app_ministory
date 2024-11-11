import { Repeat1, PointerOff } from "lucide-react";
import { cn } from "@/lib/utils";

type ReplayAudioProps = {
  isReplaying: boolean;
};

export default function ReplayAudio({ isReplaying }: ReplayAudioProps) {
  return (
    <button
      disabled={isReplaying}
      className={cn(isReplaying ? "opacity-5" : "opacity-100")}
    >
      {isReplaying ? (
        <PointerOff color="white" size={32} />
      ) : (
        <Repeat1 color="white" size={32} />
      )}
    </button>
  );
}
