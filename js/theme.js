// =========================================
// Theme Toggle
// =========================================
function initTheme() {
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
}
