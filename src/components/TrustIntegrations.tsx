import React from 'react';
import { 
  Database, 
  Users, 
  MessageSquare, 
  Server, 
  Cpu,
  ShieldCheck,
  Activity,
  Lock,
  ArrowRight,
  PhoneCall,
  Calendar,
  Mic,
  PhoneForwarded
} from 'lucide-react';
import { Reveal3D } from './Reveal3D';
import { SpotlightCard } from './SpotlightCard';

interface TrustIntegrationsProps {
  onOpenAudit: () => void;
}

export const TrustIntegrations: React.FC<TrustIntegrationsProps> = ({ onOpenAudit }) => {
  const tools = [
    { name: 'Twilio & SIP', detail: 'Carrier-grade trunking', latency: '< 25ms', icon: <PhoneCall className="w-4 h-4 text-orange-600" /> },
    { name: 'Google Calendar', detail: 'Real-time slot bookings', latency: '35ms', icon: <Calendar className="w-4 h-4 text-emerald-600" /> },
    { name: 'Salesforce & CRM', detail: 'Automatic call transcripts', latency: '40ms', icon: <Users className="w-4 h-4 text-indigo-600" /> },
    { name: 'Deepgram Nova-2', detail: 'Sub-150ms speech-to-text', latency: '120ms', icon: <Mic className="w-4 h-4 text-blue-600" /> },
    { name: 'ElevenLabs Turbo', detail: 'Ultra-realistic neural voice', latency: '180ms', icon: <Cpu className="w-4 h-4 text-violet-600" /> },
    { name: 'SMS & WhatsApp', detail: 'Instant post-call follow-ups', latency: '30ms', icon: <MessageSquare className="w-4 h-4 text-emerald-600" /> },
    { name: 'ERP & SQL DBs', detail: 'Live order & client lookups', latency: '15ms', icon: <Database className="w-4 h-4 text-orange-600" /> },
    { name: 'Phone Forwarding', detail: 'RingCentral, PBX, Mobile', latency: '0ms delay', icon: <PhoneForwarded className="w-4 h-4 text-amber-600" /> }
  ];

  return (
    <section id="compatibility" className="py-14 bg-[#F8FAFC]/90 border-y border-slate-200/80 relative overflow-hidden">
      {/* Subtle Grid Lines & Glows */}
      <div className="absolute inset-0 bg-dot-pattern opacity-25 pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-72 h-72 bg-orange-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Social Proof / Non-Invasive Trust Badge with 3D Reveal */}
          <Reveal3D direction="left" depth={24} rotation={6} className="w-full lg:w-auto">
            <div className="text-center lg:text-left max-w-sm shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50/80 backdrop-blur-md border border-orange-200/80 text-orange-700 text-xs font-semibold mb-2.5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F26522]" />
                <span>Zero-Downtime Integration</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-slate-900 tracking-tight">
                Built for businesses running on complex stacks.
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Connect to your existing software stack without replacing or rewriting your core operations.
              </p>
              
              <div className="mt-3 flex items-center justify-center lg:justify-start gap-3 text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  TLS 1.3 Encrypted
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-orange-600" />
                  99.98% Pipeline Uptime
                </span>
              </div>
            </div>
          </Reveal3D>

          {/* Integration Tools Ribbon with Staggered Cards */}
          <div className="flex-1 w-full overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tools.map((tool, idx) => (
                <Reveal3D 
                  key={tool.name} 
                  delay={idx * 0.04} 
                  direction="up" 
                  depth={20}
                  rotation={4}
                >
                  <SpotlightCard
                    enable3DTilt={true}
                    maxTilt={6}
                    variant="glass"
                    className="p-3.5 rounded-2xl flex flex-col justify-between group cursor-default"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-1.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white/90 group-hover:bg-orange-50/90 group-hover:border-orange-200 transition-colors shadow-xs">
                        {tool.icon}
                      </div>
                      <span className="text-[9px] font-mono text-slate-600 bg-white/70 backdrop-blur-xs px-1.5 py-0.5 rounded border border-white/80">
                        {tool.latency}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">{tool.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono truncate mt-0.5">{tool.detail}</div>
                    </div>
                  </SpotlightCard>
                </Reveal3D>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
