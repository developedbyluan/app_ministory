"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type LessonCardProps = {
  courseTitle: string;
  lessonTitle: string;
  lessonId: string;
  trainingTotalTime: number;
};

export default function LessonCard({
  courseTitle,
  lessonTitle,
  lessonId,
  trainingTotalTime,
}: LessonCardProps) {
  return (
    <Card
      className="w-full max-w-sm cursor-pointer"
      role="button"
      onClick={() => {
        console.log("Toggle Stat Table");
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
            Training {trainingTotalTime} minutes
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={(e) => {
            e.stopPropagation();
            console.log(lessonId);
          }}
          aria-label={`Start ${trainingTotalTime} minute training session for ${lessonTitle}`}
        >
          <PlayCircle className="mr-2" size={24} aria-hidden="true" />
          Train for 1 Minute
        </Button>
      </CardFooter>
    </Card>
  );
}
