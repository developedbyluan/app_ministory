import { Checkbox } from "@/components/ui/checkbox";
import { Languages } from "lucide-react";
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
        className={`flex items-center justify-center p-[0.6rem] rounded-full font-extrabold text-sm cursor-pointer transition-colors duration-200 ease-in-out ${
          showTranslation ? "bg-black text-white" : "bg-zinc-800"
        }`}
      >
        <Languages size={20} />
      </label>
    </div>
  );
}
