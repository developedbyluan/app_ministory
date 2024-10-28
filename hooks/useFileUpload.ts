import { useState } from "react";

export function useFileUpload() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setError(null);
    setSuccess(false);

    if (!file) {
      setError("No file selected.");
      return;
    }

    if (
      file.type !== "audio/mpeg" &&
      !file.name.toLowerCase().endsWith(".mp3")
    ) {
      setError("Invalid file type. Please upload an MP3 file.");
      return;
    }

    setFile(file);
    setSuccess(true);
  }

  return { error, success, handleFileChange, file };
}
