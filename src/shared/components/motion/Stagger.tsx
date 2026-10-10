"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { EASE, REVEAL_VIEWPORT } from "@/shared/constants/Motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export function Stagger(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={REVEAL_VIEWPORT}
      {...props}
    />
  );
}

export function StaggerItem(props: HTMLMotionProps<"div">) {
  return <motion.div variants={item} {...props} />;
}