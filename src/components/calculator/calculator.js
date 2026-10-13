import { $, reduce } from '../../js/utils.js';
import { registerScrub } from '../../js/scrub.js';

export function initCalculator() {
  var el = { calls: $('#calls'), value: $('#value'), miss: $('#miss'), rate: $('#rate'), cost: $('#cost') };
  var money = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
  var shown = { rev: 0, jobs: 0, roi: 0 }, raf = {};
  function fill(inp) { inp.style.setProperty('--p', ((inp.value - inp.min) / (inp.max - inp.min) * 100) + '%'); }
  function tween(key, target, render, instant) {
    cancelAnimationFrame(raf[key]);
    var from = shown[key], t0 = performance.now(), dur = (instant || reduce) ? 0 : 380;
    (function step(now) {
      var k = dur ? Math.min(1, (now - t0) / dur) : 1, e = 1 - Math.pow(1 - k, 3);
      shown[key] = from + (target - from) * e; render(shown[key]);
      if (k < 1) raf[key] = requestAnimationFrame(step);
    })(t0);
  }
  function calc(instant) {
    var calls = +el.calls.value, val = +el.value.value, miss = +el.miss.value / 100, rate = +el.rate.value / 100, cost = +el.cost.value;
    Object.keys(el).forEach(function (k) { fill(el[k]); });
    $('#callsOut').textContent = calls >= 2000 ? '2,000+' : calls.toLocaleString('en-US');
    $('#valueOut').textContent = val >= 10000 ? '$10,000+' : money(val);
    $('#missOut').textContent = Math.round(miss * 100) + '%';
    $('#rateOut').textContent = Math.round(rate * 100) + '%';
    $('#costOut').textContent = money(cost);
    var missed = calls * miss, jobs = missed * rate, rev = jobs * val, roi = rev / cost;
    $('#outMissed').textContent = Math.round(missed).toLocaleString('en-US');
    $('#outTotal').textContent = calls.toLocaleString('en-US');
    $('#barOk').style.width = (100 - miss * 100) + '%';
    $('#barMiss').style.width = (miss * 100) + '%';
    $('#outYear').textContent = money(rev * 12);
    tween('rev', rev, function (v) { $('#outRev').textContent = money(v); }, instant);
    tween('jobs', jobs, function (v) { $('#outJobs').textContent = Math.round(v).toLocaleString('en-US'); }, instant);
    tween('roi', roi, function (v) { $('#outRoi').textContent = (v >= 100 ? Math.round(v) : v.toFixed(1)) + '×'; }, instant);
  }
  Object.keys(el).forEach(function (k) { el[k].addEventListener('input', function () { calc(false); }); });
  calc(true);

  registerScrub($('.calc'), 'scale');
}
