'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../SectionHeader'

export default function ValueProposition() {
  const values = [
    { icon: '🎯', title: 'ESTRATEGIA', description: 'Cada decisión visual debe tener un propósito' },
    { icon: '✨', title: 'CREATIVIDAD', description: 'Soluciones únicas para cada negocio' },
    { icon: '⚡', title: 'TECNOLOGÍA', description: 'Herramientas modernas para máxima eficiencia' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="section-padding bg-white border-t border-rae-gray-light">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader
            title="No solo marketing. Creamos experiencias digitales."
            description="Desde tu página web hasta tus redes sociales y automatizaciones, conectamos cada parte de tu presencia digital para construir una marca más sólida."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {values.map((value, index) => (
              <motion.div key={index} variants={itemVariants} className="text-center space-y-4">
                <div className="text-5xl">{value.icon}</div>
                <h3 className="text-xl font-bold text-rae-gray-dark">{value.title}</h3>
                <p className="text-rae-gray-dark/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
