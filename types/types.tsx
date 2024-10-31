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
