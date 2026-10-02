import type { Project } from "@/lib/projects";
import { Reveal } from "../sections/reveal";

/** Editorial table of contents linking to each case study. */
export function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <Reveal>
      <nav aria-label="Índice de proyectos">
        <ol className="border-t border-white/25">
          {projects.map((project, index) => (
            <li key={project.id} className="border-b border-white/10">
              <a
                href={`#${project.id}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-4 transition-colors hover:bg-white/[0.03] sm:grid-cols-[3rem_1.4fr_1fr_1fr_4rem] sm:py-5"
              >
                <span
                  className="font-mono text-sm text-white/45 transition-colors group-hover:text-[var(--lavi-accent)]"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-base font-semibold text-white sm:text-lg">{project.title}</span>
                <span className="hidden text-sm text-white/60 sm:block">{project.sector}</span>
                <span className="hidden text-sm text-white/60 sm:block">{project.type}</span>
                <span className="flex items-center justify-end gap-3 font-mono text-xs text-white/45">
                  <span className="hidden sm:inline">{project.year ?? ""}</span>
                  <span
                    aria-hidden
                    className="text-white/40 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-white"
                  >
                    ↓
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </Reveal>
  );
}
