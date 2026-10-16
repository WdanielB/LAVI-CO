import type { Metadata } from "next";
import { HomeView } from "./_components/home-view";

export const metadata: Metadata = {
  title: { absolute: "Software a medida y automatización en Arequipa | LAVI & CO" },
  description:
    "Diseñamos y desarrollamos el software que tu operación necesita: control de asistencia, inventario, seguimiento de producción, automatización con n8n y ERP a medida. Desde Arequipa para todo LATAM.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeView />;
}
