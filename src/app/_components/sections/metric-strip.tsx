import { Reveal } from "./reveal";

type Metric = {
  value: string;
  label: string;
  detail?: string;
};

type MetricStripProps = {
  items: Metric[];
  note?: string;
};

export function MetricStrip({ items, note }: MetricStripProps) {
  return (
    <section className="container mx-auto max-w-[1440px] px-5 pb-16 sm:px-6 md:px-12 md:pb-20 lg:px-20">
      <Reveal>
        <div className="grid grid-cols-1 border-t border-white/25 sm:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="border-b border-white/10 py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:pr-8 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-8"
            >
              <p
                className="font-mono text-4xl font-semibold leading-none text-white lg:text-5xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {item.value}
              </p>
              <p className="mt-3 text-sm font-medium text-white/80">{item.label}</p>
              {item.detail && <p className="mt-1.5 text-xs leading-relaxed text-white/60">{item.detail}</p>}
            </div>
          ))}
        </div>
        {note && <p className="mt-4 text-xs text-white/50">{note}</p>}
      </Reveal>
    </section>
  );
}
