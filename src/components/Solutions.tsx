import React from 'react';
import { 
  ArrowRight, 
  ArrowUpRight,
  CheckCircle2, 
  Layers, 
  Zap, 
  Clock,
  Sparkles,
  FileText, 
  Boxes, 
  BarChart3, 
  Truck, 
  MailCheck, 
  RefreshCw,
  PhoneCall,
  Bell
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { Reveal3D } from './Reveal3D';
import { useSmoothScroll } from '../context/SmoothScrollContext';

interface SolutionsProps {
  onOpenAudit: (presetTitle?: string) => void;
}

interface UpcomingServiceItem {
  id: string;
  code: string;
  title: string;
  category: string;
  status: 'In Development' | 'Private Beta' | 'Coming Soon';
  statusColor: string;
  overview: string;
  timeSaved: string;
  icon: React.ReactNode;
}

export const Solutions: React.FC<SolutionsProps> = ({ onOpenAudit }) => {
  const { scrollTo } = useSmoothScroll();

  const upcomingServices: UpcomingServiceItem[] = [
    {
      id: 'invoice-ocr',
      code: 'ROADMAP // 01',
      title: 'Invoice & Receipt Auto-Entry',
      category: 'Accounting & ERP',
      status: 'In Development',
      statusColor: 'text-amber-700 bg-amber-50 border-amber-200/80',
      overview: 'Automatically extracts line items, totals, and vendor details from PDF invoices and posts them directly into your ERP or QuickBooks.',
      timeSaved: '~18 hrs/wk saved',
      icon: <FileText className="w-5 h-5 text-[#F26522]" />
    },
    {
      id: 'inventory-reorder',
      code: 'ROADMAP // 02',
      title: 'Predictive Stock & Smart Reorder',
      category: 'Warehouse & 3PL',
      status: 'Private Beta',
      statusColor: 'text-indigo-700 bg-indigo-50 border-indigo-200/80',
      overview: 'Continuously monitors multi-warehouse inventory levels and drafts supplier purchase orders before stockouts happen.',
      timeSaved: '~14 hrs/wk saved',
      icon: <Boxes className="w-5 h-5 text-indigo-600" />
    },
    {
      id: 'daily-briefs',
      code: 'ROADMAP // 03',
      title: 'Automated Daily Executive Briefs',
      category: 'Operations Intelligence',
      status: 'In Development',
      statusColor: 'text-amber-700 bg-amber-50 border-amber-200/80',
      overview: 'Compiles evening shift logs, production scrap metrics, and margin numbers into a concise 1-page digest delivered every evening.',
      timeSaved: '~10 hrs/wk saved',
      icon: <BarChart3 className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'logistics-sync',
      code: 'ROADMAP // 04',
      title: 'Order & Shipping Status Sync',
      category: 'Logistics & 3PL',
      status: 'Coming Soon',
      statusColor: 'text-slate-700 bg-slate-100 border-slate-200/80',
      overview: 'Connects carrier webhooks (FedEx, UPS, Freight) with customer SMS and internal ERP tracking to flag transit exceptions automatically.',
      timeSaved: '~12 hrs/wk saved',
      icon: <Truck className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'supplier-followup',
      code: 'ROADMAP // 05',
      title: 'Supplier PO Follow-up Agent',
      category: 'Procurement',
      status: 'Coming Soon',
      statusColor: 'text-slate-700 bg-slate-100 border-slate-200/80',
      overview: 'Automates pending purchase order confirmations with vendors, capturing revised delivery dates without manual email chasing.',
      timeSaved: '~8 hrs/wk saved',
      icon: <MailCheck className="w-5 h-5 text-violet-600" />
    },
    {
      id: 'db-sync',
      code: 'ROADMAP // 06',
      title: 'Two-Way Spreadsheet & DB Sync',
      category: 'Data Integration',
      status: 'Private Beta',
      statusColor: 'text-indigo-700 bg-indigo-50 border-indigo-200/80',
      overview: 'Maintains continuous bi-directional sync between Excel, Google Sheets, ERPs, and CRMs with automatic validation and deduplication.',
      timeSaved: '~16 hrs/wk saved',
      icon: <RefreshCw className="w-5 h-5 text-teal-600" />
    }
  ];

  return (
    <section 
      id="upcoming-services" 
      className="py-20 sm:py-28 bg-[#F8FAFC]/90 relative border-b border-slate-200/80 overflow-hidden"
    >
      {/* Target anchor for legacy #solutions links */}
      <div id="solutions" className="absolute -top-24 pointer-events-none" />

      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-r from-sky-200/30 via-orange-100/20 to-indigo-100/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal3D direction="down" depth={24} rotation={6}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 text-xs font-semibold mb-3.5 shadow-xs">
              <Layers className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Product Roadmap & Pipeline</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-tight">
              Upcoming Services
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              Our <span className="font-semibold text-slate-900">Voice Calling Agent</span> is our primary active service today. Below is an overview of our next production automations currently in development.
            </p>
          </div>
        </Reveal3D>

        {/* 6 Upcoming Services Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {upcomingServices.map((item, idx) => (
            <Reveal3D 
              key={item.id} 
              delay={0.04 * idx} 
              direction="up" 
              depth={24} 
              rotation={4} 
              className="h-full"
            >
              <div className="group flex flex-col h-full relative">
                <SpotlightCard
                  enable3DTilt={true}
                  maxTilt={6}
                  variant="glass"
                  className="p-6 sm:p-7 rounded-3xl h-full flex flex-col justify-between bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_15px_35px_rgba(15,23,42,0.05),inset_0_1px_2px_rgba(255,255,255,1)]"
                >
                  <div>
                    {/* Top Meta: Icon + Status Pill */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 shadow-xs group-hover:border-orange-200 transition-colors">
                        {item.icon}
                      </div>

                      <span className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${item.statusColor} shadow-xs`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Category & Title */}
                    <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                      {item.category}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-display text-slate-950 tracking-tight leading-snug">
                      {item.title}
                    </h3>

                    {/* Concise Overview (No bloated explanation) */}
                    <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {item.overview}
                    </p>
                  </div>

                  {/* Bottom Footer: Estimated Impact + Waitlist CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50/80 px-2 py-0.5 rounded border border-emerald-200/60">
                      {item.timeSaved}
                    </span>

                    <button
                      type="button"
                      onClick={() => onOpenAudit(`Upcoming Service Waitlist: ${item.title}`)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F26522] hover:text-[#DE5516] transition-colors cursor-pointer group/btn"
                    >
                      <span>Join Waitlist</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                  </div>
                </SpotlightCard>
              </div>
            </Reveal3D>
          ))}
        </div>

        {/* Live Service Highlight Banner at the bottom */}
        <Reveal3D delay={0.25} direction="up" depth={18}>
          <div className="mt-14 max-w-3xl mx-auto">
            <div className="p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-orange-200/80 shadow-[0_10px_30px_rgba(242,101,34,0.06)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F26522] shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>Autonomous Voice Calling Agent is Live</span>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Ready to deploy today with real-time phone calling, booking, and database sync.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => scrollTo('#voice-ai', { offset: -80, duration: 1.1 })}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#F26522] hover:bg-[#DE5516] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0 cursor-pointer"
              >
                <span>Try Live Voice Demo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};

export const UpcomingServices = Solutions;
