import { Button } from "@/components/ui/button";

type UploadAudioButtonProps = {
  textContent: string;
  onClick: () => void;
};

export default function UploadAudioButton({
  textContent,
  onClick,
}: UploadAudioButtonProps) {
  return <Button onClick={onClick}>{textContent}</Button>;
}
