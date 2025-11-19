// ============================
// Navegación móvil
// ============================

const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('#main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cierra el menú al seleccionar un enlace
  mainNav.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ============================
// Scroll suave para enlaces internos
// ============================

document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;

  const targetId = link.getAttribute('href').substring(1);
  const targetEl = document.getElementById(targetId);
  if (!targetEl) return;

  e.preventDefault();
  targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ============================
// Año dinámico en el footer
// ============================

const footerYear = document.getElementById('footer-year');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

// ============================
// Galería: filtros y lightbox
// ============================

const filterButtons = document.querySelectorAll('.gallery-filters [data-filter]');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter || 'all';

    // Estado visual del botón activo
    filterButtons.forEach((b) => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    // Mostrar / ocultar elementos
    galleryItems.forEach((item) => {
      const cat = item.dataset.category || '';
      if (filter === 'all' || cat === filter) {
        item.style.opacity = '1';
        item.style.pointerEvents = 'auto';
        item.style.transform = '';
      } else {
        item.style.opacity = '0.2';
        item.style.pointerEvents = 'none';
      }
    });
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(src, alt, caption) {
  if (!lightbox || !lightboxImg || !lightboxCaption) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!lightbox || !lightboxImg || !lightboxCaption) return;
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImg.src = '';
  lightboxImg.alt = '';
  lightboxCaption.textContent = '';
}

// Abrir lightbox al hacer clic en una imagen de la galería
galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const fullSrc = item.dataset.full;
    const caption = item.dataset.caption;
    const img = item.querySelector('img');
    if (!fullSrc || !img) return;
    openLightbox(fullSrc, img.alt, caption);
  });
});

// Cerrar lightbox con fondo, botón o tecla ESC
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target.matches('[data-lightbox-close]') || e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

// ============================
// Formularios: feedback básico
// ============================

function handleFormSubmit(formId, feedbackId) {
  const form = document.getElementById(formId);
  const feedback = document.getElementById(feedbackId);
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Aquí se puede reemplazar por integración real (fetch a backend, etc.)
    feedback.textContent = 'Formulario enviado correctamente. Nos pondremos en contacto contigo en breve.';
    form.reset();

    // Limpia el mensaje después de unos segundos
    setTimeout(() => {
      feedback.textContent = '';
    }, 5000);
  });
}

handleFormSubmit('inscripcion-form', 'inscripcion-feedback');
handleFormSubmit('contacto-form', 'contacto-feedback');
