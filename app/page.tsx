"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import TabNavigation from "@/components/TabNavigation";

import { useEffect, useState } from "react";
import { createStore, entries } from "idb-keyval";

import { availableLessonsList } from "@/data/available-lessons-list";

const userStore =
  typeof window !== "undefined"
    ? createStore("msa--user", "total-training-time")
    : null;

type TrainingTimeRecord = { [key: string]: number };

export default function HomePage() {
  const [importedLessonsList, setImportedLessonsList] = useState<
    {
      courseTitle: string;
      lessonTitle: string;
      lastTrained: string;
      order: number;
      lessonId: string;
    }[]
  >([]);

  useEffect(() => {
    if (!userStore) return;

    // use entries to query all data in total-training-time store
    entries(userStore).then((entries: [IDBValidKey, TrainingTimeRecord][]) => {
      console.log("entries", entries);

      if (entries.length === 0) return;

      console.log(
        "lesson",
        availableLessonsList.get(entries[0][0].toString())?.title
      );

      entries.forEach(([lessonId, trainingTimeRecord]) => {
        const lesson = availableLessonsList.get(lessonId.toString());
        if (!lesson) return;

        const lastTrained =
          Object.entries(trainingTimeRecord).at(-1)?.[0] || "";
        const data = {
          courseTitle: lesson.courseTitle,
          lessonTitle: lesson.title,
          lastTrained: lastTrained,
          order: Date.parse(lastTrained),
          lessonId: lessonId.toString(),
        };
        setImportedLessonsList((prev) =>
          [...prev, data].sort((a, b) => b.order - a.order)
        );
      });
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-svh container mx-auto p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">
                Effortless English Book
              </p>
              <h3 className="text-2xl font-bold">The Race MS</h3>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            aria-label={`Start 1 minute training session for The Race MS`}
            asChild
          >
            <Link
              href="/free-sample"
              className="flex justify-center items-center"
            >
              <PlayCircle size={24} aria-hidden="true" />
              Start Training
            </Link>
          </Button>
        </CardFooter>
      </Card>
      {importedLessonsList.length > 0 && (
        <>
          <ul>
            {importedLessonsList.map((lesson) => (
              <li key={lesson.lessonId}>
                {lesson.lessonTitle}, {lesson.lastTrained}
              </li>
            ))}
          </ul>
        </>
      )}
      <TabNavigation currentTab="/" />
    </div>
  );
}
