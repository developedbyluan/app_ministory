"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import UploadAudioButton from "@/components/UploadAudio/UploadAudioButton";
import FileInput from "@/components/UploadAudio/FileInput";
import LessonsList from "@/components/UploadAudio/LessonsList";

import { useFileUpload } from "@/hooks/useFileUpload";
import { useToast } from "@/hooks/use-toast";
import { useDataContext } from "@/contexts/DataContext";
import { useRouter } from "next/navigation";

// import { set, createStore } from "idb-keyval";
import { openDB } from "idb";
import { currentDate } from "@/helpers/current-date";

// TODO: Load lessonsData (list of available lessons) from a database instead of dummy data
import { lessonsList as lessonsData } from "@/data/msa--english/lessons-list";

import TabNavigation from "@/components/TabNavigation";

export default function UploadAudioPage() {
  const [showLessons, setShowLessons] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { error, success, handleFileChange, file } = useFileUpload();

  const { toast } = useToast();

  const { setAudioFile } = useDataContext();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        description: error,
      });
    }

    if (!file || !success) return;

    const fileNameAsUrl = file.name
      .split(".")[0]
      .replace(/\s+/g, "-")
      .toLowerCase();

    // IndexedDB implementation: English Lessons Data
    const englishDbName = "msa--english";
    const mp3StoreName = "mp3";
    const version = 1;

    openDB(englishDbName, version, {
      upgrade(db) {
        if (db.objectStoreNames.contains(mp3StoreName)) return;

        db.createObjectStore(mp3StoreName);
      },
    })
      .then((db) => {
        const tx = db.transaction(mp3StoreName, "readwrite");
        const store = tx.objectStore(mp3StoreName);
        store.put(file, fileNameAsUrl);
      })
      .then(() => {
        setAudioFile(file);

        // IndexedDB implementation: User Data
        const userDbName = "msa--user";
        const importedLessonsListStoreName = "imported-lessons-list";
        const totalTrainingTimeStoreName = "total-training-time";
        const version = 1;

        openDB(userDbName, version, {
          upgrade(db) {
            if (!db.objectStoreNames.contains(importedLessonsListStoreName)) {
              db.createObjectStore(importedLessonsListStoreName);
            }

            if (!db.objectStoreNames.contains(totalTrainingTimeStoreName)) {
              db.createObjectStore(totalTrainingTimeStoreName);
            }
          },
        })
          .then((db) => {
            const importedLessonsListTx = db.transaction(
              importedLessonsListStoreName,
              "readwrite"
            );
            const importedLessonsListStore = importedLessonsListTx.objectStore(
              importedLessonsListStoreName
            );

            const totalTrainingTimeTx = db.transaction(
              totalTrainingTimeStoreName,
              "readwrite"
            );
            const totalTrainingTimeStore = totalTrainingTimeTx.objectStore(
              totalTrainingTimeStoreName
            );

            // Get existing data from IndexedDB
            return Promise.all([
              importedLessonsListStore.put(currentDate, fileNameAsUrl),
              totalTrainingTimeStore.get(fileNameAsUrl).then((existingData) => {
                const updatedSessions = existingData
                  ? { ...existingData }
                  : { [currentDate]: 0 };

                return totalTrainingTimeStore.put(
                  updatedSessions,
                  fileNameAsUrl
                );
              }),
            ]);
          })
          .then(() => {
            router.push(`/all-lyrics-player?audio=${fileNameAsUrl}`);
          });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          description: `Error saving file to IndexedDB: ${error}`,
        });
      });
  }, [error, success, file, toast, setAudioFile, router]);

  function handleUploadAudioButtonClick() {
    const fileInput = fileInputRef.current;
    if (!fileInput) return;
    fileInput.click();
  }

  return (
    <div className="container mx-auto p-4 pb-20">
      <motion.div
        initial={false}
        animate={showLessons ? { y: "3vh" } : { y: "40vh" }}
        transition={{ type: "spring", stiffness: 150, damping: 14 }}
        className="flex flex-col items-center"
      >
        <div
          className={cn(
            "flex gap-4 mb-4",
            showLessons &&
              "sticky top-0 bg-white/60 px-10 py-4 rounded-full justify-evenly"
          )}
        >
          <Button variant="outline">EN</Button>
          <FileInput ref={fileInputRef} onChange={handleFileChange} />
          <UploadAudioButton
            textContent="Select MP3"
            onClick={handleUploadAudioButtonClick}
          />
        </div>
        <Button
          variant="link"
          className="mb-8"
          onClick={() => setShowLessons((prev) => !prev)}
        >
          Available Lessons
        </Button>
        {showLessons && <LessonsList lessonsData={lessonsData} />}
      </motion.div>
      <TabNavigation currentTab="/upload-audio" />
    </div>
  );
}
