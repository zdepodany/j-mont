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
});
