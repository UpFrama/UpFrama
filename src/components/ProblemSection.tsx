import React from 'react';
import { 
  PhoneMissed,
  PhoneOff,
  MessageSquare,
  Clock, 
  AlertCircle,
  ArrowRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { Reveal3D } from './Reveal3D';

interface ProblemSectionProps {
  onOpenAudit: (problemTitle?: string) => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenAudit }) => {
  const problems = [
    {
      id: 'p1',
      code: 'BOTTLENECK // 01',
      title: 'Missed After-Hours Calls',
      subtitle: 'Calls dropping to voicemail',
      description: 'Callers who reach voicemail after hours or during peak rushes immediately hang up and call a competing provider.',
      icon: <PhoneMissed className="w-5 h-5 text-orange-600" />,
      timeLost: '15+ calls/day',
      costImpact: 'Lost revenue & high customer churn',
      direction: 'left' as const
    },
    {
      id: 'p2',
      code: 'BOTTLENECK // 02',
      title: 'Long Customer Hold Times',
      subtitle: 'Overwhelmed front desk & staff',
      description: 'Call spikes force high-value clients to wait 8+ minutes listening to hold music until they hang up frustrated.',
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      timeLost: '20+ hrs/week',
      costImpact: 'Damaged brand perception',
      direction: 'up' as const
    },
    {
      id: 'p3',
      code: 'BOTTLENECK // 03',
      title: 'Repetitive Phone Inquiries',
      subtitle: 'Repeating basic info all day',
      description: 'Front desk and support reps spending hours answering the same questions about hours, pricing, booking, and order status.',
      icon: <MessageSquare className="w-5 h-5 text-emerald-600" />,
      timeLost: '2+ hrs/day',
      costImpact: 'Heavy staff burnout & overhead',
      direction: 'up' as const
    },
    {
      id: 'p4',
      code: 'BOTTLENECK // 04',
      title: 'Clunky Touch-Tone IVRs',
      subtitle: 'Press 1 for sales, press 2 for billing',
      description: 'Rigid keypad phone trees frustrate callers, cause 40%+ drop-offs, and route callers to the wrong departments.',
      icon: <PhoneOff className="w-5 h-5 text-blue-600" />,
      timeLost: 'High drop-off',
      costImpact: 'Customer frustration & complaints',
      direction: 'right' as const
    }
  ];

  return (
    <section 
      id="problems"
      className="py-20 sm:py-28 bg-[#F8FAFC]/90 relative border-b border-slate-200/80 overflow-hidden"
    >
      {/* Subtle Background Pattern & Ambient Glowing Orbs */}
      <div className="absolute inset-0 bg-dot-pattern opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Pop */}
        <Reveal3D direction="down" depth={24} rotation={6}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50/80 backdrop-blur-md border border-orange-200/80 text-orange-700 text-xs font-semibold mb-3.5 shadow-xs">
              <AlertCircle className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Phone Communication Bottlenecks We Eliminate</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-tight">
              Losing customers to missed calls and hold music?
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              These 4 phone communication bottlenecks drain staff hours and cost you high-value customers every single day. Our Autonomous Voice Calling Agent eliminates them completely.
            </p>
          </div>
        </Reveal3D>

        {/* 4 Focused Problem Cards with 3D Spatial Appear Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((item, idx) => (
            <Reveal3D 
              key={item.title} 
              delay={idx * 0.06} 
              direction={item.direction}
              depth={35}
              rotation={8}
              className="h-full"
            >
              <div 
                onClick={() => onOpenAudit(`Automate ${item.title}`)}
                className="cursor-pointer group flex flex-col h-full relative"
              >
                <SpotlightCard 
                  enable3DTilt={true}
                  maxTilt={8}
                  variant="glass"
                  className="p-5 sm:p-6 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="p-2.5 rounded-xl bg-white/80 backdrop-blur-md border border-white/90 group-hover:bg-orange-50/90 group-hover:border-orange-200 transition-colors shadow-xs">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-700 bg-white/70 backdrop-blur-md border border-white/90 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <Clock className="w-3 h-3 text-orange-600" />
                        {item.timeLost}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {item.code}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-3 text-[11px] font-mono font-semibold text-rose-700 bg-rose-50/80 backdrop-blur-sm border border-rose-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <TrendingDown className="w-3 h-3 text-rose-600" />
                      <span>{item.costImpact}</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>0{idx + 1} / 04</span>
                    <span className="text-slate-700 group-hover:text-[#F26522] flex items-center gap-1 transition-colors font-bold">
                      Automate this <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-[#F26522]" />
                    </span>
                  </div>
                </SpotlightCard>
              </div>
            </Reveal3D>
          ))}
        </div>

        {/* Bottom Banner */}
        <Reveal3D delay={0.25} direction="up" depth={20}>
          <div className="mt-10 p-6 sm:p-7 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,1)] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                Have a unique or custom operational workflow?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-xl">
                Tell us what takes up your team's time. If it has repetitive steps or rules, we can automate it reliably with zero downtime.
              </p>
            </div>
            <button
              onClick={() => onOpenAudit()}
              className="px-6 py-3 rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer shrink-0 shadow-sm hover:shadow active:scale-[0.98]"
            >
              Get Free Process Assessment
            </button>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
