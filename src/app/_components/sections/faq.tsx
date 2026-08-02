import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: FaqItem[];
};

export function Faq({ eyebrow, title, description, items }: FaqProps) {
  return (
    <section className="container mx-auto max-w-[1440px] px-5 pb-16 sm:px-6 md:px-12 md:pb-20 lg:px-20">
      {title && <SectionHeading eyebrow={eyebrow} title={title} description={description} />}
      <Reveal>
        <div className="max-w-3xl border-t border-white/25">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-white/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-sm font-semibold text-white transition-colors hover:text-white/80 [&::-webkit-details-marker]:hidden lg:text-base">
                {item.question}
                <span
                  aria-hidden
                  className="shrink-0 font-mono text-white/50 transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-6 pr-8 text-sm leading-relaxed text-white/75 lg:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
