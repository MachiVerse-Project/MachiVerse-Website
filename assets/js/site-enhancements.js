(() => {
  const lang = document.documentElement.lang || 'en';
  const locale = lang === 'ja' ? 'ja' : lang === 'zh-TW' ? 'zh-TW' : lang === 'ko' ? 'ko' : 'en';
  const filename = (window.location.pathname.split('/').filter(Boolean).pop() || 'index.html').toLowerCase();
  const isPublic = filename === 'index.html' || /^index-(en|zh-tw|ko)\.html$/.test(filename);
  const isSelfHosting = filename === 'self-hosting.html' || /^self-hosting-(en|zh-tw|ko)\.html$/.test(filename);
  const releaseUrl = 'https://github.com/MachiVerse-Project/MachiVerse/releases/tag/v1.0.0-alpha.1';
  const repoUrl = 'https://github.com/MachiVerse-Project/MachiVerse';
  const licenseUrl = `${repoUrl}/blob/main/LICENSE`;

  const copy = {
    ja: {
      audience: '世界の仕組みを知りたい人には一般向けの説明を、実際に動かしたい・設計を追いたい人には技術情報を用意しています。',
      released: '2026-09-08 リリース',
      focusKicker: 'WHY MACHIVERSE / DESIGN FOCUS',
      focusTitle: 'MachiVerseが重視する、3つのこと。',
      focusLead: '完成した都市の見た目より、世界が変化してきた理由を扱うこと。そのための設計上の焦点を、現在の実装と将来像を混同せずに示します。',
      focusCards: [
        ['01 / PROCESS', '結果より、そこへ至る過程', '状態・因果・相互作用・時間・履歴をつなぎ、「なぜ今この状態なのか」を追える世界を目指します。'],
        ['02 / PARTICIPATION', '世界の外ではなく、中から参加', 'Diverは万能なGod View編集者ではなく、世界の時間やルールの中に存在する一住民としての参加体験を目指します。'],
        ['03 / TRANSPARENCY', '実装済みと将来像を分ける', 'Alpha 1.0で実際に動く範囲と、今後のwork packageを分けて公開し、未実装の規模や性能を実績のようには扱いません。']
      ],
      releaseKicker: 'RECOMMENDED / REPRODUCIBLE ALPHA',
      releaseTitle: '再現性を優先するなら、Alpha 1.0リリースを使う',
      releaseBody: '初めて試す場合や同じ状態を再現したい場合は、固定タグ v1.0.0-alpha.1 を起点にできます。これは2026年9月8日に公開されたMachiVerse Alpha 1.0のPre-releaseです。',
      releaseLink: 'Release Notesを見る',
      developTitle: '最新の開発版を試す場合',
      developBody: '最新の変更を追いたい場合は、下の develop ブランチ向け手順を利用できます。固定リリースより内容が変化しやすい点にご留意ください。',
      quickstartBody: 'Windows向けのQuick Startです。再現性を優先する場合は固定リリース、最新の開発状況を追う場合は develop を選べます。必要なSDKは .NET 10.0.400相当です。',
      copyButton: 'コピー',
      copied: 'コピー済み',
      resources: [['Release Notes', releaseUrl], ['Roadmap', `${repoUrl}/blob/main/ROADMAP.md`], ['Security', `${repoUrl}/blob/main/SECURITY.md`], ['Support', `${repoUrl}/blob/main/SUPPORT.md`], ['Discussions', `${repoUrl}/discussions`]],
      breadcrumbs: { home: '一般向け', technical: '技術情報', selfHosting: '自分で動かす', architecture: '設計・仕様' }
    },
    en: {
      audience: 'Use the overview to understand the world model, or move into the technical pages when you want to run MachiVerse or follow its design.',
      released: 'Released 2026-09-08',
      focusKicker: 'WHY MACHIVERSE / DESIGN FOCUS',
      focusTitle: 'Three things MachiVerse is designed around.',
      focusLead: 'The focus is not only what a finished city looks like, but why the world changed into its current state. Current implementation and future work are kept explicitly separate.',
      focusCards: [
        ['01 / PROCESS', 'The path matters, not only the result', 'State, causality, interaction, time, and history are connected so the present can be traced back to what changed before it.'],
        ['02 / PARTICIPATION', 'Participate from inside the world', 'A Diver is intended to be a resident inside the world’s time and rules rather than an omnipotent God View editor outside them.'],
        ['03 / TRANSPARENCY', 'Separate implementation from vision', 'What actually runs in Alpha 1.0 is distinguished from future work packages, without presenting unimplemented scale or performance as achieved results.']
      ],
      releaseKicker: 'RECOMMENDED / REPRODUCIBLE ALPHA',
      releaseTitle: 'For reproducibility, start from the Alpha 1.0 release',
      releaseBody: 'For a first run or a repeatable baseline, use the fixed v1.0.0-alpha.1 tag. It is the MachiVerse Alpha 1.0 pre-release published on September 8, 2026.',
      releaseLink: 'Open Release Notes',
      developTitle: 'To try the latest development build',
      developBody: 'Use the develop branch instructions below when you want the newest changes. Unlike the fixed release, this branch can change over time.',
      quickstartBody: 'This is the Windows Quick Start. Choose the fixed release for reproducibility, or develop when you specifically want the latest development state. A .NET SDK equivalent to 10.0.400 is required.',
      copyButton: 'Copy',
      copied: 'Copied',
      resources: [['Release Notes', releaseUrl], ['Roadmap', `${repoUrl}/blob/main/ROADMAP.md`], ['Security', `${repoUrl}/blob/main/SECURITY.md`], ['Support', `${repoUrl}/blob/main/SUPPORT.md`], ['Discussions', `${repoUrl}/discussions`]],
      breadcrumbs: { home: 'Overview', technical: 'Technical', selfHosting: 'Self-hosting', architecture: 'Architecture' }
    },
    'zh-TW': {
      audience: '想先了解世界模型，可以從一般介紹開始；想實際執行 MachiVerse 或追蹤設計細節，則可進入技術資訊。',
      released: '2026-09-08 發布',
      focusKicker: 'WHY MACHIVERSE / DESIGN FOCUS',
      focusTitle: 'MachiVerse 重視的三件事。',
      focusLead: '重點不只是完成後的城市長什麼樣，而是世界為什麼會變成現在的狀態。同時清楚區分目前已實作的內容與未來工作。',
      focusCards: [
        ['01 / PROCESS', '不只看結果，也看形成過程', '把狀態、因果、互動、時間與歷史連接起來，讓現在的狀態能回溯到之前發生的變化。'],
        ['02 / PARTICIPATION', '從世界內部參與', 'Diver 的方向不是站在世界外的全能 God View 編輯者，而是存在於世界時間與規則中的一名居民。'],
        ['03 / TRANSPARENCY', '分開呈現實作與願景', 'Alpha 1.0 已能運作的範圍與後續 work package 會分開說明，不把尚未實作的規模或效能當成既有成果。']
      ],
      releaseKicker: 'RECOMMENDED / REPRODUCIBLE ALPHA',
      releaseTitle: '重視可重現性時，建議從 Alpha 1.0 Release 開始',
      releaseBody: '第一次執行或需要固定基準時，可以使用 v1.0.0-alpha.1 標籤。這是 2026 年 9 月 8 日發布的 MachiVerse Alpha 1.0 Pre-release。',
      releaseLink: '查看 Release Notes',
      developTitle: '想試最新開發版時',
      developBody: '若希望追蹤最新變更，可使用下方 develop 分支的步驟。與固定 Release 不同，develop 的內容會持續變動。',
      quickstartBody: '這是 Windows Quick Start。需要可重現的環境時可選固定 Release，想追蹤最新開發狀態時可選 develop。需要相當於 .NET SDK 10.0.400 的環境。',
      copyButton: '複製',
      copied: '已複製',
      resources: [['Release Notes', releaseUrl], ['Roadmap', `${repoUrl}/blob/main/ROADMAP.md`], ['Security', `${repoUrl}/blob/main/SECURITY.md`], ['Support', `${repoUrl}/blob/main/SUPPORT.md`], ['Discussions', `${repoUrl}/discussions`]],
      breadcrumbs: { home: '一般介紹', technical: '技術資訊', selfHosting: '自行執行', architecture: '架構・規格' }
    },
    ko: {
      audience: '세계 모델을 먼저 이해하려면 일반 소개를, 직접 실행하거나 설계를 따라가려면 기술 정보를 이용할 수 있습니다.',
      released: '2026-09-08 릴리스',
      focusKicker: 'WHY MACHIVERSE / DESIGN FOCUS',
      focusTitle: 'MachiVerse가 중요하게 보는 세 가지.',
      focusLead: '완성된 도시의 모습만이 아니라 세계가 왜 현재 상태가 되었는지를 다룹니다. 현재 구현과 앞으로의 작업도 명확히 구분합니다.',
      focusCards: [
        ['01 / PROCESS', '결과뿐 아니라 그 과정까지', '상태, 인과, 상호작용, 시간, 역사를 연결해 현재 상태가 이전의 어떤 변화에서 이어졌는지 추적할 수 있는 세계를 지향합니다.'],
        ['02 / PARTICIPATION', '세계 밖이 아니라 안에서 참여', 'Diver는 세계 밖의 전능한 God View 편집자가 아니라 세계의 시간과 규칙 속에 존재하는 한 명의 주민으로 참여하는 경험을 지향합니다.'],
        ['03 / TRANSPARENCY', '구현과 비전을 구분', 'Alpha 1.0에서 실제로 동작하는 범위와 이후 work package를 분리해 공개하고, 아직 구현하지 않은 규모나 성능을 이미 달성한 것처럼 다루지 않습니다.']
      ],
      releaseKicker: 'RECOMMENDED / REPRODUCIBLE ALPHA',
      releaseTitle: '재현성을 우선한다면 Alpha 1.0 릴리스부터 시작',
      releaseBody: '처음 실행하거나 같은 기준을 재현하려면 고정 태그 v1.0.0-alpha.1을 사용할 수 있습니다. 2026년 9월 8일 공개된 MachiVerse Alpha 1.0 Pre-release입니다.',
      releaseLink: 'Release Notes 보기',
      developTitle: '최신 개발판을 시험하려면',
      developBody: '최신 변경 사항을 확인하려면 아래 develop 브랜치 절차를 사용할 수 있습니다. 고정 릴리스와 달리 내용은 계속 바뀔 수 있습니다.',
      quickstartBody: 'Windows용 Quick Start입니다. 재현성이 중요하면 고정 릴리스를, 최신 개발 상태가 필요하면 develop을 선택할 수 있습니다. .NET SDK 10.0.400 상당이 필요합니다.',
      copyButton: '복사',
      copied: '복사됨',
      resources: [['Release Notes', releaseUrl], ['Roadmap', `${repoUrl}/blob/main/ROADMAP.md`], ['Security', `${repoUrl}/blob/main/SECURITY.md`], ['Support', `${repoUrl}/blob/main/SUPPORT.md`], ['Discussions', `${repoUrl}/discussions`]],
      breadcrumbs: { home: '일반 소개', technical: '기술 정보', selfHosting: '직접 실행', architecture: '설계・구조' }
    }
  }[locale];

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.href = './assets/css/site-enhancements.css';
  document.head.appendChild(style);

  if (isPublic) {
    const heroCopy = document.querySelector('.navigator-hero .navigator-copy');
    const definition = heroCopy?.querySelector('.product-definition');
    if (definition && !heroCopy.querySelector('.audience-note')) {
      const audience = document.createElement('p');
      audience.className = 'audience-note';
      audience.textContent = copy.audience;
      definition.after(audience);
    }

    const heroActions = heroCopy?.querySelector('.hero-actions');
    if (heroActions && !heroCopy.querySelector('.release-trust-bar')) {
      const trust = document.createElement('div');
      trust.className = 'release-trust-bar';
      trust.setAttribute('aria-label', 'MachiVerse Alpha 1.0 release information');
      trust.innerHTML = `
        <span><b>Alpha 1.0</b></span>
        <a href="${releaseUrl}">v1.0.0-alpha.1</a>
        <span>${copy.released}</span>
        <a href="${licenseUrl}">Apache-2.0</a>
        <span>.NET 10</span>`;
      heroActions.after(trust);
    }

    const proof = document.querySelector('#proof');
    if (proof && !document.querySelector('.product-focus-section')) {
      const section = document.createElement('section');
      section.className = 'product-focus-section';
      section.setAttribute('aria-labelledby', 'product-focus-title');
      const cards = copy.focusCards.map(([kicker, title, body]) => `
        <article class="product-focus-card">
          <small>${kicker}</small>
          <strong>${title}</strong>
          <p>${body}</p>
        </article>`).join('');
      section.innerHTML = `
        <div class="container product-focus-inner">
          <div class="product-focus-heading">
            <p class="chapter-kicker">${copy.focusKicker}</p>
            <h2 id="product-focus-title">${copy.focusTitle}</h2>
            <p>${copy.focusLead}</p>
          </div>
          <div class="product-focus-grid">${cards}</div>
        </div>`;
      proof.before(section);
    }
  }

  if (isSelfHosting) {
    const quickStart = document.querySelector('#quick-start');
    const primaryColumn = quickStart?.querySelector('.quickstart-grid > div');
    const storyCopy = primaryColumn?.querySelector('.story-copy');
    if (primaryColumn && storyCopy && !primaryColumn.querySelector('.release-quickstart')) {
      const visibleParagraph = storyCopy.querySelector('p');
      if (visibleParagraph) visibleParagraph.textContent = copy.quickstartBody;
      if (quickStart?.dataset) quickStart.dataset.mioText = copy.quickstartBody;

      const release = document.createElement('div');
      release.className = 'release-quickstart';
      release.innerHTML = `
        <span class="release-kicker">${copy.releaseKicker}</span>
        <h3>${copy.releaseTitle}</h3>
        <p>${copy.releaseBody} <a href="${releaseUrl}">${copy.releaseLink}</a></p>
        <pre class="code-block" data-label="ALPHA 1.0 RELEASE"><code>git fetch --tags\ngit switch --detach v1.0.0-alpha.1\nstart-alpha.bat</code></pre>`;
      storyCopy.after(release);

      const existingDevelopPre = [...primaryColumn.querySelectorAll('pre.code-block')].find((pre) => !pre.closest('.release-quickstart'));
      if (existingDevelopPre) {
        existingDevelopPre.dataset.label = 'LATEST DEVELOP';
        const note = document.createElement('div');
        note.className = 'latest-develop-note';
        note.innerHTML = `<strong>${copy.developTitle}</strong><span>${copy.developBody}</span>`;
        existingDevelopPre.before(note);
      }
    }
  }

  document.querySelectorAll('pre.code-block').forEach((pre) => {
    if (pre.querySelector('.code-copy-button')) return;
    const code = pre.querySelector('code');
    if (!code) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'code-copy-button';
    button.textContent = copy.copyButton;
    button.setAttribute('aria-label', copy.copyButton);
    button.addEventListener('click', async () => {
      const text = code.textContent || '';
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      button.textContent = copy.copied;
      window.setTimeout(() => { button.textContent = copy.copyButton; }, 1200);
    });
    pre.appendChild(button);
  });

  const footerLinks = document.querySelector('.site-footer .footer-links');
  if (footerLinks) {
    copy.resources.forEach(([label, href]) => {
      if ([...footerLinks.querySelectorAll('a')].some((link) => link.href === href)) return;
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      link.className = 'footer-resource-link';
      footerLinks.appendChild(link);
    });
  }

  const canonical = document.querySelector('link[rel="canonical"]')?.href;
  if (canonical && !document.querySelector('#machiverse-structured-data')) {
    const graph = [{
      '@type': 'WebSite',
      '@id': 'https://machiverse.app/#website',
      url: 'https://machiverse.app/',
      name: 'MachiVerse'
    }];

    if (isPublic) {
      graph.push({
        '@type': 'SoftwareSourceCode',
        '@id': 'https://machiverse.app/#source',
        name: 'MachiVerse',
        url: canonical,
        description: document.querySelector('meta[name="description"]')?.content || '',
        codeRepository: repoUrl,
        programmingLanguage: 'C#',
        runtimePlatform: '.NET 10',
        license: licenseUrl,
        version: 'v1.0.0-alpha.1',
        datePublished: '2026-09-08'
      });
    }

    if (/^(developer|self-hosting|architecture)/.test(filename)) {
      const suffix = locale === 'ja' ? '' : locale === 'en' ? '-en' : locale === 'zh-TW' ? '-zh-tw' : '-ko';
      const homeUrl = locale === 'ja' ? 'https://machiverse.app/' : `https://machiverse.app/index${suffix}.html`;
      const technicalUrl = `https://machiverse.app/developer${suffix}.html`;
      const items = [
        { '@type': 'ListItem', position: 1, name: copy.breadcrumbs.home, item: homeUrl },
        { '@type': 'ListItem', position: 2, name: copy.breadcrumbs.technical, item: technicalUrl }
      ];
      if (filename.startsWith('self-hosting')) items.push({ '@type': 'ListItem', position: 3, name: copy.breadcrumbs.selfHosting, item: canonical });
      if (filename.startsWith('architecture')) items.push({ '@type': 'ListItem', position: 3, name: copy.breadcrumbs.architecture, item: canonical });
      graph.push({ '@type': 'BreadcrumbList', itemListElement: items });
    }

    const script = document.createElement('script');
    script.id = 'machiverse-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
    document.head.appendChild(script);
  }
})();
