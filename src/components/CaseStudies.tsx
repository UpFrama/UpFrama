import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  Quote, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  BarChart3 
} from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudiesProps {
  onOpenAudit: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenAudit }) => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);

  const caseStudies: CaseStudy[] = [
    {
      id: 'apex-freight',
      company: 'Apex Logistics Global',
      industry: 'Freight & Intermodal 3PL',
      logoText: 'APEX LOGISTICS',
      challenge: 'Managing over 30,000 monthly paper/PDF Bills of Lading, delivery receipts, and accessorial carrier invoices across 120 regional partners. A team of 14 coordinators spent 65% of their workday doing repetitive data re-entry into McLeod TMS and QuickBooks.',
      solution: 'UpFrama deployed an autonomous vision ingestion pipeline with real-time EDI validation and automatic 3-way tariff matching. Invoices under tolerance thresholds auto-clear in under 2 seconds; variances are flagged with highlighted bounding boxes.',
      results: {
        metric1: { value: '84%', label: 'Cycle Time Reduction' },
        metric2: { value: '$340k', label: 'Annual Labor & Error Savings' },
        metric3: { value: '99.92%', label: 'Document Field Precision' }
      },
      testimonial: {
        quote: 'UpFrama transformed our back-office from a chaotic bottleneck into our greatest competitive advantage. Invoices that took 3 days now settle in under 10 seconds.',
        author: 'Marcus Vance',
        role: 'VP of Transportation & Logistics',
        company: 'Apex Logistics Global',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      techStack: ['McLeod TMS', 'EDI 850/810', 'Vision AI OCR', 'QuickBooks Enterprise']
    },
    {
      id: 'vanguard-mfg',
      company: 'Vanguard Precision Mfg',
      industry: 'Industrial Equipment & CNC',
      logoText: 'VANGUARD MFG',
      challenge: 'Processing complex 1,000+ line item bills of materials (BOMs) from engineering PDFs and vendor quotes into SAP S/4HANA. Material entry delays stalled production scheduling by an average of 4.5 days per assembly run.',
      solution: 'UpFrama built a bidirectional SAP connector that ingests raw engineering quotes, validates part numbers against the SAP material master, checks lead-time tolerances, and auto-generates production work orders without human intervention.',
      results: {
        metric1: { value: '4.5 Days → 4 Mins', label: 'BOM-to-ERP Processing' },
        metric2: { value: '100%', label: 'Elimination of Manual Typos' },
        metric3: { value: '$420k', label: 'Annual Operational Recovery' }
      },
      testimonial: {
        quote: 'The accuracy is astonishing. We threw multi-page German and Japanese technical quotes at it and UpFrama matched every single part number to our SAP database seamlessly.',
        author: 'Elena Rostova',
        role: 'Director of Supply Chain Technology',
        company: 'Vanguard Precision Mfg',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      },
      techStack: ['SAP S/4HANA', 'BOM Vector Matcher', 'CAD/Excel Parser', 'Production API']
    },
    {
      id: 'nordic-fulfillment',
      company: 'Nordic Fulfillment Hub',
      industry: 'Warehousing & E-commerce 3PL',
      logoText: 'NORDIC FULFILLMENT',
      challenge: 'Receiving dock bottlenecks across 4 distribution centers. Dock workers had to manually audit inbound pallet manifests against EDI 856 advance shipping notices, delaying available inventory release on Shopify and NetSuite by 24 to 48 hours.',
      solution: 'Integrated Zebra handheld scanners and dock IoT cameras with Manhattan WMS via UpFrama event streams. Inbound pallets are scanned, verified against EDI manifests, and auto-slotted to warehouse bins within 90 seconds.',
      results: {
        metric1: { value: '88%', label: 'Faster Dock-to-Stock Speed' },
        metric2: { value: '99.98%', label: 'Inventory Bin Accuracy' },
        metric3: { value: '18 hrs → 90s', label: 'Shopify Stock Live Release' }
      },
      testimonial: {
        quote: 'Our clients love how fast their stock goes live. We eliminated receiving backlogs entirely, even during peak Q4 holiday surges.',
        author: 'Soren Lindqvist',
        role: 'Head of Warehouse Operations',
        company: 'Nordic Fulfillment Hub',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      techStack: ['Manhattan WMS', 'Oracle NetSuite', 'Zebra RFID', 'Shopify Plus']
    },
    {
      id: 'kitescale-startup',
      company: 'KiteScale Cloud',
      industry: 'High-Growth Tech Startup',
      logoText: 'KITESCALE',
      challenge: 'Manual billing reconciliation between Stripe, Salesforce enterprise deals, and custom AWS/GCP usage data. Complex multi-tier usage overages were causing revenue leakage and taking 3 days of manual engineering effort every month.',
      solution: 'UpFrama established an automated billing & data warehouse pipeline that computes real-time usage telemetry, creates tiered Stripe invoices, and reconciles CRM commission logs automatically.',
      results: {
        metric1: { value: '100%', label: 'Automated Invoice Generation' },
        metric2: { value: '0 Missing', label: 'Overage Revenue Captured' },
        metric3: { value: '3 Weeks/Qtr', label: 'Engineering Hours Saved' }
      },
      testimonial: {
        quote: 'Instead of hiring two operations specialists and spending months writing custom billing scripts, UpFrama solved our entire cross-platform sync in 10 days.',
        author: 'Chloe Zhang',
        role: 'VP of Finance & Operations',
        company: 'KiteScale Cloud',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
      },
      techStack: ['Stripe Invoicing', 'Salesforce CRM', 'PostgreSQL ETL', 'Slack Webhooks']
    }
  ];

  const currentCase = caseStudies[activeCaseIdx];

  return (
    <section id="case-studies" className="py-24 bg-[#0A0402] relative border-t border-orange-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            PROVEN QUANTIFIABLE OUTCOMES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
            Real Results from Real Operations
          </h2>
          <p className="text-stone-300 text-base sm:text-lg mt-4">
            See how manufacturing, logistics, and warehousing leaders eliminated back-office bottlenecks with UpFrama.
          </p>
        </div>

        {/* Company Selector Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {caseStudies.map((cs, idx) => (
            <button
              key={cs.id}
              onClick={() => setActiveCaseIdx(idx)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeCaseIdx === idx
                  ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-600/30'
                  : 'bg-[#140804] text-stone-400 hover:text-stone-200 border border-orange-500/15'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{cs.company}</span>
            </button>
          ))}
        </div>

        {/* Main Case Study Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#120703] border border-orange-500/25 p-7 sm:p-10 shadow-2xl shadow-orange-950/40 relative overflow-hidden">
          {/* Subtle warm glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-600/10 blur-3xl pointer-events-none rounded-full" />

          {/* Top Company Bar */}
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-orange-500/15 gap-4">
            <div>
              <span className="text-xs font-mono text-orange-400 uppercase tracking-wider font-semibold">
                Case Study • {currentCase.industry}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
                {currentCase.company}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {currentCase.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-[#0A0402] text-stone-300 border border-orange-500/20 text-[11px] font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 3 Metric Scorecard Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="p-5 rounded-2xl bg-[#180A05] border border-orange-500/20 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-display">
                {currentCase.results.metric1.value}
              </span>
              <span className="text-xs font-mono text-stone-400 block mt-1.5 uppercase font-medium">
                {currentCase.results.metric1.label}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#180A05] border border-orange-500/20 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] to-orange-300 font-display">
                {currentCase.results.metric2.value}
              </span>
              <span className="text-xs font-mono text-stone-400 block mt-1.5 uppercase font-medium">
                {currentCase.results.metric2.label}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#180A05] border border-orange-500/20 text-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-200 font-display">
                {currentCase.results.metric3.value}
              </span>
              <span className="text-xs font-mono text-stone-400 block mt-1.5 uppercase font-medium">
                {currentCase.results.metric3.label}
              </span>
            </div>
          </div>

          {/* Challenge & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="p-6 rounded-2xl bg-[#140804] border border-orange-500/15">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-2">
                The Operational Challenge
              </span>
              <p className="text-sm text-stone-300 leading-relaxed">
                {currentCase.challenge}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#140804] border border-orange-500/15">
              <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider block mb-2">
                The UpFrama Solution
              </span>
              <p className="text-sm text-stone-300 leading-relaxed">
                {currentCase.solution}
              </p>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#200D06] via-[#180A05] to-[#120703] border border-orange-500/25 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={currentCase.testimonial.avatarUrl}
              alt={currentCase.testimonial.author}
              className="w-14 h-14 rounded-full object-cover border-2 border-orange-500/40 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-1 flex-1">
              <p className="text-sm sm:text-base italic text-stone-200">
                "{currentCase.testimonial.quote}"
              </p>
              <div className="text-xs text-stone-400 font-medium pt-1">
                <strong className="text-white font-semibold">{currentCase.testimonial.author}</strong> — {currentCase.testimonial.role}, {currentCase.testimonial.company}
              </div>
            </div>
          </div>

          {/* Card CTA */}
          <div className="mt-8 pt-6 border-t border-orange-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-400 font-mono">
              Ready to achieve similar benchmark results for your company?
            </div>
            <button
              onClick={onOpenAudit}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F26522] via-[#FF7A1A] to-[#EA580C] text-white font-bold text-sm shadow-lg shadow-orange-600/30 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <span>Book Your Automation Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
