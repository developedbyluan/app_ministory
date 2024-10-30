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

import { set, createStore } from "idb-keyval";

// TODO: Load lessonsData (list of available lessons) from a database instead of dummy data
import { lessons as lessonsData } from "@/data/lessons";

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

    const customStore = createStore("msa--english", "mp3");
    set(fileNameAsUrl, file, customStore)
      .then(() => {
        setAudioFile(file);

        router.push(`/story-player?audio=${fileNameAsUrl}`);
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
    <div className="container mx-auto p-4">
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
    </div>
  );
}
