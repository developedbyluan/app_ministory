import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type PauseTouchAreaProps = {
  isPlaying: boolean;
  isReplaying: boolean;
  onPlayPause: () => void;
  onReplay: () => void;
};

export default function PauseTouchArea({
  isPlaying,
  isReplaying,
  onPlayPause,
  onReplay,
}: PauseTouchAreaProps) {
  function handleClick() {
    if (isPlaying) {
      onPlayPause();
    }

    if (isReplaying) {
      onReplay();
    }
  }
  return (
    <motion.div
      animate={{
        borderBottom: [
          "6px solid rgba(161, 161, 170, 0)", // zinc-400 with 0 opacity
          "6px solid rgba(161, 161, 170, 1)", // zinc-400 with full opacity
          "6px solid rgba(161, 161, 170, 0)", // zinc-400 with 0 opacity
        ],
      }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
      id="pause-touch-area"
      role="button"
      aria-label="Pause audio"
      onClick={handleClick}
      className={cn(
        "fixed inset-0",
        isPlaying || isReplaying
          ? "flex flex-col justify-end items-center z-30"
          : "hidden"
      )}
    >
      <p className="w-full text-center text-zinc-400 bg-zinc-50 text-sm">
        Tap Anywhere to Pause
      </p>
    </motion.div>
  );
}
