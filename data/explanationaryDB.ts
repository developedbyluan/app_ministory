import type { Explanationary } from "@/types/types";
import { eDayOfTheDeadMS } from "./e-day-of-the-dead-ms";

export const explanationaryDB = new Map<string, Explanationary[]>();

explanationaryDB.set("e-day-of-the-dead-ms", eDayOfTheDeadMS);
