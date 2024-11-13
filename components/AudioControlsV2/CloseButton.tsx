import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

type CloseButtonProps = {
  route: string;
};

export default function CloseButton({ route }: CloseButtonProps) {
  const router = useRouter();

  function handleClose() {
    if (route) {
      router.push(route);
    }
  }

  return (
    <motion.button
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-3 left-1 px-4 py-3 rounded-2xl bg-gradient-to-r from-zinc-700 to-zinc-600"
      onClick={handleClose}
    >
      <X size={32} color="white" />
    </motion.button>
  );
}
