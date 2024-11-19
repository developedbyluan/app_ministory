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
import { useRouter } from "next/navigation";

import { set, createStore } from "idb-keyval";
import { currentDate } from "@/helpers/current-date";

import { database } from "@/data/msa--english/database";

// TODO: Load lessonsData (list of available lessons) from a database instead of dummy data
import { lessonsList as lessonsData } from "@/data/msa--english/lessons-list";

import TabNavigation from "@/components/TabNavigation";

export default function UploadAudioPage() {
  const [showLessons, setShowLessons] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { error, success, handleFileChange, file } = useFileUpload();

  const { toast } = useToast();

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
    const mp3Store = createStore("msa--english", "mp3");
    const lyricsStore = createStore("msa--english", "lyrics");
    const dictionaryStore = createStore("msa--english", "dictionary");

    const userStore = createStore("msa--user", "total-training-time");

    Promise.all([
      set(fileNameAsUrl, file, mp3Store),
      set(fileNameAsUrl, database.get(fileNameAsUrl)?.lyrics, lyricsStore),
      set(
        fileNameAsUrl,
        database.get(fileNameAsUrl)?.dictionary,
        dictionaryStore
      ),
      set(fileNameAsUrl, { [currentDate]: 0 }, userStore),
    ])
      .then(() => {
        router.push(`/english?id=${fileNameAsUrl}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [error, success, file, toast, router]);

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
