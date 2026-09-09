(() => {
  const root = document.documentElement;
  const body = document.body;
  const isJapanese = (root.lang || '').toLowerCase().startsWith('ja');
  const isNagumoSite = body.classList.contains('nagumo-site');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opening = document.querySelector('.opening');
  const progress = document.querySelector('.scroll-progress');
  const parallaxTarget = document.querySelector('[data-parallax]');
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const observedSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  const nagumoStyles = document.createElement('link');
  nagumoStyles.rel = 'stylesheet';
  nagumoStyles.href = './assets/css/nagumo.css';
  document.head.appendChild(nagumoStyles);

  const teaserStyles = document.createElement('link');
  teaserStyles.rel = 'stylesheet';
  teaserStyles.href = './assets/css/teaser.css';
  document.head.appendChild(teaserStyles);

  const developerHero = document.querySelector('.developer-page .developer-hero-grid > div:first-child');
  if (developerHero) {
    const note = document.createElement('p');
    note.className = 'developer-nagumo-note';
    note.innerHTML = isJapanese
      ? '<strong>南雲 澪 / システム開発者</strong><br>ここから先は、MachiVerseを実際に動かしている仕組みの話をします。'
      : '<strong>Mio Nagumo / System Developer</strong><br>From here, I’ll focus on the implementation that actually makes MachiVerse run.';
    developerHero.prepend(note);
  }

  const statusSection = document.querySelector('#status');
  if (statusSection && !isNagumoSite) {
    const teaserCopy = isJapanese ? {
      aria: 'MachiVerse 特報',
      label: 'MachiVerse 特報 / SPECIAL TEASER',
      lines: ['世界が生まれる。', '歴史が積み重なる。', 'そして、現在になる。'],
      status: '世界の初期状態から、歴史は動き始める。',
      sequence: ['環境', '住民', '社会', '経済', '都市', '歴史']
    } : {
      aria: 'MachiVerse special teaser',
      label: 'MACHIVERSE / SPECIAL TEASER',
      lines: ['A world begins.', 'History accumulates.', 'And becomes the present.'],
      status: 'WORLD SEED INITIALIZED / HISTORY IN PROGRESS',
      sequence: ['ENVIRONMENT', 'RESIDENT', 'SOCIETY', 'ECONOMY', 'CITY', 'HISTORY']
    };

    const teaser = document.createElement('section');
    teaser.className = 'teaser-section';
    teaser.setAttribute('aria-label', teaserCopy.aria);

    const frame = document.createElement('div');
    frame.className = 'teaser-frame';

    const grid = document.createElement('div');
    grid.className = 'teaser-grid';
    grid.setAttribute('aria-hidden', 'true');

    const flare = document.createElement('div');
    flare.className = 'teaser-flare';
    flare.setAttribute('aria-hidden', 'true');

    const copy = document.createElement('div');
    copy.className = 'teaser-copy';

    const label = document.createElement('p');
    label.className = 'teaser-label';
    label.textContent = teaserCopy.label;

    const title = document.createElement('h2');
    title.className = 'teaser-title';
    teaserCopy.lines.forEach((text) => {
      const line = document.createElement('span');
      line.textContent = text;
      title.appendChild(line);
    });

    const status = document.createElement('p');
    status.className = 'teaser-status';
    status.textContent = teaserCopy.status;

    const sequence = document.createElement('div');
    sequence.className = 'teaser-sequence';
    sequence.setAttribute('aria-hidden', 'true');
    teaserCopy.sequence.forEach((text) => {
      const item = document.createElement('span');
      item.textContent = text;
      sequence.appendChild(item);
    });

    copy.append(label, title, status);
    frame.append(grid, flare, copy, sequence);
    teaser.appendChild(frame);
    statusSection.before(teaser);

    const steps = [...sequence.children];
    let step = 0;
    let timer = 0;
    const setStep = () => {
      steps.forEach((item, index) => item.classList.toggle('is-active', index === step));
      step = (step + 1) % steps.length;
    };
    const start = () => {
      teaser.classList.add('is-running');
      if (reduceMotion || timer) return;
      setStep();
      timer = window.setInterval(setStep, 780);
    };
    const stop = () => {
      if (timer) window.clearInterval(timer);
      timer = 0;
    };

    if (reduceMotion || !('IntersectionObserver' in window)) {
      start();
    } else {
      const teaserObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => entry.isIntersecting ? start() : stop());
      }, { threshold: 0.32 });
      teaserObserver.observe(teaser);
    }
  }

  let openingSeen = false;
  try { openingSeen = window.sessionStorage.getItem('machiverse-opening-seen') === '1'; } catch { openingSeen = false; }

  const finishOpening = () => {
    root.classList.remove('opening-pending');
    opening?.classList.add('is-finished');
  };

  if (!opening || reduceMotion || openingSeen) {
    finishOpening();
  } else {
    window.setTimeout(() => root.classList.remove('opening-pending'), 1100);
    window.setTimeout(() => {
      opening.classList.add('is-finished');
      try { window.sessionStorage.setItem('machiverse-opening-seen', '1'); } catch {}
    }, 1550);
  }

  const revealTargets = [...document.querySelectorAll('.reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  } else {
    revealTargets.forEach((element) => {
      const delay = Number(element.dataset.revealDelay || 0);
      element.style.transitionDelay = `${delay}ms`;
    });
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealTargets.forEach((element) => observer.observe(element));
  }

  if ('IntersectionObserver' in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.01, 0.25, 0.5] });
    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  let scrollFrame = 0;
  const updateScrollEffects = () => {
    scrollFrame = 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;
    if (!reduceMotion) {
      root.style.setProperty('--page-scroll', ratio.toFixed(4));
      root.style.setProperty('--hero-ray-shift', `${Math.min(70, window.scrollY * 0.035)}px`);
    }
  };

  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScrollEffects);
  }, { passive: true });
  updateScrollEffects();

  if (!reduceMotion && parallaxTarget && window.matchMedia('(pointer: fine)').matches) {
    let pointerFrame = 0;
    let nextX = 0;
    let nextY = 0;
    const applyParallax = () => {
      pointerFrame = 0;
      parallaxTarget.style.setProperty('--parallax-x', `${nextX}px`);
      parallaxTarget.style.setProperty('--parallax-y', `${nextY}px`);
    };
    window.addEventListener('pointermove', (event) => {
      nextX = ((event.clientX / window.innerWidth) - 0.5) * 12;
      nextY = ((event.clientY / window.innerHeight) - 0.5) * 9;
      if (!pointerFrame) pointerFrame = window.requestAnimationFrame(applyParallax);
    }, { passive: true });
  }
})();
