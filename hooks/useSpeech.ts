import { useState, useRef } from "react";

export const useSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesis =
    typeof window !== "undefined" ? window.speechSynthesis : null;
  const speechUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  const speakPhrase = (phrase: string) => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      speechUtterance.current = new SpeechSynthesisUtterance(phrase);
      speechUtterance.current.onstart = () => setIsSpeaking(true);
      speechUtterance.current.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(speechUtterance.current);
    }
  };

  const stopSpeaking = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
    }
  };

  return { isSpeaking, speakPhrase, stopSpeaking };
};
