import { $$, reduce, clamp01 } from './utils.js';
import { onScrollFrame } from './scroll.js';

// Scroll-scrubbed effects driven by position in the viewport.
//   registerScrub(el, 'par', k)  -> element drifts vertically (desktop only), k = speed
//   registerScrub(el, 'scale')   -> element scales up and rises into place
// Also draws the orange line across the top of every section (`--sl`).
const items = [];
let sectionEls = [];

export function registerScrub(el, type, k) {
  if (el) items.push({ el, t: type, k });
}

export function initScrub() {
  if (reduce) return;
  sectionEls = $$('.section');
  const mqNarrow = window.matchMedia ? window.matchMedia('(max-width: 900px)') : { matches: false };

  function scrubAll() {
    const vh = window.innerHeight, narrow = mqNarrow.matches;
    let i, it, r, v;
    const reads = items.map((x) => (x.el.parentElement || x.el).getBoundingClientRect());
    const sreads = sectionEls.map((s) => s.getBoundingClientRect().top);
    for (i = 0; i < items.length; i++) {
      it = items[i]; r = reads[i];
      if (r.bottom < -200 || r.top > vh + 200) continue;
      if (it.t === 'par') {
        v = narrow ? 0 : Math.max(-46, Math.min(46, (r.top + r.height / 2 - vh / 2) * it.k));
        it.el.style.translate = '0 ' + v.toFixed(1) + 'px';
      } else {
        v = clamp01((vh * 0.98 - r.top) / (vh * 0.5)); v = 1 - Math.pow(1 - v, 3);
        it.el.style.scale = (0.95 + 0.05 * v).toFixed(4);
        it.el.style.translate = '0 ' + ((1 - v) * 26).toFixed(1) + 'px';
      }
    }
    for (i = 0; i < sectionEls.length; i++) sectionEls[i].style.setProperty('--sl', clamp01((vh * 0.94 - sreads[i]) / (vh * 0.42)).toFixed(3));
  }

  onScrollFrame(scrubAll);
  scrubAll();
  setTimeout(scrubAll, 400);
}
