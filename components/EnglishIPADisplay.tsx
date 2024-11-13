type EnglishIPA = {
  english: string;
  ipa: string;
};

type EnglishIPADisplayProps = {
  english: string;
  ipa: string;
  showIpa?: boolean;
};

export default function EnglishIPADisplay({
  english,
  ipa,
  showIpa = false,
}: EnglishIPADisplayProps) {
  const ipaArray = ipa.split(" ");
  const englishIPA: EnglishIPA[] = english.split(" ").map((word, index) => {
    return {
      english: word,
      ipa: ipaArray[index],
    };
  });
  const englishIPAElements = englishIPA.map((item) => (
    <div key={crypto.randomUUID()} className="flex flex-col items-center pr-2">
      {showIpa && <span className="text-sm text-gray-600">{item.ipa}</span>}
      <span className="text-xl font-medium">{item.english}</span>
    </div>
  ));

  return (
    <div className="flex flex-wrap mb-2 border-b-2 border-dotted mr-2 hover:border-none hover:bg-yellow-50">
      {englishIPAElements}
    </div>
  );
}
