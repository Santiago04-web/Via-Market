import React from 'react';
import { Truck, ShieldCheck, Headphones, RefreshCw } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const benefits = [
    {
      icon: <Truck className="w-6 h-6 text-[#0866FF]" />,
      title: 'Envíos a Toda Colombia',
      description: 'Despachos garantizados a ciudades principales y municipios con transportadoras aliadas certificadas.',
      badge: 'Cobertura Nacional'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: 'Compra y Pago Seguro',
      description: 'Transacciones encriptadas y protegidas. Pagos vía PSE, tarjetas o confirmación directa por WhatsApp.',
      badge: 'Transacción Segura'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-amber-400" />,
      title: 'Garantía y Confianza',
      description: 'Todos nuestros productos cuentan con garantía directa según los lineamientos del Estatuto del Consumidor.',
      badge: 'Ley 1480'
    },
    {
      icon: <Headphones className="w-6 h-6 text-cyan-400" />,
      title: 'Atención Directa en Colombia',
      description: 'Canal humano de soporte comercial por WhatsApp (+57 304 405 3729) con base en Cali, Valle.',
      badge: 'Soporte Local'
    }
  ];

  return (
    <section className="py-12 border-y border-[#1E2D4A]/50 bg-[#071A35]/40 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((item, index) => (
            <div 
              key={index}
              className="p-5 rounded-2xl bg-[#0c1626]/80 border border-[#1E2D4A] hover:border-[#0866FF]/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F1E36] border border-[#1E2D4A] flex items-center justify-center group-hover:scale-105 group-hover:border-[#0866FF]/40 transition-all">
                  {item.icon}
                </div>
                <span className="text-[10px] font-semibold text-slate-400 bg-[#0F1E36] px-2.5 py-1 rounded-full border border-[#1E2D4A]">
                  {item.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#60A5FA] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
