/**
 * Formats a number to Colombian Pesos (COP).
 * Example: 189900 -> "$ 189.900 COP"
 */
export function formatCOP(amount: number): string {
  const formatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(amount);

  // Return standard clean COP format e.g. "$ 189.900 COP"
  return `${formatted} COP`;
}

/**
 * Builds official WhatsApp order message link
 */
export function buildWhatsAppOrderLink(params: {
  phone: string;
  orderId?: string;
  customerName?: string;
  city?: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
}): string {
  const cleanPhone = params.phone.replace(/[^0-9]/g, '');
  
  let text = `¡Hola Vía Market! 👋 Quiero confirmar mi pedido:\n\n`;
  if (params.orderId) {
    text += `🔖 *Orden:* #${params.orderId}\n`;
  }
  if (params.customerName) {
    text += `👤 *Cliente:* ${params.customerName}\n`;
  }
  if (params.city) {
    text += `📍 *Ciudad de entrega:* ${params.city}\n`;
  }
  text += `\n🛒 *Productos seleccionados:*\n`;

  params.items.forEach((item, index) => {
    text += `${index + 1}. ${item.name} (x${item.quantity}) - ${formatCOP(item.price * item.quantity)}\n`;
  });

  text += `\n💰 *Total a pagar:* ${formatCOP(params.total)}\n`;
  text += `\nPor favor indíquenme los pasos para coordinar el despacho. ¡Muchas gracias!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Calculates estimated Colombian delivery timeframe
 */
export function getEstimatedDeliveryDays(department: string): string {
  const lower = department.toLowerCase();
  if (lower.includes('valle') || lower.includes('cali')) {
    return '1 a 2 días hábiles (Despacho local prioritario)';
  }
  if (lower.includes('bogotá') || lower.includes('antioquia') || lower.includes('cundinamarca')) {
    return '2 a 3 días hábiles';
  }
  if (lower.includes('costa') || lower.includes('atlántico') || lower.includes('bolívar') || lower.includes('santander')) {
    return '3 a 4 días hábiles';
  }
  return '3 a 5 días hábiles a nivel nacional';
}
