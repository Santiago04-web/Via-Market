import React, { useState } from 'react';
import { Navbar } from './components/Header/Navbar';
import { Hero } from './components/Hero/Hero';
import { TrustBadges } from './components/Features/TrustBadges';
import { ProductGrid } from './components/Catalog/ProductGrid';
import { WhyUsSection } from './components/Trust/WhyUsSection';
import { OrderTrackingSection } from './components/Tracking/OrderTrackingSection';
import { FaqSection } from './components/FAQ/FaqSection';
import { Footer } from './components/Footer/Footer';
import { ProductModal } from './components/Catalog/ProductModal';
import { CartDrawer } from './components/Cart/CartDrawer';
import { CheckoutModal } from './components/Checkout/CheckoutModal';
import { LegalModal } from './components/Legal/LegalModal';
import { ToastContainer } from './components/Common/ToastContainer';
import { useCart } from './context/CartContext';
import { Phone } from 'lucide-react';
import { Product } from './types';

export function AppContent() {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    isCheckoutOpen, 
    setIsCheckoutOpen 
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'terminos' | 'envios' | 'garantias' | 'privacidad' | 'empresa'>('terminos');

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    const elem = document.getElementById('catalogo');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenLegal = (tab: 'terminos' | 'envios' | 'garantias' | 'privacidad' | 'empresa') => {
    setLegalTab(tab);
    setLegalModalOpen(true);
  };

  const handleExploreClick = () => {
    setSelectedCategory('todas');
    const elem = document.getElementById('catalogo');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOffersClick = () => {
    setSelectedCategory('destacados');
    const elem = document.getElementById('catalogo');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080D18] text-[#F4F7FC]">
      
      {/* Navigation Bar */}
      <Navbar
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero
          onExploreClick={handleExploreClick}
          onOffersClick={handleOffersClick}
        />

        {/* Colombian Trust & Shipping Badges */}
        <TrustBadges />

        {/* Product Catalog */}
        <ProductGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          onQuickView={(prod: Product) => setSelectedProduct(prod)}
        />

        {/* Brand Pillars: Por qué Vía Market */}
        <WhyUsSection />

        {/* Real Order Tracking Simulator */}
        <OrderTrackingSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

      </main>

      {/* Footer */}
      <Footer
        onOpenLegal={handleOpenLegal}
        onSelectCategory={handleSelectCategory}
      />

      {/* Floating Colombian WhatsApp Button */}
      <aside aria-label="Asistencia por WhatsApp" className="fixed bottom-6 left-6 z-40">
        <a
          href="https://wa.me/573044053729?text=Hola%20Vía%20Market!%20Deseo%20información%20sobre%20un%20producto"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar a Vía Market por WhatsApp"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group border border-emerald-400/30"
        >
          <Phone className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Vía Market</span>
        </a>
      </aside>

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalTab}
      />

      <ToastContainer />

    </div>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}
