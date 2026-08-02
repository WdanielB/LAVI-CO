import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export type CardRow = {
  label: string;
  text: string;
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
  columns?: 2 | 3;
};

export function CardGrid({ eyebrow, title, description, items, columns = 2 }: CardGridProps) {
  const gridCols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <section className="container mx-auto max-w-[1440px] px-5 pb-16 sm:px-6 md:px-12 md:pb-20 lg:px-20">
      {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} />}
      <div className={`grid grid-cols-1 gap-x-10 gap-y-10 ${gridCols} xl:gap-x-12`}>
        {items.map((item, index) => (
          <Reveal key={item.id ?? item.title} delay={Math.min(index * 0.04, 0.16)}>
            <article
              id={item.id}
              className="group flex h-full scroll-mt-28 flex-col border-t border-white/25 pt-6 transition-colors duration-300 hover:border-[var(--lavi-accent)]"
            >
              {item.media && <div className="mb-5 border border-white/10">{item.media}</div>}
              <div className="mb-4 flex items-baseline justify-between gap-3">
                {item.eyebrow && (
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lavi-accent)]">
                    {item.eyebrow}
                  </p>
                )}
                {item.metric && (
                  <p
                    className="font-mono text-2xl font-semibold leading-none text-white"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {item.metric}
                  </p>
                )}
              </div>
              <h3 className="mb-1 font-serif text-xl font-semibold leading-tight tracking-tight text-white lg:text-2xl">
                {item.title}
              </h3>
              {item.metricLabel && <p className="mb-4 text-xs text-white/55">{item.metricLabel}</p>}
              {item.body && <p className="mb-4 text-sm leading-relaxed text-white/80 lg:text-base">{item.body}</p>}
              {item.rows && (
                <div className="mt-auto space-y-3 text-sm lg:text-base">
                  {item.rows.map((row) => (
                    <p
                      key={row.label}
                      className={row.highlight ? "border-t border-white/15 pt-3 text-white" : "text-white/85"}
                    >
                      <span
                        className={`mr-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] ${
                          row.highlight ? "text-[var(--lavi-accent)]" : "text-white/55"
                        }`}
                      >
                        {row.label}
                      </span>
                      {row.text}
                    </p>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
