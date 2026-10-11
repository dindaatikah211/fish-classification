"use client";

import { useCallback, useState, type ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import { SplashScreen } from "./SplashScreen";

export function SplashProvider({ children }: { children: ReactNode }) {
  const [finished, setFinished] = useState(false);
  const handleComplete = useCallback(() => setFinished(true), []);

  return (
    <>
      {children}
      <AnimatePresence>
        {!finished && <SplashScreen onComplete={handleComplete} />}
      </AnimatePresence>
    </>
  );
}