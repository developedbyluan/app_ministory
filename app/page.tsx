"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import TabNavigation from "@/components/TabNavigation";

import LessonCard from "@/components/ContinueTraining/LessonCard";
import { useEffect, useState } from "react";
import { createStore, entries } from "idb-keyval";
import { openDB } from "idb";

import { availableLessonsList } from "@/data/available-lessons-list";
import { TrainingTimeRecord } from "@/types/types";

import { cn } from "@/lib/utils";

const AUDIO_URL = "./The Race MS.mp3";
const AUDIO_KEY = "the-race-ms";

import { currentDate } from "@/helpers/current-date";
import { database } from "@/data/msa--english/database";

export default function HomePage() {
  const [importedLessonsList, setImportedLessonsList] = useState<
    {
      courseTitle: string;
      lessonTitle: string;
      lastTrained: string;
      order: number;
      lessonId: string;
      trainingTimeRecord: TrainingTimeRecord;
    }[]
  >([]);
  const [isAppReady, setIsAppReady] = useState(false);

  const isStandalone = false;

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // if (!isStandalone) return;

    // IndexedDB implementation: English Lessons (json and mp3) and User Data
    const englishDbName = "msa--english";
    const mp3StoreName = "mp3";
    const lyricsStoreName = "lyrics";
    const dictionaryStoreName = "dictionary";

    const userDbName = "msa--user";
    const totalTrainingTimeStoreName = "total-training-time";
    const personalDataStoreName = "personal-data";

    const version = 1;

    openDB(englishDbName, version, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(mp3StoreName)) {
          db.createObjectStore(mp3StoreName);
        }

        if (!db.objectStoreNames.contains(lyricsStoreName)) {
          db.createObjectStore(lyricsStoreName);
        }

        if (!db.objectStoreNames.contains(dictionaryStoreName)) {
          db.createObjectStore(dictionaryStoreName);
        }
      },
    })
      .then((db) => {
        fetch(AUDIO_URL)
          .then((res) => res.arrayBuffer())
          .then((audioBuffer) => {
            const mp3Tx = db.transaction(mp3StoreName, "readwrite");
            const mp3Store = mp3Tx.objectStore(mp3StoreName);

            const lyricsTx = db.transaction(lyricsStoreName, "readwrite");
            const lyricsStore = lyricsTx.objectStore(lyricsStoreName);

            const dictionaryTx = db.transaction(
              dictionaryStoreName,
              "readwrite"
            );
            const dictionaryStore =
              dictionaryTx.objectStore(dictionaryStoreName);
            return Promise.all([
              mp3Store.put(audioBuffer, AUDIO_KEY),
              lyricsStore.put(database.get(AUDIO_KEY)?.lyrics || [], AUDIO_KEY),
              dictionaryStore.put(
                database.get(AUDIO_KEY)?.dictionary || [],
                AUDIO_KEY
              ),
            ]);
          });
      })
      .then(() => {
        // IndexedDB implementation: User Data
        setIsAppReady(true);

        openDB(userDbName, version, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(totalTrainingTimeStoreName)) {
              db.createObjectStore(totalTrainingTimeStoreName);
            }

            if (!db.objectStoreNames.contains(personalDataStoreName)) {
              db.createObjectStore(personalDataStoreName);
            }
          },
        })
          .then((db) => {
            const totalTrainingTimeTx = db.transaction(
              totalTrainingTimeStoreName,
              "readwrite"
            );
            const totalTrainingTimeStore = totalTrainingTimeTx.objectStore(
              totalTrainingTimeStoreName
            );

            const personalDataTx = db.transaction(
              personalDataStoreName,
              "readwrite"
            );
            const personalDataStore = personalDataTx.objectStore(
              personalDataStoreName
            );

            // Get existing data from IndexedDB
            return Promise.all([
              personalDataStore.put("Guest", "name"),
              totalTrainingTimeStore.get(AUDIO_KEY).then((existingData) => {
                const updatedSessions = existingData
                  ? { ...existingData }
                  : { [currentDate]: 0 };

                return totalTrainingTimeStore.put(updatedSessions, AUDIO_KEY);
              }),
            ]);
          })
          .then(() => {
            const userStore = createStore("msa--user", "total-training-time");
            //    use entries to query all data in total-training-time store
            entries(userStore).then(
              (entries: [IDBValidKey, TrainingTimeRecord][]) => {
                if (entries.length === 0) {
                  console.log("no entries, setting up English lessons data");
                  // setupEnglishLessonsData();
                  return;
                }

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
                    trainingTimeRecord: trainingTimeRecord,
                  };
                  setImportedLessonsList((prev) =>
                    [...prev, data].sort((a, b) => b.order - a.order)
                  );
                });
              }
            );
          });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: `Error saving file to IndexedDB: ${error}`,
        });
      });
  }, [router, toast, isStandalone]);

  return (
    <div
      className={cn(
        "flex flex-col items-center h-svh container mx-auto p-4",
        isStandalone ? "justify-start" : "justify-center"
      )}
    >
      {importedLessonsList.length > 0 && isStandalone ? (
        <div className="w-full flex flex-col gap-4 items-center mx-auto">
          {importedLessonsList.length > 0 && (
            <>
              {importedLessonsList.map((lesson, index) => (
                <div
                  key={crypto.randomUUID()}
                  className="w-full flex flex-col items-center"
                >
                  <LessonCard
                    courseTitle={lesson.courseTitle}
                    lessonTitle={lesson.lessonTitle}
                    lessonId={lesson.lessonId}
                    lastTrained={lesson.lastTrained}
                    trainingTimeRecord={lesson.trainingTimeRecord}
                    ctaButtonText={
                      index === 0
                        ? "Continue Training"
                        : "Switch To This Lesson"
                    }
                    className={
                      index === importedLessonsList.length - 1 ? "mb-20" : ""
                    }
                  />
                  {index === 0 && importedLessonsList.length > 1 && (
                    <div className="w-full text-center text-2xl font-bold text-muted-foreground mt-12">
                      Your Library
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
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
              disabled={!isAppReady}
              className="w-full"
              aria-label={`Start 1 minute training session for The Race MS`}
              onClick={() => router.push("/free-sample")}
            >
              <PlayCircle size={24} aria-hidden="true" />
              {isAppReady ? "Start Training" : "Loading..."}
            </Button>
          </CardFooter>
        </Card>
      )}
      {isStandalone && <TabNavigation currentTab="/" />}
    </div>
  );
}
