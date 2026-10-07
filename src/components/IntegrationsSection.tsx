import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Layers,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Reveal3D } from './Reveal3D';
import { SpotlightCard } from './SpotlightCard';

interface IntegrationsSectionProps {
  onOpenAudit: () => void;
}

export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({ onOpenAudit }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Ecosystem' },
    { id: 'telephony', name: 'Phone & Telephony' },
    { id: 'calendars', name: 'Calendars & Booking' },
    { id: 'crm', name: 'CRM & Helpdesk' },
    { id: 'messaging', name: 'SMS & Alerts' },
    { id: 'databases', name: 'Databases & APIs' }
  ];

  const tools = [
    // Telephony
    { name: 'Twilio Voice & SIP', category: 'telephony', desc: 'Direct carrier trunking with ultra-low jitter', badge: 'Telephony' },
    { name: 'RingCentral & Vonage', category: 'telephony', desc: 'Forward existing business numbers seamlessly', badge: 'Carrier' },
    { name: 'Custom PBX / Asterisk', category: 'telephony', desc: 'Enterprise SIP endpoints & private exchange routing', badge: 'Enterprise' },

    // Calendars
    { name: 'Google Calendar', category: 'calendars', desc: 'Live slot checks & instant event bookings', badge: 'Calendar' },
    { name: 'Microsoft Outlook 365', category: 'calendars', desc: 'Corporate team scheduling & meeting invite dispatch', badge: 'Office' },
    { name: 'Calendly & Cal.com', category: 'calendars', desc: 'Dynamic scheduling links & availability synchronization', badge: 'Scheduling' },

    // CRM & Helpdesk
    { name: 'Salesforce CRM', category: 'crm', desc: 'Auto-log call audio recordings, transcripts & deal stages', badge: 'CRM' },
    { name: 'HubSpot', category: 'crm', desc: 'Contact lookup by caller ID & automatic ticket creation', badge: 'CRM' },
    { name: 'Zendesk & Intercom', category: 'crm', desc: 'Escalation ticket creation & support history lookup', badge: 'Support' },

    // SMS & Messaging
    { name: 'Twilio SMS Gateway', category: 'messaging', desc: 'Instant post-call confirmation text links & maps', badge: 'SMS' },
    { name: 'WhatsApp Business', category: 'messaging', desc: 'Conversational order updates & receipt dispatch', badge: 'Mobile' },
    { name: 'Slack & MS Teams', category: 'messaging', desc: 'Real-time high-priority call alerts & hot lead pings', badge: 'Chat' },

    // Databases & APIs
    { name: 'PostgreSQL & MySQL', category: 'databases', desc: 'Query live customer records and order statuses', badge: 'Database' },
    { name: 'Shopify & WooCommerce', category: 'databases', desc: 'Real-time order lookup and package status checking', badge: 'E-Comm' },
    { name: 'QuickBooks & Stripe', category: 'databases', desc: 'Billing account verification & invoice status checks', badge: 'Billing' }
  ];

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  return (
    <section id="integrations" className="py-16 sm:py-24 bg-[#F8FAFC]/90 relative border-b border-slate-200/80 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 -right-32 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal3D direction="down" depth={24} rotation={6}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50/80 backdrop-blur-md border border-orange-200/80 text-orange-700 text-xs font-semibold mb-3.5 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Native Tool Ecosystem</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-slate-950 tracking-tight leading-tight">
              Works with the tools you already use every day.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
              You don't need to replace your ERP, switch email apps, or migrate databases. We connect your existing tools quietly in the background.
            </p>
          </div>
        </Reveal3D>

        {/* Category Filters */}
        <Reveal3D delay={0.08} direction="up" depth={15}>
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#F26522] text-white shadow-xs'
                    : 'bg-white/75 backdrop-blur-md text-slate-600 border border-white/90 hover:border-orange-300 hover:text-slate-900 shadow-xs'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Reveal3D>

        {/* Tools Grid */}
        <Reveal3D delay={0.12} direction="up" depth={24} rotation={4}>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => (
                <motion.div
                  key={tool.name}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                >
                  <SpotlightCard
                    enable3DTilt={true}
                    maxTilt={6}
                    variant="glass"
                    className="p-4.5 rounded-2xl flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {tool.desc}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-white/80 backdrop-blur-sm border border-white/90 px-2 py-0.5 rounded-full shrink-0 ml-3 shadow-xs">
                      {tool.badge}
                    </span>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Reveal3D>

        {/* Bottom Banner */}
        <Reveal3D delay={0.2} direction="up" depth={18}>
          <div className="mt-10 p-5 rounded-2xl bg-white/75 backdrop-blur-xl border border-white/90 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-[0_8px_30px_rgba(15,23,42,0.04),inset_0_1px_1px_rgba(255,255,255,1)]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-600 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-600">
                Using custom internal software or an on-premise database? We build secure custom API & database bridges.
              </p>
            </div>
            <button
              onClick={onOpenAudit}
              className="text-[#F26522] hover:text-[#DE5516] text-xs font-bold whitespace-nowrap cursor-pointer flex items-center gap-1 shrink-0"
            >
              <span>Ask about your stack</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
