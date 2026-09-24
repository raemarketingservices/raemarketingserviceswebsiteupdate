'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '@/components/SectionHeader'
import Button from '@/components/Button'

interface ServicePageLayoutProps {
  title: string
  subtitle: string
  icon: string
  description: string
  problem: string
  solution: string
  benefits: string[]
  features: string[]
  processSteps: Array<{ title: string; description: string }>
  portfolioItems: string[]
  faqItems: Array<{ question: string; answer: string }>
}

export default function ServicePageLayout({
  title,
  subtitle,
  icon,
  description,
  problem,
  solution,
  benefits,
  features,
  processSteps,
  portfolioItems,
  faqItems,
}: ServicePageLayoutProps) {
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null)

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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:py-24 bg-gradient-to-b from-rae-gray-light to-white overflow-hidden">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <motion.div variants={itemVariants} className="text-6xl md:text-7xl">
              {icon}
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold text-rae-gray-dark">
              {title}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-rae-blue font-semibold">
              {subtitle}
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-rae-gray-dark/70 max-w-2xl mx-auto">
              {description}
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button variant="primary" size="lg">
                Solicitar consultoría →
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-3xl font-bold text-rae-gray-dark">El Problema</h2>
              <p className="text-lg text-rae-gray-dark/70 leading-relaxed">{problem}</p>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-3xl font-bold text-rae-blue">Nuestra Solución</h2>
              <p className="text-lg text-rae-gray-dark/70 leading-relaxed">{solution}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-rae-gray-light">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <SectionHeader title="Beneficios que obtendrás" centered />
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-subtle hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">✓</div>
                    <p className="text-rae-gray-dark font-semibold">{benefit}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <SectionHeader title="Qué incluye este servicio" centered />
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            >
              {features.map((feature, i) => (
                <motion.div key={i} variants={itemVariants} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-rae-blue rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm">•</span>
                  </div>
                  <span className="text-rae-gray-dark font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-rae-gray-light">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <SectionHeader title="Nuestro Proceso" centered />
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {processSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white rounded-xl p-6 shadow-subtle hover:shadow-md transition-all"
                >
                  <div className="text-3xl font-bold text-rae-blue mb-3">{String(i + 1).padStart(2, '0')}</div>
                  <h3 className="font-bold text-rae-gray-dark mb-2">{step.title}</h3>
                  <p className="text-sm text-rae-gray-dark/70">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <SectionHeader title="Preguntas Frecuentes" centered />
            <motion.div variants={containerVariants} className="space-y-4">
              {faqItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="border border-rae-gray-light rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between bg-rae-gray-light hover:bg-gray-300 transition-colors text-left"
                  >
                    <span className="font-bold text-rae-gray-dark">{item.question}</span>
                    <span className={`text-2xl transition-transform ${openFAQ === i ? 'rotate-180' : ''}`}>↓</span>
                  </button>
                  {openFAQ === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 border-t border-rae-gray-light text-rae-gray-dark/70"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-rae-blue-dark via-rae-blue to-rae-blue-light">
        <div className="container-custom text-center text-white space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">¿Listo para transformar tu negocio?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            SOLICITAR CONSULTA →
          </Button>
        </div>
      </section>
    </div>
  )
}
