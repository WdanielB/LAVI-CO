"use client";

import { useEffect, useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  motion,
  transform,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Lenis from "lenis";

export const ease = [0.22, 1, 0.36, 1] as const;
export const easeExpo = [0.16, 1, 0.3, 1] as const;

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True on devices with a real cursor. Gates hover, magnetic and mouse-parallax effects. */
export function useFinePointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

export function useDesktop() {
  return useMediaQuery("(min-width: 1024px)");
}

/**
 * Hydration-safe stand-in for Motion's useReducedMotion, which already answers `true` on the
 * first client render and so mismatches the server markup wherever it switches layout.
 */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Range mapping for scroll-linked opacity, evaluated on the main thread. Motion hands an
 * array-range transform of a target-based progress to a native view timeline, and for our
 * pinned sections that resolved against the wrong scroll extent in Chrome.
 */
export function useScrollRange(progress: MotionValue<number>, input: number[], output: number[]) {
  return useTransform(progress, (v) => transform(v, input, output));
}

const noopSubscribe = () => () => {};

export function useSessionFlag(key: string) {
  return useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        return window.sessionStorage.getItem(key) === "1";
      } catch {
        return false;
      }
    },
    () => false,
  );
}

/** Weighted scroll on cursor devices only; touch keeps native scrolling. */
export function SmoothScroll() {
  const finePointer = useFinePointer();
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!finePointer || prefersReducedMotion) return;
    const lenis = new Lenis({ lerp: 0.09, autoRaf: true });
    return () => lenis.destroy();
  }, [finePointer, prefersReducedMotion]);

  return null;
}

type MaskTextProps = {
  lines: string[];
  className?: string;
  delay?: number;
  /** When set, the reveal is driven by this flag instead of by entering the viewport. */
  show?: boolean;
};

/** Each line slides up from behind its own mask. */
export function MaskText({ lines, className, delay = 0, show }: MaskTextProps) {
  const controlled = show !== undefined;
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate={controlled ? (show ? "visible" : "hidden") : undefined}
      whileInView={controlled ? undefined : "visible"}
      viewport={{ once: true, margin: "-10%" }}
      variants={{ visible: { transition: { staggerChildren: 0.11, delayChildren: delay } } }}
    >
      {lines.map((line) => (
        <span key={line} className="block overflow-hidden pb-[0.14em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "112%" },
              visible: { y: "0%", transition: { duration: 1.1, ease: easeExpo } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Pulls its child toward the cursor while hovered. No-ops without a fine pointer. */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.4 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!finePointer) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
