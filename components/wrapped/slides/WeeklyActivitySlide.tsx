"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

const barIn = {
  hidden: { opacity: 0, scaleX: 0 },
  show: { opacity: 1, scaleX: 1, transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const } },
};

// Sub-container for staggering bar rows
const barsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const barRow = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] as const } },
};

interface WeeklyActivitySlideProps {
  weeks: { week: number; count: number }[];
  peakWeek: number;
  pattern: string;
}

export default function WeeklyActivitySlide({
  weeks,
  peakWeek,
  pattern,
}: WeeklyActivitySlideProps) {
  const maxCount = Math.max(...weeks.map((w) => w.count), 1);

  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#1B1B1B" }}
      variants={container}
      initial="hidden"
      animate="show"
      role="region"
      aria-label="Wekelijkse activiteit slide"
    >
      {/* Icon */}
      <motion.div variants={popIn}>
        <CalendarDays
          className="text-white"
          width={48}
          height={48}
          aria-hidden="true"
        />
      </motion.div>

      {/* Label */}
      <motion.p
        className="text-base font-semibold text-white mt-4 mb-5"
        variants={fadeUp}
      >
        Jouw feedbackritme
      </motion.p>

      {/* Bar chart */}
      <motion.div
        className="w-full flex flex-col gap-1.5"
        variants={barsContainer}
        role="img"
        aria-label="Horizontale staafgrafiek van wekelijkse feedback activiteit"
      >
        {weeks.map(({ week, count }) => {
          const fillPercent = (count / maxCount) * 100;
          const isPeak = week === peakWeek;

          return (
            <motion.div
              key={week}
              className="flex items-center gap-2"
              variants={barRow}
            >
              {/* Week label */}
              <span
                className="text-xs shrink-0 text-right"
                style={{ color: "rgba(255,255,255,0.6)", width: "28px" }}
              >
                Wk {week}
              </span>

              {/* Bar track */}
              <div
                className="flex-1 rounded-full h-5 overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                role="presentation"
              >
                {/* Bar fill */}
                <motion.div
                  className="h-full rounded-full origin-left"
                  style={{
                    width: `${fillPercent}%`,
                    backgroundColor: isPeak ? "#FFCD00" : "rgba(255,255,255,0.75)",
                    minWidth: count > 0 ? "4px" : "0px",
                  }}
                  variants={barIn}
                  aria-label={`Week ${week}: ${count} feedback${count !== 1 ? "s" : ""}`}
                />
              </div>

              {/* Count label */}
              <span
                className="text-xs shrink-0"
                style={{
                  color: isPeak ? "#FFCD00" : "rgba(255,255,255,0.5)",
                  width: "16px",
                }}
              >
                {count}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Peak callout */}
      <motion.p
        className="text-sm mt-5"
        style={{ color: "#FFCD00" }}
        variants={fadeUp}
      >
        Piekweek: Week {peakWeek}
      </motion.p>

      {/* Pattern label */}
      <motion.p
        className="text-base font-semibold text-white mt-2 text-center"
        variants={fadeUp}
      >
        {pattern}
      </motion.p>
    </motion.div>
  );
}
