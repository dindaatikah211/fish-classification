"use client";

import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import type { PredictResponse } from "@/shared/lib/api";
import { CountUp } from "@/shared/components/motion/CountUp";
import { EASE } from "@/shared/constants/Motion";
import { rise, stagger } from "@/shared/constants/Variants";
import { EYEBROW, PAGE_TITLE } from "../constants/Classify";

interface ResultSummaryProps {
  result: PredictResponse;
  onReset: () => void;
}

const container = stagger(0.15);

export function ResultSummary({ result, onReset }: ResultSummaryProps) {
  const { info, confidence } = result;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="text-center lg:text-left"
    >
      <motion.p variants={rise} className={`${EYEBROW} mb-6`}>
        Hasil · Result
      </motion.p>

      <motion.h1 variants={rise} className={`${PAGE_TITLE} mb-4`}>
        Terdeteksi sebagai <em className="text-[#0871E7]">{info.nama}.</em>
      </motion.h1>

      <motion.p
        variants={rise}
        className="mb-10 flex items-center justify-center gap-2 font-sans text-[15px] italic text-[#1a1a1a]/50 lg:justify-start"
      >
        <span className="text-xl not-italic">{info.emoji}</span>
        {info.nama_latin}
      </motion.p>

      <motion.div variants={rise} className="mx-auto mb-10 max-w-md lg:mx-0">
        <div className="mb-3 flex items-baseline justify-between">
          <span className="font-sans text-[13px] text-[#1a1a1a]/70">
            Tingkat Keyakinan
          </span>
          <span className="font-instrument text-[44px] leading-none tracking-tight text-[#0871E7] tabular-nums">
            <CountUp value={Math.round(confidence * 10) / 10} suffix="%" />
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-black/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence}%` }}
            transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
            className="h-full rounded-full bg-[#0871E7]"
          />
        </div>
      </motion.div>

      <motion.div variants={rise}>
        <motion.button
          onClick={onReset}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-6 py-3 font-sans text-[14px] text-[#1a1a1a] transition-colors hover:bg-[#e8e9e2]"
        >
          <RotateCcw className="h-4 w-4" />
          Coba Foto Lain
        </motion.button>
      </motion.div>
    </motion.div>
  );
}