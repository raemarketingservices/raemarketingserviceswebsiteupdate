'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../SectionHeader'

const steps = [
  {
    number: '01',
    title: 'DESCUBRIMOS',
    description: 'Conocemos tu negocio, tus objetivos y tus clientes.',
  },
  {
    number: '02',
    title: 'PLANIFICAMOS',
    description: 'Creamos la estrategia adecuada para alcanzar tus objetivos.',
  },
  {
    number: '03',
    title: 'CREAMOS',
    description: 'Diseñamos y desarrollamos la solución.',
  },
  {
    number: '04',
    title: 'OPTIMIZAMOS',
    description: 'Analizamos, mejoramos y ajustamos.',
  },
  {
    number: '05',
    title: 'CRECEMOS',
    description: 'Convertimos la estrategia en resultados.',
  },
]

export default function Process() {
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
    <section className="section-padding bg-rae-gray-light">
      <div className="container-custom space-y-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader title="De una idea a una solución digital." />
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Desktop Timeline */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <motion.div variants={itemVariants} className="flex flex-col items-center gap-4 flex-1">
                    <div className="relative">
                      <div className="w-16 h-16 bg-rae-blue rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.number}
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 w-16 h-16 bg-rae-blue rounded-full opacity-20 blur"
                      />
                    </div>
                    <div className="text-center max-w-xs">
                      <h3 className="font-bold text-rae-gray-dark mb-2">{step.title}</h3>
                      <p className="text-sm text-rae-gray-dark/70">{step.description}</p>
                    </div>
                  </motion.div>

                  {index < steps.length - 1 && (
                    <motion.div
                      variants={itemVariants}
                      className="w-12 h-0.5 bg-gradient-to-r from-rae-blue to-transparent mx-4"
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-8 pb-8"
              >
                {/* Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-3 top-12 w-0.5 h-12 bg-rae-blue/30" />
                )}

                {/* Circle */}
                <div className="absolute left-0 top-0 w-6 h-6 bg-rae-blue rounded-full border-4 border-white shadow-md" />

                {/* Content */}
                <div>
                  <h3 className="font-bold text-rae-gray-dark mb-1">{step.title}</h3>
                  <p className="text-sm text-rae-gray-dark/70">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
