'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Button from './Button'

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Nosotros', href: '/#about' },
  { label: 'Servicios', href: '/#services' },
  { label: 'Portafolio', href: '/#portfolio' },
  { label: 'Contacto', href: '/#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-rae-gray-light'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className="w-10 h-10 bg-rae-blue rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">RAE</span>
            </div>
            <span className="hidden sm:inline font-bold text-rae-gray-dark">RAE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-rae-gray-dark font-medium hover:text-rae-blue transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                const contactSection = document.getElementById('contact')
                contactSection?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Hablemos
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center gap-1.5 z-50"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-rae-gray-dark rounded"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-rae-gray-dark rounded"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-rae-gray-dark rounded"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-16 left-0 right-0 md:hidden bg-white border-b border-rae-gray-light z-30 overflow-hidden"
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-rae-gray-dark font-medium hover:text-rae-blue transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="primary"
            fullWidth
            onClick={() => {
              setIsOpen(false)
              const contactSection = document.getElementById('contact')
              contactSection?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Hablemos
          </Button>
        </div>
      </motion.div>
    </>
  )
}
