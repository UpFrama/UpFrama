import { $, $$, reduce, HAS_IO, clamp01, whenVisible } from '../../js/utils.js';
import { onScrollFrame } from '../../js/scroll.js';

// "How it works": connector lines draw in, then fill orange with scroll progress.
export function initSteps() {
  const stepsEl = $('.steps');
  if (!stepsEl) return;
  const stepEls = $$('.step', stepsEl);

  if (HAS_IO && !reduce && stepsEl.getBoundingClientRect().top > window.innerHeight) {
    stepsEl.classList.add('js-pre');
    whenVisible(stepsEl, () => stepsEl.classList.add('drawn'));
  }

  if (reduce) return;
  const mqNarrow = window.matchMedia ? window.matchMedia('(max-width: 900px)') : { matches: false };
  function update() {
    const vh = window.innerHeight, r = stepsEl.getBoundingClientRect();
    const p = mqNarrow.matches ? clamp01((vh * 0.72 - r.top) / Math.max(1, r.height * 0.9)) : clamp01((vh * 0.8 - r.top) / (vh * 0.32));
    const q = p * (stepEls.length - 1);
    stepEls.forEach((s, k) => {
      s.style.setProperty('--f', clamp01(q - k).toFixed(3));
      s.classList.toggle('on', p > 0 && q >= k - 0.001);
    });
  }
  onScrollFrame(update);
  update();
}
