import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Reveal3D } from './Reveal3D';

interface FinalCtaProps {
  onOpenAudit: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenAudit }) => {
  return (
    <section className="py-14 sm:py-16 bg-[#09090B] relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Reveal3D direction="up" depth={35} rotation={8}>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-[11px] font-mono shadow-inner">
              <span>GET STARTED // DIRECT DISCOVERY</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight leading-tight">
              Find the work your team shouldn't be doing manually.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 max-w-lg mx-auto">
              Let's identify one high-friction process and build an automated pipeline for it.
            </p>

            <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                id="final-cta-book-audit-btn"
                onClick={onOpenAudit}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-xs transition-all cursor-pointer shadow-lg hover:shadow-orange-500/25"
              >
                <span>Book Your Free Automation Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-[#F26522]" />
                Tailored Architecture Plan
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Zero Disruption
              </span>
              <span>•</span>
              <span>Starts at $250 / workflow</span>
            </div>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
