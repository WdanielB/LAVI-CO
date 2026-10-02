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
    default: "LAVI & CO | Automatización y software a medida en Arequipa, Perú",
    template: "%s | LAVI & CO",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: "LAVI & CO | Automatización y software a medida",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "LAVI & CO | Automatización y software a medida",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false },
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
        addressCountry: siteConfig.country,
      },
      areaServed: [
        { "@type": "Country", name: "Perú" },
        { "@type": "Place", name: "Latinoamérica" },
      ],
      sameAs: [siteConfig.instagram],
      knowsAbout: ["Automatización de procesos", "n8n", "ERP", "CRM", "Desarrollo de software", "Logística"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
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
