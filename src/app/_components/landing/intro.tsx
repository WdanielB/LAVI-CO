"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { easeExpo } from "./motion";

export const INTRO_KEY = "lavi-intro";

type IntroProps = {
  /** Fired when the curtain starts lifting, so the hero can begin its entrance underneath. */
  onReveal: () => void;
  onDone: () => void;
};

export function Intro({ onReveal, onDone }: IntroProps) {
  const [lifting, setLifting] = useState(false);
  const count = useMotionValue(0);
  const label = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 1.1,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => {
        setLifting(true);
        onReveal();
      },
    });
    return () => controls.stop();
    // Runs once: the callbacks are stable for the lifetime of the intro.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleLifted() {
    if (!lifting) return;
    try {
      window.sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    onDone();
  }

  return (
    <motion.div
      aria-hidden
      initial={false}
      animate={{ y: lifting ? "-100%" : "0%" }}
      transition={{ duration: 0.9, ease: easeExpo }}
      onAnimationComplete={handleLifted}
      className="fixed inset-0 z-[100] bg-[var(--lavi-ink)]"
    >
      <div className="mx-auto flex h-full w-full max-w-[1440px] justify-between px-5 sm:px-6 md:px-12 lg:px-20">
        {Array.from({ length: 13 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1, delay: i * 0.035, ease: easeExpo }}
            className={`h-full w-px origin-top bg-white/[0.08] ${i % 3 === 0 ? "" : "hidden lg:block"}`}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-[1440px] items-end justify-between px-5 pb-8 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55 sm:px-6 md:px-12 md:pb-10 lg:px-20">
        <span>LAVI &amp; CO — Lám. 00</span>
        <motion.span className="text-[clamp(2.5rem,8vw,5rem)] leading-none tracking-[-0.02em] text-white">{label}</motion.span>
      </div>
    </motion.div>
  );
}
