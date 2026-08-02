import { Reveal } from "./reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mb-8 md:mb-10">
      {eyebrow && (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">{eyebrow}</p>
      )}
      <h2 className="max-w-3xl text-balance font-serif text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/75">{description}</p>
      )}
    </Reveal>
  );
}
