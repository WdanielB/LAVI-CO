import Image from "next/image";
import { Reveal } from "./reveal";

type SplitFeatureProps = {
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
  media?: { src: string; alt: string };
  reverse?: boolean;
  metric?: { value: string; label: string };
};

export function SplitFeature({ eyebrow, title, body, bullets, media, reverse, metric }: SplitFeatureProps) {
  return (
    <div className="container mx-auto max-w-[1440px] px-5 pb-12 sm:px-6 md:px-12 md:pb-16 lg:px-20">
      <Reveal>
        <div
          className={
            media
              ? `grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`
              : "max-w-2xl"
          }
        >
          <div>
            {eyebrow && (
              <p className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--lavi-accent)]">
                {eyebrow}
              </p>
            )}
            <h3 className="font-serif text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl lg:text-3xl">
              {title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/80 lg:text-base">{body}</p>
            {bullets && (
              <ul className="mt-5 space-y-2.5">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-relaxed text-white/80">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lavi-accent)]" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
            {metric && (
              <p className="mt-6 border-t border-white/10 pt-4 text-sm text-white/70">
                <span
                  className="mr-3 font-mono text-2xl font-semibold text-white"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {metric.value}
                </span>
                {metric.label}
              </p>
            )}
          </div>
          {media && (
            <div className="overflow-hidden border border-white/10">
              <Image
                src={media.src}
                alt={media.alt}
                width={960}
                height={640}
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}
