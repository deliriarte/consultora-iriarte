/* =========================================
   Iriarte & Asociados — script.js
   ========================================= */

// ── Navbar: scroll state ──────────────────
(function () {
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Mobile nav (hamburger) ────────────────
(function () {
  const hamburger = document.getElementById('hamburger');

  // Inject mobile nav overlay into DOM
  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.innerHTML = `
    <a href="#inicio">Inicio</a>
    <a href="#servicios">Servicios</a>
    <a href="#contacto">Contacto</a>
    <a href="tel:+5402392415555" class="btn btn-primary">Llamar ahora</a>
    <a href="mailto:cdoririarte@gmail.com" class="btn btn-outline">Enviar email</a>
  `;
  document.body.appendChild(mobileNav);

  const toggleMenu = () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();

// ── Smooth scroll for anchor links ────────
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

// ── Scroll reveal (IntersectionObserver) ──
(function () {
  const targets = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  targets.forEach(el => observer.observe(el));
})();

// ── Active nav link on scroll ──────────────
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const setActive = () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--text)';
      }
    });
  };

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();

// ── Parallax: hero blobs on mouse move ─────
(function () {
  const blob1 = document.querySelector('.blob-1');
  const blob2 = document.querySelector('.blob-2');
  if (!blob1 || !blob2) return;

  let rafId;
  document.addEventListener('mousemove', e => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      blob1.style.transform = `translate(${x}px, ${y}px)`;
      blob2.style.transform = `translate(${-x * 0.6}px, ${-y * 0.6}px)`;
    });
  });
})();

// ── Card hover: subtle glow on cursor ─────
(function () {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });
})();
