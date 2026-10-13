import { $, drawOnReveal } from '../../js/utils.js';
import { registerScrub } from '../../js/scrub.js';
import { ENABLE_CAL_EMBED, CAL_LINK, CONTACT_EMAIL } from '../../config.js';

export function initBooking() {
  if (ENABLE_CAL_EMBED) {
    (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement('script')).src = A; cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar); return; } p(cal, ar); }; })(window, 'https://app.cal.com/embed/embed.js', 'init');
    Cal('init', 'discovery', { origin: 'https://app.cal.com' });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;
    Cal.ns.discovery('inline', {
      elementOrSelector: '#my-cal-inline-discovery',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: CAL_LINK
    });
    Cal.ns.discovery('ui', { cssVarsPerTheme: { dark: { 'cal-brand': '#ff2f2f' } }, hideEventTypeDetails: false, layout: 'month_view' });
    var calLoad = $('#calLoading'), calSlot = $('#my-cal-inline-discovery');
    var calDone = function () { if (calLoad) { calLoad.classList.add('is-done'); setTimeout(function () { calLoad.style.display = 'none'; }, 450); } };
    try { Cal.ns.discovery('on', { action: 'linkReady', callback: calDone }); } catch (e) {}
    setTimeout(function () {
      if (calSlot && !calSlot.querySelector('iframe') && calLoad && !calLoad.classList.contains('is-done')) {
        calLoad.classList.add('is-failed');
        $('#calMsg').innerHTML = 'The booking calendar loads on the live site. To book now, email <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>.';
      }
    }, 9000);
  }

  registerScrub($('.book'), 'scale');
  drawOnReveal('.trust');
}
