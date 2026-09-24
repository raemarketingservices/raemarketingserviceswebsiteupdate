import React from 'react';
import { ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface CTASectionProps {
  onContactClick: () => void;
  onServicesClick: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ 
  onContactClick, 
  onServicesClick 
}) => {
  const { config } = useSite();
  const sectionTexts = config.sectionTexts;

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" aria-label="Llamada a la acción">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner with gradient: #0F2D6B → #2D4AFF */}
        <div className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#0F2D6B] via-[#143885] to-[#2D4AFF] p-8 sm:p-14 lg:p-16 text-white shadow-2xl overflow-hidden text-center">
          
          {/* Subtle Abstract Tech Accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-blue/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 subtle-grid-dark opacity-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold tracking-wider uppercase mb-6 border border-white/15 backdrop-blur-sm">
              <Sparkles size={14} className="text-brand-light" />
              <span>Da el Siguiente Paso</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
              {sectionTexts?.ctaTitle || "Tu próxima gran idea merece una estrategia."}
            </h2>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed mb-10 max-w-2xl mx-auto">
              {sectionTexts?.ctaSubtitle || "Cuéntanos sobre tu negocio y descubre cómo podemos ayudarte a llevarlo al siguiente nivel con diseño de alta conversión, campañas efectivas y procesos automatizados."}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onContactClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-brand-navy hover:text-brand-blue hover:bg-slate-50 font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-xl shadow-black/20 transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
              >
                <span>{sectionTexts?.ctaButtonText || "HABLEMOS DE TU PROYECTO"}</span>
                <ArrowRight size={18} className="text-brand-blue" />
              </button>

              <button
                type="button"
                onClick={onServicesClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-7 py-4 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-200"
              >
                <span>Ver nuestros servicios</span>
              </button>
            </div>

            {/* WhatsApp Direct Option */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-blue-200">
              <MessageCircle size={15} className="text-emerald-400" />
              <span>O contáctanos directamente por WhatsApp:</span>
              <a 
                href="https://wa.me/18094192390?text=Hola%20RAE%20Marketing%20Services,%20quisiera%20conversar%20sobre%20mi%20proyecto."
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white hover:underline"
              >
                809 419 2390
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
