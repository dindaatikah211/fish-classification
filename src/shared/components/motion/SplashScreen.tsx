"use client";

import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { EASE, SPLASH_DURATION } from "@/shared/constants/Motion";

const FISH_PATHS = [
  "M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z",
  "M16 17.93a9.77 9.77 0 0 1 0-11.86",
  "M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33",
  "M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4",
  "m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98",
  "M18 12v.5",
];

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    lenis?.stop();
    return () => lenis?.start();
  }, [lenis]);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: SPLASH_DURATION,
      ease: "easeInOut",
      onUpdate: (latest) => setProgress(Math.round(latest)),
      onComplete,
    });
    return () => controls.stop();
  }, [onComplete]);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="fixed inset-0 z-[1000] flex flex-col justify-between bg-[#0871E7] px-10 py-8 text-white"
    >
      <p className="font-sans text-[11px] uppercase tracking-[0.15em] text-white/60">
        Memuat · Loading
      </p>

      <div className="flex flex-col items-center gap-7">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="h-[min(28vh,200px)] w-auto"
        >
          {FISH_PATHS.map((d, index) => (
            <motion.path
              key={d}
              d={d}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: index * 0.2, ease: EASE }}
            />
          ))}
        </svg>
        <p
          className="font-instrument tracking-tight"
          style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
        >
          fin.
        </p>
      </div>

      <div>
        <p
          className="mb-4 text-right font-instrument leading-none tracking-tighter tabular-nums"
          style={{ fontSize: "clamp(48px, 9vw, 120px)" }}
        >
          {String(progress).padStart(2, "0")}
        </p>
        <div className="h-px bg-white/20">
          <div className="h-full bg-white" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </motion.div>
  );
}