"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ClipboardCheck, Brain, BookOpen, Flame } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const } },
};

interface ShareCardSlideProps {
  evaluationsCompleted: number;
  personalityType: string;
  topCourse: string;
  streak: number;
}

export default function ShareCardSlide({
  evaluationsCompleted,
  personalityType,
  topCourse,
  streak,
}: ShareCardSlideProps) {
  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#1B1B1B" }}
      variants={container}
      initial="hidden"
      animate="show"
      role="region"
      aria-label="Deel je resultaten slide"
    >
      {/* Shareable card */}
      <motion.div
        className="bg-white rounded-3xl p-6 w-full max-w-[300px] shadow-2xl"
        variants={scaleIn}
        aria-label="Deel kaart"
      >
        {/* Yellow top bar */}
        <div
          className="bg-uu-yellow h-2 rounded-full w-full mb-4"
          aria-hidden="true"
        />

        {/* Title */}
        <p className="text-lg font-bold text-uu-text text-center">
          Mijn Semester Wrapped
        </p>

        {/* Subtitle */}
        <p className="text-xs text-uu-text-secondary text-center mt-1">
          2025-2026 — Semester 1
        </p>

        {/* Divider */}
        <div className="border-t border-uu-border my-4" aria-hidden="true" />

        {/* Stat rows */}
        <ul className="space-y-0" aria-label="Statistieken">
          {/* Evaluations */}
          <li className="flex gap-3 items-center py-2">
            <ClipboardCheck
              className="w-5 h-5 text-uu-black shrink-0"
              aria-hidden="true"
            />
            <span className="text-sm text-uu-text">
              {evaluationsCompleted} evaluaties ingevuld
            </span>
          </li>

          {/* Personality type */}
          <li className="flex gap-3 items-center py-2">
            <Brain
              className="w-5 h-5 text-uu-black shrink-0"
              aria-hidden="true"
            />
            <span className="text-sm text-uu-text font-semibold">
              {personalityType}
            </span>
          </li>

          {/* Top course */}
          <li className="flex gap-3 items-center py-2">
            <BookOpen
              className="w-5 h-5 text-uu-black shrink-0"
              aria-hidden="true"
            />
            <span className="text-sm text-uu-text">
              Top vak: {topCourse}
            </span>
          </li>

          {/* Streak */}
          <li className="flex gap-3 items-center py-2">
            <Flame
              className="w-5 h-5 text-uu-black shrink-0"
              aria-hidden="true"
            />
            <span className="text-sm text-uu-text">{streak} weken streak</span>
          </li>
        </ul>

        {/* Footer attribution */}
        <p className="text-center text-[10px] text-uu-text-secondary mt-4">
          Universiteit Utrecht — Learner Journey
        </p>
      </motion.div>

      {/* Share button */}
      <motion.button
        type="button"
        className="bg-uu-yellow text-uu-text font-semibold rounded-xl h-12 px-8 cursor-pointer hover:opacity-90 transition-opacity mt-6"
        variants={fadeUp}
        onClick={() => {}}
        aria-label="Deel je resultaten"
      >
        Deel je resultaten
      </motion.button>

      {/* Back to dashboard */}
      <motion.div variants={fadeUp}>
        <Link
          href="/dashboard"
          className="text-white/50 text-sm mt-3 cursor-pointer hover:text-white/70 transition-colors inline-block"
        >
          Terug naar dashboard
        </Link>
      </motion.div>
    </motion.div>
  );
}
