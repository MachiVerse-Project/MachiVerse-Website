(() => {
  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const opening = document.querySelector('.opening');
  const progress = document.querySelector('.scroll-progress');
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const observedSections = navLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const navigatorSite = document.body?.classList.contains('navigator-site');
  const isJapanese = document.documentElement.lang === 'ja';

  const technicalLanguageSwitch = document.querySelector('.developer-page .lang-switch');
  if (technicalLanguageSwitch) {
    const filename = window.location.pathname.split('/').pop() || '';
    const match = filename.match(/^(developer|self-hosting|architecture)(?:-(en|zh-tw|ko))?\.html$/i);
    if (match) {
      const page = match[1].toLowerCase();
      const current = (match[2] || 'ja').toLowerCase();
      const languages = [
        { suffix: '', code: 'ja', key: 'ja', label: '日本語' },
        { suffix: '-en', code: 'en', key: 'en', label: 'EN' },
        { suffix: '-zh-tw', code: 'zh-TW', key: 'zh-tw', label: '繁中' },
        { suffix: '-ko', code: 'ko', key: 'ko', label: '한국어' }
      ];

      const languageLinks = languages.map(({ suffix, code, key, label }) => {
        const link = document.createElement('a');
        link.href = `./${page}${suffix}.html`;
        link.lang = code;
        link.textContent = label;
        if (key === current) link.setAttribute('aria-current', 'page');
        return link;
      });

      technicalLanguageSwitch.replaceChildren(...languageLinks);
    }
  }

  if (navigatorSite) {
    const framingStyles = document.createElement('link');
    framingStyles.rel = 'stylesheet';
    framingStyles.href = './assets/css/nagumo-framing.css';
    document.head.appendChild(framingStyles);

    const guideStyles = document.createElement('link');
    guideStyles.rel = 'stylesheet';
    guideStyles.href = './assets/css/mio-guide-panel.css';
    document.head.appendChild(guideStyles);

    if (!document.body.classList.contains('navigator-developer')) {
      const polishStyles = document.createElement('link');
      polishStyles.rel = 'stylesheet';
      polishStyles.href = './assets/css/public-polish.css';
      document.head.appendChild(polishStyles);

      const instanceStyles = document.createElement('link');
      instanceStyles.rel = 'stylesheet';
      instanceStyles.href = './assets/css/instance-cta.css';
      document.head.appendChild(instanceStyles);

      const heroActions = document.querySelector('.navigator-hero .hero-actions');
      if (heroActions && !heroActions.querySelector('[data-instance-action]')) {
        const instanceButton = document.createElement('button');
        instanceButton.type = 'button';
        instanceButton.disabled = true;
        instanceButton.className = 'instance-cta';
        instanceButton.dataset.instanceAction = 'join-official-instance';
        instanceButton.setAttribute('aria-disabled', 'true');
        instanceButton.setAttribute('aria-label', isJapanese
          ? '公式インスタンスに参加、現在準備中'
          : 'Join the official instance, coming soon');
        instanceButton.title = isJapanese
          ? '公式インスタンスは現在準備中です'
          : 'The official instance is not open yet';

        const label = document.createElement('span');
        label.className = 'instance-cta-label';
        const title = document.createElement('strong');
        const state = document.createElement('small');
        title.textContent = isJapanese ? '公式インスタンスに参加' : 'Join Official Instance';
        state.textContent = isJapanese ? '準備中' : 'Coming Soon';
        label.append(title, state);
        instanceButton.appendChild(label);

        const primary = heroActions.querySelector('.button-primary');
        primary ? primary.after(instanceButton) : heroActions.prepend(instanceButton);
      }

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
  let currentMioSection = mioSections[0] || null;

  const normalizeText = (value = '') => value.replace(/\s+/g, ' ').trim();

  const collectMioDetail = (section) => {
    const heading = normalizeText(section.querySelector('h1, h2')?.textContent || section.dataset.mioTitle || 'MachiVerse');
    const lead = normalizeText(section.dataset.mioText || '');

    const detailParagraphs = [...section.querySelectorAll('p')]
      .filter((paragraph) => {
        if (paragraph.closest('.mio-hero-bubble, .mio-dock, .viewer-visual-label')) return false;
        const text = normalizeText(paragraph.textContent);
        return text.length >= 34 && text !== lead;
      })
      .map((paragraph) => normalizeText(paragraph.textContent));

    const uniqueParagraphs = [...new Set(detailParagraphs)].slice(0, 2);
    const detail = uniqueParagraphs.join('\n\n') || lead;

    const preferredItems = [...section.querySelectorAll(
      '.proof-node, .proof-fact, .causal-step, .viewer-proof-strip > span, .done-next > article, .dev-hero-fact, .arch-node, .reason-chip, .status-step, .principle-card'
    )];

    const points = [];
    preferredItems.forEach((item) => {
      if (points.length >= 6) return;

      const titleNode = item.querySelector('strong, h3, b, .num, small');
      const title = normalizeText(titleNode?.textContent || '');
      let description = '';

      const listItems = [...item.querySelectorAll('li')]
        .map((li) => normalizeText(li.textContent))
        .filter(Boolean)
        .slice(0, 3);

      if (listItems.length) {
        description = listItems.join(' / ');
      } else {
        const candidates = [...item.querySelectorAll('p, span, small')]
          .map((node) => normalizeText(node.textContent))
          .filter((text) => text && text !== title);
        description = candidates.join(' · ');
      }

      if (!title && !description) return;
      const key = `${title}|${description}`;
      if (points.some((point) => point.key === key)) return;
      points.push({ key, title: title || (isJapanese ? 'POINT' : 'POINT'), description });
    });

    return { heading, lead, detail, points };
  };

  let mioGuideOverlay = null;
  let mioGuideClose = null;
  let mioGuideImage = null;
  let mioGuideKicker = null;
  let mioGuideHeading = null;
  let mioGuideLead = null;
  let mioGuideDetail = null;
  let mioGuidePoints = null;
  let mioGuideFooterSection = null;
  let lastMioTrigger = null;

  const closeMioGuide = () => {
    if (!mioGuideOverlay?.classList.contains('is-open')) return;
    mioGuideOverlay.classList.remove('is-open');
    mioGuideOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('mio-guide-open');
    window.setTimeout(() => lastMioTrigger?.focus(), reduceMotion ? 0 : 220);
  };

  const openMioGuide = (section) => {
    if (!section || !mioGuideOverlay) return;
    const detail = collectMioDetail(section);

    if (mioGuideImage) {
      mioGuideImage.src = section.dataset.mioPose || '';
      mioGuideImage.alt = section.dataset.mioAlt || (isJapanese ? '南雲澪' : 'Mio Nagumo');
    }
    if (mioGuideKicker) mioGuideKicker.textContent = section.dataset.mioKicker || 'MIO GUIDE';
    if (mioGuideHeading) mioGuideHeading.textContent = detail.heading;
    if (mioGuideLead) mioGuideLead.textContent = detail.lead || section.dataset.mioTitle || '';
    if (mioGuideDetail) mioGuideDetail.textContent = detail.detail;
    if (mioGuideFooterSection) mioGuideFooterSection.textContent = `SECTION / ${section.id || 'current'}`.toUpperCase();

    if (mioGuidePoints) {
      mioGuidePoints.replaceChildren();
      detail.points.forEach((point) => {
        const card = document.createElement('div');
        card.className = 'mio-guide-point';
        const title = document.createElement('b');
        const copy = document.createElement('span');
        title.textContent = point.title;
        copy.textContent = point.description;
        card.append(title, copy);
        mioGuidePoints.appendChild(card);
      });
      mioGuidePoints.hidden = detail.points.length === 0;
    }

    lastMioTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : mioDock;
    mioGuideOverlay.classList.add('is-open');
    mioGuideOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('mio-guide-open');
    window.setTimeout(() => mioGuideClose?.focus(), reduceMotion ? 0 : 80);
  };

  if (navigatorSite && mioDock && mioSections.length) {
    mioGuideOverlay = document.createElement('div');
    mioGuideOverlay.className = 'mio-guide-overlay';
    mioGuideOverlay.setAttribute('aria-hidden', 'true');

    const dialog = document.createElement('section');
    dialog.className = 'mio-guide-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'mio-guide-heading');

    mioGuideClose = document.createElement('button');
    mioGuideClose.type = 'button';
    mioGuideClose.className = 'mio-guide-close';
    mioGuideClose.setAttribute('aria-label', isJapanese ? 'MIO GUIDEを閉じる' : 'Close MIO GUIDE');
    mioGuideClose.textContent = '×';

    const grid = document.createElement('div');
    grid.className = 'mio-guide-grid';

    const visual = document.createElement('div');
    visual.className = 'mio-guide-visual';
    const badge = document.createElement('span');
    badge.className = 'mio-guide-visual-badge';
    badge.textContent = isJapanese ? 'MIO GUIDE / SECTION EXPLAINER' : 'MIO GUIDE / SECTION EXPLAINER';
    mioGuideImage = document.createElement('img');
    mioGuideImage.className = 'mio-guide-character';
    mioGuideImage.width = 720;
    mioGuideImage.height = 960;
    visual.append(badge, mioGuideImage);

    const content = document.createElement('div');
    content.className = 'mio-guide-content';
    mioGuideKicker = document.createElement('span');
    mioGuideKicker.className = 'mio-guide-kicker';
    mioGuideHeading = document.createElement('h2');
    mioGuideHeading.id = 'mio-guide-heading';
    mioGuideHeading.className = 'mio-guide-heading';
    mioGuideLead = document.createElement('p');
    mioGuideLead.className = 'mio-guide-lead';
    mioGuideDetail = document.createElement('p');
    mioGuideDetail.className = 'mio-guide-detail';
    mioGuidePoints = document.createElement('div');
    mioGuidePoints.className = 'mio-guide-points';

    const footer = document.createElement('div');
    footer.className = 'mio-guide-footer';
    mioGuideFooterSection = document.createElement('span');
    const footerHint = document.createElement('span');
    footerHint.textContent = isJapanese ? 'Esc または背景クリックで閉じる' : 'Press Esc or click the backdrop to close';
    footer.append(mioGuideFooterSection, footerHint);

    content.append(mioGuideKicker, mioGuideHeading, mioGuideLead, mioGuideDetail, mioGuidePoints, footer);
    grid.append(visual, content);
    dialog.append(mioGuideClose, grid);
    mioGuideOverlay.appendChild(dialog);
    document.body.appendChild(mioGuideOverlay);

    mioDock.setAttribute('role', 'button');
    mioDock.setAttribute('tabindex', '0');
    mioDock.setAttribute('aria-haspopup', 'dialog');
    mioDock.setAttribute('aria-label', isJapanese
      ? 'MIO GUIDEを開いて、このセクションの詳しい説明を見る'
      : 'Open MIO GUIDE for more detail about this section');
    mioDock.title = isJapanese ? 'クリックして詳しく見る' : 'Click for more detail';

    mioDock.addEventListener('click', () => openMioGuide(currentMioSection));
    mioDock.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openMioGuide(currentMioSection);
    });
    mioGuideClose.addEventListener('click', closeMioGuide);
    mioGuideOverlay.addEventListener('click', (event) => {
      if (event.target === mioGuideOverlay) closeMioGuide();
    });
    mioGuideOverlay.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        mioGuideClose?.focus();
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMioGuide();
    });
  }

  if (mioDock && mioSections.length) {
    const image = mioDock.querySelector('[data-mio-image]');
    const kicker = mioDock.querySelector('[data-mio-kicker]');
    const title = mioDock.querySelector('[data-mio-title]');
    const text = mioDock.querySelector('[data-mio-text]');
    let current = null;

    const applyMio = (section) => {
      if (!section || current === section) return;
      current = section;
      currentMioSection = section;
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