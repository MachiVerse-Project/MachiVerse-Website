(() => {
  const lang = document.documentElement.lang;
  if (lang !== 'zh-TW' && lang !== 'ko') return;

  const copy = lang === 'zh-TW'
    ? {
        instanceTitle: '參與官方實例',
        instanceState: '準備中',
        instanceAria: '參與官方實例，目前準備中',
        instanceTooltip: '官方實例目前仍在準備中',
        concept: '概念視覺 — 並非目前的 General View UI',
        guideClose: '關閉 MIO GUIDE',
        guideBadge: 'MIO GUIDE / 區段說明',
        guideHint: '按 Esc 或點擊背景即可關閉',
        dockAria: '開啟 MIO GUIDE，查看此區段的詳細說明',
        dockTitle: '查看詳細說明'
      }
    : {
        instanceTitle: '공식 인스턴스 참여',
        instanceState: '준비 중',
        instanceAria: '공식 인스턴스 참여, 현재 준비 중',
        instanceTooltip: '공식 인스턴스는 현재 준비 중입니다',
        concept: '콘셉트 비주얼 — 현재 General View UI가 아닙니다',
        guideClose: 'MIO GUIDE 닫기',
        guideBadge: 'MIO GUIDE / 섹션 설명',
        guideHint: 'Esc 또는 배경 클릭으로 닫기',
        dockAria: 'MIO GUIDE를 열어 이 섹션의 자세한 설명 보기',
        dockTitle: '자세히 보기'
      };

  const instance = document.querySelector('[data-instance-action]');
  if (instance) {
    instance.setAttribute('aria-label', copy.instanceAria);
    instance.title = copy.instanceTooltip;
    const title = instance.querySelector('strong');
    const state = instance.querySelector('small');
    if (title) title.textContent = copy.instanceTitle;
    if (state) state.textContent = copy.instanceState;
  }

  const concept = document.querySelector('.viewer-visual-label');
  if (concept) concept.textContent = copy.concept;

  const guideClose = document.querySelector('.mio-guide-close');
  if (guideClose) guideClose.setAttribute('aria-label', copy.guideClose);

  const guideBadge = document.querySelector('.mio-guide-visual-badge');
  if (guideBadge) guideBadge.textContent = copy.guideBadge;

  const guideHint = document.querySelector('.mio-guide-footer span:last-child');
  if (guideHint) guideHint.textContent = copy.guideHint;

  const dock = document.querySelector('[data-mio-dock]');
  if (dock) {
    dock.setAttribute('aria-label', copy.dockAria);
    dock.title = copy.dockTitle;
  }
})();
