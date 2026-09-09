(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opening = document.querySelector('.opening');
  const progress = document.querySelector('.scroll-progress');
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const observedSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const navigatorSite = document.body?.classList.contains('navigator-site');

  if (navigatorSite) {
    const framingStyles = document.createElement('link');
    framingStyles.rel = 'stylesheet';
    framingStyles.href = './assets/css/nagumo-framing.css';
    document.head.appendChild(framingStyles);

    if (!document.body.classList.contains('navigator-developer')) {
      const polishStyles = document.createElement('link');
      polishStyles.rel = 'stylesheet';
      polishStyles.href = './assets/css/public-polish.css';
      document.head.appendChild(polishStyles);

      const isJapanese = document.documentElement.lang === 'ja';
      const diverFigure = document.querySelector('#diver .diver-photo-main');
      if (diverFigure && !diverFigure.querySelector('.viewer-visual-label')) {
        const label = document.createElement('figcaption');
        label.className = 'viewer-visual-label';
        label.textContent = isJapanese
          ? 'CONCEPT VISUAL — 現在のGeneral View UIではありません'
          : 'CONCEPT VISUAL — not the current General View UI';
        diverFigure.appendChild(label);
      }

      const diverCopy = document.querySelector('#diver .story-copy');
      if (diverCopy && !diverCopy.querySelector('.viewer-proof-strip')) {
        const proofStrip = document.createElement('div');
        proofStrip.className = 'viewer-proof-strip';
        proofStrip.setAttribute('aria-label', isJapanese ? 'General Viewで実装済みの内容' : 'Implemented General View evidence');

        const facts = isJapanese
          ? [
              ['GENERAL VIEW', '実ブラウザE2E'],
              ['DIVER OP', '最小参加操作を実接続'],
              ['CONFIRMED STATE', 'FULL / DELTAでViewへ反映']
            ]
          : [
              ['GENERAL VIEW', 'real browser E2E'],
              ['DIVER OP', 'minimal participation operation'],
              ['CONFIRMED STATE', 'FULL / DELTA back to the View']
            ];

        facts.forEach(([title, detail]) => {
          const item = document.createElement('span');
          const heading = document.createElement('b');
          const copy = document.createElement('small');
          heading.textContent = title;
          copy.textContent = detail;
          item.append(heading, copy);
          proofStrip.appendChild(item);
        });

        const diverButton = diverCopy.querySelector('.button');
        diverButton ? diverButton.before(proofStrip) : diverCopy.appendChild(proofStrip);
      }
    }

    const motionStyles = document.createElement('link');
    motionStyles.rel = 'stylesheet';
    motionStyles.href = './assets/css/motion-system.css';
    document.head.appendChild(motionStyles);
  }

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

  /* Run larger sequences only while their section is actually on screen. */
  if (navigatorSite && !reduceMotion) {
    const motionSections = [...document.querySelectorAll(
      '.product-proof-section, .world-model-section, .diver-stage, .alpha-proof-section, .join-stage, .navigator-developer section'
    )];

    if ('IntersectionObserver' in window) {
      const motionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-motion-active', entry.isIntersecting && entry.intersectionRatio > 0.08);
        });
      }, { rootMargin: '-8% 0px -10% 0px', threshold: [0.01, 0.08, 0.28] });
      motionSections.forEach((section) => motionObserver.observe(section));
    } else {
      motionSections.forEach((section) => section.classList.add('is-motion-active'));
    }

    /* Fine-pointer hero parallax: intentionally small so copy remains stable. */
    const hero = document.querySelector('.navigator-hero');
    const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
    if (hero && finePointer) {
      let pointerFrame = 0;
      let pointerX = 0;
      let pointerY = 0;

      const paintPointer = () => {
        pointerFrame = 0;
        hero.style.setProperty('--motion-x', `${pointerX}px`);
        hero.style.setProperty('--motion-y', `${pointerY}px`);
      };

      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) - 0.5;
        const y = ((event.clientY - rect.top) / rect.height) - 0.5;
        pointerX = x * 24;
        pointerY = y * 18;
        if (!pointerFrame) pointerFrame = window.requestAnimationFrame(paintPointer);
      }, { passive:true });

      hero.addEventListener('pointerleave', () => {
        pointerX = 0;
        pointerY = 0;
        if (!pointerFrame) pointerFrame = window.requestAnimationFrame(paintPointer);
      }, { passive:true });
    }
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

      const footer = document.querySelector('.site-footer');
      if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
          const shouldClearFooter = entries.some((entry) => entry.isIntersecting);
          mioDock.classList.toggle('is-footer-clear', shouldClearFooter);
          mioDock.setAttribute('aria-hidden', shouldClearFooter ? 'true' : 'false');
        }, { rootMargin: '0px 0px 96px 0px', threshold: 0 });
        footerObserver.observe(footer);
      }
    }
  }

  const hero = document.querySelector('.navigator-hero');
  let scrollFrame = 0;
  const updateScroll = () => {
    scrollFrame = 0;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;

    if (hero && navigatorSite && !reduceMotion) {
      const heroScroll = Math.min(18, Math.max(0, window.scrollY * 0.035));
      hero.style.setProperty('--hero-scroll', `${heroScroll}px`);
    }
  };
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScroll);
  }, { passive: true });
  updateScroll();
})();
