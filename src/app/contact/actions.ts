"use server";

import { promises as fs } from "node:fs";
import path from "node:path";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";

export type ContactState = {
  ok: boolean;
  message: string;
  errors?: Partial<Record<ContactField, string>>;
};

type ContactField = "nombre" | "empresa" | "email" | "telefono" | "necesidad" | "mensaje";

const DATA_DIR = path.join(process.cwd(), "data");
const CSV_PATH = path.join(DATA_DIR, "contactos.csv");

// Orden de columnas en el Excel. El encabezado se escribe una sola vez.
const COLUMNS: { key: "fecha" | ContactField; label: string }[] = [
  { key: "fecha", label: "Fecha" },
  { key: "nombre", label: "Nombre" },
  { key: "empresa", label: "Empresa" },
  { key: "email", label: "Correo" },
  { key: "telefono", label: "Telefono / WhatsApp" },
  { key: "necesidad", label: "Que necesita" },
  { key: "mensaje", label: "Mensaje" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Destinatarios del aviso. CONTACT_TO acepta varios correos separados por coma.
const RECIPIENTS = (process.env.CONTACT_TO ?? `${siteConfig.email},cvilcasal@gmail.com`)
  .split(",")
  .map((address) => address.trim())
  .filter(Boolean);

// Resend solo entrega a terceros desde un dominio verificado; CONTACT_FROM debe usar ese dominio.
const FROM = process.env.CONTACT_FROM ?? "LAVI & CO <onboarding@resend.dev>";

/** Escapa un valor para CSV compatible con Excel (comillas, comas, saltos de línea). */
function csvCell(value: string): string {
  const clean = value.replace(/\r?\n/g, " ").trim();
  if (/[",;]/.test(clean)) {
    return `"${clean.replace(/"/g, '""')}"`;
  }
  return clean;
}

function csvRow(values: string[]): string {
  return values.map(csvCell).join(";") + "\r\n";
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function appendToCsv(record: Record<string, string>) {
  await fs.mkdir(DATA_DIR, { recursive: true });

  let needsHeader = false;
  try {
    await fs.access(CSV_PATH);
  } catch {
    needsHeader = true;
  }

  let payload = "";
  if (needsHeader) {
    // BOM UTF-8 para que Excel muestre bien las tildes al abrir el CSV.
    payload += "﻿" + csvRow(COLUMNS.map((c) => c.label));
  }
  payload += csvRow(COLUMNS.map((c) => record[c.key] ?? ""));

  await fs.appendFile(CSV_PATH, payload, "utf8");
}

async function sendEmail(record: Record<string, string>) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const rows = COLUMNS.map((c) => ({ label: c.label, value: record[c.key] || "—" }));

  const { error } = await resend.emails.send({
    from: FROM,
    to: RECIPIENTS,
    replyTo: record.email,
    subject: `Nuevo contacto: ${record.nombre}${record.empresa ? ` (${record.empresa})` : ""}`,
    text: rows.map((r) => `${r.label}: ${r.value}`).join("\n"),
    html: `<table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${rows
      .map(
        (r) =>
          `<tr><td style="border-bottom:1px solid #ddd;color:#666;vertical-align:top">${escapeHtml(r.label)}</td><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(r.value)}</td></tr>`,
      )
      .join("")}</table>`,
  });
  if (error) throw new Error(error.message);
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    nombre: String(formData.get("nombre") ?? "").trim(),
    empresa: String(formData.get("empresa") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    telefono: String(formData.get("telefono") ?? "").trim(),
    necesidad: String(formData.get("necesidad") ?? "").trim(),
    mensaje: String(formData.get("mensaje") ?? "").trim(),
  };

  // Honeypot anti-spam: campo oculto que un humano nunca llena.
  if (String(formData.get("website") ?? "").length > 0) {
    return { ok: true, message: "¡Gracias! Te responderemos en un día hábil." };
  }

  const errors: Partial<Record<ContactField, string>> = {};
  if (!raw.nombre) errors.nombre = "Necesitamos tu nombre.";
  if (!raw.email) errors.email = "Necesitamos un correo para responderte.";
  else if (!EMAIL_RE.test(raw.email)) errors.email = "Ese correo no parece válido.";
  if (!raw.mensaje) errors.mensaje = "Cuéntanos brevemente qué te está frenando.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Revisa los campos marcados.", errors };
  }

  const record: Record<string, string> = {
    fecha: new Date().toISOString(),
    ...raw,
  };

  // El correo es el canal confiable: el disco del hosting se borra en cada despliegue,
  // así que el CSV queda solo como copia local.
  const [email, csv] = await Promise.allSettled([
    process.env.RESEND_API_KEY ? sendEmail(record) : Promise.reject(new Error("RESEND_API_KEY no está configurada")),
    appendToCsv(record),
  ]);

  if (email.status === "rejected") console.error("No se pudo enviar el correo de contacto:", email.reason);
  if (csv.status === "rejected") console.error("No se pudo guardar el contacto en CSV:", csv.reason);

  // En producción el CSV no cuenta: sin correo, el mensaje se perdería en el siguiente despliegue.
  const delivered = email.status === "fulfilled" || (process.env.NODE_ENV !== "production" && csv.status === "fulfilled");
  if (!delivered) {
    return {
      ok: false,
      message: `Algo falló al enviar. Escríbenos a ${siteConfig.email} mientras lo revisamos.`,
    };
  }

  return { ok: true, message: "¡Gracias! Te responderemos en un día hábil." };
}
