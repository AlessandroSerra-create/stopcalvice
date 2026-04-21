/* ═══════════════════════════════════════════════════════════════
   STOPCALVICIE FRANQUIA — JAVASCRIPT
   Navbar scroll, Word Split hero, Fade Up, Stagger, Counter
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ═══════════════════════════════════════════════════════════════
  // 1. NAVBAR TRANSFORM ON SCROLL
  // ═══════════════════════════════════════════════════════════════

  const navbar = document.getElementById('navbar');

  function handleScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ═══════════════════════════════════════════════════════════════
  // 2. MOBILE MENU
  // ═══════════════════════════════════════════════════════════════

  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
    });

    // Chiudi menu al click su link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 3. WORD SPLIT ANIMATION — HERO TITLE
  // ═══════════════════════════════════════════════════════════════

  const heroTitle = document.getElementById('heroTitle');

  if (heroTitle) {
    const fullText = heroTitle.getAttribute('aria-label');
    // Parole da evidenziare
    const highlightWords = ['tricologia', '10%'];

    const words = fullText.split(' ');
    let html = '';

    words.forEach((word, i) => {
      // Clean word for comparison
      const clean = word.toLowerCase().replace(/[.,!?]/g, '');
      const isHighlight = highlightWords.some(hw => clean.includes(hw));
      const classes = isHighlight ? 'word highlight' : 'word';
      const delay = (i * 0.05).toFixed(2);
      html += `<span class="${classes}" style="transition-delay: ${delay}s">${word}</span>${i < words.length - 1 ? ' ' : ''}`;
    });

    heroTitle.innerHTML = html;

    // Avvia animazione dopo 200ms
    setTimeout(() => {
      heroTitle.classList.add('animate');
    }, 200);
  }

  // ═══════════════════════════════════════════════════════════════
  // 4. FADE UP + STAGGER CARDS — Intersection Observer
  // ═══════════════════════════════════════════════════════════════

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.fade-up, .stagger-card').forEach(el => {
    fadeObserver.observe(el);
  });

  // ═══════════════════════════════════════════════════════════════
  // 5. COUNTER ANIMATION
  // ═══════════════════════════════════════════════════════════════

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      // Easing cubic out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add visible class to parent stat-item
        const statItem = entry.target.closest('.stat-item');
        if (statItem) statItem.classList.add('visible');
        // Start counter animation
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  document.querySelectorAll('.counter').forEach(el => {
    counterObserver.observe(el);
  });

  // Anche i stat-item visibili (anche senza counter)
  const statItemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        statItemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.stat-item').forEach(el => {
    statItemObserver.observe(el);
  });

  // ═══════════════════════════════════════════════════════════════
  // 6. FORM HANDLER (base — da collegare a backend futuro)
  // ═══════════════════════════════════════════════════════════════

  const leadForm = document.getElementById('leadForm');

  if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(leadForm);
      const data = Object.fromEntries(formData);

      // Validazione base
      if (!data.nome || !data.email || !data.whatsapp || !data.cidade) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

      // Email check
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        alert('Por favor, insira um email válido.');
        return;
      }

      // TODO: inviare dati a backend / CRM / Formspree / etc.
      console.log('Lead capturato:', data);

      // Per ora: redirect WhatsApp con dati pre-compilati
      const message = encodeURIComponent(
        `Olá! Quero abrir minha franquia StopCalvície.\n\n` +
        `Nome: ${data.nome}\n` +
        `Email: ${data.email}\n` +
        `WhatsApp: ${data.whatsapp}\n` +
        `Cidade: ${data.cidade}`
      );
      const whatsappUrl = `https://api.whatsapp.com/send?phone=5519992199621&text=${message}`;

      // Mostra conferma e apre WhatsApp
      const submitBtn = leadForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '✓ Redirecionando para WhatsApp...';
      submitBtn.disabled = true;

      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        leadForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 800);
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // 7. SMOOTH SCROLL per anchor link
  // ═══════════════════════════════════════════════════════════════

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 100;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
