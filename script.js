/* ==========================================================================
   TINTA NEGRA — script.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initScrollReveal();
  initTilt3D();
  initParallax();
});

/* ---------- Menú móvil (hamburguesa) ---------- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  if (!hamburger || !nav) return;

  const toggleMenu = (open) => {
    const isOpen = open ?? hamburger.getAttribute('aria-expanded') !== 'true';
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', () => toggleMenu());

  // Cierra el menú al elegir una sección
  nav.querySelectorAll('.nav__link, .nav__cta').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* ---------- Header: fondo sólido al hacer scroll ---------- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Microanimaciones al hacer scroll (fade-in) ---------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Si el navegador no soporta IntersectionObserver, se muestran directamente
  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------- Inclinación 3D al mover el mouse (tarjetas) ---------- */
function initTilt3D() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const cards = document.querySelectorAll(
    '.phantom-card, .tools-card, .gallery__card, .pricing__card'
  );
  if (!cards.length) return;

  const MAX_TILT = 10; // grados
  const MAX_LIFT = 18; // px de translateZ

  cards.forEach((card) => {
    // Los dispositivos táctiles no disparan mousemove de forma útil: se ignoran.
    if (window.matchMedia('(hover: none)').matches) return;

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width; // 0 → 1
      const y = (event.clientY - rect.top) / rect.height; // 0 → 1

      const tiltY = (x - 0.5) * MAX_TILT * 2;
      const tiltX = (0.5 - y) * MAX_TILT * 2;

      card.style.setProperty('--tiltX', `${tiltX.toFixed(2)}deg`);
      card.style.setProperty('--tiltY', `${tiltY.toFixed(2)}deg`);
      card.style.setProperty('--tiltZ', `${MAX_LIFT}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tiltX', '0deg');
      card.style.setProperty('--tiltY', '0deg');
      card.style.setProperty('--tiltZ', '0px');
    });
  });
}

/* ---------- Parallax sutil de la galería del hero al hacer scroll ---------- */
function initParallax() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const gallery = document.querySelector('.hero__gallery');
  if (!gallery) return;

  let ticking = false;

  const update = () => {
    const offset = window.scrollY;
    // Se detiene el efecto una vez el hero sale de pantalla para no afectar el resto.
    if (offset < window.innerHeight) {
      gallery.style.setProperty('--parallaxY', `${offset * 0.12}px`);
    }
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}
