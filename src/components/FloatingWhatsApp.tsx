import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const quickQuestions = [
    'Hola! Quisiera cotizar una página web para mi negocio.',
    'Hola RAE! Me interesa el servicio de Marketing Digital.',
    'Quisiera información sobre el manejo de redes sociales.',
    'Me gustaría automatizar la atención de WhatsApp y CRM.',
  ];

  const handleSend = (text: string) => {
    window.open(`https://wa.me/18094192390?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Quick Chat Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-slideDown">
          {/* Header */}
          <div className="bg-[#0F2D6B] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src="/rae-logo.png" 
                  alt="RAE" 
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400 bg-white" 
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0F2D6B] rounded-full" />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-white">
                  RAE Marketing Services
                </h4>
                <span className="text-[10px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  En línea • Respuesta rápida
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
              aria-label="Cerrar ventana de WhatsApp"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-2xs border border-slate-200/60 max-w-[85%] text-xs text-slate-700 leading-relaxed">
              👋 ¡Hola! ¿Cómo podemos ayudarte a impulsar tu presencia digital hoy?
            </div>

            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 pt-1">
              Preguntas rápidas:
            </div>

            <div className="space-y-1.5">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200/80 hover:border-brand-blue/30 text-xs text-brand-navy font-medium transition-colors flex items-center justify-between group shadow-2xs"
                >
                  <span className="line-clamp-1">{q}</span>
                  <Send size={12} className="text-slate-400 group-hover:text-brand-blue shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium">
              WhatsApp: 809 419 2390
            </span>
            <button
              type="button"
              onClick={() => handleSend('Hola RAE Marketing Services! Quisiera información.')}
              className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2 px-3.5 rounded-xl shadow-xs transition-colors"
            >
              <span>Abrir Chat</span>
              <MessageCircle size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Abrir chat de WhatsApp con RAE Marketing Services"
      >
        {/* Pulsing halo */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-30 group-hover:opacity-50 animate-ping pointer-events-none" />
        
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}

        {/* Floating Tooltip when closed */}
        {!isOpen && (
          <span className="absolute right-full mr-3 whitespace-nowrap bg-brand-navy text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
            ¡Escríbenos a WhatsApp!
          </span>
        )}
      </button>

    </div>
  );
};
