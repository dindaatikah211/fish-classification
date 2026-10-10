"use client";

import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { EASE, SPLASH_DURATION } from "@/shared/constants/Motion";

const FISH_PATHS = [
  "M28 60 C58 14 132 14 160 60 C132 106 58 106 28 60 Z",
  "M160 60 L194 32 L194 88 Z",
  "M86 28 C98 10 120 10 130 30",
  "M60 42 C50 54 50 66 60 78",
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
          viewBox="0 0 200 120"
          fill="none"
          aria-hidden="true"
          className="h-[min(30vh,220px)] w-auto"
        >
          {FISH_PATHS.map((d, index) => (
            <motion.path
              key={d}
              d={d}
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: index * 0.2, ease: EASE }}
            />
          ))}
          <motion.circle
            cx={48}
            cy={52}
            r={3}
            fill="currentColor"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
          />
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