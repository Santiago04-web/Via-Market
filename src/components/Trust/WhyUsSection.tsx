import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  MapPin, 
  Sparkles, 
  FileCheck,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

export const WhyUsSection: React.FC = () => {
  return (
    <section id="beneficios" className="py-20 md:py-28 relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#0866FF]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#00D2FF]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0866FF]/10 border border-[#0866FF]/20 text-xs font-bold text-[#60A5FA]">
            <Award className="w-3.5 h-3.5" />
            <span>Respaldo y Transparencia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ¿Por Qué Elegir a Vía Market?
          </h2>
          <p className="text-sm text-slate-300">
            Combinamos tecnología, productos seleccionados y la calidez del servicio colombiano para brindarte la mejor experiencia de compra online.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Pillar 1: Registro Legal Mercantil */}
          <div className="p-8 rounded-3xl bg-[#0c1626] border border-[#1E2D4A] hover:border-[#0866FF]/40 transition-all duration-300 relative group">
            <div className="w-14 h-14 rounded-2xl bg-[#0F1E36] border border-[#1E2D4A] flex items-center justify-center text-[#0866FF] mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-7 h-7" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-md bg-blue-950/80 border border-blue-500/30 text-[11px] font-bold text-blue-300 mb-3">
              Cámara de Comercio de Cali
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Empresa Legalmente Constituida
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Operamos formalmente bajo el NIT <strong>900989806-9</strong> con matrícula mercantil <strong>861975-51</strong> renovada y registrada en la Cámara de Comercio de Cali, Valle del Cauca.
            </p>
            <div className="pt-4 border-t border-[#1E2D4A] text-[11px] text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0866FF]" />
              <span>CL 22 NORTE # 89 - 792 CS 18, Cali</span>
            </div>
          </div>

          {/* Pillar 2: Selección y Calidad */}
          <div className="p-8 rounded-3xl bg-[#0c1626] border border-[#1E2D4A] hover:border-[#0866FF]/40 transition-all duration-300 relative group">
            <div className="w-14 h-14 rounded-2xl bg-[#0F1E36] border border-[#1E2D4A] flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-[11px] font-bold text-emerald-300 mb-3">
              Control Riguroso
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Curaduría y Garantía Real
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Cada referencia tecnológica y de hogar en Vía Market es testeada previamente para asegurar su funcionamiento, durabilidad y compatibilidad con las tomas y redes colombianas.
            </p>
            <div className="pt-4 border-t border-[#1E2D4A] text-[11px] text-slate-400 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cumplimiento Ley 1480 de Colombia</span>
            </div>
          </div>

          {/* Pillar 3: Soporte Humano */}
          <div className="p-8 rounded-3xl bg-[#0c1626] border border-[#1E2D4A] hover:border-[#0866FF]/40 transition-all duration-300 relative group">
            <div className="w-14 h-14 rounded-2xl bg-[#0F1E36] border border-[#1E2D4A] flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <PhoneCall className="w-7 h-7" />
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-[11px] font-bold text-cyan-300 mb-3">
              Atención Directa
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Sin Bots Complicados
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              ¿Tienes una inquietud antes de pagar o necesitas asistencia para configurar tu producto? Escríbenos a nuestra línea WhatsApp comercial y te atenderá una persona real.
            </p>
            <div className="pt-4 border-t border-[#1E2D4A] text-[11px] text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Línea activa: +57 304 405 3729</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
