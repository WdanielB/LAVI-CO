import { Reveal } from "./reveal";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
};

/** The one large statement of a sheet. The sheet's label lives in the left column, not here. */
export function SectionHeading({ title, description, className = "mb-10 md:mb-14" }: SectionHeadingProps) {
  return (
    <Reveal className={className}>
      <h2 className="max-w-[26ch] text-balance font-serif text-[clamp(1.5rem,2.7vw,2.4rem)] font-medium leading-[1.12] tracking-[-0.035em] text-white">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-white/60">{description}</p>}
    </Reveal>
  );
}
