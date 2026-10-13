// Shared helpers used across components.
export const $ = (s, r) => (r || document).querySelector(s);
export const $$ = (s, r) => Array.prototype.slice.call((r || document).querySelectorAll(s));
export const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
export const HAS_IO = 'IntersectionObserver' in window;
export const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

export function mmss(s) {
  s = Math.max(0, Math.round(s));
  return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2);
}

// Run `cb` once, the first time `el` scrolls into view.
export function whenVisible(el, cb) {
  const o = new IntersectionObserver((es) => { if (es[0].isIntersecting) { o.disconnect(); cb(); } }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
  o.observe(el);
}

// Mark an element so its inner lines/checks "draw" when it first scrolls into view.
// CSS: `.draw-pre:not(.drawn) ...` hides the strokes until `.drawn` is added.
export function drawOnReveal(selector, className = 'draw-pre') {
  if (!HAS_IO || reduce) return;
  const c = $(selector);
  if (c && c.getBoundingClientRect().top > window.innerHeight) {
    c.classList.add(className);
    whenVisible(c, () => c.classList.add('drawn'));
  }
}
