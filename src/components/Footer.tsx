import React from 'react';
import { ArrowUpRight, MessageCircle, MapPin } from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 border-t border-blue-900/60 relative overflow-hidden" aria-label="Pie de página">
      
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Brand Info (Col 4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <img 
                src="/rae-logo.png" 
                alt="RAE Marketing Services" 
                className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-light/30 bg-white" 
              />
              <div>
                <span className="font-extrabold text-lg text-white block leading-tight">
                  RAE Marketing Services
                </span>
                <span className="text-xs text-brand-light font-medium">
                  Ideas | Estrategia | Resultados
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed max-w-sm">
              Combinamos estrategia, diseño y tecnología para ayudar a negocios a crecer, destacar y alcanzar sus objetivos con soluciones digitales de alto impacto.
            </p>

            <div className="pt-2">
              <span className="font-script text-2xl text-blue-200 block">
                Tu crecimiento, nuestra pasión.
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com/raemarketingservices"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-brand-blue text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="Instagram @raemarketingservices"
              >
                <InstagramIcon size={18} />
              </a>

              <a
                href="https://wa.me/18094192390?text=Hola%20RAE%20Marketing%20Services"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-xs"
                aria-label="WhatsApp 809 419 2390"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links (Col 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-light mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a 
                  href="/" 
                  onClick={(e) => handleLink(e, '/')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  href="/#nosotros" 
                  onClick={(e) => handleLink(e, '/#nosotros')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a 
                  href="/#servicios" 
                  onClick={(e) => handleLink(e, '/#servicios')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a 
                  href="/#portafolio" 
                  onClick={(e) => handleLink(e, '/#portafolio')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Portafolio
                </a>
              </li>
              <li>
                <a 
                  href="/#contacto" 
                  onClick={(e) => handleLink(e, '/#contacto')}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Individual Service Pages Links (Col 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-light mb-4">
              Servicios Especializados
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a 
                  href="/diseno-web" 
                  onClick={(e) => handleLink(e, '/diseno-web')}
                  className="text-slate-300 hover:text-brand-light transition-colors flex items-center justify-between"
                >
                  <span>Diseño de Páginas Web</span>
                  <ArrowUpRight size={13} className="opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="/marketing-digital" 
                  onClick={(e) => handleLink(e, '/marketing-digital')}
                  className="text-slate-300 hover:text-brand-light transition-colors flex items-center justify-between"
                >
                  <span>Marketing Digital</span>
                  <ArrowUpRight size={13} className="opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="/redes-sociales" 
                  onClick={(e) => handleLink(e, '/redes-sociales')}
                  className="text-slate-300 hover:text-brand-light transition-colors flex items-center justify-between"
                >
                  <span>Manejo de Redes Sociales</span>
                  <ArrowUpRight size={13} className="opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="/automatizacion" 
                  onClick={(e) => handleLink(e, '/automatizacion')}
                  className="text-slate-300 hover:text-brand-light transition-colors flex items-center justify-between"
                >
                  <span>Automatización para Negocios</span>
                  <ArrowUpRight size={13} className="opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="/diseno-grafico" 
                  onClick={(e) => handleLink(e, '/diseno-grafico')}
                  className="text-slate-300 hover:text-brand-light transition-colors flex items-center justify-between"
                >
                  <span>Diseño Gráfico y Branding</span>
                  <ArrowUpRight size={13} className="opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct Column (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-light mb-4">
              Atención Directa
            </h4>

            <div className="text-xs text-blue-100/80 space-y-2">
              <p className="flex items-center gap-2">
                <MessageCircle size={14} className="text-emerald-400" />
                <span>WhatsApp: 809 419 2390</span>
              </p>
              <p className="flex items-center gap-2">
                <InstagramIcon size={14} className="text-rose-400" />
                <span>Instagram: @raemarketingservices</span>
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-light" />
                <span>República Dominicana & Remoto Global</span>
              </p>
            </div>

            <div className="pt-2">
              <a
                href="#contacto"
                onClick={(e) => handleLink(e, '/#contacto')}
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow-md transition-colors"
              >
                <span>Hablemos</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} RAE Marketing Services. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>raemarketingservices.com</span>
            <span>•</span>
            <span className="font-script text-base text-blue-200">Hagamos Grandes Cosas Juntos</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
