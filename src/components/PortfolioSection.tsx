import React, { useState } from 'react';
import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import type { ProjectCategory, ProjectItem } from '../types';
import { ProjectModal } from './ProjectModal';
import { useSite } from '../context/SiteContext';

interface PortfolioSectionProps {
  onConsultProject: (projectTitle: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onConsultProject }) => {
  const { config } = useSite();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Todos');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories: ProjectCategory[] = [
    'Todos',
    'Web Design',
    'Social Media',
    'Branding',
    'Marketing',
    'Automation'
  ];

  const allProjects = config.portfolioItems && config.portfolioItems.length > 0
    ? config.portfolioItems
    : [];

  const filteredProjects = activeCategory === 'Todos'
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="portafolio" className="py-20 lg:py-28 bg-[#F2F4F8] relative overflow-hidden" aria-label="Portafolio de proyectos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 text-brand-blue text-[11px] font-bold tracking-wider uppercase mb-3">
            <FolderGit2 size={13} />
            <span>Casos & Proyectos</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-navy tracking-tight mb-4">
            Trabajo que habla por nosotros.
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed">
            Una selección de proyectos creados para ayudar a marcas a verse mejor, comunicar mejor y crecer digitalmente.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12" role="tablist" aria-label="Filtrar por categoría">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(category)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20 scale-105'
                    : 'bg-white text-slate-600 hover:text-brand-blue hover:bg-white/80 border border-slate-200'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => {
            const isImage = project.imageBg?.startsWith('http') || project.imageBg?.startsWith('data:') || project.imageBg?.startsWith('/');
            return (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-subtle hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              >
                {/* Visual Card Cover with CSS Art / Mock preview */}
                <div 
                  className={`h-56 sm:h-64 ${!isImage ? project.imageBg : 'bg-slate-900'} relative p-6 flex flex-col justify-between overflow-hidden group-hover:scale-[1.01] transition-transform duration-300`}
                  style={isImage ? { backgroundImage: `url(${project.imageBg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                >
                
                {/* Micro tech pattern overlay */}
                <div className="absolute inset-0 opacity-20 subtle-grid-dark pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    {project.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-brand-blue transition-colors">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Abstract graphical element representation */}
                <div className="relative z-10">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-blue-200 block mb-1">
                    {project.clientType}
                  </span>
                  <h3 className="text-xl font-extrabold text-white leading-snug drop-shadow-xs">
                    {project.title}
                  </h3>
                </div>

                {/* Gradient shade overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.servicesProvided.slice(0, 3).map((s) => (
                      <span key={s} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">
                    {project.client}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-brand-blue group-hover:translate-x-1 transition-transform">
                    <span>Ver proyecto</span>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        </div>

      </div>

      {/* Interactive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsultProject={onConsultProject}
      />
    </section>
  );
};
