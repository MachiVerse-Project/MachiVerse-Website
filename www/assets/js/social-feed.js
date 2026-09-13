(() => {
  const anchor = document.querySelector('[data-world-feed-anchor]');
  if (!anchor || document.querySelector('#world-feed')) return;

  const locale = document.documentElement.lang === 'ja'
    ? 'ja'
    : document.documentElement.lang === 'zh-TW'
      ? 'zh-TW'
      : document.documentElement.lang === 'ko'
        ? 'ko'
        : 'en';

  const ui = {
    ja: {
      appSubline: 'MACHIVERSE SOCIAL LAYER / DEMO',
      live: 'STATIC DEMO',
      reply: '返信',
      repost: '再投稿',
      like: 'いいね',
      footer: 'WORLD FEEDは content.machiverse.app から配信されています。'
    },
    en: {
      appSubline: 'MACHIVERSE SOCIAL LAYER / DEMO',
      live: 'STATIC DEMO',
      reply: 'Replies',
      repost: 'Reposts',
      like: 'Likes',
      footer: 'WORLD FEED is served from content.machiverse.app.'
    },
    'zh-TW': {
      appSubline: 'MACHIVERSE SOCIAL LAYER / DEMO',
      live: 'STATIC DEMO',
      reply: '回覆',
      repost: '轉發',
      like: '喜歡',
      footer: 'WORLD FEED 由 content.machiverse.app 提供。'
    },
    ko: {
      appSubline: 'MACHIVERSE SOCIAL LAYER / DEMO',
      live: 'STATIC DEMO',
      reply: '답글',
      repost: '재게시',
      like: '좋아요',
      footer: 'WORLD FEED는 content.machiverse.app에서 제공됩니다.'
    }
  }[locale];

  const localize = (value) => {
    if (value == null) return '';
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    return value[locale] || value.en || value.ja || Object.values(value)[0] || '';
  };

  const addStylesheet = () => {
    if (document.querySelector('link[data-social-feed-style]')) return;
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = './assets/css/social-feed.css';
    stylesheet.dataset.socialFeedStyle = 'true';
    document.head.appendChild(stylesheet);
  };

  const formatDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value || '';
    const locales = { ja: 'ja-JP', en: 'en-US', 'zh-TW': 'zh-TW', ko: 'ko-KR' };
    return new Intl.DateTimeFormat(locales[locale], {
      year: 'numeric',
      month: locale === 'en' ? 'short' : 'numeric',
      day: 'numeric'
    }).format(date);
  };

  const buildAvatar = (post) => {
    const avatar = document.createElement('div');
    avatar.className = 'world-feed-avatar';
    avatar.setAttribute('aria-hidden', 'true');

    if (post.avatar) {
      const image = document.createElement('img');
      image.src = post.avatar;
      image.alt = '';
      image.loading = 'lazy';
      avatar.appendChild(image);
    } else {
      avatar.textContent = post.avatarText || localize(post.author).slice(0, 2).toUpperCase();
    }

    return avatar;
  };

  const buildMetric = (label, value) => {
    const metric = document.createElement('span');
    metric.className = 'world-feed-metric';
    metric.setAttribute('aria-label', `${label}: ${value ?? 0}`);

    const name = document.createElement('span');
    name.textContent = label;
    const count = document.createElement('b');
    count.textContent = String(value ?? 0);
    metric.append(name, count);
    return metric;
  };

  const buildPost = (post) => {
    const article = document.createElement('article');
    article.className = 'world-feed-post';
    article.dataset.tone = post.tone || 'resident';
    article.dataset.postId = post.id || '';

    const main = document.createElement('div');
    main.className = 'world-feed-main';

    const meta = document.createElement('div');
    meta.className = 'world-feed-meta';
    const author = document.createElement('span');
    author.className = 'world-feed-author';
    author.textContent = localize(post.author);
    const handle = document.createElement('span');
    handle.className = 'world-feed-handle';
    handle.textContent = post.handle || '';
    const time = document.createElement('time');
    time.className = 'world-feed-time';
    time.dateTime = post.date || '';
    time.textContent = formatDate(post.date);
    meta.append(author, handle, time);

    if (post.badge) {
      const badge = document.createElement('span');
      badge.className = 'world-feed-badge';
      badge.textContent = localize(post.badge);
      meta.appendChild(badge);
    }

    const body = document.createElement('p');
    body.className = 'world-feed-body';
    body.textContent = localize(post.body);
    main.append(meta, body);

    if (post.media?.src) {
      const media = document.createElement('div');
      media.className = 'world-feed-media';
      const image = document.createElement('img');
      image.src = post.media.src;
      image.alt = localize(post.media.alt);
      image.loading = 'lazy';
      media.appendChild(image);
      main.appendChild(media);
    }

    const footer = document.createElement('div');
    footer.className = 'world-feed-footer';
    const metrics = post.metrics || {};
    footer.append(
      buildMetric(ui.reply, metrics.reply),
      buildMetric(ui.repost, metrics.repost),
      buildMetric(ui.like, metrics.like)
    );

    if (post.link) {
      const source = document.createElement('a');
      source.className = 'world-feed-source';
      source.href = post.link;
      source.target = '_blank';
      source.rel = 'noopener noreferrer';
      source.textContent = localize(post.linkLabel) || post.link;
      footer.appendChild(source);
    }

    main.appendChild(footer);
    article.append(buildAvatar(post), main);
    return article;
  };

  const render = (data) => {
    if (!data?.enabled || !Array.isArray(data.posts) || data.posts.length === 0) return;
    addStylesheet();

    const section = document.createElement('section');
    section.id = 'world-feed';
    section.className = 'world-feed-section';

    const container = document.createElement('div');
    container.className = 'container world-feed-shell';

    const intro = document.createElement('div');
    intro.className = 'world-feed-copy';
    const kicker = document.createElement('p');
    kicker.className = 'chapter-kicker';
    kicker.textContent = localize(data.section?.kicker);
    const title = document.createElement('h2');
    title.textContent = localize(data.section?.title);
    const lead = document.createElement('p');
    lead.textContent = localize(data.section?.lead);
    const note = document.createElement('p');
    note.className = 'world-feed-note';
    note.textContent = localize(data.section?.note);
    intro.append(kicker, title, lead, note);

    const app = document.createElement('div');
    app.className = 'world-feed-app';

    const appbar = document.createElement('div');
    appbar.className = 'world-feed-appbar';
    const brand = document.createElement('div');
    brand.className = 'world-feed-appbrand';
    const brandImage = document.createElement('img');
    brandImage.src = './assets/images/brand/logo-symbol.png';
    brandImage.alt = '';
    const brandCopy = document.createElement('div');
    const brandName = document.createElement('strong');
    brandName.textContent = 'WORLD FEED';
    const brandSubline = document.createElement('span');
    brandSubline.textContent = ui.appSubline;
    brandCopy.append(brandName, brandSubline);
    brand.append(brandImage, brandCopy);
    const live = document.createElement('span');
    live.className = 'world-feed-live';
    live.textContent = ui.live;
    appbar.append(brand, live);

    const stream = document.createElement('div');
    stream.className = 'world-feed-stream';
    stream.setAttribute('role', 'feed');
    stream.setAttribute('aria-label', localize(data.section?.title));
    const maxPosts = Math.max(1, Number(data.maxPosts) || data.posts.length);
    data.posts.slice(0, maxPosts).forEach((post) => stream.appendChild(buildPost(post)));

    const appFooter = document.createElement('div');
    appFooter.className = 'world-feed-appfooter';
    appFooter.textContent = ui.footer;

    app.append(appbar, stream, appFooter);
    container.append(intro, app);
    section.appendChild(container);
    anchor.replaceWith(section);
  };

  fetch('https://content.machiverse.app/feeds/world-feed.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(render)
    .catch((error) => console.error('MachiVerse WORLD FEED failed to load.', error));
})();
