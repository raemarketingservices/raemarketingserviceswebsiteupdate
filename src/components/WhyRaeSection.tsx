import React from 'react';
import { Target, Sliders, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const WhyRaeSection: React.FC = () => {
  const { config } = useSite();
  const sectionTexts = config.sectionTexts;
  const pillars = [
    {
      num: '01',
      title: 'ESTRATEGIA ANTES QUE DISEÑO',
      description: 'Cada decisión visual debe tener un propósito claro. No diseñamos por capricho; estructuramos tu presencia para comunicar tu valor y resolver objeciones.',
      icon: Target,
      accent: 'text-brand-light',
    },
    {
      num: '02',
      title: 'SOLUCIONES PERSONALIZADAS',
      description: 'Cada negocio es diferente. Las soluciones también deben serlo. Construimos estrategias a la medida de tu sector, tu audiencia y tu capacidad de crecimiento.',
      icon: Sliders,
      accent: 'text-blue-300',
    },
    {
      num: '03',
      title: 'TECNOLOGÍA QUE SIMPLIFICA',
      description: 'Utilizamos herramientas modernas para hacer procesos más eficientes. Automatizamos lo repetitivo para que tu tiempo se concentre en atender y facturar.',
      icon: Zap,
      accent: 'text-amber-300',
    },
    {
      num: '04',
      title: 'ENFOQUE EN RESULTADOS',
      description: 'Diseñamos pensando en crecimiento, conversión y experiencia del usuario. El éxito de nuestro trabajo se mide en el impacto real que genera en tu negocio.',
      icon: TrendingUp,
      accent: 'text-emerald-300',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#0F2D6B] text-white relative overflow-hidden subtle-grid-dark" aria-label="Por qué elegir RAE">
      
      {/* Background glow orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-brand-light/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-brand-light text-[11px] font-bold tracking-wider uppercase mb-3 border border-white/15">
            <Sparkles size={13} />
            <span>Nuestros Diferenciadores</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            {sectionTexts?.whyRaeTitle || "¿Por qué trabajar con RAE?"}
          </h2>

          <p className="text-base sm:text-lg text-blue-100 font-medium max-w-2xl mx-auto leading-relaxed">
            {sectionTexts?.whyRaeSubtitle || (
              <>
                No buscamos simplemente que tu negocio se vea bien.<br className="hidden sm:inline" />
                <span className="text-brand-light font-bold">Queremos que funcione mejor.</span>
              </>
            )}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.num}
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-light/40 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 backdrop-blur-xs flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-extrabold text-brand-light bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                      {pillar.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={20} className={pillar.accent} />
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-3 tracking-wide">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-bold text-brand-light">
                  <span>Compromiso RAE</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 text-center max-w-3xl mx-auto backdrop-blur-md">
          <p className="font-script text-2xl sm:text-3xl text-blue-200 mb-1">
            "Ideas que inspiran, estrategia que convierte, resultados que perduran."
          </p>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-light">
            RAE Marketing Services
          </span>
        </div>

      </div>
    </section>
  );
};
