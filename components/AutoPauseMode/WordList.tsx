import { Phrase } from "@/types/types";

type WordListProps = {
  phrases: Phrase[] | undefined;
};

export default function WordList({ phrases }: WordListProps) {
  const phraseElements = phrases?.map((phraseItem) => {
    const { phrase, ipa, meaning } = phraseItem;
    return (
      <div
        key={crypto.randomUUID()}
        className="flex flex-col border-t first:border-t-0 py-4"
      >
        <div className="flex flex-col gap-x-2">
          <div className="flex items-center gap-x-2">{phrase}</div>
          <span className="text-xs text-gray-600">/{ipa}/</span>
        </div>
        <span className="text-sm text-gray-800">{meaning}</span>
      </div>
    );
  });
  return <>{phraseElements}</>;
}
