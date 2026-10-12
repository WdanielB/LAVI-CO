import type { ReactNode } from "react";

/** Column split shared by every sheet: a quiet label on the left, the content in the right half. */
export const SHEET_GRID = "grid gap-y-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-x-10";

/** Row of a text table: index, title, text, and a narrow slot for a marker. Stacks on phones. */
export const ROW_GRID =
  "grid grid-cols-[2.25rem_minmax(0,1fr)_1.25rem] gap-x-4 gap-y-2 md:grid-cols-[2.5rem_minmax(0,0.8fr)_minmax(0,1.2fr)_1.25rem] md:gap-x-6";

/** One sheet of an inner page: label left, content right, a hairline above. */
export function Section({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <section className="border-t border-white/10">
      <div className={`container mx-auto max-w-[1440px] px-5 py-14 sm:px-6 md:px-12 md:py-24 lg:px-20 ${SHEET_GRID}`}>
        <p className="self-start text-[13px] leading-snug tracking-[-0.01em] text-white/50 lg:sticky lg:top-28">{label}</p>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
