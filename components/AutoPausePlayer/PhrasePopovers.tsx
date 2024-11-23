import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import EnglishIPADisplay from "@/components/EnglishIPADisplay";
import type { Phrases } from "@/types/types";

export default function PhrasePopovers({
  sentenceAsPhrases,
  showIpa = false,
}: {
  sentenceAsPhrases: Phrases;
  showIpa?: boolean;
}) {
  const { phrases } = sentenceAsPhrases;

  const phrasePopoverElements = phrases.map((singlePhrase, index) => {
    const { phrase, ipa, meaning, explanation } = singlePhrase;
    return (
      <Popover key={index}>
        <PopoverTrigger>
          <EnglishIPADisplay english={phrase} ipa={ipa} showIpa={showIpa} />
        </PopoverTrigger>
        <PopoverContent>
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

  return <div className="flex flex-wrap gap-2">{phrasePopoverElements}</div>;
}
