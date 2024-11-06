import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Phrase } from "@/types/types";

import { cn } from "@/lib/utils";

type PhrasePopoverProps = {
  phrases: Phrase[];
  isReplaying: boolean;
};
export default function PhrasePopover({
  phrases,
  isReplaying,
}: PhrasePopoverProps) {
  const phrasesElements = phrases.map((item) => {
    const { phrase, ipa, meaning, explanation } = item;

    const ipaArray = ipa.split(" ");
    const phraseArray = phrase.split(" ");
    return (
      <Popover key={crypto.randomUUID()}>
        <PopoverTrigger
          className={cn(
            "flex rounded cursor-pointer",
            !isReplaying && "transition-colors hover:bg-blue-100"
          )}
          disabled={isReplaying}
        >
          {ipaArray.map((ipaItem, index) => (
            <div
              key={crypto.randomUUID()}
              className="flex flex-col items-center"
            >
              {!true && (
                <span className="block text-xs text-gray-600">{ipaItem}</span>
              )}
              <span className="inline-block p-1 pt-0 text-xl font-bold">
                {phraseArray[index]}
              </span>
            </div>
          ))}
        </PopoverTrigger>
        <PopoverContent>
          <p>
            <strong>IPA:</strong> /{ipa}/
          </p>
          <p>
            <strong>Dịch:</strong> {meaning}
          </p>
          <p>
            <strong>Giải thích:</strong> {explanation}
          </p>
        </PopoverContent>
      </Popover>
    );
  });
  return <div className="flex flex-wrap">{phrasesElements}</div>;
}