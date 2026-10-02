export type ProjectImage = { src: string; alt: string };

export type Project = {
  id: string;
  client: string;
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

/** Real client projects. Source: PROYECTOS.md — nothing here is invented. */
export const projects: Project[] = [
  {
    id: "case-maservit",
    client: "Maservit",
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
    frameLabel: "Servidor interno · Maservit",
    images: [{ src: "/media/Proyectos/maservit.png", alt: "Web app de control de asistencia de Maservit: historial y reportes" }],
  },
  {
    id: "case-vitora",
    client: "Vitora",
    sector: "Florería",
    type: "E-commerce",
    title: "Floralite — tienda online con pago por Yape",
    summary: "E-commerce para una florería con pasarela de pago Yape.",
    built: "Una tienda online con pasarela de pago Yape integrada.",
    result: "Más ventas a través de la web.",
    stack: ["Shopify", "Yape"],
    duration: "30 días",
    year: "2025",
    url: "https://vitora.pe",
    frameLabel: "vitora.pe",
    images: [{ src: "/media/Proyectos/vitora.png", alt: "Floralite, la tienda online de la florería Vitora" }],
  },
  {
    id: "case-barandas",
    client: "Proyecto confidencial",
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
      { src: "/media/Proyectos/barandas-2.png", alt: "Diagrama Gantt por orden: cortado, armado, soldadura, arenado y pintado" },
      { src: "/media/Proyectos/barandas-3.png", alt: "Plan de corte con resumen de avance y configuración de jornada" },
      { src: "/media/Proyectos/barandas-1.png", alt: "Catálogo de códigos de baranda con longitudes, cantidades y tiempos" },
    ],
  },
  {
    id: "case-mentalabs",
    client: "Mentalabs",
    sector: "Psicología",
    type: "MVP · ERP",
    title: "MVP de producto para una startup",
    summary: "Producto inicial tipo ERP para una startup de psicología.",
    problem: "Necesitaban organizar el negocio de forma integral — el equivalente a un ERP.",
    built: "El MVP inicial de producto para la startup Mentalabs.",
    stack: ["Next.js", "Supabase"],
    frameLabel: "App · Mentalabs",
    images: [
      { src: "/media/Proyectos/mentalabs-2.png", alt: "Panel del especialista en Mentalabs con pacientes, agenda y actividad reciente" },
      { src: "/media/Proyectos/mentalabs-1.png", alt: "Página de inicio de Mentalabs, plataforma clínica para psicólogos" },
    ],
  },
];
