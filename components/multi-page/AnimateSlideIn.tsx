import { AnimatePresence, motion } from "motion/react";
import React from "react";

export default function AnimateSlideIn({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.3,
            type: "tween",
            ease: "easeInOut",
          },
        }}
        exit={{ opacity: 0, x: -100 }}
        className=" h-screen flex flex-col gap-2"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
