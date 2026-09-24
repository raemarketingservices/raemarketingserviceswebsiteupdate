import ServicePageLayout from '@/components/ServicePageLayout'

const serviceData = {
  title: 'Diseño Gráfico',
  subtitle: 'Visual que comunica y vende',
  icon: '🎨',
  description:
    'Creamos piezas visuales que fortalecen la identidad de tu negocio y comunican profesionalismo, creatividad y confianza.',
  problem:
    'Un diseño mediocre daña tu marca. Clientes potenciales juzgan tu negocio en 0.05 segundos por su visual. Sin diseño consistente, no transmites profesionalismo.',
  solution:
    'Diseñamos marca a nivel visual: logo, paleta, tipografía, y todo material. Creamos piezas coherentes que refuerzan tu identidad y comunican exactamente lo que quieres.',
  benefits: [
    'Identidad visual consistente y profesional',
    'Reconocimiento de marca aumenta',
    'Mayor confianza en tus clientes',
    'Comunicación visual clara y efectiva',
    'Diferenciación de competencia',
    'Materiales listos para usar',
  ],
  features: [
    'Branding y manual de marca',
    'Diseño de identidad visual',
    'Social Media Design',
    'Flyers y material impreso',
    'Material promocional',
    'Diseño corporativo',
    'Empaques y etiquetas',
    'Infografías y presentaciones',
  ],
  processSteps: [
    { title: 'Descubrimiento', description: 'Entendemos tu marca y audiencia' },
    { title: 'Concepto', description: 'Desarrollamos ideas y conceptos visuales' },
    { title: 'Diseño', description: 'Creamos las piezas finales' },
    { title: 'Entrega', description: 'Archivos listos para imprenta y digital' },
  ],
  portfolioItems: [
    'Branding completo: startup tech',
    'Empaque y diseño: marca de café',
    'Campaña visual: e-commerce de moda',
    'Material corporativo: agencia profesional',
  ],
  faqItems: [
    {
      question: '¿Cuánto tiempo toma un proyecto de branding?',
      answer:
        'Un branding completo (logo, paleta, tipografía, manual) toma típicamente 3-4 semanas. Diseños puntuales pueden ser más rápido.',
    },
    {
      question: '¿Qué incluye el manual de marca?',
      answer:
        'Guías de uso del logo, paleta de colores, tipografía, espaciado, tono de voz, ejemplos de aplicación y todo lo que necesitas para mantener consistencia.',
    },
    {
      question: '¿Puedo tener varias revisiones?',
      answer:
        'Sí. Incluimos 2-3 rondas de revisiones. Queremos que ames el resultado final.',
    },
    {
      question: '¿Me dan los archivos originales?',
      answer:
        'Totalmente. Recibes todos en formatos editable (AI, PSD, etc) y exportados (PNG, JPG, PDF, SVG). Son tuyos completamente.',
    },
    {
      question: '¿Qué si no me gusta algo?',
      answer:
        'Nos encanta iterar. Si algo no funciona, lo volvemos a hacer. Tu satisfacción es nuestro objetivo.',
    },
  ],
}

export default function DisenoGraficoPage() {
  return (
    <>
      <ServicePageLayout {...serviceData} />
    </>
  )
}
