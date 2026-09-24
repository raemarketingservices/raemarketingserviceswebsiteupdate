'use client'

import Link from 'next/link'
import Button from './Button'

const footerLinks = {
  main: [
    { label: 'Inicio', href: '/' },
    { label: 'Nosotros', href: '/#about' },
    { label: 'Servicios', href: '/#services' },
    { label: 'Portafolio', href: '/#portfolio' },
    { label: 'Contacto', href: '/#contact' },
  ],
  services: [
    { label: 'Diseño de páginas web', href: '/diseno-web' },
    { label: 'Marketing Digital', href: '/marketing-digital' },
    { label: 'Manejo de redes sociales', href: '/redes-sociales' },
    { label: 'Automatización para negocios', href: '/automatizacion' },
    { label: 'Diseño gráfico', href: '/diseno-grafico' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-rae-blue-dark text-white">
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-rae-blue-dark via-rae-blue to-rae-blue-light py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Tu próxima gran idea merece una estrategia.</h2>
          <p className="text-lg opacity-90">
            Cuéntanos sobre tu negocio y descubre cómo podemos ayudarte a llevarlo al siguiente nivel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              HABLEMOS DE TU PROYECTO →
            </Button>
            <Button variant="outline" size="lg">
              Ver nuestros servicios
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Logo & Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-rae-blue font-bold">RAE</span>
                </div>
                <span className="font-bold text-lg">RAE</span>
              </div>
              <p className="text-sm opacity-80">Ideas | Estrategia | Resultados</p>
            </div>

            {/* Links Principales */}
            <div>
              <h3 className="font-bold mb-4">Navegación</h3>
              <ul className="space-y-2">
                {footerLinks.main.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Servicios */}
            <div>
              <h3 className="font-bold mb-4">Servicios</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div className="space-y-4">
              <h3 className="font-bold">Contacto</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="opacity-70 mb-1">Instagram</p>
                  <a href="https://instagram.com/raemarketingservices" className="hover:text-rae-blue-light transition-colors">
                    @raemarketingservices
                  </a>
                </div>
                <div>
                  <p className="opacity-70 mb-1">WhatsApp</p>
                  <a href="tel:+18094192390" className="hover:text-rae-blue-light transition-colors">
                    +1 (809) 419-2390
                  </a>
                </div>
                <div>
                  <p className="opacity-70 mb-1">Email</p>
                  <a href="mailto:info@raemarketingservices.com" className="hover:text-rae-blue-light transition-colors">
                    info@raemarketingservices.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm opacity-70">
                © {new Date().getFullYear()} RAE Marketing Services. Todos los derechos reservados.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  contactSection?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Hablemos →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
