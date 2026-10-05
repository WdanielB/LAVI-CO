"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { mailtoLink } from "@/lib/site";
import { SheetLabel } from "./blueprint";
import { Magnetic, MaskText, useDesktop, usePrefersReducedMotion } from "./motion";

// Construction lines running from the sheet corners toward the call to action, in % of the section.
const convergingLines = [
  { x1: "0%", y1: "0%", x2: "34%", y2: "40%" },
  { x1: "100%", y1: "0%", x2: "66%", y2: "40%" },
  { x1: "0%", y1: "100%", x2: "34%", y2: "62%" },
  { x1: "100%", y1: "100%", x2: "66%", y2: "62%" },
];

export function Closing() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const pathLength = useTransform(scrollYProgress, [0.15, 1], [0, 1]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-[100dvh] items-center overflow-hidden border-t border-white/10 py-28"
    >
      <svg aria-hidden fill="none" className="pointer-events-none absolute inset-0 h-full w-full text-white/15">
        {convergingLines.map((line) => (
          <motion.line
            key={line.x1 + line.y1}
            {...line}
            stroke="currentColor"
            strokeWidth="1"
            style={{ pathLength: prefersReducedMotion ? 1 : pathLength }}
          />
        ))}
      </svg>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 text-center sm:px-6 md:px-12 lg:px-20">
        <SheetLabel index={5} title="Siguiente paso" className="mb-8 md:mb-10" />
        <h2 className="font-serif text-[clamp(3rem,12vw,10.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-white">
          <MaskText lines={["Hagámoslo", "simple."]} className="block" />
        </h2>

        <Magnetic className="mt-12 md:mt-16">
          <Link
            href="/contact"
            className="group flex h-36 w-36 items-center justify-center rounded-full bg-white text-center text-[13px] font-semibold leading-tight text-black transition-colors duration-500 hover:bg-[var(--lavi-accent)] hover:text-white md:h-44 md:w-44"
          >
            Agenda
            <br />
            una llamada
          </Link>
        </Magnetic>

        <a
          href={mailtoLink("Consulta LAVI & CO")}
          className="mt-10 font-mono text-[11px] uppercase tracking-[0.28em] text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
        >
          contacto@lavi.lat
        </a>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">Respuesta en 1 día hábil</p>
      </div>
    </section>
  );
}

/** On desktop the page lifts like a curtain to uncover a footer fixed underneath it. */
export function FooterReveal({ children }: { children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const desktop = useDesktop();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    // Only reveal when the whole footer fits on screen; otherwise part of it would be unreachable.
    const measure = () => setHeight(inner.offsetHeight < window.innerHeight ? inner.offsetHeight : null);
    const observer = new ResizeObserver(measure);
    observer.observe(inner);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const enabled = desktop && !prefersReducedMotion && height !== null;

  return (
    <div style={enabled ? { height, clipPath: "inset(0)" } : undefined} className="relative">
      <div ref={innerRef} className={enabled ? "fixed bottom-0 left-0 w-full" : ""}>
        {children}
      </div>
    </div>
  );
}
