"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/shared/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/shared/components/motion/Stagger";
import { EASE } from "@/shared/constants/Motion";
import { FAQ_ITEMS } from "../constants/Faq";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative z-20 bg-white px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="font-instrument text-[32px] md:text-[44px] tracking-tight text-[#1a1a1a] mb-12 text-center">
            Pertanyaan Umum
          </h2>
        </Reveal>

        <Stagger className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <StaggerItem
                key={item.question}
                className="rounded-2xl border border-black/10 bg-[#F3F4ED] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="font-sans text-[15px] font-medium text-[#1a1a1a]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-[#0871E7] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden px-6"
                    >
                      <p className="pb-4 font-sans text-[14px] text-[#1a1a1a]/70 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}