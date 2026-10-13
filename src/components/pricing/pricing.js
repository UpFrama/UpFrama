import { $, $$, reduce, drawOnReveal } from '../../js/utils.js';
import { registerScrub } from '../../js/scrub.js';

// Pay-as-you-go: ticking call meter, bars that grow in, subtle parallax.
export function initPricing() {
  drawOnReveal('.payg');
  drawOnReveal('.included');
  $$('.payg-viz').forEach((e) => registerScrub(e, 'par', -0.04));
  registerScrub($('.included'), 'scale');

  const clk = $('#paygClock');
  if (!clk || reduce) return;
  let t = 134, on = true;
  const fmt = (n) => (n < 600 ? '0' : '') + Math.floor(n / 60) + ':' + (n % 60 < 10 ? '0' : '') + (n % 60);
  setInterval(() => { if (!on || document.hidden) return; t = (t + 1) % 599; clk.textContent = fmt(t); }, 1000);
  if ('IntersectionObserver' in window) new IntersectionObserver((es) => { on = es[0].isIntersecting; }, { threshold: 0 }).observe(clk);
}
