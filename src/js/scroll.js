// One shared, rAF-throttled scroll loop. Components register frame callbacks
// (`onScrollFrame`) and layout callbacks (`onLayout`: resize + web-fonts ready).
const frameFns = [];
const layoutFns = [];
let ticking = false;

export function onScrollFrame(fn) { frameFns.push(fn); }
export function onLayout(fn) { layoutFns.push(fn); }

export function requestScrollFrame() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.pageYOffset || document.documentElement.scrollTop || 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    frameFns.forEach((fn) => fn(y, max));
    ticking = false;
  });
}

export function initScroll() {
  const relayout = () => { layoutFns.forEach((fn) => fn()); requestScrollFrame(); };
  window.addEventListener('scroll', requestScrollFrame, { passive: true });
  window.addEventListener('resize', relayout);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  requestScrollFrame();
}
