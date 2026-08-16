import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sliders, 
  Cpu, 
  Zap,
  Gauge
} from 'lucide-react';

interface FaqAndDiagnosticProps {
  onOpenAudit: (preset?: string) => void;
}

export const FaqAndDiagnostic: React.FC<FaqAndDiagnosticProps> = ({ onOpenAudit }) => {
  // Diagnostic state
  const [diagStep, setDiagStep] = useState<number>(1);
  const [selectedBottleneck, setSelectedBottleneck] = useState<string>('Document & Invoice Entry');
  const [selectedErp, setSelectedErp] = useState<string>('SAP S/4HANA');
  const [selectedHours, setSelectedHours] = useState<string>('30 - 80 hrs/wk');
  const [diagnosticComplete, setDiagnosticComplete] = useState<boolean>(false);

  // FAQ accordion state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How does UpFrama connect to our legacy ERP without disrupting existing operations?',
      answer: 'We utilize non-invasive REST APIs, secure webhooks, RFC/BAPI connectors (for SAP), and direct database read/write buffers. We never modify your core ERP source code or alter existing database schemas. All changes run through isolated test harnesses and shadow-mode verification before live cutover.'
    },
    {
      question: 'Is our corporate and supplier data safe? Do you train AI models on our proprietary files?',
      answer: 'Absolutely not. UpFrama operates under a strict Zero Data Retention policy for AI model training. All document processing happens in isolated, encrypted memory containers. We comply with enterprise SOC-2 Type II controls, GDPR, and enforce 256-bit AES encryption at rest and TLS 1.3 in transit.'
    },
    {
      question: 'What happens when a scanned document is distorted, handwritten, or has unusual formatting?',
      answer: 'Our multimodal vision models are trained specifically on messy industrial and logistics paperwork. In addition, every pipeline features configurable confidence guardrails (e.g., 99.5%). High-confidence documents are processed automatically in milliseconds; any uncertain anomalies are routed to a clean Human-in-the-Loop exception dashboard for one-click staff review.'
    },
    {
      question: 'How fast can UpFrama go from initial audit to live deployment?',
      answer: 'We deliver your custom automation architecture blueprint following our initial discovery call, outlining an exact milestone plan, sandbox testing phase, and staff runbook training with zero operational downtime.'
    },
    {
      question: 'What ongoing support and SLAs does UpFrama provide after launch?',
      answer: 'We provide an enterprise 99.98% pipeline uptime SLA with 24/7 telemetry monitoring. When vendor document layouts change or new fields are introduced, our self-healing schema adaptors adjust automatically. You also receive direct Slack/Teams channel access to our senior engineering team.'
    }
  ];

  const handleRunDiagnostic = () => {
    setDiagnosticComplete(true);
  };

  return (
    <section className="py-24 bg-[#0A0402] relative border-t border-orange-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* INTERACTIVE AUTOMATION READINESS DIAGNOSTIC WIDGET */}
        {/* ======================================================== */}
        <div className="mb-24 rounded-3xl bg-gradient-to-b from-[#160904] via-[#120703] to-[#0A0402] border border-orange-500/25 p-7 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium mb-3">
              <Gauge className="w-3.5 h-3.5" />
              INTERACTIVE READINESS EVALUATOR
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
              Evaluate Your Automation Potential in 60 Seconds
            </h3>
            <p className="text-stone-300 text-sm sm:text-base mt-2">
              Select your current setup to generate an instant feasibility score and customized engineering recommendation.
            </p>
          </div>

          {!diagnosticComplete ? (
            <div className="max-w-3xl mx-auto space-y-8">
              
              {/* Question 1: Bottleneck */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold block mb-3">
                  1. What is your most time-consuming operational bottleneck?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Document & Invoice Entry (PO/BOL/Invoices)',
                    'ERP & System Data Re-keying (SAP/NetSuite)',
                    'Inbound Receiving & Warehouse ASN Matching',
                    'Cross-Stack Startup Billing & CRM Sync'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedBottleneck(option)}
                      className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        selectedBottleneck === option
                          ? 'bg-orange-500/20 border-orange-500 text-white shadow-md'
                          : 'bg-[#0E0502] border-orange-500/15 text-stone-300 hover:border-orange-500/35'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: ERP Stack */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold block mb-3">
                  2. What primary ERP or core operational system do you run?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    'SAP S/4HANA',
                    'Oracle NetSuite',
                    'Microsoft Dynamics',
                    'Manhattan / HighJump WMS',
                    'QuickBooks Ent.',
                    'Shopify Plus / Stripe',
                    'Postgres / Custom DB',
                    'Spreadsheets / Other'
                  ].map((erp) => (
                    <button
                      key={erp}
                      onClick={() => setSelectedErp(erp)}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        selectedErp === erp
                          ? 'bg-amber-500/20 border-amber-400 text-white shadow-md'
                          : 'bg-[#0E0502] border-orange-500/15 text-stone-300 hover:border-orange-500/35'
                      }`}
                    >
                      {erp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Manual Hours */}
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold block mb-3">
                  3. Approximate manual hours spent on this workflow each week across your team:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['< 15 hrs/wk', '15 - 30 hrs/wk', '30 - 80 hrs/wk', '80+ hrs/wk'].map((hrs) => (
                    <button
                      key={hrs}
                      onClick={() => setSelectedHours(hrs)}
                      className={`p-3 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        selectedHours === hrs
                          ? 'bg-orange-500/25 border-orange-400 text-white shadow-md'
                          : 'bg-[#0E0502] border-orange-500/15 text-stone-300 hover:border-orange-500/35'
                      }`}
                    >
                      {hrs}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Evaluation */}
              <div className="pt-4 text-center">
                <button
                  id="run-diagnostic-btn"
                  onClick={handleRunDiagnostic}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#F26522] via-[#FF7A1A] to-[#EA580C] hover:from-orange-500 hover:to-orange-400 text-white font-bold text-sm shadow-xl shadow-orange-600/30 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Instant Automation Diagnostic</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            /* Diagnostic Result View */
            <div className="max-w-2xl mx-auto rounded-2xl bg-[#0A0402] border border-orange-500/40 p-6 sm:p-8 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/15 border border-orange-500/35 text-orange-400 mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono text-orange-400 font-bold uppercase tracking-wider">
                  Diagnostic Result: Prime Automation Candidate
                </span>
                <h4 className="text-3xl font-bold font-display text-white mt-1">
                  96.8% Automation Feasibility Score
                </h4>
                <p className="text-sm text-stone-300 mt-2 max-w-lg mx-auto">
                  Based on your bottleneck ({selectedBottleneck}) and system ({selectedErp}), UpFrama has pre-engineered connectors that can automate <strong>90–95%</strong> of this pipeline with estimated payback in <strong>14 days</strong>.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono text-left bg-[#140804] p-4 rounded-xl border border-orange-500/20">
                <div>
                  <span className="text-stone-500 block text-[10px]">INTEGRATION SPEED</span>
                  <strong className="text-white">~10 Business Days</strong>
                </div>
                <div>
                  <span className="text-stone-500 block text-[10px]">CONNECTOR READINESS</span>
                  <strong className="text-orange-400">Pre-Engineered</strong>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-stone-500 block text-[10px]">SLA LEVEL</span>
                  <strong className="text-amber-300">99.98% Guardrailed</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => onOpenAudit(selectedBottleneck)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#F26522] via-[#FF7A1A] to-[#EA580C] text-white font-bold text-sm shadow-lg shadow-orange-600/30 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <span>Book Free Process Blueprint for This Flow</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDiagnosticComplete(false)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#140804] hover:bg-[#1A0C06] text-stone-400 hover:text-white text-xs font-semibold border border-orange-500/20 transition-colors cursor-pointer"
                >
                  Re-run Diagnostic
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* ENTERPRISE FAQ SECTION */}
        {/* ======================================================== */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-medium mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h3 className="text-3xl font-bold font-display text-white tracking-tight">
              Everything You Need to Know
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#120703] border border-orange-500/20 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-white hover:text-orange-400 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded-lg bg-[#0A0402] border border-orange-500/25 text-stone-400 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-stone-300 leading-relaxed border-t border-orange-500/15">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
