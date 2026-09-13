(() => {
  if (!document.body?.classList.contains('instance-page')) return;

  const siteNav = document.querySelector('.site-header .site-nav');
  if (!siteNav) return;

  const lang = document.documentElement.lang || 'en';
  const locale = lang === 'ja' ? 'ja' : lang === 'zh-TW' ? 'zh-TW' : lang === 'ko' ? 'ko' : 'en';
  const suffix = locale === 'ja' ? '' : locale === 'en' ? '-en' : locale === 'zh-TW' ? '-zh-tw' : '-ko';
  const home = locale === 'ja' ? './' : `./index${suffix}.html`;

  const labels = {
    ja: { aria: 'グローバルナビゲーション', overview: '一般向け', technical: '技術情報', selfHosting: '自分で動かす', architecture: '設計・仕様' },
    en: { aria: 'Global navigation', overview: 'Overview', technical: 'Technical', selfHosting: 'Self-hosting', architecture: 'Architecture' },
    'zh-TW': { aria: '全站導覽', overview: '一般介紹', technical: '技術資訊', selfHosting: '自行執行', architecture: '架構・規格' },
    ko: { aria: '전체 사이트 내비게이션', overview: '일반 소개', technical: '기술 정보', selfHosting: '직접 실행', architecture: '설계・구조' }
  }[locale];

  const destinations = [
    [labels.overview, home],
    [labels.technical, `./developer${suffix}.html`],
    [labels.selfHosting, `./self-hosting${suffix}.html`],
    [labels.architecture, `./architecture${suffix}.html`],
    ['GitHub', 'https://github.com/MachiVerse-Project/MachiVerse']
  ];

  const links = destinations.map(([label, href]) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    return link;
  });

  siteNav.setAttribute('aria-label', labels.aria);
  siteNav.replaceChildren(...links);
})();
