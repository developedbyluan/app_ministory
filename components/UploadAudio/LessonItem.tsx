import { motion } from "framer-motion";

type Lesson = {
  id: number;
  title: string;
};

type LessonItemProps = {
  lesson: Lesson;
};

export default function LessonItem({ lesson }: LessonItemProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: lesson.id * 0.3 }}
      className="bg-zinc-100 p-3 rounded-md shadow-sm hover:bg-zinc-200 transition-colors"
    >
      {lesson.title}
    </motion.li>
  );
}
