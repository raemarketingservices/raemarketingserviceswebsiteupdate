import React from 'react';
import { 
  Globe, 
  Megaphone, 
  Cpu, 
  Palette, 
  ArrowRight, 
  Check, 
  Layers, 
  Zap, 
  Sparkles
} from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import { servicesData } from '../data/servicesData';
import { useSite } from '../context/SiteContext';

interface BentoServicesProps {
  onSelectService: (slug: string) => void;
}

export const BentoServices: React.FC<BentoServicesProps> = ({ onSelectService }) => {
  const { config } = useSite();
  const sectionTexts = config.sectionTexts;

  return (
    <section id="servicios" className="py-20 lg:py-28 bg-[#F2F4F8] relative overflow-hidden" aria-label="Nuestros servicios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 text-brand-blue text-[11px] font-bold tracking-wider uppercase mb-3">
            <Layers size={13} />
            <span>Nuestras Soluciones</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight mb-4">
            {sectionTexts?.servicesTitle || "Todo lo que tu negocio necesita para crecer digitalmente."}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            {sectionTexts?.servicesSubtitle || "Soluciones estratégicas diseñadas para construir, mejorar y escalar tu presencia digital con coherencia y resultados medibles."}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {/* 01. DISEÑO DE PÁGINAS WEB (Large Bento Card: Col 7) */}
          <div 
            onClick={() => onSelectService('diseno-web')}
            className="md:col-span-12 lg:col-span-7 group bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 hover:border-brand-blue shadow-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
          >
            {/* Top row */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                    <Globe size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-blue tracking-wider">01</span>
                    <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Servicio Principal</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-50 text-brand-blue px-3 py-1 rounded-full border border-blue-100">
                  <Sparkles size={12} />
                  <span>Alta Conversión</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors">
                DISEÑO DE PÁGINAS WEB
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                Creamos páginas web modernas, rápidas, responsivas y enfocadas en convertir visitantes en clientes reales.
              </p>

              {/* Visual preview snippet inside card */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 shadow-inner">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                  <span className="text-[10px] text-slate-400 font-mono ml-2">experiencia web optimizada</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {servicesData[0].features.map((feat) => (
                    <span 
                      key={feat}
                      className="inline-flex items-center gap-1 text-xs font-semibold bg-white text-brand-navy px-2.5 py-1 rounded-lg border border-slate-200/60 shadow-xs"
                    >
                      <Check size={12} className="text-brand-blue" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Arquitectura UI/UX + Performance</span>
              <div className="inline-flex items-center gap-2 text-brand-blue font-extrabold text-sm group-hover:translate-x-1 transition-transform">
                <span>Explorar servicio</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* 02. MARKETING DIGITAL (Medium Card: Col 5) */}
          <div 
            onClick={() => onSelectService('marketing-digital')}
            className="md:col-span-12 lg:col-span-5 group bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 hover:border-brand-blue shadow-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-brand-light flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-brand-light group-hover:text-white transition-all duration-300">
                    <Megaphone size={24} />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-light tracking-wider">02</span>
                    <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Estrategia & Alcance</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors">
                MARKETING DIGITAL
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Creamos estrategias digitales diseñadas para aumentar la visibilidad de tu marca y conectar con las personas correctas.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {servicesData[1].features.map((feat) => (
                  <span 
                    key={feat}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold bg-slate-100/80 text-brand-grayText px-2.5 py-1 rounded-lg border border-slate-200/60"
                  >
                    <Check size={11} className="text-brand-light" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Campañas & Retorno</span>
              <div className="inline-flex items-center gap-2 text-brand-blue font-extrabold text-sm group-hover:translate-x-1 transition-transform">
                <span>Explorar servicio</span>
                <ArrowRight size={16} />
              </div>
            </div>
          </div>

          {/* 03. MANEJO DE REDES SOCIALES (Card Vertical/Media: Col 4) */}
          <div 
            onClick={() => onSelectService('redes-sociales')}
            className="md:col-span-6 lg:col-span-4 group bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 hover:border-brand-blue shadow-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-brand-navy flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-brand-navy group-hover:text-white transition-all duration-300">
                    <InstagramIcon size={22} />
                  </div>
                  <span className="text-xs font-mono font-bold text-brand-navy">03</span>
                </div>
                <span className="text-[10px] font-bold uppercase text-brand-navy bg-slate-100 px-2 py-0.5 rounded-full">
                  Social Media
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy mb-2.5 group-hover:text-brand-blue transition-colors">
                MANEJO DE REDES SOCIALES
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                Construimos una presencia digital consistente mediante contenido estratégico, creativo y diseñado para conectar con tu audiencia.
              </p>

              <div className="space-y-1.5 mb-6">
                {servicesData[2].features.slice(0, 4).map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check size={12} className="text-brand-blue shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Reels & Contenido</span>
              <div className="inline-flex items-center gap-1.5 text-brand-blue font-extrabold text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
                <span>Explorar servicio</span>
                <ArrowRight size={15} />
              </div>
            </div>
          </div>

          {/* 04. AUTOMATIZACIÓN PARA NEGOCIOS (Tech Card: Col 4) */}
          <div 
            onClick={() => onSelectService('automatizacion')}
            className="md:col-span-6 lg:col-span-4 group bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 hover:border-brand-blue shadow-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <Cpu size={22} />
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-600">04</span>
                </div>
                <span className="text-[10px] font-bold uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                  Tecnología & IA
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy mb-2.5 group-hover:text-brand-blue transition-colors">
                AUTOMATIZACIÓN PARA NEGOCIOS
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                Automatizamos procesos repetitivos para ayudarte a ahorrar tiempo, mejorar la atención al cliente y hacer tu negocio más eficiente.
              </p>

              <div className="space-y-1.5 mb-6">
                {servicesData[3].features.slice(0, 4).map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-slate-700">
                    <Zap size={12} className="text-indigo-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">WhatsApp & CRM</span>
              <div className="inline-flex items-center gap-1.5 text-brand-blue font-extrabold text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
                <span>Explorar servicio</span>
                <ArrowRight size={15} />
              </div>
            </div>
          </div>

          {/* 05. DISEÑO GRÁFICO (Visual Card: Col 4) */}
          <div 
            onClick={() => onSelectService('diseno-grafico')}
            className="md:col-span-12 lg:col-span-4 group bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 hover:border-brand-blue shadow-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                    <Palette size={22} />
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-600">05</span>
                </div>
                <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                  Branding & Arte
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-brand-navy mb-2.5 group-hover:text-brand-blue transition-colors">
                DISEÑO GRÁFICO
              </h3>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                Creamos piezas visuales que fortalecen la identidad de tu negocio y comunican profesionalismo en cada soporte.
              </p>

              <div className="space-y-1.5 mb-6">
                {servicesData[4].features.slice(0, 4).map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check size={12} className="text-amber-500 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Identidad Visual</span>
              <div className="inline-flex items-center gap-1.5 text-brand-blue font-extrabold text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
                <span>Explorar servicio</span>
                <ArrowRight size={15} />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
