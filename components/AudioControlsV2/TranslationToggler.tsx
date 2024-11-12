import { Languages } from "lucide-react";

type TranslationTogglerProps = {
  showTranslation: boolean;
  onShowTranslation: () => void;
};

export default function TranslationToggler({
  showTranslation,
  onShowTranslation,
}: TranslationTogglerProps) {
  return (
    <button onClick={onShowTranslation}>
      <Languages
        color={showTranslation ? "white" : "gray"}
        size={32}
        strokeWidth={showTranslation ? 3 : 2}
      />
    </button>
  );
}
