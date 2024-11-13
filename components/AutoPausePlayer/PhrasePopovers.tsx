import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import EnglishIPADisplay from "@/components/EnglishIPADisplay";
import type { Phrases } from "@/types/types";

export default function PhrasePopovers({
  sentenceAsPhrases,
}: {
  sentenceAsPhrases: Phrases;
}) {
  const { id, phrases } = sentenceAsPhrases;

  const phrasePopoverElements = phrases.map((singlePhrase) => {
    const { phrase, ipa, meaning, explanation } = singlePhrase;
    return (
      <Popover key={id + crypto.randomUUID()}>
        <PopoverTrigger>
          <EnglishIPADisplay english={phrase} ipa={ipa} showIpa={true} />
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
