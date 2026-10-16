export type ProjectImage = { src: string; alt: string };

export type Project = {
  id: string;
  /** URL segment of the case page: /work/[slug]. */
  slug: string;
  metaTitle: string;
  metaDescription: string;
  /** Slug of the service in `services.ts` this case belongs to. */
  serviceSlug: string;
  sector: string;
  type: string;
  title: string;
  summary: string;
  problem?: string;
  built: string;
  result?: string;
  stack: string[];
  duration?: string;
  year?: string;
  /** Public site, if any. */
  url?: string;
  /** Label shown in the browser frame when there is no public URL. */
  frameLabel: string;
  images: ProjectImage[];
};

/** Real projects, described by the tool that was built. A client is only identified where it has a public site in `url`. */
export const projects: Project[] = [
  {
    id: "case-maservit",
    slug: "control-de-asistencia-hikvision",
    metaTitle: "Control de asistencia con Hikvision: caso real",
    metaDescription:
      "Web app de control de asistencia integrada con dispositivos Hikvision y desplegada en Docker en el servidor de una metalmecánica. Entregada en 1 semana.",
    serviceSlug: "erp-crm-a-medida",
    sector: "Metalmecánica",
    type: "Web app + integración Hikvision",
    title: "Control de asistencia con integración Hikvision",
    summary: "Web app con integración de cámaras Hikvision, desplegada en el servidor de la empresa.",
    problem: "El control de asistencia se hacía revisando cámaras, y tomaba mucho tiempo.",
    built:
      "Una web app desplegada en Docker en el propio servidor de la empresa, integrada con sus dispositivos Hikvision.",
    result: "Mejora en los tiempos de control.",
    stack: ["Next.js", "PostgreSQL", "Docker", "Hikvision"],
    duration: "1 semana",
    year: "2026",
    url: "https://maservit.com.pe",
    frameLabel: "Servidor interno del cliente",
    images: [{ src: "/media/herramientas/asistencia.webp", alt: "Historial de marcaciones con filtros por trabajador, tipo y estado" }],
  },
  {
    id: "case-vitora",
    slug: "tienda-online-yape",
    metaTitle: "Tienda online con pago por Yape: caso real",
    metaDescription:
      "Tienda en línea para una florería, construida sobre Shopify con pasarela de pago Yape integrada. Entregada en 30 días por LAVI & CO.",
    serviceSlug: "desarrollo-mvp",
    sector: "Florería",
    type: "E-commerce",
    title: "Tienda en línea con pago por Yape",
    summary: "E-commerce para una florería con pasarela de pago Yape.",
    built: "Una tienda online con pasarela de pago Yape integrada.",
    result: "Más ventas a través de la web.",
    stack: ["Shopify", "Yape"],
    duration: "30 días",
    year: "2025",
    url: "https://vitora.pe",
    frameLabel: "vitora.pe",
    images: [{ src: "/media/herramientas/tienda.webp", alt: "Portada de una tienda en línea de flores" }],
  },
  {
    id: "case-barandas",
    slug: "seguimiento-de-produccion",
    metaTitle: "Seguimiento de producción en tiempo real: caso real",
    metaDescription:
      "App web que reemplazó un Excel compartido: el estado de fabricación de cada orden, por etapa y en tiempo real, para una metalmecánica. Entregada en 1 semana.",
    serviceSlug: "erp-crm-a-medida",
    sector: "Metalmecánica",
    type: "App de producción",
    title: "Seguimiento de fabricación en tiempo real",
    summary: "Reemplazo de Excel por una app con estado de producción en tiempo real.",
    problem:
      "El avance de fabricación vivía en un Excel que solo se actualizaba pasándose el archivo entre personas.",
    built: "Una app para ver el estado de fabricación de barandas inox en tiempo real, desde la web.",
    stack: ["Python", "React", "Supabase"],
    duration: "1 semana",
    year: "2026",
    frameLabel: "App interna · Planta",
    images: [
      { src: "/media/herramientas/fabricacion.webp", alt: "Diagrama Gantt por orden: cortado, armado, soldadura, arenado y pintado" },
      { src: "/media/herramientas/fabricacion-corte.webp", alt: "Plan de corte con resumen de avance y configuración de jornada" },
      { src: "/media/herramientas/fabricacion-codigos.webp", alt: "Catálogo de códigos de baranda con longitudes, cantidades y tiempos" },
    ],
  },
  {
    id: "case-mentalabs",
    slug: "mvp-panel-clinico",
    metaTitle: "MVP de panel clínico para psicólogos: caso real",
    metaDescription:
      "MVP tipo ERP para una startup de psicología: panel de especialistas con pacientes, agenda y evaluaciones, construido con Next.js y Supabase.",
    serviceSlug: "desarrollo-mvp",
    sector: "Psicología",
    type: "MVP · ERP",
    title: "Panel clínico: el primer producto de una startup",
    summary: "Producto inicial tipo ERP para una startup de psicología.",
    problem: "Necesitaban organizar el negocio de forma integral — el equivalente a un ERP.",
    built: "El MVP inicial del producto: un panel para especialistas con pacientes, agenda y evaluaciones.",
    stack: ["Next.js", "Supabase"],
    frameLabel: "Aplicación web",
    images: [
      { src: "/media/herramientas/panel-clinico.webp", alt: "Panel del especialista con pacientes activos y exámenes pendientes" },
      { src: "/media/herramientas/panel-clinico-inicio.webp", alt: "Página de inicio de una plataforma clínica para psicólogos" },
    ],
  },
];

/** "https://www.example.pe/" -> "example.pe", for link labels. */
export function siteDomain(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
