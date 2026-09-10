Promise.all([
  import('./site-enhancements-runtime.js'),
  import('./footer-layout.js')
]).catch((error) => console.error('MachiVerse site enhancements failed to load.', error));
