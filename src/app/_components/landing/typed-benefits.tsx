"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./motion";

const PHRASES = [
  "Ahorra horas de trabajo manual cada semana.",
  "Reduce errores y costos operativos.",
  "Decide con datos en tiempo real.",
  "Lanza en semanas, no en meses.",
  "Atiende a más clientes con el mismo equipo.",
];

/** A line that types, holds and erases each benefit in turn, nudging toward the call. */
export function TypedBenefits({ className = "" }: { className?: string }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phrase, setPhrase] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const full = PHRASES[phrase];
    let delay = deleting ? 28 : 55;
    if (!deleting && length === full.length) delay = 1900;
    if (deleting && length === 0) delay = 350;

    const id = window.setTimeout(() => {
      if (!deleting && length === full.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setPhrase((p) => (p + 1) % PHRASES.length);
      } else setLength((l) => l + (deleting ? -1 : 1));
    }, delay);
    return () => window.clearTimeout(id);
  }, [phrase, length, deleting, prefersReducedMotion]);

  const text = prefersReducedMotion ? PHRASES[0] : PHRASES[phrase].slice(0, length);

  return (
    <p className={className}>
      <span className="sr-only">{PHRASES.join(" ")}</span>
      <span aria-hidden>
        {text}
        <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-[var(--lavi-accent)]" />
      </span>
    </p>
  );
}
