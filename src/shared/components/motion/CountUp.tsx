"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { EASE } from "@/shared/constants/Motion";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
}

export function CountUp({ value, suffix = "", duration = 1.4 }: CountUpProps) {
  const decimals = String(value).split(".")[1]?.length ?? 0;
  const motionValue = useMotionValue(0);
  const text = useTransform(
    motionValue,
    (latest) => `${latest.toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    const controls = animate(motionValue, value, { duration, ease: EASE });
    return () => controls.stop();
  }, [motionValue, value, duration]);

  return <motion.span>{text}</motion.span>;
}