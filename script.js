/**
 * j-mont - Website interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');

  navToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    navToggle?.setAttribute('aria-label', 
      navMenu?.classList.contains('active') ? 'Zavřít menu' : 'Otevřít menu'
    );
  });

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
    });
  });

  // Header background on scroll
  const header = document.querySelector('.header');
  
  const updateHeader = () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Animace čísel ve stats panelu
  const statNumbers = document.querySelectorAll('.stat-number[data-value]');
  const statsPanel = document.querySelector('.stats-panel');

  const animateValue = (el, start, end, duration, suffix = '') => {
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * easeOut);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const animateRange = (el, start1, end1, start2, end2, duration) => {
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current1 = Math.round(start1 + (end1 - start1) * easeOut);
      const current2 = Math.round(start2 + (end2 - start2) * easeOut);
      el.textContent = current1 + '–' + current2;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const runStatAnimations = () => {
    statNumbers.forEach((el) => {
      if (el.dataset.animated) return;
      const value = parseInt(el.dataset.value, 10);
      const value2 = el.dataset.value2 ? parseInt(el.dataset.value2, 10) : null;
      const suffix = el.dataset.suffix || '';

      el.dataset.animated = 'true';

      if (value2 !== null) {
        animateRange(el, 0, value, 0, value2, 1500);
      } else {
        animateValue(el, 0, value, 1500, suffix);
      }
    });
  };

  if (statsPanel && statNumbers.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) runStatAnimations();
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(statsPanel);
  }

  // Načítací efekt pro prvky při scrollu
  const revealSelectors = [
    '.hero-content',
    '.section',
    '.gallery-item',
    '.gallery-all-link',
    '.stats-panel',
    '.service-card',
    '.pricing-card',
    '.process-step',
    '.testimonial',
    '.contact-info-card',
    '.contact-form-wrapper',
    '.reason-item'
  ];

  const revealElements = revealSelectors.flatMap(sel => Array.from(document.querySelectorAll(sel)));

  revealElements.forEach(el => {
    el.classList.add('reveal');
    const parent = el.parentElement;
    if (parent?.classList.contains('services-grid') || 
        parent?.classList.contains('pricing-cards') ||
        parent?.classList.contains('process-steps') ||
        parent?.classList.contains('testimonials') ||
        parent?.classList.contains('reasons-grid') ||
        parent?.classList.contains('gallery')) {
      parent.classList.add('reveal-stagger');
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(el => revealObserver.observe(el));
});
