import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Reveal3D } from './Reveal3D';

interface FaqSectionProps {
  onOpenAudit: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenAudit }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do we need to change our existing phone numbers or telecom provider?',
      a: 'No. You keep your existing numbers and carrier. You can simply set up conditional call forwarding (for when lines are busy or after hours) to your UpFrama agent SIP endpoint, or we can provision a new dedicated local or toll-free number.'
    },
    {
      q: 'How natural does the AI voice sound?',
      a: 'Our voice agents use advanced neural voice models running at sub-350ms latency. They feature human-like cadences, natural inflection, and real-time interruption (barge-in) support—meaning if a caller interrupts, the agent pauses immediately just like a real person.'
    },
    {
      q: 'Can the voice agent check our live calendar and CRM databases?',
      a: 'Yes. The agent connects directly to Google Calendar, Outlook 365, HubSpot, Salesforce, or your custom database API. It can look up caller history by phone number, verify available booking slots, confirm appointments, or check shipment status in real time.'
    },
    {
      q: 'What happens if a caller asks something the agent cannot answer?',
      a: 'We configure custom fallback protocols. The agent can warm-transfer the live call to a staff member, schedule an immediate callback, or record a detailed message and deliver the audio transcript to your team via SMS, email, or Slack.'
    },
    {
      q: 'Do we get recordings and transcripts of every call?',
      a: 'Yes. Every call includes a full audio recording, accurate word-by-word transcript, key entity breakdown, and automated summary synced directly into your CRM or internal software with zero delay.'
    },
    {
      q: 'How does pricing and usage billing work?',
      a: 'We do not charge rigid fixed fees or lock you into multi-year phone contracts. Our pricing is 100% usage-based: you only pay for the actual connected call minutes your agent handles. If call volume drops during quiet weeks, your costs drop proportionally. Full speech synthesis, LLM reasoning, telephony routing, and calendar/CRM syncing are included in your metered rate.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-[#F8FAFC]/90 relative border-b border-slate-200/80 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 -right-36 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-36 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal3D direction="down" depth={24} rotation={6}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50/80 backdrop-blur-md border border-orange-200/80 text-orange-700 text-xs font-semibold mb-3 shadow-xs">
              <HelpCircle className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-950 tracking-tight leading-tight">
              Everything you need to know.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Clear answers about how we build, integrate, and maintain your operational automations.
            </p>
          </div>
        </Reveal3D>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <Reveal3D key={idx} delay={idx * 0.05} direction="up" depth={20} rotation={4}>
                <div
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-xl ${
                    isOpen 
                      ? 'bg-white/90 border-orange-300/60 shadow-[0_12px_30px_rgba(242,101,34,0.08),inset_0_1px_1px_rgba(255,255,255,1)]' 
                      : 'bg-white/70 border-white/80 shadow-[0_4px_20px_rgba(15,23,42,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:border-orange-200 hover:bg-white/80'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <div className={`p-2 rounded-full border transition-transform duration-200 shrink-0 ${
                      isOpen ? 'bg-orange-50 border-orange-200 text-[#F26522] rotate-180' : 'bg-white/80 border-white/90 text-slate-500 shadow-xs'
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
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 mt-1">
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

        {/* Bottom Help */}
        <Reveal3D delay={0.25} direction="up" depth={15}>
          <div className="mt-10 text-center p-6 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_8px_30px_rgba(15,23,42,0.04),inset_0_1px_1px_rgba(255,255,255,1)]">
            <p className="text-sm font-semibold text-slate-800">
              Have a question specific to your software stack or security compliance?
            </p>
            <button
              onClick={onOpenAudit}
              className="mt-2 text-xs font-bold text-[#F26522] hover:text-[#DE5516] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Speak directly with an automation architect</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
