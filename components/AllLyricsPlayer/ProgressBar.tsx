import { motion } from "framer-motion";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1 }}
      className="h-2 bg-red-700 fixed left-0 top-0"
    />
  );
}
