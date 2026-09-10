(() => {
  const siteNav = document.querySelector('.site-header .site-nav');
  const lang = document.documentElement.lang || 'en';
  const filename = (window.location.pathname.split('/').filter(Boolean).pop() || 'index.html').toLowerCase();
  const supportedPage = /^(?:index(?:-(?:en|zh-tw|ko))?|developer(?:-(?:en|zh-tw|ko))?|self-hosting(?:-(?:en|zh-tw|ko))?|architecture(?:-(?:en|zh-tw|ko))?)\.html$/.test(filename);

  const locale = lang === 'ja' ? 'ja' : lang === 'zh-TW' ? 'zh-TW' : lang === 'ko' ? 'ko' : 'en';
  const suffix = locale === 'ja' ? '' : locale === 'en' ? '-en' : locale === 'zh-TW' ? '-zh-tw' : '-ko';
  const home = locale === 'ja' ? './' : `./index${suffix}.html`;
  const siteOrigin = 'https://machiverse.app';
  const repoUrl = 'https://github.com/MachiVerse-Project/MachiVerse';

  const labels = {
    ja: {
      aria: 'グローバルナビゲーション',
      overview: '一般向け',
      technical: '技術情報',
      selfHosting: '自分で動かす',
      architecture: '設計・仕様',
      guideRole: 'MachiVerse 案内キャラクター',
      guideCredit: '案内キャラクター',
      developmentCredit: '開発・運営'
    },
    en: {
      aria: 'Global navigation',
      overview: 'Overview',
      technical: 'Technical',
      selfHosting: 'Self-hosting',
      architecture: 'Architecture',
      guideRole: 'MachiVerse Guide Character',
      guideCredit: 'Guide Character',
      developmentCredit: 'Development & stewardship'
    },
    'zh-TW': {
      aria: '全站導覽',
      overview: '一般介紹',
      technical: '技術資訊',
      selfHosting: '自行執行',
      architecture: '架構・規格',
      guideRole: 'MachiVerse 導覽角色',
      guideCredit: '導覽角色',
      developmentCredit: '開發・營運'
    },
    ko: {
      aria: '전체 사이트 내비게이션',
      overview: '일반 소개',
      technical: '기술 정보',
      selfHosting: '직접 실행',
      architecture: '설계・구조',
      guideRole: 'MachiVerse 안내 캐릭터',
      guideCredit: '안내 캐릭터',
      developmentCredit: '개발・운영'
    }
  }[locale];

  const pageMatch = filename.match(/^(index|developer|self-hosting|architecture)(?:-(en|zh-tw|ko))?\.html$/);
  if (pageMatch) {
    const family = pageMatch[1];
    const localizedPaths = {
      index: {
        ja: '/',
        en: '/index-en.html',
        'zh-TW': '/index-zh-tw.html',
        ko: '/index-ko.html'
      },
      developer: {
        ja: '/developer.html',
        en: '/developer-en.html',
        'zh-TW': '/developer-zh-tw.html',
        ko: '/developer-ko.html'
      },
      'self-hosting': {
        ja: '/self-hosting.html',
        en: '/self-hosting-en.html',
        'zh-TW': '/self-hosting-zh-tw.html',
        ko: '/self-hosting-ko.html'
      },
      architecture: {
        ja: '/architecture.html',
        en: '/architecture-en.html',
        'zh-TW': '/architecture-zh-tw.html',
        ko: '/architecture-ko.html'
      }
    }[family];

    const canonicalUrl = `${siteOrigin}${localizedPaths[locale]}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
    const alternates = [
      ['ja', localizedPaths.ja],
      ['en', localizedPaths.en],
      ['zh-TW', localizedPaths['zh-TW']],
      ['ko', localizedPaths.ko],
      ['x-default', localizedPaths.ja]
    ];
    alternates.forEach(([hreflang, path]) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = `${siteOrigin}${path}`;
      document.head.appendChild(link);
    });

    const ogLocales = { ja: 'ja_JP', en: 'en_US', 'zh-TW': 'zh_TW', ko: 'ko_KR' };
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = canonicalUrl;

    document.querySelectorAll('meta[property="og:locale"], meta[property="og:locale:alternate"]').forEach((meta) => meta.remove());
    const ogLocale = document.createElement('meta');
    ogLocale.setAttribute('property', 'og:locale');
    ogLocale.content = ogLocales[locale];
    document.head.appendChild(ogLocale);
    Object.entries(ogLocales).forEach(([key, value]) => {
      if (key === locale) return;
      const alternate = document.createElement('meta');
      alternate.setAttribute('property', 'og:locale:alternate');
      alternate.content = value;
      document.head.appendChild(alternate);
    });

    const defaultOgImage = family === 'index'
      ? `${siteOrigin}/assets/images/site/social-general.png`
      : `${siteOrigin}/assets/images/site/social-developer.png`;
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    if (!ogImage.content) ogImage.content = defaultOgImage;

    if (!document.querySelector('link[rel~="icon"]')) {
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/png';
      favicon.href = './assets/images/icons/favicon.png';
      document.head.appendChild(favicon);
    }
  }

  document.querySelectorAll('.mio-name-sticker').forEach((sticker) => {
    sticker.innerHTML = `<span class="mio-role-name">南雲 澪 / Mio Nagumo</span><span class="mio-role-label">${labels.guideRole}</span>`;
    sticker.setAttribute('aria-label', `Mio Nagumo — ${labels.guideRole}`);
  });

  document.querySelectorAll('[data-mio-kicker]').forEach((element) => {
    const kicker = element.getAttribute('data-mio-kicker');
    if (kicker && /^SYSTEM DEVELOPMENT\s*\/\s*/i.test(kicker)) {
      element.setAttribute('data-mio-kicker', kicker.replace(/^SYSTEM DEVELOPMENT\s*\/\s*/i, ''));
    }
  });

  const footerSummary = document.querySelector('.site-footer .footer-inner > div:first-child');
  if (footerSummary && !footerSummary.querySelector('.site-identity')) {
    const identity = document.createElement('div');
    identity.className = 'site-identity';
    identity.innerHTML = `
      <span><b>${labels.guideCredit}:</b> 南雲 澪 / Mio Nagumo</span>
      <span><b>${labels.developmentCredit}:</b> <a href="${repoUrl}">MachiVerse Project</a></span>`;
    footerSummary.appendChild(identity);
  }

  let current = null;
  if (filename.startsWith('developer')) current = 'technical';
  else if (filename.startsWith('self-hosting')) current = 'selfHosting';
  else if (filename.startsWith('architecture')) current = 'architecture';
  else if (filename.startsWith('index')) current = 'overview';

  if (siteNav && supportedPage) {
    const destinations = [
      ['overview', labels.overview, home],
      ['technical', labels.technical, `./developer${suffix}.html`],
      ['selfHosting', labels.selfHosting, `./self-hosting${suffix}.html`],
      ['architecture', labels.architecture, `./architecture${suffix}.html`],
      ['github', 'GitHub', repoUrl]
    ];

    const links = destinations.map(([key, label, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (key === current) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('is-active');
      }
      return link;
    });

    siteNav.setAttribute('aria-label', labels.aria);
    siteNav.replaceChildren(...links);
  }

  import('./site-enhancements.js')
    .catch((error) => console.error('MachiVerse site enhancements failed to load.', error));

  import('./main-runtime.js')
    .then(() => {
      if ((locale === 'zh-TW' || locale === 'ko') && document.querySelector('[data-instance-action]')) {
        return import('./public-language-runtime.js');
      }
      return null;
    })
    .catch((error) => console.error('MachiVerse runtime failed to load.', error));
})();
