// =========================================
// Product Details Modal
// =========================================
function initModal() {
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
}
