import type { Phrases } from "@/types/types";
import { dayOfTheDeadMs } from "@/data/msa--english/explanations/day-of-the-dead-ms";

export const explanationaryDB = new Map<string, Phrases[]>();

explanationaryDB.set("day-of-the-dead-ms", dayOfTheDeadMs);
