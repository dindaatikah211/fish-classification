import { Reveal } from "@/shared/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/shared/components/motion/Stagger";
import { STATS } from "../constants/About";

export function About() {
  return (
    <section
      id="tentang"
      className="relative z-20 bg-[#0871E7] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-instrument text-[32px] md:text-[44px] tracking-tight text-white mb-6">
            Tentang Fin.
          </h2>
          <p className="font-sans text-[16px] text-white/70 leading-relaxed mb-12">
            Fin. adalah sistem klasifikasi ikan air tawar berbasis
            kecerdasan buatan, dikembangkan sebagai tugas besar UAS mata kuliah
            Pengolahan Citra. Cukup unggah foto, dan sistem akan mengenali jenis
            ikan beserta informasi biologinya secara otomatis.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <StaggerItem
                key={stat.label}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-black/10 bg-[#F3F4ED] backdrop-blur-sm p-6"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0871E7]/10">
                  <Icon className="h-5 w-5 text-[#0871E7]" />
                </div>
                <p className="font-sans text-[15px] font-semibold text-[#1a1a1a] mb-1">
                  {stat.label}
                </p>
                <p className="font-sans text-[13px] text-[#1a1a1a]/60 leading-relaxed">
                  {stat.description}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}