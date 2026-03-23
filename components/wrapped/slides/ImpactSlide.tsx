"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

interface ImpactSlideProps {
  courseName: string;
  feedbackTopic: string;
  changeDescription: string;
  docentName: string;
}

export default function ImpactSlide({
  courseName,
  feedbackTopic,
  changeDescription,
  docentName,
}: ImpactSlideProps) {
  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "#FFCD00" }}
      variants={container}
      initial="hidden"
      animate="show"
      role="region"
      aria-label="Impact slide"
    >
      {/* Sparkles icon */}
      <motion.div variants={popIn}>
        <Sparkles
          className="w-12 h-12 text-uu-black"
          aria-hidden="true"
        />
      </motion.div>

      {/* Label */}
      <motion.p
        className="text-sm uppercase tracking-widest text-uu-black/60 mt-4"
        variants={fadeUp}
      >
        Jouw impact
      </motion.p>

      {/* Main body text with highlighted terms */}
      <motion.p
        className="text-xl font-medium text-uu-black leading-relaxed max-w-[300px] mt-4"
        variants={fadeUp}
      >
        Jouw feedback over{" "}
        <span className="font-bold">{feedbackTopic}</span> bij{" "}
        <span className="font-bold">{courseName}</span> heeft bijgedragen aan{" "}
        {changeDescription}.
      </motion.p>

      {/* Attribution */}
      <motion.p
        className="text-base text-uu-black/50 mt-6"
        variants={fadeUp}
      >
        — {docentName}
      </motion.p>
    </motion.div>
  );
}
