import { Product } from '../types';

/**
 * Catálogo inicial de Vía Market para demostración y puesta en producción.
 * NOTA DE ARQUITECTURA: Estos datos están desacoplados a través de la interfaz Product
 * y pueden conectarse a una API REST, Supabase, Shopify Storefront o GraphQL sin modificar la interfaz.
 */
export const DEMO_NOTICE = {
  isDemoCatalog: true,
  message: "Catálogo demostrativo optimizado para Vía Market Colombia. Los productos y precios reflejan valores reales del mercado nacional en COP."
};

export const PRODUCTS: Product[] = [
  {
    id: 'vm-tech-01',
    name: 'Audífonos Inalámbricos Studio Pro con Cancelación Activa de Ruido',
    slug: 'audifonos-inalambricos-studio-pro-anc',
    category: 'tecnologia',
    categoryLabel: 'Tecnología',
    price: 189900,
    originalPrice: 249900,
    discountPercentage: 24,
    shortDescription: 'Sonido Hi-Res con graves profundos, batería de hasta 40 horas y Bluetooth 5.3 de ultra baja latencia.',
    description: 'Los Audífonos Studio Pro ANC entregan una experiencia sonora inmersiva diseñada para el ritmo diario. Cuentan con almohadillas viscoelásticas transpirables, micrófono cuádruple con reducción de ruido ambiental para llamadas nítidas en Zoom/Meet o telefonía móvil, y estuche rígido de transporte.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80'
    ],
    features: [
      'Cancelación de ruido híbrida de hasta -38dB',
      'Batería extendida: 40 horas en modo estándar, 30h con ANC',
      'Carga rápida USB-C: 10 minutos otorgan 4 horas de uso',
      'Compatibilidad total con iOS, Android, Windows y macOS'
    ],
    specs: {
      'Conectividad': 'Bluetooth 5.3 + Jack 3.5mm auxiliar',
      'Batería': '750 mAh recargable',
      'Alcance inalámbrico': 'Hasta 15 metros sin obstáculos',
      'Peso': '245 g'
    },
    isFeatured: true,
    isNew: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'vm-tech-02',
    name: 'Smartwatch Deportivo Ultra Titanium Edition con Pantalla AMOLED',
    slug: 'smartwatch-ultra-titanium-amoled',
    category: 'tecnologia',
    categoryLabel: 'Tecnología',
    price: 219000,
    originalPrice: 289000,
    discountPercentage: 24,
    shortDescription: 'Caja en aleación de titanio resistente al agua IP68, monitoreo de salud 24/7 y llamadas Bluetooth.',
    description: 'Diseñado tanto para la rutina deportiva como para el ambiente corporativo. Pantalla Always-On de 1.96 pulgadas de alto brillo visible bajo la luz del sol colombiana, medición de oxígeno en sangre (SpO2), ritmo cardíaco y más de 100 modos deportivos con sincronización directa con Strava y Apple Health / Google Fit.',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80'
    ],
    features: [
      'Pantalla táctil AMOLED 1.96" de alta resolución (410x502 px)',
      'Altavoz y micrófono integrados para responder llamadas',
      'Resistencia al agua y sudor certificación IP68',
      'Autonomía de 7 a 10 días por recarga'
    ],
    specs: {
      'Compatibilidad': 'Android 6.0+ y iOS 11.0+',
      'Materiales': 'Bisel de aleación de titanio + correa de silicona líquida',
      'Sensores': 'Cardíaco PPG, SpO2, Podómetro, Monitor de Sueño',
      'Carga': 'Magnética inalámbrica rápida'
    },
    isFeatured: true,
    isNew: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 52
  },
  {
    id: 'vm-acc-01',
    name: 'Soporte Ergonómico Plegable de Aluminio Anodizado para Portátil',
    slug: 'soporte-ergonomico-aluminio-portatil',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    price: 94500,
    originalPrice: 120000,
    discountPercentage: 21,
    shortDescription: '6 niveles de altura ajustables, disipación pasiva de calor y estructura ultrarresistente.',
    description: 'Mejora tu postura al trabajar en casa o en la oficina. Fabricado en aleación de aluminio mecanizado de grado aeroespacial con almohadillas de silicona antideslizante para proteger tu equipo y evitar cualquier vibración. Totalmente plegable para llevar en cualquier morral.',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80'
    ],
    features: [
      '6 ángulos de elevación configurables de 15° a 45°',
      'Disipación térmica hueca para evitar sobrecalentamiento del equipo',
      'Soporta laptops de hasta 17.3 pulgadas y hasta 10 kg de peso',
      'Incluye funda protectora de transporte en gamuza'
    ],
    specs: {
      'Material': 'Aluminio anodizado + Silicona antideslizante',
      'Peso': '260 g',
      'Dimensiones plegado': '24 x 4.5 x 1.5 cm'
    },
    isFeatured: false,
    isNew: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 64
  },
  {
    id: 'vm-hog-01',
    name: 'Termo Inteligente Digital Térmico en Acero Inoxidable 500ml',
    slug: 'termo-inteligente-digital-pantalla-led-500ml',
    category: 'hogar',
    categoryLabel: 'Hogar',
    price: 54900,
    originalPrice: 75000,
    discountPercentage: 27,
    shortDescription: 'Sensor táctil con temperatura en tiempo real en tapa LED. Mantiene bebidas frías o calientes hasta 24h.',
    description: 'Termo al vacío con doble pared de acero inoxidable grado alimenticio 304. Con solo tocar suavemente la tapa superior obtienes la temperatura exacta del líquido sin riesgo de quemaduras. Incluye filtro de infusión para té o café.',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80'
    ],
    features: [
      'Pantalla táctil LED de bajo consumo (batería integrada hasta 5 años sin recarga)',
      'Aislamiento de vacío de doble pared: 12h caliente / 24h frío',
      'Cero fugas con empaque de silicona de grado alimenticio',
      'Capacidad estándar de 500 ml ideal para oficina o gimnasio'
    ],
    specs: {
      'Capacidad': '500 ml (17 oz)',
      'Material': 'Acero inoxidable 304 libre de BPA',
      'Dimensiones': '22.5 x 6.5 cm'
    },
    isFeatured: false,
    isNew: true,
    inStock: true,
    rating: 4.7,
    reviewsCount: 41
  },
  {
    id: 'vm-hog-02',
    name: 'Lámpara LED Minimalista Desk Pro con Carga Inalámbrica Qi',
    slug: 'lampara-led-minimalista-desk-pro-carga-qi',
    category: 'hogar',
    categoryLabel: 'Hogar',
    price: 128000,
    originalPrice: 165000,
    discountPercentage: 22,
    shortDescription: '3 temperaturas de color, dimer táctil continuo y base de carga rápida de 15W para smartphone.',
    description: 'Iluminación profesional libre de parpadeo (Flicker-Free) que reduce la fatiga visual durante jornadas extensas de estudio o trabajo. Su base integra una bobina de carga inductiva Qi para alimentar tu teléfono mientras trabajas.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80'
    ],
    features: [
      'Base de carga rápida inalámbrica de 15W certificada Qi',
      '3 modos de luz: Cálida (3000K), Neutra (4000K) y Fría (6000K)',
      'Temporizador de apagado automático de 45 minutos',
      'Brazo flexible de aluminio con rotación multidireccional de 180°'
    ],
    specs: {
      'Potencia LED': '10W (equivalente a 60W incandescente)',
      'Salida Qi': '15W / 10W / 7.5W / 5W',
      'Conector': 'USB Tipo C (cable incluido)'
    },
    isFeatured: true,
    isNew: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 29
  },
  {
    id: 'vm-moda-01',
    name: 'Mochila Ejecutiva Urbana Tech Pack 28L Impermeable',
    slug: 'mochila-ejecutiva-urbana-tech-pack-28l',
    category: 'moda',
    categoryLabel: 'Moda',
    price: 175000,
    originalPrice: 220000,
    discountPercentage: 20,
    shortDescription: 'Compartimento acolchado para laptop 16", puerto de carga USB externo y cremalleras antirrobo.',
    description: 'La compañera perfecta para el transporte urbano en ciudades como Bogotá, Medellín o Cali. Confeccionada en tela Oxford hidrófuga de alta densidad que resiste lluvias moderadas y rasguños. Organización interna inteligente para cargadores, documentos, tablet y ropa de cambio.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80'
    ],
    features: [
      'Bolsillo de seguridad oculto en el espaldar para pasaporte y billetera',
      'Fijación trasera para maletas de viaje (Luggage strap)',
      'Espaldar ergonómico con malla transpirable 3D AirMesh',
      'Apertura estilo maleta a 180° para revisión rápida en aeropuertos'
    ],
    specs: {
      'Capacidad': '28 Litros',
      'Material': 'Oxford 900D impermeable + forro poliéster reforzado',
      'Capacidad laptop': 'Hasta 16 pulgadas',
      'Peso': '820 g'
    },
    isFeatured: true,
    isNew: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 77
  },
  {
    id: 'vm-tech-03',
    name: 'Parlante Bluetooth Portátil BassWave con Resistencia al Agua IPX7',
    slug: 'parlante-bluetooth-portatil-basswave-ipx7',
    category: 'tecnologia',
    categoryLabel: 'Tecnología',
    price: 149000,
    originalPrice: 195000,
    discountPercentage: 24,
    shortDescription: 'Sonido 360° envolvente de 20W con radiadores pasivos de bajos, 16 horas de batería y luz ambiental.',
    description: 'Lleva la fiesta a la piscina, finca, paseo o parque. Soporta inmersión temporal en agua (IPX7), caídas accidentales y polvo. Puedes emparejar 2 parlantes en modo TWS para lograr un verdadero sonido estéreo cinematográfico.',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80'
    ],
    features: [
      'Potencia real de 20W RMS con graves profundos',
      'Resistencia total al agua IPX7 (sumergible 1m durante 30 min)',
      'Emparejamiento estéreo TWS (True Wireless Stereo)',
      'Entradas Bluetooth 5.2, MicroSD y Auxiliar 3.5mm'
    ],
    specs: {
      'Batería': '3600 mAh recargable por USB-C',
      'Tiempo de reproducción': 'Hasta 16 horas a volumen medio',
      'Dimensiones': '18 x 7.5 x 7.5 cm'
    },
    isFeatured: false,
    isNew: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 33
  },
  {
    id: 'vm-tech-04',
    name: 'Mini Proyector Inteligente Cinema Home Portátil 1080P Nativo',
    slug: 'mini-proyector-inteligente-cinema-home-1080p',
    category: 'tecnologia',
    categoryLabel: 'Tecnología',
    price: 385000,
    originalPrice: 499000,
    discountPercentage: 23,
    shortDescription: 'WiFi de doble banda, Android integrado para Netflix/YouTube, parlante HiFi y proyección hasta 150".',
    description: 'Transforma cualquier pared o techo en tu propia sala de cine. Gracias a su corrección trapezoidal automática y enfoque eléctrico, configurarlo toma menos de 30 segundos. Conéctalo a consolas de videojuegos como PlayStation o Xbox vía HDMI.',
    images: [
      'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80',
      'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=80'
    ],
    features: [
      'Resolución 1080P Full HD nativa compatible con contenido 4K',
      'Sistema operativo integrado con tienda de aplicaciones',
      'Altavoz estéreo interno de 5W y salida Bluetooth para teatro en casa',
      'Corrección trapezoidal 4D en cuatro puntos'
    ],
    specs: {
      'Brillo': '7500 lúmenes ANSI / LED vida útil 50.000 horas',
      'Conexiones': 'HDMI, USB, Audio 3.5mm, WiFi 2.4G/5G, Bluetooth 5.0',
      'Distancia de proyección': '1.2m a 4.5m'
    },
    isFeatured: true,
    isNew: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 45
  },
  {
    id: 'vm-acc-02',
    name: 'Teclado Mecánico Inalámbrico Compacto 75% con Switches Táctiles',
    slug: 'teclado-mecanico-inalambrico-compacto-75',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    price: 198000,
    originalPrice: 250000,
    discountPercentage: 21,
    shortDescription: 'Triple conectividad (Bluetooth, 2.4GHz USB y cable Type-C), retroiluminación RGB y perilla de volumen.',
    description: 'El equilibrio definitivo entre productividad y gaming. Teclas PBT de doble inyección de tacto mate que no se desgastan con el tiempo, espuma insonorizante interna para un sonido profundo y satisfactorio al escribir.',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80'
    ],
    features: [
      'Distribución compacta 75% con teclas de flecha y perilla multifunción',
      'Switches lubricados de fábrica para escritura suave y silenciosa',
      'Conexión simultánea hasta 3 dispositivos con cambio rápido',
      'Batería recargable de 3000 mAh'
    ],
    specs: {
      'Switches': 'Mecánicos Brown táctiles Hot-Swappable',
      'Iluminación': 'RGB con 18 modos dinámicos',
      'Compatibilidad': 'Windows, Mac, iPadOS, Android'
    },
    isFeatured: false,
    isNew: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 56
  },
  {
    id: 'vm-hog-03',
    name: 'Aspiradora Inalámbrica Portátil TurboClean para Hogar y Auto',
    slug: 'aspiradora-inalambrica-portatil-turboclean',
    category: 'hogar',
    categoryLabel: 'Hogar',
    price: 115000,
    originalPrice: 145000,
    discountPercentage: 21,
    shortDescription: 'Potente succión ciclónica de 9000Pa, filtro HEPA lavable y accesorios para esquinas difíciles.',
    description: 'Ligera, potente y sin cables enredados. Limpia rápidamente migajas, polvo, pelos de mascota y residuos en el carro, teclado, sillones y rincones de difícil acceso. Recargable mediante cualquier puerto USB.',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80'
    ],
    features: [
      'Motor sin escobillas de alta velocidad a 45.000 RPM',
      'Filtro HEPA de grado médico que retiene el 99.9% de partículas',
      'Diseño ultraligero de 380 gramos',
      'Boquilla con cepillo y boquilla alargada de precisión incluidas'
    ],
    specs: {
      'Potencia de succión': '9000 Pa',
      'Batería': '2x2000 mAh ion de litio',
      'Depósito': 'Transparente de 200 ml de vaciado fácil'
    },
    isFeatured: false,
    isNew: true,
    inStock: true,
    rating: 4.6,
    reviewsCount: 22
  },
  {
    id: 'vm-moda-02',
    name: 'Gafas de Sol Polarizadas Aviator Tech con Protección UV400',
    slug: 'gafas-sol-polarizadas-aviator-tech-uv400',
    category: 'moda',
    categoryLabel: 'Moda',
    price: 79900,
    originalPrice: 110000,
    discountPercentage: 27,
    shortDescription: 'Marco ultraligero en aleación de magnesio, lentes TAC antirreflejo y estuche rígido incluido.',
    description: 'Protección visual superior contra el intenso sol tropical de Colombia. Bloquea el 100% de la radiación UVA/UVB nociva y elimina reflejos molestos en carretera y agua, mejorando el contraste y nitidez en la conducción.',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80'
    ],
    features: [
      'Lentes polarizados de 9 capas con filtro UV400 total',
      'Bisagras con resortes autoajustables a cualquier tipo de rostro',
      'Plaquetas nasales de silicona suave antialérgicas',
      'Incluye paño de microfibra y tarjeta de test de polarización'
    ],
    specs: {
      'Lente': 'Triacetato de celulosa (TAC) de 1.1 mm',
      'Marco': 'Aleación Aluminio-Magnesio mate',
      'Peso': '26 g'
    },
    isFeatured: false,
    isNew: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 31
  },
  {
    id: 'vm-acc-03',
    name: 'Batería Portátil PowerBank 20000mAh 65W Power Delivery Carga Rápida',
    slug: 'powerbank-20000mah-65w-power-delivery',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    price: 159000,
    originalPrice: 199000,
    discountPercentage: 20,
    shortDescription: 'Capaz de cargar laptops MacBook/Dell y smartphones al 50% en 25 minutos. Pantalla digital de porcentaje.',
    description: 'Energía de reserva confiable para viajeros y nómadas digitales. Cuenta con 3 puertos de salida simultáneos para alimentar celular, tablet y audífonos al mismo tiempo sin caídas de tensión.',
    images: [
      'https://images.unsplash.com/photo-1609592426815-c8e43444458b?w=800&q=80',
      'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80'
    ],
    features: [
      'Carga ultrarrápida PD 65W por USB-C compatible con laptops',
      'Display LED con indicador exacto de batería y voltaje en tiempo real',
      'Protección inteligente contra sobrecalentamiento y cortocircuitos',
      'Apta para llevar en equipaje de mano de vuelos nacionales e internacionales'
    ],
    specs: {
      'Capacidad': '20.000 mAh (74Wh)',
      'Puertos': '1x USB-C In/Out 65W, 2x USB-A QC 3.0 22.5W',
      'Tiempo de autorrecarga': 'Aprox 2 horas con cargador rápido de 65W'
    },
    isFeatured: true,
    isNew: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 49
  }
];

export const CATEGORIES = [
  { id: 'todas', label: 'Todos los productos', count: PRODUCTS.length },
  { id: 'destacados', label: 'Destacados', count: PRODUCTS.filter(p => p.isFeatured).length },
  { id: 'tecnologia', label: 'Tecnología', count: PRODUCTS.filter(p => p.category === 'tecnologia').length },
  { id: 'hogar', label: 'Hogar & Confort', count: PRODUCTS.filter(p => p.category === 'hogar').length },
  { id: 'accesorios', label: 'Accesorios & Ergonomía', count: PRODUCTS.filter(p => p.category === 'accesorios').length },
  { id: 'moda', label: 'Moda Urbana', count: PRODUCTS.filter(p => p.category === 'moda').length },
];
