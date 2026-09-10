Promise.all([
  import('./site-enhancements-runtime.js'),
  import('./footer-layout.js')
])
  .then(() => import('./review-enhancements.js'))
  .catch((error) => console.error('MachiVerse site enhancements failed to load.', error));
