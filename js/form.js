// =========================================
// Contact Form
// =========================================
function initForm() {
  var nameInput = document.getElementById('input-name');
  var waInput = document.getElementById('input-whatsapp');
  var nameError = document.getElementById('name-error');
  var waError = document.getElementById('whatsapp-error');
  var contactForm = document.getElementById('contact-form');
  var formSubmit = document.getElementById('form-submit');
  var successModal = document.getElementById('success-modal');
  var successClose = document.getElementById('success-close');
  var successOverlay = document.getElementById('success-overlay');

  function validateName() {
    var val = nameInput.value.trim();
    if (val.length > 0 && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val)) {
      nameInput.classList.add('input-error');
      nameError.classList.remove('hidden');
      return false;
    }
    nameInput.classList.remove('input-error');
    nameError.classList.add('hidden');
    return true;
  }

  function validateWhatsApp() {
    var digits = waInput.value.replace(/\s/g, '');
    if (digits.length > 0 && (!/^\d+$/.test(digits) || digits.length !== 9)) {
      waInput.classList.add('input-error');
      waError.classList.remove('hidden');
      return false;
    }
    waInput.classList.remove('input-error');
    waError.classList.add('hidden');
    return true;
  }

  nameInput.addEventListener('input', validateName);
  waInput.addEventListener('input', validateWhatsApp);

  if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      var nameOk = validateName();
      var waOk = validateWhatsApp();
      if (!nameOk || !waOk) return;

      formSubmit.disabled = true;
      formSubmit.textContent = 'Enviando...';

      try {
        var res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          contactForm.reset();
          nameInput.classList.remove('input-error');
          waInput.classList.remove('input-error');
          nameError.classList.add('hidden');
          waError.classList.add('hidden');
          successModal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        } else {
          throw new Error('Formspree error');
        }
      } catch {
        formSubmit.disabled = false;
        formSubmit.textContent = 'Quiero que me contacten';
        alert('Ocurrió un error al enviar. Intenta nuevamente.');
      }
    });
  }

  function closeSuccess() {
    successModal.classList.add('hidden');
    document.body.style.overflow = '';
    formSubmit.disabled = false;
    formSubmit.textContent = 'Quiero que me contacten';
  }

  successClose.addEventListener('click', closeSuccess);
  successOverlay.addEventListener('click', closeSuccess);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !successModal.classList.contains('hidden')) {
      closeSuccess();
    }
  });
}
