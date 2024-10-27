"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EnterAppButton({
  destinationRoute,
}: {
  destinationRoute: string;
}) {
  const router = useRouter();

  function handleNavigateTo(destination: string) {
    router.push(destination);
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5 }}
      className="flex items-center px-6 py-3 bg-white text-black rounded-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
      onClick={() => handleNavigateTo(destinationRoute)}
    >
      English <ChevronRight className="ml-2 w-5 h-5" />
    </motion.button>
  );
}
