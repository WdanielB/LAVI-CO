"use client";

import { motion } from "framer-motion";
import { easeExpo } from "./motion";

export type IconName = "cycle" | "grid" | "rocket" | "flask";

const paths: Record<IconName, string[]> = {
  cycle: ["M4 12a8 8 0 0 1 13.5-5.8M20 12a8 8 0 0 1-13.5 5.8", "M17 3v4h-4M7 21v-4h4"],
  grid: [
    "M4.5 3.5h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z",
    "M14.5 3.5h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z",
    "M4.5 13.5h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z",
    "M14.5 13.5h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z",
  ],
  rocket: [
    "M12 2c3 2 5 6 5 10.5-1 1-2.5 1.8-5 1.8s-4-.8-5-1.8C7 8 9 4 12 2Z",
    "M9 14.5 6 18l1-4.5M15 14.5l3 3.5-1-4.5",
    "M13.6 10a1.6 1.6 0 1 1-3.2 0 1.6 1.6 0 0 1 3.2 0Z",
  ],
  flask: ["M9.5 3h5M10 3v6.5L5.5 18a1.8 1.8 0 0 0 1.6 2.6h9.8A1.8 1.8 0 0 0 18.5 18L14 9.5V3", "M8 15h8"],
};

/** Line icon that redraws its strokes each time it becomes active. */
export function Icon({ name, active, className }: { name: IconName; active: boolean; className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[name].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          initial={false}
          animate={active ? { pathLength: [0, 1], opacity: 1 } : { pathLength: 1, opacity: 0.35 }}
          transition={{ duration: active ? 0.9 : 0.3, delay: active ? i * 0.12 : 0, ease: easeExpo }}
        />
      ))}
    </svg>
  );
}
