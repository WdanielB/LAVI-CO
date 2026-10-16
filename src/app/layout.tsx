import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { jsonLd, siteConfig } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Software a medida y automatización en Arequipa | LAVI & CO",
    template: "%s | LAVI & CO",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "software a medida Arequipa",
    "aplicaciones web para empresas",
    "control de asistencia",
    "automatización de procesos",
    "n8n",
    "software a medida",
    "ERP a medida",
    "CRM a medida",
    "desarrollo de MVP",
    "automatización logística",
    "desarrollo web Arequipa",
    "consultoría digital Perú",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: "Software a medida y automatización en Arequipa | LAVI & CO",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Software a medida y automatización en Arequipa | LAVI & CO",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
  // Search Console "HTML tag" verification; unset when the property is verified by DNS.
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  themeColor: "#0b0e14",
  colorScheme: "dark",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: `${siteConfig.url}/media/logos/lavi-logo-light.png`,
      image: `${siteConfig.url}/opengraph-image`,
      description: siteConfig.description,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.city,
        addressRegion: "Arequipa",
        addressCountry: siteConfig.country,
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        availableLanguage: "es",
      },
      areaServed: [
        { "@type": "City", name: "Arequipa" },
        { "@type": "Country", name: "Perú" },
        { "@type": "Place", name: "Latinoamérica" },
      ],
      sameAs: [siteConfig.instagram],
      knowsAbout: [
        "Software a medida",
        "Aplicaciones web para empresas",
        "Control de asistencia",
        "Seguimiento de producción",
        "Automatización de procesos",
        "n8n",
        "ERP",
        "CRM",
        "Logística",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: siteConfig.description,
      inLanguage: "es-PE",
      publisher: { "@id": `${siteConfig.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE" className={`${montserrat.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
        >
          Saltar al contenido
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationJsonLd)} />
        {children}
      </body>
    </html>
  );
}
