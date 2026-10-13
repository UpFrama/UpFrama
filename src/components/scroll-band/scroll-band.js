import { $, $$, reduce } from '../../js/utils.js';
import { onScrollFrame, onLayout } from '../../js/scroll.js';

// Text band scrolls sideways with the page and tilts slightly with scroll speed.
export function initScrollBand() {
  const bandRows = $$('.band-row');
  let setW = 0, lastY = 0, bandSkew = 0, skewRaf = 0;

  function measureBand() { const st = $('.band-set'); setW = st ? st.getBoundingClientRect().width : 0; }
  function moveBand(y) {
    if (!setW) return;
    const d = (y * 0.32) % setW;
    bandRows.forEach((r, i) => { r.style.transform = 'translate3d(' + (i ? d - setW : -d) + 'px,0,0) skewX(' + bandSkew.toFixed(2) + 'deg)'; });
  }
  function skewDecay() {
    if (skewRaf) return; skewRaf = 1;
    requestAnimationFrame(() => {
      skewRaf = 0; bandSkew *= 0.86; if (Math.abs(bandSkew) < 0.05) bandSkew = 0;
      moveBand(window.pageYOffset || 0);
      if (bandSkew !== 0) skewDecay();
    });
  }

  measureBand();
  onLayout(measureBand);
  if (reduce) return;
  onScrollFrame((y) => {
    const vel = y - lastY; lastY = y;
    bandSkew = Math.max(-5, Math.min(5, bandSkew * 0.5 - vel * 0.06));
    moveBand(y);
    if (Math.abs(bandSkew) > 0.05) requestAnimationFrame(skewDecay);
  });
}
