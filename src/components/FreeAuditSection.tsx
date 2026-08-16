import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  FileCheck2
} from 'lucide-react';

interface FreeAuditSectionProps {
  onOpenAudit: (notes?: string) => void;
}

export const FreeAuditSection: React.FC<FreeAuditSectionProps> = ({ onOpenAudit }) => {
  const [quickInput, setQuickInput] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenAudit(quickInput ? `Quick audit note: ${quickInput}` : undefined);
  };

  const deliverables = [
    { title: 'Scope Analysis', desc: 'Identify high-friction vs automatable steps' },
    { title: 'Workflow Blueprint', desc: 'Step-by-step logic & trigger architecture' },
    { title: 'System Connectors', desc: 'Mapping of ERP, APIs, emails & spreadsheets' },
    { title: 'Fixed Estimate', desc: 'Clear timeline, scope, and $250+ starter pricing' }
  ];

  return (
    <section className="py-12 sm:py-14 bg-[#09090B] relative border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-xl bg-[#111113] border border-zinc-800 p-5 sm:p-7"
        >
          
          <div className="text-center max-w-xl mx-auto mb-5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-2">
              <span className="text-[#F26522] font-semibold">DIAGNOSTIC</span>
              <span>• Zero Commitment</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
              Not sure what to automate?
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Tell us about one repetitive process in your business. We'll map out the solution before you spend a dime.
            </p>
          </div>

          {/* 4 Deliverable Pillars - Compact Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {deliverables.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800/80"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white mb-0.5">
                  <CheckCircle2 className="w-3 h-3 text-[#F26522] shrink-0" />
                  <span className="truncate">{item.title}</span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Quick Input Bar */}
          <form onSubmit={handleQuickSubmit} className="space-y-2.5 max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="e.g. Daily production Excel report or manual invoice entry..."
                className="flex-1 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs placeholder:text-zinc-500 focus:border-zinc-700 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#F26522] hover:bg-[#DE5516] text-white font-medium text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Book Free 30-Min Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-zinc-400" />
                30-Min Virtual Session
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                100% Free
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <FileCheck2 className="w-3 h-3 text-zinc-400" />
                Custom Blueprint Included
              </span>
            </div>
          </form>

        </motion.div>

      </div>
    </section>
  );
};

