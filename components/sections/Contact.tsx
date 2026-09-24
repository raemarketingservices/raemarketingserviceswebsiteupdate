'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import SectionHeader from '../SectionHeader'
import Button from '../Button'

interface ContactFormData {
  name: string
  company: string
  email: string
  whatsapp: string
  service: string
  message: string
}

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>()
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Here you would send the data to your backend
      console.log('Form submitted:', data)
      setSubmitStatus('success')
      reset()
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const services = [
    'Diseño de páginas web',
    'Marketing Digital',
    'Manejo de redes sociales',
    'Automatización para negocios',
    'Diseño gráfico',
    'Otro',
  ]

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
    <section id="contact" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <motion.div variants={itemVariants}>
            <SectionHeader title="Hagamos grandes cosas juntos." />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit(onSubmit)}
              className="lg:col-span-2 space-y-6"
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-rae-gray-dark mb-2">Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  {...register('name', { required: 'El nombre es requerido' })}
                  className="w-full px-4 py-3 rounded-lg border border-rae-gray-light focus:outline-none focus:border-rae-blue focus:ring-2 focus:ring-rae-blue/10 transition-all"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-semibold text-rae-gray-dark mb-2">Empresa</label>
                <input
                  type="text"
                  placeholder="Nombre de tu empresa"
                  {...register('company', { required: 'La empresa es requerida' })}
                  className="w-full px-4 py-3 rounded-lg border border-rae-gray-light focus:outline-none focus:border-rae-blue focus:ring-2 focus:ring-rae-blue/10 transition-all"
                />
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
              </div>

              {/* Email & WhatsApp Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-rae-gray-dark mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    {...register('email', { required: 'El email es requerido' })}
                    className="w-full px-4 py-3 rounded-lg border border-rae-gray-light focus:outline-none focus:border-rae-blue focus:ring-2 focus:ring-rae-blue/10 transition-all"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-rae-gray-dark mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+1 (809) 000-0000"
                    {...register('whatsapp', { required: 'WhatsApp es requerido' })}
                    className="w-full px-4 py-3 rounded-lg border border-rae-gray-light focus:outline-none focus:border-rae-blue focus:ring-2 focus:ring-rae-blue/10 transition-all"
                  />
                  {errors.whatsapp && <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>}
                </div>
              </div>

              {/* Service */}
              <div>
                <label className="block text-sm font-semibold text-rae-gray-dark mb-2">Servicio que necesitas</label>
                <select
                  {...register('service', { required: 'Selecciona un servicio' })}
                  className="w-full px-4 py-3 rounded-lg border border-rae-gray-light focus:outline-none focus:border-rae-blue focus:ring-2 focus:ring-rae-blue/10 transition-all bg-white"
                >
                  <option value="">Selecciona un servicio</option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-rae-gray-dark mb-2">Cuéntanos sobre tu proyecto</label>
                <textarea
                  placeholder="Describe tu proyecto, objetivos y cualquier detalle importante..."
                  rows={5}
                  {...register('message', { required: 'El mensaje es requerido' })}
                  className="w-full px-4 py-3 rounded-lg border border-rae-gray-light focus:outline-none focus:border-rae-blue focus:ring-2 focus:ring-rae-blue/10 transition-all resize-none"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
                >
                  ✓ Solicitud enviada exitosamente. Nos pondremos en contacto pronto.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                >
                  ✗ Error al enviar la solicitud. Intenta de nuevo.
                </motion.div>
              )}

              <Button variant="primary" size="lg" fullWidth isLoading={isSubmitting}>
                ENVIAR SOLICITUD →
              </Button>
            </motion.form>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
              <div className="bg-rae-gray-light rounded-xl p-6 space-y-6">
                <div>
                  <p className="text-sm font-semibold text-rae-blue mb-2">Instagram</p>
                  <a
                    href="https://instagram.com/raemarketingservices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rae-gray-dark hover:text-rae-blue font-semibold transition-colors"
                  >
                    @raemarketingservices
                  </a>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm font-semibold text-rae-blue mb-2">WhatsApp</p>
                  <a
                    href="https://wa.me/18094192390"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rae-gray-dark hover:text-rae-blue font-semibold transition-colors"
                  >
                    +1 (809) 419-2390
                  </a>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-sm font-semibold text-rae-blue mb-2">Email</p>
                  <a
                    href="mailto:info@raemarketingservices.com"
                    className="text-rae-gray-dark hover:text-rae-blue font-semibold transition-colors"
                  >
                    info@raemarketingservices.com
                  </a>
                </div>
              </div>

              <Button
                variant="outline"
                fullWidth
                onClick={() => window.open('https://wa.me/18094192390', '_blank')}
              >
                Escribir por WhatsApp
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
