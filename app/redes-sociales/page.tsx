import ServicePageLayout from '@/components/ServicePageLayout'

const serviceData = {
  title: 'Manejo de Redes Sociales',
  subtitle: 'Presencia consistente que conecta con tu audiencia',
  icon: '📱',
  description:
    'Construimos una presencia digital consistente mediante contenido estratégico, creativo y diseñado para conectar con tu audiencia y aumentar engagement.',
  problem:
    'Postear sin estrategia es ruido. Muchas empresas publican sin propósito, sin consistencia y sin resultados. Redes desorganizadas no generan leads ni ventas.',
  solution:
    'Creamos una estrategia de contenido integrada. Diseñamos posts atractivos, creamos reels virales, gestionamos comunidad y medimos cada métrica. Tu marca crece mientras nosotros manejamos las redes.',
  benefits: [
    'Crecimiento orgánico consistente',
    'Mayor engagement e interacción',
    'Conexión auténtica con tu audiencia',
    'Generación de leads desde redes',
    'Protección de tu reputación online',
    'Tiempo liberado para tu negocio',
  ],
  features: [
    'Estrategia de contenido mensual',
    'Diseño de publicaciones',
    'Creación de Reels y videos',
    'Calendario de contenido optimizado',
    'Gestión de comentarios y mensajes',
    'Optimización de perfiles',
    'Análisis de métricas',
    'Estrategia de crecimiento',
  ],
  processSteps: [
    { title: 'Auditoría', description: 'Analizamos tu audiencia y competencia' },
    { title: 'Estrategia', description: 'Definimos pilares de contenido' },
    { title: 'Creación', description: 'Diseñamos y producimos contenido' },
    { title: 'Gestión', description: 'Publicamos y gestionamos comunidad' },
  ],
  portfolioItems: [
    'Cuenta creció de 500 a 15k en 6 meses',
    'E-commerce: 20% de ventas desde Instagram',
    'Coach: comunidad de 8k personas activas',
    'Marca: reels con 100k+ vistas',
  ],
  faqItems: [
    {
      question: '¿Cuántas publicaciones por semana?',
      answer:
        'Normalmente 5-7 posts en Instagram y otras redes. Ajustamos según tu industria y presupuesto. Calidad > cantidad siempre.',
    },
    {
      question: '¿Pueden usar mi marca de agua?',
      answer:
        'Totalmente. Todo contenido es 100% exclusivo para tu marca. Usamos tus colores, estilo y voz de marca.',
    },
    {
      question: '¿Qué si no tengo fotos?',
      answer:
        'Generamos contenido visual atractivo usando diseño gráfico, video, infografías. No necesitas stock photos genéricos.',
    },
    {
      question: '¿Hacen Reels?',
      answer:
        'Sí, Reels son parte clave de nuestra estrategia. Creamos videos cortos, dinámicos y con tendencias para maximizar alcance.',
    },
    {
      question: '¿Puedo pedir cambios?',
      answer:
        'Por supuesto. Aunque nos encargamos de la estrategia, tú tienes control total. Podemos hacer ajustes antes de publicar.',
    },
  ],
}

export default function RedesSocialesPage() {
  return (
    <>
      <ServicePageLayout {...serviceData} />
    </>
  )
}
