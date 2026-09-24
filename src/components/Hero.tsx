import React, { useState } from 'react';
import { 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  ShieldCheck,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface HeroProps {
  onExploreServices: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreServices, onContactClick }) => {
  const { config } = useSite();
  const { hero } = config;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden subtle-grid"
      aria-label="Introducción RAE Marketing Services"
    >
      {/* Decorative gradient glow orbs in background */}
      <div 
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-brand-blue/15 via-brand-light/20 to-transparent blur-3xl rounded-full -z-10"
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute top-1/3 -right-24 w-[400px] h-[400px] bg-brand-light/10 blur-3xl rounded-full -z-10"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Calls to Action */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* Slogan Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-brand-blue/20 shadow-xs mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue"></span>
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-brand-navy">
                {hero.badgeText || "Ideas • Estrategia • Resultados"}
              </span>
            </div>

            {/* Main H1 Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-brand-navy leading-[1.12] tracking-tight mb-5 whitespace-pre-line">
              {hero.headlineMain || "SOLUCIONES DIGITALES\nPARA NEGOCIOS"}<br />
              <span className="text-gradient">{hero.headlineGradient || "QUE QUIEREN MÁS."}</span>
            </h1>

            {/* Subheadline & Description */}
            <p className="text-base sm:text-lg font-semibold text-brand-navy/90 mb-3 max-w-xl">
              {hero.subheadline || "Transformamos ideas en experiencias digitales que ayudan a tu negocio a crecer."}
            </p>
            <p className="text-sm sm:text-base text-slate-600 mb-8 leading-relaxed max-w-xl">
              {hero.description || "Estrategia, diseño y tecnología trabajando juntos para crear una presencia digital sólida, profesional y orientada estrictamente a generar impacto comercial."}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-8">
              <button
                type="button"
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2.5 bg-brand-blue hover:bg-blue-600 text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-lg shadow-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/35 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{hero.ctaPrimary || "Impulsa tu negocio"}</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-brand-navy hover:text-brand-blue border border-slate-200/90 font-bold text-sm sm:text-base px-6 py-3.5 rounded-full shadow-xs hover:border-brand-blue/30 transition-all duration-200"
              >
                <span>{hero.ctaSecondary || "Explorar servicios"}</span>
              </button>
            </div>

            {/* Emotional Support Phrase & Trust badges */}
            <div className="pt-4 border-t border-slate-200/70 w-full flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 text-brand-blue font-script text-xl font-bold">
                <span>Tu crecimiento, nuestra pasión.</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <ShieldCheck size={16} className="text-brand-blue" />
                <span>Enfoque 100% en conversión</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase (Mockups / Image / Combined) */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-4 lg:pt-0">
            
            {/* Radial glow background */}
            <div 
              className="absolute w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-tr from-brand-blue/20 via-brand-light/30 to-blue-200/20 blur-2xl -z-10"
              style={{
                transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
                transition: 'transform 0.4s ease-out'
              }}
            />

            {/* Visual Container */}
            <div 
              className="relative w-full max-w-[540px] transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg)`
              }}
            >
              
              {/* Option A: Image Mode (Custom services image configured in Admin) */}
              {hero.heroMode === 'image' && (
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 group">
                  <img
                    src={hero.customImageUrl || "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80"}
                    alt="Servicios Digitales RAE"
                    className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
                      Servicios Integrales
                    </span>
                    <h3 className="text-lg font-extrabold text-white">
                      Estrategia • Diseño • Tecnología • Automatización
                    </h3>
                  </div>
                </div>
              )}

              {/* Option B: Mockups / Combined Mode */}
              {hero.heroMode !== 'image' && (
                <>
                  {/* MAIN HERO ASSET: Floating High-Tech Browser Window */}
                  <div className="w-full bg-white rounded-2xl shadow-premium border border-slate-200/90 overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
                    
                    {/* Browser Top Bar */}
                    <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                      </div>
                      <div className="bg-white px-3 py-0.5 rounded-md border border-slate-200 text-[10px] text-slate-500 font-mono flex items-center gap-1.5">
                        <span className="text-emerald-500">https://</span>
                        <span>raemarketingservices.com</span>
                      </div>
                      <div className="w-8" />
                    </div>

                    {/* Browser Screen Content */}
                    <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-slate-50 relative">
                      
                      {/* If combined mode, show service image as subtle top banner */}
                      {hero.heroMode === 'both' && (
                        <div className="relative h-28 rounded-xl overflow-hidden mb-3 border border-slate-200/60 shadow-inner">
                          <img
                            src={hero.customImageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"}
                            alt="Visual de Servicios"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 to-transparent flex items-center p-3">
                            <div>
                              <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider block">Servicios Digitales</span>
                              <span className="text-xs font-extrabold text-white">Ecosistema RAE en Acción</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-[10px] text-white font-extrabold">
                            R
                          </div>
                          <span className="text-xs font-bold text-brand-navy">Ecosistema Digital</span>
                        </div>
                        <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200">
                          En vivo • 99.8% Conversión
                        </span>
                      </div>

                      {/* Micro dashboard layout inside browser */}
                      <div className="grid grid-cols-3 gap-2.5 mb-3.5">
                        <div className="bg-blue-50/80 p-2.5 rounded-xl border border-blue-100">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-brand-navy block">Visitas</span>
                          <span className="text-base font-extrabold text-brand-blue">+240%</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-slate-500 block">Leads</span>
                          <span className="text-base font-extrabold text-emerald-600">+185%</span>
                        </div>
                        <div className="bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-100">
                          <span className="text-[9px] uppercase tracking-wider font-bold text-indigo-700 block">Automatización</span>
                          <span className="text-base font-extrabold text-indigo-600">24/7</span>
                        </div>
                      </div>

                      {/* Visual simulated UI content */}
                      <div className="bg-brand-navy text-white p-3 rounded-xl flex items-center justify-between mb-2 shadow-xs">
                        <div>
                          <div className="text-[10px] text-blue-200 font-medium">Solución Integral Activada</div>
                          <div className="text-xs font-bold">Web • Campañas • CRM • Redes</div>
                        </div>
                        <div className="w-7 h-7 rounded-lg bg-brand-blue flex items-center justify-center text-white">
                          <Zap size={14} />
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-brand-blue to-brand-light h-full w-[85%] rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* OVERLAPPING ASSET: Floating Smartphone */}
                  <div 
                    className="absolute -bottom-8 -right-4 sm:-right-8 w-44 sm:w-52 bg-slate-900 p-2.5 rounded-[28px] shadow-2xl border-4 border-slate-800 animate-float-delayed"
                    style={{
                      transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`
                    }}
                  >
                    <div className="w-16 h-3 bg-slate-800 rounded-full mx-auto mb-2" />
                    <div className="bg-gradient-to-b from-slate-900 to-brand-navy rounded-[20px] p-3 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <img 
                          src="/rae-logo.png" 
                          alt="Avatar" 
                          className="w-5 h-5 rounded-full ring-1 ring-brand-light" 
                        />
                        <span className="text-[9px] font-bold">@raemarketingservices</span>
                      </div>
                      
                      <div className="bg-gradient-to-br from-brand-blue to-blue-700 rounded-lg p-2.5 text-center mb-2 shadow-inner">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-blue-200 block">Estrategia</span>
                        <span className="text-[11px] font-extrabold text-white block leading-tight">Estrategia + Creatividad + Resultados</span>
                      </div>

                      <div className="flex items-center justify-between text-[9px] text-blue-200 pt-1">
                        <span>❤️ 1,248</span>
                        <span>💬 94</span>
                        <span className="text-emerald-400 font-bold">Viral Reach</span>
                      </div>
                    </div>
                  </div>

                  {/* FLOATING BADGES */}
                  <div 
                    className="absolute -top-5 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-brand-blue/20 flex items-center gap-2.5 animate-float-slow"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                      <TrendingUp size={16} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">+Engagement</span>
                      <span className="text-xs font-extrabold text-brand-navy">Presencia Activa</span>
                    </div>
                  </div>

                  <div 
                    className="absolute top-1/2 -left-6 sm:-left-12 bg-white/95 backdrop-blur-md px-3 py-2 rounded-2xl shadow-lg border border-brand-blue/20 flex items-center gap-2 animate-float-fast"
                  >
                    <div className="w-7 h-7 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center">
                      <Zap size={14} />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 font-semibold block">+Leads Calificados</span>
                      <span className="text-xs font-bold text-brand-navy">Funnels Activos</span>
                    </div>
                  </div>

                  <div 
                    className="absolute -bottom-4 left-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-brand-blue/20 flex items-center gap-2"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    <span className="text-xs font-bold text-brand-navy">Automatización WhatsApp 24/7</span>
                  </div>
                </>
              )}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
