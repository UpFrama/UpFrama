import { $$ } from './utils.js';

// Glass cards: a soft highlight follows the pointer (CSS reads --mx / --my).
export function initSpotlight() {
  $$('.glass').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}
