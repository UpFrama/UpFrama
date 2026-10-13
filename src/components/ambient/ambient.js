import { $, reduce } from '../../js/utils.js';
import { onScrollFrame } from '../../js/scroll.js';

// Background glow orbs sway sideways and drift with page progress.
export function initAmbient() {
  if (reduce) return;
  const orb1 = $('.ambient .o1'), orb2 = $('.ambient .o2');
  onScrollFrame((y, max) => {
    const pg = max > 0 ? y / max : 0;
    if (orb1) orb1.style.translate = (Math.sin(pg * 6.2832) * 110).toFixed(1) + 'px ' + (-y * 0.12).toFixed(1) + 'px';
    if (orb2) orb2.style.translate = (Math.cos(pg * 6.2832) * -110).toFixed(1) + 'px ' + (y * 0.1).toFixed(1) + 'px';
  });
}
