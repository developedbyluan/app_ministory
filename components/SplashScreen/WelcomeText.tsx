"use client";

import { motion } from "framer-motion";

export default function WelcomeText() {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        MINI STORY APP
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        style={{ marginTop: "0.25rem" }}
        className="mb-8 text-center text-lg"
      >
        Learn Languages Effortlessly
      </motion.p>
    </>
  );
}
