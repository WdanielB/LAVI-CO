import { Reveal } from "./reveal";
import { ROW_GRID } from "./section";

type SplitFeatureProps = {
  eyebrow?: string;
  title: string;
  body: string;
  bullets?: string[];
};

/** One row of a text table, with its specifics listed under the explanation. Place it inside a Section. */
export function SplitFeature({ eyebrow, title, body, bullets }: SplitFeatureProps) {
  // Callers pass eyebrows like "01 · Despacho"; the number leads the row and the word sits under the title.
  const [number, topic] = eyebrow ? eyebrow.split("·").map((part) => part.trim()) : ["", ""];

  return (
    <Reveal>
      <article className={`border-b border-white/15 py-5 text-[14px] leading-snug tracking-[-0.01em] ${ROW_GRID}`}>
        <span className="text-white/40" style={{ fontVariantNumeric: "tabular-nums" }}>{number}</span>
        <div className="col-span-2 md:col-span-1">
          <h3 className="font-medium text-white">{title}</h3>
          {topic && <p className="mt-1 text-white/40">{topic}</p>}
        </div>
        <div className="col-span-2 col-start-2 md:col-span-1 md:col-start-3">
          <p className="leading-relaxed text-white/65">{body}</p>
          {bullets && (
            <ul className="mt-4 space-y-1.5 text-white/45">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 leading-relaxed">
                  <span aria-hidden>—</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </Reveal>
  );
}
