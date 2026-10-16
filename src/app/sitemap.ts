import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";

type Entry = MetadataRoute.Sitemap[number];

/**
 * Date of the last real content change. Bump it when page copy changes: a `lastmod` that moves
 * on every deploy teaches crawlers to ignore it.
 */
const LAST_MODIFIED = "2026-10-12";

const image = (src: string) => `${siteConfig.url}${src}`;

const staticRoutes: { path: string; priority: number; changeFrequency: Entry["changeFrequency"]; images?: string[] }[] = [
  { path: "", priority: 1, changeFrequency: "monthly", images: [image("/media/hero-poster.jpg")] },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  {
    path: "/work",
    priority: 0.9,
    changeFrequency: "monthly",
    images: projects.map((project) => image(project.images[0].src)),
  },
  { path: "/logistica", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map(({ path, ...rest }) => ({ url: `${siteConfig.url}${path}`, lastModified: LAST_MODIFIED, ...rest })),
    ...services.map((service) => ({
      url: `${siteConfig.url}/services/${service.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/work/${project.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "yearly" as const,
      priority: 0.7,
      images: project.images.map((img) => image(img.src)),
    })),
  ];
}
