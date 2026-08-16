import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { 
  Keyboard, 
  FileText, 
  FileSpreadsheet, 
  Mail, 
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
  Flame,
  Layers,
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
      title: 'Manual Data Entry & Invoices',
      subtitle: 'Copying invoices, bills & receipts',
      description: 'Re-typing customer orders, PDF bills, and receipts into spreadsheets or accounting software by hand line-by-line.',
      icon: <Keyboard className="w-5 h-5 text-orange-400" />,
      timeLost: '15+ hrs/week',
      costImpact: '~$35,000 / yr in manual labor',
      direction: 'left' as const
    },
    {
      id: 'p2',
      code: 'BOTTLENECK // 02',
      title: 'End-of-Day Shift Reports',
      subtitle: 'Compiling numbers across files',
      description: 'Spending 1 to 2 hours every evening compiling daily production numbers, shift logs, and summaries across multiple distributed sheets.',
      icon: <FileText className="w-5 h-5 text-amber-400" />,
      timeLost: '2 hrs/day',
      costImpact: 'Late management visibility',
      direction: 'up' as const
    },
    {
      id: 'p3',
      code: 'BOTTLENECK // 03',
      title: 'Scattered Spreadsheets',
      subtitle: 'Trapped data & broken formulas',
      description: 'Critical business numbers trapped in separate Excel files that easily break, get accidentally overwritten, or fall out of sync.',
      icon: <FileSpreadsheet className="w-5 h-5 text-orange-400" />,
      timeLost: 'High friction',
      costImpact: 'Costly calculation errors',
      direction: 'up' as const
    },
    {
      id: 'p4',
      code: 'BOTTLENECK // 04',
      title: 'Chasing Statuses & Follow-ups',
      subtitle: 'Manual email checks & tracking',
      description: 'Manually looking up carrier tracking numbers and writing repetitive follow-up emails to suppliers and customers one by one.',
      icon: <Mail className="w-5 h-5 text-amber-400" />,
      timeLost: '10+ hrs/week',
      costImpact: 'Supplier delays & stockouts',
      direction: 'right' as const
    }
  ];

  return (
    <section 
      id="problems"
      className="py-20 sm:py-28 bg-[#09090B] relative border-b border-zinc-800 overflow-hidden"
    >
      {/* Industrial Precision Crosshairs Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Pop */}
        <Reveal3D direction="down" depth={30} rotation={8}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-3.5 backdrop-blur-sm shadow-inner">
              <AlertCircle className="w-3.5 h-3.5 text-[#F26522]" />
              <span>OPERATIONAL_AUDIT // FRICTION_POINTS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight leading-tight">
              Sound familiar in your daily operations?
            </h2>
            
            <p className="text-zinc-400 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              These 4 repetitive tasks waste hundreds of human hours every month. We replace them with automated software pipelines.
            </p>
          </div>
        </Reveal3D>

        {/* 4 Focused Problem Cards with 3D Spatial Appear Effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {problems.map((item, idx) => (
            <Reveal3D 
              key={item.title} 
              delay={idx * 0.08} 
              direction={item.direction}
              depth={50}
              rotation={14}
              className="h-full"
            >
              <div 
                onClick={() => onOpenAudit(`Automate ${item.title}`)}
                className="cursor-pointer group flex flex-col h-full relative"
              >
                <SpotlightCard 
                  enable3DTilt={true}
                  maxTilt={10}
                  className="p-5 sm:p-6 h-full flex flex-col justify-between group-hover:border-zinc-700 transition-all rounded-2xl shadow-xl hover:shadow-orange-500/10"
                >
                  {/* Industrial Corner Marks */}
                  <div className="absolute top-2 left-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">┌</div>
                  <div className="absolute top-2 right-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">┐</div>
                  <div className="absolute bottom-2 left-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">└</div>
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">┘</div>

                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-orange-500/30 transition-colors shadow-sm">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-400" />
                        {item.timeLost}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1">
                      {item.code}
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-3 text-[11px] font-mono text-rose-400/90 bg-rose-950/20 border border-rose-900/30 px-2 py-1 rounded">
                      Impact: {item.costImpact}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>0{idx + 1} / 04</span>
                    <span className="text-zinc-400 group-hover:text-[#F26522] flex items-center gap-1 transition-colors font-semibold">
                      Automate this <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </SpotlightCard>
              </div>
            </Reveal3D>
          ))}
        </div>

        {/* Bottom Banner with 3D pop */}
        <Reveal3D delay={0.3} direction="up" depth={30}>
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#111114] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xl">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Have a unique or custom operational workflow?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Tell us what takes up your time. If it has repetitive steps or rules, we can automate it reliably for your team.
              </p>
            </div>
            <button
              onClick={() => onOpenAudit()}
              className="px-5 py-2.5 rounded-xl bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-xs transition-all cursor-pointer shrink-0 shadow-md hover:shadow-orange-500/25"
            >
              Get Free Process Assessment
            </button>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
