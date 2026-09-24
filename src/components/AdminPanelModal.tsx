import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Inbox, 
  Layers, 
  Palette, 
  Image as ImageIcon, 
  Briefcase, 
  Building2, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  MessageCircle, 
  Clock, 
  RotateCcw,
  Sparkles,
  Upload,
  Plus,
  Type,
  Activity,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import type { ProjectItem } from '../types';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose }) => {
  const { 
    config, 
    updateColors, 
    updateHero, 
    toggleSectionVisibility, 
    moveSectionOrder, 
    updatePortfolioItems,
    updateAnimations,
    updateSectionTexts,
    resetToDefaults,
    messages,
    markMessageStatus,
    deleteMessage,
    businesses,
    updateBusinessStatus,
    updateBusinessApps,
  } = useSite();

  const [activeTab, setActiveTab] = useState<'inbox' | 'builder' | 'content' | 'hero' | 'colors' | 'portfolio' | 'businesses'>('inbox');
  const [saveToast, setSaveToast] = useState(false);

  // Preset service images for quick hero banner swap
  const heroImagePresets = [
    {
      title: 'Ecosistema Tecnológico & Marketing',
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Agencia Digital & Desarrollo Web',
      url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Dashboard de Analítica & Estrategia',
      url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Diseño UI/UX & Creatividad',
      url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    }
  ];

  if (!isOpen) return null;

  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const unreadMessagesCount = messages.filter((m) => m.status === 'unread').length;
  const pendingBusinessesCount = businesses.filter((b) => b.status === 'pending').length;

  // Portfolio helpers
  const handleAddNewProject = () => {
    const newId = `project-${Date.now()}`;
    const newProject: ProjectItem = {
      id: newId,
      title: 'Nuevo Caso de Éxito',
      category: 'Web Design',
      tagline: 'Solución digital a medida implementada por RAE Marketing Services.',
      client: 'Cliente Corporativo',
      clientType: 'Sector Empresarial',
      summary: 'Descripción detallada del alcance del proyecto y objetivos logrados.',
      challenge: 'Reto inicial del cliente antes de comenzar el proceso de consultoría.',
      solution: 'Solución estratégica y técnica desarrollada e implementada.',
      resultsHeadline: 'Aumento significativo en conversión y presencia de marca.',
      servicesProvided: ['Estrategia Digital', 'Diseño UI/UX', 'Desarrollo Web'],
      imageBg: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
      accentBadge: 'Digital & Growth',
      visible: true,
    };
    updatePortfolioItems([newProject, ...config.portfolioItems]);
    triggerSaveNotification();
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('¿Estás seguro de eliminar este proyecto del portafolio?')) {
      const updated = config.portfolioItems.filter((p) => p.id !== projectId);
      updatePortfolioItems(updated);
      triggerSaveNotification();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-brand-navy/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="bg-[#0F2D6B] text-white p-4 sm:p-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-blue flex items-center justify-center text-white font-extrabold shadow-sm">
              <Settings size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-extrabold text-white">
                  Panel de Administración RAE
                </h2>
                <span className="text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Sincronizado a Convex
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Gestión en tiempo real de contenidos, hero, portafolio, colores y licencias de negocios
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold animate-fadeIn">
                <Sparkles size={14} className="text-emerald-400" />
                <span>Guardado en tiempo real</span>
              </div>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Cerrar panel de administración"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto shrink-0 scrollbar-none">
          
          {/* 1. Inbox de Contactos */}
          <button
            type="button"
            onClick={() => setActiveTab('inbox')}
            className={`py-3.5 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'inbox'
                ? 'border-brand-blue text-brand-blue bg-white'
                : 'border-transparent text-slate-600 hover:text-brand-navy'
            }`}
          >
            <Inbox size={15} />
            <span>Inbox de Contactos</span>
            {unreadMessagesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          {/* 2. Editor de Bloques (Elementor Style) */}
          <button
            type="button"
            onClick={() => setActiveTab('builder')}
            className={`py-3.5 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'builder'
                ? 'border-brand-blue text-brand-blue bg-white'
                : 'border-transparent text-slate-600 hover:text-brand-navy'
            }`}
          >
            <Layers size={15} />
            <span>Editor de Bloques</span>
          </button>

          {/* 3. Textos de Secciones */}
          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`py-3.5 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'content'
                ? 'border-brand-blue text-brand-blue bg-white'
                : 'border-transparent text-slate-600 hover:text-brand-navy'
            }`}
          >
            <Type size={15} />
            <span>Textos y Copys</span>
          </button>

          {/* 4. Hero Banner & Imagen */}
          <button
            type="button"
            onClick={() => setActiveTab('hero')}
            className={`py-3.5 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'hero'
                ? 'border-brand-blue text-brand-blue bg-white'
                : 'border-transparent text-slate-600 hover:text-brand-navy'
            }`}
          >
            <ImageIcon size={15} />
            <span>Hero Banner</span>
          </button>

          {/* 5. Gestión de Portafolio */}
          <button
            type="button"
            onClick={() => setActiveTab('portfolio')}
            className={`py-3.5 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'portfolio'
                ? 'border-brand-blue text-brand-blue bg-white'
                : 'border-transparent text-slate-600 hover:text-brand-navy'
            }`}
          >
            <Briefcase size={15} />
            <span>Portafolio</span>
            <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded-full">
              {config.sections.find((s) => s.id === 'portfolio')?.visible ? 'Visible' : 'Oculto'}
            </span>
          </button>

          {/* 6. Colores y Animaciones */}
          <button
            type="button"
            onClick={() => setActiveTab('colors')}
            className={`py-3.5 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'colors'
                ? 'border-brand-blue text-brand-blue bg-white'
                : 'border-transparent text-slate-600 hover:text-brand-navy'
            }`}
          >
            <Palette size={15} />
            <span>Colores & Animación</span>
          </button>

          {/* 7. Negocios y Licencias de APPs */}
          <button
            type="button"
            onClick={() => setActiveTab('businesses')}
            className={`py-3.5 px-3.5 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'businesses'
                ? 'border-brand-blue text-brand-blue bg-white'
                : 'border-transparent text-slate-600 hover:text-brand-navy'
            }`}
          >
            <Building2 size={15} />
            <span>Negocios & APPs</span>
            {pendingBusinessesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold flex items-center justify-center">
                {pendingBusinessesCount}
              </span>
            )}
          </button>

        </div>

        {/* Tab Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50">
          
          {/* TAB 1: INBOX DE CONTACTOS */}
          {activeTab === 'inbox' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-brand-navy">
                    Solicitudes de Clientes (Inbox)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Mensajes enviados desde el formulario web de raemarketingservices.com
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-600">
                  Total: {messages.length} mensajes
                </span>
              </div>

              {messages.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                  <Inbox size={40} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-sm font-semibold text-slate-500">
                    No hay mensajes en el inbox actualmente.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        msg.status === 'unread'
                          ? 'bg-blue-50/60 border-brand-blue/30 shadow-xs'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            msg.status === 'unread' ? 'bg-brand-blue animate-pulse' : 'bg-slate-300'
                          }`} />
                          <h4 className="font-extrabold text-sm text-brand-navy">
                            {msg.name}
                          </h4>
                          {msg.company && (
                            <span className="text-xs text-slate-500 font-medium">
                              • {msg.company}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Clock size={12} />
                          <span>{new Date(msg.createdAt).toLocaleString('es-DO')}</span>
                        </div>
                      </div>

                      <div className="mb-3 text-xs">
                        <span className="font-bold text-brand-navy">Servicio de interés: </span>
                        <span className="text-brand-blue font-bold px-2 py-0.5 rounded-md bg-white border border-brand-blue/20">
                          {msg.service}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 bg-white/80 p-3 rounded-xl border border-slate-100 mb-4 whitespace-pre-line leading-relaxed">
                        {msg.message}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/60">
                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                          <span>📧 {msg.email}</span>
                          <span>📱 {msg.whatsapp}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* WhatsApp Direct Reply */}
                          <a
                            href={`https://wa.me/${msg.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hola ${msg.name}, recibimos tu solicitud en RAE Marketing Services sobre "${msg.service}". Con gusto coordinamos los detalles.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
                          >
                            <MessageCircle size={14} />
                            <span>Responder por WhatsApp</span>
                          </a>

                          {/* Status toggle */}
                          {msg.status === 'unread' ? (
                            <button
                              type="button"
                              onClick={() => {
                                markMessageStatus(msg.id, 'read');
                                triggerSaveNotification();
                              }}
                              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                            >
                              Marcar leído
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                markMessageStatus(msg.id, 'unread');
                                triggerSaveNotification();
                              }}
                              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-400 hover:bg-slate-100"
                            >
                              Marcar no leído
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => {
                              deleteMessage(msg.id);
                              triggerSaveNotification();
                            }}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Eliminar mensaje"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: EDITOR DE BLOQUES (ELEMENTOR STYLE) */}
          {activeTab === 'builder' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="text-base font-extrabold text-brand-navy mb-1">
                  Editor de Bloques y Orden de Secciones (Estilo Elementor)
                </h3>
                <p className="text-xs text-slate-600">
                  Activa o desactiva cualquier sección de la página web con el interruptor y reorganiza su posición en pantalla con las flechas de orden. Todos los cambios se reflejan inmediatamente en la web.
                </p>
                
                {/* Note about Portfolio */}
                <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500 shrink-0" />
                  <span>
                    <strong>Portafolio / Trabajo que habla por nosotros:</strong> Se encuentra <strong>{config.sections.find((s) => s.id === 'portfolio')?.visible ? 'ACTIVO' : 'OCULTO POR DEFECTO'}</strong>. Puedes gestionarlo en la pestaña Portafolio.
                  </span>
                </div>
              </div>

              {/* Sections List */}
              <div className="space-y-2.5">
                {[...config.sections]
                  .sort((a, b) => a.order - b.order)
                  .map((sec, idx, arr) => (
                    <div
                      key={sec.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                        sec.visible 
                          ? 'bg-white border-slate-200 shadow-xs' 
                          : 'bg-slate-100 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 font-mono font-bold text-xs text-slate-500 flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="font-extrabold text-sm text-brand-navy block">
                            {sec.name}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ID: #{sec.id} • {sec.visible ? 'Visible en web' : 'Oculto actualmente'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Move Up */}
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            moveSectionOrder(sec.id, 'up');
                            triggerSaveNotification();
                          }}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 disabled:opacity-30 text-slate-600"
                          title="Subir posición"
                        >
                          <ArrowUp size={16} />
                        </button>

                        {/* Move Down */}
                        <button
                          type="button"
                          disabled={idx === arr.length - 1}
                          onClick={() => {
                            moveSectionOrder(sec.id, 'down');
                            triggerSaveNotification();
                          }}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 disabled:opacity-30 text-slate-600"
                          title="Bajar posición"
                        >
                          <ArrowDown size={16} />
                        </button>

                        {/* Visibility Toggle */}
                        <button
                          type="button"
                          onClick={() => {
                            toggleSectionVisibility(sec.id);
                            triggerSaveNotification();
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                            sec.visible
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {sec.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                          <span>{sec.visible ? 'Visible' : 'Oculto'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 3: TEXTOS Y COPYS DE SECCIONES */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="text-base font-extrabold text-brand-navy mb-1">
                  Editor de Textos y Mensajes de la Web
                </h3>
                <p className="text-xs text-slate-500">
                  Edita los titulares y subtítulos de cada sección de la landing page. Todos los cambios se guardan y sincronizan en tiempo real.
                </p>
              </div>

              {/* Section 1: Propuesta de Valor */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Sección: Propuesta de Valor (3 Pilares)
                  </h4>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Titular Principal</label>
                  <input
                    type="text"
                    value={config.sectionTexts?.valuePropTitle || ''}
                    onChange={(e) => {
                      updateSectionTexts({ valuePropTitle: e.target.value });
                      triggerSaveNotification();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Subtítulo Descriptivo</label>
                  <textarea
                    rows={2}
                    value={config.sectionTexts?.valuePropSubtitle || ''}
                    onChange={(e) => {
                      updateSectionTexts({ valuePropSubtitle: e.target.value });
                      triggerSaveNotification();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Section 2: Sobre Nosotros */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Sección: Sobre Nosotros (Misión & Visión)
                  </h4>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Titular Principal</label>
                  <input
                    type="text"
                    value={config.sectionTexts?.aboutTitle || ''}
                    onChange={(e) => {
                      updateSectionTexts({ aboutTitle: e.target.value });
                      triggerSaveNotification();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Subtítulo Descriptivo</label>
                  <textarea
                    rows={2}
                    value={config.sectionTexts?.aboutSubtitle || ''}
                    onChange={(e) => {
                      updateSectionTexts({ aboutSubtitle: e.target.value });
                      triggerSaveNotification();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Section 3: Bento Services */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Sección: Servicios (Bento Grid)
                  </h4>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Titular Principal</label>
                  <input
                    type="text"
                    value={config.sectionTexts?.servicesTitle || ''}
                    onChange={(e) => {
                      updateSectionTexts({ servicesTitle: e.target.value });
                      triggerSaveNotification();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Subtítulo Descriptivo</label>
                  <textarea
                    rows={2}
                    value={config.sectionTexts?.servicesSubtitle || ''}
                    onChange={(e) => {
                      updateSectionTexts({ servicesSubtitle: e.target.value });
                      triggerSaveNotification();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Section 4: ¿Por qué RAE? */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Sección: ¿Por qué RAE? (Diferenciadores)
                  </h4>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Titular Principal</label>
                  <input
                    type="text"
                    value={config.sectionTexts?.whyRaeTitle || ''}
                    onChange={(e) => {
                      updateSectionTexts({ whyRaeTitle: e.target.value });
                      triggerSaveNotification();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Subtítulo Descriptivo</label>
                  <textarea
                    rows={2}
                    value={config.sectionTexts?.whyRaeSubtitle || ''}
                    onChange={(e) => {
                      updateSectionTexts({ whyRaeSubtitle: e.target.value });
                      triggerSaveNotification();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Section 5: Resultados & CTA */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Sección: Llamada a la Acción Final (CTA)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Titular del Banner</label>
                    <input
                      type="text"
                      value={config.sectionTexts?.ctaTitle || ''}
                      onChange={(e) => {
                        updateSectionTexts({ ctaTitle: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Texto del Botón Principal</label>
                    <input
                      type="text"
                      value={config.sectionTexts?.ctaButtonText || ''}
                      onChange={(e) => {
                        updateSectionTexts({ ctaButtonText: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Subtítulo del Banner</label>
                  <textarea
                    rows={2}
                    value={config.sectionTexts?.ctaSubtitle || ''}
                    onChange={(e) => {
                      updateSectionTexts({ ctaSubtitle: e.target.value });
                      triggerSaveNotification();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Section 6: Formulario de Contacto */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Sección: Formulario de Contacto
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Badge (etiqueta superior)</label>
                    <input
                      type="text"
                      value={config.sectionTexts?.contactBadge || ''}
                      onChange={(e) => {
                        updateSectionTexts({ contactBadge: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Titular Principal</label>
                    <input
                      type="text"
                      value={config.sectionTexts?.contactTitle || ''}
                      onChange={(e) => {
                        updateSectionTexts({ contactTitle: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Subtítulo Descriptivo</label>
                  <textarea
                    rows={2}
                    value={config.sectionTexts?.contactSubtitle || ''}
                    onChange={(e) => {
                      updateSectionTexts({ contactSubtitle: e.target.value });
                      triggerSaveNotification();
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none resize-none"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: HERO BANNER & IMAGEN */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <h3 className="text-base font-extrabold text-brand-navy mb-4">
                  Configurador Visual del Hero Banner
                </h3>

                {/* Hero Mode: Mockups / Custom Image / Both */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-brand-navy uppercase mb-2">
                    Modo de Visualización del Hero:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        updateHero({ heroMode: 'both' });
                        triggerSaveNotification();
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        config.hero.heroMode === 'both'
                          ? 'border-brand-blue bg-blue-50 text-brand-blue'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      🌟 Combinado (Recomendado)
                      <span className="block font-normal text-[10px] text-slate-400 mt-1">
                        Ecosistema 3D con imagen de fondo alusiva a servicios
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updateHero({ heroMode: 'image' });
                        triggerSaveNotification();
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        config.hero.heroMode === 'image'
                          ? 'border-brand-blue bg-blue-50 text-brand-blue'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      🖼️ Imagen de Servicios Exclusiva
                      <span className="block font-normal text-[10px] text-slate-400 mt-1">
                        Card fotográfico prémium con badge y overlay elegante
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updateHero({ heroMode: 'mockups' });
                        triggerSaveNotification();
                      }}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        config.hero.heroMode === 'mockups'
                          ? 'border-brand-blue bg-blue-50 text-brand-blue'
                          : 'border-slate-200 bg-white text-slate-600'
                      }`}
                    >
                      💻 Ecosistema 3D Digital
                      <span className="block font-normal text-[10px] text-slate-400 mt-1">
                        Browser y smartphone con métricas interactivas
                      </span>
                    </button>
                  </div>
                </div>

                {/* Local Image File Upload Picker */}
                <div className="mb-6 p-4 rounded-2xl bg-blue-50/50 border border-brand-blue/20">
                  <label className="block text-xs font-bold text-brand-navy uppercase mb-2">
                    Subir Imagen del Hero desde tu Dispositivo:
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 border-dashed border-brand-blue/40 bg-white hover:bg-blue-50/80 text-brand-blue cursor-pointer transition-colors text-xs font-bold">
                    <Upload size={16} />
                    <span>Seleccionar archivo de imagen (JPG, PNG, WebP)</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            if (ev.target?.result) {
                              updateHero({ customImageUrl: ev.target.result as string });
                              triggerSaveNotification();
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  <p className="text-[10px] text-slate-500 mt-2 text-center">
                    La imagen se convertirá y sincronizará en tiempo real con la nube de Convex.
                  </p>
                </div>

                {/* Custom Image URL Input */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                    O introduce una URL directa de imagen:
                  </label>
                  <input
                    type="url"
                    value={config.hero.customImageUrl}
                    onChange={(e) => {
                      updateHero({ customImageUrl: e.target.value });
                      triggerSaveNotification();
                    }}
                    placeholder="https://ejemplo.com/tu-imagen.jpg"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:border-brand-blue focus:outline-none"
                  />
                </div>

                {/* Preview of current Hero image */}
                {config.hero.customImageUrl && (
                  <div className="mb-6">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                      Vista previa de la imagen actual:
                    </label>
                    <div className="h-36 max-w-sm rounded-xl overflow-hidden border border-slate-200 relative group">
                      <img
                        src={config.hero.customImageUrl}
                        alt="Hero Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                        Imagen Activa en Hero
                      </div>
                    </div>
                  </div>
                )}

                {/* Image Presets */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    O selecciona una de nuestras imágenes alusivas prediseñadas:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {heroImagePresets.map((preset) => (
                      <div
                        key={preset.title}
                        onClick={() => {
                          updateHero({ customImageUrl: preset.url });
                          triggerSaveNotification();
                        }}
                        className={`group relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                          config.hero.customImageUrl === preset.url
                            ? 'border-brand-blue ring-2 ring-brand-blue/30 scale-102'
                            : 'border-slate-200 hover:border-brand-light'
                        }`}
                      >
                        <img
                          src={preset.url}
                          alt={preset.title}
                          className="w-full h-24 object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="p-2 bg-white text-[10px] font-bold text-brand-navy truncate">
                          {preset.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero Headlines & Text Editing */}
                <div className="space-y-4 pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Textos del Hero
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Titular Superior</label>
                      <input
                        type="text"
                        value={config.hero.headlineMain}
                        onChange={(e) => {
                          updateHero({ headlineMain: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Palabra / Frase con Gradiente</label>
                      <input
                        type="text"
                        value={config.hero.headlineGradient}
                        onChange={(e) => {
                          updateHero({ headlineGradient: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Texto del Badge Pill</label>
                      <input
                        type="text"
                        value={config.hero.badgeText}
                        onChange={(e) => {
                          updateHero({ badgeText: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Botón Principal</label>
                      <input
                        type="text"
                        value={config.hero.ctaPrimary}
                        onChange={(e) => {
                          updateHero({ ctaPrimary: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Botón Secundario</label>
                      <input
                        type="text"
                        value={config.hero.ctaSecondary}
                        onChange={(e) => {
                          updateHero({ ctaSecondary: e.target.value });
                          triggerSaveNotification();
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Subtítulo</label>
                    <input
                      type="text"
                      value={config.hero.subheadline}
                      onChange={(e) => {
                        updateHero({ subheadline: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Descripción</label>
                    <textarea
                      rows={3}
                      value={config.hero.description}
                      onChange={(e) => {
                        updateHero({ description: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none resize-none"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 5: GESTIÓN DE PORTAFOLIO CON SUBIDA DE IMÁGENES Y DESCRIPCIONES */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-brand-navy">
                    Proyectos del Portafolio
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cambia imágenes, títulos, clientes y descripciones de cada proyecto. Activa la sección en la web cuando esté lista.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Add New Project Button */}
                  <button
                    type="button"
                    onClick={handleAddNewProject}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-bold shadow-xs transition-colors"
                  >
                    <Plus size={15} />
                    <span>Añadir Proyecto</span>
                  </button>

                  {/* Toggle Section Visibility on Landing */}
                  <button
                    type="button"
                    onClick={() => {
                      toggleSectionVisibility('portfolio');
                      triggerSaveNotification();
                    }}
                    className={`inline-flex items-center gap-2 text-xs font-bold py-2.5 px-4 rounded-xl transition-all ${
                      config.sections.find((s) => s.id === 'portfolio')?.visible
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {config.sections.find((s) => s.id === 'portfolio')?.visible ? (
                      <>
                        <Eye size={15} />
                        <span>Visible en Web</span>
                      </>
                    ) : (
                      <>
                        <EyeOff size={15} />
                        <span>Oculto (Mostrar en Web)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Projects List with Edit Inputs and Image Upload */}
              <div className="space-y-5">
                {config.portfolioItems.map((item, idx) => {
                  const isImage = item.imageBg?.startsWith('http') || item.imageBg?.startsWith('data:') || item.imageBg?.startsWith('/');
                  return (
                    <div key={item.id} className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      
                      {/* Top Bar of Project Card */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xs font-mono font-bold text-brand-blue bg-blue-50 px-2.5 py-1 rounded-lg">
                            0{idx + 1}
                          </span>
                          <span className="text-xs font-bold uppercase text-slate-500">
                            {item.category}
                          </span>
                          <span className="text-xs text-slate-400">• {item.client}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Eliminar proyecto"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Image Upload and Preview */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                        <label className="block text-[11px] font-bold text-brand-navy uppercase mb-2">
                          Imagen o Portada del Proyecto
                        </label>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          {/* Thumbnail Preview */}
                          <div className="w-28 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-800 flex items-center justify-center relative">
                            {isImage ? (
                              <img src={item.imageBg} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className={`w-full h-full ${item.imageBg} flex items-center justify-center text-white text-[10px] font-bold text-center p-1`}>
                                Gradiente CSS
                              </div>
                            )}
                          </div>

                          <div className="flex-1 space-y-2 w-full">
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={item.imageBg}
                                onChange={(e) => {
                                  const updated = [...config.portfolioItems];
                                  updated[idx] = { ...updated[idx], imageBg: e.target.value };
                                  updatePortfolioItems(updated);
                                  triggerSaveNotification();
                                }}
                                placeholder="https://... o clase CSS de gradiente"
                                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none"
                              />

                              {/* Direct File Upload */}
                              <label className="px-3.5 py-2 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 shrink-0 transition-colors">
                                <Upload size={13} />
                                <span>Subir Archivo</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (ev) => {
                                        if (ev.target?.result) {
                                          const updated = [...config.portfolioItems];
                                          updated[idx] = { ...updated[idx], imageBg: ev.target.result as string };
                                          updatePortfolioItems(updated);
                                          triggerSaveNotification();
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            <p className="text-[10px] text-slate-400">
                              Puedes subir una captura PNG/JPG desde tu PC o pegar cualquier URL de imagen externa.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Primary Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Título del Proyecto</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...config.portfolioItems];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              updatePortfolioItems(updated);
                              triggerSaveNotification();
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Cliente</label>
                          <input
                            type="text"
                            value={item.client}
                            onChange={(e) => {
                              const updated = [...config.portfolioItems];
                              updated[idx] = { ...updated[idx], client: e.target.value };
                              updatePortfolioItems(updated);
                              triggerSaveNotification();
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Sector / Tipo</label>
                          <input
                            type="text"
                            value={item.clientType}
                            onChange={(e) => {
                              const updated = [...config.portfolioItems];
                              updated[idx] = { ...updated[idx], clientType: e.target.value };
                              updatePortfolioItems(updated);
                              triggerSaveNotification();
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Descripción Breve (Tagline)</label>
                        <input
                          type="text"
                          value={item.tagline}
                          onChange={(e) => {
                            const updated = [...config.portfolioItems];
                            updated[idx] = { ...updated[idx], tagline: e.target.value };
                            updatePortfolioItems(updated);
                            triggerSaveNotification();
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none"
                        />
                      </div>

                      {/* Detailed Project Descriptions (Modal Content) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Desafío del Proyecto</label>
                          <textarea
                            rows={2}
                            value={item.challenge}
                            onChange={(e) => {
                              const updated = [...config.portfolioItems];
                              updated[idx] = { ...updated[idx], challenge: e.target.value };
                              updatePortfolioItems(updated);
                              triggerSaveNotification();
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Solución Implementada</label>
                          <textarea
                            rows={2}
                            value={item.solution}
                            onChange={(e) => {
                              const updated = [...config.portfolioItems];
                              updated[idx] = { ...updated[idx], solution: e.target.value };
                              updatePortfolioItems(updated);
                              triggerSaveNotification();
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none resize-none"
                          />
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: COLORES Y ANIMACIONES */}
          {activeTab === 'colors' && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-brand-navy mb-1">
                  Paleta Cromática y Efectos Visuales
                </h3>
                <p className="text-xs text-slate-500">
                  Configura los códigos hexadecimales oficiales y ajusta la velocidad y estilo de las animaciones en tiempo real.
                </p>
              </div>

              {/* Color Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Azul Principal</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.colors.primaryBlue}
                      onChange={(e) => {
                        updateColors({ ...config.colors, primaryBlue: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200"
                    />
                    <input
                      type="text"
                      value={config.colors.primaryBlue}
                      onChange={(e) => {
                        updateColors({ ...config.colors, primaryBlue: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Azul Claro (Innovación)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.colors.lightBlue}
                      onChange={(e) => {
                        updateColors({ ...config.colors, lightBlue: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200"
                    />
                    <input
                      type="text"
                      value={config.colors.lightBlue}
                      onChange={(e) => {
                        updateColors({ ...config.colors, lightBlue: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Azul Oscuro / Navy</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={config.colors.darkNavy}
                      onChange={(e) => {
                        updateColors({ ...config.colors, darkNavy: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="w-10 h-10 rounded-xl cursor-pointer border border-slate-200"
                    />
                    <input
                      type="text"
                      value={config.colors.darkNavy}
                      onChange={(e) => {
                        updateColors({ ...config.colors, darkNavy: e.target.value });
                        triggerSaveNotification();
                      }}
                      className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Animation Controls */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-brand-blue" />
                  <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
                    Control de Animaciones y Efectos
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Velocidad de Animación</label>
                    <select
                      value={config.animations?.speed || 'normal'}
                      onChange={(e) => {
                        updateAnimations({ speed: e.target.value as 'normal' | 'slow' | 'fast' });
                        triggerSaveNotification();
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none"
                    >
                      <option value="slow">Suave y Sutil (Slow)</option>
                      <option value="normal">Estándar Profesional (Normal)</option>
                      <option value="fast">Dinámica y Rápida (Fast)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <div>
                      <span className="text-xs font-bold text-brand-navy block">Elementos Flotantes 3D</span>
                      <span className="text-[10px] text-slate-500">Levitaciones en Hero y Apps</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.animations?.enableFloating ?? true}
                      onChange={(e) => {
                        updateAnimations({ enableFloating: e.target.checked });
                        triggerSaveNotification();
                      }}
                      className="w-4 h-4 rounded text-brand-blue"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
                    <div>
                      <span className="text-xs font-bold text-brand-navy block">Auras de Fondo (Glows)</span>
                      <span className="text-[10px] text-slate-500">Luces ambientales difuminadas</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.animations?.enableGlows ?? true}
                      onChange={(e) => {
                        updateAnimations({ enableGlows: e.target.checked });
                        triggerSaveNotification();
                      }}
                      className="w-4 h-4 rounded text-brand-blue"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    resetToDefaults();
                    triggerSaveNotification();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 py-1.5 px-3 rounded-xl border border-slate-200"
                >
                  <RotateCcw size={13} />
                  <span>Restablecer valores originales</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: NEGOCIOS Y LICENCIAS DE APPS */}
          {activeTab === 'businesses' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200">
                <h3 className="text-base font-extrabold text-brand-navy mb-1">
                  Gestión de Negocios y Licencias de Aplicaciones
                </h3>
                <p className="text-xs text-slate-500">
                  Como administrador, aprueba los negocios registrados, asígnales un período de prueba gratuito y marca a qué aplicaciones individuales tendrán acceso.
                </p>
              </div>

              <div className="space-y-4">
                {businesses.map((biz) => {
                  const availableApps = [
                    { id: 'invoicing', name: 'Facturación PDF (ITBIS & Propina)' },
                    { id: 'expenses', name: 'Manejo de Gastos & Salidas' },
                    { id: 'employees', name: 'Gestión de Empleados' },
                    { id: 'inventory', name: 'Manejo de Stock' },
                    { id: 'dashboard', name: 'Dashboard Live de Balance' },
                    { id: 'vault', name: 'Vault System (Operaciones)' },
                  ];

                  return (
                    <div 
                      key={biz.id} 
                      className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                        biz.status === 'pending'
                          ? 'bg-amber-50/50 border-amber-300'
                          : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-base text-brand-navy">
                              {biz.name}
                            </h4>
                            <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                              biz.status === 'active'
                                ? 'bg-emerald-100 text-emerald-700'
                                : biz.status === 'trial'
                                ? 'bg-blue-100 text-blue-700'
                                : biz.status === 'pending'
                                ? 'bg-amber-100 text-amber-800 animate-pulse'
                                : 'bg-rose-100 text-rose-700'
                            }`}>
                              {biz.status === 'pending' ? 'Pendiente de Aprobación' : biz.status}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            RNC: <span className="font-mono font-bold text-slate-700">{biz.rnc}</span> • Propietario: {biz.ownerName}
                          </div>
                        </div>

                        {/* Status Controls */}
                        <div className="flex items-center gap-2">
                          {biz.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => {
                                updateBusinessStatus(biz.id, 'trial', 30);
                                triggerSaveNotification();
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                            >
                              ✓ Aprobar (Prueba 30 Días)
                            </button>
                          )}

                          {biz.status === 'trial' && (
                            <button
                              type="button"
                              onClick={() => {
                                updateBusinessStatus(biz.id, 'active');
                                triggerSaveNotification();
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white text-xs font-bold shadow-xs transition-colors"
                            >
                              Activar Plan Comercial
                            </button>
                          )}

                          {biz.status !== 'suspended' && (
                            <button
                              type="button"
                              onClick={() => {
                                updateBusinessStatus(biz.id, 'suspended');
                                triggerSaveNotification();
                              }}
                              className="px-2.5 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
                            >
                              Suspender
                            </button>
                          )}

                          {biz.status === 'suspended' && (
                            <button
                              type="button"
                              onClick={() => {
                                updateBusinessStatus(biz.id, 'active');
                                triggerSaveNotification();
                              }}
                              className="px-2.5 py-1.5 rounded-xl border border-emerald-200 text-emerald-600 hover:bg-emerald-50 text-xs font-semibold transition-colors"
                            >
                              Reactivar
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Granular Allowed Apps checkboxes */}
                      <div className="pt-3 border-t border-slate-100">
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-2">
                          Aplicaciones y Módulos Autorizados para este Negocio:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {availableApps.map((app) => {
                            const isAllowed = biz.allowedApps.includes(app.id);
                            return (
                              <label
                                key={app.id}
                                className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                                  isAllowed
                                    ? 'bg-blue-50/70 border-brand-blue/30 text-brand-navy font-bold'
                                    : 'bg-slate-50 border-slate-200 text-slate-400'
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isAllowed}
                                  onChange={() => {
                                    const nextApps = isAllowed
                                      ? biz.allowedApps.filter((a) => a !== app.id)
                                      : [...biz.allowedApps, app.id];
                                    updateBusinessApps(biz.id, nextApps);
                                    triggerSaveNotification();
                                  }}
                                  className="w-3.5 h-3.5 rounded text-brand-blue"
                                />
                                <span>{app.name}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Meta contacts */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
                        <div>
                          <span>📧 {biz.email}</span>
                          <span className="ml-3">📱 {biz.whatsapp}</span>
                        </div>
                        {biz.trialEndsAt && (
                          <div>
                            <span>Vence prueba: <strong>{new Date(biz.trialEndsAt).toLocaleDateString('es-DO')}</strong></span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
