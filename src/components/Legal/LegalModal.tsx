import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Truck, RefreshCw, Lock, Building2 } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'terminos' | 'envios' | 'garantias' | 'privacidad' | 'empresa';
}

export const LegalModal: React.FC<LegalModalProps> = ({ 
  isOpen, 
  onClose,
  initialTab = 'terminos'
}) => {
  const [activeTab, setActiveTab] = useState<'terminos' | 'envios' | 'garantias' | 'privacidad' | 'empresa'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0c1626] border border-[#1E2D4A] rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* Header */}
        <div className="p-5 border-b border-[#1E2D4A] bg-[#080D18] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#0866FF]" />
            <h3 className="text-base font-bold text-white">Políticas y Marco Legal • Vía Market</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de políticas"
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#1E2D4A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-2 bg-[#071A35]/60 border-b border-[#1E2D4A] overflow-x-auto flex-shrink-0 scrollbar-none">
          <button
            onClick={() => setActiveTab('terminos')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'terminos' ? 'bg-[#0866FF] text-white shadow-glow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Términos y Condiciones
          </button>
          <button
            onClick={() => setActiveTab('envios')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'envios' ? 'bg-[#0866FF] text-white shadow-glow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            Envíos Nacionales
          </button>
          <button
            onClick={() => setActiveTab('garantias')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'garantias' ? 'bg-[#0866FF] text-white shadow-glow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Garantías y Devoluciones
          </button>
          <button
            onClick={() => setActiveTab('privacidad')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'privacidad' ? 'bg-[#0866FF] text-white shadow-glow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Tratamiento de Datos
          </button>
          <button
            onClick={() => setActiveTab('empresa')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'empresa' ? 'bg-[#0866FF] text-white shadow-glow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Registro Mercantil
          </button>
        </div>

        {/* Content Tab Panel */}
        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
          
          {activeTab === 'terminos' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">1. Términos y Condiciones Generales de Uso</h4>
              <p>
                El presente documento establece las condiciones que rigen el uso del sitio web <strong className="text-white">https://viamarket.lat/</strong> y la adquisición de productos ofrecidos por <strong className="text-white">Vía Market</strong>, persona jurídica con domicilio principal en la ciudad de Cali, Colombia.
              </p>
              <h5 className="font-bold text-white">Capacidad y Aceptación</h5>
              <p>
                Al navegar o adquirir cualquier artículo a través de la plataforma o nuestros canales oficiales, el usuario declara ser mayor de edad de acuerdo con la legislación de la República de Colombia y contar con plena capacidad civil para obligarse.
              </p>
              <h5 className="font-bold text-white">Precios y Disponibilidad</h5>
              <p>
                Todos los precios expuestos en Vía Market están expresados en pesos colombianos (COP). Los precios incluyen los impuestos de ley aplicables y se respetan conforme a la cotización confirmada al momento de la orden.
              </p>
            </div>
          )}

          {activeTab === 'envios' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">2. Política de Envíos y Tiempos de Entrega Nacional</h4>
              <p>
                En Vía Market despachamos pedidos a todo el territorio nacional colombiano a través de empresas de transporte de carga y mensajería especializada debidamente vigiladas por el Ministerio de Transporte de Colombia (Coordinadora Mercantil, Interrapidísimo, Envía, Servientrega).
              </p>
              <h5 className="font-bold text-white">Tiempos Estimados de Entrega</h5>
              <ul className="list-disc list-inside space-y-1.5 text-slate-300">
                <li><strong className="text-white">Cali y Valle del Cauca:</strong> 1 a 2 días hábiles posteriores a la confirmación del pedido.</li>
                <li><strong className="text-white">Bogotá D.C., Medellín, Barranquilla, Bucaramanga:</strong> 2 a 3 días hábiles.</li>
                <li><strong className="text-white">Resto de municipios y zonas especiales:</strong> 3 a 5 días hábiles.</li>
              </ul>
              <h5 className="font-bold text-white">Seguimiento</h5>
              <p>
                Una vez despachado el paquete, se genera el número de guía correspondiente para que el cliente pueda rastrear en todo momento el avance de su envío.
              </p>
            </div>
          )}

          {activeTab === 'garantias' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">3. Política de Garantías, Cambios y Derecho de Retracto (Ley 1480 de 2011)</h4>
              <p>
                En estricto cumplimiento del Estatuto del Consumidor en Colombia (Ley 1480 de 2011), todos los productos vendidos en Vía Market gozan de garantía legal por idoneidad, calidad, funcionamiento y seguridad.
              </p>
              <h5 className="font-bold text-white">Derecho de Retracto</h5>
              <p>
                Para ventas efectuadas mediante métodos a distancia o por comercio electrónico, el consumidor tiene derecho a retractarse dentro de los cinco (5) días hábiles siguientes a la entrega del producto, siempre y cuando este no presente señales de uso indebido y conserve sus empaques y accesorios originales.
              </p>
              <h5 className="font-bold text-white">Procedimiento de Garantía</h5>
              <p>
                Para solicitar una revisión de garantía, escribe a <strong className="text-white">soporte@viamarket.lat</strong> o a nuestro WhatsApp oficial (+57 304 405 3729) adjuntando el número de orden y una descripción clara de la eventualidad.
              </p>
            </div>
          )}

          {activeTab === 'privacidad' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">4. Política de Tratamiento de Datos Personales (Habeas Data)</h4>
              <p>
                Vía Market garantiza la protección de los datos suministrados por sus clientes, actuando en consonancia con la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia.
              </p>
              <h5 className="font-bold text-white">Finalidad de la Información Recolectada</h5>
              <p>
                Los datos de contacto y entrega (nombre, número de documento, dirección, ciudad, teléfono celular y correo electrónico) son requeridos exclusivamente para:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>La debida facturación y remisión ante la transportadora.</li>
                <li>La comunicación directa sobre el estado del despacho y atención al cliente.</li>
                <li>Dar respuesta a solicitudes de servicio posventa y garantía.</li>
              </ul>
              <p>
                En ningún momento comercializamos, cedemos ni transferimos bases de datos de clientes a terceras partes no autorizadas.
              </p>
            </div>
          )}

          {activeTab === 'empresa' && (
            <div className="space-y-4">
              <h4 className="text-base font-bold text-white">5. Identificación Corporativa y Registro Mercantil</h4>
              <div className="p-4 rounded-2xl bg-[#071A35] border border-[#1E2D4A] space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#1E2D4A] pb-2">
                  <span className="text-slate-400">Razón Social:</span>
                  <span className="font-bold text-white">Vía Market</span>
                </div>
                <div className="flex justify-between border-b border-[#1E2D4A] pb-2">
                  <span className="text-slate-400">NIT:</span>
                  <span className="font-bold text-white">900989806-9</span>
                </div>
                <div className="flex justify-between border-b border-[#1E2D4A] pb-2">
                  <span className="text-slate-400">Cámara de Comercio:</span>
                  <span className="font-bold text-white">Cámara de Comercio de Cali</span>
                </div>
                <div className="flex justify-between border-b border-[#1E2D4A] pb-2">
                  <span className="text-slate-400">Matrícula Mercantil No:</span>
                  <span className="font-bold text-[#0866FF]">861975-51</span>
                </div>
                <div className="flex justify-between border-b border-[#1E2D4A] pb-2">
                  <span className="text-slate-400">Dirección Comercial Principal:</span>
                  <span className="font-bold text-white">CL 22 NORTE # 89 - 792 CS 18, Cali - Valle</span>
                </div>
                <div className="flex justify-between border-b border-[#1E2D4A] pb-2">
                  <span className="text-slate-400">Correo de Notificaciones y Soporte:</span>
                  <span className="font-bold text-white">soporte@viamarket.lat</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Teléfono Comercial:</span>
                  <span className="font-bold text-emerald-400">+57 304 405 3729</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                * Información extraída del Certificado de Existencia y Representación Legal expedido por la Cámara de Comercio de Cali.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1E2D4A] bg-[#080D18] flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#0866FF] hover:bg-[#0756db] text-white font-bold text-xs shadow-glow transition-all"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
