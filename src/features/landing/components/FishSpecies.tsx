"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/shared/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/shared/components/motion/Stagger";
import { EASE } from "@/shared/constants/Motion";
import { FISH_SPECIES } from "../constants/FishSpecies";

const pad = (value: number) => String(value).padStart(2, "0");

export function FishSpecies() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = FISH_SPECIES[activeIndex];
  const total = FISH_SPECIES.length;

  return (
    <section
      id="jenis-ikan"
      className="relative z-20 bg-white px-6 py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mb-5 font-sans text-[11px] uppercase tracking-[0.15em] text-[#1a1a1a]/50">
              Jenis Ikan · Species
            </p>
            <h2 className="mb-5 font-instrument text-[40px] leading-[0.95] tracking-tight text-[#1a1a1a] md:text-[56px]">
              {total} jenis ikan yang{" "}
              <em className="text-[#0871E7]">dikenali.</em>
            </h2>
            <p className="mb-10 max-w-sm font-sans text-[15px] leading-relaxed text-[#1a1a1a]/70">
              Model kami dilatih untuk mengenali jenis-jenis ikan air tawar
              berikut. Arahkan kursor untuk melihat tiap ikan.
            </p>
          </Reveal>

          <Stagger className="border-b border-black/10">
            {FISH_SPECIES.map((fish, index) => {
              const isActive = activeIndex === index;
              return (
                <StaggerItem key={fish.id}>
                  <Link
                    href={`/jenis-ikan/${fish.id}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    className="group flex items-center gap-5 border-t border-black/10 py-6"
                  >
                    <span className="w-6 font-sans text-[12px] tabular-nums text-[#1a1a1a]/40">
                      {pad(index + 1)}
                    </span>

                    <div
                      className={`min-w-0 flex-1 transition-transform duration-500 ${
                        isActive ? "lg:translate-x-2.5" : ""
                      }`}
                    >
                      <p
                        className={`font-instrument text-[36px] leading-none tracking-tight transition-colors duration-300 md:text-[44px] ${
                          isActive ? "lg:text-[#0871E7]" : ""
                        } text-[#1a1a1a]`}
                      >
                        {fish.nama}
                      </p>
                      <p className="mt-1.5 font-sans text-[13px] italic text-[#1a1a1a]/50">
                        {fish.namaLatin}
                      </p>
                    </div>

                    <span className="relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-xl lg:hidden">
                      <Image
                        src={fish.image}
                        alt=""
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </span>

                    <ArrowUpRight
                      className={`h-5 w-5 flex-shrink-0 text-[#1a1a1a]/30 transition-all duration-300 ${
                        isActive
                          ? "lg:-translate-y-0.5 lg:translate-x-0.5 lg:text-[#0871E7]"
                          : ""
                      }`}
                    />
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Reveal className="hidden lg:col-span-7 lg:block" y={48}>
          <div className="relative h-[540px] overflow-hidden rounded-[32px] bg-[#F3F4ED]">
            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={active.nama}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                  <p className="mb-2 font-sans text-[13px] italic text-white/70">
                    {active.namaLatin}
                  </p>
                  <p className="max-w-md font-sans text-[16px] leading-relaxed">
                    {active.ciri}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <span className="absolute left-6 top-6 rounded-full bg-white/80 px-3 py-1 font-sans text-[12px] tabular-nums text-[#1a1a1a] backdrop-blur-md">
              {pad(activeIndex + 1)} / {pad(total)}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}