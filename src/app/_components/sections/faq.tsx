import { jsonLd } from "@/lib/site";
import { Reveal } from "./reveal";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

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
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <Section label={eyebrow}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />
      {title && <SectionHeading title={title} description={description} />}
      <Reveal>
        <div className="border-t border-white/15 text-[14px] leading-snug tracking-[-0.01em]">
          {items.map((item) => (
            <details key={item.question} className="group border-b border-white/15">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-5 font-medium text-white [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden className="shrink-0 text-white/50 transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-[58ch] pb-6 leading-relaxed text-white/65">{item.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
