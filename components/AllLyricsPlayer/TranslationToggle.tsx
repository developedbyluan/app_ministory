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
  return (
    <div>
      <Checkbox
        id="toggle-translation-checkbox"
        checked={showTranslation}
        onCheckedChange={(checked) => setShowTranslation(checked as boolean)}
        className="peer sr-only"
      />
      <label
        htmlFor="toggle-translation-checkbox"
        className={`flex items-center justify-center font-extrabold text-xl shadow-sm px-4 py-1 rounded-md cursor-pointer transition-colors duration-200 ease-in-out ${
          showTranslation
            ? "bg-primary text-secondary"
            : "bg-secondary text-primary border border-black"
        }`}
      >
        Vi
      </label>
    </div>
  );
}
