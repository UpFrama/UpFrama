import { $, $$, reduce, mmss } from '../../js/utils.js';
import { SC } from './simulator.data.js';

export function initSimulator() {
  var tabsEl = $('.sim-tabs'), feed = $('#feed'), simEl = $('#sim');
  var cv = $('#wave'), ctx = cv.getContext('2d'), W = 0, H = 0;
  var token = 0, cur = 0, speaking = null, waveOn = false, runStart = 0, clockTimer = 0, running = false;

  SC.forEach(function (s, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'sim-tab'; b.setAttribute('role', 'tab');
    b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    b.innerHTML = '<strong>' + s.name + '</strong><span>' + s.sub + '</span>';
    b.addEventListener('click', function () { select(i); });
    tabsEl.appendChild(b);
  });

  function wordMs(w) { return (200 + 42 * w.length) * 0.9; }
  function estSeconds(sc) {
    var ms = 0;
    sc.lines.forEach(function (l) { l.t.split(' ').forEach(function (w) { ms += wordMs(w); }); ms += 420; });
    return Math.round(ms / 1000);
  }
  function sleep(ms, tk) { return new Promise(function (res, rej) { setTimeout(function () { tk === token ? res() : rej(new Error('cancel')); }, ms); }); }

  function sizeWave() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2), r = cv.getBoundingClientRect();
    W = r.width; H = r.height; if (!W) return;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawWave(performance.now());
  }
  function drawWave(t) {
    if (!W) return;
    ctx.clearRect(0, 0, W, H);
    var bw = 3, gap = 4, n = Math.floor((W + gap) / (bw + gap)), x0 = (W - (n * (bw + gap) - gap)) / 2;
    for (var i = 0; i < n; i++) {
      var env = Math.pow(Math.sin(Math.PI * (i + 0.5) / n), 0.85), a;
      if (speaking) a = (0.2 + 0.8 * Math.abs(Math.sin(t * 0.007 + i * 0.55) * Math.sin(t * 0.0041 + i * 0.23))) * env;
      else if (running) a = 0.06 + 0.05 * env * Math.abs(Math.sin(t * 0.003 + i));
      else a = 0.08 + 0.2 * env * Math.abs(Math.sin(i * 0.8) * Math.cos(i * 0.31));
      var h = Math.max(3, a * H * 0.92);
      ctx.fillStyle = speaking === 'a' ? '#F26522' : speaking === 'c' ? '#d8d8d8' : '#4a4a4a';
      ctx.fillRect(x0 + i * (bw + gap), (H - h) / 2, bw, h);
    }
  }
  // Only redraw the waveform while it is on screen.
  var waveSeen = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { waveSeen = es[0].isIntersecting; }).observe(cv);
  function waveLoop(t) { if (waveSeen) drawWave(t); if (waveOn) requestAnimationFrame(waveLoop); }
  function startWave() { if (!waveOn && !reduce) { waveOn = true; requestAnimationFrame(waveLoop); } }
  function stopWave() { waveOn = false; setTimeout(function () { drawWave(performance.now()); }, 30); }

  function setChip(id, val, on) { var el = $(id); el.textContent = val; el.className = on ? 'on' : ''; }
  function resetChips() { ['#chipLat', '#chipIntent', '#chipUrg', '#chipOut'].forEach(function (id) { setChip(id, '—', false); }); }
  function addLine(l) {
    var li = document.createElement('li');
    li.className = 'ln ln--' + l.w;
    li.innerHTML = '<span class="who">' + (l.w === 'a' ? 'Upframa Agent' : 'Caller') + '</span><p class="txt"></p>';
    feed.appendChild(li);
    return li.querySelector('.txt');
  }
  function setLive(on) {
    running = on; simEl.classList.toggle('is-live', on);
    $('#simStatus').textContent = on ? 'Call in progress' : 'Call complete';
    $('#simPlay').textContent = on ? 'Skip to end' : 'Replay call';
  }

  async function run(i, instant) {
    var tk = ++token, sc = SC[i]; cur = i;
    clearInterval(clockTimer);
    feed.innerHTML = ''; resetChips(); speaking = null;
    $('#simBiz').textContent = sc.biz;
    if (instant || reduce) {
      setLive(false); stopWave();
      sc.lines.forEach(function (l) { addLine(l).textContent = l.t; if (l.w === 'a') setChip('#chipLat', l.lat + ' ms', true); });
      setChip('#chipIntent', sc.intent, true); setChip('#chipUrg', sc.urgency, true); setChip('#chipOut', sc.outcome, true);
      $('#simClock').textContent = mmss(estSeconds(sc));
      feed.scrollTop = feed.scrollHeight;
      return;
    }
    setLive(true); startWave();
    runStart = performance.now();
    $('#simClock').textContent = '0:00';
    clockTimer = setInterval(function () { $('#simClock').textContent = mmss((performance.now() - runStart) / 1000); }, 500);
    try {
      for (var li = 0; li < sc.lines.length; li++) {
        var L = sc.lines[li], p = addLine(L), words = L.t.split(' ');
        if (L.w === 'a') setChip('#chipLat', L.lat + ' ms', true);
        speaking = L.w;
        for (var k = 0; k < words.length; k++) {
          p.textContent = words.slice(0, k + 1).join(' ');
          feed.scrollTop = feed.scrollHeight;
          await sleep(wordMs(words[k]), tk);
        }
        speaking = null;
        if (li === sc.at) { setChip('#chipIntent', sc.intent, true); setChip('#chipUrg', sc.urgency, true); }
        await sleep(420, tk);
      }
      setChip('#chipOut', sc.outcome, true);
      clearInterval(clockTimer);
      $('#simClock').textContent = mmss((performance.now() - runStart) / 1000);
      setLive(false); stopWave();
    } catch (e) { /* cancelled by another run */ }
  }
  function select(i) {
    $$('.sim-tab').forEach(function (b, k) { b.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    run(i, false);
  }
  $('#simPlay').addEventListener('click', function () { run(cur, running); });
  window.addEventListener('resize', sizeWave);
  sizeWave();
  run(0, true);
}
