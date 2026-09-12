(() => {
  const lang = document.documentElement.lang || 'en';
  const target = lang === 'ja'
    ? './instance.html'
    : lang === 'zh-TW'
      ? './instance-zh-tw.html'
      : lang === 'ko'
        ? './instance-ko.html'
        : './instance-en.html';

  const labels = lang === 'ja'
    ? { aria: '公式インスタンスの案内を見る、現在準備中', title: '公式インスタンスの案内ページを開く' }
    : lang === 'zh-TW'
      ? { aria: '查看官方實例說明，目前準備中', title: '開啟官方實例說明頁' }
      : lang === 'ko'
        ? { aria: '공식 인스턴스 안내 보기, 현재 준비 중', title: '공식 인스턴스 안내 페이지 열기' }
        : { aria: 'View official instance information, currently coming soon', title: 'Open the official instance information page' };

  let observer = null;

  const upgrade = () => {
    const button = document.querySelector('button[data-instance-action="join-official-instance"]');
    if (!button) return false;

    const link = document.createElement('a');
    link.href = target;
    link.className = button.className;
    link.dataset.instanceAction = 'join-official-instance';
    link.setAttribute('aria-label', labels.aria);
    link.title = labels.title;

    while (button.firstChild) link.appendChild(button.firstChild);
    button.replaceWith(link);
    observer?.disconnect();
    return true;
  };

  if (upgrade()) return;

  observer = new MutationObserver(() => upgrade());
  observer.observe(document.body, { childList: true, subtree: true });
  window.setTimeout(() => observer?.disconnect(), 4000);
})();
