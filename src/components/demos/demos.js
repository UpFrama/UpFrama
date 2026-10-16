import { $, $$, mmss, reduce } from '../../js/utils.js';
import { DEMOS } from './demos.data.js';

// Sample-call player. One call is shown at a time; the keys on the left switch between them.
// Playback is a timed read-along (captions + progress), driven by requestAnimationFrame.
export function initDemos() {
  const SPEEDS = [1, 1.25, 1.5, 2];
  const ICON = {
    play: '<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.9l11-6.8a1 1 0 0 0 0-1.7l-11-6.8A1 1 0 0 0 8 5.2z"/></svg><svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4.2" height="14" rx="1.2"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.2"/></svg>',
    tick: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
  };

  const deck = $('#demoDeck'), rail = $('.dk-rail', deck), stage = $('#demoStage');
  if (!deck) return;
  let active = null, lastT = 0, rafId = 0, selected = 0;
  const items = [];

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

  DEMOS.forEach((d, di) => {
    // Timing: every word gets a start time; each line remembers when it starts.
    let t = 0; d.words = []; d.lineStart = [];
    d.lines.forEach((ln, li) => {
      d.lineStart[li] = t;
      ln[1].split(' ').forEach((w) => { d.words.push({ t, li }); t += 0.2 + 0.042 * w.length; });
      t += 0.6;
    });
    d.total = t; d.t = 0; d.rate = 1; d.on = 0; d.cw = -1; d.curLine = -1; d.playing = false;

    // ----- key (left rail) -----
    const key = document.createElement('button');
    key.type = 'button'; key.className = 'dk-key'; key.id = 'dk-key-' + di;
    key.setAttribute('role', 'tab'); key.setAttribute('aria-controls', 'dk-panel-' + di);
    key.innerHTML =
      '<span class="dk-key-top">' + esc(d.tag) + '</span>' +
      '<b>' + esc(d.short) + '</b>' +
      '<small>' + esc(d.when) + ' · ' + mmss(d.total) + '</small>';
    rail.appendChild(key);

    // ----- panel -----
    const panel = document.createElement('div');
    panel.className = 'dk-unit'; panel.id = 'dk-panel-' + di;
    panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', 'dk-key-' + di);
    panel.hidden = true;
    panel.innerHTML =
      '<div class="dk-main">' +
        '<div class="dk-head"><span class="dk-biz">' + esc(d.biz) + '</span><span class="dk-when">' + esc(d.when) + '</span></div>' +
        '<div class="dk-transcript" tabindex="0" aria-label="Call transcript"></div>' +
        '<div class="dk-console">' +
          '<button class="dk-play" type="button" aria-label="Play call">' + ICON.play + '</button>' +
          '<div class="dk-track" role="slider" tabindex="0" aria-label="Jump to a moment in the call" aria-valuemin="0" aria-valuemax="' + Math.round(d.total) + '" aria-valuenow="0"><span class="dk-fill"></span></div>' +
          '<span class="dk-time">0:00 / ' + mmss(d.total) + '</span>' +
          '<div class="dk-speeds" role="group" aria-label="Playback speed">' +
            SPEEDS.map((s) => '<button type="button" data-r="' + s + '" aria-pressed="' + (s === 1) + '">' + s + '×</button>').join('') +
          '</div>' +
        '</div>' +
      '</div>' +
      '<aside class="dk-report" aria-label="Call report">' +
        '<div><span class="dk-r-eyebrow">The caller’s problem</span><p>' + esc(d.problem) + '</p></div>' +
        '<div><span class="dk-r-eyebrow">What the AI did</span><ul class="dk-steps">' +
          d.steps.map((s) => '<li><span class="dk-tick">' + ICON.tick + '</span><span>' + esc(s.text) + '</span></li>').join('') +
        '</ul></div>' +
        '<div class="dk-result"><span class="dk-r-eyebrow">How it ended</span><p>' + esc(d.result) + '</p></div>' +
      '</aside>';
    stage.appendChild(panel);

    // Transcript bubbles with one span per word.
    const tr = $('.dk-transcript', panel); let wi = 0; d.lineEls = [];
    d.lines.forEach((ln) => {
      const row = document.createElement('div');
      row.className = 'dk-line ' + ln[0];
      let html = '<span class="dk-who">' + (ln[0] === 'a' ? 'Upframa agent' : 'Caller') + '</span><p class="dk-words">';
      ln[1].split(' ').forEach((w) => { html += '<span class="dk-w" data-i="' + (wi++) + '">' + esc(w) + '</span> '; });
      row.innerHTML = html + '</p>';
      tr.appendChild(row); d.lineEls.push(row);
    });

    Object.assign(d, {
      key, panel, tr, spans: $$('.dk-w', tr), track: $('.dk-track', panel), fill: $('.dk-fill', panel),
      timeEl: $('.dk-time', panel), playBtn: $('.dk-play', panel), stepEls: $$('.dk-steps li', panel),
    });

    d.playBtn.addEventListener('click', () => toggle(d));
    $$('.dk-speeds button', panel).forEach((btn) => {
      btn.addEventListener('click', () => {
        d.rate = parseFloat(btn.getAttribute('data-r'));
        $$('.dk-speeds button', panel).forEach((o) => o.setAttribute('aria-pressed', o === btn ? 'true' : 'false'));
      });
    });

    const seekTo = (clientX) => {
      const r = d.track.getBoundingClientRect(), pad = 0;
      d.t = Math.min(1, Math.max(0, (clientX - r.left - pad) / Math.max(1, r.width - pad * 2))) * d.total;
      render(d, true);
    };
    d.track.addEventListener('pointerdown', (e) => {
      d.track.setPointerCapture(e.pointerId); seekTo(e.clientX);
      const move = (ev) => seekTo(ev.clientX);
      const up = () => { d.track.removeEventListener('pointermove', move); d.track.removeEventListener('pointerup', up); d.track.removeEventListener('pointercancel', up); };
      d.track.addEventListener('pointermove', move); d.track.addEventListener('pointerup', up); d.track.addEventListener('pointercancel', up);
    });
    d.track.addEventListener('keydown', (e) => {
      const k = e.key;
      if (k === 'ArrowRight') d.t = Math.min(d.total, d.t + 5);
      else if (k === 'ArrowLeft') d.t = Math.max(0, d.t - 5);
      else if (k === 'Home') d.t = 0;
      else if (k === 'End') d.t = d.total;
      else return;
      e.preventDefault(); render(d, true);
    });

    key.addEventListener('click', () => select(di));
    key.addEventListener('keydown', (e) => {
      const n = DEMOS.length; let to = -1;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') to = (di + 1) % n;
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') to = (di + n - 1) % n;
      else if (e.key === 'Home') to = 0;
      else if (e.key === 'End') to = n - 1;
      if (to < 0) return;
      e.preventDefault(); select(to); DEMOS[to].key.focus();
    });

    render(d, true);
  });

  function select(i) {
    if (active) pause(active);
    selected = i;
    DEMOS.forEach((d, k) => {
      const on = k === i;
      d.panel.hidden = !on;
      d.key.setAttribute('aria-selected', on ? 'true' : 'false');
      d.key.tabIndex = on ? 0 : -1;
    });
    render(DEMOS[i], true);
  }

  function render(d, force) {
    const p = d.total ? d.t / d.total : 0;
    d.fill.style.width = (p * 100).toFixed(2) + '%';
    d.timeEl.textContent = mmss(d.t) + ' / ' + mmss(d.total);
    d.track.setAttribute('aria-valuenow', Math.round(d.t));
    d.track.setAttribute('aria-valuetext', mmss(d.t) + ' of ' + mmss(d.total));
    d.stepEls.forEach((li, k) => li.classList.toggle('on', d.t >= d.lineStart[d.steps[k].at]));

    let cw = -1;
    if (d.t > 0) { for (let i = 0; i < d.words.length; i++) { if (d.words[i].t <= d.t) cw = i; else break; } }
    if (cw !== d.cw || force) {
      for (let i = 0; i < d.spans.length; i++) d.spans[i].className = 'dk-w' + (i < cw ? ' done' : i === cw ? ' cur' : '');
      d.cw = cw;
      const line = cw >= 0 ? d.words[cw].li : -1;
      if (line !== d.curLine || force) {
        d.lineEls.forEach((el, k) => el.classList.toggle('is-cur', k === line));
        d.curLine = line;
        if (line >= 0 && !d.panel.hidden) {
          const row = d.lineEls[line];
          const top = Math.max(0, row.offsetTop - d.tr.clientHeight / 2 + row.offsetHeight / 2);
          if (d.playing && !reduce && !force) d.tr.scrollTo({ top, behavior: 'smooth' }); else d.tr.scrollTop = top;
        } else if (line < 0 && !d.panel.hidden) d.tr.scrollTop = 0;
      }
    }
  }

  function loop(now) {
    if (!active) return;
    const dt = Math.min(0.1, (now - lastT) / 1000); lastT = now;
    active.t += dt * active.rate;
    if (active.t >= active.total) { active.t = active.total; pause(active); return; }
    render(active, false);
    rafId = requestAnimationFrame(loop);
  }
  function play(d) {
    if (active && active !== d) pause(active);
    if (d.t >= d.total - 0.05) d.t = 0;
    active = d; d.playing = true;
    d.panel.classList.add('is-playing');
    d.playBtn.setAttribute('aria-label', 'Pause call');
    lastT = performance.now(); cancelAnimationFrame(rafId); rafId = requestAnimationFrame(loop);
    render(d, true);
  }
  function pause(d) {
    d.playing = false; d.panel.classList.remove('is-playing');
    d.playBtn.setAttribute('aria-label', 'Play call');
    if (active === d) { active = null; cancelAnimationFrame(rafId); }
    render(d, false);
  }
  function toggle(d) { if (d.playing) pause(d); else play(d); }

  // Stop playback when the tab is hidden.
  document.addEventListener('visibilitychange', () => { if (document.hidden && active) pause(active); });

  select(0);
}
