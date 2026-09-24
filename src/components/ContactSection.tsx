import React, { useState } from 'react';
import { 
  Send, 
  MessageCircle, 
  Globe, 
  CheckCircle2, 
  Clock, 
  MapPin,
  Sparkles 
} from 'lucide-react';
import { InstagramIcon } from './icons/InstagramIcon';
import confetti from 'canvas-confetti';
import { useSite } from '../context/SiteContext';

interface ContactSectionProps {
  initialService?: string;
  onSuccessNotification?: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  initialService = 'Diseño de páginas web',
  onSuccessNotification 
}) => {
  const { addMessage, config } = useSite();
  const st = config.sectionTexts;
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    whatsapp: '',
    service: initialService,
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const servicesOptions = [
    'Diseño de páginas web',
    'Marketing Digital',
    'Manejo de redes sociales',
    'Automatización para negocios',
    'Diseño gráfico',
    'Otro'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.whatsapp.trim()) {
      setErrorMessage('Por favor completa al menos tu nombre y número de WhatsApp.');
      return;
    }

    setIsSubmitting(true);

    // Save to Admin Inbox & Convex
    addMessage({
      name: formData.name,
      company: formData.company,
      email: formData.email,
      whatsapp: formData.whatsapp,
      service: formData.service,
      message: formData.message,
    });

    // Reliable feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // fallback
      }
      if (onSuccessNotification) {
        onSuccessNotification('¡Solicitud enviada con éxito! Te contactaremos a la brevedad.');
      }
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    const text = `Hola RAE Marketing Services!\n\nMi nombre es: ${formData.name || 'Interesado'}\nEmpresa: ${formData.company || 'Particular'}\nServicio de interés: ${formData.service}\nDetalles: ${formData.message || 'Quisiera más información sobre sus servicios.'}`;
    window.open(`https://wa.me/18094192390?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contacto" className="py-20 lg:py-28 bg-[#F2F4F8] relative overflow-hidden" aria-label="Contacto RAE Marketing Services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100/70 text-brand-blue text-[11px] font-bold tracking-wider uppercase mb-3">
            <Sparkles size={13} />
            <span>{st?.contactBadge || 'Contacto Directo'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy tracking-tight mb-2">
            {st?.contactTitle || 'Hagamos grandes cosas juntos.'}
          </h2>
          
          <div className="font-script text-2xl sm:text-3xl text-brand-blue mb-4">
            Hagamos Grandes Cosas Juntos
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
            {st?.contactSubtitle || 'Completa el formulario o escríbenos directamente. Analizaremos tu proyecto y te responderemos con una propuesta estratégica personalizada.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-premium border border-slate-200/90 relative">
            
            {submitted ? (
              <div className="py-12 text-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-extrabold text-brand-navy mb-2">
                  ¡Gracias por comunicarte!
                </h3>
                <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
                  Hemos recibido tu solicitud para <strong>{formData.service}</strong>. Nuestro equipo se pondrá en contacto contigo a través de WhatsApp o correo electrónico.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-3 px-6 rounded-full shadow-sm transition-colors"
                  >
                    <MessageCircle size={16} />
                    <span>Abrir conversación en WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        company: '',
                        email: '',
                        whatsapp: '',
                        service: initialService,
                        message: '',
                      });
                    }}
                    className="text-xs text-slate-500 hover:text-brand-navy underline py-2"
                  >
                    Enviar otra consulta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Tu nombre y apellido"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                      Empresa o Negocio
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Nombre de tu negocio"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="whatsapp" className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                      WhatsApp / Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      required
                      placeholder="Ej: 809 419 2390"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                    Servicio que necesitas *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue text-sm text-slate-800 bg-white focus:outline-none transition-colors"
                  >
                    {servicesOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                    Cuéntanos sobre tu proyecto
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="¿Cuál es tu objetivo? ¿Tienes ya una presencia digital o partes desde cero?"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-blue hover:bg-blue-600 text-white font-extrabold text-sm py-3.5 px-7 rounded-xl shadow-md shadow-brand-blue/25 hover:shadow-lg transition-all active:scale-98 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Enviando...</span>
                    ) : (
                      <>
                        <span>ENVIAR SOLICITUD</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm py-3.5 px-5 rounded-xl shadow-sm transition-colors"
                    title="Enviar directamente por WhatsApp"
                  >
                    <MessageCircle size={18} />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-400 text-center pt-2">
                  🔒 Tus datos están seguros. No compartimos tu información con terceros.
                </p>
              </form>
            )}

          </div>

          {/* Right Column: Official Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Card 1: Official Channels */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-subtle">
              <h3 className="text-lg font-extrabold text-brand-navy mb-5 pb-3 border-b border-slate-100">
                Canales de Atención
              </h3>

              <div className="space-y-4">
                
                {/* WhatsApp */}
                <a
                  href="https://wa.me/18094192390?text=Hola%20RAE%20Marketing%20Services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-emerald-50/60 hover:bg-emerald-50 border border-emerald-100 text-slate-800 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                      WhatsApp Oficial
                    </span>
                    <span className="text-sm font-extrabold text-brand-navy group-hover:text-emerald-700">
                      809 419 2390
                    </span>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/raemarketingservices"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 text-slate-800 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <InstagramIcon size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Instagram
                    </span>
                    <span className="text-sm font-extrabold text-brand-navy group-hover:text-brand-blue">
                      @raemarketingservices
                    </span>
                  </div>
                </a>

                {/* Website */}
                <div className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-800">
                  <div className="w-11 h-11 rounded-xl bg-brand-blue text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Globe size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Sitio Web Oficial
                    </span>
                    <span className="text-sm font-extrabold text-brand-navy">
                      raemarketingservices.com
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Info Card 2: Coverage & Hours */}
            <div className="bg-brand-navy rounded-3xl p-7 text-white shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-light">
                  <Clock size={18} />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-blue-200 tracking-wider block">
                    Horario de Atención
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    Lunes a Viernes: 9:00 AM – 6:00 PM
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-brand-light">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-blue-200 tracking-wider block">
                    Alcance
                  </span>
                  <span className="text-sm font-extrabold text-white">
                    República Dominicana & Clientes Globales
                  </span>
                </div>
              </div>

              <p className="mt-4 text-xs text-blue-200/80 leading-relaxed font-script text-lg">
                Ideas • Estrategia • Resultados
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
