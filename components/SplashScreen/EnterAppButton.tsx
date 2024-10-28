"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function EnterAppButton({ hrefValue }: { hrefValue: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 2 }}
      className="flex items-center px-6 py-3 bg-white text-black rounded-full text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
    >
      <Link href={hrefValue || "/"} className="flex items-center">
        <span>Start</span>
        <ChevronRight className="ml-2 w-5 h-5" />
      </Link>
    </motion.div>
  );
}
