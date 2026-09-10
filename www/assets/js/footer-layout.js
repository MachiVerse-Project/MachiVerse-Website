(() => {
  const footer = document.querySelector('.site-footer');
  const footerLinks = footer?.querySelector('.footer-links');
  if (!footer || !footerLinks || footerLinks.classList.contains('footer-navigation')) return;

  const lang = document.documentElement.lang || 'en';
  const locale = lang === 'ja' ? 'ja' : lang === 'zh-TW' ? 'zh-TW' : lang === 'ko' ? 'ko' : 'en';
  const filename = (window.location.pathname.split('/').filter(Boolean).pop() || 'index.html').toLowerCase();
  const pageMatch = filename.match(/^(index|developer|self-hosting|architecture)(?:-(en|zh-tw|ko))?\.html$/);
  const family = pageMatch?.[1] || 'index';
  const repoUrl = 'https://github.com/MachiVerse-Project/MachiVerse';
  const releaseUrl = `${repoUrl}/releases/tag/v1.0.0-alpha.1`;

  const copy = {
    ja: {
      footerNav: 'フッターナビゲーション',
      groups: { explore: 'サイト', project: 'プロジェクト', docs: 'ドキュメント', languages: '言語' },
      explore: { index: '一般向け', developer: '技術情報', 'self-hosting': '自分で動かす', architecture: '設計・仕様' },
      project: { github: 'GitHub', license: 'ライセンス', trademarks: '商標' },
      docs: { release: 'Release Notes', roadmap: 'Roadmap', security: 'Security', support: 'Support', discussions: 'Discussions' }
    },
    en: {
      footerNav: 'Footer navigation',
      groups: { explore: 'Explore', project: 'Project', docs: 'Documentation', languages: 'Languages' },
      explore: { index: 'Overview', developer: 'Technical', 'self-hosting': 'Self-hosting', architecture: 'Architecture' },
      project: { github: 'GitHub', license: 'License', trademarks: 'Trademarks' },
      docs: { release: 'Release Notes', roadmap: 'Roadmap', security: 'Security', support: 'Support', discussions: 'Discussions' }
    },
    'zh-TW': {
      footerNav: '頁尾導覽',
      groups: { explore: '網站', project: '專案', docs: '文件', languages: '語言' },
      explore: { index: '一般介紹', developer: '技術資訊', 'self-hosting': '自行執行', architecture: '架構・規格' },
      project: { github: 'GitHub', license: '授權條款', trademarks: '商標' },
      docs: { release: 'Release Notes', roadmap: 'Roadmap', security: 'Security', support: 'Support', discussions: 'Discussions' }
    },
    ko: {
      footerNav: '푸터 내비게이션',
      groups: { explore: '사이트', project: '프로젝트', docs: '문서', languages: '언어' },
      explore: { index: '일반 소개', developer: '기술 정보', 'self-hosting': '직접 실행', architecture: '설계・구조' },
      project: { github: 'GitHub', license: '라이선스', trademarks: '상표' },
      docs: { release: 'Release Notes', roadmap: 'Roadmap', security: 'Security', support: 'Support', discussions: 'Discussions' }
    }
  }[locale];

  const suffixFor = (targetLocale) => targetLocale === 'ja' ? '' : targetLocale === 'en' ? '-en' : targetLocale === 'zh-TW' ? '-zh-tw' : '-ko';
  const pageHref = (pageFamily, targetLocale = locale) => {
    if (pageFamily === 'index') return targetLocale === 'ja' ? './' : `./index${suffixFor(targetLocale)}.html`;
    return `./${pageFamily}${suffixFor(targetLocale)}.html`;
  };

  const groups = [
    {
      key: 'explore',
      items: [
        [copy.explore.index, pageHref('index'), family === 'index'],
        [copy.explore.developer, pageHref('developer'), family === 'developer'],
        [copy.explore['self-hosting'], pageHref('self-hosting'), family === 'self-hosting'],
        [copy.explore.architecture, pageHref('architecture'), family === 'architecture']
      ]
    },
    {
      key: 'project',
      items: [
        [copy.project.github, repoUrl, false, true],
        [copy.project.license, './license.html'],
        [copy.project.trademarks, './trademarks.html']
      ]
    },
    {
      key: 'docs',
      items: [
        [copy.docs.release, releaseUrl, false, true],
        [copy.docs.roadmap, `${repoUrl}/blob/main/ROADMAP.md`, false, true],
        [copy.docs.security, `${repoUrl}/blob/main/SECURITY.md`, false, true],
        [copy.docs.support, `${repoUrl}/blob/main/SUPPORT.md`, false, true],
        [copy.docs.discussions, `${repoUrl}/discussions`, false, true]
      ]
    },
    {
      key: 'languages',
      items: [
        ['日本語', pageHref(family, 'ja'), locale === 'ja', false, 'ja'],
        ['English', pageHref(family, 'en'), locale === 'en', false, 'en'],
        ['繁中', pageHref(family, 'zh-TW'), locale === 'zh-TW', false, 'zh-TW'],
        ['한국어', pageHref(family, 'ko'), locale === 'ko', false, 'ko']
      ]
    }
  ];

  const fragment = document.createDocumentFragment();
  groups.forEach(({ key, items }) => {
    const group = document.createElement('section');
    group.className = `footer-nav-group footer-nav-group-${key}`;

    const heading = document.createElement('h3');
    heading.className = 'footer-nav-title';
    heading.textContent = copy.groups[key];
    group.appendChild(heading);

    const list = document.createElement('ul');
    list.className = 'footer-nav-list';

    items.forEach(([label, href, isCurrent = false, isExternal = false, itemLang = null]) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.className = 'footer-nav-link';
      link.href = href;
      link.textContent = label;
      if (isCurrent) link.setAttribute('aria-current', 'page');
      if (isExternal) link.classList.add('is-external');
      if (itemLang) link.lang = itemLang;
      item.appendChild(link);
      list.appendChild(item);
    });

    group.appendChild(list);
    fragment.appendChild(group);
  });

  footerLinks.classList.add('footer-navigation');
  footerLinks.setAttribute('aria-label', copy.footerNav);
  footerLinks.replaceChildren(fragment);

  if (!document.querySelector('link[data-footer-layout]')) {
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = './assets/css/footer-layout.css';
    stylesheet.dataset.footerLayout = 'true';
    document.head.appendChild(stylesheet);
  }
})();
