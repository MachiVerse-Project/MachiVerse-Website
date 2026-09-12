if (!document.querySelector('link[data-header-shell-fix]')) {
  const headerShellStyle = document.createElement('link');
  headerShellStyle.rel = 'stylesheet';
  headerShellStyle.href = './assets/css/header-shell-fix.css';
  headerShellStyle.dataset.headerShellFix = 'true';
  document.head.appendChild(headerShellStyle);
}

Promise.all([
  import('./site-enhancements-runtime.js'),
  import('./footer-layout.js'),
  import('./social-feed.js'),
  import('./mio-devlog.js'),
  import('./instance-link.js'),
  import('./instance-page-nav.js')
])
  .then(() => import('./review-enhancements.js'))
  .then(() => import('./hero-mio-overlay.js'))
  .catch((error) => console.error('MachiVerse site enhancements failed to load.', error));