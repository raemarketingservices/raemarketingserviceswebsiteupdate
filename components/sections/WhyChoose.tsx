'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../SectionHeader'

const reasons = [
  {
    number: '01',
    title: 'Estrategia antes que diseño',
    description: 'Cada decisión visual debe tener un propósito. No hacemos nada sin entender tu negocio primero.',
  },
  {
    number: '02',
    title: 'Soluciones personalizadas',
    description: 'Cada negocio es diferente. Las soluciones también deben serlo. Nada de templates genéricos.',
  },
  {
    number: '03',
    title: 'Tecnología que simplifica',
    description: 'Utilizamos herramientas modernas para hacer procesos más eficientes y resultados más medibles.',
  },
  {
    number: '04',
    title: 'Enfoque en resultados',
    description: 'Diseñamos pensando en crecimiento, conversión y experiencia del usuario. Tu éxito es nuestro éxito.',
  },
]

export default function WhyChoose() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="section-padding bg-rae-blue-dark text-white">
      <div className="container-custom space-y-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader
            title="¿Por qué trabajar con RAE?"
            subtitle="No buscamos simplemente que tu negocio se vea bien. Queremos que funcione mejor."
            centered={true}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {reasons.map((reason, index) => (
            <motion.div key={index} variants={itemVariants} className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-3xl md:text-4xl font-bold text-rae-blue-light opacity-50">{reason.number}</span>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{reason.title}</h3>
                  <p className="text-base text-white/80 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
