import { $, reduce } from '../../js/utils.js';
import { onScrollFrame } from '../../js/scroll.js';

// Parallax: background drifts, copy fades/rises/shrinks, simulator lifts as you scroll away.
export function initHero() {
  if (reduce) return;
  const heroBg = $('.hero-bg'), heroCopy = $('.hero-copy'), simBox = $('#sim');
  onScrollFrame((y) => {
    const p = Math.min(1, y / 620);
    if (heroBg) heroBg.style.translate = '0 ' + (y * 0.28).toFixed(1) + 'px';
    if (heroCopy) { heroCopy.style.translate = '0 ' + (-p * 46).toFixed(1) + 'px'; heroCopy.style.opacity = (1 - p * 0.75).toFixed(3); }
    if (simBox) simBox.style.translate = '0 ' + (-p * 18).toFixed(1) + 'px';
    if (heroCopy) heroCopy.style.scale = (1 - p * 0.05).toFixed(4);
  });
}
