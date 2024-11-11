import { PointerOff, StepForward } from "lucide-react";
import { cn } from "@/lib/utils";

type StepForwardButtonProps = {
  isReplaying: boolean;
};

export default function StepForwardButton({
  isReplaying,
}: StepForwardButtonProps) {
  return (
    <button className={cn(isReplaying ? "opacity-10" : "opacity-100")}>
      {isReplaying ? (
        <PointerOff color="white" size={32} />
      ) : (
        <StepForward color="white" fill="white" size={32} />
      )}
    </button>
  );
}
