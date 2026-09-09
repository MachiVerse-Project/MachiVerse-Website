(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opening = document.querySelector('.opening');
  const progress = document.querySelector('.scroll-progress');
  const parallaxTarget = document.querySelector('[data-parallax]');
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const observedSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  const teaserStyles = document.createElement('link');
  teaserStyles.rel = 'stylesheet';
  teaserStyles.href = './assets/css/teaser.css';
  document.head.appendChild(teaserStyles);

  let openingSeen = false;
  try { openingSeen = window.sessionStorage.getItem('machiverse-opening-seen') === '1'; } catch { openingSeen = false; }

  const finishOpening = () => {
    root.classList.remove('opening-pending');
    opening?.classList.add('is-finished');
  };

  if (!opening || reduceMotion || openingSeen) {
    finishOpening();
  } else {
    window.setTimeout(() => root.classList.remove('opening-pending'), 1350);
    window.setTimeout(() => {
      opening.classList.add('is-finished');
      try { window.sessionStorage.setItem('machiverse-opening-seen', '1'); } catch {}
    }, 1850);
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
