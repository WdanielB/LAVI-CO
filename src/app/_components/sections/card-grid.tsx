import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { ROW_GRID, Section } from "./section";
import { SectionHeading } from "./section-heading";

export type CardRow = {
  label: string;
  text: string;
  href?: string;
  highlight?: boolean;
};

export type CardItem = {
  id?: string;
  eyebrow?: string;
  title: string;
  metric?: string;
  metricLabel?: string;
  body?: string;
  rows?: CardRow[];
  media?: ReactNode;
};

type CardGridProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: CardItem[];
  /** Kept for callers; the list is always a single table. */
  columns?: 2 | 3;
};

const index = (i: number) => String(i + 1).padStart(2, "0");

function RowText({ row }: { row: CardRow }) {
  if (!row.href) return <>{row.text}</>;
  return (
    <a href={row.href} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
      {row.text}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}

/**
 * A text table. Items with detail rows show their headline row and open to the rest,
 * so a long page reads as a short list first.
 */
export function CardGrid({ eyebrow, title, description, items }: CardGridProps) {
  return (
    <Section label={eyebrow}>
      {title && <SectionHeading title={title} description={description} />}
      <Reveal>
        <div className="border-t border-white/15 text-[14px] leading-snug tracking-[-0.01em]">
          {items.map((item, i) => {
            const lead = item.rows?.find((row) => row.highlight) ?? item.rows?.[0];
            const rest = item.rows?.filter((row) => row !== lead) ?? [];

            if (!item.rows) {
              return (
                <article key={item.id ?? item.title} id={item.id} className={`scroll-mt-28 border-b border-white/15 py-5 ${ROW_GRID}`}>
                  <span className="text-white/40" style={{ fontVariantNumeric: "tabular-nums" }}>{index(i)}</span>
                  <h3 className="col-span-2 font-medium text-white md:col-span-1">{item.title}</h3>
                  <p className="col-span-2 col-start-2 leading-relaxed text-white/65 md:col-span-1 md:col-start-3">{item.body}</p>
                </article>
              );
            }

            return (
              <details key={item.id ?? item.title} id={item.id} className="group scroll-mt-28 border-b border-white/15">
                <summary className={`cursor-pointer list-none py-5 [&::-webkit-details-marker]:hidden ${ROW_GRID}`}>
                  <span className="text-white/40" style={{ fontVariantNumeric: "tabular-nums" }}>{index(i)}</span>
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <span aria-hidden className="justify-self-end text-white/50 transition-transform duration-300 group-open:rotate-45 md:order-last">
                    +
                  </span>
                  {lead && (
                    <p className="col-span-2 col-start-2 leading-relaxed text-white/65 md:col-span-1 md:col-start-3">
                      <RowText row={lead} />
                    </p>
                  )}
                </summary>
                <dl className="pb-6">
                  {rest.map((row) => (
                    <div key={row.label} className={`py-2.5 ${ROW_GRID}`}>
                      <dt className="col-span-2 col-start-2 text-white/40 md:col-span-1">{row.label}</dt>
                      <dd className="col-span-2 col-start-2 leading-relaxed text-white/65 md:col-span-1 md:col-start-3">
                        <RowText row={row} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </details>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
