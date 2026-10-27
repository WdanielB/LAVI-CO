"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { mailtoLink } from "@/lib/site";
import { SheetLabel } from "./blueprint";
import { CallButton } from "./call-button";
import { useDesktop, usePrefersReducedMotion } from "./motion";
import { SimpleHeadline } from "./simple-headline";
import { TypedBenefits } from "./typed-benefits";

export function Closing() {
  return (
    <section id="contact" className="relative flex min-h-[100dvh] items-center overflow-hidden border-t border-white/10 py-28">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 text-center sm:px-6 md:px-12 lg:px-20">
        <SheetLabel index={5} title="Siguiente paso" className="mb-8 md:mb-10" />
        <SimpleHeadline className="font-serif text-[clamp(3rem,12vw,10.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-white" />

        <TypedBenefits className="mt-8 min-h-[3em] max-w-xl text-lg leading-snug text-white/80 md:mt-10 md:min-h-[1.5em] md:text-2xl" />

        <div className="mt-8 md:mt-10">
          <CallButton />
        </div>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">20 minutos · sin costo</p>

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
