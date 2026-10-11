import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/shared/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/shared/components/motion/Stagger";
import { FISH_SPECIES } from "../constants/FishSpecies";
import { FishDetailHero } from "./FishDetailHero";
import { FishNavCard } from "./FishNavCard";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

interface FishDetailLayoutProps {
  fish: (typeof FISH_SPECIES)[number];
}

const EYEBROW = "font-sans text-[11px] uppercase tracking-[0.15em] text-[#1a1a1a]/50";

export function FishDetailLayout({ fish }: FishDetailLayoutProps) {
  const total = FISH_SPECIES.length;
  const index = FISH_SPECIES.findIndex((item) => item.id === fish.id);
  const prev = FISH_SPECIES[(index - 1 + total) % total];
  const next = FISH_SPECIES[(index + 1) % total];

  const facts = [
    { label: "Ciri Khas", value: fish.ciri },
    { label: "Habitat", value: fish.habitat },
    { label: "Persebaran", value: fish.persebaran },
  ];

  return (
    <main className="relative min-h-screen bg-[#F3F4ED]">
      <Navbar />

      <section className="px-6 pb-16 pt-28 md:pb-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Link
              href="/#jenis-ikan"
              className="mb-8 inline-flex items-center gap-2 font-sans text-[14px] text-[#1a1a1a]/70 transition-colors hover:text-[#0871E7]"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Jenis Ikan
            </Link>
          </Reveal>

          <FishDetailHero fish={fish} index={index} total={total} />

          <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className={`${EYEBROW} mb-4`}>Tentang ikan ini</p>
              <p className="font-instrument text-[24px] leading-snug tracking-tight text-[#1a1a1a] md:text-[28px]">
                {fish.deskripsi}
              </p>
            </Reveal>

            <Stagger className="border-b border-black/10 lg:col-span-7">
              {facts.map(({ label, value }) => (
                <StaggerItem
                  key={label}
                  className="grid gap-2 border-t border-black/10 py-6 sm:grid-cols-[160px_1fr] sm:gap-8"
                >
                  <p className={`${EYEBROW} sm:pt-1`}>{label}</p>
                  <p className="font-sans text-[16px] leading-relaxed text-[#1a1a1a]">
                    {value}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal className="mt-20" y={48}>
            <div className="rounded-[32px] bg-[#0871E7] px-8 py-14 text-center md:px-16 md:py-20">
              <p className="font-instrument text-[36px] leading-none tracking-tight text-white md:text-[56px]">
                Punya foto ikan {fish.nama.toLowerCase()}?
              </p>
              <p className="mx-auto mb-8 mt-4 max-w-md font-sans text-[15px] leading-relaxed text-white/70">
                Unggah fotonya dan lihat apakah AI kami mengenali jenisnya.
              </p>
              <Link
                href="/classify"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-sans text-[14px] font-medium text-[#0871E7] transition-transform duration-300 hover:scale-105"
              >
                Coba Deteksi Ikan Ini
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal className="mt-14 grid divide-y divide-black/10 border-y border-black/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <FishNavCard fish={prev} direction="prev" />
            <FishNavCard fish={next} direction="next" />
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}