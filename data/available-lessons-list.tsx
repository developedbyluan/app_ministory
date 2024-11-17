export const availableLessonsList = new Map<string, object>();

availableLessonsList.set("the-race-ms", {
  order: 0,
  lessonId: "the-race-ms",
  title: "The Race MS",
  courseTitle: "Effortless English Book",
  duration: 1500000, // 25 minutes in milliseconds
  fileMetadata: {
    fileName: "The Race MS.mp3",
  },
});

availableLessonsList.set("day-of-the-dead-ms", {
  order: 1,
  lessonId: "day-of-the-dead-ms",
  title: "Day of the Dead MS",
  courseTitle: "Original English",
  duration: 2100000, // 35 minutes in milliseconds
  fileMetadata: {
    fileName: "Day of the Dead MS.mp3",
  },
});
