import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Globe, Microscope } from "lucide-react";
import { Reveal } from "@/shared/components/motion/Reveal";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import type { FISH_SPECIES } from "../constants/FishSpecies";

interface FishDetailLayoutProps {
  fish: (typeof FISH_SPECIES)[number];
}

export function FishDetailLayout({ fish }: FishDetailLayoutProps) {
  return (
    <main className="relative bg-[#F3F4ED] min-h-screen">
      <Navbar />

      <section className="px-6 pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href="/#jenis-ikan"
              className="mb-8 inline-flex items-center gap-2 font-sans text-[14px] text-[#1a1a1a]/70 transition-opacity hover:opacity-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Jenis Ikan
            </Link>
          </Reveal>

          <Reveal delay={0.1} y={48}>
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white">
              <div className="relative h-72 w-full md:h-96">
                <Image
                  src={fish.image}
                  alt={fish.nama}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 md:p-10">
                <h1 className="font-instrument text-[36px] md:text-[48px] tracking-tight text-[#1a1a1a] mb-1">
                  {fish.nama}
                </h1>
                <p className="font-sans text-[16px] italic text-[#1a1a1a]/50 mb-6">
                  {fish.namaLatin}
                </p>

                <p className="font-sans text-[15px] text-[#1a1a1a]/80 leading-relaxed mb-8">
                  {fish.deskripsi}
                </p>

                <div className="space-y-4 border-t border-black/10 pt-6 font-sans text-[14px] text-[#1a1a1a]/80">
                  <div className="flex items-start gap-3">
                    <Microscope className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0871E7]" />
                    <p>
                      <span className="font-medium">Ciri Khas:</span> {fish.ciri}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0871E7]" />
                    <p>
                      <span className="font-medium">Habitat:</span>{" "}
                      {fish.habitat}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0871E7]" />
                    <p>
                      <span className="font-medium">Persebaran:</span>{" "}
                      {fish.persebaran}
                    </p>
                  </div>
                </div>

                <Link
                  href="/classify"
                  className="group relative mt-8 inline-flex items-center justify-center overflow-hidden rounded-full bg-[#0871E7] px-6 py-3 font-sans text-[14px] text-white shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline outline-1 outline-[#0871E7] -outline-offset-1"
                >
                  <span className="absolute left-[10%] top-[1px] h-4 w-[80%] rounded-[12px] bg-gradient-to-b from-[#DEF0FC] to-transparent transition-transform duration-300 group-hover:scale-x-105" />
                  <span className="relative">Coba Deteksi Ikan Ini</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}