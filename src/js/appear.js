import { $$ } from './utils.js';

// Entrance animations: mark `.appear` elements as done once their CSS animation ends.
export function initAppear() {
  $$('.appear').forEach(function (el) {
    el.addEventListener('animationend', function (e) {
      if (e.target === el && /^in-/.test(e.animationName)) el.classList.add('is-in');
    });
  });
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      $$('.appear').forEach(function (el) {
        var running = el.getAnimations ? el.getAnimations().some(function (a) { return a.playState === 'running' || a.playState === 'finished'; }) : false;
        if (!running) el.classList.add('is-in');
      });
    });
  });
}
