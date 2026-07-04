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
        <ol className="max-w-3xl border-t border-white/25">
          {items.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-white/15 py-6 sm:gap-x-6">
              <span className="font-mono text-lg font-semibold leading-none text-[var(--lavi-accent)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-serif text-lg font-semibold leading-tight text-white">{step.title}</h3>
                  {step.meta && (
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                      {step.meta}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/75 lg:text-base">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
