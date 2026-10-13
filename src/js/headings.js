import { $$, reduce, HAS_IO } from './utils.js';
import { onScrollFrame } from './scroll.js';

// Section headings: every word rises out of a mask when the heading scrolls into view.
export function initHeadings() {
  onScrollFrame((y, max) => {
    if (max - y < 8) $$('h2[aria-label]:not(.w-in)').forEach((e) => e.classList.add('w-in'));
  });
  if (reduce || !HAS_IO) return;

  const vh = window.innerHeight;
  const wio = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('w-in'); wio.unobserve(e.target); } });
  }, { threshold: 0.35 });

  $$('.section h2').forEach((h) => {
    if (h.getBoundingClientRect().top < vh * 0.85) return;
    const label = h.textContent.replace(/\s+/g, ' ').trim();
    let n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach((c) => {
        if (c.nodeType === 3) {
          const frag = document.createDocumentFragment();
          c.nodeValue.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'), wi = document.createElement('span');
            w.className = 'sw'; w.setAttribute('aria-hidden', 'true');
            wi.className = 'swi'; wi.style.setProperty('--wd', (n++ * 0.07).toFixed(2) + 's'); wi.textContent = part;
            w.appendChild(wi); frag.appendChild(w);
          });
          node.replaceChild(frag, c);
        } else if (c.nodeType === 1) walk(c);
      });
    })(h);
    h.setAttribute('aria-label', label);
    wio.observe(h);
  });
}
