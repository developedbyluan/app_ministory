import type { Phrases, Lyric } from "@/types/types";
import { dayOfTheDeadMs as dayOfTheDeadMsDictionary } from "@/data/msa--english/explanations/day-of-the-dead-ms";
import { dayOfTheDeadMs as dayOfTheDeadMsLyrics } from "@/data/msa--english/lyrics/day-of-the-dead-ms";
export const database = new Map<
  string,
  { dictionary: Phrases[]; lyrics: Lyric[] }
>();

database.set("day-of-the-dead-ms", {
  dictionary: dayOfTheDeadMsDictionary,
  lyrics: dayOfTheDeadMsLyrics,
});
