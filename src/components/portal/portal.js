import { $$, reduce, clamp01 } from '../../js/utils.js';
import { onScrollFrame } from '../../js/scroll.js';

// Scroll-driven brand tile (see portal.css). Progress 0..1 through the section (smoothed):
//   0.00-0.40  tile rises from below and opens up to fill the screen
//   0.40-0.68  statement reveals word by word
//   0.68-1.00  card folds back into a small tile and rises away
export function initPortal() {
  $$('.portal').forEach((sec) => {
    const card = sec.querySelector('.portal-card'), h2 = sec.querySelector('h2');
    if (!card) return;
    // Split the statement into words (keeping <em> words styled).
    const words = [];
    if (h2) {
      h2.setAttribute('aria-label', h2.textContent.replace(/\s+/g, ' ').trim());
      const wrap = (node) => {
        Array.from(node.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              const s = document.createElement('span'); s.className = 'pw'; s.textContent = part; s.setAttribute('aria-hidden', 'true');
              frag.appendChild(s); words.push(s);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1) wrap(n);
        });
      };
      wrap(h2);
    }
    if (reduce) { words.forEach((w) => w.classList.add('on')); return; }

    // Gentle ease in and out, so the card starts and settles softly.
    const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
    const lerp = (a, b, k) => a + (b - a) * k;
    let target = 0, cur = 0, lastShown = -1, raf = 0, lastT = 0, near = false;

    function apply(p) {
      const vh = window.innerHeight, vw = window.innerWidth;
      const small = vw <= 640 ? 96 : 120, fullW = vw - (vw <= 640 ? 24 : 48), fullH = vh - (vw <= 640 ? 120 : 140);
      let w, h, rad, ty, tx;
      if (p < 0.4) {
        const k = ease(clamp01(p / 0.4));
        w = lerp(small, fullW, k); h = lerp(small, fullH, k); rad = lerp(34, 28, k);
        ty = lerp(vh * 0.4, 24, k); tx = clamp01((p - 0.26) / 0.14);
      } else if (p < 0.68) {
        w = fullW; h = fullH; rad = 28; ty = 24; tx = 1;
      } else {
        const k = ease(clamp01((p - 0.68) / 0.32));
        w = lerp(fullW, small * 0.8, k); h = lerp(fullH, small * 0.8, k); rad = lerp(28, 26, k);
        ty = lerp(24, -vh * 0.34, k); tx = 1 - clamp01((p - 0.68) / 0.12);
      }
      // Clip the full-size card down to w x h.
      card.style.setProperty('--ci', Math.max(0, (fullH - h) / 2).toFixed(1) + 'px');
      card.style.setProperty('--cx', Math.max(0, (fullW - w) / 2).toFixed(1) + 'px');
      card.style.setProperty('--r', rad.toFixed(1) + 'px');
      card.style.setProperty('--ty', ty.toFixed(1) + 'px');
      card.style.setProperty('--tx', tx.toFixed(3));
      const shown = Math.ceil(clamp01((p - 0.36) / 0.26) * words.length);
      if (shown !== lastShown) { lastShown = shown; words.forEach((wd, i) => wd.classList.toggle('on', i < shown)); }
    }

    // The card follows the scroll position with a soft lag instead of jumping with every wheel step.
    function tick(now) {
      const dt = Math.min(64, now - (lastT || now)); lastT = now;
      cur += (target - cur) * (1 - Math.pow(1 - 0.07, dt / 16.7));
      if (Math.abs(target - cur) < 0.0004) cur = target;
      apply(cur);
      raf = cur !== target ? requestAnimationFrame(tick) : 0;
      if (!raf) lastT = 0;
    }

    onScrollFrame(() => {
      const r = sec.getBoundingClientRect(), vh = window.innerHeight;
      const isNear = !(r.bottom < -vh || r.top > vh * 2);
      if (!isNear) { near = false; return; }
      target = clamp01(-r.top / Math.max(1, r.height - vh));
      if (!near) { near = true; cur = target; apply(cur); return; } // jump straight in when arriving from far away
      if (!raf) raf = requestAnimationFrame(tick);
    });
  });
}
