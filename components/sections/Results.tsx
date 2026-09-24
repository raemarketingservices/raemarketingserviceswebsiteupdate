'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../SectionHeader'

const benefits = [
  { title: 'MÁS VISIBILIDAD', icon: '👁️', description: 'Aumenta tu presencia online y alcance' },
  { title: 'MÁS PROFESIONALISMO', icon: '✨', description: 'Comunica credibilidad y confianza' },
  { title: 'MEJOR EXPERIENCIA', icon: '😊', description: 'Usuarios satisfechos y fieles' },
  { title: 'MÁS EFICIENCIA', icon: '⚡', description: 'Procesos automatizados y optimizados' },
  { title: 'MÁS OPORTUNIDADES', icon: '🚀', description: 'Nuevos canales y formas de crecer' },
]

export default function Results() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="section-padding bg-rae-gray-light">
      <div className="container-custom space-y-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title="Diseñamos para generar impacto." />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl p-6 shadow-subtle hover:shadow-md transition-all text-center space-y-4"
            >
              <div className="text-5xl">{benefit.icon}</div>
              <h3 className="font-bold text-lg text-rae-gray-dark">{benefit.title}</h3>
              <p className="text-sm text-rae-gray-dark/70">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
