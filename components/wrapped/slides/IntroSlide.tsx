"use client";

import { motion } from "framer-motion";

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

interface IntroSlideProps {
  name: string;
  semester: string;
  academicYear: string;
}

export default function IntroSlide({
  name,
  semester,
  academicYear,
}: IntroSlideProps) {
  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center px-8 text-center"
      style={{
        background: "linear-gradient(to bottom, #1B1B1B, #FFCD00)",
      }}
      variants={container}
      initial="hidden"
      animate="show"
      role="region"
      aria-label="Introductie slide"
    >
      {/* University label */}
      <motion.p
        className="text-sm font-medium text-white/70"
        variants={fadeUp}
      >
        Universiteit Utrecht
      </motion.p>

      {/* Main title */}
      <motion.h1
        className="text-3xl font-bold text-white mt-4"
        variants={fadeUp}
      >
        Jouw Semester in Review
      </motion.h1>

      {/* Yellow separator line */}
      <motion.div
        className="w-12 h-1 rounded-full mx-auto mt-6"
        style={{ backgroundColor: "#FFCD00" }}
        variants={fadeUp}
        aria-hidden="true"
      />

      {/* Student name */}
      <motion.p
        className="text-2xl font-bold mt-6"
        style={{ color: "#FFCD00" }}
        variants={fadeUp}
      >
        {name}
      </motion.p>

      {/* Semester + academic year subtitle */}
      <motion.p
        className="text-base text-white/60 mt-2"
        variants={fadeUp}
      >
        {semester} — {academicYear}
      </motion.p>
    </motion.div>
  );
}
