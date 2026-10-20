import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'Envíos',
      question: '¿Hacen envíos a toda Colombia y cuáles son los tiempos de entrega?',
      answer: 'Sí, realizamos despachos a todos los departamentos de Colombia mediante transportadoras aliadas certificadas como Coordinadora Mercantil, Interrapidísimo y Envía. En Cali y el Valle del Cauca la entrega toma habitualmente de 1 a 2 días hábiles; en Bogotá, Medellín y ciudades principales de 2 a 3 días hábiles; y en otros municipios de 3 a 5 días hábiles.'
    },
    {
      category: 'Pagos',
      question: '¿Cuáles son los medios de pago disponibles?',
      answer: 'Puedes confirmar tu pedido directamente por WhatsApp y cancelar mediante transferencia por Bancolombia, Nequi, Daviplata o PSE. También disponemos de opción de pago Contra Entrega en las principales ciudades de Colombia según la cobertura de las transportadoras.'
    },
    {
      category: 'Garantía',
      question: '¿Cómo funciona la garantía de los productos?',
      answer: 'Todos los productos en Vía Market cuentan con respaldo y garantía directa frente a cualquier defecto de fabricación conforme al Estatuto del Consumidor en Colombia (Ley 1480 de 2011). Si tu artículo presenta fallas, solo debes escribirnos a soporte@viamarket.lat o a nuestro WhatsApp con tu número de orden.'
    },
    {
      category: 'Seguimiento',
      question: '¿Cómo puedo rastrear mi pedido una vez enviado?',
      answer: 'Al despachar tu compra desde nuestra bodega aliada en Cali, recibirás un número de guía de la transportadora. Puedes ingresar dicho número en la sección de "Rastrear Pedido" de nuestra tienda o consultarlo directamente con nuestro asesor en WhatsApp.'
    },
    {
      category: 'Seguridad',
      question: '¿Es seguro comprar en Vía Market?',
      answer: 'Completamente seguro. Vía Market es una empresa con matrícula mercantil número 861975-51 registrada en la Cámara de Comercio de Cali con NIT 900989806-9. Toda la información personal está protegida bajo la Ley 1581 de 2012 de Protección de Datos Personales (Habeas Data).'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#080D18] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0866FF]/10 border border-[#0866FF]/20 text-xs font-semibold text-[#60A5FA]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Resolvemos tus Dudas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Preguntas Frecuentes
          </h2>
          <p className="text-sm text-slate-400">
            Todo lo que necesitas saber sobre compras, métodos de pago y garantías en Colombia.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="rounded-2xl bg-[#0c1626] border border-[#1E2D4A] overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#0F1E36]/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 rounded-md bg-[#0F1E36] text-[#60A5FA] border border-[#1E2D4A] font-medium hidden sm:inline">
                      {faq.category}
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-[#0866FF] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#1E2D4A]/60 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Call to action box */}
        <div className="mt-12 p-6 rounded-3xl bg-gradient-to-r from-[#071A35] to-[#0F1E36] border border-[#1E2D4A] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">¿Tienes otra pregunta puntual?</h4>
            <p className="text-xs text-slate-400">
              Nuestro equipo comercial en Cali te responderá enseguida por WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/573044053729?text=Hola%20Vía%20Market,%20tengo%20una%20pregunta%20sobre%20la%20tienda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
          >
            <Phone className="w-4 h-4" />
            <span>Chatear por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
