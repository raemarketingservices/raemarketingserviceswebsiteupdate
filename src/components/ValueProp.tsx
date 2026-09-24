import React from 'react';
import { Compass, Lightbulb, Cpu, CheckCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const ValueProp: React.FC = () => {
  const { config } = useSite();
  const sectionTexts = config.sectionTexts;
  const pillars = [
    {
      title: 'ESTRATEGIA',
      subtitle: 'Enfoque y Propósito',
      description: 'Cada acción, diseño y campaña responde a un plan estructurado para atraer a tu cliente ideal y maximizar el retorno de inversión.',
      icon: Compass,
      color: 'text-brand-blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      title: 'CREATIVIDAD',
      subtitle: 'Diferenciación Visual',
      description: 'Construimos una identidad estética y narrativa que cautiva, eleva el valor percibido y hace que tu marca sea recordada.',
      icon: Lightbulb,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
    },
    {
      title: 'TECNOLOGÍA',
      subtitle: 'Eficiencia y Escala',
      description: 'Implementamos plataformas modernas, automatizaciones de procesos y herramientas de IA que hacen tu negocio más ágil y escalable.',
      icon: Cpu,
      color: 'text-brand-light',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-100',
    },
  ];

  const marqueeItems = [
    'WEB DESIGN',
    'MARKETING DIGITAL',
    'SOCIAL MEDIA',
    'AUTOMATION',
    'GRAPHIC DESIGN',
    'ESTRATEGIA DE CRECIMIENTO',
    'EXPERIENCIA DE USUARIO',
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-100 relative overflow-hidden" aria-label="Propuesta de valor">
      
      {/* Subtle Marquee Ribbon */}
      <div className="w-full overflow-hidden py-3 bg-slate-50/80 border-b border-slate-100 mb-16 select-none" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 mx-4">
              <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/30" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-[11px] font-bold tracking-wider uppercase mb-3">
            <CheckCircle size={13} />
            <span>Visión Holística</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-4">
            {sectionTexts?.valuePropTitle ? (
              <span>{sectionTexts.valuePropTitle}</span>
            ) : (
              <>
                NO SOLO MARKETING.<br />
                <span className="text-gradient">CREAMOS EXPERIENCIAS DIGITALES.</span>
              </>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {sectionTexts?.valuePropSubtitle || "Desde tu página web hasta tus redes sociales y automatizaciones, conectamos cada parte de tu presencia digital para construir una marca más sólida, eficiente y rentable."}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative bg-[#F2F4F8]/70 hover:bg-white p-8 rounded-3xl border border-slate-200/80 hover:border-brand-blue/30 shadow-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl ${pillar.bgColor} ${pillar.borderColor} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className={pillar.color} />
                </div>
                <div className="text-[11px] font-extrabold tracking-widest uppercase text-brand-blue mb-1">
                  {pillar.title}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-3">
                  {pillar.subtitle}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
