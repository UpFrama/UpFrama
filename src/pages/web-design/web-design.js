import { $, $$, reduce } from '../../js/utils.js';
import { onScrollFrame, onLayout } from '../../js/scroll.js';
import { registerScrub } from '../../js/scrub.js';

// Website design page behaviour:
//  - the hero "work strip" drifts sideways (faster while you scroll, stops under the pointer)
//  - strip tiles and project images tilt slightly toward the pointer
//  - project images drift a little against the scroll
export function initWebDesign() {
  initWorkStrip();
  initProjects();
}

function tilt(host, shot, amount) {
  host.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    const r = host.getBoundingClientRect();
    shot.style.setProperty('--ry', ((e.clientX - r.left) / r.width - 0.5) * amount + 'deg');
    shot.style.setProperty('--rx', -((e.clientY - r.top) / r.height - 0.5) * amount + 'deg');
  });
  host.addEventListener('pointerleave', () => { shot.style.removeProperty('--rx'); shot.style.removeProperty('--ry'); });
}

function initProjects() {
  $$('.wd-proj-media').forEach((media) => {
    const shot = $('.wd-proj-shot', media);
    if (shot) tilt(media, shot, 7);
    if (!reduce) registerScrub($('.wd-proj-par', media), 'par', 0.05);
  });
}

function initWorkStrip() {
  const work = $('.wd-work');
  if (!work) return;
  const vp = $('.wd-viewport', work), track = $('.wd-track', work);
  const originals = $$('.wd-tile', track);
  originals.forEach((t, i) => t.style.setProperty('--i', i));

  // Duplicate the set once so the strip can wrap around without a jump.
  if (!reduce) {
    originals.forEach((t) => {
      const c = t.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      $$('img', c).forEach((im) => { im.alt = ''; });
      track.appendChild(c);
    });
  } else vp.classList.add('is-static');

  $$('.wd-tile', track).forEach((tile) => tilt(tile, $('.wd-shot', tile), 9));
  if (reduce) return;

  // Entrance: tiles rise in one by one the first time the strip is on screen.
  work.classList.add('wd-work--js');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { work.classList.add('is-in'); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(work);
  } else work.classList.add('is-in');

  // Drift.
  const SPEED = 26; // px per second
  let setW = 0, x = 0, last = 0, slow = 1, hover = false, vis = false, raf = 0, sy = 0;

  const paint = () => {
    if (!setW) return;
    track.style.transform = 'translate3d(' + (-((x + sy * 0.3) % setW)).toFixed(2) + 'px,0,0)';
  };
  const measure = () => {
    const first = originals[0], clone = $$('.wd-tile', track)[originals.length];
    setW = first && clone ? clone.offsetLeft - first.offsetLeft : 0;
    paint();
  };
  const frame = (now) => {
    raf = 0;
    if (!vis) return;
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    slow += ((hover ? 0 : 1) - slow) * Math.min(1, dt * 5);
    x += dt * SPEED * slow;
    paint();
    raf = requestAnimationFrame(frame);
  };

  new IntersectionObserver((es) => {
    vis = es[0].isIntersecting;
    if (vis && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
  }).observe(vp);

  vp.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') hover = true; });
  vp.addEventListener('pointerleave', () => { hover = false; });
  onScrollFrame((y) => { sy = y; });
  onLayout(measure);
  $$('img', track).forEach((im) => { if (!im.complete) im.addEventListener('load', measure, { once: true }); });
  measure();
}
