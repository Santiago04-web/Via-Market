import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Clock, 
  ShoppingBag,
  Award,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onExploreClick: () => void;
  onOffersClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOffersClick }) => {
  return (
    <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-20">
      
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] sm:w-[900px] sm:h-[550px] bg-gradient-to-tr from-[#0866FF]/20 via-[#071A35]/30 to-[#00D2FF]/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#0866FF]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#00D2FF]/10 blur-[100px] pointer-events-none" />

      {/* Grid Pattern overlay for tech aesthetic */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Editorial Copy & Actions */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            
            {/* Verified Colombian Merchant Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F1E36]/90 border border-[#0866FF]/30 text-xs text-slate-200 shadow-glow backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-white tracking-wide">Comercio Colombiano Verificado</span>
              <span className="text-slate-400 text-[11px]">• Cali, Valle</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Todo lo que buscas.{' '}
              <span className="block mt-1 blue-gradient-text">
                A un clic de distancia.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Descubre productos para tu día a día, compra con total confianza y recibe tus pedidos con rapidez y seguridad donde estés en Colombia.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#0866FF] hover:bg-[#0654d6] text-white font-bold text-base shadow-glow hover:shadow-glow-lg transition-all duration-300 transform active:scale-95 group"
              >
                <ShoppingBag className="w-5 h-5 text-white/90 group-hover:scale-110 transition-transform" />
                <span>Explorar productos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOffersClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#0F1E36] hover:bg-[#1E2D4A] text-slate-200 hover:text-white font-semibold text-base border border-[#1E2D4A] hover:border-[#0866FF]/50 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Descubrir ofertas</span>
              </button>
            </div>

            {/* Micro Trust Stats */}
            <div className="pt-6 border-t border-[#1E2D4A]/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Truck className="w-4 h-4 text-[#0866FF]" />
                  <span>Cobertura</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white">Nacional 🇨🇴</p>
                <p className="text-[11px] text-slate-400">Despacho ágil</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Garantía</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white">100% Segura</p>
                <p className="text-[11px] text-slate-400">Ley 1480 Colombia</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Legalidad</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-white">Cámara Cali</p>
                <p className="text-[11px] text-slate-400">NIT 900989806-9</p>
              </div>
            </div>

          </div>

          {/* Right Visual 3D Showcase featuring Official Vía Market Artwork */}
          <div className="lg:col-span-6 relative flex justify-center">
            
            {/* Decorative Glow Ring */}
            <div className="relative w-full max-w-xl">
              
              {/* Main Artwork Container with Framer Motion hover & depth */}
              <div className="relative rounded-3xl overflow-hidden glass-card p-3 shadow-premium group">
                
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-[#071A35]">
                  <img 
                    src="/Portada.jpeg" 
                    alt="Vía Market - Tu Tienda Online Colombia" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080D18]/80 via-transparent to-transparent pointer-events-none" />

                  {/* Brand Tag overlay on image */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs text-white font-medium flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#0866FF]"></span>
                      Tecnología • Hogar • Moda • Accesorios
                    </div>
                    <div className="hidden sm:block px-3 py-1.5 rounded-lg bg-[#0866FF] text-white text-xs font-bold shadow-glow">
                      viamarket.lat
                    </div>
                  </div>
                </div>

                {/* Floating Badge 1: Free Shipping threshold in Colombia */}
                <div className="absolute -top-4 -right-2 sm:-right-4 bg-[#0F1E36]/95 border border-[#0866FF]/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3 animate-float">
                  <div className="w-9 h-9 rounded-xl bg-[#0866FF]/20 flex items-center justify-center text-[#0866FF]">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Despacho express</p>
                    <p className="text-xs font-bold text-white">Envíos a todo el país</p>
                  </div>
                </div>

                {/* Floating Badge 2: Colombian direct support */}
                <div className="absolute -bottom-5 -left-2 sm:-left-4 bg-[#0F1E36]/95 border border-emerald-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-md flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Atención Personalizada</p>
                    <p className="text-xs font-bold text-white">+57 304 405 3729</p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={onExploreClick}
            aria-label="Desplazarse al catálogo"
            className="flex flex-col items-center gap-2 text-slate-400 hover:text-white transition-colors group cursor-pointer"
          >
            <span className="text-xs font-medium tracking-widest uppercase text-slate-400 group-hover:text-slate-200">
              Ver Colección
            </span>
            <div className="w-8 h-8 rounded-full border border-slate-700 group-hover:border-[#0866FF] flex items-center justify-center transition-colors">
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-white animate-bounce" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
};
