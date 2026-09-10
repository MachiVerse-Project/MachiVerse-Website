(() => {
  const lang = document.documentElement.lang || 'en';
  const locale = lang === 'ja' ? 'ja' : lang === 'zh-TW' ? 'zh-TW' : lang === 'ko' ? 'ko' : 'en';
  const filename = (window.location.pathname.split('/').filter(Boolean).pop() || 'index.html').toLowerCase();
  const isPublic = filename === 'index.html' || /^index-(en|zh-tw|ko)\.html$/.test(filename);
  const isDeveloper = filename === 'developer.html' || /^developer-(en|zh-tw|ko)\.html$/.test(filename);
  const suffix = locale === 'ja' ? '' : locale === 'en' ? '-en' : locale === 'zh-TW' ? '-zh-tw' : '-ko';
  const repoUrl = 'https://github.com/MachiVerse-Project/MachiVerse';
  const releaseUrl = `${repoUrl}/releases/tag/v1.0.0-alpha.1`;
  const roadmapUrl = `${repoUrl}/blob/main/ROADMAP.md`;
  const securityUrl = `${repoUrl}/blob/main/SECURITY.md`;
  const contributingUrl = `${repoUrl}/blob/main/CONTRIBUTING.md`;
  const discussionsUrl = `${repoUrl}/discussions`;
  const issuesUrl = `${repoUrl}/issues`;

  const copy = {
    ja: {
      audience: '都市・社会・エージェントシミュレーションを研究・設計・開発したい人へ。実際に動かす手順と、世界が「なぜそうなったか」を追うための設計資料を公開しています。',
      previewAria: 'MachiVerse General View 実画面掲載予定のプレビュー',
      previewEyebrow: 'GENERAL VIEW / ALPHA 1.0',
      previewTitle: '実画面キャプチャ、準備中。',
      previewBody: 'この枠はGeneral Viewの実キャプチャへ差し替えるための仮表示です。概念画像を実画面として見せず、固定リリースから取得した本物の画面だけを掲載します。',
      previewBadge: 'REAL CAPTURE COMING SOON',
      primaryCta: 'Alpha 1.0を固定版で動かす',
      compareKicker: 'POSITIONING / TYPICAL EMPHASIS',
      compareTitle: '何を主役にするシミュレーションなのか。',
      compareLead: '以下は個別製品すべてを断定する比較ではなく、一般的な主目的の違いを示したものです。',
      compare: [
        ['City Builder', '都市の建設・運営', '完成した都市の見た目や管理・成長を中心に体験する。'],
        ['ABM Toolkit', 'エージェントモデルの実験', '行動ルールや集団現象を研究・検証するための基盤として使う。'],
        ['MachiVerse', '世界の因果・履歴・参加', '人・社会・自然などを同じWorldStateで扱い、現在がどう形成されたかまで追う。']
      ],
      compareNote: 'MachiVerseはcity builderや汎用ABMツールの置き換えを目的とせず、「同じ世界の中で因果と歴史を積み上げる」ことを中心にしています。',
      roadmapTitle: 'Alpha 1.0 と Roadmap M0 は別の軸です',
      roadmapBody: 'Alpha 1.0は4コンポーネントを実接続した公開vertical sliceです。ROADMAPのM0〜M6は、その先のproduction implementationを段階的に進めるための実装ロードマップです。',
      roadmapLink: 'Roadmapを確認',
      contributionKicker: 'FIRST CONTRIBUTION',
      contributionTitle: '初めて参加する場合は、Issueを探す前に相談からでも大丈夫です。',
      contributionBody: '現在は「good first issue」を無理に作らず、Contribution GuideとDiscussionsを入口にしています。小さな改善案や質問はDiscussionsで相談し、実装対象が明確ならIssueへ進めます。',
      contributionGuide: 'Contribution Guide',
      contributionDiscuss: 'Discussionsで相談',
      contributionIssues: 'Issuesを見る'
    },
    en: {
      audience: 'For people researching, designing, or building urban, social, and agent-based simulations. MachiVerse publishes both a runnable Alpha path and the design behind tracing why a world reached its current state.',
      previewAria: 'Preview area reserved for a real MachiVerse General View capture',
      previewEyebrow: 'GENERAL VIEW / ALPHA 1.0',
      previewTitle: 'Real UI capture coming soon.',
      previewBody: 'This is a temporary placeholder for a real General View capture. We will not present a concept visual as product evidence; this area will be replaced with a capture taken from the fixed Alpha release.',
      previewBadge: 'REAL CAPTURE COMING SOON',
      primaryCta: 'Run the fixed Alpha 1.0 release',
      compareKicker: 'POSITIONING / TYPICAL EMPHASIS',
      compareTitle: 'What is the simulation centered on?',
      compareLead: 'This is a high-level comparison of common goals, not a claim that every product in each category behaves the same way.',
      compare: [
        ['City Builder', 'Building and managing a city', 'Usually centers the experience on construction, management, progression, and the resulting city.'],
        ['ABM Toolkit', 'Experimenting with agent models', 'Provides a foundation for defining behaviors and studying emergent population-level outcomes.'],
        ['MachiVerse', 'Causality, history, and participation', 'Connects people, society, nature, and other state in one world so the present can be traced back to how it formed.']
      ],
      compareNote: 'MachiVerse is not positioned as a replacement for every city builder or ABM toolkit; its center of gravity is accumulating causality and history inside one shared world.',
      roadmapTitle: 'Alpha 1.0 and Roadmap M0 describe different axes',
      roadmapBody: 'Alpha 1.0 is the released four-component connected vertical slice. M0–M6 in the ROADMAP describe the production implementation sequence that follows that slice.',
      roadmapLink: 'Open Roadmap',
      contributionKicker: 'FIRST CONTRIBUTION',
      contributionTitle: 'For a first contribution, starting with a discussion is fine.',
      contributionBody: 'We do not create artificial “good first issue” tickets. Use the Contribution Guide and Discussions as the entry point, then move to an Issue once the implementation target is clear.',
      contributionGuide: 'Contribution Guide',
      contributionDiscuss: 'Ask in Discussions',
      contributionIssues: 'Browse Issues'
    },
    'zh-TW': {
      audience: '適合研究、設計或開發都市、社會與代理人模擬的人。網站同時提供可執行的 Alpha 路徑，以及追蹤世界「為什麼變成現在這樣」的設計資料。',
      previewAria: '預留給 MachiVerse General View 真實畫面截圖的預覽區',
      previewEyebrow: 'GENERAL VIEW / ALPHA 1.0',
      previewTitle: '真實介面截圖準備中。',
      previewBody: '這裡是 General View 真實截圖的暫時佔位。我們不會把概念圖當成產品實畫面；之後會用固定 Alpha Release 取得的真實畫面替換。',
      previewBadge: 'REAL CAPTURE COMING SOON',
      primaryCta: '執行固定版 Alpha 1.0',
      compareKicker: 'POSITIONING / TYPICAL EMPHASIS',
      compareTitle: '這個模擬把什麼當成主角？',
      compareLead: '以下僅用來說明常見主要目的的差異，並非斷言每個同類產品都完全相同。',
      compare: [
        ['City Builder', '建造與經營城市', '通常著重建設、管理、成長與最後形成的城市。'],
        ['ABM Toolkit', '代理人模型實驗', '提供定義行為規則、觀察群體湧現現象的研究基礎。'],
        ['MachiVerse', '因果、歷史與世界內參與', '把人、社會、自然等狀態放在同一世界中，追蹤現在如何由過去形成。']
      ],
      compareNote: 'MachiVerse 並不是要取代所有 City Builder 或 ABM 工具；它的重點是讓因果與歷史在同一個世界中持續累積。',
      roadmapTitle: 'Alpha 1.0 與 Roadmap M0 是不同的軸',
      roadmapBody: 'Alpha 1.0 是已公開、四個元件實際連接的 vertical slice。ROADMAP 的 M0～M6 則是其後 production implementation 的實作順序。',
      roadmapLink: '查看 Roadmap',
      contributionKicker: 'FIRST CONTRIBUTION',
      contributionTitle: '第一次參與，可以先從討論開始。',
      contributionBody: '目前不刻意建立空泛的「good first issue」。可以先閱讀 Contribution Guide，並在 Discussions 討論；實作目標明確後再進入 Issue。',
      contributionGuide: 'Contribution Guide',
      contributionDiscuss: '前往 Discussions',
      contributionIssues: '查看 Issues'
    },
    ko: {
      audience: '도시·사회·에이전트 시뮬레이션을 연구·설계·개발하려는 사람을 위한 프로젝트입니다. 실행 가능한 Alpha 경로와 함께 세계가 왜 현재 상태가 되었는지 추적하기 위한 설계 자료를 공개합니다.',
      previewAria: 'MachiVerse General View 실제 화면 캡처가 들어갈 미리보기 영역',
      previewEyebrow: 'GENERAL VIEW / ALPHA 1.0',
      previewTitle: '실제 UI 캡처 준비 중.',
      previewBody: '이 영역은 General View 실제 캡처로 교체할 임시 표시입니다. 콘셉트 이미지를 제품 화면처럼 보여주지 않고, 고정 Alpha 릴리스에서 얻은 실제 화면만 사용합니다.',
      previewBadge: 'REAL CAPTURE COMING SOON',
      primaryCta: '고정 Alpha 1.0 릴리스 실행',
      compareKicker: 'POSITIONING / TYPICAL EMPHASIS',
      compareTitle: '무엇을 시뮬레이션의 중심에 두는가?',
      compareLead: '아래 비교는 각 범주의 일반적인 주목점을 설명하기 위한 것이며, 모든 개별 제품이 동일하다는 의미는 아닙니다.',
      compare: [
        ['City Builder', '도시 건설과 운영', '대체로 건설, 관리, 성장, 그리고 완성된 도시 경험에 초점을 둡니다.'],
        ['ABM Toolkit', '에이전트 모델 실험', '행동 규칙을 정의하고 집단 수준의 창발 현상을 분석하는 연구 기반을 제공합니다.'],
        ['MachiVerse', '인과·역사·세계 내부 참여', '사람·사회·자연 등의 상태를 하나의 세계에서 다루며 현재가 어떻게 형성되었는지 추적합니다.']
      ],
      compareNote: 'MachiVerse는 모든 City Builder나 ABM 도구를 대체하려는 것이 아니라, 하나의 공유 세계 안에서 인과와 역사를 누적하는 데 중심을 둡니다.',
      roadmapTitle: 'Alpha 1.0과 Roadmap M0는 서로 다른 축입니다',
      roadmapBody: 'Alpha 1.0은 공개된 4컴포넌트 연결 vertical slice입니다. ROADMAP의 M0~M6는 그 이후 production implementation을 진행하기 위한 구현 순서를 설명합니다.',
      roadmapLink: 'Roadmap 보기',
      contributionKicker: 'FIRST CONTRIBUTION',
      contributionTitle: '처음 참여한다면 토론부터 시작해도 됩니다.',
      contributionBody: '형식적인 “good first issue”를 억지로 만들지 않습니다. Contribution Guide와 Discussions를 시작점으로 삼고, 구현 대상이 명확해지면 Issue로 진행합니다.',
      contributionGuide: 'Contribution Guide',
      contributionDiscuss: 'Discussions에서 질문',
      contributionIssues: 'Issues 보기'
    }
  }[locale];

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = './assets/css/review-enhancements.css';
  document.head.appendChild(style);

  if (isPublic) {
    const heroCopy = document.querySelector('.navigator-hero .navigator-copy');
    const definition = heroCopy?.querySelector('.product-definition');
    let audience = heroCopy?.querySelector('.audience-note');
    if (!audience && definition) {
      audience = document.createElement('p');
      audience.className = 'audience-note';
      definition.after(audience);
    }
    if (audience) audience.textContent = copy.audience;

    const heroStage = document.querySelector('.navigator-hero .mio-hero-stage');
    if (heroStage && !heroStage.classList.contains('product-preview-stage')) {
      heroStage.classList.add('product-preview-stage');
      heroStage.setAttribute('aria-label', copy.previewAria);
      heroStage.innerHTML = `
        <figure class="hero-product-preview">
          <div class="hero-preview-window">
            <img src="./assets/images/site/general-view-coming-soon.svg" width="1200" height="760" alt="${copy.previewAria}">
            <span class="hero-preview-badge">${copy.previewBadge}</span>
          </div>
          <figcaption>
            <span>${copy.previewEyebrow}</span>
            <strong>${copy.previewTitle}</strong>
            <p>${copy.previewBody}</p>
          </figcaption>
        </figure>`;
    }

    const primary = document.querySelector('.navigator-hero .hero-actions .button-primary');
    if (primary) {
      primary.href = `./self-hosting${suffix}.html#quick-start`;
      primary.textContent = copy.primaryCta;
    }

    const trust = document.querySelector('.navigator-hero .release-trust-bar');
    if (trust) {
      const existingNet = [...trust.querySelectorAll('span')].find((item) => item.textContent.trim() === '.NET 10');
      if (existingNet) existingNet.textContent = 'C# / .NET 10';
      const additions = [
        ['Roadmap', roadmapUrl],
        ['Security', securityUrl]
      ];
      additions.forEach(([label, href]) => {
        if ([...trust.querySelectorAll('a')].some((link) => link.href === href)) return;
        const link = document.createElement('a');
        link.href = href;
        link.textContent = label;
        trust.appendChild(link);
      });
    }

    const focus = document.querySelector('.product-focus-section .product-focus-inner');
    if (focus && !focus.querySelector('.product-compare')) {
      const comparison = document.createElement('div');
      comparison.className = 'product-compare';
      comparison.innerHTML = `
        <div class="product-compare-heading">
          <small>${copy.compareKicker}</small>
          <h3>${copy.compareTitle}</h3>
          <p>${copy.compareLead}</p>
        </div>
        <div class="product-compare-grid">
          ${copy.compare.map(([name, focusText, detail], index) => `
            <article class="product-compare-card${index === 2 ? ' is-machiverse' : ''}">
              <span>${index === 2 ? 'MACHIVERSE' : 'REFERENCE'}</span>
              <strong>${name}</strong>
              <b>${focusText}</b>
              <p>${detail}</p>
            </article>`).join('')}
        </div>
        <p class="product-compare-note">${copy.compareNote}</p>`;
      focus.appendChild(comparison);
    }

    const status = document.querySelector('#status .container') || document.querySelector('#status');
    if (status && !status.querySelector('.roadmap-context-note')) {
      const note = document.createElement('aside');
      note.className = 'roadmap-context-note reveal is-visible';
      note.innerHTML = `
        <span>ALPHA 1.0 ↔ PRODUCTION ROADMAP</span>
        <strong>${copy.roadmapTitle}</strong>
        <p>${copy.roadmapBody}</p>
        <a href="${roadmapUrl}">${copy.roadmapLink} ↗</a>`;
      status.appendChild(note);
    }
  }

  if (isDeveloper) {
    const contribute = document.querySelector('#contribute .container') || document.querySelector('#contribute');
    if (contribute && !contribute.querySelector('.first-contribution-card')) {
      const card = document.createElement('aside');
      card.className = 'first-contribution-card';
      card.innerHTML = `
        <span>${copy.contributionKicker}</span>
        <h3>${copy.contributionTitle}</h3>
        <p>${copy.contributionBody}</p>
        <div>
          <a href="${contributingUrl}">${copy.contributionGuide}</a>
          <a href="${discussionsUrl}">${copy.contributionDiscuss}</a>
          <a href="${issuesUrl}">${copy.contributionIssues}</a>
        </div>`;
      contribute.appendChild(card);
    }
  }
})();
