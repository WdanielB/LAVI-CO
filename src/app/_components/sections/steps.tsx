import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type Step = {
  title: string;
  body: string;
  meta?: string;
};

type StepsProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: Step[];
};

export function Steps({ eyebrow, title, description, items }: StepsProps) {
  return (
    <section className="container mx-auto max-w-[1440px] px-5 pb-16 sm:px-6 md:px-12 md:pb-20 lg:px-20">
      {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} />}
      <Reveal>
        <ol className="flex flex-col lg:flex-row lg:items-stretch">
          {items.map((step, index) => (
            <li key={step.title} className="flex flex-1 flex-col lg:flex-row lg:items-stretch">
              <div className="flex flex-1 flex-col border-t-2 border-[var(--lavi-accent)] pt-5 lg:pr-2">
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="font-mono text-3xl font-semibold leading-none text-[var(--lavi-accent)]"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {step.meta && (
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                      {step.meta}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg font-semibold leading-tight text-white">{step.title}</h3>
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-white/75">{step.body}</p>
              </div>

              {index < items.length - 1 && (
                <div
                  aria-hidden
                  className="flex items-center justify-center py-4 text-[var(--lavi-accent)]/70 lg:px-4 lg:py-0"
                >
                  <span className="text-2xl leading-none lg:hidden">↓</span>
                  <span className="hidden text-2xl leading-none lg:inline">→</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
