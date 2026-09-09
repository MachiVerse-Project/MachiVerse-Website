(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opening = document.querySelector('.opening');
  const progress = document.querySelector('.scroll-progress');
  const parallaxTarget = document.querySelector('[data-parallax]');

  let openingSeen = false;
  try {
    openingSeen = window.sessionStorage.getItem('machiverse-opening-seen') === '1';
  } catch {
    openingSeen = false;
  }

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
      try {
        window.sessionStorage.setItem('machiverse-opening-seen', '1');
      } catch {
        // The intro remains functional even when storage is unavailable.
      }
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
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.12,
    });

    revealTargets.forEach((element) => observer.observe(element));
  }

  let scrollFrame = 0;
  const updateScrollProgress = () => {
    scrollFrame = 0;
    if (!progress) return;

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progress.style.transform = `scaleX(${ratio})`;
  };

  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScrollProgress);
  }, { passive: true });
  updateScrollProgress();

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
