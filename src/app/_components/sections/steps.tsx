import { Reveal } from "./reveal";
import { ROW_GRID, Section } from "./section";
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

/** A process as table rows: order, step and its timing, what happens. */
export function Steps({ eyebrow, title, description, items }: StepsProps) {
  return (
    <Section label={eyebrow}>
      {title && <SectionHeading title={title} description={description} />}
      <Reveal>
        <ol className="border-t border-white/15 text-[14px] leading-snug tracking-[-0.01em]">
          {items.map((step, i) => (
            <li key={step.title} className={`border-b border-white/15 py-5 ${ROW_GRID}`}>
              <span className="text-white/40" style={{ fontVariantNumeric: "tabular-nums" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="col-span-2 md:col-span-1">
                <h3 className="font-medium text-white">{step.title}</h3>
                {step.meta && <p className="mt-1 text-white/40">{step.meta}</p>}
              </div>
              <p className="col-span-2 col-start-2 leading-relaxed text-white/65 md:col-span-1 md:col-start-3">{step.body}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
