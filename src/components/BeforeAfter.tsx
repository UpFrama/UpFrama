import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Database, 
  FileSpreadsheet, 
  MessageSquare, 
  Mail, 
  Bell,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Reveal3D } from './Reveal3D';
import { SpotlightCard } from './SpotlightCard';

interface BeforeAfterProps {
  onOpenAudit: () => void;
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ onOpenAudit }) => {
  const [viewMode, setViewMode] = useState<'comparison' | 'before-only' | 'after-only'>('comparison');

  const comparisons = [
    {
      workflow: 'ERP Monitoring & Sync',
      code: 'DIFF_01 // ERP_SYNC',
      icon: <Database className="w-4 h-4 text-zinc-400" />,
      before: 'Staff opens ERP 15+ times a day to manually check statuses, copy order IDs, and refresh tables.',
      beforePain: 'Delayed supplier reactions, missed cutoffs, and 3+ hours lost per employee.',
      beforeLatency: '3 to 4 Hours / Day',
      after: 'Intelligent webhook trigger detects changes instantaneously and syncs databases in real time.',
      afterGain: '24/7 background monitoring with zero human intervention and instant Slack/Email pings.',
      afterLatency: '45 Milliseconds',
      deltaSpeed: '99.9% Faster'
    },
    {
      workflow: 'Shift & Production Reporting',
      code: 'DIFF_02 // SHIFT_REPORT',
      icon: <FileSpreadsheet className="w-4 h-4 text-zinc-400" />,
      before: 'Shift supervisor spends 90 minutes compiling scrap numbers, output logs, and Excel formulas.',
      beforePain: 'Broken formulas, missing sheets, and leadership only gets numbers the following day.',
      beforeLatency: '90 Minutes / Shift',
      after: 'Direct cloud pipeline reads production inputs, calculates variances, and delivers executive PDF at 6 PM.',
      afterGain: 'Automated 1-page visual executive briefing delivered straight to leadership WhatsApp & Inbox.',
      afterLatency: 'Instant (6:00 PM)',
      deltaSpeed: '100% Automated'
    },
    {
      workflow: 'Customer Order & Inventory Queries',
      code: 'DIFF_03 // ORDER_LOOKUP',
      icon: <MessageSquare className="w-4 h-4 text-zinc-400" />,
      before: 'Customer support places callers on hold, searches 3 disconnected legacy systems, and writes back.',
      beforePain: 'Support tickets backlog, phone wait times increase, and manual typo errors.',
      beforeLatency: '8 - 15 Mins / Ticket',
      after: 'AI Assistant queries database in milliseconds and responds directly on WhatsApp, Slack, or Portal.',
      afterGain: 'Instant customer satisfaction, 24/7 self-serve responses, and zero ticket queues.',
      afterLatency: '< 1.2 Seconds',
      deltaSpeed: '98% Queue Reduction'
    },
    {
      workflow: 'Supplier PO Follow-ups & Confirmations',
      code: 'DIFF_04 // PO_CHASE',
      icon: <Mail className="w-4 h-4 text-zinc-400" />,
      before: 'Procurement manager manually drafts follow-up emails one by one to chase overdue vendor shipments.',
      beforePain: 'Forgotten supplier follow-ups, factory line stoppages, and missing ETAs.',
      beforeLatency: '10+ Hours / Week',
      after: 'System monitors expected arrival dates, automatically pings suppliers, and updates ERP with confirmed dates.',
      afterGain: 'Proactive supply chain defense with complete audit logs and zero forgotten orders.',
      afterLatency: 'Continuous Cron',
      deltaSpeed: 'Zero Stockouts'
    },
    {
      workflow: 'Executive Metric Visibility',
      code: 'DIFF_05 // ANOMALY_ALERT',
      icon: <Bell className="w-4 h-4 text-zinc-400" />,
      before: 'Executives wait for weekly team meetings to discover margin leaks or machine downtime.',
      beforePain: 'Losses compound for days or weeks before any corrective action can be taken.',
      beforeLatency: '7 Days Lag',
      after: 'Real-time threshold sent to leadership mobile phone the minute scrap exceeds 0.5% or margins drop.',
      afterGain: 'Immediate proactive decision making while issues are still small.',
      afterLatency: 'Real-Time Alert',
      deltaSpeed: 'Instant Intervention'
    }
  ];

  return (
    <section 
      id="transformation"
      className="py-20 sm:py-28 bg-[#09090B] relative border-b border-zinc-800 overflow-hidden"
    >
      {/* Subtle Industrial Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f230f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f230f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Depth */}
        <Reveal3D direction="down" depth={35} rotation={8}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-3.5 backdrop-blur-sm">
              <Zap className="w-3.5 h-3.5 text-[#F26522]" />
              <span>TRANSFORMATION_DELTA // BEFORE VS AFTER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight leading-tight">
              See the exact operational transformation.
            </h2>
            
            <p className="text-zinc-400 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              Compare manual daily friction against automated software pipelines. Clean, reliable, and error-free.
            </p>

            {/* High-Level Delta Summary Badges with 3D Pop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6 max-w-2xl mx-auto text-left font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#111114] border border-zinc-800 flex items-center gap-2.5 shadow-md">
                <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-400 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Labor Latency</span>
                  <span className="text-white font-bold">-85% to -99%</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#111114] border border-zinc-800 flex items-center gap-2.5 shadow-md">
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Error Rate</span>
                  <span className="text-emerald-400 font-bold">0.00% Verified</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#111114] border border-zinc-800 flex items-center gap-2.5 col-span-2 sm:col-span-1 shadow-md">
                <div className="p-2 rounded-lg bg-orange-950/40 border border-orange-800/40 text-[#F26522] shrink-0">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block">Annual Savings</span>
                  <span className="text-white font-bold">$25,000+ / Flow</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal3D>

        {/* View Mode Toggle Controls */}
        <Reveal3D delay={0.1} direction="up" depth={20}>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="p-1 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-1 text-xs font-mono shadow-lg">
              <button
                onClick={() => setViewMode('comparison')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'comparison'
                    ? 'bg-[#F26522] text-white font-semibold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Side-by-Side Comparison
              </button>
              <button
                onClick={() => setViewMode('before-only')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'before-only'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Manual Friction (Before)
              </button>
              <button
                onClick={() => setViewMode('after-only')}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'after-only'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Automated UpFrama (After)
              </button>
            </div>
          </div>
        </Reveal3D>

        {/* ======================================================== */}
        {/* 3D PERSPECTIVE COMPARISON MATRIX                         */}
        {/* ======================================================== */}
        <Reveal3D delay={0.18} direction="up" depth={60} rotation={10}>
          <div className="max-w-5xl mx-auto rounded-2xl bg-[#111114] border border-zinc-800 overflow-hidden shadow-2xl relative">
            {/* Matrix Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 bg-[#16161A] border-b border-zinc-800 text-xs font-mono font-semibold uppercase tracking-wider">
              {(viewMode === 'comparison' || viewMode === 'before-only') && (
                <div className="p-4 flex items-center justify-between text-rose-400 border-b md:border-b-0 md:border-r border-zinc-800">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-rose-500" />
                    <span>MANUAL FRICTION [LEGACY]</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 lowercase">high human overhead</span>
                </div>
              )}

              {(viewMode === 'comparison' || viewMode === 'after-only') && (
                <div className={`p-4 flex items-center justify-between text-emerald-400 ${viewMode === 'after-only' ? 'md:col-span-2' : ''}`}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>UPFRAMA AUTOMATED PIPELINE</span>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-mono">100% zero-touch</span>
                </div>
              )}
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-zinc-800/80">
              {comparisons.map((item, idx) => (
                <div
                  key={item.workflow}
                  className="grid grid-cols-1 md:grid-cols-2 hover:bg-zinc-900/30 transition-colors"
                >
                  {/* BEFORE Column */}
                  {(viewMode === 'comparison' || viewMode === 'before-only') && (
                    <div className={`p-5 border-b md:border-b-0 ${viewMode === 'comparison' ? 'md:border-r border-zinc-800/80' : 'md:col-span-2'} flex flex-col justify-between`}>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                            {item.code}
                          </span>
                          <span className="text-[10px] font-mono text-rose-400 bg-rose-950/40 border border-rose-800/40 px-2 py-0.5 rounded">
                            {item.beforeLatency}
                          </span>
                        </div>

                        <div className="text-sm font-semibold text-zinc-200">
                          {item.before}
                        </div>

                        <div className="text-xs text-zinc-400 mt-2 flex items-start gap-2 bg-zinc-950/60 p-2.5 rounded-lg border border-zinc-800/60">
                          <ShieldAlert className="w-3.5 h-3.5 text-rose-400 mt-0.5 shrink-0" />
                          <span>{item.beforePain}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* AFTER Column */}
                  {(viewMode === 'comparison' || viewMode === 'after-only') && (
                    <div className={`p-5 bg-zinc-900/20 flex flex-col justify-between ${viewMode === 'after-only' ? 'md:col-span-2' : ''}`}>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            AUTOMATED WORKFLOW
                          </span>
                          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded font-bold">
                            {item.afterLatency}
                          </span>
                        </div>

                        <div className="text-sm font-semibold text-white">
                          {item.after}
                        </div>

                        <div className="text-xs text-emerald-200/90 mt-2 flex items-start gap-2 bg-emerald-950/30 p-2.5 rounded-lg border border-emerald-800/40">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{item.afterGain}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span>Performance Delta:</span>
                        <span className="text-orange-400 font-bold">{item.deltaSpeed}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Matrix Footer Callout */}
            <div className="p-4 bg-[#141418] border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F26522]" />
                <span>Ready to transform your company's manual bottlenecks?</span>
              </div>
              <button
                onClick={onOpenAudit}
                className="text-[#F26522] hover:text-orange-300 font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <span>Get Your Custom Before/After Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
