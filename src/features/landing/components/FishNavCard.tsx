import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { FISH_SPECIES } from "../constants/FishSpecies";

interface FishNavCardProps {
  fish: (typeof FISH_SPECIES)[number];
  direction: "prev" | "next";
}

export function FishNavCard({ fish, direction }: FishNavCardProps) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={`/jenis-ikan/${fish.id}`}
      className={`group flex items-center gap-5 py-6 ${
        isPrev ? "sm:pr-8" : "flex-row-reverse text-right sm:pl-8"
      }`}
    >
      <Icon
        className={`h-5 w-5 flex-shrink-0 text-[#1a1a1a]/40 transition-all duration-300 group-hover:text-[#0871E7] ${
          isPrev ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
        }`}
      />

      <span className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-[#e8e9e2]">
        <Image
          src={fish.image}
          alt=""
          fill
          sizes="96px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span className="mb-1 block font-sans text-[11px] uppercase tracking-[0.15em] text-[#1a1a1a]/50">
          {isPrev ? "Sebelumnya" : "Berikutnya"}
        </span>
        <span className="block font-instrument text-[32px] leading-none tracking-tight text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#0871E7]">
          {fish.nama}
        </span>
      </span>
    </Link>
  );
}