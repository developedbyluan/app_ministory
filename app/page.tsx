"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import TabNavigation from "@/components/TabNavigation";

import LessonCard from "@/components/ContinueTraining/LessonCard";
import { useEffect, useState } from "react";
import { createStore, entries } from "idb-keyval";
import { openDB } from "idb";

import { availableLessonsList } from "@/data/available-lessons-list";
import { TrainingTimeRecord } from "@/types/types";

const AUDIO_URL = "./The Race MS.mp3";
const AUDIO_KEY = "the-race-ms";

import { currentDate } from "@/helpers/current-date";
import { database } from "@/data/msa--english/database";

import { cn } from "@/lib/utils";

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

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
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
                  return;
                }

                const newLessonsList = entries
                  .reduce(
                    (
                      acc: typeof importedLessonsList,
                      [lessonId, trainingTimeRecord]
                    ) => {
                      const lesson = availableLessonsList.get(
                        lessonId.toString()
                      );
                      if (!lesson) return acc;

                      const lastTrained =
                        Object.entries(trainingTimeRecord).at(-1)?.[0] || "";

                      const totalTrainingTime = Object.values(
                        trainingTimeRecord
                      ).reduce((acc, curr) => acc + curr, 0);

                      const data = {
                        courseTitle: lesson.courseTitle,
                        lessonTitle: lesson.title,
                        lastTrained: lastTrained,
                        order: Date.parse(lastTrained) + totalTrainingTime,
                        lessonId: lessonId.toString(),
                        trainingTimeRecord: trainingTimeRecord,
                      };
                      return [...acc, data];
                    },
                    []
                  )
                  .sort((a, b) => b.order - a.order);

                setImportedLessonsList(newLessonsList);
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
  }, [router, toast]);

  return (
    <div
      className={cn(
        "flex flex-col items-center h-svh container mx-auto p-4",
        importedLessonsList.length > 1 ? "justify-start" : "justify-center"
      )}
    >
      {importedLessonsList.length > 0 ? (
        <div className="w-full flex flex-col gap-4 items-center mx-auto">
          {importedLessonsList.map((lesson, index) => (
            <div
              key={lesson.lessonId}
              className="w-full flex flex-col items-center"
            >
              <LessonCard
                courseTitle={lesson.courseTitle}
                lessonTitle={lesson.lessonTitle}
                lessonId={lesson.lessonId}
                lastTrained={lesson.lastTrained}
                trainingTimeRecord={lesson.trainingTimeRecord}
                ctaButtonText={
                  index === 0 ? "Continue Training" : "Switch To This Lesson"
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
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <TabNavigation currentTab="/" />
    </div>
  );
}
