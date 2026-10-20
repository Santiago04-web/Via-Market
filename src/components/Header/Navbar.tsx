import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingBag, 
  Search, 
  X, 
  Menu, 
  ChevronRight, 
  Phone, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../data/products';
import { formatCOP } from '../../utils/format';
import { Product } from '../../types';

interface NavbarProps {
  selectedCategory?: string;
  onSelectCategory: (cat: string) => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  selectedCategory,
  onSelectCategory, 
  onSearchChange,
  searchQuery 
}) => {
  const { totalItems, setIsCartOpen, setSelectedProduct } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle instant search results
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const q = searchQuery.toLowerCase();
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleSelectProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (anchorId: string, category?: string) => {
    setIsMobileMenuOpen(false);
    if (category) {
      onSelectCategory(category);
    }
    const elem = document.getElementById(anchorId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Colombian Trust Bar */}
      <div className="bg-[#071A35] text-xs py-1.5 px-4 text-slate-300 border-b border-[#1E2D4A]/50 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-white font-medium">Vía Market Colombia:</span>
            <span className="hidden sm:inline text-slate-300">Envíos a todo el país • Compra 100% segura</span>
            <span className="sm:hidden text-slate-300">Envíos a todo el país</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <a 
              href="https://wa.me/573044053729?text=Hola%20Vía%20Market,%20quisiera%20asesoría%20sobre%20un%20producto" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white flex items-center gap-1.5 transition-colors text-emerald-400"
            >
              <Phone className="w-3 h-3" />
              <span className="hidden md:inline">+57 304 405 3729</span>
              <span className="md:hidden">WhatsApp</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-slate-400">NIT 900989806-9</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#080D18]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-[#1E2D4A]' 
            : 'bg-[#080D18]/85 backdrop-blur-sm border-b border-[#1E2D4A]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo Brand */}
            <a 
              href="#inicio" 
              onClick={(e) => { e.preventDefault(); handleNavClick('inicio'); }}
              className="flex items-center gap-3.5 group flex-shrink-0"
            >
              <div className="relative w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-[#0866FF] via-[#00D2FF] to-white shadow-glow group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/Perfil.jpeg" 
                  alt="Vía Market Logo" 
                  className="w-full h-full object-cover rounded-full bg-white"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-1">
                  VÍA <span className="text-[#0866FF]">MARKET</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                  Tu Tienda Online
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
              <a 
                href="#inicio" 
                onClick={(e) => { e.preventDefault(); handleNavClick('inicio'); }}
                className="hover:text-white transition-colors py-1 relative hover:after:w-full after:transition-all after:duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0866FF]"
              >
                Inicio
              </a>
              <a 
                href="#catalogo" 
                onClick={(e) => { e.preventDefault(); handleNavClick('catalogo', 'todas'); }}
                className="hover:text-white transition-colors py-1 relative hover:after:w-full after:transition-all after:duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0866FF]"
              >
                Catálogo
              </a>
              <a 
                href="#catalogo" 
                onClick={(e) => { e.preventDefault(); handleNavClick('catalogo', 'destacados'); }}
                className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors py-1"
              >
                <Tag className="w-3.5 h-3.5" />
                Ofertas
              </a>
              <a 
                href="#catalogo" 
                onClick={(e) => { e.preventDefault(); handleNavClick('catalogo', 'tecnologia'); }}
                className="hover:text-white transition-colors py-1"
              >
                Tecnología
              </a>
              <a 
                href="#beneficios" 
                onClick={(e) => { e.preventDefault(); handleNavClick('beneficios'); }}
                className="hover:text-white transition-colors py-1"
              >
                Por qué Vía Market
              </a>
              <a 
                href="#rastreo" 
                onClick={(e) => { e.preventDefault(); handleNavClick('rastreo'); }}
                className="hover:text-white transition-colors py-1 flex items-center gap-1 text-slate-300"
              >
                <Truck className="w-3.5 h-3.5 text-[#0866FF]" />
                Rastrear Pedido
              </a>
            </div>

            {/* Right Side: Search Bar & Cart Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              
              {/* Desktop Expandable Search Input */}
              <div className="relative hidden md:block w-52 lg:w-64">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full bg-[#0F1E36]/80 text-sm text-white placeholder-slate-400 pl-9 pr-8 py-2 rounded-full border border-[#1E2D4A] focus:outline-none focus:border-[#0866FF] focus:ring-1 focus:ring-[#0866FF] transition-all"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
                  {searchQuery && (
                    <button 
                      onClick={() => onSearchChange('')}
                      className="absolute right-3 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Instant Search Results Dropdown */}
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#0C1626] border border-[#1E2D4A] rounded-xl shadow-2xl p-2 z-50 overflow-hidden">
                    <div className="text-[11px] font-semibold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
                      Resultados encontrados ({searchResults.length})
                    </div>
                    {searchResults.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleSelectProduct(item)}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#1E2D4A]/60 transition-colors text-left"
                      >
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-10 h-10 object-cover rounded-md flex-shrink-0" 
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-white truncate">{item.name}</p>
                          <p className="text-xs font-bold text-[#0866FF]">{formatCOP(item.price)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Search Button */}
              <button 
                onClick={handleOpenSearch}
                aria-label="Buscar productos"
                className="md:hidden p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-[#1E2D4A]/50 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Ver carrito de compras"
                className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0866FF] hover:bg-[#0756db] text-white shadow-glow transition-all duration-200 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline text-xs font-semibold">Carrito</span>
                {totalItems > 0 && (
                  <span className="flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold bg-white text-[#0866FF] rounded-full shadow">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Abrir menú"
                className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-[#1E2D4A]/50 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Instant Search Fullscreen Bar (Overlay) */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#080D18]/95 backdrop-blur-md p-4">
          <div className="flex items-center gap-3 border-b border-[#1E2D4A] pb-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="¿Qué producto buscas hoy?..."
              className="flex-1 bg-transparent text-white placeholder-slate-400 outline-none text-base"
            />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-4">
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Productos encontrados
                </p>
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectProduct(item)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl bg-[#0F1E36]/50 border border-[#1E2D4A] text-left"
                  >
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-12 h-12 object-cover rounded-lg flex-shrink-0" 
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-xs text-slate-400">{item.categoryLabel}</p>
                      <p className="text-sm font-bold text-[#0866FF]">{formatCOP(item.price)}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                ))}
              </div>
            ) : searchQuery.length > 1 ? (
              <p className="text-slate-400 text-sm text-center py-8">
                No encontramos productos que coincidan con "{searchQuery}"
              </p>
            ) : (
              <div className="text-slate-400 text-xs space-y-2 py-4">
                <p className="font-semibold text-slate-300">Búsquedas populares:</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['Audífonos ANC', 'Smartwatch', 'Soporte Laptop', 'Termo Digital', 'Lámpara Qi'].map((term) => (
                    <button
                      key={term}
                      onClick={() => onSearchChange(term)}
                      className="px-3 py-1.5 rounded-full bg-[#1E2D4A] text-slate-200 text-xs hover:bg-[#0866FF] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[116px] bottom-0 z-40 bg-[#080D18]/95 backdrop-blur-xl border-t border-[#1E2D4A] flex flex-col justify-between p-6 overflow-y-auto">
          <div className="space-y-4">
            <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Navegación
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => handleNavClick('inicio')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0F1E36]/40 hover:bg-[#0F1E36] text-white font-medium text-left"
              >
                <span>Inicio</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('catalogo', 'todas')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0F1E36]/40 hover:bg-[#0F1E36] text-white font-medium text-left"
              >
                <span>Catálogo Completo</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('catalogo', 'destacados')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0F1E36]/40 hover:bg-[#0F1E36] text-amber-300 font-medium text-left"
              >
                <span className="flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Ofertas Especiales
                </span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={() => handleNavClick('catalogo', 'tecnologia')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0F1E36]/40 hover:bg-[#0F1E36] text-white font-medium text-left"
              >
                <span>Tecnología & Gadgets</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('catalogo', 'hogar')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0F1E36]/40 hover:bg-[#0F1E36] text-white font-medium text-left"
              >
                <span>Hogar & Smart Living</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('beneficios')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0F1E36]/40 hover:bg-[#0F1E36] text-white font-medium text-left"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#0866FF]" />
                  Por qué comprar en Vía Market
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleNavClick('rastreo')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-[#0F1E36]/40 hover:bg-[#0F1E36] text-white font-medium text-left"
              >
                <span className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  Rastrear mi pedido
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Colombian Customer Care in Mobile Menu */}
          <div className="pt-6 border-t border-[#1E2D4A] space-y-3">
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#071A35] to-[#0F1E36] border border-[#1E2D4A]">
              <p className="text-xs font-semibold text-white mb-1">¿Necesitas asesoría personalizada?</p>
              <p className="text-xs text-slate-400 mb-3">Habla en tiempo real con nuestro equipo en Colombia.</p>
              <a
                href="https://wa.me/573044053729?text=Hola%20Vía%20Market,%20quisiera%20ayuda%20con%20una%20compra"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                Contactar por WhatsApp
              </a>
            </div>
            <p className="text-[11px] text-slate-500 text-center">
              Vía Market • NIT 900989806-9 • Cali, Colombia
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
