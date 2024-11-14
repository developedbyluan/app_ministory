import { EyeOff } from "lucide-react";
import { motion } from "framer-motion";

type HideButtonProps = {
  handleHideAutoPausePlayer: () => void;
};

export default function HideButton({
  handleHideAutoPausePlayer,
}: HideButtonProps) {
  return (
    <motion.button
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 0.5 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-3 left-1 px-4 py-3 rounded-2xl bg-gradient-to-r from-zinc-700 to-zinc-600"
      onClick={handleHideAutoPausePlayer}
    >
      <EyeOff size={32} color="white" />
    </motion.button>
  );
}
