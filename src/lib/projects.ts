export type ProjectImage = { src: string; alt: string };

export type Project = {
  id: string;
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

/** Real projects, described by the tool that was built. Client names are left out on purpose. Source: PROYECTOS.md. */
export const projects: Project[] = [
  {
    id: "case-maservit",
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
    frameLabel: "Servidor interno del cliente",
    images: [{ src: "/media/herramientas/asistencia.webp", alt: "Historial de marcaciones con filtros por trabajador, tipo y estado" }],
  },
  {
    id: "case-vitora",
    sector: "Florería",
    type: "E-commerce",
    title: "Tienda en línea con pago por Yape",
    summary: "E-commerce para una florería con pasarela de pago Yape.",
    built: "Una tienda online con pasarela de pago Yape integrada.",
    result: "Más ventas a través de la web.",
    stack: ["Shopify", "Yape"],
    duration: "30 días",
    year: "2025",
    frameLabel: "Tienda en línea",
    images: [{ src: "/media/herramientas/tienda.webp", alt: "Portada de una tienda en línea de flores" }],
  },
  {
    id: "case-barandas",
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
