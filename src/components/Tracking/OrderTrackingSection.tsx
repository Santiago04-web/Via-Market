import React, { useState } from 'react';
import { 
  Truck, 
  Search, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  AlertCircle,
  ExternalLink,
  Phone
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCOP } from '../../utils/format';

export const OrderTrackingSection: React.FC = () => {
  const { orders } = useCart();
  const [trackingInput, setTrackingInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    const query = trackingInput.trim().toUpperCase();
    if (!query) return;

    setHasSearched(true);
    
    // Check if it matches an order in context
    const found = orders.find(o => o.id.toUpperCase() === query);
    if (found) {
      setSearchedOrder({
        id: found.id,
        customerName: found.customer.fullName,
        city: `${found.customer.city}, ${found.customer.department}`,
        carrier: found.carrier || 'Coordinadora Mercantil',
        guideNumber: `COL-${found.id.replace('VM-', '')}92`,
        statusStep: 2, // En alistamiento / tránsito
        total: found.total,
        date: new Date(found.createdAt).toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });
    } else {
      // Demo simulated order if query starts with VM or generic lookup
      setSearchedOrder({
        id: query.startsWith('VM') ? query : `VM-${query}`,
        customerName: 'Cliente Vía Market',
        city: 'Bogotá D.C. / Cali / Medellín',
        carrier: 'Coordinadora Mercantil Nacional',
        guideNumber: `CO-${Math.floor(10000000 + Math.random() * 90000000)}`,
        statusStep: 3, // En tránsito
        total: 189900,
        date: 'Reciente'
      });
    }
  };

  const steps = [
    { label: 'Pedido Confirmado', desc: 'Pago validado y orden creada en Vía Market', icon: CheckCircle2 },
    { label: 'Preparación en Bodega', desc: 'Control de calidad y embalaje seguro en Cali', icon: Package },
    { label: 'En Ruta Nacional', desc: 'Despachado con transportadora aliada', icon: Truck },
    { label: 'En Reparto / Entregado', desc: 'Llegada a tu dirección en Colombia', icon: MapPin },
  ];

  return (
    <section id="rastreo" className="py-16 md:py-24 bg-[#071A35]/30 border-t border-[#1E2D4A] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0866FF]/10 border border-[#0866FF]/20 text-xs font-semibold text-[#60A5FA]">
            <Truck className="w-3.5 h-3.5" />
            <span>Seguimiento de Envíos en Colombia</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Rastrea el Estado de tu Pedido
          </h2>
          <p className="text-sm text-slate-400 max-w-lg mx-auto">
            Ingresa tu código de orden de Vía Market (ej. <strong>VM-COL-8921</strong> o el número recibido por WhatsApp) para conocer el estado de despacho en tiempo real.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="p-4 sm:p-6 rounded-3xl bg-[#0c1626] border border-[#1E2D4A] shadow-2xl mb-8">
          <form onSubmit={handleSearchTracking} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Ingresa tu número de orden o guía..."
                className="w-full bg-[#0F1E36] text-white text-sm placeholder-slate-400 pl-10 pr-4 py-3.5 rounded-xl border border-[#1E2D4A] focus:outline-none focus:border-[#0866FF]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 rounded-xl bg-[#0866FF] hover:bg-[#0756db] text-white font-bold text-sm shadow-glow transition-all whitespace-nowrap"
            >
              Consultar Guía
            </button>
          </form>

          {/* Quick links for recently created orders */}
          {orders.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#1E2D4A] flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400">Tus órdenes recientes:</span>
              {orders.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setTrackingInput(o.id);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#0F1E36] text-[#60A5FA] hover:text-white border border-[#1E2D4A] font-mono text-[11px]"
                >
                  {o.id}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tracking Results Card */}
        {hasSearched && searchedOrder && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1626] border border-[#0866FF]/40 shadow-glow space-y-8 animate-in fade-in duration-300">
            
            {/* Meta info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1E2D4A] gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Orden Encontrada</span>
                <h3 className="text-xl font-black text-white">{searchedOrder.id}</h3>
                <p className="text-xs text-slate-400">Destino: {searchedOrder.city}</p>
              </div>
              <div className="sm:text-right">
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  En Ruta de Despacho
                </span>
                <p className="text-xs text-slate-400 mt-1">Guía: <span className="font-mono text-white">{searchedOrder.guideNumber}</span></p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
              {steps.map((st, i) => {
                const isCompleted = i <= searchedOrder.statusStep;
                const isCurrent = i === searchedOrder.statusStep;
                const IconComponent = st.icon;

                return (
                  <div key={i} className="flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2 text-left sm:text-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                      isCompleted 
                        ? 'bg-[#0866FF] text-white shadow-glow' 
                        : 'bg-[#0F1E36] text-slate-500 border border-[#1E2D4A]'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isCompleted ? 'text-white' : 'text-slate-500'}`}>
                        {st.label}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct WhatsApp help footer */}
            <div className="p-4 rounded-2xl bg-[#0F1E36] border border-[#1E2D4A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <span className="text-slate-300">
                ¿Tienes dudas sobre la entrega de tu paquete?
              </span>
              <a
                href={`https://wa.me/573044053729?text=${encodeURIComponent(`Hola Vía Market, deseo consultar el estado de mi guía #${searchedOrder.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Consultar con un Asesor</span>
              </a>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
