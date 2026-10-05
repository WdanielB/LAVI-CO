"use client";

import { motion } from "framer-motion";
import { easeExpo } from "./motion";

export const SHEET_TOTAL = 5;

/** Column hairlines that draw themselves top-down when the section enters. */
export function GridLines({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="mx-auto flex h-full w-full max-w-[1440px] justify-between px-5 sm:px-6 md:px-12 lg:px-20">
        {Array.from({ length: 13 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.4, delay: i * 0.04, ease: easeExpo }}
            className={`h-full w-px origin-top bg-white/[0.055] ${i % 3 === 0 ? "" : "hidden lg:block"}`}
          />
        ))}
      </div>
    </div>
  );
}

/** Registration mark. */
export function Crosshair({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 15 15"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`h-[15px] w-[15px] ${className}`}
    >
      <path d="M7.5 0v15M0 7.5h15" />
    </svg>
  );
}

/** Four registration marks centred on the corners of the nearest positioned ancestor. */
export function Corners({ className = "text-white/60" }: { className?: string }) {
  return (
    <>
      <Crosshair className={`absolute -left-[7px] -top-[7px] ${className}`} />
      <Crosshair className={`absolute -right-[7px] -top-[7px] ${className}`} />
      <Crosshair className={`absolute -bottom-[7px] -left-[7px] ${className}`} />
      <Crosshair className={`absolute -bottom-[7px] -right-[7px] ${className}`} />
    </>
  );
}

/** Horizontal dimension line with end ticks and a centred measure. */
export function Dimension({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 text-white/45 ${className}`}>
      <span className="h-2 w-px bg-current" />
      <span className="h-px flex-1 bg-current" />
      <span className="font-mono text-[10px] uppercase tracking-[0.25em]">{label}</span>
      <span className="h-px flex-1 bg-current" />
      <span className="h-2 w-px bg-current" />
    </div>
  );
}

export function SheetLabel({ index, title, className = "" }: { index: number; title: string; className?: string }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55 sm:text-[11px] ${className}`}>
      <span aria-hidden className="h-px w-8 bg-[var(--lavi-accent)]" />
      <span>
        Lám. {String(index).padStart(2, "0")} / {String(SHEET_TOTAL).padStart(2, "0")}
      </span>
      <span aria-hidden className="text-white/25">—</span>
      <span>{title}</span>
    </p>
  );
}
