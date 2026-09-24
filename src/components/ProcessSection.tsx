import React, { useState } from 'react';
import { Search, Compass, Palette, Wrench, TrendingUp, CheckCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const ProcessSection: React.FC = () => {
  const { config } = useSite();
  const sectionTexts = config.sectionTexts;
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'DESCUBRIMOS',
      headline: 'Conocemos tu negocio, tus objetivos y tus clientes.',
      detail: 'Iniciamos con una sesión de descubrimiento para entender a fondo qué vendes, a quién te diriges, qué obstáculos enfrentas y cuáles son las metas específicas de tu marca.',
      icon: Search,
      deliverable: 'Diagnóstico estratégico & mapa de ruta inicial',
    },
    {
      num: '02',
      title: 'PLANIFICAMOS',
      headline: 'Creamos la estrategia adecuada para alcanzar tus objetivos.',
      detail: 'Definimos los canales, la arquitectura web, los formatos de contenido o los flujos de automatización que maximizarán el impacto de tu inversión sin desperdicios.',
      icon: Compass,
      deliverable: 'Estrategia personalizada & plan de entregables',
    },
    {
      num: '03',
      title: 'CREAMOS',
      headline: 'Diseñamos y desarrollamos la solución.',
      detail: 'Construimos cada pieza con atención obsesiva al detalle: diseño UI/UX, desarrollo de código, piezas gráficas, copys persuasivos y configuraciones técnicas.',
      icon: Palette,
      deliverable: 'Prototipos, activos digitales y desarrollo funcional',
    },
    {
      num: '04',
      title: 'OPTIMIZAMOS',
      headline: 'Analizamos, mejoramos y ajustamos.',
      detail: 'Auditamos el rendimiento en situaciones reales: tiempos de carga, respuesta en dispositivos móviles, flujo de mensajes en WhatsApp y claridad en formularios.',
      icon: Wrench,
      deliverable: 'Auditoría de calidad & pruebas de usuario',
    },
    {
      num: '05',
      title: 'CRECEMOS',
      headline: 'Convertimos la estrategia en resultados.',
      detail: 'Ponemos en marcha la solución, capacitamos a tu equipo y analizamos métricas para seguir perfeccionando el sistema conforme tu negocio se expande.',
      icon: TrendingUp,
      deliverable: 'Lanzamiento oficial & acompañamiento continuo',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-slate-100 relative overflow-hidden" aria-label="Proceso de trabajo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-[11px] font-bold tracking-wider uppercase mb-3">
            <CheckCircle size={13} />
            <span>Metodología Paso a Paso</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight mb-4">
            {sectionTexts?.processTitle || "De una idea a una solución digital."}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {sectionTexts?.processSubtitle || "Un proceso estructurado, transparente y ágil diseñado para transformar requerimientos complejos en resultados comerciales claros."}
          </p>
        </div>

        {/* Desktop Interactive Steps Navigation */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative mb-12">
          
          {/* Continuous connector line */}
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-slate-200 -translate-y-6 -z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={step.num}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`relative z-10 flex flex-col items-center text-center p-4 rounded-2xl transition-all duration-300 ${
                  isCurrent 
                    ? 'bg-blue-50/80 shadow-sm border border-brand-blue/30 scale-105' 
                    : 'hover:bg-slate-50 opacity-80 hover:opacity-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold mb-3 shadow-xs transition-transform ${
                  isCurrent 
                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/30 scale-110' 
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}>
                  <Icon size={20} />
                </div>
                <span className="text-[10px] font-mono font-extrabold text-brand-blue tracking-wider uppercase">
                  Paso {step.num}
                </span>
                <span className="text-xs font-bold text-brand-navy mt-1">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Highlighted Step Card (Desktop) */}
        <div className="hidden lg:block bg-[#F2F4F8] rounded-3xl p-8 border border-slate-200 shadow-subtle max-w-4xl mx-auto">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-brand-blue text-white text-xs font-mono font-bold">
                  {steps[activeStep].num}
                </span>
                <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                  Etapa: {steps[activeStep].title}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-brand-navy mb-3">
                {steps[activeStep].headline}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {steps[activeStep].detail}
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-semibold bg-white text-brand-navy px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <CheckCircle size={14} className="text-brand-blue" />
                <span>Entregable: <strong>{steps[activeStep].deliverable}</strong></span>
              </div>
            </div>

            <div className="w-48 bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center justify-center shadow-xs">
              <span className="text-xs text-slate-400 font-semibold mb-1">Paso Actual</span>
              <span className="text-3xl font-extrabold text-brand-blue font-mono mb-2">
                {activeStep + 1} / 5
              </span>
              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all ${
                      i === activeStep ? 'w-6 bg-brand-blue' : 'w-2 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="lg:hidden space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-[#F2F4F8] p-6 rounded-2xl border border-slate-200/80 shadow-xs relative pl-16"
              >
                {/* Number Badge */}
                <div className="absolute left-4 top-6 w-9 h-9 rounded-xl bg-brand-blue text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  <Icon size={16} />
                </div>
                <div className="text-[10px] font-mono font-bold text-brand-blue tracking-wider uppercase mb-1">
                  Paso {step.num} • {step.title}
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2">
                  {step.headline}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {step.detail}
                </p>
                <div className="text-[11px] font-medium text-slate-500 bg-white px-2.5 py-1 rounded-lg border border-slate-200 inline-block">
                  ✓ {step.deliverable}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
