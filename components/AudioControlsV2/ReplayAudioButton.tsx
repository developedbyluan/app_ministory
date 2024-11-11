import { Repeat1 } from "lucide-react";

type ReplayAudioProps = {
  onReplay?: () => void;
};

export default function ReplayAudio({ onReplay }: ReplayAudioProps) {
  return (
    <button onClick={onReplay}>
      <Repeat1 color="white" size={32} />
    </button>
  );
}
