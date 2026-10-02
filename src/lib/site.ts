import type { Metadata } from "next";

export const siteConfig = {
  name: "LAVI & CO",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://lavi.lat").replace(/\/$/, ""),
  locale: "es_PE",
  description:
    "Estudio de diseño y desarrollo operativo en Arequipa, Perú. Automatización con n8n, ERP y CRM a medida, desarrollo de producto y sistemas logísticos para empresas en LATAM.",
  email: "contacto@lavi.lat",
  phone: "+51946689538",
  whatsapp: "https://wa.me/51946689538",
  instagram: "https://instagram.com/lavi.latam",
  city: "Arequipa",
  country: "PE",
} as const;

export const navItems = [
  { href: "/work", label: "Casos" },
  { href: "/services", label: "Servicios" },
  { href: "/logistica", label: "Logística" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
] as const;

/** Serializes JSON-LD safely for a <script> tag (escapes `<` to avoid breaking out of the tag). */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "/" }, ...items].map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

/**
 * Per-page metadata with canonical URL and complete Open Graph / Twitter fields.
 * Child `openGraph` objects replace the parent's entirely, so every field is set here.
 */
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "LAVI & CO — Automatización y software a medida para operaciones en LATAM",
};

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url: path,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [ogImage] },
  };
}
