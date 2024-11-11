import { StepForward } from "lucide-react";

type StepForwardButtonProps = {
  onPlaySingleLyric: () => void;
};

export default function StepForwardButton({
  onPlaySingleLyric,
}: StepForwardButtonProps) {
  return (
    <button onClick={onPlaySingleLyric}>
      <StepForward color="white" fill="white" size={32} />
    </button>
  );
}
