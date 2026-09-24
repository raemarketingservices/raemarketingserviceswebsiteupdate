'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../SectionHeader'
import Button from '../Button'

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const visualItems = [
    { label: 'Web Design', icon: '🌐', color: 'from-rae-blue to-rae-blue-light' },
    { label: 'Branding', icon: '🎨', color: 'from-rae-blue-light to-rae-blue' },
    { label: 'Social Media', icon: '📱', color: 'from-rae-blue-dark to-rae-blue' },
    { label: 'Automation', icon: '⚙️', color: 'from-rae-blue-light to-rae-blue-dark' },
  ]

  return (
    <section id="about" className="section-padding bg-rae-gray-light">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <SectionHeader
              title="Estrategia que convierte ideas en crecimiento."
              centered={false}
            />

            <div className="space-y-4 text-rae-gray-dark/80">
              <p>
                RAE Marketing Services nace con una misión clara: ayudar a negocios a aprovechar el poder de las herramientas digitales para crecer, destacar y conectar con sus clientes.
              </p>
              <p>
                Combinamos creatividad, estrategia y tecnología para desarrollar soluciones adaptadas a las necesidades reales de cada negocio.
              </p>
              <p>
                No creemos en soluciones genéricas. Cada proyecto comienza entendiendo tu marca, tus objetivos y tus clientes.
              </p>
            </div>

            <Button variant="primary" size="lg">
              Conoce nuestra forma de trabajar →
            </Button>
          </motion.div>

          {/* Right Visual */}
          <motion.div variants={itemVariants} className="relative h-96 md:h-[500px]">
            <div className="grid grid-cols-2 gap-4 h-full">
              {visualItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 flex flex-col items-center justify-center text-white shadow-lg cursor-pointer ${
                    index === 0 ? 'col-span-1 row-span-2' : ''
                  }`}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="font-semibold text-center text-sm md:text-base">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
