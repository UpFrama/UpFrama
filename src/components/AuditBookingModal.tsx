import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Mail, 
  User, 
  ShieldCheck,
  Check,
  FileCheck2,
  Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AuditFormData } from '../types';

interface AuditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPreset?: string;
}

export const AuditBookingModal: React.FC<AuditBookingModalProps> = ({
  isOpen,
  onClose,
  initialPreset = 'Invoice & Document Entry',
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<AuditFormData>({
    industry: 'Manufacturing',
    primaryBottleneck: initialPreset || 'Invoice & Document Entry',
    currentErpStack: ['Microsoft Excel / Google Sheets', 'QuickBooks / Xero'],
    weeklyManualHours: '15 - 30 hrs/wk',
    fullName: '',
    workEmail: '',
    companyName: '',
    preferredDate: '2026-08-20',
    preferredTime: '10:00 AM (EST)',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
    } else if (step === 3) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setStep(4);
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#F26522', '#DE5516', '#FFFFFF', '#71717A']
          });
        } catch (e) {
          // ignore
        }
      }, 500);
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 4) {
      setStep((prev) => (prev - 1) as any);
    }
  };

  const toggleErpStack = (erpName: string) => {
    if (formData.currentErpStack.includes(erpName)) {
      setFormData({
        ...formData,
        currentErpStack: formData.currentErpStack.filter((s) => s !== erpName),
      });
    } else {
      setFormData({
        ...formData,
        currentErpStack: [...formData.currentErpStack, erpName],
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-xl rounded-2xl bg-[#111114] border border-zinc-800 shadow-2xl overflow-hidden z-10 my-8">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#09090B] border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-display">
              Request a Free Workflow Blueprint
            </h3>
            <p className="text-xs text-zinc-400">
              100% Free • Tailored Architecture Roadmap • No obligations
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-step progress line */}
        {step < 4 && (
          <div className="px-6 py-2.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 1 ? 'bg-[#F26522] text-white' : 'bg-zinc-900 text-zinc-500'
              }`}>
                1
              </span>
              <span className={step === 1 ? 'text-white font-medium' : 'text-zinc-500'}>Your Process</span>
            </div>
            <div className="h-px w-8 bg-zinc-800" />
            <div className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 2 ? 'bg-[#F26522] text-white' : 'bg-zinc-900 text-zinc-500'
              }`}>
                2
              </span>
              <span className={step === 2 ? 'text-white font-medium' : 'text-zinc-500'}>Your Tools</span>
            </div>
            <div className="h-px w-8 bg-zinc-800" />
            <div className="flex items-center gap-2">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 3 ? 'bg-[#F26522] text-white' : 'bg-zinc-900 text-zinc-500'
              }`}>
                3
              </span>
              <span className={step === 3 ? 'text-white font-medium' : 'text-zinc-500'}>Contact</span>
            </div>
          </div>
        )}

        {/* Modal Form Body */}
        <div className="p-6">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-5">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
                  1. Select your Industry
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Manufacturing', 'Warehouse / Distribution', 'Logistics & Shipping', 'General Business'].map((ind) => (
                    <button
                      type="button"
                      key={ind}
                      onClick={() => setFormData({ ...formData, industry: ind })}
                      className={`p-2.5 rounded-lg border text-center text-xs font-medium transition-colors cursor-pointer ${
                        formData.industry === ind
                          ? 'bg-[#F26522] text-white border-[#F26522] font-semibold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
                  2. What task do you want to automate?
                </label>
                <div className="space-y-1.5">
                  {[
                    'Invoice & Order Entry (Auto-read PDFs into accounting)',
                    'Smart Stock & Low Inventory Alerts (Auto-draft reorders)',
                    'Automated Daily / Shift Reports (End spreadsheet copy-pasting)',
                    'Order Tracking & Customer Follow-ups (Carrier updates)',
                    'Spreadsheet & Database Sync (Keep Excel & ERP in sync)',
                    'Other Custom Repetitive Process'
                  ].map((btn) => (
                    <button
                      type="button"
                      key={btn}
                      onClick={() => setFormData({ ...formData, primaryBottleneck: btn })}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        formData.primaryBottleneck === btn
                          ? 'bg-zinc-900 border-zinc-600 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span>{btn}</span>
                      {formData.primaryBottleneck === btn && (
                        <Check className="w-3.5 h-3.5 text-[#F26522]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
                  3. Approximate Manual Hours Lost Per Week
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['< 10 hrs/wk', '10 - 25 hrs/wk', '25 - 50 hrs/wk', '50+ hrs/wk'].map((h) => (
                    <button
                      type="button"
                      key={h}
                      onClick={() => setFormData({ ...formData, weeklyManualHours: h })}
                      className={`p-2 rounded-lg border text-center text-xs font-medium transition-colors cursor-pointer ${
                        formData.weeklyManualHours === h
                          ? 'bg-zinc-200 text-zinc-900 font-semibold border-zinc-200'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#F26522] hover:bg-[#DE5516] text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  <span>Next: Your Tools</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-5">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                  Select Your Current Tools
                </label>
                <p className="text-xs text-zinc-500 mb-2.5">
                  We connect directly to what you use — no new software required.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Microsoft Excel / Google Sheets',
                    'QuickBooks / Xero',
                    'Gmail / Outlook Email',
                    'SAP / Oracle NetSuite',
                    'Microsoft Dynamics / Odoo',
                    'WhatsApp / Slack',
                    'Salesforce / HubSpot',
                    'FedEx / UPS Tracking',
                    'Custom SQL Database'
                  ].map((sys) => {
                    const isChecked = formData.currentErpStack.includes(sys);
                    return (
                      <button
                        type="button"
                        key={sys}
                        onClick={() => toggleErpStack(sys)}
                        className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-zinc-900 border-zinc-600 text-white'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <span className="truncate">{sys}</span>
                        {isChecked && <Check className="w-3 h-3 text-[#F26522] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Logistics or Pacific Supply"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-zinc-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-zinc-950 text-zinc-400 hover:text-white text-xs border border-zinc-800 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#F26522] hover:bg-[#DE5516] text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  <span>Next: Contact Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-zinc-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-zinc-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                  Briefly describe your process (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. We receive 20 PDF invoices per day in Outlook and type them into Excel and QuickBooks..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs focus:border-zinc-600 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-zinc-950 text-zinc-400 hover:text-white text-xs border border-zinc-800 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#F26522] hover:bg-[#DE5516] text-white font-medium text-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Get Free Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h4 className="text-lg font-bold text-white font-display">
                Request Received!
              </h4>

              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Our engineering team is preparing your custom automation blueprint for <strong className="text-white">{formData.companyName || 'your team'}</strong>.
              </p>

              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-left max-w-md mx-auto text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Selected Workflow:</span>
                  <span className="text-zinc-300 font-medium">{formData.primaryBottleneck}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Confirmation Sent To:</span>
                  <span className="text-zinc-300 font-medium">{formData.workEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Deliverable:</span>
                  <span className="text-emerald-400 font-medium">Tailored Architecture Blueprint</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold border border-zinc-800 transition-colors cursor-pointer"
                >
                  Close & Return to Site
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
