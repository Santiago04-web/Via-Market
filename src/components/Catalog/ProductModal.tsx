import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShoppingBag, 
  Check, 
  Truck, 
  ShieldCheck, 
  Phone, 
  Star, 
  Sparkles, 
  Clock, 
  Plus, 
  Minus,
  Share2
} from 'lucide-react';
import { Product } from '../../types';
import { formatCOP, getEstimatedDeliveryDays } from '../../utils/format';
import { useCart } from '../../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCheckoutDirect?: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ 
  product, 
  onClose,
  onOpenCheckoutDirect
}) => {
  const { addToCart, showToast } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedDept, setSelectedDept] = useState('Valle del Cauca');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setSelectedImageIndex(0);
    setQuantity(1);
  }, [product]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleDirectWhatsApp = () => {
    const msg = `¡Hola Vía Market! Me interesa el producto: *${product.name}* (Precio: ${formatCOP(product.price)}). ¿Tienen disponibilidad inmediata para despacho a ${selectedDept}?`;
    const url = `https://wa.me/573044053729?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Mira ${product.name} en Vía Market Colombia`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Enlace del producto copiado al portapapeles', 'info');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      
      {/* Modal Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#0c1626] border border-[#1E2D4A] rounded-3xl shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar detalles del producto"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#080D18]/80 text-slate-400 hover:text-white hover:bg-[#1E2D4A] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-6 p-6 sm:p-8 bg-[#071A35]/30 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#1E2D4A]">
            
            {/* Main Featured Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#071A35] border border-[#1E2D4A] mb-4">
              <img 
                src={product.images[selectedImageIndex] || product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {product.discountPercentage && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-black bg-[#0866FF] text-white shadow-md">
                    AHORRAS {product.discountPercentage}%
                  </span>
                )}
                {product.isNew && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500 text-white shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    NUEVO
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImageIndex === idx 
                        ? 'border-[#0866FF] shadow-glow scale-105' 
                        : 'border-[#1E2D4A] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Legal Guarantee Banner */}
            <div className="mt-6 p-3.5 rounded-xl bg-[#0F1E36]/80 border border-[#1E2D4A] flex items-center gap-3 text-xs text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Garantía oficial Vía Market</p>
                <p className="text-[11px] text-slate-400">Protección legal en Colombia bajo Ley 1480 de 2011.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Information, Pricing & Actions */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div>
              {/* Category & Share */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#60A5FA]">
                  {product.categoryLabel}
                </span>
                <button
                  onClick={handleShare}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Compartir
                </button>
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-3">
                {product.name}
              </h1>

              {/* Ratings */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-white">{product.rating}</span>
                  <span className="text-xs text-slate-400">({product.reviewsCount} opiniones en Colombia)</span>
                </div>
              )}

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-[#0F1E36] border border-[#1E2D4A] mb-6 flex items-baseline justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    {formatCOP(product.price)}
                  </span>
                  {product.originalPrice && (
                    <div className="text-xs text-slate-400 line-through mt-0.5">
                      Precio regular: {formatCOP(product.originalPrice)}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-bold text-emerald-300">
                    En stock nacional
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Descripción del producto</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-2 mb-6">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Características destacadas</h4>
                <ul className="space-y-1.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#0866FF] mt-0.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Colombian Shipping Calculator Preview */}
              <div className="p-3.5 rounded-xl bg-[#080D18] border border-[#1E2D4A] mb-6 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#0866FF]" />
                    Calcular entrega a:
                  </span>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="bg-[#0F1E36] text-white text-xs px-2.5 py-1 rounded-lg border border-[#1E2D4A] focus:outline-none cursor-pointer"
                  >
                    <option value="Valle del Cauca">Valle del Cauca (Cali)</option>
                    <option value="Bogotá D.C.">Bogotá D.C.</option>
                    <option value="Antioquia">Antioquia (Medellín)</option>
                    <option value="Atlántico">Atlántico (Barranquilla)</option>
                    <option value="Santander">Santander (Bucaramanga)</option>
                    <option value="Cundinamarca">Cundinamarca</option>
                    <option value="Eje Cafetero">Eje Cafetero</option>
                    <option value="Otro departamento">Resto del país</option>
                  </select>
                </div>
                <p className="text-[11px] text-emerald-400 font-medium">
                  ⚡ Tiempo estimado: {getEstimatedDeliveryDays(selectedDept)}
                </p>
              </div>

            </div>

            {/* Bottom Actions: Quantity + Add to Cart + WhatsApp */}
            <div className="pt-4 border-t border-[#1E2D4A] space-y-3">
              <div className="flex items-center gap-3">
                
                {/* Quantity Controls */}
                <div className="flex items-center bg-[#0F1E36] border border-[#1E2D4A] rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-30"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-white"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-98 ${
                    isAdded 
                      ? 'bg-emerald-500 text-white shadow-lg' 
                      : 'bg-[#0866FF] hover:bg-[#0756db] text-white shadow-glow'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>¡Agregado al Carrito!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Agregar al Carrito</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Purchase Action */}
              <button
                onClick={handleDirectWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-semibold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Pedir asesoría directa de este producto por WhatsApp</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
