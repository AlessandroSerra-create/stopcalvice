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
  // 6. SCROLL ANIMATION — Canvas Frame Sequence
  // ═══════════════════════════════════════════════════════════════

  (function initScrollAnim() {
    const canvas = document.getElementById('scrollCanvas');
    const loader = document.getElementById('scrollLoader');
    const section = document.querySelector('.scroll-anim-section');
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    const FRAME_COUNT = 86;
    const FRAME_DIR = './assets/frames-upscaled';
    const frames = [];
    let loadedCount = 0;
    let currentFrame = -1;
    let ticking = false;

    // Retina support
    function sizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    }
    sizeCanvas();
    window.addEventListener('resize', function() {
      sizeCanvas();
      if (currentFrame >= 0 && frames[currentFrame]) drawFrame(currentFrame);
    });

    // Cover-fit draw (desktop) / zoomed contain (mobile)
    function drawFrame(index) {
      const img = frames[index];
      if (!img) return;
      currentFrame = index;

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const cW = window.innerWidth;
      const cH = window.innerHeight;
      const iW = img.naturalWidth;
      const iH = img.naturalHeight;

      let drawW, drawH, drawX, drawY;

      if (window.innerWidth < 768) {
        // Mobile: contain-fit + 1.2x zoom
        const scale = Math.min(cW / iW, cH / iH) * 1.2;
        drawW = iW * scale;
        drawH = iH * scale;
        drawX = (cW - drawW) / 2;
        drawY = (cH - drawH) / 2;
      } else {
        // Desktop: cover-fit
        const scale = Math.max(cW / iW, cH / iH);
        drawW = iW * scale;
        drawH = iH * scale;
        drawX = (cW - drawW) / 2;
        drawY = (cH - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }

    // Preload all frames
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const num = String(i).padStart(4, '0');
      img.src = FRAME_DIR + '/frame_' + num + '.webp';
      img.onload = function() {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          loader.classList.add('hidden');
          drawFrame(0);
          onScroll();
        }
      };
      img.onerror = function() {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          loader.classList.add('hidden');
          drawFrame(0);
        }
      };
      frames.push(img);
    }

    // Annotation cards
    var annotations = document.querySelectorAll('.scroll-annotation');

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function() {
        ticking = false;
        var rect = section.getBoundingClientRect();
        var sectionH = section.offsetHeight - window.innerHeight;
        var scrolled = -rect.top;
        var progress = Math.max(0, Math.min(1, scrolled / sectionH));

        // Map progress to frame index
        var frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
        if (frameIndex !== currentFrame && frames[frameIndex]) {
          drawFrame(frameIndex);
        }

        // Annotation visibility
        annotations.forEach(function(ann) {
          var show = parseFloat(ann.dataset.show);
          var hide = parseFloat(ann.dataset.hide);
          if (progress >= show && progress <= hide) {
            ann.classList.add('visible');
          } else {
            ann.classList.remove('visible');
          }
        });

        // Hide annotation when section not in view
        var inSection = rect.top <= 0 && rect.bottom >= window.innerHeight;
        if (!inSection) {
          annotations.forEach(function(ann) { ann.classList.remove('visible'); });
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();

  // ═══════════════════════════════════════════════════════════════
  // 6B. FORM HANDLER (base — da collegare a backend futuro)
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
  // 7. ROI CALCULATOR
  // ═══════════════════════════════════════════════════════════════

  const calcAtendimentos = document.getElementById('calcAtendimentos');
  const calcTicket = document.getElementById('calcTicket');
  const calcPeriodo = document.getElementById('calcPeriodo');

  function formatBRL(value) {
    return 'R$ ' + value.toLocaleString('pt-BR');
  }

  function updateCalc() {
    const atendimentos = parseInt(calcAtendimentos.value);
    const ticket = parseInt(calcTicket.value);
    const meses = parseInt(calcPeriodo.value);
    const margem = 0.35;
    const investimento = 150000;

    const fatMensal = atendimentos * ticket;
    const lucroMensal = fatMensal * margem;
    const lucroTotal = lucroMensal * meses;
    const fatTotal = fatMensal * meses;
    const tempoROI = Math.ceil(investimento / lucroMensal);

    // Update display values
    document.getElementById('valAtendimentos').textContent = atendimentos;
    document.getElementById('valTicket').textContent = formatBRL(ticket);
    document.getElementById('valPeriodo').textContent = meses;

    // Update output
    document.getElementById('calcLucroTotal').textContent = formatBRL(lucroTotal);
    document.getElementById('calcPeriodoText').textContent = 'Em ' + meses + ' meses de operação';
    document.getElementById('calcFatMensal').textContent = formatBRL(fatMensal);
    document.getElementById('calcLucroMensal').textContent = formatBRL(lucroMensal);
    document.getElementById('calcTempoROI').textContent = tempoROI + (tempoROI === 1 ? ' mês' : ' meses');
    document.getElementById('calcFatTotal').textContent = formatBRL(fatTotal);
  }

  if (calcAtendimentos && calcTicket && calcPeriodo) {
    calcAtendimentos.addEventListener('input', updateCalc);
    calcTicket.addEventListener('input', updateCalc);
    calcPeriodo.addEventListener('input', updateCalc);
    updateCalc();
  }

  // ═══════════════════════════════════════════════════════════════
  // 8. SMOOTH SCROLL per anchor link
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
