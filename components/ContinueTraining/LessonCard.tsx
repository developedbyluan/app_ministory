"use client";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { TrainingTimeRecord } from "@/types/types";

import { useRouter } from "next/navigation";

import StatsTable from "./StatsTable";

type LessonCardProps = {
  courseTitle: string;
  lessonTitle: string;
  lessonId: string;
  lastTrained: string;
  trainingTimeRecord: TrainingTimeRecord;
  ctaButtonText?: string;
  className?: string;
  lessonIndex?: number;
};

export default function LessonCard({
  courseTitle,
  lessonTitle,
  lessonId,
  lastTrained,
  trainingTimeRecord,
  ctaButtonText,
  className,
  lessonIndex,
}: LessonCardProps) {
  const router = useRouter();

  const [isTableVisible, setIsTableVisible] = useState(false);

  return (
    <>
      <Card
        className={`w-full max-w-sm cursor-pointer ${className}`}
        role="button"
        onClick={() => {
          console.log(lessonIndex);
          setIsTableVisible((prev) => !prev);
        }}
        aria-label={`View stats for ${lessonTitle} from ${courseTitle}`}
      >
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">{courseTitle}</p>
              <h3 className="text-2xl font-bold">{lessonTitle}</h3>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              Last trained: {lastTrained}
            </Badge>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant={lessonIndex === 0 ? "default" : "secondary"}
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/english?id=${lessonId}`);
            }}
            aria-label={`Start training session for ${lessonTitle}`}
          >
            <PlayCircle className="mr-2" size={24} aria-hidden="true" />
            {ctaButtonText}
          </Button>
        </CardFooter>
      </Card>
      <StatsTable
        isTableVisible={isTableVisible}
        setIsTableVisible={setIsTableVisible}
        learningSessions={trainingTimeRecord}
      />
    </>
  );
}
