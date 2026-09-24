'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Button from '../Button'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section className="relative w-full min-h-screen pt-20 flex items-center overflow-hidden bg-gradient-to-b from-rae-gray-light to-white">
      <div className="absolute top-0 left-0 w-96 h-96 bg-rae-blue/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rae-blue-light/10 rounded-full blur-3xl -z-10" />

      <div className="container-custom w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 md:space-y-8 z-10">
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Soluciones Digitales
                <br />
                Para Negocios
                <br />
                <span className="gradient-text">Que Quieren Más</span>
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-rae-gray-dark/80 max-w-xl">
              Transformamos ideas en experiencias digitales que ayudan a tu negocio a crecer.
            </motion.p>

            <motion.p variants={itemVariants} className="text-base md:text-lg text-rae-gray-dark/70 max-w-xl">
              Estrategia, diseño y tecnología trabajando juntos para crear una presencia digital que realmente genere impacto.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="primary" size="lg" className="text-base md:text-lg">
                Impulsa tu negocio →
              </Button>
              <Button variant="outline" size="lg" className="text-base md:text-lg">
                Explorar servicios
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-6 border-t border-rae-gray-light">
              <p className="text-sm md:text-base font-semibold text-rae-blue">IDEAS • ESTRATEGIA • RESULTADOS</p>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible" className="relative h-96 md:h-[500px] lg:h-[600px] hidden lg:block">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-48 bg-white rounded-2xl shadow-2xl border-8 border-rae-gray-light p-4 z-20"
            >
              <div className="w-full h-6 bg-rae-gray-light rounded-t-lg mb-2 flex gap-2 px-2">
                <div className="w-2 h-2 bg-rae-blue rounded-full" />
                <div className="w-2 h-2 bg-rae-blue-light rounded-full" />
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
              </div>
              <div className="w-full h-full bg-gradient-to-br from-rae-blue/20 to-rae-blue-light/20 rounded-lg flex items-center justify-center">
                <span className="text-xs font-semibold text-rae-blue">WEB DESIGN</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-20 left-0 w-32 h-56 bg-rae-blue rounded-3xl shadow-xl border-4 border-rae-gray-light p-2 z-30"
            >
              <div className="w-full h-full bg-gradient-to-b from-rae-blue-light to-rae-blue/20 rounded-2xl flex items-center justify-center">
                <span className="text-xs font-semibold text-white">SOCIAL</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute bottom-40 right-0 w-40 bg-white rounded-xl shadow-lg p-4 border border-rae-gray-light z-10"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-rae-blue/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-rae-blue">+</span>
                </div>
                <span className="text-sm font-semibold text-rae-gray-dark">Engagement</span>
              </div>
              <div className="text-2xl font-bold text-rae-blue">+340%</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute top-1/3 right-0 w-40 bg-white rounded-xl shadow-lg p-4 border border-rae-gray-light"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-rae-blue-light/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-rae-blue-light">📈</span>
                </div>
                <span className="text-sm font-semibold text-rae-gray-dark">Growth</span>
              </div>
              <div className="text-2xl font-bold text-rae-blue-light">+85%</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 bg-white rounded-xl shadow-lg p-4 border border-rae-gray-light z-20"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-rae-blue-light/20 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-rae-blue-light">⚡</span>
                </div>
                <span className="text-sm font-semibold text-rae-gray-dark">Automation</span>
              </div>
              <div className="text-2xl font-bold text-rae-blue-light">Live</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
