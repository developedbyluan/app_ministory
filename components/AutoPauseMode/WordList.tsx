import { Phrase } from "@/types/types";
import { Volume2 } from "lucide-react";

type WordListProps = {
  phrases: Phrase[] | undefined;
  speakPhrase: (phrase: string) => void;
  isReplaying: boolean;
};

export default function WordList({
  phrases,
  speakPhrase,
  isReplaying,
}: WordListProps) {
  const phraseElements = phrases?.map((phraseItem) => {
    const { phrase, ipa, meaning } = phraseItem;
    return (
      <div
        key={crypto.randomUUID()}
        className="flex flex-col border-t first:border-t-0 py-4 px-4"
      >
        <div className="flex justify-between gap-x-2">
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-2">{phrase}</div>
            <span className="text-xs text-gray-600">/{ipa}/</span>
            <span className="text-sm text-gray-800">{meaning}</span>
          </div>
          {!isReplaying && (
            <button
              onClick={() => speakPhrase(phrase)}
              className="hover:text-red-700"
            >
              <Volume2 size={24} />
            </button>
          )}
        </div>
      </div>
    );
  });
  return <>{phraseElements}</>;
}
