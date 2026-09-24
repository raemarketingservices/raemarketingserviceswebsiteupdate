'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FloatingWhatsApp() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        href="https://wa.me/18094192390?text=Hola%20RAE%20Marketing%20Services,%20me%20gustaría%20conocer%20más%20sobre%20sus%20servicios"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300"
        title="Chatea con nosotros en WhatsApp"
      >
        <span className="text-2xl">💬</span>
      </Link>
    </motion.div>
  )
}
