import React from 'react';
import { Eye, ShieldCheck, HeartHandshake, Zap, Target, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const ResultsSection: React.FC = () => {
  const { config } = useSite();
  const sectionTexts = config.sectionTexts;
  const benefits = [
    {
      concept: 'MÁS VISIBILIDAD',
      description: 'Lleva tu marca al frente de tus clientes ideales en los canales donde pasan su tiempo a diario.',
      icon: Eye,
      color: 'text-brand-blue',
      bgColor: 'bg-blue-50',
      borderAccent: 'border-blue-200',
    },
    {
      concept: 'MÁS PROFESIONALISMO',
      description: 'Inspira confianza desde el primer segundo con una identidad cuidada, moderna y coherente en cada soporte.',
      icon: ShieldCheck,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderAccent: 'border-indigo-200',
    },
    {
      concept: 'MEJOR EXPERIENCIA',
      description: 'Navegación intuitiva, carga instantánea y procesos de compra o contacto sin fricción para tus usuarios.',
      icon: HeartHandshake,
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      borderAccent: 'border-rose-200',
    },
    {
      concept: 'MÁS EFICIENCIA',
      description: 'Automatizaciones que responden al instante en WhatsApp y organizan datos para que tu equipo ahorre horas valiosas.',
      icon: Zap,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      borderAccent: 'border-amber-200',
    },
    {
      concept: 'MÁS OPORTUNIDADES',
      description: 'Páginas web y campañas optimizadas para capturar prospectos cualificados y convertirlos en ventas sostenibles.',
      icon: Target,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
      borderAccent: 'border-emerald-200',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-slate-100 relative overflow-hidden" aria-label="Beneficios e impacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-brand-blue text-[11px] font-bold tracking-wider uppercase mb-3">
            <Sparkles size={13} />
            <span>Beneficios Tangibles</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight mb-4">
            {sectionTexts?.resultsTitle || "Diseñamos para generar impacto."}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            {sectionTexts?.resultsSubtitle || "Cada solución está concebida para fortalecer los pilares que impulsan el crecimiento y la sostenibilidad de tu negocio."}
          </p>
        </div>

        {/* 5 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            // The 5th item spans 2 cols on lg if desired or sits neatly in grid
            const isLast = idx === 4;
            return (
              <div
                key={benefit.concept}
                className={`bg-[#F2F4F8]/70 hover:bg-white p-8 rounded-3xl border border-slate-200/80 hover:border-brand-blue/30 shadow-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group ${
                  isLast ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl ${benefit.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className={benefit.color} />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-brand-navy mb-2 tracking-wide group-hover:text-brand-blue transition-colors">
                    {benefit.concept}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-slate-400 group-hover:text-brand-blue transition-colors">
                  <span>Enfoque RAE</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
