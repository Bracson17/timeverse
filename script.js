// =========================================
// EmailJS Configuration
// =========================================
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY',
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
};

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

  // Initial state
  const isDark = document.documentElement.classList.contains('dark');
  updateThemeIcons(isDark);

  themeToggle.addEventListener('click', function () {
    const dark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('timeverse-theme', JSON.stringify(dark));
    updateThemeIcons(dark);
  });

  // ---- Header Scroll Effect ----
  const header = document.getElementById('header');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

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

  // Close mobile menu on link click
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

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  });

  fadeElements.forEach(function (el) {
    observer.observe(el);
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
      const whatsapp = contactForm.querySelector('[name="whatsapp"]').value.trim();

      if (!name || !whatsapp) return;

      formSubmit.disabled = true;
      formSubmit.textContent = 'Enviando...';

      try {
        await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, {
          name: name,
          whatsapp: whatsapp,
          message: contactForm.querySelector('[name="message"]').value.trim(),
        });

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

  // ---- Smooth scroll for anchor links (fallback) ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
