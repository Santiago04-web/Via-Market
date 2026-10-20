export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'tecnologia' | 'hogar' | 'accesorios' | 'moda' | 'destacados';
  categoryLabel: string;
  price: number; // in COP
  originalPrice?: number; // in COP when discounted
  discountPercentage?: number;
  shortDescription: string;
  description: string;
  images: string[];
  features: string[];
  specs: Record<string, string>;
  isNew?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  documentType: 'CC' | 'CE' | 'NIT' | 'Pasaporte';
  documentNumber: string;
  department: string;
  city: string;
  address: string;
  neighborhood: string;
  additionalInfo?: string;
  paymentMethod: 'whatsapp' | 'wompi_pse' | 'contra_entrega';
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  customer: CustomerDetails;
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  status: 'recibido' | 'confirmado' | 'en_preparacion' | 'en_transito' | 'entregado';
  trackingNumber?: string;
  carrier?: string;
}

export type CategoryFilter = 'todas' | 'tecnologia' | 'hogar' | 'accesorios' | 'moda' | 'destacados';
export type SortOption = 'relevancia' | 'menor-precio' | 'mayor-precio' | 'mayor-descuento';
