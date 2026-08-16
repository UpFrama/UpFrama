import React from 'react';
import { motion } from 'motion/react';
import { 
  Target, 
  Puzzle, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface WhyUsProps {
  onOpenAudit: () => void;
}

export const WhyUs: React.FC<WhyUsProps> = ({ onOpenAudit }) => {
  const pillars = [
    {
      title: 'Business First',
      badge: 'ROI ORIENTED',
      description: 'We identify the process costing you time or money before recommending a solution. If a workflow won’t generate clear time or financial savings, we will tell you not to automate it.',
      icon: <Target className="w-5 h-5 text-zinc-300" />
    },
    {
      title: 'Built Around Your Workflow',
      badge: 'ZERO REPLACEMENTS',
      description: 'We integrate with the tools you already use instead of forcing you to replace them. Your ERP, spreadsheets, and emails stay intact—we just eliminate the manual steps connecting them.',
      icon: <Puzzle className="w-5 h-5 text-zinc-300" />
    },
    {
      title: 'Start Small. Scale Later.',
      badge: 'LOW RISK',
      description: 'Automate one process first, prove the value, then expand. You don’t need a 6-month digital transformation. We deliver your first working automation in days with zero upfront lock-in.',
      icon: <TrendingUp className="w-5 h-5 text-zinc-300" />
    }
  ];

  return (
    <section className="py-20 bg-[#09090B] relative border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
            ENGINEERING PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight">
            We don't automate for the sake of automation.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-3">
            Practical, high-yield automations built for pragmatic operators who value tangible hours saved over hype.
          </p>
        </motion.div>

        {/* 3 Pillars Grid with Staggered Scroll Animation & Spotlight Glow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pillars.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className="group flex flex-col h-full"
            >
              <SpotlightCard className="p-6 h-full flex flex-col justify-between group-hover:border-zinc-700 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-zinc-800/80 flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F26522]" />
                  <span>Pillar 0{idx + 1} Standard</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

