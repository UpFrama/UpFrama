import { $, reduce } from '../../js/utils.js';
import { onScrollFrame, onLayout } from '../../js/scroll.js';

// Background: glow orbs that drift with page progress, plus the flowing light ribbons.
export function initAmbient() {
  initRibbons();
  if (reduce) return;
  const orb1 = $('.ambient .o1'), orb2 = $('.ambient .o2');
  onScrollFrame((y, max) => {
    const pg = max > 0 ? y / max : 0;
    if (orb1) orb1.style.translate = (Math.sin(pg * 6.2832) * 110).toFixed(1) + 'px ' + (-y * 0.12).toFixed(1) + 'px';
    if (orb2) orb2.style.translate = (Math.cos(pg * 6.2832) * -110).toFixed(1) + 'px ' + (y * 0.1).toFixed(1) + 'px';
  });
}

// Each shape is a cubic curve across the screen (points in screen fractions), where the
// strands pinch together (`pinch`, 0..1 along the curve) and how wide they fan out.
// Scrolling the page moves the bundle from one shape to the next.
const SHAPES = [
  { p: [[0.42, 1.16], [0.72, 0.86], [0.74, 0.34], [1.16, 0.02]], pinch: 0.42, spread: 0.36 }, // sweep up the right of the hero
  { p: [[0.66, -0.16], [0.98, 0.34], [0.54, 0.74], [0.94, 1.16]], pinch: 0.32, spread: 0.32 }, // curtain on the right
  { p: [[-0.16, 0.96], [0.3, 0.64], [0.7, 1.06], [1.16, 0.72]], pinch: 0.68, spread: 0.3 }, // low waves
  { p: [[1.16, 0.18], [0.62, -0.02], [0.36, 0.76], [-0.16, 0.5]], pinch: 0.36, spread: 0.34 }, // back across
  { p: [[0.06, -0.16], [-0.06, 0.4], [0.42, 0.62], [0.08, 1.16]], pinch: 0.6, spread: 0.3 }, // curtain on the left
];

// Strand colours: mostly brand orange, some amber and peach, a few cool highlights.
const TINTS = ['242,101,34', '255,138,61', '242,101,34', '255,176,112', '255,226,200', '242,101,34', '170,196,255', '255,138,61'];

function initRibbons() {
  const cv = $('.ribbons');
  if (!cv || !cv.getContext) return;
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = 1, N = 24, STEPS = 44, small = false, lastDraw = 0, cost = 0, frames = 0;
  let target = 0, prog = 0, heroFade = 1, running = false, raf = 0, t0 = performance.now();
  const dust = [];

  const resize = () => {
    small = window.innerWidth < 760;
    // Drawn at reduced resolution and scaled up by the browser: the strands are soft glows,
    // so this looks the same and costs a fraction of a full-resolution canvas.
    dpr = small ? 0.5 : 0.6;
    W = window.innerWidth; H = window.innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    N = small ? 12 : 20; STEPS = small ? 30 : 40;
    dust.length = 0;
    for (let i = 0; i < (small ? 16 : 32); i++) dust.push({ x: Math.random(), y: Math.random(), v: 0.004 + Math.random() * 0.01, a: Math.random() * 6.28, s: 0.6 + Math.random() * 1.2 });
    if (!running) draw(performance.now());
  };

  const lerp = (a, b, k) => a + (b - a) * k;
  const ease = (k) => k * k * (3 - 2 * k);

  function shapeAt(s) {
    const n = SHAPES.length;
    const f = ((s % n) + n) % n, i = Math.floor(f), k = ease(f - i);
    const A = SHAPES[i], B = SHAPES[(i + 1) % n];
    return {
      p: A.p.map((pt, j) => [lerp(pt[0], B.p[j][0], k), lerp(pt[1], B.p[j][1], k)]),
      pinch: lerp(A.pinch, B.pinch, k), spread: lerp(A.spread, B.spread, k),
    };
  }

  function draw(now) {
    const time = (now - t0) / 1000;
    prog += (target - prog) * 0.06;
    const sh = shapeAt(prog);
    const m = Math.min(W, H), P = sh.p.map((q) => [q[0] * W, q[1] * H]);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineCap = 'round';

    const bez = (t, a) => { const u = 1 - t; return u * u * u * P[0][a] + 3 * u * u * t * P[1][a] + 3 * u * t * t * P[2][a] + t * t * t * P[3][a]; };
    const der = (t, a) => { const u = 1 - t; return 3 * u * u * (P[1][a] - P[0][a]) + 6 * u * t * (P[2][a] - P[1][a]) + 3 * t * t * (P[3][a] - P[2][a]); };
    const drift = reduce ? 0 : time;

    for (let i = 0; i < N; i++) {
      const o = i / (N - 1) - 0.5;
      const path = new Path2D();
      for (let s = 0; s <= STEPS; s++) {
        const t = s / STEPS;
        const x = bez(t, 0), y = bez(t, 1), dx = der(t, 0), dy = der(t, 1), len = Math.hypot(dx, dy) || 1;
        const d = Math.abs(t - sh.pinch);
        const spread = sh.spread * m * (0.07 + 2.3 * Math.pow(d, 1.15));
        const wob = Math.sin(t * 7 + drift * 0.35 + i * 0.42) * (6 + 22 * d) + Math.sin(t * 2.3 - drift * 0.32 + i * 0.13) * 10;
        const off = o * spread + wob * (0.4 + Math.abs(o));
        const px = x - (dy / len) * off, py = y + (dx / len) * off;
        if (s === 0) path.moveTo(px, py); else path.lineTo(px, py);
      }
      const tint = TINTS[i % TINTS.length];
      const g = ctx.createLinearGradient(P[0][0], P[0][1], P[3][0], P[3][1]);
      const pk = Math.min(0.9, Math.max(0.1, sh.pinch));
      const core = 0.3 + 0.38 * (1 - Math.abs(o) * 2);
      g.addColorStop(0, 'rgba(' + tint + ',0)');
      g.addColorStop(Math.max(0.02, pk - 0.3), 'rgba(' + tint + ',' + (core * 0.6).toFixed(3) + ')');
      g.addColorStop(pk, 'rgba(255,226,200,' + Math.min(0.62, core * 1.25).toFixed(3) + ')');
      g.addColorStop(Math.min(0.98, pk + 0.3), 'rgba(' + tint + ',' + (core * 0.7).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(' + tint + ',0)');
      ctx.strokeStyle = g;
      if (i % 3 === 0) { ctx.globalAlpha = 0.1; ctx.lineWidth = small ? 7 : 10; ctx.stroke(path); } // soft glow
      ctx.globalAlpha = 1; ctx.lineWidth = i % 5 === 0 ? 2.2 : 1.5; ctx.stroke(path); // fine strand
    }

    // Soft glow where the strands gather.
    const gx = bez(sh.pinch, 0), gy = bez(sh.pinch, 1), gr = m * 0.45;
    const hg = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
    hg.addColorStop(0, 'rgba(242,101,34,0.16)'); hg.addColorStop(1, 'rgba(242,101,34,0)');
    ctx.fillStyle = hg; ctx.fillRect(gx - gr, gy - gr, gr * 2, gr * 2);

    // Floating dust.
    ctx.globalAlpha = 1;
    for (const p of dust) {
      if (!reduce) { p.y -= p.v * 0.016; p.x += Math.sin(time * 0.3 + p.a) * 0.0004; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); } }
      const a = 0.25 + 0.35 * Math.sin(time * 1.4 + p.a * 3);
      ctx.fillStyle = 'rgba(255,214,180,' + Math.max(0, a).toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.s, 0, 6.2832); ctx.fill();
    }
    // Dim the middle of the screen a little, where most text sits.
    ctx.globalCompositeOperation = 'destination-out';
    const cr = Math.max(W, H) * 0.5, dim = ctx.createRadialGradient(W / 2, H * 0.46, 0, W / 2, H * 0.46, cr);
    dim.addColorStop(0, 'rgba(0,0,0,0.55)'); dim.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = dim; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
  }

  // About 30 frames a second is plenty for a slow background drift.
  const loop = (now) => {
    raf = 0; if (!running) return;
    // Redraw ~30 times a second while the shape is changing (scrolling), and only ~12 times
    // a second while it is just drifting: slow drift looks the same and costs far less.
    const moving = Math.abs(target - prog) > 0.002;
    if (now - lastDraw > (moving ? 32 : 80)) {
      lastDraw = now;
      const a = performance.now(); draw(now); cost = cost * 0.9 + (performance.now() - a) * 0.1;
      // On slower machines, thin the bundle out rather than slow the page down.
      if (++frames % 30 === 0 && cost > 5 && N > 10) { N = Math.max(10, Math.round(N * 0.7)); STEPS = Math.max(26, Math.round(STEPS * 0.8)); cost = 0; }
    }
    raf = requestAnimationFrame(loop);
  };
  const start = () => { if (running || reduce) return; running = true; raf = requestAnimationFrame(loop); };
  const stop = () => { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; };

  onScrollFrame((y, max) => {
    // One full shape change per ~1.6 screens of scrolling.
    target = y / (window.innerHeight * 1.6);
    // Brightest at the top of the page, calmer behind the content further down.
    const f = Math.max(0.5, 1 - y / (window.innerHeight * 1.2));
    if (Math.abs(f - heroFade) > 0.04 || (f === 0.5 && heroFade !== 0.5)) { heroFade = f; cv.style.setProperty('--rib-o', (0.8 * f).toFixed(2)); }
    if (reduce) { prog = target; draw(performance.now()); }
  });
  onLayout(resize);
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); else start(); });
  resize();
  cv.classList.add('is-on');
  start();
}
