"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { EASE } from "@/shared/constants/Motion";
import { LINE_MASK, lineUp, rise, stagger } from "@/shared/constants/Variants";
import type { FISH_SPECIES } from "../constants/FishSpecies";

interface FishDetailHeroProps {
  fish: (typeof FISH_SPECIES)[number];
  index: number;
  total: number;
}

const container = stagger(0.1);
const pad = (value: number) => String(value).padStart(2, "0");

export function FishDetailHero({ fish, index, total }: FishDetailHeroProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.p
          variants={rise}
          className="mb-6 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.15em] text-[#1a1a1a]/50"
        >
          <span>Jenis Ikan</span>
          <span className="h-px w-10 bg-black/20" />
          <span className="tabular-nums">
            {pad(index + 1)} / {pad(total)}
          </span>
        </motion.p>

        <h1
          className="font-instrument leading-[0.9] tracking-tight text-[#1a1a1a]"
          style={{ fontSize: "clamp(56px, 9vw, 112px)" }}
        >
          <span className={LINE_MASK}>
            <motion.span variants={lineUp} className="block">
              {fish.nama}
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={rise}
          className="mt-4 font-sans text-[18px] italic text-[#0871E7]"
        >
          {fish.namaLatin}
        </motion.p>
      </motion.div>

      <motion.div
        ref={frameRef}
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
        className="relative h-[280px] overflow-hidden rounded-[32px] bg-[#e8e9e2] md:h-[380px]"
      >
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-x-0 -inset-y-[8%]"
        >
          <Image
            src={fish.image}
            alt={fish.nama}
            fill
            priority
            sizes="(min-width: 1024px) 512px, 100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}