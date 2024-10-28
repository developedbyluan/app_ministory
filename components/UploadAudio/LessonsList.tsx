import { motion } from "framer-motion";
import LessonItem from "./LessonItem";

type Lesson = {
  id: number;
  title: string;
};

type LessonsListProps = {
  lessonsData: Lesson[];
};

export default function LessonsList({ lessonsData }: LessonsListProps) {
  const lessonsElement = lessonsData.map((lesson) => {
    return <LessonItem key={lesson.id} lesson={lesson} />;
  });
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.05 }}
      className="space-y-2"
    >
      {lessonsElement}
    </motion.ul>
  );
}
