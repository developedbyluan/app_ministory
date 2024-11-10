"use client";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export default function LoadingLogo() {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-64 h-64 mb-8"
    >
      <div className="absolute inset-0 border-8 border-white rounded-full" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-2 border-4 border-white border-dashed rounded-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <BookOpen className="w-28 h-28" aria-hidden="true" />
      </div>
    </motion.div>
  );
}
