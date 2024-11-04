export type Lyric = {
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

export type Phrase = {
  phrase: string;
  ipa: string;
  meaning: string;
  explanation: string;
};
