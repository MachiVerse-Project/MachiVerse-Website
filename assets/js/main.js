(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opening = document.querySelector('.opening');

  if (opening && !reduceMotion) {
    window.setTimeout(() => opening.classList.add('is-finished'), 1850);
  } else if (opening) {
    opening.classList.add('is-finished');
  }

  const revealTargets = [...document.querySelectorAll('.reveal')];

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('is-visible'));
    return;
  }

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
})();
