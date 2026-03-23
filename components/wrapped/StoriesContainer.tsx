"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo, type Variants } from "framer-motion";

interface StoriesContainerProps {
  children: React.ReactNode[];
}

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const slideTransition = {
  x: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const },
  opacity: { duration: 0.3, ease: [0.32, 0.72, 0, 1] as const },
};

const SWIPE_THRESHOLD = 50;
const SWIPE_VELOCITY_THRESHOLD = 500;

export default function StoriesContainer({ children }: StoriesContainerProps) {
  const [[currentSlide, direction], setSlideState] = useState([0, 0]);
  const totalSlides = children.length;
  const isLastSlide = currentSlide === totalSlides - 1;
  const isFirstSlide = currentSlide === 0;

  const goNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      setSlideState([currentSlide + 1, 1]);
    }
  }, [currentSlide, totalSlides]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) {
      setSlideState([currentSlide - 1, -1]);
    }
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goNext();
      } else if (e.key === "ArrowLeft") {
        goPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info;
      const swipedLeft =
        offset.x < -SWIPE_THRESHOLD || velocity.x < -SWIPE_VELOCITY_THRESHOLD;
      const swipedRight =
        offset.x > SWIPE_THRESHOLD || velocity.x > SWIPE_VELOCITY_THRESHOLD;

      if (swipedLeft && !isLastSlide) {
        goNext();
      } else if (swipedRight && !isFirstSlide) {
        goPrev();
      }
    },
    [goNext, goPrev, isLastSlide, isFirstSlide]
  );

  return (
    <div
      className="h-full w-full relative overflow-hidden bg-uu-black"
      style={{ touchAction: "pan-y" }}
    >
      {/* Progress indicators */}
      <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 pt-3 px-3">
        {Array.from({ length: totalSlides }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden"
            aria-label={`Slide ${i + 1} van ${totalSlides}`}
          >
            <motion.div
              className="h-full bg-white rounded-full"
              animate={{ width: i <= currentSlide ? "100%" : "0%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        ))}
      </div>

      {/* Active slide with AnimatePresence */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={slideTransition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          className="h-full w-full"
        >
          {children[currentSlide]}
        </motion.div>
      </AnimatePresence>

      {/* Tap zones — left 40% goes back, right 60% goes forward */}
      <div className="absolute inset-0 z-20 flex">
        <div
          className="w-[40%] h-full cursor-pointer"
          aria-label="Vorige slide"
          onClick={goPrev}
        />
        <div
          className="w-[60%] h-full cursor-pointer"
          aria-label="Volgende slide"
          onClick={goNext}
        />
      </div>
    </div>
  );
}
