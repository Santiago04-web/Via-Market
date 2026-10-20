import React, { useState } from 'react';
import { ShoppingBag, Eye, Check, Star, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { formatCOP } from '../../utils/format';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col rounded-2xl bg-[#0c1626] border border-[#1E2D4A] hover:border-[#0866FF]/50 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-glow hover:-translate-y-1"
    >
      {/* Product Image Frame */}
      <div className="relative w-full aspect-square bg-[#071A35] overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out" 
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c1626] via-transparent to-black/20 opacity-60 pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercentage && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-[#0866FF] text-white shadow-md">
              -{product.discountPercentage}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-500 text-white shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              NUEVO
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-[#080D18] font-bold text-xs shadow-xl hover:bg-slate-100 transition-all transform hover:scale-105"
          >
            <Eye className="w-4 h-4 text-[#0866FF]" />
            Ver detalles
          </button>
        </div>
      </div>

      {/* Product Info Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#60A5FA]">
              {product.categoryLabel}
            </span>
            {product.rating && (
              <div className="flex items-center gap-1 text-amber-400 font-semibold text-[11px]">
                <Star className="w-3 h-3 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-500 text-[10px]">({product.reviewsCount})</span>
              </div>
            )}
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2 mb-2 group-hover:text-[#60A5FA] transition-colors">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="pt-3 border-t border-[#1E2D4A] flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-base sm:text-lg font-extrabold text-white">
              {formatCOP(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-slate-400 line-through">
                {formatCOP(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            aria-label={`Agregar ${product.name} al carrito`}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 active:scale-95 ${
              isAdded 
                ? 'bg-emerald-500 text-white shadow-md' 
                : 'bg-[#0866FF] hover:bg-[#0756db] text-white shadow-glow'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">Listo</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Agregar</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
