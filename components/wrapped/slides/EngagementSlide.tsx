"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/wrapped/CountUp";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const } },
};

interface EngagementSlideProps {
  totalEvaluations: number;
  peerPercentile: number;
  averageResponseRate: number;
}

export default function EngagementSlide({
  totalEvaluations,
  peerPercentile,
  averageResponseRate: _averageResponseRate,
}: EngagementSlideProps) {
  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center px-8 text-center"
      style={{ backgroundColor: "#FFCD00" }}
      variants={container}
      initial="hidden"
      animate="show"
      role="region"
      aria-label="Betrokkenheid slide"
    >
      {/* Intro label */}
      <motion.p
        className="text-base font-medium text-uu-black"
        variants={fadeUp}
      >
        Dit semester heb je
      </motion.p>

      {/* Large evaluation count */}
      <motion.div variants={fadeUp}>
        <CountUp
          end={totalEvaluations}
          duration={1200}
          delay={200}
          className="text-8xl font-bold text-uu-black leading-none mt-2"
        />
      </motion.div>

      {/* Count label */}
      <motion.p
        className="text-xl font-semibold text-uu-black mt-2"
        variants={fadeUp}
      >
        evaluaties ingevuld
      </motion.p>

      {/* Divider */}
      <motion.div
        className="w-16 h-0.5 mx-auto my-6"
        style={{ backgroundColor: "rgba(27,27,27,0.2)" }}
        variants={fadeUp}
        aria-hidden="true"
      />

      {/* Peer comparison intro */}
      <motion.p
        className="text-base text-uu-black"
        variants={fadeUp}
      >
        Je hebt meer feedback gegeven dan
      </motion.p>

      {/* Percentile number — wrapped in a span to apply the UU Red color */}
      <motion.span
        className="text-4xl font-bold mt-1"
        style={{ color: "#1B1B1B" }}
        variants={fadeUp}
      >
        <CountUp
          end={peerPercentile}
          duration={1000}
          delay={1000}
          suffix="%"
        />
      </motion.span>

      {/* Percentile label */}
      <motion.p
        className="text-base text-uu-black mt-1"
        variants={fadeUp}
      >
        van je medestudenten
      </motion.p>
    </motion.div>
  );
}
