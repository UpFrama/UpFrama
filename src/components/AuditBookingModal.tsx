import React, { useState, useEffect } from 'react';
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
  Phone, 
  Sparkles 
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
  initialPreset = '24/7 Inbound Voice Call Answering',
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<AuditFormData>({
    industry: 'Customer Support',
    primaryBottleneck: initialPreset || '24/7 Inbound Voice Call Answering',
    currentErpStack: ['Twilio / SIP Phone Line', 'Google Calendar / Outlook'],
    weeklyManualHours: '15 - 30 hrs/wk',
    fullName: '',
    workEmail: '',
    companyName: '',
    preferredDate: '2026-08-20',
    preferredTime: '10:00 AM (EST)',
    notes: '',
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (initialPreset) {
        setFormData((prev) => ({
          ...prev,
          primaryBottleneck: initialPreset,
        }));
      }
    }
  }, [isOpen, initialPreset]);

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
            colors: ['#F26522', '#EA580C', '#0F172A', '#10B981']
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
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-xl rounded-3xl bg-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_25px_60px_rgba(15,23,42,0.25),inset_0_1px_2px_rgba(255,255,255,1)] overflow-hidden z-10 my-8">
        {/* Top Header */}
        <div className="px-6 py-4.5 bg-white/60 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 font-display">
              Request a Free Voice Agent Blueprint
            </h3>
            <p className="text-xs text-slate-500">
              100% Free • Custom Conversational Architecture • Zero Disruption
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/80 backdrop-blur-xs border border-white/90 text-slate-500 hover:text-slate-900 hover:bg-white transition-colors cursor-pointer shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-step progress line */}
        {step < 4 && (
          <div className="px-6 py-3 bg-white/40 backdrop-blur-sm border-b border-slate-200/50 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 1 ? 'bg-[#F26522] text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                1
              </span>
              <span className={step === 1 ? 'text-slate-900 font-bold' : 'text-slate-500'}>Call Flow</span>
            </div>
            <div className="h-px w-8 bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 2 ? 'bg-[#F26522] text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                2
              </span>
              <span className={step === 2 ? 'text-slate-900 font-bold' : 'text-slate-500'}>Your Stack</span>
            </div>
            <div className="h-px w-8 bg-slate-300" />
            <div className="flex items-center gap-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step >= 3 ? 'bg-[#F26522] text-white' : 'bg-slate-200 text-slate-500'
              }`}>
                3
              </span>
              <span className={step === 3 ? 'text-slate-900 font-bold' : 'text-slate-500'}>Contact</span>
            </div>
          </div>
        )}

        {/* Modal Form Body */}
        <div className="p-6">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-5">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block mb-2">
                  1. Select your Industry
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Customer Support', 'Healthcare & Clinics', 'Home Services & Trades', 'Professional Services'].map((ind) => (
                    <button
                      type="button"
                      key={ind}
                      onClick={() => setFormData({ ...formData, industry: ind })}
                      className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        formData.industry === ind
                          ? 'bg-[#F26522] text-white border-[#F26522] shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block mb-2">
                  2. What voice call flow do you need?
                </label>
                <div className="space-y-1.5">
                  {[
                    '24/7 Inbound Customer Reception & FAQs',
                    'Voice Appointment & Calendar Booking Line',
                    'Order Status & Delivery Tracking Hotline',
                    'After-Hours Inbound Lead Qualifier',
                    'Custom Inbound Telephony Flow'
                  ].map((btn) => (
                    <button
                      type="button"
                      key={btn}
                      onClick={() => setFormData({ ...formData, primaryBottleneck: btn })}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${
                        formData.primaryBottleneck === btn
                          ? 'bg-orange-50 border-orange-300 text-slate-900 font-bold shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
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
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block mb-2">
                  3. Approximate Manual Hours Lost Per Week
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['< 10 hrs/wk', '10 - 25 hrs/wk', '25 - 50 hrs/wk', '50+ hrs/wk'].map((h) => (
                    <button
                      type="button"
                      key={h}
                      onClick={() => setFormData({ ...formData, weeklyManualHours: h })}
                      className={`p-2 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                        formData.weeklyManualHours === h
                          ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
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
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-xs transition-all cursor-pointer shadow-xs hover:shadow-sm active:scale-[0.98]"
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
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block mb-1">
                  Select Your Current Tools
                </label>
                <p className="text-xs text-slate-500 mb-2.5">
                  We connect directly to what you use — no new software required.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Twilio / Existing Phone Carrier',
                    'Google Calendar',
                    'Microsoft Outlook 365',
                    'Salesforce / HubSpot CRM',
                    'Zendesk / Helpdesk',
                    'Shopify / E-Commerce',
                    'WhatsApp / SMS Alerts',
                    'Slack / Internal Alerts',
                    'Custom Database / API'
                  ].map((sys) => {
                    const isChecked = formData.currentErpStack.includes(sys);
                    return (
                      <button
                        type="button"
                        key={sys}
                        onClick={() => toggleErpStack(sys)}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-orange-50 border-orange-300 text-slate-900 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-white'
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
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Logistics or Pacific Supply"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-orange-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs border border-slate-200 cursor-pointer font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-xs transition-all cursor-pointer shadow-xs hover:shadow-sm active:scale-[0.98]"
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
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block mb-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-orange-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block mb-1">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-orange-500 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold block mb-1">
                  Briefly describe your process (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. We receive 20 PDF invoices per day in Outlook and type them into Excel and QuickBooks..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-orange-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 text-xs border border-slate-200 cursor-pointer font-semibold"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-xs transition-all cursor-pointer shadow-xs hover:shadow-sm active:scale-[0.98] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Generating Blueprint...</span>
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
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h4 className="text-xl font-bold text-slate-950 font-display">
                Request Received!
              </h4>

              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Our engineering team is preparing your custom automation blueprint for <strong className="text-slate-900">{formData.companyName || 'your team'}</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto text-xs space-y-2 shadow-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Workflow:</span>
                  <span className="text-slate-900 font-semibold">{formData.primaryBottleneck}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Confirmation Sent To:</span>
                  <span className="text-slate-900 font-semibold">{formData.workEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Deliverable:</span>
                  <span className="text-emerald-700 font-bold">Tailored Architecture Blueprint</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm"
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
