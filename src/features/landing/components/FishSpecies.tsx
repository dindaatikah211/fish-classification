import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/shared/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/shared/components/motion/Stagger";
import { FISH_SPECIES } from "../constants/FishSpecies";

export function FishSpecies() {
  return (
    <section
      id="jenis-ikan"
      className="relative z-20 bg-white px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <h2 className="font-instrument text-[32px] md:text-[44px] tracking-tight text-[#1a1a1a] mb-4">
            4 Jenis Ikan yang Dikenali
          </h2>
          <p className="font-sans text-[16px] text-[#1a1a1a]/70 max-w-xl mx-auto mb-16">
            Model kami dilatih untuk mengenali jenis-jenis ikan air tawar berikut.
          </p>
        </Reveal>

        <Stagger className="flex flex-wrap justify-center gap-6">
          {FISH_SPECIES.map((fish) => (
            <StaggerItem
              key={fish.id}
              whileHover={{ y: -6 }}
              className="w-full sm:w-[calc(50%-12px)]"
            >
              <Link
                href={`/jenis-ikan/${fish.id}`}
                className="group block h-full overflow-hidden rounded-3xl border border-black/10 bg-[#F3F4ED] text-left transition-shadow hover:shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={fish.image}
                    alt={fish.nama}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="font-sans text-[18px] font-semibold text-[#0871E7]">
                      {fish.nama}
                    </h3>
                    <span className="inline-flex flex-shrink-0 items-center gap-1.5 font-sans text-[13px] font-medium text-gray-500">
                      Lihat Detail
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                  <p className="font-sans text-[13px] italic text-[#1a1a1a]/50 mb-3">
                    {fish.namaLatin}
                  </p>
                  <p className="font-sans text-[14px] text-[#1a1a1a]/70 leading-relaxed">
                    {fish.ciri}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}