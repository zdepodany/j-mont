/**
 * Lightbox pro galerii realizací
 * Klik na obrázek → zvětšení na celou obrazovku, listování v rámci projektu
 */

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = lightbox?.querySelector('.lightbox-close');
  const prevBtn = lightbox?.querySelector('.lightbox-prev');
  const nextBtn = lightbox?.querySelector('.lightbox-next');

  let currentImages = [];
  let currentIndex = 0;

  const openLightbox = (images, index) => {
    currentImages = images;
    currentIndex = index;
    updateLightboxImage();
    lightbox?.setAttribute('aria-hidden', 'false');
    lightbox?.classList.add('active');
    lightbox?.classList.toggle('single-image', images.length <= 1);
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  const closeLightbox = () => {
    lightbox?.setAttribute('aria-hidden', 'true');
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  };

  const updateLightboxImage = () => {
    if (!lightboxImg || !currentImages.length) return;
    const img = currentImages[currentIndex];
    lightboxImg.src = img.src.replace(/w=\d+/, 'w=1920');
    lightboxImg.alt = img.alt;
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    }
  };

  const showPrev = () => {
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
  };

  const showNext = () => {
    if (currentImages.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
  };

  // Klik na obrázek v galerii
  document.querySelectorAll('.project-gallery img').forEach((img) => {
    img.addEventListener('click', () => {
      const gallery = img.closest('.project-gallery');
      const images = Array.from(gallery?.querySelectorAll('img') || []);
      const index = images.indexOf(img);
      openLightbox(images, index);
    });
  });

  // Ovládání lightboxu
  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Klávesnice
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
  });
});
