import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  Zap, 
  ShieldCheck,
  PhoneCall,
  Clock,
  Sparkles,
  Sliders,
  TrendingDown,
  PhoneForwarded,
  CheckCircle2
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { Reveal3D } from './Reveal3D';

interface PricingStarterProps {
  onOpenAudit: (tierName?: string) => void;
}

interface VolumeTier {
  id: string;
  name: string;
  monthlyMinutes: number;
  label: string;
  targetBusiness: string;
  estimatedCostDesc: string;
  ratePerMin: string;
  highlights: string[];
}

const VOLUME_TIERS: VolumeTier[] = [
  {
    id: 'starter',
    name: 'Starter / Boutique',
    monthlyMinutes: 500,
    label: '~500 mins / month',
    targetBusiness: 'Local clinics, solo practitioners & specialty boutiques',
    estimatedCostDesc: 'Pay only for actual connected minutes. Ideal for handling overflow & after-hours inquiries.',
    ratePerMin: 'Metered Per Minute',
    highlights: [
      'Zero monthly minimum commitment',
      'Up to 5 concurrent inbound calls',
      'Calendar & SMS integration included',
      'Full call audio recordings & transcripts'
    ]
  },
  {
    id: 'growth',
    name: 'Growing Business',
    monthlyMinutes: 2500,
    label: '~2,500 mins / month',
    targetBusiness: 'Busy dental offices, home service contractors & growing e-commerce',
    estimatedCostDesc: 'High-efficiency tier with volume-discounted rates. Replaces 40+ hours of receptionist phone time.',
    ratePerMin: 'Discounted Volume Rate',
    highlights: [
      'Unlimited concurrent call channels',
      'Live 2-way CRM & order database sync',
      'Custom branded voice persona & accents',
      'Priority routing & instant warm transfers'
    ]
  },
  {
    id: 'enterprise',
    name: 'High-Volume Scale',
    monthlyMinutes: 10000,
    label: '10,000+ mins / month',
    targetBusiness: 'Multi-location operations, regional dispatchers & busy support desks',
    estimatedCostDesc: 'Maximum volume economics with dedicated SIP trunking and bespoke API workflow hooks.',
    ratePerMin: 'Custom Wholesale Rate',
    highlights: [
      'Dedicated private SIP telephony routes',
      'Custom LLM fine-tuning on company data',
      'Custom SLA & 99.99% uptime guarantee',
      'Dedicated automation engineer & support'
    ]
  }
];

export const PricingStarter: React.FC<PricingStarterProps> = ({ onOpenAudit }) => {
  const [selectedTierIdx, setSelectedTierIdx] = useState<number>(1);
  const activeTier = VOLUME_TIERS[selectedTierIdx];

  const coreInclusions = [
    'Sub-350ms neural conversational latency',
    'Natural barge-in & caller interruption support',
    'Real-time Google Calendar & Outlook 365 booking',
    'CRM live contact & order database lookups',
    'Instant SMS confirmation & tracking dispatch',
    'Word-for-word transcriptions & audio recording logs',
    'Plug into existing phone numbers with zero downtime'
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#F8FAFC]/90 relative border-b border-slate-200/80 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-orange-200/30 via-amber-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal3D direction="down" depth={24} rotation={6}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50/80 backdrop-blur-md border border-orange-200/80 text-orange-700 text-xs font-semibold mb-3 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-[#F26522]" />
              <span>100% Usage-Based Pricing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
              Pay only for the minutes you use.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-lg mx-auto">
              No locked-in telecom contracts, no expensive upfront hardware, and no monthly inactivity penalties. You only pay when your phone is actively answered.
            </p>
          </div>
        </Reveal3D>

        {/* Interactive Usage Tier Selector & Calculator Card */}
        <Reveal3D delay={0.1} direction="up" depth={24}>
          <div className="max-w-4xl mx-auto">
            
            {/* Top Volume Tab Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
              {VOLUME_TIERS.map((tier, idx) => {
                const isSelected = idx === selectedTierIdx;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTierIdx(idx)}
                    className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[#F26522] text-white shadow-md'
                        : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200 shadow-xs'
                    }`}
                  >
                    <Clock className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    <span>{tier.name}</span>
                    <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {tier.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Interactive Pricing Card */}
            <SpotlightCard 
              enable3DTilt={true}
              maxTilt={4}
              variant="glass-elevated"
              className="p-6 sm:p-10 relative rounded-3xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column: Rate Overview & Volume Context */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                      {activeTier.name}
                    </span>
                    <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Zero Idle Costs
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-950 tracking-tight">
                        Pay-As-You-Go
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#F26522] font-semibold mt-1">
                      Billing based strictly on active connected call minutes
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeTier.estimatedCostDesc}
                  </p>

                  {/* Volume Tier Features */}
                  <div className="space-y-2 pt-3 border-t border-slate-200/70">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Tier Highlights:
                    </div>
                    {activeTier.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-800 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Primary Action Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      id="pricing-usage-cta-btn"
                      onClick={() => onOpenAudit(`Usage Tier: ${activeTier.name} (${activeTier.label})`)}
                      className="group w-full py-3.5 px-6 rounded-2xl bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99] flex items-center justify-center gap-2"
                    >
                      <span>Get a Custom Usage Estimate</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </button>
                    <p className="text-center text-[11px] text-slate-400 mt-2 font-mono">
                      Includes 100% Free Blueprint & Voice Prototype Audition
                    </p>
                  </div>
                </div>

                {/* Right Column: Complete Platform Inclusions */}
                <div className="lg:col-span-6 bg-slate-50/80 p-5 sm:p-6 rounded-2xl border border-slate-200/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                      Standard In Every Minute:
                    </span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded font-semibold">
                      All-Inclusive
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {coreInclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center text-[#F26522] shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Transparent Guarantees Callout */}
                  <div className="pt-3 border-t border-slate-200/70 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Volume discounts</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <PhoneForwarded className="w-3.5 h-3.5 text-blue-600" />
                      <span>Zero hardware required</span>
                    </div>
                  </div>
                </div>

              </div>
            </SpotlightCard>

            {/* 3 Simple Guarantees Underneath */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
              <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs text-center">
                <div className="text-base font-bold text-slate-900 font-display">No Minimums</div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quiet week or seasonal slump? You never pay for uncalled minutes.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs text-center">
                <div className="text-base font-bold text-slate-900 font-display">Unlimited Lines</div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Handle 30 callers at the exact same moment without busy signals.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs text-center">
                <div className="text-base font-bold text-slate-900 font-display">Free Trial Call</div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Audition your custom voice agent on your phone before paying a cent.
                </p>
              </div>
            </div>

          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
