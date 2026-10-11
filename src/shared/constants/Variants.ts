import type { Variants } from "motion/react";
import { EASE } from "./Motion";

export const LINE_MASK = "block overflow-hidden pb-[0.12em] -mb-[0.12em]";

export const stagger = (delayChildren = 0.1): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren } },
});

export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const lineUp: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1.05, ease: EASE } },
};