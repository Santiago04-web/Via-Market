import React, { useState } from 'react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Phone, 
  CreditCard, 
  Truck, 
  ArrowLeft, 
  ArrowRight, 
  AlertCircle, 
  Copy, 
  CheckCheck,
  Building2,
  FileText
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CustomerDetails, Order } from '../../types';
import { formatCOP, buildWhatsAppOrderLink, getEstimatedDeliveryDays } from '../../utils/format';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { 
    cart, 
    subtotal, 
    discount, 
    shippingCost, 
    total, 
    createOrder,
    showToast 
  } = useCart();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    documentType: 'CC',
    documentNumber: '',
    department: 'Valle del Cauca',
    city: 'Cali',
    address: '',
    neighborhood: '',
    additionalInfo: '',
    paymentMethod: 'whatsapp'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});

  if (!isOpen) return null;

  const validateDetails = () => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Ingresa tu nombre completo';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Ingresa un correo electrónico válido';
    if (!formData.phone.trim() || formData.phone.length < 10) newErrors.phone = 'Ingresa un celular de contacto (10 dígitos)';
    if (!formData.documentNumber.trim()) newErrors.documentNumber = 'Ingresa tu número de documento';
    if (!formData.city.trim()) newErrors.city = 'Ingresa la ciudad o municipio';
    if (!formData.address.trim()) newErrors.address = 'Ingresa la dirección exacta de entrega';
    if (!formData.neighborhood.trim()) newErrors.neighborhood = 'Ingresa el barrio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      setStep('payment');
    }
  };

  const handleFinalizeOrder = () => {
    const orderId = `VM-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: [...cart],
      customer: { ...formData },
      subtotal,
      discount,
      shippingCost,
      total,
      status: 'recibido',
      carrier: 'Transportadora Nacional (Coordinadora / Interrapidísimo)'
    };

    setConfirmedOrder(newOrder);
    createOrder(newOrder);
    setStep('confirmation');

    // If WhatsApp method selected, prepare and open link
    if (formData.paymentMethod === 'whatsapp') {
      const waLink = buildWhatsAppOrderLink({
        phone: '573044053729',
        orderId: orderId,
        customerName: formData.fullName,
        city: `${formData.city}, ${formData.department}`,
        items: cart.map(i => ({ name: i.product.name, quantity: i.quantity, price: i.product.price })),
        total: total
      });
      window.open(waLink, '_blank');
    }
  };

  const copyOrderId = () => {
    if (confirmedOrder) {
      navigator.clipboard.writeText(confirmedOrder.id);
      setCopiedOrderId(true);
      showToast('Número de orden copiado', 'info');
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#0c1626] border border-[#1E2D4A] rounded-3xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#1E2D4A] bg-[#080D18] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0866FF]/20 flex items-center justify-center text-[#0866FF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Finalizar Compra Segura</h3>
              <p className="text-[11px] text-slate-400">Vía Market • Despacho oficial para Colombia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de compra"
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#1E2D4A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Breadcrumb */}
        {step !== 'confirmation' && (
          <div className="flex items-center justify-around bg-[#071A35]/50 px-6 py-3 border-b border-[#1E2D4A] text-xs font-semibold">
            <span className={`flex items-center gap-1.5 ${step === 'details' ? 'text-[#0866FF]' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'details' ? 'bg-[#0866FF] text-white' : 'bg-[#1E2D4A] text-slate-400'}`}>
                1
              </span>
              Datos y Envío
            </span>
            <span className="text-slate-600">→</span>
            <span className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-[#0866FF]' : 'text-slate-400'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 'payment' ? 'bg-[#0866FF] text-white' : 'bg-[#1E2D4A] text-slate-400'}`}>
                2
              </span>
              Método de Pago
            </span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Customer Details & Shipping Form */}
          {step === 'details' && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nombre y Apellidos *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ej. Carlos Arturo Gómez"
                    className={`w-full bg-[#0F1E36] text-white text-xs px-3.5 py-2.5 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-[#1E2D4A]'} focus:outline-none focus:border-[#0866FF]`}
                  />
                  {errors.fullName && <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ejemplo@correo.com"
                    className={`w-full bg-[#0F1E36] text-white text-xs px-3.5 py-2.5 rounded-xl border ${errors.email ? 'border-red-500' : 'border-[#1E2D4A]'} focus:outline-none focus:border-[#0866FF]`}
                  />
                  {errors.email && <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Número Celular (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="300 123 4567"
                    className={`w-full bg-[#0F1E36] text-white text-xs px-3.5 py-2.5 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-[#1E2D4A]'} focus:outline-none focus:border-[#0866FF]`}
                  />
                  {errors.phone && <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>}
                </div>

                {/* Document ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Tipo y Documento (Transportadora/Factura) *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.documentType}
                      onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                      className="bg-[#0F1E36] text-white text-xs px-2 py-2.5 rounded-xl border border-[#1E2D4A] focus:outline-none"
                    >
                      <option value="CC">CC</option>
                      <option value="CE">CE</option>
                      <option value="NIT">NIT</option>
                      <option value="Pasaporte">PAS</option>
                    </select>
                    <input
                      type="text"
                      value={formData.documentNumber}
                      onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                      placeholder="Número de cédula"
                      className={`flex-1 bg-[#0F1E36] text-white text-xs px-3.5 py-2.5 rounded-xl border ${errors.documentNumber ? 'border-red-500' : 'border-[#1E2D4A]'} focus:outline-none focus:border-[#0866FF]`}
                    />
                  </div>
                  {errors.documentNumber && <p className="text-[11px] text-red-400 mt-1">{errors.documentNumber}</p>}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Departamento de Colombia *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full bg-[#0F1E36] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#1E2D4A] focus:outline-none cursor-pointer"
                  >
                    <option value="Valle del Cauca">Valle del Cauca</option>
                    <option value="Bogotá D.C.">Bogotá D.C.</option>
                    <option value="Antioquia">Antioquia</option>
                    <option value="Atlántico">Atlántico</option>
                    <option value="Santander">Santander</option>
                    <option value="Cundinamarca">Cundinamarca</option>
                    <option value="Risaralda">Risaralda</option>
                    <option value="Caldas">Caldas</option>
                    <option value="Quindío">Quindío</option>
                    <option value="Bolívar">Bolívar</option>
                    <option value="Tolima">Tolima</option>
                    <option value="Huila">Huila</option>
                    <option value="Norte de Santander">Norte de Santander</option>
                    <option value="Nariño">Nariño</option>
                    <option value="Meta">Meta</option>
                    <option value="Otro departamento">Otro departamento</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Ciudad o Municipio *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ej. Cali, Bogotá, Medellín..."
                    className={`w-full bg-[#0F1E36] text-white text-xs px-3.5 py-2.5 rounded-xl border ${errors.city ? 'border-red-500' : 'border-[#1E2D4A]'} focus:outline-none focus:border-[#0866FF]`}
                  />
                  {errors.city && <p className="text-[11px] text-red-400 mt-1">{errors.city}</p>}
                </div>

              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Dirección Exacta de Entrega *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ej. Calle 22 Norte # 89-792 Casa 18"
                  className={`w-full bg-[#0F1E36] text-white text-xs px-3.5 py-2.5 rounded-xl border ${errors.address ? 'border-red-500' : 'border-[#1E2D4A]'} focus:outline-none focus:border-[#0866FF]`}
                />
                {errors.address && <p className="text-[11px] text-red-400 mt-1">{errors.address}</p>}
              </div>

              {/* Neighborhood */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Barrio o Sector *
                  </label>
                  <input
                    type="text"
                    value={formData.neighborhood}
                    onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                    placeholder="Ej. Granada / Versalles"
                    className={`w-full bg-[#0F1E36] text-white text-xs px-3.5 py-2.5 rounded-xl border ${errors.neighborhood ? 'border-red-500' : 'border-[#1E2D4A]'} focus:outline-none focus:border-[#0866FF]`}
                  />
                  {errors.neighborhood && <p className="text-[11px] text-red-400 mt-1">{errors.neighborhood}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Instrucciones adicionales (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    placeholder="Ej. Dejar en portería, apto 402"
                    className="w-full bg-[#0F1E36] text-white text-xs px-3.5 py-2.5 rounded-xl border border-[#1E2D4A] focus:outline-none focus:border-[#0866FF]"
                  />
                </div>
              </div>

              {/* Delivery estimate note */}
              <div className="p-3 rounded-xl bg-[#071A35] border border-[#1E2D4A] text-xs text-slate-300 flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0866FF] flex-shrink-0" />
                <span>
                  Entrega estimada para {formData.department}: <strong className="text-white">{getEstimatedDeliveryDays(formData.department)}</strong>
                </span>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400">Total a pagar: <strong className="text-white">{formatCOP(total)}</strong></span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0866FF] hover:bg-[#0756db] text-white font-bold text-xs shadow-glow transition-all"
                >
                  <span>Continuar al Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

          {/* STEP 2: Realistic Payment Choice */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Selecciona tu método de pago</h4>
                <p className="text-xs text-slate-400">
                  Para tu comodidad en Colombia, ofrecemos soporte directo por WhatsApp o pasarelas seguras.
                </p>
              </div>

              {/* Payment Methods Options */}
              <div className="space-y-3">
                
                {/* Method 1: WhatsApp Oficial Directo */}
                <label 
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'whatsapp' 
                      ? 'bg-[#0866FF]/10 border-[#0866FF] shadow-glow' 
                      : 'bg-[#0F1E36]/40 border-[#1E2D4A] hover:border-slate-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="whatsapp"
                    checked={formData.paymentMethod === 'whatsapp'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
                    className="mt-1 text-[#0866FF]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-400" />
                        Confirmación Directa por WhatsApp Oficial (Recomendado)
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Atención Inmediata
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Se generará tu pedido con código y se abrirá WhatsApp (+57 304 405 3729) con los datos organizados para coordinar la forma de pago (Nequi, Daviplata, Bancolombia o transferencia) y el despacho.
                    </p>
                  </div>
                </label>

                {/* Method 2: Pasarela Digital Wompi / PSE */}
                <label 
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'wompi_pse' 
                      ? 'bg-[#0866FF]/10 border-[#0866FF] shadow-glow' 
                      : 'bg-[#0F1E36]/40 border-[#1E2D4A] hover:border-slate-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wompi_pse"
                    checked={formData.paymentMethod === 'wompi_pse'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'wompi_pse' })}
                    className="mt-1 text-[#0866FF]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#0866FF]" />
                        PSE / Tarjetas de Crédito / Wompi Bancolombia
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 bg-[#1E2D4A] px-2 py-0.5 rounded-full">
                        En línea
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Paga de forma electrónica con tarjeta Visa, MasterCard, Débito o botón Bancolombia.
                    </p>
                    
                    {/* Honest Developer Note when selected */}
                    {formData.paymentMethod === 'wompi_pse' && (
                      <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200">
                        <p className="font-semibold flex items-center gap-1.5 mb-1">
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                          Nota de Integración Técnica:
                        </p>
                        <p className="text-[11px] leading-relaxed text-amber-300/90">
                          La interfaz está lista. Para procesar transacciones bancarias reales en producción, se requiere configurar la llave pública de comercio (<code className="bg-black/40 px-1 py-0.5 rounded text-white">VITE_WOMPI_PUBLIC_KEY</code> o credenciales de pasarela). Por seguridad de tus fondos y según los lineamientos éticos, los pagos continuarán coordinándose vía WhatsApp o transferencia bancaria directa certificada.
                        </p>
                      </div>
                    )}
                  </div>
                </label>

                {/* Method 3: Pago Contra Entrega */}
                <label 
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    formData.paymentMethod === 'contra_entrega' 
                      ? 'bg-[#0866FF]/10 border-[#0866FF] shadow-glow' 
                      : 'bg-[#0F1E36]/40 border-[#1E2D4A] hover:border-slate-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="contra_entrega"
                    checked={formData.paymentMethod === 'contra_entrega'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'contra_entrega' })}
                    className="mt-1 text-[#0866FF]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        <Truck className="w-4 h-4 text-cyan-400" />
                        Pago Contra Entrega (Paga al recibir en tu puerta)
                      </span>
                      <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/30">
                        Sujeto a cobertura
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Pagas en efectivo al transportador de la empresa aliada al momento de recibir el paquete en tu dirección. Válido en ciudades principales.
                    </p>
                  </div>
                </label>

              </div>

              {/* Order Summary Recap */}
              <div className="p-4 rounded-2xl bg-[#0F1E36] border border-[#1E2D4A] space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Productos ({cart.reduce((a, b) => a + b.quantity, 0)} artículos):</span>
                  <span>{formatCOP(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Descuento aplicado:</span>
                    <span>-{formatCOP(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>Envío a {formData.city}:</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-400">GRATIS</strong> : formatCOP(shippingCost)}</span>
                </div>
                <div className="pt-2 border-t border-[#1E2D4A] flex justify-between text-sm font-black text-white">
                  <span>Total Final en COP:</span>
                  <span className="text-[#0866FF]">{formatCOP(total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0F1E36] hover:bg-[#1E2D4A] text-slate-300 text-xs font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Volver a datos
                </button>

                <button
                  type="button"
                  onClick={handleFinalizeOrder}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#0866FF] hover:bg-[#0756db] text-white font-bold text-xs shadow-glow transition-all"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Confirmar y Despachar Pedido</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Order Confirmed & Receipt Summary */}
          {step === 'confirmation' && confirmedOrder && (
            <div className="text-center py-4 space-y-5">
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white">¡Pedido Registrado con Éxito!</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Tu orden ha sido generada en el sistema de Vía Market Colombia.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-4 rounded-2xl bg-[#071A35] border border-[#1E2D4A] inline-block w-full max-w-md text-left">
                <div className="flex items-center justify-between pb-3 border-b border-[#1E2D4A]">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold">Código de Pedido:</span>
                    <p className="text-lg font-black text-[#0866FF] tracking-wider">{confirmedOrder.id}</p>
                  </div>
                  <button
                    onClick={copyOrderId}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0F1E36] hover:bg-[#1E2D4A] text-xs font-medium text-slate-200 border border-[#1E2D4A]"
                  >
                    {copiedOrderId ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedOrderId ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>

                <div className="pt-3 space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cliente:</span>
                    <span className="font-semibold text-white">{confirmedOrder.customer.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Destino:</span>
                    <span className="font-semibold text-white">{confirmedOrder.customer.city}, {confirmedOrder.customer.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Dirección:</span>
                    <span className="font-semibold text-white">{confirmedOrder.customer.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total:</span>
                    <span className="font-bold text-white">{formatCOP(confirmedOrder.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tiempo de entrega:</span>
                    <span className="font-semibold text-emerald-400">{getEstimatedDeliveryDays(confirmedOrder.customer.department)}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps Card */}
              <div className="p-4 rounded-2xl bg-[#0F1E36]/80 border border-[#1E2D4A] text-left text-xs text-slate-300 space-y-2 max-w-md mx-auto">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#0866FF]" />
                  ¿Qué sucede a continuación?
                </p>
                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                  <li>Nuestro asesor verificará existencias en la bodega de Cali.</li>
                  <li>Recibirás un mensaje de WhatsApp para validar los datos de guía.</li>
                  <li>Se entrega a la transportadora aliada con número de seguimiento.</li>
                </ol>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/573044053729?text=${encodeURIComponent(`Hola Vía Market, acabé de registrar mi orden #${confirmedOrder.id} a nombre de ${confirmedOrder.customer.fullName}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Hablar con un Asesor en WhatsApp</span>
                </a>

                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl bg-[#0F1E36] hover:bg-[#1E2D4A] text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cerrar y volver a la tienda
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
