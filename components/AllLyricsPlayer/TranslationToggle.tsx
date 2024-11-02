import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";

type TranslationToggleProps = {
  showTranslation: boolean;
  setShowTranslation: Dispatch<SetStateAction<boolean>>;
};
export default function TranslationToggle({
  showTranslation,
  setShowTranslation,
}: TranslationToggleProps) {
  const translationAriaLabel = showTranslation
    ? "Hide translation"
    : "Show translation";
  return (
    <div>
      <Checkbox
        id="toggle-translation-checkbox"
        checked={showTranslation}
        onCheckedChange={(checked) => setShowTranslation(checked as boolean)}
        className="peer sr-only"
        aria-label={translationAriaLabel}
      />
      <label
        htmlFor="toggle-translation-checkbox"
        className={`flex items-center justify-center px-2 py-1 rounded-md font-extrabold text-sm cursor-pointer border transition-colors duration-200 ease-in-out ${
          showTranslation
            ? "bg-black text-white border-white"
            : "bg-zinc-950 text-zinc-600 border-zinc-600"
        }`}
      >
        Vn
      </label>
    </div>
  );
}
