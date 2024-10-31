import { Lyric } from "@/types/types";
import { dayOfTheDeadMs } from "./day-of-the-dead-ms";

export const ministoryDB = new Map<string, Lyric[]>();

ministoryDB.set("day-of-the-dead-ms", dayOfTheDeadMs);
