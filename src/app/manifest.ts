import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "LAVI & CO",
    description: siteConfig.description,
    lang: "es-PE",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0e14",
    theme_color: "#0b0e14",
    icons: [{ src: "/icon", sizes: "512x512", type: "image/png" }],
  };
}
