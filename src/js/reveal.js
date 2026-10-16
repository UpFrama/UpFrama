import { $, $$, reduce, HAS_IO } from './utils.js';
import { onScrollFrame } from './scroll.js';

// Elements that fade/slide in the first time they scroll into view.
// Direction: left/right panels slide sideways, grid cards alternate, the rest rise.
const REVEAL_TARGETS = ['.book', '.calc-in', '.calc-out', '.sec-head', '.sub-head', '.dk-deck', '.dk-foot', '.diff > article', '.marquee', '.panel', '.ind', '.step', '.payg > article', '.wd-svc', '.hm-about-copy', '.hm-points li', '.hm-svc', '.hm-road', '.wd-proj-media', '.wd-proj-text', '.wd-final', '.included', '.foot > *', '.foot-bottom'];

export function initReveals() {
  // If the page is scrolled to the very bottom, anything still hidden is shown.
  onScrollFrame((y, max) => {
    if (max - y < 8) $$('.rv:not(.rv-in)').forEach((e) => e.classList.add('rv-in'));
  });
  if (!HAS_IO || reduce) return;

  const vh = window.innerHeight;
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

  REVEAL_TARGETS.forEach((sel) => {
    $$(sel).forEach((el, i) => {
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      if (el.parentElement && el.parentElement.closest('.rv')) return;
      el.classList.add('rv');
      const dir = el.matches('.panel--old, .calc-in, .payg-main') ? 'rv--l'
        : el.matches('.panel--new, .calc-out, .payg-viz') ? 'rv--r'
        : el.matches('.wd-proj:nth-child(odd) .wd-proj-media, .wd-proj:nth-child(even) .wd-proj-text') ? 'rv--l'
        : el.matches('.wd-proj:nth-child(even) .wd-proj-media, .wd-proj:nth-child(odd) .wd-proj-text') ? 'rv--r'
        : el.matches('.ind') ? (i % 2 ? 'rv--r' : 'rv--l') : '';
      if (dir) el.classList.add(dir);
      el.style.setProperty('--rd', (Math.min(i % 4, 3) * 0.09) + 's');
      io.observe(el);
      // Once revealed, drop the helper classes so hover transforms work normally.
      el.addEventListener('transitionend', function h(ev) {
        if (ev.target === el && ev.propertyName === 'transform' && el.classList.contains('rv-in')) {
          el.classList.remove('rv', 'rv-in', 'rv--l', 'rv--r', 'rv--zoom'); el.style.removeProperty('--rd'); el.removeEventListener('transitionend', h);
        }
      });
    });
  });
}
