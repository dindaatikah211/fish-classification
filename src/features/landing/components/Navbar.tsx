"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Fish, Menu, X } from "lucide-react";
import { EASE } from "@/shared/constants/Motion";
import { LINKS } from "../constants/Navbar";
import { useActiveSection } from "../hooks/useActiveSection";

const getId = (href: string) => href.split("#")[1] ?? "";
const SECTION_IDS = LINKS.map((link) => getId(link.href));
const PATH_SECTIONS: Record<string, string> = { "/jenis-ikan": "jenis-ikan" };
const SPRING = { type: "spring", stiffness: 420, damping: 34 } as const;

interface NavAnchorProps {
  id: string;
  isHome: boolean;
  className: string;
  onClick?: () => void;
  children: ReactNode;
}

function NavAnchor({ id, isHome, className, onClick, children }: NavAnchorProps) {
  return isHome ? (
    <a href={`#${id}`} className={className} onClick={onClick}>
      {children}
    </a>
  ) : (
    <Link href={`/#${id}`} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const pathSection = Object.entries(PATH_SECTIONS).find(([prefix]) =>
    pathname.startsWith(prefix)
  )?.[1];
  const spyId = useActiveSection(SECTION_IDS, isHome);
  const activeId = pathSection ?? spyId;

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 40));

  return (
    <div
      className={`pointer-events-none fixed left-1/2 z-50 w-[95%] max-w-5xl -translate-x-1/2 transition-[top] duration-500 ${
        scrolled ? "top-3" : "top-6"
      }`}
    >
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className={`pointer-events-auto flex items-center justify-between rounded-full border border-black/10 px-4 py-2 backdrop-blur-md transition-[background-color,box-shadow] duration-500 md:px-6 md:py-3 ${
          scrolled
            ? "bg-white/75 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)]"
            : "bg-white/40"
        }`}
      >
        <Link href="/" className="flex items-center gap-2">
          <motion.span
            whileHover={{ rotate: [0, -14, 10, 0] }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex"
          >
            <Fish className="h-5 w-5 text-[#0871E7]" />
          </motion.span>
          <span className="font-instrument text-[28px] tracking-tight text-[#1a1a1a]">
            fin.
          </span>
        </Link>

        <ul
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHoveredId(null)}
        >
          {LINKS.map((link) => {
            const id = getId(link.href);
            const isActive = activeId === id;
            return (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => setHoveredId(id)}
              >
                <NavAnchor
                  id={id}
                  isHome={isHome}
                  className="group relative block px-4 py-2 font-sans text-[14px]"
                >
                  {hoveredId === id && (
                    <motion.span
                      layoutId="nav-hover"
                      transition={SPRING}
                      className="absolute inset-0 rounded-full bg-black/5"
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={SPRING}
                      className="absolute inset-0 rounded-full bg-[#0871E7]/10"
                    />
                  )}
                  <span className="relative grid">
                    <span
                      aria-hidden="true"
                      className="invisible col-start-1 row-start-1 font-semibold"
                    >
                      {link.label}
                    </span>
                    <span
                      className={`col-start-1 row-start-1 transition-colors duration-300 ${
                        isActive
                          ? "font-semibold text-[#0871E7]"
                          : "font-medium text-[#1a1a1a]/70 group-hover:text-[#1a1a1a]"
                      }`}
                    >
                      {link.label}
                    </span>
                  </span>
                </NavAnchor>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/classify"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-[#0871E7] px-5 py-2 font-sans text-[14px] text-white shadow-[inset_0_-4px_4px_rgba(255,255,255,0.39)] outline outline-1 outline-[#0871E7] -outline-offset-1"
            >
              <span className="absolute left-[10%] top-[1px] h-4 w-[80%] rounded-[12px] bg-gradient-to-b from-[#DEF0FC] to-transparent transition-transform duration-300 group-hover:scale-x-105" />
              <span className="relative">Mulai Deteksi</span>
            </Link>
          </motion.div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/60 text-[#1a1a1a] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="pointer-events-auto mt-2 rounded-3xl border border-black/10 bg-white/90 p-3 backdrop-blur-md md:hidden"
          >
            {LINKS.map((link) => {
              const id = getId(link.href);
              const isActive = activeId === id;
              return (
                <NavAnchor
                  key={link.href}
                  id={id}
                  isHome={isHome}
                  onClick={() => setOpen(false)}
                  className={`block rounded-2xl px-4 py-3 font-sans text-[15px] transition-colors ${
                    isActive
                      ? "bg-[#0871E7]/10 font-semibold text-[#0871E7]"
                      : "font-medium text-[#1a1a1a]/80"
                  }`}
                >
                  {link.label}
                </NavAnchor>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}