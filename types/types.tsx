export type Lyric = {
  id: number;
  text: string;
  ipa: string;
  translation: string;
  imgUrl: string;
  altText: string;
  imgCredit: string;
  type: "title" | "intro" | "narrative" | "question" | "answer";
  startTime: number;
  endTime: number;
};

export type Phrases = {
  id: number;
  phrases: Phrase[];
};

export type Phrase = {
  phrase: string;
  ipa: string;
  meaning: string;
  explanation: string;
};
