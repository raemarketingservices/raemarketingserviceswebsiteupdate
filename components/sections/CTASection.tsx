'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Button from '../Button'

export default function CTASection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-rae-blue-dark via-rae-blue to-rae-blue-light" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container-custom relative z-10 text-center space-y-8"
      >
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          Tu próxima gran idea merece una estrategia.
        </motion.h2>

        <motion.p variants={itemVariants} className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
          Cuéntanos sobre tu negocio y descubre cómo podemos ayudarte a llevarlo al siguiente nivel.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button variant="secondary" size="lg" className="text-base md:text-lg">
            HABLEMOS DE TU PROYECTO →
          </Button>
          <Button variant="outline" size="lg" className="text-base md:text-lg text-white border-white hover:bg-white hover:text-rae-blue">
            Ver nuestros servicios
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
