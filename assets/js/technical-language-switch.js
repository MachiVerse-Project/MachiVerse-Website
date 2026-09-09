(() => {
  const languageSwitch = document.querySelector('.developer-page .lang-switch');
  if (!languageSwitch) return;

  const filename = window.location.pathname.split('/').pop() || '';
  const match = filename.match(/^(developer|self-hosting|architecture)(?:-(en|zh-tw|ko))?\.html$/i);
  if (!match) return;

  const page = match[1].toLowerCase();
  const current = (match[2] || 'ja').toLowerCase();
  const languages = [
    { suffix: '', code: 'ja', key: 'ja', label: '日本語' },
    { suffix: '-en', code: 'en', key: 'en', label: 'EN' },
    { suffix: '-zh-tw', code: 'zh-TW', key: 'zh-tw', label: '繁中' },
    { suffix: '-ko', code: 'ko', key: 'ko', label: '한국어' }
  ];

  const links = languages.map(({ suffix, code, key, label }) => {
    const link = document.createElement('a');
    link.href = `./${page}${suffix}.html`;
    link.lang = code;
    link.textContent = label;
    if (key === current) link.setAttribute('aria-current', 'page');
    return link;
  });

  languageSwitch.replaceChildren(...links);
})();
