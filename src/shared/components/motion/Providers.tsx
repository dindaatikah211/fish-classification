"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { SplashProvider } from "./SplashProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.09, smoothWheel: true, anchors: true }}>
        <SplashProvider>{children}</SplashProvider>
      </ReactLenis>
    </MotionConfig>
  );
}