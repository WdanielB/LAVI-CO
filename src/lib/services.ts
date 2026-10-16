export type ServiceFaq = { question: string; answer: string };

export type Service = {
  slug: string;
  /** Short name used in lists, breadcrumbs and structured data. */
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  useCasesTitle: string;
  useCases: { title: string; body: string }[];
  deliverablesTitle: string;
  deliverables: { title: string; body: string }[];
  faqs: ServiceFaq[];
  /** Slugs of the projects in `projects.ts` that show this service at work. */
  caseSlugs: string[];
  whatsappMessage: string;
};

/** One page per service under /services/[slug]. Claims here must match what /services and the cases already say. */
export const services: Service[] = [
  {
    slug: "automatizacion-n8n",
    name: "Automatización de procesos con n8n",
    metaTitle: "Automatización de procesos con n8n en Perú",
    metaDescription:
      "Automatizamos tareas repetitivas con n8n autohospedado: conectamos tu ERP, correo, hojas de cálculo y WhatsApp. Diagnóstico en días y precio cerrado por ciclo.",
    eyebrow: "Servicio · Automatización",
    heading: "Automatización de procesos con n8n: lo que hoy se hace a mano pasa a correr solo.",
    intro:
      "Si tu equipo copia datos entre sistemas, concilia a mano o responde lo mismo veinte veces al día, ese trabajo se puede automatizar. Construimos flujos en n8n autohospedado que conectan los sistemas que ya usas, y los dejamos documentados para que tu equipo los mantenga.",
    useCasesTitle: "Qué tareas se pueden automatizar.",
    useCases: [
      {
        title: "Avisos por WhatsApp y correo",
        body: "Confirmaciones, recordatorios y avisos de estado que hoy alguien escribe uno por uno salen solos cuando ocurre el evento que los dispara.",
      },
      {
        title: "Conciliaciones y cruces de datos",
        body: "Comparar un reporte contra otro deja de ser una tarde de copiar y pegar: el flujo cruza las fuentes y te muestra solo las diferencias.",
      },
      {
        title: "Reportes diarios",
        body: "El reporte que se arma a mano cada mañana llega armado al correo o al grupo del equipo, con los datos del día.",
      },
      {
        title: "Sincronización entre sistemas",
        body: "Lo que se registra en un sistema se replica en el otro por API, sin doble digitación ni errores de tipeo.",
      },
    ],
    deliverablesTitle: "Flujos que tu equipo puede mantener.",
    deliverables: [
      {
        title: "n8n en tu infraestructura",
        body: "Workflows en n8n autohospedado: los datos de tu operación se quedan en tu servidor y no pagas por cada ejecución.",
      },
      {
        title: "Monitoreo y registro",
        body: "Cada flujo queda versionado y monitoreado. Si una ejecución falla, queda registrada y se avisa, en vez de fallar en silencio.",
      },
      {
        title: "Documentación y capacitación",
        body: "Entregamos qué hace cada flujo, qué revisar si falla y cómo ajustarlo, con capacitación al cierre de cada ciclo.",
      },
    ],
    faqs: [
      {
        question: "¿Qué es n8n?",
        answer:
          "n8n es una herramienta de automatización de flujos de trabajo: conecta aplicaciones entre sí mediante nodos visuales y permite agregar código cuando un paso lo necesita. Se puede instalar en tu propio servidor, de modo que los datos no salen de tu infraestructura.",
      },
      {
        question: "¿Por qué n8n y no Zapier o Make?",
        answer:
          "Porque se puede autohospedar: los datos se quedan en tu servidor y el costo no crece con cada ejecución. Si tu caso se resuelve mejor con otra herramienta, te lo decimos en el diagnóstico.",
      },
      {
        question: "¿Con qué sistemas se conecta?",
        answer:
          "Con casi cualquier sistema que tenga API, base de datos o exporte archivos: ERP, correo, hojas de cálculo, WhatsApp y formularios, entre otros. En el diagnóstico revisamos qué expone cada sistema que ya usas.",
      },
      {
        question: "¿Cuánto cuesta automatizar un proceso?",
        answer:
          "Trabajamos por ciclos con precio cerrado. El diagnóstico define qué se automatiza primero, en cuánto tiempo y cuánto cuesta, antes de que te comprometas.",
      },
    ],
    caseSlugs: [],
    whatsappMessage: "Hola LAVI & CO, quiero automatizar un proceso de mi operación con n8n.",
  },
  {
    slug: "erp-crm-a-medida",
    name: "ERP y CRM a medida",
    metaTitle: "ERP y CRM a medida para empresas en Perú",
    metaDescription:
      "Módulos web a medida sobre tu ERP actual (SAP B1, Odoo, Defontana u otros): inventario, pedidos, cobranzas, asistencia y CRM operativo, con roles y auditoría.",
    eyebrow: "Servicio · Herramientas a medida",
    heading: "ERP y CRM a medida: una pantalla por proceso, hecha para cómo trabaja tu operación.",
    intro:
      "Cuando el ERP genérico empieza a doler —pantallas de cuarenta menús, procesos que viven en Excel porque el sistema no calza— no siempre hace falta cambiarlo. Construimos módulos web sobre el stack que ya tienes, con roles, auditoría y solo los campos que tu equipo usa.",
    useCasesTitle: "Qué herramientas construimos.",
    useCases: [
      {
        title: "Inventario y pedidos",
        body: "Stock, pedidos y despachos en una interfaz hecha para tu flujo, sincronizada con tu ERP en vez de una hoja de cálculo paralela.",
      },
      {
        title: "Control de asistencia",
        body: "Marcaciones, historial y reportes por trabajador, integrados con los equipos que ya tienes instalados, como dispositivos Hikvision.",
      },
      {
        title: "Seguimiento de producción",
        body: "El estado de cada orden por etapa y en tiempo real, visible desde la web, en lugar de un Excel que pasa de mano en mano.",
      },
      {
        title: "CRM operativo y cobranzas",
        body: "Clientes, seguimiento y cobranzas con los pasos de tu proceso comercial, no con los de un CRM pensado para otra industria.",
      },
    ],
    deliverablesTitle: "Software que queda en tus manos.",
    deliverables: [
      {
        title: "Sobre lo que ya tienes",
        body: "Módulos que se sincronizan con SAP B1, Odoo, Defontana u otros por API o eventos. Migrar es la última opción, no la primera.",
      },
      {
        title: "Roles y auditoría",
        body: "Cada usuario ve y edita lo que le corresponde, y queda registro de quién cambió qué y cuándo.",
      },
      {
        title: "Código y documentación tuyos",
        body: "Al cierre, el sistema es tuyo: código, credenciales y documentación. Tu equipo puede mantenerlo sin depender de nosotros.",
      },
    ],
    faqs: [
      {
        question: "¿Tengo que reemplazar mi ERP actual?",
        answer:
          "No. En la mayoría de los casos construimos una capa encima: módulos web que leen y escriben en tu ERP por API o eventos. Así resuelves el proceso que duele sin una migración completa.",
      },
      {
        question: "¿Cuándo conviene un ERP a medida y cuándo uno comercial?",
        answer:
          "Un ERP comercial conviene para lo estándar, como contabilidad y facturación. Lo hecho a medida conviene donde tu proceso es distinto al de los demás y hoy lo resuelves con Excel o trabajo manual. Lo habitual es combinar ambos.",
      },
      {
        question: "¿Dónde se instala el sistema?",
        answer:
          "Donde convenga a tu operación: en la nube o en tu propio servidor. Uno de nuestros sistemas de asistencia corre en Docker dentro del servidor de la empresa.",
      },
      {
        question: "¿Cuánto demora tener algo funcionando?",
        answer:
          "El diagnóstico toma unos cinco días y el primer release entra en producción entre dos y seis semanas después, según el alcance. Las herramientas más acotadas de nuestro portafolio se entregaron en una semana.",
      },
    ],
    caseSlugs: ["control-de-asistencia-hikvision", "seguimiento-de-produccion"],
    whatsappMessage: "Hola LAVI & CO, quiero una herramienta a medida (ERP/CRM) para mi operación.",
  },
  {
    slug: "desarrollo-mvp",
    name: "Desarrollo de MVP y producto digital",
    metaTitle: "Desarrollo de MVP y producto digital en Perú",
    metaDescription:
      "Llevamos tu idea a un primer producto usable en semanas: MVP, plataformas web y tiendas en línea, con alcance cerrado y una métrica de éxito definida antes de programar.",
    eyebrow: "Servicio · Producto",
    heading: "Desarrollo de MVP: de la idea a un primer producto usable en semanas.",
    intro:
      "Si tienes una idea validable, o un proceso interno que podría ser un producto, necesitas algo que la gente pueda usar pronto, no un proyecto de un año. Definimos el alcance mínimo, lo construimos y lo ponemos en manos de usuarios reales.",
    useCasesTitle: "Qué construimos.",
    useCases: [
      {
        title: "MVP de producto",
        body: "La primera versión funcional de tu producto, con lo justo para que usuarios reales lo prueben y tú puedas medir si resuelve el problema.",
      },
      {
        title: "Plataformas web",
        body: "Aplicaciones con usuarios, roles y datos propios: paneles, portales y sistemas de gestión para un negocio que recién se organiza.",
      },
      {
        title: "Tiendas en línea",
        body: "Catálogo, carrito y cobro con los medios de pago que usan tus clientes, como Yape.",
      },
      {
        title: "Prototipos para validar",
        body: "Una prueba con datos reales para saber si la idea funciona antes de invertir en construirla completa.",
      },
    ],
    deliverablesTitle: "Un primer release, no una promesa.",
    deliverables: [
      {
        title: "Alcance cerrado",
        body: "Antes de escribir código definimos qué entra en el primer release, qué queda fuera y con qué métrica se mide el resultado.",
      },
      {
        title: "Avance visible",
        body: "Ves el producto funcionando en cada ciclo, no solo al final. Los cambios de rumbo se deciden con el producto delante.",
      },
      {
        title: "Base para crecer",
        body: "Código mantenible y documentado, sobre tecnologías estándar como Next.js, React, PostgreSQL y Supabase, para que el siguiente ciclo no empiece de cero.",
      },
    ],
    faqs: [
      {
        question: "¿Qué es un MVP?",
        answer:
          "Un MVP (producto mínimo viable) es la versión más pequeña de un producto que ya resuelve el problema central de sus usuarios. Sirve para validar la idea con uso real antes de invertir en todo lo demás.",
      },
      {
        question: "¿Cuánto demora desarrollar un MVP?",
        answer:
          "Apuntamos a que el primer release esté en producción entre dos y seis semanas después de cerrar el alcance. Si la idea necesita más, la partimos en ciclos para que cada uno termine con algo usable.",
      },
      {
        question: "¿Cuánto cuesta?",
        answer:
          "Cada ciclo tiene precio cerrado. El diagnóstico define el alcance del primero y su costo antes de que te comprometas; no firmas un proyecto de un año a ciegas.",
      },
      {
        question: "¿Qué pasa después del MVP?",
        answer:
          "Medimos la métrica acordada. Si el número acompaña, definimos el siguiente ciclo; si no, se corrige antes de crecer. El código y la documentación son tuyos en cualquier caso.",
      },
    ],
    caseSlugs: ["mvp-panel-clinico", "tienda-online-yape"],
    whatsappMessage: "Hola LAVI & CO, tengo una idea de producto y quiero conversar sobre un MVP.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
