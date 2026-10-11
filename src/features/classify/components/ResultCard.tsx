"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Globe, MapPin, Tag, Microscope } from "lucide-react";
import type { PredictResponse } from "@/shared/lib/api";
import { EASE } from "@/shared/constants/Motion";
import { rise, stagger } from "@/shared/constants/Variants";
import { PANEL, STAGE } from "../constants/Classify";

interface ResultCardProps {
  result: PredictResponse;
  preview: string;
}

const container = stagger(0.4);

export function ResultCard({ result, preview }: ResultCardProps) {
  const { info } = result;

  const rows = [
    { icon: Tag, label: "Klasifikasi", value: `${info.kelas} — ${info.ordo}` },
    { icon: MapPin, label: "Habitat", value: info.habitat },
    { icon: Globe, label: "Persebaran", value: info.persebaran },
    { icon: Microscope, label: "Ciri Khas", value: info.ciri_khas },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={PANEL}
    >
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ duration: 1, delay: 0.2, ease: EASE }}
        className={`${STAGE} relative overflow-hidden bg-[#F3F4ED]`}
      >
        <Image
          src={preview}
          alt={info.nama}
          fill
          sizes="(min-width: 1024px) 480px, 90vw"
          className="object-contain"
        />
      </motion.div>

      <div className="divide-y divide-black/10 px-2 pt-2">
        {rows.map(({ icon: Icon, label, value }) => (
          <motion.div
            key={label}
            variants={rise}
            className="flex items-start gap-3 py-4 font-sans text-[14px] text-[#1a1a1a]/80"
          >
            <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0871E7]" />
            <p>
              <span className="font-medium text-[#1a1a1a]">{label}:</span>{" "}
              {value}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}