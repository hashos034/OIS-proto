"use client";

import { useState, useEffect, useRef } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  delay?: number;
}

// Smooth deceleration — starts fast, eases to a stop
const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export default function CountUp({
  end,
  duration = 1500,
  suffix = "",
  prefix = "",
  className = "",
  delay = 0,
}: CountUpProps) {
  const [value, setValue] = useState<number>(0);
  const rafRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Determine display precision from the target value
  const isDecimal = end % 1 !== 0;

  useEffect(() => {
    // Reset to 0 whenever end changes (e.g. slide re-mounts)
    setValue(0);

    // Respect prefers-reduced-motion — jump straight to the final value
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setValue(end);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);
        const easedT = easeOutCubic(t);

        setValue(easedT * end);

        if (t < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          // Snap to exact target to avoid floating-point drift
          setValue(end);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [end, duration, delay]);

  const displayValue = isDecimal ? value.toFixed(1) : Math.round(value);

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
