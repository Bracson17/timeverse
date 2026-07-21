// =========================================
// Main Entry Point
// =========================================
document.addEventListener('DOMContentLoaded', function () {
  initTheme();
  initMenu();
  initScroll();
  initModal();
  initForm();
  initCarousels();
});

// =========================================
// Carousel
// =========================================
function initCarousels() {
  document.querySelectorAll('.carousel-container').forEach(function (container) {
    var images = container.querySelectorAll('.carousel-img');
    var dots = container.querySelectorAll('.carousel-dot');
    var prevBtn = container.querySelector('.carousel-prev');
    var nextBtn = container.querySelector('.carousel-next');
    var current = 0;
    var interval;

    function goTo(index) {
      images.forEach(function (img) { img.classList.remove('active'); });
      dots.forEach(function (dot) { dot.classList.remove('active'); });
      current = (index + images.length) % images.length;
      images[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() {
      stopAuto();
      interval = setInterval(next, 5000);
    }

    function stopAuto() {
      if (interval) { clearInterval(interval); interval = null; }
    }

    if (prevBtn) { prevBtn.addEventListener('click', function () { stopAuto(); prev(); startAuto(); }); }
    if (nextBtn) { nextBtn.addEventListener('click', function () { stopAuto(); next(); startAuto(); }); }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        stopAuto();
        goTo(parseInt(dot.getAttribute('data-index')));
        startAuto();
      });
    });

    container.addEventListener('mouseenter', stopAuto);
    container.addEventListener('mouseleave', startAuto);

    startAuto();
  });
}
