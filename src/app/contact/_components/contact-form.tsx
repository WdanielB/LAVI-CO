"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { whatsappLink } from "@/lib/site";
import { submitContact, type ContactState } from "../actions";

type StepName = "nombre" | "empresa" | "email" | "telefono" | "necesidad" | "mensaje";

type Step = {
  name: StepName;
  /** Short label for the progress rail and the answers recap. */
  label: string;
  question: string;
  helper?: string;
  type: "text" | "email" | "tel" | "textarea" | "choice";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  options?: string[];
};

const STEPS: Step[] = [
  {
    name: "nombre",
    label: "Nombre",
    question: "¿Cómo te llamas?",
    helper: "Para saber con quién hablamos.",
    type: "text",
    placeholder: "Nombre y apellido",
    autoComplete: "name",
    required: true,
  },
  {
    name: "empresa",
    label: "Empresa",
    question: "¿En qué empresa trabajas?",
    helper: "Nos ayuda a llegar con contexto.",
    type: "text",
    placeholder: "Nombre de tu empresa",
    autoComplete: "organization",
  },
  {
    name: "email",
    label: "Correo",
    question: "¿A qué correo te respondemos?",
    helper: "Respondemos en un día hábil.",
    type: "email",
    placeholder: "tu@empresa.com",
    autoComplete: "email",
    required: true,
  },
  {
    name: "telefono",
    label: "Teléfono",
    question: "¿Un WhatsApp o teléfono?",
    helper: "Solo si prefieres que te escribamos por ahí.",
    type: "tel",
    placeholder: "+51 999 999 999",
    autoComplete: "tel",
  },
  {
    name: "necesidad",
    label: "Necesidad",
    question: "¿Qué necesitas resolver?",
    helper: "Elige lo más cercano. Lo afinamos en la llamada.",
    type: "choice",
    options: [
      "Automatizar un proceso manual",
      "Una herramienta a medida",
      "Integrar sistemas o datos",
      "Aún no lo tengo claro",
    ],
  },
  {
    name: "mensaje",
    label: "Mensaje",
    question: "Cuéntanos qué te está frenando.",
    helper: "Dos o tres líneas sobre tu operación son suficientes.",
    type: "textarea",
    placeholder: "El proceso que hoy se siente lento, frágil o demasiado manual…",
    required: true,
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 1200;

const initialState: ContactState = { ok: false, message: "" };

const easing = [0.22, 1, 0.36, 1] as const;

export function ContactForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [localError, setLocalError] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const touched = useRef(false);

  const step = STEPS[index];
  const total = STEPS.length;
  const isLast = index === total - 1;
  const value = values[step.name] ?? "";
  const error = localError ?? (!state.ok ? state.errors?.[step.name] : undefined);
  const fieldId = `field-${step.name}`;

  useEffect(() => {
    // Autofoco al cambiar de pregunta, pero no al cargar la página: robaría el scroll.
    if (!touched.current || step.type === "choice") return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 260);
    return () => window.clearTimeout(id);
  }, [index, step.type]);

  function goTo(next: number, dir: number) {
    touched.current = true;
    setLocalError(null);
    setDirection(dir);
    setIndex(Math.max(0, Math.min(next, total - 1)));
  }

  function validateCurrent(): boolean {
    const current = value.trim();
    if (step.required && !current) {
      setLocalError("Este campo es necesario para continuar.");
      return false;
    }
    if (step.type === "email" && current && !EMAIL_RE.test(current)) {
      setLocalError("Ese correo no parece válido.");
      return false;
    }
    setLocalError(null);
    return true;
  }

  function goNext() {
    if (!validateCurrent()) {
      inputRef.current?.focus();
      return;
    }
    if (isLast) {
      formRef.current?.requestSubmit();
      return;
    }
    goTo(index + 1, 1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    // Enter avanza; en el mensaje, Shift+Enter hace salto de línea.
    if (e.key === "Enter" && (step.type !== "textarea" || !e.shiftKey)) {
      e.preventDefault();
      goNext();
    }
  }

  function setValue(v: string) {
    setValues((prev) => ({ ...prev, [step.name]: v }));
    if (localError) setLocalError(null);
  }

  if (state.ok) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easing }}
        role="status"
        className="border border-white/15 px-6 py-12 sm:px-10 sm:py-16"
      >
        <svg aria-hidden viewBox="0 0 48 48" fill="none" className="mb-8 h-12 w-12 text-[#7fb6d4]">
          <circle cx="24" cy="24" r="23" stroke="currentColor" />
          <motion.path
            d="m15 24.5 6.2 6.2L33.5 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: easing }}
          />
        </svg>
        <h2 className="font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
          Mensaje recibido{values.nombre ? `, ${values.nombre.split(" ")[0]}` : ""}.
        </h2>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-white/70">
          Te respondemos en un día hábil{values.email ? ` a ${values.email}` : ""}. Si es urgente, escríbenos por WhatsApp.
        </p>
        <a
          href={whatsappLink("Hola LAVI & CO, acabo de enviar el formulario de contacto.")}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex items-center gap-3 border border-white/25 px-6 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/5"
        >
          Abrir WhatsApp
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </a>
      </motion.div>
    );
  }

  const answered = STEPS.slice(0, index).filter((s) => (values[s.name] ?? "").trim());

  return (
    <form ref={formRef} action={formAction} noValidate className="relative border border-white/15">
      {/* Todos los valores viajan como campos ocultos al enviar el form. */}
      {STEPS.map((s) => (
        <input key={s.name} type="hidden" name={s.name} value={values[s.name] ?? ""} readOnly />
      ))}
      {/* Honeypot anti-spam: oculto para humanos. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      {/* Riel de progreso: un tramo por pregunta; los ya respondidos sirven para volver. */}
      <ol className="grid grid-cols-6 border-b border-white/15" aria-label="Progreso del formulario">
        {STEPS.map((s, i) => {
          const done = i < index;
          const current = i === index;
          return (
            <li key={s.name} className="border-r border-white/10 last:border-r-0">
              <button
                type="button"
                disabled={!done}
                onClick={() => goTo(i, -1)}
                aria-current={current ? "step" : undefined}
                aria-label={`Pregunta ${i + 1}: ${s.label}${done ? " (respondida, volver)" : ""}`}
                className="group relative flex h-12 w-full items-center justify-center gap-2 px-1 disabled:cursor-default sm:h-14 sm:justify-start sm:px-4"
              >
                <span
                  className={`font-mono text-[10px] tracking-[0.2em] transition-colors ${
                    current ? "text-white" : done ? "text-[#7fb6d4] group-hover:text-white" : "text-white/30"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`hidden truncate font-mono text-[10px] uppercase tracking-[0.18em] transition-colors lg:inline ${
                    current ? "text-white" : done ? "text-white/60 group-hover:text-white" : "text-white/30"
                  }`}
                >
                  {s.label}
                </span>
                <motion.span
                  aria-hidden
                  initial={false}
                  animate={{ scaleX: done || current ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: easing }}
                  className={`absolute inset-x-0 -bottom-px h-[2px] origin-left ${current ? "bg-white" : "bg-[var(--lavi-accent)]"}`}
                />
              </button>
            </li>
          );
        })}
      </ol>

      <div className="px-5 py-9 sm:px-10 sm:py-12">
        {/* Lo ya respondido, a la vista, para que nadie dude de qué puso. */}
        <div className="mb-8 flex min-h-[1.75rem] flex-wrap gap-2">
          {answered.map((s) => (
            <button
              key={s.name}
              type="button"
              onClick={() => goTo(STEPS.indexOf(s), -1)}
              className="max-w-[16rem] truncate border border-white/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60 transition-colors hover:border-white/40 hover:text-white"
            >
              {values[s.name]}
            </button>
          ))}
        </div>

        <div className="min-h-[15rem] sm:min-h-[18rem]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step.name}
              initial={{ opacity: 0, y: direction * 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: direction * -24 }}
              transition={{ duration: 0.4, ease: easing }}
              onKeyDown={handleKeyDown}
            >
              <label
                htmlFor={step.type === "choice" ? undefined : fieldId}
                id={`${fieldId}-label`}
                className="block max-w-[22ch] text-balance font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white"
              >
                {step.question}
              </label>
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-relaxed text-white/55">
                {step.helper}
                {!step.required && (
                  <span className="border border-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                    Opcional
                  </span>
                )}
              </p>

              <div className="mt-8">
                {step.type === "choice" ? (
                  <div role="radiogroup" aria-labelledby={`${fieldId}-label`} className="grid gap-px border border-white/15 bg-white/15 sm:grid-cols-2">
                    {step.options!.map((opt, i) => {
                      const active = value === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => {
                            setValue(opt);
                            window.setTimeout(() => goTo(index + 1, 1), 220);
                          }}
                          className={`group flex min-h-[4.5rem] items-center gap-4 px-5 py-4 text-left text-[15px] font-medium transition-colors ${
                            active ? "bg-[var(--lavi-accent)] text-white" : "bg-[var(--lavi-ink)] text-white/80 hover:bg-white/[0.06] hover:text-white"
                          }`}
                        >
                          <span className={`font-mono text-[10px] tracking-[0.2em] ${active ? "text-white/80" : "text-white/40"}`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="flex-1">{opt}</span>
                          <span aria-hidden className={`transition-transform ${active ? "" : "text-white/30 group-hover:translate-x-0.5"}`}>
                            →
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : step.type === "textarea" ? (
                  <>
                    <textarea
                      id={fieldId}
                      ref={(el) => {
                        inputRef.current = el;
                      }}
                      rows={4}
                      maxLength={MESSAGE_MAX}
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder={step.placeholder}
                      aria-invalid={Boolean(error)}
                      aria-describedby={error ? `${fieldId}-error` : undefined}
                      className="w-full resize-none border border-white/20 bg-white/[0.03] p-4 text-lg leading-relaxed text-white placeholder:text-white/30 focus:border-white focus:outline-none sm:text-xl"
                    />
                    <p className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                      <span className="hidden sm:inline">Shift + Enter para salto de línea</span>
                      <span className="ml-auto" style={{ fontVariantNumeric: "tabular-nums" }}>
                        {value.length} / {MESSAGE_MAX}
                      </span>
                    </p>
                  </>
                ) : (
                  <input
                    id={fieldId}
                    ref={(el) => {
                      inputRef.current = el;
                    }}
                    type={step.type}
                    inputMode={step.type === "tel" ? "tel" : step.type === "email" ? "email" : "text"}
                    autoComplete={step.autoComplete}
                    autoCapitalize={step.type === "email" ? "none" : undefined}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={step.placeholder}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${fieldId}-error` : undefined}
                    className="w-full border-b-2 border-white/25 bg-transparent pb-3 font-serif text-2xl text-white placeholder:text-white/25 focus:border-white focus:outline-none sm:text-3xl"
                  />
                )}
              </div>

              {error && (
                <p id={`${fieldId}-error`} role="alert" className="mt-4 flex items-center gap-2 text-sm font-medium text-red-300">
                  <span aria-hidden className="h-px w-4 bg-red-300" />
                  {error}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/12 pt-6">
          <button
            type="button"
            onClick={() => goTo(index - 1, -1)}
            disabled={index === 0}
            className="-ml-2 px-2 py-3 text-sm font-medium text-white/55 transition-colors hover:text-white disabled:invisible"
          >
            ← Atrás
          </button>

          <div className="flex items-center gap-4">
            {step.type !== "choice" && (
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/35 sm:inline">Enter ↵</span>
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={pending}
              className="group inline-flex items-center gap-3 bg-white py-2 pl-7 pr-2 text-[13px] font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-60"
            >
              <span>
                {pending ? "Enviando…" : isLast ? "Enviar mensaje" : !step.required && !value.trim() ? "Omitir" : "Siguiente"}
              </span>
              <span
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5 group-hover:bg-black group-hover:text-white"
              >
                →
              </span>
            </button>
          </div>
        </div>

        {!state.ok && state.message && (
          <p role="alert" className="mt-5 text-sm font-medium text-red-300">
            {state.message}
          </p>
        )}
        <p className="mt-6 text-xs leading-relaxed text-white/40">Usamos estos datos solo para responder tu consulta.</p>
      </div>
    </form>
  );
}
