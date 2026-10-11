import Link from "next/link";
import { Fish } from "lucide-react";
import { Reveal } from "@/shared/components/motion/Reveal";
import { FISH_SPECIES } from "../constants/FishSpecies";
import { LINKS } from "../constants/Navbar";

const HEADING = "mb-3 font-sans text-[11px] uppercase tracking-[0.15em] text-white/50";
const LINK = "font-sans text-[13px] text-white/80 transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="bg-[#0871E7] px-6 pb-6 pt-12 text-white">
      <div className="mx-auto max-w-5xl">
        <Reveal className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-6">
            <div className="mb-3 flex items-center gap-2">
              <Fish className="h-5 w-5" />
              <span className="font-instrument text-[26px] tracking-tight">fin.</span>
            </div>
            <p className="max-w-xs font-sans text-[13px] leading-relaxed text-white/70">
              Klasifikasi ikan air tawar berbasis AI. Unggah foto, kenali jenisnya.
            </p>
          </div>

          <div className="lg:col-span-3">
            <p className={HEADING}>Jelajahi</p>
            <ul className="space-y-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={LINK}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className={HEADING}>Jenis Ikan</p>
            <ul className="space-y-2">
              {FISH_SPECIES.map((fish) => (
                <li key={fish.id}>
                  <Link href={`/jenis-ikan/${fish.id}`} className={LINK}>
                    {fish.nama}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col justify-between gap-1 border-t border-white/15 pt-5 font-sans text-[12px] text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} fin. Klasifikasi Ikan Air Tawar</p>
          <p>Tugas Besar UAS Pengolahan Citra</p>
        </div>
      </div>
    </footer>
  );
}