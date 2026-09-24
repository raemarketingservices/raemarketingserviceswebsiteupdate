import ServicePageLayout from '@/components/ServicePageLayout'

const serviceData = {
  title: 'Marketing Digital',
  subtitle: 'Estrategia que genera visibilidad y resultados',
  icon: '📊',
  description:
    'Creamos estrategias digitales diseñadas para aumentar la visibilidad de tu marca, atraer clientes y convertir en ventas.',
  problem:
    'Tener presencia online no es suficiente. Sin una estrategia clara, tus competidores te superan. Muchas empresas gastan dinero en publicidad sin ver resultados reales.',
  solution:
    'Diseñamos estrategias digitales integrales basadas en datos. Analizamos tu mercado, identificamos oportunidades, ejecutamos campañas optimizadas y medimos cada resultado para mejora continua.',
  benefits: [
    'Aumenta tu visibilidad en buscadores y redes',
    'Atrae clientes calificados interesados en tu producto',
    'Reduce costo de adquisición de clientes',
    'Genera leads consistentes y de calidad',
    'Mejora el ROI de tu inversión en marketing',
    'Crecimiento medible y sostenible',
  ],
  features: [
    'Estrategia digital personalizada',
    'Campañas en Google Ads y Meta',
    'Posicionamiento en buscadores (SEO)',
    'Email marketing automatizado',
    'Análisis de competencia',
    'Gestión de presupuesto optimizado',
    'Reportes detallados y transparentes',
    'Optimización continua',
  ],
  processSteps: [
    { title: 'Auditoría', description: 'Analizamos tu situación actual y oportunidades' },
    { title: 'Estrategia', description: 'Definimos canales, mensajes y presupuesto' },
    { title: 'Ejecución', description: 'Lanzamos campañas con máxima precisión' },
    { title: 'Optimización', description: 'Mejoramos resultados semana a semana' },
  ],
  portfolioItems: [
    'Campaña SaaS que generó 150 leads',
    'E-commerce con 200% ROI',
    'Servicios profesionales: 50 clientes nuevos',
    'Startup: posicionamiento en 3 meses',
  ],
  faqItems: [
    {
      question: '¿En cuánto tiempo veo resultados?',
      answer:
        'Algunos resultados son inmediatos (Google Ads), pero el crecimiento consistente toma 2-3 meses. Nos enfocamos en resultados a largo plazo.',
    },
    {
      question: '¿Cuál es el presupuesto mínimo?',
      answer:
        'Recomendamos un mínimo de $500-1000 mensuales para ver resultados significativos. Podemos escalar según tu disponibilidad.',
    },
    {
      question: '¿Qué diferencia hay entre SEM y SEO?',
      answer:
        'SEM (anuncios pagos) genera resultados inmediatos. SEO (posicionamiento orgánico) toma más tiempo pero genera tráfico consistente a largo plazo. Usamos ambos.',
    },
    {
      question: '¿Puedo ver los resultados en tiempo real?',
      answer:
        'Sí. Configuramos dashboards que puedes monitorear. Te enviamos reportes semanales con métricas clave y recomendaciones.',
    },
    {
      question: '¿Qué pasa si termino el servicio?',
      answer:
        'Las campañas se pausan, pero mantienes todo configurado. Si regresas, reanudamos rápidamente. No es pérdida total de inversión.',
    },
  ],
}

export default function MarketingDigitalPage() {
  return (
    <>
      <ServicePageLayout {...serviceData} />
    </>
  )
}
