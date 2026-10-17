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

// Watches real frame times while the page scrolls. If this device is clearly struggling
// (averaging under ~30 frames a second), switch the glass panels to their no-blur version.
export function initGlassGuard() {
  let frames = [], last = 0, done = false, scrolling = 0;
  const tick = (now) => {
    if (done) return;
    if (last) frames.push(now - last);
    last = now;
    if (frames.length >= 45) {
      const avg = frames.reduce((a, b) => a + b, 0) / frames.length;
      if (avg > 34) { document.documentElement.classList.add('glass-lite'); done = true; return; }
      frames = [];
    }
    if (Date.now() - scrolling < 150) requestAnimationFrame(tick); else last = 0;
  };
  window.addEventListener('scroll', () => {
    if (done) return;
    const idle = Date.now() - scrolling >= 150;
    scrolling = Date.now();
    if (idle) requestAnimationFrame(tick);
  }, { passive: true });
  setTimeout(() => { done = true; }, 60000); // only judge during the first minute
}
