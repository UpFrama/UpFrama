import { $, $$, mmss } from '../../js/utils.js';
import { registerScrub } from '../../js/scrub.js';
import { DEMOS } from './demos.data.js';

export function initDemos() {
  var SPEEDS = [1, 1.25, 1.5, 2];
  var PLAY = '<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.9l11-6.8a1 1 0 0 0 0-1.7l-11-6.8A1 1 0 0 0 8 5.2z"/></svg><svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4.2" height="14" rx="1.2"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.2"/></svg>';
  var NBARS = 56;
  var grid = $('#demoGrid'), active = null, lastT = 0, rafId = 0;

  function seeded(n) { var s = n * 9301 + 49297; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  DEMOS.forEach(function (d, di) {
    var t = 0; d.words = [];
    d.lines.forEach(function (ln, li) {
      ln[1].split(' ').forEach(function (w) { var dur = (0.2 + 0.042 * w.length); d.words.push({ t: t, li: li }); t += dur; });
      t += 0.6;
    });
    d.total = t; d.t = 0; d.rate = 1; d.cw = -1; d.on = 0;

    var card = document.createElement('article');
    card.className = 'demo glass';
    var rnd = seeded(di + 3), bars = '';
    for (var b = 0; b < NBARS; b++) {
      var env = Math.pow(Math.sin(Math.PI * (b + 0.5) / NBARS), 0.6);
      bars += '<i style="height:' + Math.round(14 + 86 * env * (0.3 + 0.7 * rnd())) + '%"></i>';
    }
    card.innerHTML =
      '<div class="demo-top"><span class="tag">' + d.tag + '</span><span class="when">' + d.when + '</span></div>' +
      '<div><h3>' + d.title.replace(/&/g, '&amp;') + '</h3><p class="desc" style="margin-top:8px">' + d.desc + '</p></div>' +
      '<div class="player">' +
        '<button class="play" type="button" aria-label="Play ' + d.title.replace(/&/g, '&amp;') + '">' + PLAY + '</button>' +
        '<div class="track" role="slider" tabindex="0" aria-label="Seek" aria-valuemin="0" aria-valuemax="' + Math.round(d.total) + '" aria-valuenow="0">' + bars + '</div>' +
        '<span class="time">0:00 / ' + mmss(d.total) + '</span>' +
      '</div>' +
      '<div class="controls">' +
        '<div class="speeds" role="group" aria-label="Playback speed">' + SPEEDS.map(function (s) { return '<button type="button" data-r="' + s + '" aria-pressed="' + (s === 1) + '">' + s + '×</button>'; }).join('') + '</div>' +
        '<button class="tx-toggle" type="button" aria-expanded="false">Show transcript</button>' +
      '</div>' +
      '<div class="transcript" hidden></div>';
    grid.appendChild(card);

    var tr = $('.transcript', card), wi = 0; d.spans = []; d.lineEls = [];
    d.lines.forEach(function (ln) {
      var row = document.createElement('div');
      row.className = 'tline ' + ln[0];
      var html = '<span class="who">' + (ln[0] === 'a' ? 'Upframa Agent' : 'Caller') + '</span><p class="words">';
      ln[1].split(' ').forEach(function (w) { html += '<span class="w" data-i="' + (wi++) + '">' + w + '</span> '; });
      row.innerHTML = html + '</p>';
      tr.appendChild(row); d.lineEls.push(row);
    });
    d.spans = $$('.w', tr);
    d.card = card; d.tr = tr; d.track = $('.track', card); d.barEls = $$('.track i', card);
    d.timeEl = $('.time', card); d.playBtn = $('.play', card);

    d.playBtn.addEventListener('click', function () { toggle(d); });
    $$('.speeds button', card).forEach(function (btn) {
      btn.addEventListener('click', function () {
        d.rate = parseFloat(btn.getAttribute('data-r'));
        $$('.speeds button', card).forEach(function (o) { o.setAttribute('aria-pressed', o === btn ? 'true' : 'false'); });
      });
    });
    var tx = $('.tx-toggle', card);
    tx.addEventListener('click', function () {
      var open = tr.hidden;
      tr.hidden = !open; tx.setAttribute('aria-expanded', open ? 'true' : 'false');
      tx.textContent = open ? 'Hide transcript' : 'Show transcript';
      if (open) render(d, true);
    });

    function seekTo(clientX) {
      var r = d.track.getBoundingClientRect();
      d.t = Math.min(1, Math.max(0, (clientX - r.left) / r.width)) * d.total;
      render(d, true);
    }
    d.track.addEventListener('pointerdown', function (e) {
      d.track.setPointerCapture(e.pointerId); seekTo(e.clientX);
      var move = function (ev) { seekTo(ev.clientX); };
      var up = function () { d.track.removeEventListener('pointermove', move); d.track.removeEventListener('pointerup', up); d.track.removeEventListener('pointercancel', up); };
      d.track.addEventListener('pointermove', move); d.track.addEventListener('pointerup', up); d.track.addEventListener('pointercancel', up);
    });
    d.track.addEventListener('keydown', function (e) {
      var k = e.key;
      if (k === 'ArrowRight') d.t = Math.min(d.total, d.t + 5);
      else if (k === 'ArrowLeft') d.t = Math.max(0, d.t - 5);
      else if (k === 'Home') d.t = 0;
      else if (k === 'End') d.t = d.total;
      else return;
      e.preventDefault(); render(d, true);
    });
    render(d, true);
  });

  function render(d, force) {
    var p = d.total ? d.t / d.total : 0, on = Math.round(p * NBARS), i;
    if (on !== d.on || force) {
      for (i = 0; i < NBARS; i++) d.barEls[i].classList.toggle('on', i < on);
      d.on = on;
    }
    d.timeEl.textContent = mmss(d.t) + ' / ' + mmss(d.total);
    d.track.setAttribute('aria-valuenow', Math.round(d.t));
    d.track.setAttribute('aria-valuetext', mmss(d.t) + ' of ' + mmss(d.total));
    var cw = -1;
    if (d.t > 0) { for (i = 0; i < d.words.length; i++) { if (d.words[i].t <= d.t) cw = i; else break; } }
    if (cw !== d.cw || force) {
      for (i = 0; i < d.spans.length; i++) d.spans[i].className = 'w' + (i < cw ? ' done' : i === cw ? ' cur' : '');
      d.cw = cw;
      if (!d.tr.hidden && cw >= 0 && d.playing) {
        var row = d.lineEls[d.words[cw].li];
        d.tr.scrollTop = Math.max(0, row.offsetTop - d.tr.clientHeight / 2 + row.offsetHeight / 2);
      }
    }
  }
  function loop(now) {
    if (!active) return;
    var dt = Math.min(0.1, (now - lastT) / 1000); lastT = now;
    active.t += dt * active.rate;
    if (active.t >= active.total) { active.t = active.total; render(active, false); pause(active); return; }
    render(active, false);
    rafId = requestAnimationFrame(loop);
  }
  function play(d) {
    if (active && active !== d) pause(active);
    if (d.t >= d.total) d.t = 0;
    active = d; d.playing = true;
    d.card.classList.add('is-playing');
    d.playBtn.setAttribute('aria-label', 'Pause ' + d.title);
    lastT = performance.now(); cancelAnimationFrame(rafId); rafId = requestAnimationFrame(loop);
  }
  function pause(d) {
    d.playing = false; d.card.classList.remove('is-playing');
    d.playBtn.setAttribute('aria-label', 'Play ' + d.title);
    if (active === d) { active = null; cancelAnimationFrame(rafId); }
  }
  function toggle(d) { if (d.playing) pause(d); else play(d); }

  // Parallax drift on every second card.
  $$('.demo:nth-child(even)').forEach((e) => registerScrub(e, 'par', 0.05));
}
