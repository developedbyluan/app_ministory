import { motion } from "framer-motion";

type ProgressBarProps = {
  progress: number;
};

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
      className="h-3 bg-black shadow-md fixed left-0 top-0"
    />
  );
}
