'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../SectionHeader'
import Button from '../Button'

const services = [
  {
    id: 1,
    number: '01',
    title: 'Diseño de Páginas Web',
    description: 'Creamos páginas web modernas, rápidas, responsivas y enfocadas en convertir visitantes en clientes.',
    features: [
      'Diseño UI/UX',
      'Landing Pages',
      'Websites corporativos',
      'Responsive Design',
      'Optimización de conversión',
      'Integraciones',
    ],
    icon: '🌐',
    gridSpan: 'lg:col-span-2 lg:row-span-2',
    href: '/diseno-web',
  },
  {
    id: 2,
    number: '02',
    title: 'Marketing Digital',
    description: 'Creamos estrategias digitales diseñadas para aumentar la visibilidad de tu marca.',
    features: ['Estrategia digital', 'Campañas', 'Posicionamiento', 'Contenido', 'Análisis de resultados'],
    icon: '📊',
    gridSpan: 'lg:col-span-1 lg:row-span-2',
    href: '/marketing-digital',
  },
  {
    id: 3,
    number: '03',
    title: 'Manejo de Redes Sociales',
    description: 'Construimos una presencia digital consistente mediante contenido estratégico y creativo.',
    features: [
      'Estrategia de contenido',
      'Diseño de publicaciones',
      'Reels',
      'Calendario de contenido',
      'Gestión de redes',
      'Optimización de perfiles',
    ],
    icon: '📱',
    gridSpan: 'lg:col-span-1',
    href: '/redes-sociales',
  },
  {
    id: 4,
    number: '04',
    title: 'Automatización para Negocios',
    description: 'Automatizamos procesos repetitivos para hacer tu negocio más eficiente.',
    features: [
      'Automatización de procesos',
      'Integraciones',
      'Formularios inteligentes',
      'CRM',
      'WhatsApp',
      'Flujos automatizados',
    ],
    icon: '⚙️',
    gridSpan: 'lg:col-span-1',
    href: '/automatizacion',
  },
  {
    id: 5,
    number: '05',
    title: 'Diseño Gráfico',
    description: 'Creamos piezas visuales que fortalecen la identidad de tu negocio.',
    features: [
      'Branding',
      'Identidad visual',
      'Social Media Design',
      'Flyers',
      'Material promocional',
      'Diseño corporativo',
    ],
    icon: '🎨',
    gridSpan: 'lg:col-span-1',
    href: '/diseno-grafico',
  },
]

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom space-y-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader
            title="Todo lo que tu negocio necesita para crecer digitalmente."
            description="Soluciones estratégicas diseñadas para construir, mejorar y escalar tu presencia digital."
          />
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] lg:auto-rows-[350px]"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(45, 74, 255, 0.15)' }}
              className={`${service.gridSpan} bg-gradient-to-br from-rae-gray-light to-white rounded-2xl p-6 md:p-8 border border-rae-gray-light hover:border-rae-blue transition-all duration-300 cursor-pointer flex flex-col justify-between group`}
            >
              {/* Header */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-bold text-rae-blue opacity-70">{service.number}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-rae-gray-dark mt-2">{service.title}</h3>
                  </div>
                  <div className="text-3xl md:text-4xl">{service.icon}</div>
                </div>
                <p className="text-sm md:text-base text-rae-gray-dark/70 line-clamp-2">{service.description}</p>
              </div>

              {/* Features - hidden on mobile, visible on larger screens */}
              <div className="hidden md:block">
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.slice(0, 3).map((feature, i) => (
                    <span key={i} className="text-xs bg-rae-blue/10 text-rae-blue px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center text-rae-blue font-semibold group-hover:gap-3 transition-all">
                <span className="text-sm md:text-base">Explorar servicio</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
