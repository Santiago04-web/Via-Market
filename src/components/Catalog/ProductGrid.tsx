import React, { useMemo, useState } from 'react';
import { 
  Filter, 
  ArrowUpDown, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  X,
  SlidersHorizontal
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import { PRODUCTS, CATEGORIES, DEMO_NOTICE } from '../../data/products';
import { Product, SortOption } from '../../types';

interface ProductGridProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onQuickView,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('relevancia');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Category filter
    if (selectedCategory === 'destacados') {
      result = result.filter(p => p.isFeatured);
    } else if (selectedCategory !== 'todas') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'menor-precio') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'mayor-precio') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'mayor-descuento') {
      result.sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalogo" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0866FF]/10 border border-[#0866FF]/20 text-xs font-semibold text-[#60A5FA] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Colección Oficial 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explora Nuestro Catálogo
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Productos seleccionados bajo altos estándares de calidad, funcionalidad y durabilidad para el mercado colombiano.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              Ordenar por:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Ordenar productos"
              className="bg-[#0F1E36] text-slate-200 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl border border-[#1E2D4A] focus:outline-none focus:border-[#0866FF] transition-all cursor-pointer"
            >
              <option value="relevancia">Más destacados y relevantes</option>
              <option value="menor-precio">Menor precio primero</option>
              <option value="mayor-precio">Mayor precio primero</option>
              <option value="mayor-descuento">Mayor porcentaje de descuento</option>
            </select>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#0866FF] text-white shadow-glow border border-[#0866FF]'
                    : 'bg-[#0F1E36]/80 text-slate-300 hover:text-white hover:bg-[#1E2D4A] border border-[#1E2D4A]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#1E2D4A] text-slate-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Search Notification if search query is present */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between p-3.5 mb-8 rounded-xl bg-[#0F1E36] border border-[#0866FF]/40 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <Search className="w-4 h-4 text-[#0866FF]" />
              <span>
                Mostrando resultados para: <strong className="text-white font-bold">"{searchQuery}"</strong>
              </span>
            </div>
            <button
              onClick={onClearSearch}
              className="text-xs text-[#60A5FA] hover:text-white flex items-center gap-1 font-semibold"
            >
              <X className="w-4 h-4" />
              Borrar filtro
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-3xl bg-[#0c1626] border border-[#1E2D4A]">
            <SlidersHorizontal className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">
              No encontramos productos en esta búsqueda
            </h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
              Intenta cambiar la categoría o buscar con otros términos como "auriculares", "smartwatch" o "hogar".
            </p>
            <button
              onClick={() => {
                onSelectCategory('todas');
                onClearSearch();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#0866FF] hover:bg-[#0654d6] text-white text-xs font-semibold shadow-glow transition-all"
            >
              Ver todos los productos
            </button>
          </div>
        )}

        {/* Architecture & Demo Catalog Note */}
        <div className="mt-12 p-4 rounded-2xl bg-[#071A35]/60 border border-[#1E2D4A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              <strong>Precios en COP actualizados:</strong> Despachos directos desde bodega aliada en Cali hacia todo el territorio nacional.
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Inventario sincronizado para venta online
          </span>
        </div>

      </div>
    </section>
  );
};
