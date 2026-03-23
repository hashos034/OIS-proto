"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
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

interface CourseHighlightsSlideProps {
  courses: { name: string; grade: number; evaluations: number; totalEvaluations: number }[];
}

const RANK_LABELS = ["1", "2", "3"];

export default function CourseHighlightsSlide({ courses }: CourseHighlightsSlideProps) {
  // Only ever show the top 3
  const topThree = courses.slice(0, 3);

  return (
    <motion.div
      className="h-full w-full flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "linear-gradient(to bottom, #1B1B1B, #FFCD00)" }}
      variants={container}
      initial="hidden"
      animate="show"
      role="region"
      aria-label="Cursus highlights slide"
    >
      {/* Icon */}
      <motion.div variants={popIn} aria-hidden="true">
        <BarChart3 className="text-white" width={52} height={52} strokeWidth={1.75} />
      </motion.div>

      {/* Label */}
      <motion.p
        className="text-base font-semibold text-white mt-4 mb-6"
        variants={fadeUp}
      >
        Jouw top vakken
      </motion.p>

      {/* Course list */}
      <motion.ol
        className="w-full space-y-3"
        variants={container}
        aria-label="Top 3 vakken"
      >
        {topThree.map((course, index) => {
          const progressPct =
            course.totalEvaluations > 0
              ? Math.round((course.evaluations / course.totalEvaluations) * 100)
              : 0;

          return (
            <motion.li
              key={`${course.name}-${index}`}
              className="w-full"
              variants={fadeUp}
            >
              {/* Card row */}
              <div
                className="flex items-center gap-3 w-full"
                style={{ minHeight: "44px" }}
              >
                {/* Rank badge */}
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#FFCD00" }}
                  aria-label={`Rang ${RANK_LABELS[index]}`}
                >
                  <span
                    className="text-xs font-bold leading-none"
                    style={{ color: "#1B1B1B" }}
                  >
                    {RANK_LABELS[index]}
                  </span>
                </div>

                {/* Course info */}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold text-white truncate leading-tight">
                    {course.name}
                  </p>
                  <p className="text-xs text-white/60 mt-0.5 leading-tight">
                    {course.evaluations}/{course.totalEvaluations} evaluaties
                  </p>
                </div>

                {/* Grade */}
                <div className="flex-shrink-0 text-right" aria-label={`Cijfer: ${course.grade}`}>
                  <CountUp
                    end={course.grade}
                    duration={900}
                    delay={300 + index * 150}
                    className="text-2xl font-bold text-white leading-none"
                  />
                </div>
              </div>

              {/* Progress bar */}
              <div
                className="mt-2 h-1.5 w-full rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                role="progressbar"
                aria-valuenow={progressPct}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${course.evaluations} van ${course.totalEvaluations} evaluaties ingevuld`}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.6 + index * 0.15,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                />
              </div>
            </motion.li>
          );
        })}
      </motion.ol>

      {/* Bottom text */}
      <motion.p
        className="text-sm text-white/70 mt-8"
        variants={fadeUp}
      >
        Meer feedback → betere resultaten!
      </motion.p>
    </motion.div>
  );
}
