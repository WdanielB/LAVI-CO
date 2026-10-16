import Link from "next/link";
import { Reveal } from "./reveal";
import { Section } from "./section";
import { SectionHeading } from "./section-heading";

type LinkItem = { href: string; title: string; meta?: string };

type LinkListProps = {
  eyebrow?: string;
  title?: string;
  items: LinkItem[];
};

/** A table of internal links: one row per destination, with a quiet note beside the title. */
export function LinkList({ eyebrow, title, items }: LinkListProps) {
  return (
    <Section label={eyebrow}>
      {title && <SectionHeading title={title} />}
      <Reveal>
        <ul className="border-t border-white/15 text-[14px] leading-snug tracking-[-0.01em]">
          {items.map((item) => (
            <li key={item.href} className="border-b border-white/15">
              <Link
                href={item.href}
                className="group flex items-baseline justify-between gap-6 py-5 text-white transition-colors hover:text-white/70"
              >
                <span className="font-medium">{item.title}</span>
                <span className="flex items-baseline gap-4 text-white/50">
                  {item.meta && <span className="hidden text-right sm:inline">{item.meta}</span>}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
