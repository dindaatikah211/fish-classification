"use client";

import { motion } from "motion/react";
import { FISH_SPECIES } from "@/features/landing/constants/FishSpecies";
import { rise, stagger } from "@/shared/constants/Variants";
import { EYEBROW, PAGE_TITLE, TIPS } from "../constants/Classify";

const container = stagger(0.1);

export function ClassifyIntro() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="text-center lg:text-left"
    >
      <motion.p variants={rise} className={`${EYEBROW} mb-6`}>
        Klasifikasi · Classify
      </motion.p>

      <motion.h1 variants={rise} className={`${PAGE_TITLE} mb-6`}>
        Deteksi jenis <em className="text-[#0871E7]">ikanmu.</em>
      </motion.h1>

      <motion.p
        variants={rise}
        className="mx-auto mb-10 max-w-md font-sans text-[16px] leading-relaxed text-[#1a1a1a]/70 lg:mx-0"
      >
        Unggah foto ikan air tawarmu, dan AI kami akan mengenali jenisnya
        beserta informasi lengkapnya.
      </motion.p>

      <motion.div
        variants={rise}
        className="mx-auto mb-10 flex max-w-md flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start"
      >
        <span className={`${EYEBROW} mr-2 self-center`}>Dikenali</span>
        {FISH_SPECIES.map(({ id, nama }) => (
          <span
            key={id}
            className="rounded-full border border-black/10 bg-white px-3 py-1 font-sans text-[12px] text-[#1a1a1a]/80"
          >
            {nama}
          </span>
        ))}
      </motion.div>

      <motion.div variants={rise} className="mx-auto max-w-md text-left lg:mx-0">
        <p className={`${EYEBROW} mb-3`}>Tips foto yang baik</p>
        <ul className="border-b border-black/10">
          {TIPS.map((tip, index) => (
            <li
              key={tip}
              className="flex items-baseline gap-4 border-t border-black/10 py-3.5 font-sans text-[14px] text-[#1a1a1a]"
            >
              <span className="text-[11px] tabular-nums tracking-[0.1em] text-[#1a1a1a]/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}