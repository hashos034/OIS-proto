"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import CountUp from "@/components/wrapped/CountUp";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

const tierMotivation: Record<"Brons" | "Zilver" | "Goud", string> = {
  Brons: "Elke bijdrage telt — blijf zo doorgaan!",
  Zilver: "Je feedback maakt echt een verschil!",
  Goud: "Je neemt de tijd om echt te helpen!",
};

interface FeedbackQualitySlideProps {
  tier: "Brons" | "Zilver" | "Goud";
  avgWordCount: number;
  longestResponse: number;
  openQuestionRate: number;
}

export default function FeedbackQualitySlide({
  tier,
  avgWordCount,
  longestResponse,
  openQuestionRate,
}: FeedbackQualitySlideProps) {
  const motivation = tierMotivation[tier];

  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center px-8 text-center"
      style={{ backgroundColor: "#FFCD00" }}
      variants={container}
      initial="hidden"
      animate="show"
      role="region"
      aria-label="Feedback kwaliteit slide"
    >
      {/* Icon */}
      <motion.div variants={popIn}>
        <Award
          className="text-uu-black"
          width={52}
          height={52}
          aria-hidden="true"
        />
      </motion.div>

      {/* Label */}
      <motion.p
        className="text-xs font-semibold text-uu-black/60 uppercase tracking-widest mt-4"
        variants={fadeUp}
      >
        Kwaliteit van jouw feedback
      </motion.p>

      {/* Tier badge */}
      <motion.p
        className="text-5xl font-bold text-uu-black mt-3 leading-none"
        variants={popIn}
        aria-label={`Kwaliteitstier: ${tier}`}
      >
        {tier.toUpperCase()}
      </motion.p>

      {/* Stats list */}
      <motion.div
        className="flex flex-col gap-3 mt-7 w-full"
        role="list"
        aria-label="Feedback statistieken"
      >
        {/* Stat 1 — avg word count */}
        <motion.div
          className="rounded-xl px-5 py-3.5 flex items-center justify-between"
          style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
          variants={fadeUp}
          role="listitem"
        >
          <span className="text-sm font-medium text-uu-black">
            Gem. woordenaantal
          </span>
          <CountUp
            end={avgWordCount}
            duration={1000}
            delay={400}
            className="text-lg font-bold text-uu-black"
          />
        </motion.div>

        {/* Stat 2 — longest response */}
        <motion.div
          className="rounded-xl px-5 py-3.5 flex items-center justify-between"
          style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
          variants={fadeUp}
          role="listitem"
        >
          <span className="text-sm font-medium text-uu-black">
            Langste antwoord
          </span>
          <span className="text-lg font-bold text-uu-black">
            <CountUp
              end={longestResponse}
              duration={1100}
              delay={550}
            />{" "}
            <span className="text-sm font-medium">woorden</span>
          </span>
        </motion.div>

        {/* Stat 3 — open question rate */}
        <motion.div
          className="rounded-xl px-5 py-3.5 flex items-center justify-between"
          style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
          variants={fadeUp}
          role="listitem"
        >
          <span className="text-sm font-medium text-uu-black">
            Open vragen beantwoord
          </span>
          <CountUp
            end={openQuestionRate}
            duration={1000}
            delay={700}
            suffix="%"
            className="text-lg font-bold text-uu-black"
          />
        </motion.div>
      </motion.div>

      {/* Motivational bottom text */}
      <motion.p
        className="text-sm font-semibold text-uu-black mt-6"
        variants={fadeUp}
      >
        {motivation}
      </motion.p>
    </motion.div>
  );
}
