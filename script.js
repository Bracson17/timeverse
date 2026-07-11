// =========================================
// EmailJS Configuration
// =========================================
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY',
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
};

// =========================================
// Product Data
// =========================================
const PRODUCTS_DATA = [
  {
    id: 1,
    name: 'Casio G-Shock',
    image: 'imgs/Casio G-Shock.jpeg',
    price: 'S/ 599.00',
    description:
      'Diseñado para quienes buscan resistencia, estilo y funcionalidad en un solo reloj. Fabricado con caja de resina reforzada con fibra de carbono, correa de resina de alta durabilidad y cristal mineral resistente a impactos y rayaduras.',
    features: [
      'Movimiento de cuarzo analógico/digital',
      'Resistencia al agua de hasta 200 metros',
      'Luz LED, cronómetro, temporizador y alarmas',
      'Diseño deportivo y moderno',
      '100% Original',
    ],
    ideal: 'Ideal para uso diario, deporte o aventura.',
    waMsg: 'Hola, deseo más información para adquirir el reloj Casio G-Shock',
  },
  {
    id: 2,
    name: 'Invicta Huracan Blue Dial',
    image: 'imgs/Invicta Huracan Blue Dial.jpeg',
    price: 'S/ 519.00',
    description:
      'Un reloj que combina elegancia y deportividad. Cuenta con caja y brazalete de acero inoxidable, cristal Flame Fusion de alta resistencia y un atractivo dial azul que resalta en cualquier ocasión.',
    features: [
      'Movimiento de cuarzo japonés',
      'Cristal Flame Fusion resistente a rayaduras',
      'Acero inoxidable premium',
      'Resistencia al agua de 100 metros',
      '100% Original',
    ],
    ideal: 'Perfecto para quienes buscan un reloj exclusivo con excelente presencia.',
    waMsg:
      'Hola, deseo más información para adquirir el reloj Invicta Huracan Blue Dial',
  },
  {
    id: 3,
    name: 'Invicta Pro Diver Chronograph',
    image: 'imgs/Invicta Pro Diver Chronograph.jpeg',
    price: 'S/ 569.00',
    description:
      'Diseño inspirado en relojes de buceo profesionales. Fabricado con caja y brazalete de acero inoxidable, cristal Flame Fusion y equipado con función cronógrafo para un estilo deportivo y elegante.',
    features: [
      'Movimiento de cuarzo',
      'Función cronógrafo y fechador',
      'Acero inoxidable de alta calidad',
      'Cristal Flame Fusion',
      'Resistencia al agua de 100 metros',
      '100% Original',
    ],
    ideal: 'Ideal para quienes buscan rendimiento, elegancia y durabilidad.',
    waMsg:
      'Hola, deseo más información para adquirir el reloj Invicta Pro Diver Chronograph',
  },
  {
    id: 4,
    name: 'Invicta Pro Diver Quartz',
    image: 'imgs/Invicta Pro Diver Quartz.jpeg',
    price: 'S/ 389.00',
    description:
      'Un clásico de la colección Pro Diver. Fabricado con caja de acero inoxidable, cristal Flame Fusion y movimiento de cuarzo de alta precisión. Su diseño versátil combina perfectamente con un estilo casual o formal.',
    features: [
      'Movimiento de cuarzo',
      'Caja de acero inoxidable',
      'Cristal Flame Fusion resistente',
      'Resistencia al agua de 100 metros',
      'Diseño elegante y deportivo',
      '100% Original',
    ],
    ideal: 'Excelente opción para quienes buscan calidad, estilo y un precio competitivo.',
    waMsg:
      'Hola, deseo más información para adquirir el reloj Invicta Pro Diver Quartz',
  },
];

// =========================================
// DOM Ready
// =========================================
document.addEventListener('DOMContentLoaded', function () {
  // ---- Theme Toggle ----
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  function updateThemeIcons(dark) {
    if (dark) {
      sunIcon.classList.remove('rotate-0', 'opacity-100', 'scale-100');
      sunIcon.classList.add('rotate-90', 'opacity-0', 'scale-0');
      moonIcon.classList.remove('-rotate-90', 'opacity-0', 'scale-0');
      moonIcon.classList.add('rotate-0', 'opacity-100', 'scale-100');
    } else {
      sunIcon.classList.remove('rotate-90', 'opacity-0', 'scale-0');
      sunIcon.classList.add('rotate-0', 'opacity-100', 'scale-100');
      moonIcon.classList.remove('rotate-0', 'opacity-100', 'scale-100');
      moonIcon.classList.add('-rotate-90', 'opacity-0', 'scale-0');
    }
  }

  const isDark = document.documentElement.classList.contains('dark');
  updateThemeIcons(isDark);

  themeToggle.addEventListener('click', function () {
    const dark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('timeverse-theme', JSON.stringify(dark));
    updateThemeIcons(dark);
  });

  // ---- Header Scroll Effect ----
  const header = document.getElementById('header');
  window.addEventListener(
    'scroll',
    function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    },
    { passive: true }
  );

  // ---- Mobile Menu ----
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  menuBtn.addEventListener('click', function () {
    const isOpen = !mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    menuBtn.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      menuBtn.setAttribute('aria-label', 'Abrir menú');
    });
  });

  // ---- Scroll Reveal (Intersection Observer) ----
  const fadeElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );
  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // ---- Product Details Modal ----
  const modal = document.getElementById('product-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  function openModal(productId) {
    const product = PRODUCTS_DATA.find(function (p) {
      return p.id === productId;
    });
    if (!product) return;

    var featuresHtml = '';
    product.features.forEach(function (f) {
      featuresHtml +=
        '<li class="flex items-start gap-2 text-sm text-gray-300 dark:text-gray-300 text-gray-700"><svg class="text-accent-gold shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>' +
        f +
        '</li>';
    });

    var waLink =
      'https://wa.me/51970660178?text=' + encodeURIComponent(product.waMsg);

    modalBody.innerHTML =
      '<div class="grid md:grid-cols-2 gap-6 md:gap-8">' +
      '<div class="relative aspect-square rounded-xl overflow-hidden bg-dark-tertiary/30 dark:bg-dark-tertiary/30 bg-gray-100">' +
      '<img src="' +
      product.image +
      '" alt="' +
      product.name +
      '" class="w-full h-full object-cover" />' +
      '</div>' +
      '<div class="flex flex-col justify-between">' +
      '<div>' +
      '<div class="inline-block px-3 py-1 text-[10px] font-semibold tracking-wider uppercase bg-accent-gold/90 text-dark-primary rounded-full mb-3">Stock limitado</div>' +
      '<h3 class="text-xl sm:text-2xl font-bold text-white dark:text-white text-gray-900 mb-2">' +
      product.name +
      '</h3>' +
      '<p class="text-2xl sm:text-3xl font-bold text-accent-gold tracking-tight mb-4">' +
      product.price +
      '</p>' +
      '<p class="text-sm text-gray-400 dark:text-gray-400 text-gray-600 leading-relaxed mb-4">' +
      product.description +
      '</p>' +
      '<ul class="space-y-2 mb-4">' +
      featuresHtml +
      '</ul>' +
      '<p class="text-sm text-accent-gold/80 font-medium italic">' +
      product.ideal +
      '</p>' +
      '</div>' +
      '<a href="' +
      waLink +
      '" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-medium text-dark-primary bg-accent-gold rounded-xl hover:bg-accent-gold/90 transition-all duration-300">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z"/><path d="M9.5 13.5c.5.5 1.5 1 2.5 1s2-.5 2.5-1"/></svg>' +
      'Comprar por WhatsApp</a>' +
      '</div>' +
      '</div>';

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // Ver detalles buttons
  document.querySelectorAll('[data-ver-detalles]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = parseInt(this.getAttribute('data-ver-detalles'));
      openModal(id);
    });
  });

  // Comprar buttons (per product WhatsApp)
  document.querySelectorAll('[data-comprar]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var id = parseInt(this.getAttribute('data-comprar'));
      var product = PRODUCTS_DATA.find(function (p) {
        return p.id === id;
      });
      if (product) {
        window.open(
          'https://wa.me/51970660178?text=' + encodeURIComponent(product.waMsg),
          '_blank'
        );
      }
    });
  });

  modalOverlay.addEventListener('click', closeModal);
  modalClose.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // ---- Contact Form (EmailJS) ----
  if (document.getElementById('contact-form')) {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }

  const contactForm = document.getElementById('contact-form');
  const formSubmit = document.getElementById('form-submit');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const name = contactForm.querySelector('[name="name"]').value.trim();
      const whatsapp = contactForm
        .querySelector('[name="whatsapp"]')
        .value.trim();

      if (!name || !whatsapp) return;

      formSubmit.disabled = true;
      formSubmit.textContent = 'Enviando...';

      try {
        await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          {
            name: name,
            whatsapp: whatsapp,
            message: contactForm
              .querySelector('[name="message"]')
              .value.trim(),
          }
        );

        contactForm.classList.add('hidden');
        formSuccess.classList.remove('hidden');
      } catch (err) {
        console.error('EmailJS error:', err);
        formSubmit.disabled = false;
        formSubmit.textContent = 'Quiero que me contacten';
        alert('Ocurrió un error al enviar. Intenta nuevamente.');
      }
    });
  }

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
