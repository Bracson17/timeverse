function initCarousel(container) {
  var images = container.querySelectorAll('.carousel-img');
  var dots = container.querySelectorAll('.carousel-dot');
  var prevBtn = container.querySelector('.carousel-prev');
  var nextBtn = container.querySelector('.carousel-next');
  var current = 0;
  var interval;

  function goTo(index) {
    stopAuto();

    container.querySelectorAll('video.carousel-img').forEach(function (v) { v.pause(); });

    images.forEach(function (img) { img.classList.remove('active'); });
    dots.forEach(function (dot) { dot.classList.remove('active'); });
    current = (index + images.length) % images.length;
    images[current].classList.add('active');
    dots[current].classList.add('active');

    var activeEl = images[current];
    if (activeEl && activeEl.tagName === 'VIDEO') {
      if (activeEl._onEnd) {
        activeEl.removeEventListener('ended', activeEl._onEnd);
      }
      activeEl._onEnd = function onEnd() {
        var idx = parseInt(activeEl.getAttribute('data-index'));
        activeEl.removeEventListener('ended', activeEl._onEnd);
        activeEl._onEnd = null;
        goTo(idx + 1);
      };
      activeEl.addEventListener('ended', activeEl._onEnd);
      activeEl.currentTime = 0;
      activeEl.play().catch(function () {});
    } else {
      startAuto();
    }
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

  if (prevBtn) { prevBtn.addEventListener('click', function () { prev(); }); }
  if (nextBtn) { nextBtn.addEventListener('click', function () { next(); }); }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(dot.getAttribute('data-index')));
    });
  });

  container.addEventListener('mouseenter', stopAuto);
  container.addEventListener('mouseleave', function () {
    var activeEl = images[current];
    if (!(activeEl && activeEl.tagName === 'VIDEO')) {
      startAuto();
    }
  });

  startAuto();
}

function initCarousels() {
  document.querySelectorAll('.carousel-container').forEach(initCarousel);
}
