'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../SectionHeader'

const portfolioItems = [
  { id: 1, title: 'E-commerce Moderno', category: 'Web Design', image: '🌐' },
  { id: 2, title: 'Campaña Social Media', category: 'Social Media', image: '📱' },
  { id: 3, title: 'Branding Premium', category: 'Branding', image: '🎨' },
  { id: 4, title: 'Estrategia Digital', category: 'Marketing', image: '📊' },
  { id: 5, title: 'Automatización CRM', category: 'Automation', image: '⚙️' },
  { id: 6, title: 'Rediseño Web', category: 'Web Design', image: '🚀' },
]

const categories = ['Todos', 'Web Design', 'Social Media', 'Branding', 'Marketing', 'Automation']

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('Todos')

  const filteredItems = activeCategory === 'Todos' ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  return (
    <section id="portfolio" className="section-padding bg-white">
      <div className="container-custom space-y-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <SectionHeader
            title="Trabajo que habla por nosotros."
            description="Una selección de proyectos creados para ayudar a marcas a verse mejor, comunicar mejor y crecer digitalmente."
          />
        </motion.div>

        {/* Filters */}
        <motion.div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                activeCategory === category
                  ? 'bg-rae-blue text-white shadow-lg'
                  : 'bg-rae-gray-light text-rae-gray-dark hover:bg-gray-300'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              layout
              whileHover={{ y: -8 }}
              className="relative bg-gradient-to-br from-rae-gray-light to-white rounded-xl overflow-hidden shadow-subtle hover:shadow-lg transition-all cursor-pointer group"
            >
              {/* Image Area */}
              <div className="w-full h-64 bg-gradient-to-br from-rae-blue/10 to-rae-blue-light/10 flex items-center justify-center group-hover:from-rae-blue/20 group-hover:to-rae-blue-light/20 transition-all">
                <span className="text-6xl group-hover:scale-110 transition-transform">{item.image}</span>
              </div>

              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center"
              >
                <div className="text-center space-y-3 text-white">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.category}</p>
                  <motion.div className="text-rae-blue-light font-semibold">Ver proyecto →</motion.div>
                </div>
              </motion.div>

              {/* Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-bold text-rae-gray-dark">{item.title}</h3>
                <p className="text-sm text-rae-blue">{item.category}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
