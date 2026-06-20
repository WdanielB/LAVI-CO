import { LandingSubpage } from "../_components/landing-subpage";

export default function SolucionesPage() {
  return (
    <LandingSubpage
      badge="Soluciones"
      title="Soluciones digitales alineadas al negocio"
      description="Integramos analítica, software y automatización en un plan único para que cada equipo opere con más control, trazabilidad y velocidad de respuesta."
      focusAreas={[
        "Diseño de arquitectura funcional orientada a escalabilidad.",
        "Convergencia de datos y procesos entre áreas operativas y comerciales.",
        "Estandarización de flujos para reducir dispersión de criterios.",
      ]}
      resultBullets={[
        "Incremento de productividad por eliminación de tareas manuales duplicadas.",
        "Mejor calidad de información para decisiones de gestión.",
        "Mayor velocidad de respuesta frente a demanda variable.",
      ]}
      implementationBullets={[
        "Diagnóstico conjunto con líderes de cada unidad de negocio.",
        "Definición de hoja de ruta trimestral con hitos medibles.",
        "Ejecución iterativa con revisión de avance en comité ejecutivo.",
      ]}
      metricLabel="aumento de productividad en operaciones"
      metricValue="+42%"
      ctaLabel="Ver plan inicial"
      ctaHref="/comenzar"
      secondaryCtaLabel="Servicios"
      secondaryCtaHref="/services"
      heroImage="/media/philippe-bontemps-FBsKq8iOSKg-unsplash.jpg"
      heroImageAlt="Imagen atmosférica usada para soluciones digitales"
    />
  );
}
