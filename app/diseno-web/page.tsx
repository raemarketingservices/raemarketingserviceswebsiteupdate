import ServicePageLayout from '@/components/ServicePageLayout'

const serviceData = {
  title: 'Diseño de Páginas Web',
  subtitle: 'Páginas que venden, no solo existen',
  icon: '🌐',
  description:
    'Creamos páginas web modernas, rápidas, responsivas y enfocadas en convertir visitantes en clientes. Cada pixel cuenta.',
  problem:
    'Una página web lenta, desorganizada o difícil de navegar no solo pierde clientes, sino que daña tu reputación. El 53% de los usuarios abandona un sitio si tarda más de 3 segundos en cargar.',
  solution:
    'Diseñamos y desarrollamos páginas web estratégicas con enfoque en experiencia del usuario, velocidad de carga y optimización para conversión. Cada sección está pensada para guiar a tus visitantes hacia la acción que deseas.',
  benefits: [
    'Aumenta tus conversiones y leads',
    'Mejora tu posicionamiento en Google',
    'Carga rápida en cualquier dispositivo',
    'Diseño moderno que refleja tu marca',
    'Integración con tus herramientas de negocio',
    'Mantenimiento y actualizaciones incluidas',
  ],
  features: [
    'Diseño UI/UX personalizado',
    'Landing Pages de alto rendimiento',
    'Websites corporativos profesionales',
    'Responsive Design (móvil, tablet, desktop)',
    'Optimización de conversión (CRO)',
    'Integraciones (CRM, email, etc)',
    'Formularios y call-to-actions estratégicos',
    'Blog y gestor de contenidos',
  ],
  processSteps: [
    { title: 'Descubrimiento', description: 'Analizamos tu negocio, competencia y objetivos' },
    { title: 'Estrategia', description: 'Definimos arquitectura, flujos y conversiones' },
    { title: 'Diseño', description: 'Creamos mockups atractivos y funcionales' },
    { title: 'Desarrollo', description: 'Programamos y optimizamos para mejor rendimiento' },
  ],
  portfolioItems: [
    'E-commerce de ropa',
    'Sitio corporativo de servicios',
    'Landing page de SaaS',
    'Portafolio de agencia creativa',
  ],
  faqItems: [
    {
      question: '¿Cuánto tiempo toma crear una página web?',
      answer:
        'Depende de la complejidad. Una landing page simple: 2-3 semanas. Un website corporativo: 4-8 semanas. Nos mantenemos en comunicación constante durante todo el proceso.',
    },
    {
      question: '¿Incluye mantenimiento y actualizaciones?',
      answer:
        'Sí. Incluimos 3 meses de soporte técnico y actualizaciones. Después ofrecemos planes de mantenimiento según tus necesidades.',
    },
    {
      question: '¿Es responsive en móviles?',
      answer:
        'Totalmente. Diseñamos mobile-first. Tu página se verá perfecta en cualquier dispositivo: smartphones, tablets y desktops.',
    },
    {
      question: '¿Puedo editar el contenido yo mismo?',
      answer:
        'Claro. Usamos sistemas de gestión (CMS) fáciles de usar como WordPress o Webflow. Te enseñamos cómo funciona.',
    },
    {
      question: '¿Me ayudan con SEO?',
      answer:
        'Sí. Optimizamos para buscadores: estructura, velocidad, palabras clave, meta tags, sitemap. Tu página estará lista para rankear.',
    },
  ],
}

export default function DisenoWebPage() {
  return (
    <>
      <ServicePageLayout {...serviceData} />
    </>
  )
}
