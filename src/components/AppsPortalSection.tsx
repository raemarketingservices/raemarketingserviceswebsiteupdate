import React from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Receipt, 
  Package, 
  Database, 
  BarChart3, 
  Sparkles,
  UserPlus
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface AppsPortalSectionProps {
  onOpenPortal: () => void;
  onOpenRegister: () => void;
}

export const AppsPortalSection: React.FC<AppsPortalSectionProps> = ({
  onOpenPortal,
  onOpenRegister,
}) => {
  const { config } = useSite();
  const { appsPortal } = config;

  const appFeatures = [
    {
      title: 'Facturación en PDF',
      description: `Emite facturas profesionales integrando el ITBIS (${appsPortal.itbisRate}%) y Propina Legal (${appsPortal.propinaRate}%).`,
      icon: Receipt,
      accent: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      badge: 'Fiscal RD',
    },
    {
      title: 'Manejo de Stock',
      description: 'Sincronización live de inventario de productos y alertas de reposición segura.',
      icon: Package,
      accent: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      badge: 'Tiempo Real',
    },
    {
      title: 'Vault System',
      description: 'Suite líder de automatización y almacenamiento seguro para tus operaciones.',
      icon: Database,
      accent: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      badge: 'Seguridad 256-bit',
    },
    {
      title: 'Reportes Live',
      description: 'Indicadores en tiempo real de ingresos, gastos y balance para decisiones ágiles.',
      icon: BarChart3,
      accent: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      badge: 'Flujo de Caja',
    },
  ];

  return (
    <section 
      id="portal-apps"
      className="py-20 lg:py-28 bg-[#0F2D6B] text-white relative overflow-hidden subtle-grid-dark"
      aria-label="Portal digital de aplicaciones estratégicas"
    >
      {/* Background ambient glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-brand-light/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Split: Headline & App Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wider uppercase mb-5 backdrop-blur-sm">
              <Sparkles size={13} className="text-amber-400" />
              <span>{appsPortal.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
              Portal digital de<br />
              <span className="text-amber-400">aplicaciones estratégicas</span>
            </h2>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed mb-8 max-w-xl">
              {appsPortal.description}
            </p>

            {/* Trust Pills */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-blue-100">
                <Lock size={13} className="text-brand-light" />
                <span>Acceso Autorizado</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-blue-100">
                <ShieldCheck size={13} className="text-emerald-400" />
                <span>Sincronización Segura</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-blue-100">
                <Zap size={13} className="text-amber-400" />
                <span>Tiempo Real</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenPortal}
                className="inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg shadow-amber-500/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Entrar al Sistema</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={onOpenRegister}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base px-7 py-4 rounded-full border border-white/20 backdrop-blur-sm transition-all duration-200"
              >
                <UserPlus size={16} />
                <span>Registrar Mi Negocio Gratis</span>
              </button>
            </div>

          </div>

          {/* Right Column: 4 App Feature Grid (as in the screenshot) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {appFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  onClick={onOpenPortal}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border ${feat.accent} group-hover:scale-110 transition-transform`}>
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-blue-200/70 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                      {feat.title}
                    </h3>

                    <p className="text-xs text-blue-100/70 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Acceder a la app</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Banner Bar: Dominican Republic Tax & Invoice Compliance */}
        <div className="rounded-2xl sm:rounded-3xl bg-white/10 border border-white/15 p-5 sm:p-6 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center shrink-0">
              <ShieldCheck size={26} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 block">
                Cumplimiento fiscal dominicano
              </span>
              <span className="text-sm sm:text-base font-extrabold text-white">
                ITBIS 18% + Propina Legal 10% integrados
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8 sm:gap-12 border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-0 md:pl-8 text-center">
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-amber-400 block font-mono">18%</span>
              <span className="text-[10px] font-bold text-blue-200 uppercase">ITBIS</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-amber-400 block font-mono">10%</span>
              <span className="text-[10px] font-bold text-blue-200 uppercase">Propina Legal</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-extrabold text-white block font-mono">PDF</span>
              <span className="text-[10px] font-bold text-blue-200 uppercase">Facturación</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
