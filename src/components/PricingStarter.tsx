import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  Clock,
  Zap,
  Sparkles,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { Reveal3D } from './Reveal3D';
import { AnimatedCounter } from './AnimatedCounter';

interface PricingStarterProps {
  onOpenAudit: (tierName?: string) => void;
}

export const PricingStarter: React.FC<PricingStarterProps> = ({ onOpenAudit }) => {
  const inclusions = [
    'Complete workflow & bottleneck analysis',
    'Custom automation development & logic setup',
    'Non-invasive connector integration (ERP / Sheets / Email / CRM)',
    'Rigorous end-to-end edge-case testing',
    'Production deployment with zero downtime',
    'Operational handover documentation & support'
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#09090B] relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Pop */}
        <Reveal3D direction="down" depth={35} rotation={8}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-2 shadow-inner">
              <Zap className="w-3.5 h-3.5 text-[#F26522]" />
              <span>TRANSPARENT_ONBOARDING // STARTER_FLOW</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Start with one workflow.
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-2">
              No massive multi-month contracts or risky software overhauls. Test the impact on a single high-friction task.
            </p>
          </div>
        </Reveal3D>

        {/* Focused Pricing Card with 3D Tilt & Specular Light */}
        <Reveal3D delay={0.12} direction="up" depth={50} rotation={10}>
          <div className="max-w-md mx-auto">
            <SpotlightCard 
              enable3DTilt={true}
              maxTilt={8}
              className="p-6 sm:p-8 shadow-2xl relative border-zinc-800 hover:border-zinc-700 transition-colors rounded-2xl"
            >
              {/* Subtle Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-[#F26522]/15 text-[#F26522] border border-[#F26522]/30">
                  Fixed Fee Starter
                </span>
                <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Zero Disruption Build
                </span>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-1.5 mb-2">
                <span className="text-4xl sm:text-5xl font-bold font-mono text-white tracking-tight">
                  $250
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  / workflow
                </span>
              </div>

              <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                A single automated pipeline that solves one repetitive operational bottleneck forever.
              </p>

              {/* Inclusions List */}
              <div className="space-y-3 pt-4 border-t border-zinc-800/80 mb-6">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-2">
                  What's Included:
                </div>
                {inclusions.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-[#F26522] mt-0.5 shrink-0" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenAudit('Fixed Starter ($250)')}
                className="w-full py-3.5 px-4 rounded-xl bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-xs transition-all cursor-pointer shadow-lg hover:shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                <span>Get Started with a Free Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Guarantee Footer */}
              <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-400">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>100% Satisfaction Guarantee • Zero Disruption</span>
              </div>
            </SpotlightCard>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
