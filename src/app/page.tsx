import type { Metadata } from "next";
import { HomeView } from "./_components/home-view";

export const metadata: Metadata = {
  title: { absolute: "LAVI & CO | Automatización y software a medida en Arequipa, Perú" },
  description:
    "Diseñamos y desarrollamos los sistemas que tu operación necesita: automatización con n8n, ERP y CRM a medida, MVPs y visibilidad logística. Desde Arequipa para todo LATAM.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeView />;
}
