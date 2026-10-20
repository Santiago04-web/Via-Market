import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Truck, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCOP } from '../../utils/format';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    discount, 
    shippingCost, 
    total, 
    totalItems,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setIsCheckoutOpen
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Close with ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  const freeShippingThreshold = 150000;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c1626] border-l border-[#1E2D4A] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#1E2D4A] flex items-center justify-between bg-[#080D18]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0866FF]" />
              <h2 className="text-base font-bold text-white">Carrito de Compras</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#1E2D4A] text-slate-300 font-semibold">
                {totalItems}
              </span>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              aria-label="Cerrar carrito"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E2D4A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="p-4 bg-[#071A35]/60 border-b border-[#1E2D4A]">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-[#0866FF]" />
                {subtotal >= freeShippingThreshold ? (
                  <strong className="text-emerald-400">¡Felicidades! Tienes Envío Gratis 🎉</strong>
                ) : (
                  <span>
                    Te faltan <strong className="text-white">{formatCOP(amountNeededForFreeShipping)}</strong> para <strong>Envío Gratis</strong>
                  </span>
                )}
              </span>
              <span className="text-[11px] font-bold text-[#60A5FA]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#1E2D4A] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-[#0866FF] to-[#00D2FF] h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Item List / Empty State */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#0F1E36] border border-[#1E2D4A] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-base font-bold text-white mb-1">Tu carrito está vacío</h3>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  Aún no has añadido productos. Explora nuestras ofertas en tecnología, hogar y accesorios.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#0866FF] hover:bg-[#0654d6] text-white text-xs font-bold shadow-glow transition-all"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-[#0F1E36]/60 border border-[#1E2D4A] hover:border-[#0866FF]/30 transition-all"
                >
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-xl bg-[#071A35] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          aria-label="Eliminar producto"
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-extrabold text-[#0866FF] mt-1">
                        {formatCOP(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center bg-[#0c1626] border border-[#1E2D4A] rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs text-slate-300 font-semibold">
                        Subtotal: {formatCOP(item.product.price * item.quantity)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Checkout & Summary Footer */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#1E2D4A] bg-[#080D18] space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Cupón aplicado: <strong>{appliedPromo}</strong></span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-red-400 hover:underline font-semibold"
                    >
                      Remover
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoMessage(null);
                      }}
                      placeholder="Cupón (ej: VIAMARKET10)"
                      className="flex-1 bg-[#0F1E36] text-xs text-white placeholder-slate-400 px-3 py-2 rounded-xl border border-[#1E2D4A] focus:outline-none focus:border-[#0866FF]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#1E2D4A] hover:bg-[#0866FF] text-white text-xs font-semibold transition-colors"
                    >
                      Aplicar
                    </button>
                  </form>
                )}
                {promoMessage && (
                  <p className={`text-[11px] mt-1.5 ${promoMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal productos</span>
                  <span className="font-semibold text-white">{formatCOP(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Descuento cupón</span>
                    <span>-{formatCOP(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Costo de envío estimado</span>
                  <span>{shippingCost === 0 ? <strong className="text-emerald-400">GRATIS</strong> : formatCOP(shippingCost)}</span>
                </div>
                <div className="pt-2 border-t border-[#1E2D4A] flex justify-between text-base font-extrabold text-white">
                  <span>Total estimado</span>
                  <span className="text-[#0866FF]">{formatCOP(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#0866FF] hover:bg-[#0756db] text-white font-bold text-sm shadow-glow transition-all active:scale-98"
              >
                <span>Tramitar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Compra protegida • Envíos a todo el país</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
