import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';
import { Reveal3D } from './Reveal3D';

interface FinalCtaProps {
  onOpenAudit: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenAudit }) => {
  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC]/90 relative border-b border-slate-200/80 overflow-hidden">
      {/* Background glow and subtle dots */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-200/35 via-amber-100/25 to-blue-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Reveal3D direction="up" depth={24} rotation={6}>
          <div className="max-w-3xl mx-auto text-center space-y-5 bg-white/80 backdrop-blur-2xl p-8 sm:p-14 rounded-3xl border border-white/90 shadow-[0_24px_60px_rgba(15,23,42,0.08),inset_0_1px_2px_rgba(255,255,255,1)]">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50/80 backdrop-blur-md border border-orange-200/80 text-orange-700 text-xs font-semibold shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Direct Voice Discovery</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-950 tracking-tight leading-tight">
              Never miss a customer call, booking, or after-hours lead again.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
              Let's deploy a dedicated 24/7 AI Voice Calling Agent connected directly to your business phone lines with sub-350ms response time.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="final-cta-book-audit-btn"
                onClick={onOpenAudit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-sm transition-all cursor-pointer shadow-sm hover:shadow active:scale-[0.98]"
              >
                <span>Deploy Your Free Voice Agent Blueprint</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F26522]" />
                Human-Like Voice Persona
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                &lt;350ms Latency
              </span>
              <span>•</span>
              <span className="font-semibold text-slate-800">100% Usage-Based Pricing</span>
            </div>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
