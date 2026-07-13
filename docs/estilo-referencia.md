# Estilo de referencia (objetivo visual)

Base: captura de pantalla de una landing "Product Video Examples" (SaaS oscuro,
estilo Product Hunt). Se usa SOLO como referencia de estilo/layout — el
contenido final es 100% de Tinta Negra Tattoo Studio (estudio de tatuajes en
Ciudad de México, dirigido a clientes finales).

## Paleta
- Fondo base: `#0a0a0d` (casi negro)
- Superficie / tarjeta: `#15151a`, borde `#26262e`
- Texto principal: `#f5f5f7`
- Texto secundario / muted: `#9a9aa5`
- Gradiente de marca (texto destacado, botones primarios, iconos):
  `linear-gradient(90deg, #ff8a3d, #ff3d8b, #8b5cf6)` (naranja → rosa → violeta)
- Acento verde/teal para stat 1: `#34d399` → `#22d3ee`
- Acento azul/cian para stat 2: `#38bdf8` → `#6366f1`
- Botón ghost: transparente, borde `#2c2c34`, texto blanco

## Tipografía
- Sans-serif geométrica para títulos (peso 600-700), tracking ajustado.
- Cuerpo con gris muted, tamaño ~1rem, line-height 1.6.
- H1 hero: clamp 2.4rem → 4.5rem, con la última frase en gradiente de marca.

## Estructura de secciones (orden)
1. Header fijo: logo + nav + botón CTA con borde en gradiente.
2. Hero: badge pequeño arriba, eyebrow, H1 con remate en gradiente, subtítulo,
   2 CTAs (primario gradiente + ghost), mini testimonio con avatar, y a la
   derecha una grilla 2x3 de tarjetas placeholder oscuras.
3. Sección "problema": título con una palabra en gradiente, 3 bloques con
   icono cuadrado de color + label de color + subtítulo blanco + texto muted,
   y a la derecha un mockup de dispositivo con borde en gradiente mostrando
   una UI de la app.
4. Sección "herramientas incluidas": título con palabra final en gradiente,
   imagen de varias ventanas/tarjetas superpuestas en ángulo.
5. Sección de stats: título con palabra en gradiente, 2 números grandes en
   gradiente (uno verde/teal, otro azul/violeta) separados por una línea
   vertical, cada uno con label y descripción corta.
6. Galería: grilla de tarjetas placeholder con texto superpuesto tipo
   "Acceso a +X" y una anotación tipo flecha/garabato.
7. Pricing split: tarjeta izquierda oscura con lista de beneficios (icono +
   label + texto), tarjeta derecha con badge superior, precio grande, bullets
   en verde, botón CTA en gradiente y texto de garantía.
8. Testimonio grande centrado con comillas en rosa, cita en cursiva, avatar y
   nombre/cargo.
9. Footer: logo + tagline, columnas de links, copyright, línea inferior con
   blur en gradiente arcoíris sutil.

## Notas de fidelidad
- Todo el contenido de texto, nombre de marca, servicios y precios es de
  Tinta Negra — no se copia texto ni marca del sitio de referencia.
- Las tarjetas "placeholder" del sitio de referencia también son genéricas
  (no fotos reales), así que se replican como bloques CSS, no como imágenes
  descargadas.
