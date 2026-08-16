import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  Boxes, 
  BarChart3, 
  Truck, 
  MailCheck, 
  RefreshCw,
  ArrowRight, 
  CheckCircle2,
  Layers,
  Sparkles,
  Zap,
  Activity
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { Reveal3D } from './Reveal3D';

interface SolutionsProps {
  onOpenAudit: (presetTitle?: string) => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onOpenAudit }) => {
  const solutions = [
    {
      id: 'invoices',
      code: 'FLOW_01 // INVOICE_ENTRY',
      title: 'Invoice & Document Auto-Entry',
      subtitle: 'PDF to Accounting Ledger Sync',
      description: 'Automatically reads incoming PDF customer invoices, vendor bills, and PO receipts directly into your accounting ERP.',
      details: [
        'Extracts line items, vendor tax IDs & dates automatically',
        'Direct sync with QuickBooks, Xero, SAP, NetSuite or Excel',
        'Zero manual typing and 100% data transcription accuracy'
      ],
      icon: <FileText className="w-5 h-5 text-[#F26522]" />,
      speed: '18 hrs / week saved',
      direction: 'left' as const
    },
    {
      id: 'inventory',
      code: 'FLOW_02 // SMART_STOCK',
      title: 'Smart Stock & Auto-Reorder Alerts',
      subtitle: 'Predictive Replenishment Loop',
      description: 'Monitors inventory balances across ERPs and spreadsheets to prevent stockouts and draft supplier reorders automatically.',
      details: [
        'Automated alert when SKU inventory drops below threshold',
        'Pre-calculates vendor reorder batch sizes based on lead time',
        'Real-time multi-warehouse balance sync across channels'
      ],
      icon: <Boxes className="w-5 h-5 text-amber-400" />,
      speed: '14 hrs / week saved',
      direction: 'up' as const
    },
    {
      id: 'reports',
      code: 'FLOW_03 // EXEC_BRIEF',
      title: 'Automated Daily Executive Briefs',
      subtitle: 'Evening KPI & Shift Aggregation',
      description: 'Stops supervisors from spending 2 hours every evening compiling spreadsheets, shift outputs, and production logs.',
      details: [
        'Pulls data from distributed shift logs and spreadsheets',
        'Sends 1-page visual summary to email / WhatsApp at 6:00 PM',
        'Instant alert if machine scrap or margin thresholds exceed limits'
      ],
      icon: <BarChart3 className="w-5 h-5 text-[#F26522]" />,
      speed: '10 hrs / week saved',
      direction: 'right' as const
    },
    {
      id: 'logistics',
      code: 'FLOW_04 // FREIGHT_TRACK',
      title: 'Order & Shipping Status Sync',
      subtitle: 'Carrier Webhooks & Notifications',
      description: 'Keeps customers and operations teams updated on shipments and carrier milestones automatically.',
      details: [
        'Automated tracking lookups across FedEx, UPS, freight & 3PL',
        'Instant customer SMS/WhatsApp delivery status updates',
        'Immediate notification if a transit delay is flagged'
      ],
      icon: <Truck className="w-5 h-5 text-amber-400" />,
      speed: '12 hrs / week saved',
      direction: 'left' as const
    },
    {
      id: 'suppliers',
      code: 'FLOW_05 // VENDOR_CHASE',
      title: 'Supplier & PO Confirmation Follow-up',
      subtitle: 'Automated Procurement Tracking',
      description: 'Automates purchase order confirmations and supplier delivery reminders without chasing endless email threads.',
      details: [
        'Automated reminders for pending vendor order confirmations',
        'Captures revised ETA dates and updates ERP schedule',
        'Full time-stamped audit trail of supplier communications'
      ],
      icon: <MailCheck className="w-5 h-5 text-[#F26522]" />,
      speed: '8 hrs / week saved',
      direction: 'up' as const
    },
    {
      id: 'sync',
      code: 'FLOW_06 // SYSTEM_SYNC',
      title: 'Spreadsheet & System Integration',
      subtitle: 'Two-Way Live Data Pipeline',
      description: 'Connects Excel, Google Sheets, ERP, and CRM so data never has to be copy-pasted twice between departments.',
      details: [
        'Two-way sync between legacy spreadsheets and modern apps',
        'Automated deduplication and business rule validation',
        'Eliminates broken formulas, manual exports, and out-of-sync files'
      ],
      icon: <RefreshCw className="w-5 h-5 text-amber-400" />,
      speed: '16 hrs / week saved',
      direction: 'right' as const
    }
  ];

  return (
    <section id="solutions" className="py-20 sm:py-28 bg-[#09090B] relative border-b border-zinc-800 overflow-hidden">
      {/* Precision Industrial Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f230f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f230f_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Reveal */}
        <Reveal3D direction="down" depth={35} rotation={8}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-3.5 backdrop-blur-sm shadow-inner">
              <Layers className="w-3.5 h-3.5 text-[#F26522]" />
              <span>AUTOMATION_MATRIX // 6 CORE WORKFLOWS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight leading-tight">
              Workflows we build for businesses.
            </h2>
            
            <p className="text-zinc-400 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              Each automation is custom-configured to integrate your exact tools without disrupting existing operational procedures.
            </p>
          </div>
        </Reveal3D>

        {/* 6 Clean Industrial Solution Cards with 3D Appear & Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((item, idx) => (
            <Reveal3D
              key={item.id}
              delay={idx * 0.07}
              direction={item.direction}
              depth={50}
              rotation={12}
              className="h-full"
            >
              <div className="group flex flex-col h-full relative">
                <SpotlightCard 
                  enable3DTilt={true}
                  maxTilt={10}
                  className="p-6 h-full flex flex-col justify-between group-hover:border-zinc-700 transition-all rounded-2xl shadow-xl hover:shadow-orange-500/10"
                >
                  {/* Industrial Corner Reticles */}
                  <div className="absolute top-2 left-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">┌</div>
                  <div className="absolute top-2 right-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">┐</div>
                  <div className="absolute bottom-2 left-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">└</div>
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">┘</div>

                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-orange-500/30 transition-colors shadow-sm">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                        {item.speed}
                      </span>
                    </div>

                    <div className="text-[10px] font-mono text-[#F26522] uppercase tracking-wider mb-1">
                      {item.code}
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-orange-300/80 font-mono mt-0.5">
                      {item.subtitle}
                    </p>

                    <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Bullet Points */}
                    <div className="mt-4 space-y-2 pt-3 border-t border-zinc-800/80">
                      {item.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#F26522] mt-0.5 shrink-0" />
                          <span className="leading-snug">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-zinc-800/80">
                    <button
                      onClick={() => onOpenAudit(item.title)}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white flex items-center justify-between transition-colors cursor-pointer group-hover:border-orange-500/30"
                    >
                      <span>Request this workflow</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F26522] group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </SpotlightCard>
              </div>
            </Reveal3D>
          ))}
        </div>

        {/* Matrix Bottom Guarantee */}
        <Reveal3D delay={0.25} direction="up" depth={30}>
          <div className="mt-12 text-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-6 p-3 px-6 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400 shadow-xl">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#F26522]" />
                Fixed $250 Starter Price
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Zero-Downtime Deployment
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300 font-semibold">
                100% Money-Back Guarantee
              </span>
            </div>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
