import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LAVI & CO | Diseño y Desarrollo Operativo",
  description: "LAVI & CO diseña y desarrolla sistemas digitales para operaciones de alto impacto desde Arequipa, Perú.",
  icons: {
    icon: "/media/logos/lavi-amp-icon.png",
    shortcut: "/media/logos/lavi-amp-icon.png",
    apple: "/media/logos/lavi-amp-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-PE" className={`${montserrat.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
