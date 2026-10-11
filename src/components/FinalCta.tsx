import React, { useEffect } from 'react';
import { Calendar, CheckCircle2, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';
import { Reveal3D } from './Reveal3D';

interface FinalCtaProps {
  onOpenAudit?: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = () => {
  useEffect(() => {
    // Initialize Cal inline embed
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = (window as any).Cal;
    if (Cal) {
      Cal("init", "discovery", { origin: "https://app.cal.com" });
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;

      Cal.ns.discovery("inline", {
        elementOrSelector: "#my-cal-inline-discovery",
        config: { "layout": "month_view", "useSlotsViewOnSmallScreen": "true" },
        calLink: "upframa/discovery",
      });

      Cal.ns.discovery("ui", {
        "cssVarsPerTheme": { "dark": { "cal-brand": "#ff2f2f" } },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    }

    // Ensure embed iframe and container do not show browser scrollbars and are perfectly centered
    const suppressScrollbars = () => {
      const iframes = document.querySelectorAll('#my-cal-inline-discovery iframe');
      iframes.forEach((iframe: any) => {
        iframe.setAttribute('scrolling', 'no');
        iframe.style.overflow = 'hidden';
        iframe.style.scrollbarWidth = 'none';
        iframe.style.msOverflowStyle = 'none';
        iframe.style.display = 'block';
        iframe.style.margin = '0 auto';
      });
    };

    suppressScrollbars();

    const observer = new MutationObserver(() => {
      suppressScrollbars();
    });

    const target = document.getElementById('my-cal-inline-discovery');
    if (target) {
      observer.observe(target, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      id="discovery-calendar" 
      className="pt-10 sm:pt-14 pb-12 sm:pb-16 bg-[#F8FAFC]/95 relative border-b border-slate-200/80 overflow-hidden scroll-mt-20"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] bg-gradient-to-tr from-orange-200/35 via-amber-100/25 to-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Reveal3D direction="up" depth={16} rotation={3}>
          <div className="text-center space-y-3 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50/90 border border-orange-200/90 text-orange-700 text-xs font-semibold shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Live Calendar Booking</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-950 tracking-tight leading-tight">
              Book Your AI Voice Discovery Session
            </h2>
          </div>
        </Reveal3D>

        {/* Cal Inline Embed Container with Deep Water Blur Effect & Equal Spacing on All Sides */}
        <Reveal3D direction="up" depth={20} rotation={2}>
          <div className="relative w-full rounded-2xl sm:rounded-3xl backdrop-blur-3xl bg-white/15 border border-white/50 shadow-[0_20px_50px_rgba(15,23,42,0.07),inset_0_1.5px_2px_rgba(255,255,255,0.8),inset_0_-1px_1.5px_rgba(255,255,255,0.2)] p-3 sm:p-5 md:p-6 overflow-hidden">
            {/* Multi-layered fluid water blur caustics behind glass */}
            <div className="absolute -top-16 -left-16 w-80 h-80 bg-gradient-to-br from-cyan-300/45 via-sky-400/30 to-blue-500/20 rounded-full blur-[52px] pointer-events-none" />
            <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gradient-to-bl from-orange-300/40 via-amber-300/30 to-rose-300/20 rounded-full blur-[56px] pointer-events-none" />
            <div className="absolute -bottom-16 left-1/4 w-80 h-80 bg-gradient-to-tr from-blue-300/35 via-indigo-300/25 to-teal-200/20 rounded-full blur-[50px] pointer-events-none" />
            
            {/* Water glass sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/10 pointer-events-none" />

            {/* Cal inline embed element centered with equal distance from each side */}
            <div 
              id="my-cal-inline-discovery" 
              style={{ width: "100%", height: "auto", overflow: "hidden" }}
              className="w-full relative z-10 overflow-hidden flex flex-col items-center justify-center min-h-[420px]"
            />
          </div>
        </Reveal3D>

        {/* Value Guarantees Below Calendar */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F26522]" />
            15-Minute Technical Discovery
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
            Live Voice Demo On Real Phone Line
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            100% Free Blueprint
          </span>
        </div>

      </div>
    </section>
  );
};
