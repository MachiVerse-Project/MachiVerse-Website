(() => {
  const selector = '.mio-guide-character';
  const boundsCache = new Map();
  const observedImages = new WeakSet();

  const getOpaqueBounds = (image) => {
    const src = image.currentSrc || image.src;
    if (boundsCache.has(src)) return boundsCache.get(src);

    const width = image.naturalWidth;
    const height = image.naturalHeight;
    if (!width || !height) return null;

    try {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return null;
      context.drawImage(image, 0, 0);
      const pixels = context.getImageData(0, 0, width, height).data;

      let minX = width;
      let minY = height;
      let maxX = -1;
      let maxY = -1;
      const alphaThreshold = 10;
      const step = width * height > 900000 ? 2 : 1;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          if (pixels[(y * width + x) * 4 + 3] <= alphaThreshold) continue;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }

      if (maxX < minX || maxY < minY) return null;
      const bounds = {
        x: minX,
        y: minY,
        width: maxX - minX + 1,
        height: maxY - minY + 1
      };
      boundsCache.set(src, bounds);
      return bounds;
    } catch {
      return null;
    }
  };

  const fitCharacter = (image) => {
    if (!image.complete || !image.naturalWidth || !image.naturalHeight) return;
    const stage = image.closest('.mio-guide-visual');
    if (!stage) return;

    const stageWidth = stage.clientWidth;
    const stageHeight = stage.clientHeight;
    if (!stageWidth || !stageHeight) return;

    const bounds = getOpaqueBounds(image);
    if (!bounds) return;

    const compact = window.matchMedia('(max-width: 820px)').matches;
    const targetHeight = stageHeight * (compact ? 1.58 : 1.46);
    const targetMaxWidth = stageWidth * (compact ? 1.08 : 1.16);
    const scaleByHeight = targetHeight / bounds.height;
    const scaleByWidth = targetMaxWidth / bounds.width;
    const scale = Math.min(scaleByHeight, scaleByWidth);

    const visibleTop = stageHeight * (compact ? 0.02 : 0.015);
    const visibleCenterX = stageWidth * (compact ? 0.56 : 0.5);
    const translateX = visibleCenterX - (bounds.x + bounds.width / 2) * scale;
    const translateY = visibleTop - bounds.y * scale;

    image.style.left = '0';
    image.style.right = 'auto';
    image.style.top = '0';
    image.style.bottom = 'auto';
    image.style.width = `${image.naturalWidth}px`;
    image.style.height = `${image.naturalHeight}px`;
    image.style.maxWidth = 'none';
    image.style.maxHeight = 'none';
    image.style.objectFit = 'contain';
    image.style.transformOrigin = '0 0';
    image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
    image.dataset.fitReady = 'true';
  };

  const install = (image) => {
    if (!(image instanceof HTMLImageElement) || observedImages.has(image)) return;
    observedImages.add(image);

    const refit = () => window.requestAnimationFrame(() => fitCharacter(image));
    image.addEventListener('load', refit);

    const sourceObserver = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.attributeName === 'src')) refit();
    });
    sourceObserver.observe(image, { attributes: true, attributeFilter: ['src'] });

    const stage = image.closest('.mio-guide-visual');
    if ('ResizeObserver' in window && stage) {
      const resizeObserver = new ResizeObserver(refit);
      resizeObserver.observe(stage);
    } else {
      window.addEventListener('resize', refit, { passive: true });
    }

    if (image.complete) refit();
  };

  const scan = (root = document) => {
    root.querySelectorAll?.(selector).forEach(install);
    if (root.matches?.(selector)) install(root);
  };

  scan();
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => mutation.addedNodes.forEach((node) => {
      if (node instanceof Element) scan(node);
    }));
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
