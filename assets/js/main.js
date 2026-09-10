(() => {
  const siteNav = document.querySelector('.site-header .site-nav');
  const lang = document.documentElement.lang || 'en';
  const filename = (window.location.pathname.split('/').filter(Boolean).pop() || 'index.html').toLowerCase();
  const supportedPage = /^(?:index(?:-(?:en|zh-tw|ko))?|developer(?:-(?:en|zh-tw|ko))?|self-hosting(?:-(?:en|zh-tw|ko))?|architecture(?:-(?:en|zh-tw|ko))?)\.html$/.test(filename);

  const locale = lang === 'ja' ? 'ja' : lang === 'zh-TW' ? 'zh-TW' : lang === 'ko' ? 'ko' : 'en';
  const suffix = locale === 'ja' ? '' : locale === 'en' ? '-en' : locale === 'zh-TW' ? '-zh-tw' : '-ko';
  const home = locale === 'ja' ? './' : `./index${suffix}.html`;

  const labels = {
    ja: {
      aria: 'グローバルナビゲーション',
      overview: '一般向け',
      technical: '技術情報',
      selfHosting: '自分で動かす',
      architecture: '設計・仕様'
    },
    en: {
      aria: 'Global navigation',
      overview: 'Overview',
      technical: 'Technical',
      selfHosting: 'Self-hosting',
      architecture: 'Architecture'
    },
    'zh-TW': {
      aria: '全站導覽',
      overview: '一般介紹',
      technical: '技術資訊',
      selfHosting: '自行執行',
      architecture: '架構・規格'
    },
    ko: {
      aria: '전체 사이트 내비게이션',
      overview: '일반 소개',
      technical: '기술 정보',
      selfHosting: '직접 실행',
      architecture: '설계・구조'
    }
  }[locale];

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
      ['github', 'GitHub', 'https://github.com/MachiVerse-Project/MachiVerse']
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

  import('./main-runtime.js')
    .then(() => {
      if ((locale === 'zh-TW' || locale === 'ko') && document.querySelector('[data-instance-action]')) {
        return import('./public-language-runtime.js');
      }
      return null;
    })
    .catch((error) => console.error('MachiVerse runtime failed to load.', error));
})();
