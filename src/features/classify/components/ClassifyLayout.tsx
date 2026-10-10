import { Reveal } from "@/shared/components/motion/Reveal";
import { ClassifyNavbar } from "./ClassifyNavbar";
import { ClassifyClient } from "./ClassifyClient";

export function ClassifyLayout() {
  return (
    <main className="relative min-h-screen bg-[#F3F4ED]">
      <ClassifyNavbar />

      <section className="px-6 pt-32 pb-20 md:pt-40">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h1 className="font-instrument text-[36px] md:text-[48px] tracking-tight text-[#1a1a1a] mb-4">
              Deteksi Jenis Ikan
            </h1>
            <p className="font-sans text-[16px] text-[#1a1a1a]/70 leading-relaxed mb-12">
              Unggah foto ikan air tawarmu, dan AI kami akan mengenali jenisnya
              beserta informasi lengkapnya.
            </p>
          </Reveal>

          <ClassifyClient />
        </div>
      </section>
    </main>
  );
}