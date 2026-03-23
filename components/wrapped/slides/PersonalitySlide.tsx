"use client";

import { motion } from "framer-motion";
import { Brain } from "lucide-react";

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

const pillContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const pillItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const } },
};

interface PersonalitySlideProps {
  type: string;
  description: string;
  topCategory: string;
  traits: string[];
}

export default function PersonalitySlide({
  type,
  description,
  topCategory: _topCategory,
  traits,
}: PersonalitySlideProps) {
  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center px-8 text-center"
      style={{ backgroundColor: "#1B1B1B" }}
      variants={container}
      initial="hidden"
      animate="show"
      role="region"
      aria-label="Persoonlijkheid slide"
    >
      {/* Small uppercase label */}
      <motion.p
        className="text-sm uppercase tracking-widest text-white/50"
        variants={fadeUp}
      >
        Jouw feedback-persoonlijkheid
      </motion.p>

      {/* Brain icon */}
      <motion.div variants={popIn} className="mt-6">
        <Brain
          width={64}
          height={64}
          aria-hidden="true"
          style={{ color: "#FFCD00" }}
        />
      </motion.div>

      {/* Personality type */}
      <motion.h2
        className="text-3xl font-bold mt-5"
        style={{ color: "#FFCD00" }}
        variants={fadeUp}
      >
        {type}
      </motion.h2>

      {/* Description */}
      <motion.p
        className="text-base text-white/70 leading-relaxed max-w-[280px] mt-4"
        variants={fadeUp}
      >
        {description}
      </motion.p>

      {/* Trait pills */}
      <motion.div
        className="flex gap-2 mt-6 justify-center flex-wrap"
        role="list"
        aria-label="Eigenschappen"
        variants={pillContainer}
      >
        {traits.map((trait) => (
          <motion.span
            key={trait}
            role="listitem"
            className="border border-white/30 rounded-full px-4 py-1.5 text-sm text-white"
            variants={pillItem}
          >
            {trait}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
