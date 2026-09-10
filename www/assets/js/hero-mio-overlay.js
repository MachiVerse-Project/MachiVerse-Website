(() => {
  const lang = document.documentElement.lang || 'en';
  const locale = lang === 'ja' ? 'ja' : lang === 'zh-TW' ? 'zh-TW' : lang === 'ko' ? 'ko' : 'en';
  const filename = (window.location.pathname.split('/').filter(Boolean).pop() || 'index.html').toLowerCase();
  const isPublic = filename === 'index.html' || /^index-(en|zh-tw|ko)\.html$/.test(filename);
  if (!isPublic) return;

  const copy = {
    ja: {
      aria: 'General View掲載予定画面と、案内する南雲澪',
      kicker: 'MIO GUIDE 00',
      name: '南雲 澪 / Mio Nagumo',
      role: 'Co-Founder / System Development Lead',
      guide: 'Official MachiVerse Character / MIO GUIDE'
    },
    en: {
      aria: 'General View preview area with Mio Nagumo as the guide',
      kicker: 'MIO GUIDE 00',
      name: 'Mio Nagumo / 南雲 澪',
      role: 'Co-Founder / System Development Lead',
      guide: 'Official MachiVerse Character / MIO GUIDE'
    },
    'zh-TW': {
      aria: 'General View 預覽區與導覽角色南雲澪',
      kicker: 'MIO GUIDE 00',
      name: '南雲 澪 / Mio Nagumo',
      role: 'Co-Founder / System Development Lead',
      guide: 'MachiVerse 官方角色 / MIO GUIDE'
    },
    ko: {
      aria: 'General View 미리보기 영역과 안내하는 미오 나구모',
      kicker: 'MIO GUIDE 00',
      name: '미오 나구모 / Mio Nagumo',
      role: 'Co-Founder / System Development Lead',
      guide: 'MachiVerse 공식 캐릭터 / MIO GUIDE'
    }
  }[locale];

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = './assets/css/hero-mio-overlay.css';
  document.head.appendChild(style);

  const stage = document.querySelector('.navigator-hero .product-preview-stage');
  if (!stage || stage.querySelector('.hero-mio-overlay')) return;

  stage.classList.add('with-mio-guide');
  stage.setAttribute('aria-label', copy.aria);

  const mio = document.createElement('aside');
  mio.className = 'hero-mio-overlay';
  mio.setAttribute('aria-label', `${copy.name} — ${copy.role}`);
  mio.innerHTML = `
    <div class="hero-mio-glow" aria-hidden="true"></div>
    <div class="hero-mio-identity">
      <span>${copy.kicker}</span>
      <strong>${copy.name}</strong>
      <small>${copy.role}</small>
      <em>${copy.guide}</em>
    </div>
    <img src="./assets/images/characters/nagumo-mio/web/mio-welcome.png" alt="${copy.name}" width="720" height="960">`;

  stage.appendChild(mio);
})();
