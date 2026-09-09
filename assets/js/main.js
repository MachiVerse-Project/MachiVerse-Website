(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opening = document.querySelector('.opening');
  const progress = document.querySelector('.scroll-progress');
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const observedSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  let openingSeen = false;
  try { openingSeen = window.sessionStorage.getItem('machiverse-opening-seen') === '1'; } catch {}
  const finishOpening = () => {
    root.classList.remove('opening-pending');
    opening?.classList.add('is-finished');
  };
  if (!opening || reduceMotion || openingSeen) {
    finishOpening();
  } else {
    window.setTimeout(() => root.classList.remove('opening-pending'), 900);
    window.setTimeout(() => {
      opening.classList.add('is-finished');
      try { window.sessionStorage.setItem('machiverse-opening-seen', '1'); } catch {}
    }, 1350);
  }

  const revealTargets = [...document.querySelectorAll('.reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
  } else {
    revealTargets.forEach((element) => {
      const delay = Number(element.dataset.revealDelay || 0);
      element.style.transitionDelay = `${delay}ms`;
    });
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  if ('IntersectionObserver' in window && observedSections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-26% 0px -60% 0px', threshold: [0.01, 0.2, 0.5] });
    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  const mioDock = document.querySelector('[data-mio-dock]');
  const mioSections = [...document.querySelectorAll('[data-mio-pose]')];
  if (mioDock && mioSections.length) {
    const image = mioDock.querySelector('[data-mio-image]');
    const kicker = mioDock.querySelector('[data-mio-kicker]');
    const title = mioDock.querySelector('[data-mio-title]');
    const text = mioDock.querySelector('[data-mio-text]');
    let current = null;

    const applyMio = (section) => {
      if (!section || current === section) return;
      current = section;
      mioDock.classList.add('is-changing');
      const update = () => {
        if (image && section.dataset.mioPose) image.src = section.dataset.mioPose;
        if (image && section.dataset.mioAlt) image.alt = section.dataset.mioAlt;
        if (kicker) kicker.textContent = section.dataset.mioKicker || '';
        if (title) title.textContent = section.dataset.mioTitle || '';
        if (text) text.textContent = section.dataset.mioText || '';
        mioDock.classList.remove('is-changing');
      };
      reduceMotion ? update() : window.setTimeout(update, 130);
    };

    applyMio(mioSections[0]);
    if ('IntersectionObserver' in window) {
      const mioObserver = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) applyMio(visible.target);
      }, { rootMargin: '-22% 0px -54% 0px', threshold: [0.01, 0.18, 0.42] });
      mioSections.forEach((section) => mioObserver.observe(section));
    }
  }

  let scrollFrame = 0;
  const updateScroll = () => {
    scrollFrame = 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;
  };
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScroll);
  }, { passive: true });
  updateScroll();
})();
