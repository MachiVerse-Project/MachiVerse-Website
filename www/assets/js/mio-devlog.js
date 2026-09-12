(() => {
  const proofSection = document.querySelector('#proof');
  if (!proofSection || document.querySelector('#mio-devlog')) return;

  const locale = document.documentElement.lang === 'ja'
    ? 'ja'
    : document.documentElement.lang === 'zh-TW'
      ? 'zh-TW'
      : document.documentElement.lang === 'ko'
        ? 'ko'
        : 'en';

  const copy = {
    ja: {
      embedded: 'SITE EMBED / CHARACTER DEVLOG',
      latest: 'LATEST NOTES',
      actions: ['返信', '再投稿', 'いいね']
    },
    en: {
      embedded: 'SITE EMBED / CHARACTER DEVLOG',
      latest: 'LATEST NOTES',
      actions: ['Reply', 'Repost', 'Like']
    },
    'zh-TW': {
      embedded: 'SITE EMBED / CHARACTER DEVLOG',
      latest: 'LATEST NOTES',
      actions: ['回覆', '轉發', '喜歡']
    },
    ko: {
      embedded: 'SITE EMBED / CHARACTER DEVLOG',
      latest: 'LATEST NOTES',
      actions: ['답글', '재게시', '좋아요']
    }
  }[locale];

  const localize = (value) => {
    if (value == null) return '';
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    return value[locale] || value.en || value.ja || Object.values(value)[0] || '';
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

  const addStylesheet = () => {
    if (document.querySelector('link[data-mio-devlog-style]')) return;
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = './assets/css/mio-devlog.css';
    stylesheet.dataset.mioDevlogStyle = 'true';
    document.head.appendChild(stylesheet);
  };

  const buildPost = (post, profile) => {
    const article = document.createElement('article');
    article.className = 'mio-devlog-post';
    article.dataset.postId = post.id || '';

    const avatar = document.createElement('div');
    avatar.className = 'mio-devlog-avatar';
    if (profile.avatar) {
      const img = document.createElement('img');
      img.src = profile.avatar;
      img.alt = '';
      img.loading = 'lazy';
      avatar.appendChild(img);
    }

    const body = document.createElement('div');
    body.className = 'mio-devlog-post-body';

    const head = document.createElement('div');
    head.className = 'mio-devlog-post-head';
    const author = document.createElement('strong');
    author.textContent = localize(profile.name);
    const handle = document.createElement('span');
    handle.textContent = profile.handle || '';
    const time = document.createElement('time');
    time.dateTime = post.date || '';
    time.textContent = formatDate(post.date);
    head.append(author, handle, time);

    if (post.badge) {
      const badge = document.createElement('span');
      badge.className = 'mio-devlog-badge';
      badge.textContent = localize(post.badge);
      head.appendChild(badge);
    }

    const text = document.createElement('p');
    text.className = 'mio-devlog-text';
    text.textContent = localize(post.body);

    body.append(head, text);

    if (Array.isArray(post.tags) && post.tags.length) {
      const tags = document.createElement('div');
      tags.className = 'mio-devlog-tags';
      post.tags.forEach((value) => {
        const tag = document.createElement('span');
        tag.textContent = `#${value}`;
        tags.appendChild(tag);
      });
      body.appendChild(tags);
    }

    if (post.media?.src) {
      const figure = document.createElement('figure');
      figure.className = 'mio-devlog-media';
      const img = document.createElement('img');
      img.src = post.media.src;
      img.alt = localize(post.media.alt);
      img.loading = 'lazy';
      figure.appendChild(img);
      body.appendChild(figure);
    }

    const actions = document.createElement('div');
    actions.className = 'mio-devlog-actions';
    actions.setAttribute('aria-hidden', 'true');
    copy.actions.forEach((label, index) => {
      const action = document.createElement('span');
      action.className = `mio-devlog-action action-${index + 1}`;
      action.textContent = label;
      actions.appendChild(action);
    });
    body.appendChild(actions);

    article.append(avatar, body);
    return article;
  };

  const render = (data) => {
    if (!data?.enabled || !Array.isArray(data.posts) || data.posts.length === 0) return;
    addStylesheet();

    const section = document.createElement('section');
    section.id = 'mio-devlog';
    section.className = 'mio-devlog-section';

    const shell = document.createElement('div');
    shell.className = 'container mio-devlog-shell';

    const intro = document.createElement('div');
    intro.className = 'mio-devlog-intro';

    const kicker = document.createElement('p');
    kicker.className = 'chapter-kicker';
    kicker.textContent = localize(data.section?.kicker);

    const title = document.createElement('h2');
    title.textContent = localize(data.section?.title);

    const lead = document.createElement('p');
    lead.className = 'mio-devlog-lead';
    lead.textContent = localize(data.section?.lead);

    const profile = document.createElement('div');
    profile.className = 'mio-devlog-profile';
    const profileImage = document.createElement('img');
    profileImage.src = data.profile?.avatar || './assets/images/characters/nagumo-mio/web/mio-welcome.png';
    profileImage.alt = localize(data.profile?.name) || 'Mio Nagumo';
    profileImage.loading = 'lazy';
    const profileCopy = document.createElement('div');
    const profileName = document.createElement('strong');
    profileName.textContent = localize(data.profile?.name);
    const profileRole = document.createElement('span');
    profileRole.textContent = localize(data.profile?.role);
    const profileHandle = document.createElement('small');
    profileHandle.textContent = data.profile?.handle || '';
    profileCopy.append(profileName, profileRole, profileHandle);
    profile.append(profileImage, profileCopy);

    intro.append(kicker, title, lead, profile);

    const embed = document.createElement('div');
    embed.className = 'mio-devlog-embed';

    const appbar = document.createElement('div');
    appbar.className = 'mio-devlog-appbar';
    const appTitle = document.createElement('div');
    const appTitleStrong = document.createElement('strong');
    appTitleStrong.textContent = 'MIO DEVLOG';
    const appTitleSmall = document.createElement('span');
    appTitleSmall.textContent = copy.embedded;
    appTitle.append(appTitleStrong, appTitleSmall);
    const latest = document.createElement('span');
    latest.className = 'mio-devlog-latest';
    latest.textContent = copy.latest;
    appbar.append(appTitle, latest);

    const stream = document.createElement('div');
    stream.className = 'mio-devlog-stream';
    stream.setAttribute('role', 'feed');
    stream.setAttribute('aria-label', localize(data.section?.title));
    const maxPosts = Math.max(1, Number(data.maxPosts) || data.posts.length);
    data.posts.slice(0, maxPosts).forEach((post) => stream.appendChild(buildPost(post, data.profile || {})));

    embed.append(appbar, stream);
    shell.append(intro, embed);
    section.appendChild(shell);
    proofSection.insertAdjacentElement('afterend', section);

    const posts = [...stream.querySelectorAll('.mio-devlog-post')];
    if (posts.length > 1) {
      stream.classList.add('is-scrollable');

      let resizeFrame = 0;
      const syncStreamHeight = () => {
        resizeFrame = 0;
        const firstPost = posts[0];
        if (!firstPost) return;

        const peek = window.innerWidth <= 600 ? 64 : 84;
        const minHeight = window.innerWidth <= 600 ? 360 : 420;
        const maxHeight = window.innerWidth <= 600 ? 520 : 620;
        const firstPostHeight = Math.ceil(firstPost.getBoundingClientRect().height);
        const targetHeight = Math.min(maxHeight, Math.max(minHeight, firstPostHeight + peek));
        stream.style.setProperty('--mio-devlog-stream-height', `${targetHeight}px`);
      };

      const scheduleStreamHeight = () => {
        if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(syncStreamHeight);
      };

      scheduleStreamHeight();
      stream.querySelectorAll('img').forEach((img) => {
        if (!img.complete) img.addEventListener('load', scheduleStreamHeight, { once: true });
      });
      window.addEventListener('resize', scheduleStreamHeight, { passive: true });
    }
  };

  fetch('./assets/data/mio-devlog.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(render)
    .catch((error) => console.error('MIO DEVLOG failed to load.', error));
})();
