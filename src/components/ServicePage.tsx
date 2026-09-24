import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle, 
} from 'lucide-react';
import type { ServiceItem } from '../types';
import { servicesData } from '../data/servicesData';
import { portfolioData } from '../data/portfolioData';
import { ContactSection } from './ContactSection';

interface ServicePageProps {
  service: ServiceItem;
  onNavigateHome: () => void;
  onSelectOtherService: (slug: string) => void;
  onSuccessNotification: (msg: string) => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({
  service,
  onNavigateHome,
  onSelectOtherService,
  onSuccessNotification,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filter related projects
  const categoryMap: Record<string, string> = {
    'diseno-web': 'Web Design',
    'marketing-digital': 'Marketing',
    'redes-sociales': 'Social Media',
    'automatizacion': 'Automation',
    'diseno-grafico': 'Branding',
  };

  const relatedCategory = categoryMap[service.slug] || 'Web Design';
  const relatedProjects = portfolioData.filter((p) => p.category === relatedCategory).slice(0, 2);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <article className="pt-24 pb-16 min-h-screen bg-[#F2F4F8]" aria-labelledby="service-main-heading">
      
      {/* Breadcrumb Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button 
            type="button" 
            onClick={onNavigateHome}
            className="hover:text-brand-blue flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Inicio</span>
          </button>
          <span>/</span>
          <span className="text-slate-400">Servicios</span>
          <span>/</span>
          <span className="text-brand-navy font-bold">{service.title}</span>
        </nav>
      </div>

      {/* 1. HERO SECTION OF SERVICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/90 shadow-premium relative overflow-hidden">
          
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand-blue text-xs font-mono font-bold uppercase tracking-wider mb-6 border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-brand-blue" />
              <span>Servicio {service.orderNumber} • {service.shortTitle}</span>
            </div>

            <h1 id="service-main-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight mb-4 leading-tight">
              {service.title}
            </h1>

            <p className="text-base sm:text-lg text-brand-blue font-semibold mb-4">
              {service.tagline}
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
              {service.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contacto-servicio"
                className="inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-blue-600 text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-md shadow-brand-blue/20 transition-all hover:-translate-y-0.5"
              >
                <span>Solicitar cotización personalizada</span>
                <ArrowRight size={16} />
              </a>

              <a
                href="https://wa.me/18094192390?text=Hola%20RAE%20Marketing%20Services,%20me%20gustar%C3%ADa%20cotizar%20el%20servicio%20de%20"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-xs transition-colors"
              >
                <MessageCircle size={17} />
                <span>Hablar por WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 2 & 3. PROBLEM & SOLUTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* El Problema Habitual */}
          <div className="bg-white rounded-3xl p-8 border border-rose-100 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
                <AlertCircle size={26} />
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-500 block mb-1">
                El Obstáculo
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy mb-4">
                {service.problemTitle}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {service.problemDescription}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-rose-500">
              Desafío común en empresas sin estrategia definida
            </div>
          </div>

          {/* Nuestra Solución Estratégica */}
          <div className="bg-brand-navy text-white rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue/20 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-brand-light flex items-center justify-center mb-6">
                <ShieldCheck size={26} />
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-brand-light block mb-1">
                El Método RAE
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-4">
                {service.solutionTitle}
              </h2>
              <p className="text-sm text-blue-100/90 leading-relaxed">
                {service.solutionDescription}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs font-semibold text-brand-light relative z-10">
              Estrategia + Creatividad + Tecnología aplicada
            </div>
          </div>

        </div>
      </section>

      {/* 4. BENEFICIOS CLAVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            Ventajas Directas
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1">
            Beneficios para tu negocio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.benefits.map((b, i) => (
            <div key={b.title} className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-subtle">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-sm mb-4">
                0{i + 1}
              </div>
              <h3 className="text-base font-extrabold text-brand-navy mb-2">
                {b.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SERVICIOS INCLUIDOS / ENTREGABLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-subtle">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              Alcance del Servicio
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1 mb-2">
              ¿Qué incluye este servicio?
            </h2>
            <p className="text-sm text-slate-600">
              Entregables claros, especificaciones técnicas y estándares profesionales desde el inicio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.deliverables.map((item, idx) => (
              <div 
                key={item.title}
                className="p-5 rounded-2xl bg-[#F2F4F8]/70 border border-slate-200/70 hover:bg-white hover:border-brand-blue/30 transition-colors"
              >
                <div className="flex items-center gap-2 text-brand-blue mb-2">
                  <CheckCircle2 size={16} />
                  <span className="text-[11px] font-mono font-bold text-slate-400">0{idx + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-brand-navy mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROCESO ESPECÍFICO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            Roadmap
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1">
            Proceso de trabajo para {service.shortTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {service.process.map((step) => (
            <div 
              key={step.step}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <span className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue text-xs font-mono font-extrabold flex items-center justify-center mb-3">
                  {step.step}
                </span>
                <h3 className="text-sm font-bold text-brand-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. PORTFOLIO RELACIONADO */}
      {relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                Casos de Estudio
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1">
                Proyectos relacionados
              </h2>
            </div>
            <button
              type="button"
              onClick={onNavigateHome}
              className="text-xs font-bold text-brand-blue hover:underline flex items-center gap-1"
            >
              <span>Ver portafolio completo</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((proj) => (
              <div
                key={proj.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-subtle"
              >
                <div className={`h-40 rounded-2xl ${proj.imageBg} p-5 flex flex-col justify-between text-white mb-4`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/40 px-2.5 py-1 rounded-full w-fit">
                    {proj.category}
                  </span>
                  <div>
                    <span className="text-[10px] text-blue-200 block">{proj.client}</span>
                    <h3 className="text-lg font-extrabold">{proj.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {proj.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.servicesProvided.map((s) => (
                    <span key={s} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. PREGUNTAS FRECUENTES (FAQ) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
            Resolvemos tus Dudas
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mt-1">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-brand-navy hover:text-brand-blue transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-brand-blue shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. SWITCHER TO EXPLORE OTHER SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-slate-100/80 rounded-3xl p-6 sm:p-8 border border-slate-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 text-center">
            Explora otros servicios de RAE Marketing Services:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {servicesData.map((s) => {
              const isCurrent = s.id === service.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  disabled={isCurrent}
                  onClick={() => onSelectOtherService(s.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-brand-blue text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-brand-blue hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {s.orderNumber}. {s.shortTitle}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. CONTACT FORM PRE-SELECTING THIS SERVICE */}
      <div id="contacto-servicio">
        <ContactSection 
          initialService={service.title}
          onSuccessNotification={onSuccessNotification}
        />
      </div>

    </article>
  );
};
