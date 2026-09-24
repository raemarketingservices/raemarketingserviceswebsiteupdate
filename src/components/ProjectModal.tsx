import React, { useEffect } from 'react';
import { X, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import type { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onConsultProject: (projectTitle: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  onClose,
  onConsultProject 
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-brand-navy/70 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Visual Banner */}
        {(() => {
          const isImage = project.imageBg?.startsWith('http') || project.imageBg?.startsWith('data:') || project.imageBg?.startsWith('/');
          return (
            <div 
              className={`p-8 sm:p-10 text-white ${!isImage ? project.imageBg : 'bg-slate-900'} relative overflow-hidden`}
              style={isImage ? { backgroundImage: `url(${project.imageBg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
            >
              {isImage && <div className="absolute inset-0 bg-brand-navy/70 backdrop-blur-[2px] pointer-events-none" />}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Cerrar ventana"
          >
            <X size={20} />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold tracking-wider uppercase mb-3 backdrop-blur-sm">
            <Sparkles size={12} />
            <span>{project.category}</span>
          </div>

          <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
            {project.title}
          </h2>

          <p className="text-sm sm:text-base text-blue-100 max-w-xl font-medium">
            {project.tagline}
          </p>

          <div className="mt-4 pt-4 border-t border-white/15 flex flex-wrap gap-4 text-xs text-blue-200">
            <div>
              <span className="text-white/60 block text-[10px] uppercase font-bold">Cliente / Sector</span>
              <span className="font-semibold text-white">{project.client} ({project.clientType})</span>
            </div>
            <div>
              <span className="text-white/60 block text-[10px] uppercase font-bold">Enfoque</span>
              <span className="font-semibold text-white">{project.accentBadge}</span>
            </div>
          </div>
        </div>
      );
    })()}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-1">
              Visión General
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <span className="text-xs font-extrabold text-brand-navy uppercase tracking-wider block mb-1">
                El Desafío
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
              <span className="text-xs font-extrabold text-brand-blue uppercase tracking-wider block mb-1">
                La Solución Estratégica
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="bg-brand-navy/5 p-4 rounded-2xl border-l-4 border-brand-blue">
            <span className="text-xs font-bold text-brand-navy uppercase tracking-wider block mb-0.5">
              Impacto & Resultado
            </span>
            <p className="text-sm font-semibold text-brand-navy">
              {project.resultsHeadline}
            </p>
          </div>

          {/* Deliverables tags */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Servicios Ejecutados por RAE:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.servicesProvided.map((service) => (
                <span 
                  key={service}
                  className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 text-brand-navy px-3 py-1.5 rounded-lg border border-slate-200"
                >
                  <CheckCircle2 size={13} className="text-brand-blue" />
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            ¿Necesitas una solución similar para tu negocio?
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              onConsultProject(project.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs sm:text-sm py-2.5 px-6 rounded-full shadow-md shadow-brand-blue/20 transition-all hover:-translate-y-0.5"
          >
            <span>Consultar sobre este tipo de proyecto</span>
            <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </div>
  );
};
