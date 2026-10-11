import { useEffect, useState } from "react";

const BAND = "-40% 0px -55% 0px";

export function useActiveSection(ids: string[], enabled: boolean) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) visible.add(target.id);
          else visible.delete(target.id);
        });
        setActiveId([...ids].reverse().find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: BAND }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids, enabled]);

  return enabled ? activeId : null;
}