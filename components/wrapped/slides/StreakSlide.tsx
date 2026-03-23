"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import CountUp from "@/components/wrapped/CountUp";

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

interface StreakSlideProps {
  longestStreak: number;
  favoriteDay: string;
}

export default function StreakSlide({
  longestStreak,
  favoriteDay,
}: StreakSlideProps) {
  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center px-8 text-center"
      style={{
        background: "linear-gradient(135deg, #FFCD00, #1B1B1B)",
      }}
      variants={container}
      initial="hidden"
      animate="show"
      role="region"
      aria-label="Streak slide"
    >
      {/* Flame icon */}
      <motion.div variants={popIn}>
        <Flame
          className="text-white"
          width={56}
          height={56}
          aria-hidden="true"
        />
      </motion.div>

      {/* Streak label */}
      <motion.p
        className="text-base text-white/80 mt-4"
        variants={fadeUp}
      >
        Je langste feedback-streak
      </motion.p>

      {/* Large streak number */}
      <motion.div variants={fadeUp}>
        <CountUp
          end={longestStreak}
          duration={1000}
          delay={500}
          className="text-9xl font-bold text-white leading-none mt-2"
        />
      </motion.div>

      {/* Weeks label */}
      <motion.p
        className="text-xl font-semibold text-white mt-2"
        variants={fadeUp}
      >
        weken achter elkaar
      </motion.p>

      {/* Divider */}
      <motion.div
        className="w-12 h-0.5 mx-auto my-6"
        style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
        variants={fadeUp}
        aria-hidden="true"
      />

      {/* Favorite day */}
      <motion.p
        className="text-sm text-white/60"
        variants={fadeUp}
      >
        Favoriete invuldag: {favoriteDay}
      </motion.p>
    </motion.div>
  );
}
