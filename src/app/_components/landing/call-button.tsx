"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const LABEL = "Agenda una llamada";

/**
 * Wide call-to-action. On hover the arrow's disc floods the whole button, the label inverts
 * against it through blend mode, and the letters ripple once. Pulls slightly toward the cursor.
 */
export function CallButton({ href = "/contact" }: { href?: string }) {
  const root = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = gsap.utils.selector(el);
    const mm = gsap.matchMedia();

    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", fine: "(hover: hover) and (pointer: fine)" },
      (context) => {
        const { motion, fine } = context.conditions as { motion: boolean; fine: boolean };
        if (!motion) return;

        // Wipes in from the left the first time it scrolls into view.
        const intro = gsap
          .timeline({ paused: true, defaults: { ease: "expo.out" } })
          .from(el, { clipPath: "inset(0% 100% 0% 0%)", duration: 1.1 })
          .from(q("[data-char]"), { yPercent: 110, duration: 0.8, stagger: 0.018 }, 0.25)
          .from(q("[data-disc]"), { scale: 0, duration: 0.9, ease: "back.out(1.8)" }, 0.45);
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              intro.play();
              observer.disconnect();
            }
          },
          { threshold: 0.6 },
        );
        // Watch the wrapper: the button starts fully clipped, and a clipped element never reports as in view.
        observer.observe(el.parentElement ?? el);
        if (!fine) return () => observer.disconnect();

        const moveX = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
        const moveY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

        function onMove(e: PointerEvent) {
          const rect = el!.getBoundingClientRect();
          moveX((e.clientX - (rect.left + rect.width / 2)) * 0.12);
          moveY((e.clientY - (rect.top + rect.height / 2)) * 0.3);
        }
        function onEnter() {
          gsap.to(q("[data-flood]"), { scale: 18, duration: 0.75, ease: "expo.out", overwrite: true });
          gsap.fromTo(
            q("[data-char]"),
            { yPercent: 0 },
            { keyframes: [{ yPercent: -45, duration: 0.18, ease: "power2.out" }, { yPercent: 0, duration: 0.5, ease: "expo.out" }], stagger: 0.014, overwrite: true },
          );
          gsap.to(q("[data-arrow]"), { rotation: 0, duration: 0.6, ease: "expo.out", overwrite: true });
        }
        function onLeave() {
          gsap.to(q("[data-flood]"), { scale: 1, duration: 0.6, ease: "expo.out", overwrite: true });
          gsap.to(q("[data-arrow]"), { rotation: -45, duration: 0.6, ease: "expo.out", overwrite: true });
          gsap.to(el, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.5)", overwrite: true });
        }

        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
        return () => {
          observer.disconnect();
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerenter", onEnter);
          el.removeEventListener("pointerleave", onLeave);
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <Link
      ref={root}
      href={href}
      className="relative isolate flex h-[4.5rem] w-[min(88vw,27rem)] items-center justify-between overflow-hidden border border-white/35 pl-7 pr-2.5 outline-none focus-visible:border-white focus-visible:ring-2 focus-visible:ring-white/60 md:h-[5.25rem] md:pl-9 md:pr-3"
    >
      {/* Starts as the arrow's disc and scales until it covers the button. */}
      <span
        data-flood
        aria-hidden
        className="absolute right-2.5 top-1/2 -z-10 h-[3.25rem] w-[3.25rem] -translate-y-1/2 rounded-full bg-white md:right-3 md:h-[3.75rem] md:w-[3.75rem]"
      />
      <span aria-label={LABEL} className="flex overflow-hidden text-[15px] font-semibold text-white mix-blend-difference md:text-lg">
        {LABEL.split("").map((char, i) => (
          <span key={i} data-char aria-hidden className="inline-block whitespace-pre">
            {char}
          </span>
        ))}
      </span>
      <span data-disc aria-hidden className="flex h-[3.25rem] w-[3.25rem] shrink-0 items-center justify-center text-[#0b0e14] md:h-[3.75rem] md:w-[3.75rem]">
        <svg data-arrow viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5 -rotate-45">
          <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}
