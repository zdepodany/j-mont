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

  // Orientační kalkulačka ceny
  const calcArea = document.getElementById('calc-area');
  const calcTypeInputs = document.querySelectorAll('input[name="calc-type"]');
  const calcValue = document.getElementById('calc-value');
  const calcResult = document.getElementById('calc-result');
  const quickBtns = document.querySelectorAll('.quick-btn');

  const formatPrice = (num) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num) + ' Kč';
  };

  const getSelectedPrice = () => {
    const checked = document.querySelector('input[name="calc-type"]:checked');
    return parseInt(checked?.value || 0, 10);
  };

  const updateCalc = () => {
    const area = parseFloat(calcArea?.value);
    const pricePerM2 = getSelectedPrice();

    quickBtns.forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.area, 10) === area);
    });

    if (!area || area < 20) {
      calcValue.textContent = 'Zadejte plochu';
      calcResult?.classList.remove('has-value');
      return;
    }

    const total = Math.round(area * pricePerM2);
    calcValue.textContent = 'od ' + formatPrice(total);
    calcResult?.classList.add('has-value');
  };

  calcArea?.addEventListener('input', updateCalc);
  calcArea?.addEventListener('change', updateCalc);

  calcTypeInputs.forEach(input => {
    input.addEventListener('change', updateCalc);
  });

  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const area = btn.dataset.area;
      if (calcArea) calcArea.value = area;
      calcArea?.focus();
      updateCalc();
    });
  });
});
