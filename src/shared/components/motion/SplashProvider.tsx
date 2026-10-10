"use client";

import {
  useCallback,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { AnimatePresence } from "motion/react";
import { SplashScreen } from "./SplashScreen";

const STORAGE_KEY = "fin:splash-seen";

const subscribe = () => () => {};
const readSeen = () => sessionStorage.getItem(STORAGE_KEY) === "1";
const readSeenOnServer = () => false;

export function SplashProvider({ children }: { children: ReactNode }) {
  const seen = useSyncExternalStore(subscribe, readSeen, readSeenOnServer);
  const [finished, setFinished] = useState(false);

  const handleComplete = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setFinished(true);
  }, []);

  return (
    <>
      {children}
      <AnimatePresence>
        {!(seen || finished) && <SplashScreen onComplete={handleComplete} />}
      </AnimatePresence>
    </>
  );
}