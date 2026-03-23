"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

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

const slideInLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

interface PeriodData {
  label: string;
  evaluationsCompleted: number;
  evaluationsTotal: number;
  averageRating: number;
}

interface PeriodComparisonSlideProps {
  period1: PeriodData;
  period2: PeriodData;
}

function PeriodCardContent({ data }: { data: PeriodData }) {
  const fillPercent = Math.min((data.averageRating / 5) * 100, 100);

  return (
    <>
      {/* Period label */}
      <p className="text-sm font-semibold text-white/80">{data.label}</p>

      {/* Completion count */}
      <p className="text-2xl font-bold text-white mt-2 leading-none">
        {data.evaluationsCompleted}/{data.evaluationsTotal}
      </p>
      <p className="text-xs text-white/60 mt-1">ingevuld</p>

      {/* Rating bar */}
      <div
        className="bg-white/20 h-2 rounded-full mt-3"
        role="img"
        aria-label={`Gemiddelde beoordeling ${data.averageRating} van 5`}
      >
        <div
          className="bg-white h-full rounded-full"
          style={{ width: `${fillPercent}%` }}
        />
      </div>

      {/* Rating label */}
      <p className="text-sm text-white/70 mt-1">
        {data.averageRating.toFixed(1)} / 5
      </p>
    </>
  );
}

export default function PeriodComparisonSlide({
  period1,
  period2,
}: PeriodComparisonSlideProps) {
  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center px-6 text-center"
      style={{
        background: "linear-gradient(to bottom, #FFCD00, #1B1B1B)",
      }}
      variants={container}
      initial="hidden"
      animate="show"
      role="region"
      aria-label="Periode vergelijking slide"
    >
      {/* Heading */}
      <motion.p
        className="text-xl font-bold text-white"
        variants={fadeUp}
      >
        Jouw groei dit semester
      </motion.p>

      {/* Two comparison cards */}
      <div
        className="flex gap-3 mt-8 w-full"
        aria-label="Vergelijking per periode"
      >
        <motion.div
          className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 flex-1 border border-white/20"
          variants={slideInLeft}
        >
          <PeriodCardContent data={period1} />
        </motion.div>
        <motion.div
          className="bg-white/15 backdrop-blur-sm rounded-2xl p-5 flex-1 border border-white/20"
          variants={slideInRight}
        >
          <PeriodCardContent data={period2} />
        </motion.div>
      </div>

      {/* Trend icon */}
      <motion.div variants={popIn} className="mt-6">
        <TrendingUp
          className="text-white w-8 h-8"
          aria-hidden="true"
        />
      </motion.div>

      {/* Bottom motivational text */}
      <motion.p
        className="text-base font-semibold text-white mt-3"
        variants={fadeUp}
      >
        Je bent steeds actiever geworden!
      </motion.p>
    </motion.div>
  );
}
