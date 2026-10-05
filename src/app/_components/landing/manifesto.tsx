"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { GridLines, SheetLabel } from "./blueprint";
import { usePrefersReducedMotion } from "./motion";

const words = "Diseñamos los sistemas que tu operación necesita.".split(" ");
const UNDERLINED = "operación";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const underline = useTransform(progress, [range[1], Math.min(range[1] + 0.12, 1)], [0, 1]);
  return (
    <motion.span style={{ opacity }} className="relative mr-[0.24em] inline-block">
      {word}
      {word === UNDERLINED && (
        <motion.span
          aria-hidden
          style={{ scaleX: underline }}
          className="absolute -bottom-[0.02em] left-0 h-[3px] w-full origin-left bg-[var(--lavi-accent)]"
        />
      )}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Leave a held beat at the end so the full sentence reads before the section releases.
  const progress = useTransform(scrollYProgress, [0.05, 0.8], [0, 1]);

  const sentence = (
    <p className="max-w-[17ch] font-serif text-[clamp(2.1rem,6.6vw,6rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
      {prefersReducedMotion
        ? words.join(" ")
        : words.map((word, i) => (
            <Word key={i} word={word} progress={progress} range={[i / words.length, (i + 1) / words.length]} />
          ))}
    </p>
  );

  return (
    <section ref={ref} className={`relative ${prefersReducedMotion ? "py-32" : "h-[230vh]"}`}>
      <div className={prefersReducedMotion ? "relative" : "sticky top-0 flex h-[100dvh] items-center overflow-hidden"}>
        <GridLines />
        <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-6 md:px-12 lg:px-20">
          <SheetLabel index={2} title="Manifiesto" className="mb-8 md:mb-12" />
          {sentence}
        </div>
      </div>
    </section>
  );
}
