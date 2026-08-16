import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  HelpCircle 
} from 'lucide-react';
import { Reveal3D } from './Reveal3D';

interface FaqSectionProps {
  onOpenAudit: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenAudit }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do we need to replace our ERP?',
      a: 'No. We primarily connect and automate around your existing systems. Whether you run SAP, NetSuite, Dynamics 365, Odoo, or a custom on-premise database, we build non-invasive integrations that read and write data without requiring system replacements.'
    },
    {
      q: 'Can you work with our existing software?',
      a: 'If it provides an API, database access, webhook, or even structured email / spreadsheet outputs, usually yes. We have connected legacy desktop ERPs, custom SQL databases, cloud platforms, and third-party logistics portals.'
    },
    {
      q: 'Do you build AI agents?',
      a: 'Yes, where an agent provides genuine business value (such as messy document OCR, intelligent customer email classification, or production anomaly detection). Not every workflow needs an AI agent—we always prioritize the fastest, most reliable deterministic solution first.'
    },
    {
      q: 'How long does an automation take to build?',
      a: 'Timelines vary based on technical complexity, system accessibility, and data validation requirements. During your initial blueprint discovery, we provide a transparent, step-by-step milestone plan with guaranteed zero disruption to your daily operations.'
    },
    {
      q: 'Do you provide maintenance?',
      a: 'Yes. We provide continuous uptime monitoring, error logging, and pipeline maintenance to ensure your automations remain fast and resilient as third-party APIs update and your operational volume scales.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#09090B] relative border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Pop */}
        <Reveal3D direction="down" depth={35} rotation={8}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-3 shadow-inner">
              <HelpCircle className="w-3.5 h-3.5 text-[#F26522]" />
              <span>FAQ // CLARIFICATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2">
              Clear answers about how we build, integrate, and maintain your operational automations.
            </p>
          </div>
        </Reveal3D>

        {/* FAQ Accordion List with 3D Entrance */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <Reveal3D key={idx} delay={idx * 0.06} direction="up" depth={30} rotation={6}>
                <div
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-lg ${
                    isOpen 
                      ? 'bg-[#141418] border-zinc-700 shadow-xl' 
                      : 'bg-[#111114] border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-semibold text-white">
                      {faq.q}
                    </span>
                    <div className={`p-1.5 rounded-lg border transition-transform duration-200 shrink-0 ${
                      isOpen ? 'bg-[#F26522]/20 border-[#F26522]/40 text-[#F26522] rotate-180' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/60 mt-1">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal3D>
            );
          })}
        </div>

        {/* FAQ Bottom Support Link */}
        <Reveal3D delay={0.3} direction="up" depth={20}>
          <div className="mt-10 text-center text-xs font-mono text-zinc-400">
            <span>Have a specific architectural question? </span>
            <button
              onClick={onOpenAudit}
              className="text-[#F26522] hover:text-orange-300 font-semibold underline underline-offset-4 cursor-pointer ml-1"
            >
              Ask an Automation Engineer &rarr;
            </button>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
