import React from 'react';
import { ArrowRight, Target, Eye, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface AboutSectionProps {
  onProcessClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onProcessClick }) => {
  const { config } = useSite();
  const sectionTexts = config.sectionTexts;
  const values = [
    'Creatividad',
    'Compromiso',
    'Innovación',
    'Transparencia',
    'Resultados',
    'Trabajo en equipo'
  ];

  return (
    <section id="nosotros" className="py-20 lg:py-28 relative overflow-hidden" aria-label="Sobre RAE Marketing Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetric Visual Showcase */}
          <div className="lg:col-span-5 order-2 lg:order-1 relative">
            
            {/* Visual Backing glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-brand-blue/10 via-brand-light/10 to-transparent rounded-3xl blur-2xl -z-10" />

            <div className="bg-brand-navy rounded-3xl p-7 sm:p-9 text-white shadow-2xl relative overflow-hidden">
              
              {/* Abstract decorative accent */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-blue/30 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                <img 
                  src="/rae-logo.png" 
                  alt="RAE Logo Badge" 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-brand-light/40" 
                />
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-light font-bold block">
                    ADN de Marca
                  </span>
                  <span className="font-extrabold text-base text-white">
                    RAE Marketing Services
                  </span>
                </div>
              </div>

              {/* Misión Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-4 border border-white/15">
                <div className="flex items-center gap-2 text-brand-light font-bold text-xs uppercase tracking-wider mb-1.5">
                  <Target size={14} />
                  <span>Nuestra Misión</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Impulsar el crecimiento de negocios a través de soluciones de marketing digital innovadoras, efectivas y personalizadas.
                </p>
              </div>

              {/* Visión Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 mb-5 border border-white/15">
                <div className="flex items-center gap-2 text-brand-light font-bold text-xs uppercase tracking-wider mb-1.5">
                  <Eye size={14} />
                  <span>Nuestra Visión</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Ser una marca de referencia en soluciones digitales en Latinoamérica, reconocida por la calidad, creatividad y resultados de nuestro trabajo.
                </p>
              </div>

              {/* Valores Tags */}
              <div>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold mb-2.5">
                  <Award size={14} className="text-amber-400" />
                  <span>Nuestros Valores Fundamentales:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {values.map((val) => (
                    <span 
                      key={val}
                      className="text-[11px] font-semibold bg-white/15 text-white px-2.5 py-1 rounded-full border border-white/10"
                    >
                      {val}
                    </span>
                  ))}
                </div>
              </div>

              {/* Signature Script accent at bottom */}
              <div className="mt-6 pt-4 border-t border-white/10 text-right">
                <span className="font-script text-xl text-blue-200 block">
                  Tu crecimiento, nuestra pasión.
                </span>
              </div>

            </div>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col items-start text-left">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-[11px] font-bold tracking-wider uppercase mb-4">
              <Sparkles size={13} />
              <span>Conoce a RAE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-5 leading-tight">
              {sectionTexts?.aboutTitle || "Estrategia que convierte ideas en crecimiento."}
            </h2>
            {sectionTexts?.aboutSubtitle && (
              <p className="text-sm sm:text-base text-brand-blue font-semibold mb-4 leading-relaxed">
                {sectionTexts.aboutSubtitle}
              </p>
            )}

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                <strong className="text-brand-navy font-bold">RAE Marketing Services</strong> nace con una misión clara: ayudar a negocios a aprovechar el poder de las herramientas digitales para crecer, destacar y conectar con sus clientes de manera auténtica y rentable.
              </p>
              <p>
                Combinamos creatividad, estrategia y tecnología para desarrollar soluciones adaptadas a las necesidades reales de cada negocio. No creemos en plantillas genéricas ni en fórmulas mágicas de un solo uso.
              </p>
              <p className="bg-white p-4 rounded-2xl border-l-4 border-brand-blue shadow-xs text-brand-navy font-medium">
                Cada proyecto comienza entendiendo tu marca, tus objetivos comerciales y las expectativas reales de tus clientes para construir una solución que funcione hoy y escale mañana.
              </p>
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-xs">
                <CheckCircle2 size={18} className="text-brand-blue mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-brand-navy">
                  Soluciones digitales a la medida de tu presupuesto
                </span>
              </div>
              <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-xs">
                <CheckCircle2 size={18} className="text-brand-blue mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-brand-navy">
                  Comunicación transparente y acompañamiento continuo
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onProcessClick}
              className="inline-flex items-center gap-2.5 text-brand-blue hover:text-blue-700 font-extrabold text-sm sm:text-base group"
            >
              <span>Conoce nuestra forma de trabajar</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
