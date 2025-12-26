(function () {
  /* ================== THEME SWITCH ================== */
  const switchEl = document.getElementById('themeSwitch');
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  const ball = document.getElementById('switchBall');

  if (saved === 'light') root.classList.add('light');

  function updateBall() {
    const accent = getComputedStyle(root).getPropertyValue('--accent');
    if (root.classList.contains('light')) {
      ball.style.transform = 'translateX(26px)';
    } else {
      ball.style.transform = 'translateX(0)';
    }
    ball.style.background = accent;
  }

  updateBall();

  switchEl.addEventListener('click', () => {
    root.classList.toggle('light');
    localStorage.setItem(
      'theme',
      root.classList.contains('light') ? 'light' : 'dark'
    );
    updateBall();
  });

  /* ================== TEXTO DIGITADO ================== */
  const typedEl = document.getElementById('typed');
  const text = 'Estudante de Dev. na ETEC • HTML • CSS • JS';
  let i = 0;

  function type() {
    if (i < text.length) {
      typedEl.textContent += text.charAt(i);
      i++;
      setTimeout(type, 45);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (typedEl) {
      typedEl.textContent = '';
      type();
    }
  });

  /* ================== ANO ATUAL ================== */
  const ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ================== REVEAL ON SCROLL ================== */
  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  /* ================== PROJETOS (MELHORADO) ================== */
  document.querySelectorAll('.projeto-card').forEach(card => {
    const btn = card.querySelector('.expand-btn');
    const content = card.querySelector('.expand-content');

    /* -------- Prévia -------- */
    if (btn && content) {
      btn.addEventListener('click', () => {
        const isOpen = content.classList.contains('open');

        // Fecha outros projetos abertos
        document.querySelectorAll('.expand-content.open').forEach(open => {
          if (open !== content) {
            open.classList.remove('open');
            const otherBtn = open
              .closest('.projeto-card')
              ?.querySelector('.expand-btn');
            if (otherBtn) otherBtn.textContent = 'Prévia';
          }
        });

        content.classList.toggle('open');
        btn.textContent = isOpen ? 'Prévia' : 'Fechar';
      });
    }

    /* -------- Carousel -------- */
    const carousel = card.querySelector('.carousel');
    if (carousel) {
      const scrollAmount = 220;

      const prev = document.createElement('button');
      prev.className = 'carousel-btn prev';
      prev.textContent = '◀';

      const next = document.createElement('button');
      next.className = 'carousel-btn next';
      next.textContent = '▶';

      carousel.appendChild(prev);
      carousel.appendChild(next);

      prev.addEventListener('click', e => {
        e.stopPropagation();
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      });

      next.addEventListener('click', e => {
        e.stopPropagation();
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      });

      // Drag suave
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      carousel.addEventListener('mousedown', e => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      });

      ['mouseup', 'mouseleave'].forEach(evt =>
        carousel.addEventListener(evt, () => (isDown = false))
      );

      carousel.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
      });
    }
  });
})();
// ===== CARROSSEL AUTOMÁTICO DOS PROJETOS =====
document.querySelectorAll('.auto-carousel').forEach(carousel => {
  const images = carousel.querySelectorAll('img');
  const prev = carousel.querySelector('.prev');
  const next = carousel.querySelector('.next');
  let index = 0;

  function showImage(i) {
    images.forEach(img => img.classList.remove('active'));
    images[i].classList.add('active');
  }

  function nextImage() {
    index = (index + 1) % images.length;
    showImage(index);
  }

  function prevImage() {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  }

  let interval = setInterval(nextImage, 3500);

  next.addEventListener('click', () => {
    nextImage();
    resetInterval();
  });

  prev.addEventListener('click', () => {
    prevImage();
    resetInterval();
  });

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextImage, 3500);
  }
});
