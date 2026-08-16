import React from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  FileSpreadsheet, 
  Mail, 
  Users, 
  MessageSquare, 
  Server, 
  Truck, 
  Cpu,
  ShieldCheck,
  Activity,
  Lock
} from 'lucide-react';
import { Reveal3D } from './Reveal3D';
import { SpotlightCard } from './SpotlightCard';

interface TrustIntegrationsProps {
  onOpenAudit: () => void;
}

export const TrustIntegrations: React.FC<TrustIntegrationsProps> = ({ onOpenAudit }) => {
  const tools = [
    { name: 'ERP Systems', detail: 'SAP, NetSuite, Dynamics', latency: '42ms', icon: <Database className="w-4 h-4 text-orange-400" /> },
    { name: 'Excel / Sheets', detail: 'Automated ingestion', latency: '18ms', icon: <FileSpreadsheet className="w-4 h-4 text-amber-400" /> },
    { name: 'Email & Inboxes', detail: 'PO & invoice parsing', latency: '35ms', icon: <Mail className="w-4 h-4 text-orange-400" /> },
    { name: 'CRM & Ops', detail: 'Salesforce, HubSpot', latency: '60ms', icon: <Users className="w-4 h-4 text-amber-400" /> },
    { name: 'WhatsApp & Slack', detail: 'Instant alerts', latency: '12ms', icon: <MessageSquare className="w-4 h-4 text-emerald-400" /> },
    { name: 'Databases', detail: 'SQL, Postgres, Mongo', latency: '8ms', icon: <Server className="w-4 h-4 text-orange-400" /> },
    { name: 'Shipping APIs', detail: 'FedEx, Freight, 3PL', latency: '80ms', icon: <Truck className="w-4 h-4 text-amber-400" /> },
    { name: 'AI Models', detail: 'Vision OCR & Agents', latency: '110ms', icon: <Cpu className="w-4 h-4 text-emerald-400" /> }
  ];

  return (
    <section id="compatibility" className="py-12 bg-[#09090B] border-y border-zinc-800 relative overflow-hidden">
      {/* Industrial Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Social Proof / Non-Invasive Trust Badge with 3D Reveal */}
          <Reveal3D direction="left" depth={30} rotation={10} className="w-full lg:w-auto">
            <div className="text-center lg:text-left max-w-sm shrink-0">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-2.5 shadow-inner">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F26522]" />
                <span>NON_INVASIVE // INTEGRATION</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                Built for businesses running on complex stacks.
              </h3>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                Connect to your existing software stack without replacing or rewriting your core operations.
              </p>
              
              <div className="mt-3 flex items-center justify-center lg:justify-start gap-3 text-[10px] font-mono text-zinc-500">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  TLS 1.3 Encrypted
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-orange-400" />
                  99.98% Pipeline Uptime
                </span>
              </div>
            </div>
          </Reveal3D>

          {/* Integration Tools Ribbon with 3D Staggered Cards */}
          <div className="flex-1 w-full overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tools.map((tool, idx) => (
                <Reveal3D 
                  key={tool.name} 
                  delay={idx * 0.05} 
                  direction="up" 
                  depth={30}
                  rotation={8}
                >
                  <SpotlightCard
                    enable3DTilt={true}
                    maxTilt={8}
                    className="p-3.5 rounded-xl bg-[#111114] border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col justify-between group cursor-default shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 group-hover:border-orange-500/30 transition-colors shadow-xs">
                        {tool.icon}
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
                        {tool.latency}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{tool.name}</div>
                      <div className="text-[10px] text-zinc-400 font-mono truncate mt-0.5">{tool.detail}</div>
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
