import { ClassifyNavbar } from "./ClassifyNavbar";
import { ClassifyClient } from "./ClassifyClient";

export function ClassifyLayout() {
  return (
    <main className="relative min-h-screen bg-[#F3F4ED]">
      <ClassifyNavbar />

      <section className="flex min-h-screen items-center bg-[radial-gradient(ellipse_70%_60%_at_85%_10%,rgba(8,113,231,0.08),transparent_70%)] px-6 pb-20 pt-32 md:pt-36">
        <ClassifyClient />
      </section>
    </main>
  );
}