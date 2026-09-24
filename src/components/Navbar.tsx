import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle, Settings, LayoutGrid } from 'lucide-react';
import { useSite } from '../context/SiteContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenPortal: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPath, 
  onNavigate,
  onOpenPortal,
  onOpenAdmin,
}) => {
  const { messages, businesses } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const unreadCount = messages.filter((m) => m.status === 'unread').length;
  const pendingCount = businesses.filter((b) => b.status === 'pending').length;
  const totalAdminAlerts = unreadCount + pendingCount;

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Nosotros', path: '/#nosotros' },
    { label: 'Servicios', path: '/#servicios' },
    { label: 'Portal APPs', path: '/#portal-apps', action: onOpenPortal },
    { label: 'Contacto', path: '/#contacto' },
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string, action?: () => void) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (action) {
      action();
    } else {
      onNavigate(path);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-header py-3.5 shadow-subtle border-b border-brand-border'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Name */}
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-xl p-1"
              aria-label="RAE Marketing Services - Inicio"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shadow-sm ring-2 ring-brand-blue/20 transition-transform group-hover:scale-105 duration-300">
                <img
                  src="/rae-logo.png"
                  alt="RAE Marketing Services Logo"
                  className="w-full h-full object-cover"
                  width="44"
                  height="44"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-brand-navy leading-none">
                  RAE
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-wider text-brand-muted uppercase">
                  Marketing Services
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs" aria-label="Navegación principal">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path || (link.path === '/' && currentPath === '/');
                return (
                  <a
                    key={link.label}
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path, link.action)}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                      link.label === 'Portal APPs'
                        ? 'text-amber-700 bg-amber-50 hover:bg-amber-100 font-bold border border-amber-200/60'
                        : isActive
                        ? 'text-brand-blue bg-blue-50 font-bold'
                        : 'text-brand-grayText hover:text-brand-blue hover:bg-slate-100/60'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Action Area */}
            <div className="hidden md:flex items-center gap-2.5">
              
              {/* WhatsApp direct */}
              <a
                href="https://wa.me/18094192390?text=Hola%20RAE%20Marketing%20Services"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy hover:text-brand-blue px-2.5 py-2 rounded-lg transition-colors"
                title="Atención directa por WhatsApp"
              >
                <MessageCircle size={15} className="text-emerald-500" />
                <span className="hidden xl:inline">809 419 2390</span>
              </a>

              {/* Portal Apps Button */}
              <button
                type="button"
                onClick={onOpenPortal}
                className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-black text-amber-300 hover:text-amber-200 text-xs font-bold px-3.5 py-2.5 rounded-full shadow-xs transition-colors border border-amber-400/30"
                title="Acceder a RAE Business Apps & Facturación"
              >
                <LayoutGrid size={13} className="text-amber-400" />
                <span>Portal Negocios</span>
              </button>

              {/* Admin Panel Launcher */}
              <button
                type="button"
                onClick={onOpenAdmin}
                className="relative p-2.5 rounded-full text-brand-navy hover:text-brand-blue bg-white hover:bg-slate-100 border border-slate-200 shadow-xs transition-colors"
                title="Abrir Panel de Administración"
                aria-label="Panel de Administración"
              >
                <Settings size={16} />
                {totalAdminAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse">
                    {totalAdminAlerts}
                  </span>
                )}
              </button>

              {/* Contact CTA Button */}
              <a
                href="#contacto"
                onClick={(e) => handleLinkClick(e, '/#contacto')}
                className="inline-flex items-center gap-2 bg-brand-blue hover:bg-blue-600 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md shadow-brand-blue/20 transition-all duration-200 hover:shadow-lg hover:shadow-brand-blue/30 active:scale-95"
              >
                <span>Hablemos</span>
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* Mobile Actions: Admin Quick Access + Hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="relative p-2 rounded-xl text-brand-navy hover:bg-slate-100 border border-slate-200"
                title="Admin Panel"
                aria-label="Admin Panel"
              >
                <Settings size={18} />
                {totalAdminAlerts > 0 && (
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-bold flex items-center justify-center">
                    {totalAdminAlerts}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-brand-navy hover:bg-slate-100 transition-colors focus:outline-none"
                aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with backdrop blur */}
      <div
        className={`fixed inset-0 z-40 bg-brand-navy/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 bottom-0 w-4/5 max-w-sm z-50 bg-white shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header in Drawer */}
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src="/rae-logo.png"
                alt="RAE Logo"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-blue/20"
              />
              <span className="font-extrabold text-brand-navy text-sm">RAE Marketing</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>

          {/* Links */}
          <nav className="py-6 flex flex-col gap-2" aria-label="Navegación móvil">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path, link.action)}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-brand-grayText hover:text-brand-blue hover:bg-blue-50/60 transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={16} className="text-slate-400" />
              </a>
            ))}

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onOpenPortal(); }}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-bold text-xs flex items-center justify-between"
              >
                <span>🚀 Portal de Negocios (Facturación & APPs)</span>
                <ArrowUpRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
                className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-between"
              >
                <span>⚙️ Panel de Administración (Editor Web & Inbox)</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </nav>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
          <a
            href="https://wa.me/18094192390?text=Hola%20RAE%20Marketing%20Services"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition-colors"
          >
            <MessageCircle size={16} />
            <span>Escribir por WhatsApp</span>
          </a>

          <a
            href="#contacto"
            onClick={(e) => handleLinkClick(e, '/#contacto')}
            className="w-full flex items-center justify-center gap-2 bg-brand-blue hover:bg-blue-600 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md shadow-brand-blue/20 transition-colors"
          >
            <span>Hablemos de tu proyecto</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </>
  );
};
