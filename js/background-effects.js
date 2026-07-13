// =========================================
// Background Effects - Particles & Glow Orb
// =========================================
function initBackgroundEffects() {
  const container = document.querySelector('.background-effects');
  if (!container) return;

  const particlesContainer = container.querySelector('.particles-container');
  const isDark = document.documentElement.classList.contains('dark');

  // Configuration
  const config = {
    particles: {
      count: isDark ? 30 : 15,
      minSize: 2,
      maxSize: isDark ? 5 : 3,
      minDuration: 15,
      maxDuration: 30,
      goldRatio: 0.7,
    },
    glowOrbs: {
      enabled: true,
    }
  };

  // Create particles
  function createParticles() {
    if (!particlesContainer) return;

    for (let i = 0; i < config.particles.count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Randomly choose gold or white particle
      const isGold = Math.random() < config.particles.goldRatio;
      particle.classList.add(isGold ? 'particle-gold' : 'particle-white');

      // Random size
      const size = config.particles.minSize + Math.random() * (config.particles.maxSize - config.particles.minSize);
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random horizontal position
      particle.style.left = `${Math.random() * 100}%`;

      // Random animation duration
      const duration = config.particles.minDuration + Math.random() * (config.particles.maxDuration - config.particles.minDuration);
      particle.style.animationDuration = `${duration}s`;

      // Random delay for staggered effect
      particle.style.animationDelay = `${Math.random() * duration}s`;

      particlesContainer.appendChild(particle);
    }
  }

  // Create glow orbs
  function createGlowOrbs() {
    const orb1 = document.createElement('div');
    orb1.classList.add('glow-orb', 'glow-orb-1');
    container.appendChild(orb1);

    const orb2 = document.createElement('div');
    orb2.classList.add('glow-orb', 'glow-orb-2');
    container.appendChild(orb2);

    const orb3 = document.createElement('div');
    orb3.classList.add('glow-orb', 'glow-orb-3');
    container.appendChild(orb3);
  }

  // Create light beams
  function createLightBeams() {
    const beamsContainer = document.createElement('div');
    beamsContainer.classList.add('light-beams');

    for (let i = 0; i < 3; i++) {
      const beam = document.createElement('div');
      beam.classList.add('light-beam');
      beamsContainer.appendChild(beam);
    }

    container.appendChild(beamsContainer);
  }

  // Mouse interaction - subtle glow follow
  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function animateOrb() {
    // Smooth interpolation
    currentX += (mouseX - currentX) * 0.02;
    currentY += (mouseY - currentY) * 0.02;

    const orb3 = container.querySelector('.glow-orb-3');
    if (orb3) {
      orb3.style.transform = `translate(calc(-50% + ${(currentX - window.innerWidth / 2) * 0.05}px), calc(-50% + ${(currentY - window.innerHeight / 2) * 0.05}px))`;
    }

    requestAnimationFrame(animateOrb);
  }

  // Initialize
  createParticles();
  createGlowOrbs();
  createLightBeams();

  // Add mouse tracking if not reduced motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    animateOrb();
  }

  // Handle theme change
  window.addEventListener('themechange', (e) => {
    const isDark = e.detail.dark;
    container.style.opacity = isDark ? '1' : '0.8';
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initBackgroundEffects);
