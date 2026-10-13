import { $, $$, reduce, HAS_IO } from '../../js/utils.js';
import { onScrollFrame } from '../../js/scroll.js';

// Mobile menu (burger + full-screen overlay).
export function initHeader() {
  var burger = $('.burger');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
  $$('#site-nav a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  $('.menu-backdrop').addEventListener('click', function () { setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  var mq = window.matchMedia('(min-width: 1101px)');
  var onMq = function (e) { if (e.matches) setMenu(false); };
  if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
}

// Floating bar shrinks after scrolling (hysteresis: shrink > 70px, expand < 20px).
export function initHeaderScroll() {
  const header = $('#header');
  onScrollFrame((y) => {
    header.classList.toggle('is-scrolled', header.classList.contains('is-scrolled') ? y > 20 : y > 70);
  });
}

// Highlight the nav link of the section currently in view.
export function initScrollspy() {
  if (!HAS_IO) return;
  const spyLinks = $$('#site-nav a[data-spy]');
  const spyMap = { top: '', demos: 'capabilities', capabilities: 'capabilities', industries: 'industries', calculator: 'calculator', 'how-it-works': 'how-it-works', pricing: 'pricing', book: '' };
  const spy = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return;
      const k = spyMap[e.target.id];
      spyLinks.forEach((a) => a.classList.toggle('is-active', !!k && a.getAttribute('data-spy') === k));
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  Object.keys(spyMap).forEach((id) => { const sec = document.getElementById(id); if (sec) spy.observe(sec); });
}
