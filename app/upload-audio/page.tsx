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

// TODO: Load lessonsData (list of available lessons) from a database instead of dummy data
import { lessons as lessonsData } from "@/data/lessons";

export default function UploadAudioPage() {
  const [showLessons, setShowLessons] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // TODO: assign audio file uploaded to a context api
    // TODO: redirect user to the next page
    console.log(file);
    console.log(
      "set file to mp3 context.then(push to /story if 1st time, else /practice)"
    );
  }, [error, success, file, toast]);

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
