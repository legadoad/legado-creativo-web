"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

// Makes every framer-motion animation honor the visitor's OS-level
// "reduce motion" setting (movement/scale is skipped, opacity still fades).
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
