import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Truck, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Heart
} from 'lucide-react';

interface FooterProps {
  onOpenLegal: (tab: 'terminos' | 'envios' | 'garantias' | 'privacidad' | 'empresa') => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onSelectCategory }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (anchorId: string) => {
    const elem = document.getElementById(anchorId);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080f] border-t border-[#1E2D4A] pt-16 pb-8 text-slate-400 text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E2D4A]/60">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#0866FF] to-[#00D2FF]">
                <img 
                  src="/Perfil.jpeg" 
                  alt="Vía Market" 
                  className="w-full h-full object-cover rounded-full bg-white" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white tracking-tight">
                  VÍA <span className="text-[#0866FF]">MARKET</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                  Tu Tienda Online
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Tienda online colombiana especializada en tecnología, artículos para el hogar, accesorios y moda urbana con cobertura y despachos a todo el país.
            </p>

            <div className="p-3.5 rounded-xl bg-[#0c1626] border border-[#1E2D4A] space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span>Razón Social:</span>
                <span className="text-white">Vía Market</span>
              </div>
              <div className="flex items-center justify-between">
                <span>NIT:</span>
                <span className="text-slate-300 font-mono">900989806-9</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Matrícula Mercantil:</span>
                <span className="text-[#60A5FA] font-mono">861975-51 (Cali)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Explorar</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleNavClick('inicio')}
                  className="hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('todas');
                    handleNavClick('catalogo');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Catálogo Completo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('destacados');
                    handleNavClick('catalogo');
                  }}
                  className="hover:text-amber-300 text-amber-400 transition-colors"
                >
                  Ofertas Especiales
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('beneficios')}
                  className="hover:text-white transition-colors"
                >
                  Por qué Vía Market
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('rastreo')}
                  className="hover:text-white transition-colors flex items-center gap-1 text-[#60A5FA]"
                >
                  <Truck className="w-3.5 h-3.5" />
                  Rastrear Pedido
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavClick('faq')}
                  className="hover:text-white transition-colors"
                >
                  Preguntas Frecuentes
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Categorías</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('tecnologia');
                    handleNavClick('catalogo');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Tecnología & Gadgets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('hogar');
                    handleNavClick('catalogo');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Hogar & Confort
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('accesorios');
                    handleNavClick('catalogo');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Accesorios & Ergonomía
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    onSelectCategory('moda');
                    handleNavClick('catalogo');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Moda Urbana & Morrales
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contacto Oficial</h4>
            <p className="text-xs text-slate-400">
              Canales directos de atención y despacho en Colombia:
            </p>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a 
                  href="https://wa.me/573044053729?text=Hola%20Vía%20Market" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors font-medium"
                >
                  +57 304 405 3729 (WhatsApp Comercial)
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-[#0866FF] flex-shrink-0" />
                <a 
                  href="mailto:soporte@viamarket.lat" 
                  className="hover:text-white transition-colors"
                >
                  soporte@viamarket.lat
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-[#0866FF] flex-shrink-0 mt-0.5" />
                <span>CL 22 NORTE # 89 - 792 CS 18, Cali, Valle del Cauca, Colombia</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <button 
                onClick={() => onOpenLegal('empresa')}
                className="text-[#60A5FA] hover:underline flex items-center gap-1 font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Ver Certificación Mercantil de Cali
              </button>
            </div>
          </div>

        </div>

        {/* Legal Links Bar */}
        <div className="py-6 border-b border-[#1E2D4A]/40 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-400">
            <button onClick={() => onOpenLegal('terminos')} className="hover:text-white transition-colors">
              Términos y Condiciones
            </button>
            <button onClick={() => onOpenLegal('envios')} className="hover:text-white transition-colors">
              Política de Envíos
            </button>
            <button onClick={() => onOpenLegal('garantias')} className="hover:text-white transition-colors">
              Garantías y Cambios (Ley 1480)
            </button>
            <button onClick={() => onOpenLegal('privacidad')} className="hover:text-white transition-colors">
              Habeas Data & Privacidad
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>Envíos con: Coordinadora • Interrapidísimo • Envía</span>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {currentYear} Vía Market (NIT 900989806-9). Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            <span>Hecho con dedicación para</span>
            <span className="text-white font-semibold">Colombia 🇨🇴</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
