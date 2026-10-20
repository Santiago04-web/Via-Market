# Vía Market — E-Commerce Premium Colombia 🇨🇴

Plataforma de comercio electrónico de alta gama desarrollada para **Vía Market** (`viamarket.lat`). Diseñada con una dirección creativa tecnológica, comercial y premium inspirada en experiencias de alto nivel (Awwwards), optimizada para el mercado colombiano (moneda COP, transportadoras nacionales y marco legal mercantil).

---

## 🚀 Inicio Rápido

### Requisitos previos
- Node.js 18+ (probado exitosamente en Node v24.16.0)
- npm 9+

### Instalación y ejecución
```bash
# 1. Instalar dependencias (ya instaladas)
npm install

# 2. Iniciar el servidor de desarrollo en local
npm run dev

# 3. Compilar para producción (genera bundle ultraligero en /dist)
npm run build

# 4. Previsualizar la compilación de producción
npm run preview
```

El servidor local corre por defecto en: **http://127.0.0.1:3000/**

---

## 🎨 Identidad Visual y Paleta de Marca

- **Azul Eléctrico:** `#0866FF` (Acción principal, badges, highlights)
- **Azul Profundo:** `#071A35` (Superficies secundarias, trust bar, modales)
- **Negro Azulado:** `#080D18` (Fondo principal ultra dark tech)
- **Blanco:** `#FFFFFF` (Tipografía principal de alto contraste)
- **Gris Claro:** `#F4F7FC` (Textos secundarios y detalles)
- **Glow Cian:** `#00D2FF` (Acentos de iluminación sutil)
- **Tipografía:** *Plus Jakarta Sans* / *Inter* (Google Fonts)

---

## 🏢 Información Corporativa y Legal Integrada

Los datos han sido incorporados conforme al **Certificado de Existencia y Representación Legal de la Cámara de Comercio de Cali**:

- **Razón Social:** Vía Market
- **NIT:** 900989806-9
- **Matrícula Mercantil:** 861975-51 (Cámara de Comercio de Cali)
- **Domicilio Principal:** CL 22 NORTE # 89 - 792 CS 18, Cali, Valle del Cauca, Colombia
- **Dominio Oficial:** [https://viamarket.lat/](https://viamarket.lat/)
- **Correo Oficial de Soporte:** `soporte@viamarket.lat`
- **Teléfono / WhatsApp Comercial:** `+57 304 405 3729`

---

## 🔑 Meta de Verificación de Dominio en Facebook

El tag solicitado por Meta Business Suite ya está embebido dentro del `<head>` de `index.html`:

```html
<meta name="facebook-domain-verification" content="g7h64g8lj4kf2xlitiisd89mesx5rd" />
```

---

## 🛒 Funcionalidades Implementadas

1. **Hero Section de Alto Impacto:**
   - Composición 3D con la gráfica oficial de Vía Market (`/Portada.jpeg`).
   - Titular: *«Todo lo que buscas. A un clic de distancia.»*
   - Subtítulo comercial y llamados a la acción dinámicos.
   - Badges flotantes con iluminación y métricas de confianza en Colombia.

2. **Barra de Navegación Sticky & Buscador Instantáneo:**
   - Logotipo oficial en alta resolución (`/Perfil.jpeg`).
   - Buscador predictivo tipo type-ahead con vista previa inmediata de resultados.
   - Botón de carrito con contador reactivo y animación.
   - Menú móvil lateral (drawer) con navegación y acceso rápido a WhatsApp.

3. **Catálogo Colombiano y Fichas de Producto:**
   - Precios formateados en Pesos Colombianos (`$ 189.900 COP`).
   - Categorías: Tecnología, Hogar, Accesorios, Moda y Ofertas.
   - Filtros dinámicos y ordenamiento por relevancia, precio y mayor descuento.
   - Modal de producto con galería de imágenes intercambiables, selector de cantidad, especificaciones técnicas y **calculadora de tiempos de entrega por departamento colombiano**.

4. **Carrito de Compras y Flujo de Checkout Realista:**
   - Slide-over drawer con persistencia en `localStorage`.
   - Barra interactiva de progreso para Envío Gratis (umbral $150.000 COP).
   - Validador de cupones de descuento (`VIAMARKET10`, `COLOMBIA`).
   - Checkout en 2 pasos adaptado a Colombia:
     - Formulario con Departamento, Ciudad, Dirección, Barrio y Cédula/NIT.
     - **Opción WhatsApp Directo (+57 304 405 3729):** Compila automáticamente el resumen del pedido y abre el chat pre-llenado.
     - **Opción Pasarela Digital (Wompi / PSE):** Interfaz lista con notas transparentes de integración para llaves públicas.
     - **Opción Contra Entrega:** Sujeto a cobertura en ciudades principales.
   - Confirmación de orden con confeti interactivo (`canvas-confetti`), código de orden (`VM-XXXXXX`) y copia rápida.

5. **Rastreador de Guías en Línea:**
   - Búsqueda por número de orden o guía de transporte (Coordinadora, Interrapidísimo, Envía).
   - Cronograma visual con etapas de alistamiento en Cali, tránsito nacional y entrega.

6. **Marco Legal y Confianza:**
   - Sección «Por qué Vía Market» destacando el registro en la Cámara de Comercio de Cali.
   - Preguntas Frecuentes (FAQ) en formato acordeón.
   - Modal con políticas completas de Envíos, Estatuto del Consumidor (Ley 1480 de 2011) y Habeas Data (Ley 1581 de 2012).
   - Botón flotante de WhatsApp siempre disponible.

---

## 🔌 Integraciones y Variables de Entorno

El proyecto incluye `.env.example` para conectar servicios en producción:

- `VITE_WOMPI_PUBLIC_KEY`: Para cobros directos con tarjeta y botón Bancolombia / PSE.
- `VITE_CATALOG_API_URL`: Desacoplado en `src/data/products.ts` para conectar con Supabase, Shopify Headless o backend REST.
