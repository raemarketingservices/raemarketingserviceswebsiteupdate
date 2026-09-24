import ServicePageLayout from '@/components/ServicePageLayout'

const serviceData = {
  title: 'Automatización para Negocios',
  subtitle: 'Ahorra tiempo, mejora resultados',
  icon: '⚙️',
  description:
    'Automatizamos procesos repetitivos para ayudarte a ahorrar tiempo, mejorar la atención al cliente y hacer tu negocio más eficiente.',
  problem:
    'Hacer todo manualmente consume tiempo valioso. Tareas repetitivas roban horas de productividad. Sin automatización, tu negocio no escala.',
  solution:
    'Analizamos tus procesos y automatizamos todo lo posible: desde respuestas automáticas hasta flujos de ventas complejos. Usamos herramientas modernas como Make, Zapier, WhatsApp Business, CRM y más.',
  benefits: [
    'Ahorra 10-20 horas mensuales',
    'Mejora la experiencia del cliente',
    'Reduce errores manuales',
    'Escala sin aumentar costos',
    'Datos centralizados y organizados',
    'Toma decisiones basadas en datos',
  ],
  features: [
    'Automatización de procesos',
    'Integraciones entre herramientas',
    'Formularios inteligentes',
    'Gestión de CRM',
    'WhatsApp automatizado',
    'Flujos de email',
    'Notificaciones automáticas',
    'Reportes automatizados',
  ],
  processSteps: [
    { title: 'Mapeo', description: 'Identificamos qué procesos automatizar' },
    { title: 'Diseño', description: 'Creamos flujos de automatización' },
    { title: 'Implementación', description: 'Configuramos herramientas e integraciones' },
    { title: 'Pruebas', description: 'Validamos y ajustamos antes de activar' },
  ],
  portfolioItems: [
    'E-commerce: automatizó 15 horas/semana',
    'Agencia: pipeline de ventas automático',
    'Consultor: leads calificados automáticamente',
    'Servicio: soporte 24/7 con ChatBot',
  ],
  faqItems: [
    {
      question: '¿Qué herramientas usan?',
      answer:
        'Make (Integromat), Zapier, n8n, Google Sheets, CRM como HubSpot, WhatsApp Business API, y más según necesidad.',
    },
    {
      question: '¿Es complicado de usar?',
      answer:
        'No. Una vez configurado, es simple. Te enseñamos cómo funciona y cómo hacer cambios si los necesitas.',
    },
    {
      question: '¿Tiene costo mensual?',
      answer:
        'Depende. Algunas herramientas son gratis, otras tienen planes. El ROI casi siempre compensa el costo.',
    },
    {
      question: '¿Puedo integrarlo con mi actual sistema?',
      answer:
        'En 90% de casos sí. Analizamos tus herramientas actuales y conectamos todo. Si no es posible, te lo avisamos antes.',
    },
    {
      question: '¿Qué pasa si algo falla?',
      answer:
        'Incluye 3 meses de soporte técnico. Si algo se rompe, lo arreglamos. Después ofrecemos planes de mantenimiento.',
    },
  ],
}

export default function AutomacionPage() {
  return (
    <>
      <ServicePageLayout {...serviceData} />
    </>
  )
}
