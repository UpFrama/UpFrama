import React, { useState } from 'react';
import { 
  MessageSquare, 
  FileCheck, 
  Cpu, 
  Rocket, 
  ArrowRight, 
  Check, 
  Clock, 
  ShieldCheck, 
  Activity, 
  Terminal 
} from 'lucide-react';
import { Reveal3D } from './Reveal3D';
import { SpotlightCard } from './SpotlightCard';

interface HowItWorksProps {
  onOpenAudit: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenAudit }) => {
  const [activeStepTab, setActiveStepTab] = useState<number>(0);

  const steps = [
    {
      num: '01',
      code: 'STAGE_01 // INTAKE',
      title: 'Share Your Call Flow',
      subtitle: 'Tell us who calls and what they ask',
      duration: 'Call Pattern Discovery',
      description: 'Describe your current phone inquiry patterns, FAQs, booking requirements, or after-hours call routing needs in a friendly consultation.',
      icon: <MessageSquare className="w-5 h-5 text-[#F26522]" />,
      direction: 'left' as const,
      telemetry: {
        stage: 'CALL_FLOW_ANALYSIS',
        inputs: ['Current call scripts & FAQs', 'Booking rules & calendars', 'CRM or lookup database'],
        deliverable: 'Voice agent scope & estimated weekly hours saved'
      }
    },
    {
      num: '02',
      code: 'STAGE_02 // BLUEPRINT',
      title: 'Audition Your Voice Agent',
      subtitle: 'Hear your agent before paying',
      duration: 'Persona & Logic Design',
      description: 'We map your conversational phone tree, engineer the voice personality, connect calendar/CRM lookups, and let you audition a sample audio demo.',
      icon: <FileCheck className="w-5 h-5 text-amber-600" />,
      direction: 'up' as const,
      telemetry: {
        stage: 'VOICE_PROTOTYPE',
        inputs: ['Interactive voice prompt', 'Calendar & API hooks', 'Tailored usage-based rate plan'],
        deliverable: 'Playable voice demo & telephony integration plan'
      }
    },
    {
      num: '03',
      code: 'STAGE_03 // TEST',
      title: 'We Train & Test The Agent',
      subtitle: 'Rigorous latency & voice checks',
      duration: 'Telephony Sandbox Testing',
      description: 'We stress-test speech recognition, interruptions, background noise cancellation, and sub-350ms latency in our private telecom sandbox.',
      icon: <Cpu className="w-5 h-5 text-[#F26522]" />,
      direction: 'up' as const,
      telemetry: {
        stage: 'VOICE_STRESS_TEST',
        inputs: ['50+ simulated test calls', 'Interruption & barge-in loops', 'CRM transcript sync'],
        deliverable: 'Passes voice benchmark with <350ms response latency'
      }
    },
    {
      num: '04',
      code: 'STAGE_04 // LIVE',
      title: 'Live On Your Phone Line',
      subtitle: 'Answers 24/7 with zero hold time',
      duration: '24/7 Autonomous Telephony',
      description: 'Forward calls from your existing office line or get a dedicated number. Your AI agent answers instantly 24/7 with live CRM logs and SMS follow-ups.',
      icon: <Rocket className="w-5 h-5 text-emerald-600" />,
      direction: 'right' as const,
      telemetry: {
        stage: 'LIVE_TELEPHONY_DISPATCH',
        inputs: ['Carrier SIP connection', 'Real-time call transcripts', 'Instant SMS confirmations'],
        deliverable: 'Zero missed calls and 100% first-ring answering rate'
      }
    }
  ];

  const selectedStep = steps[activeStepTab] || steps[0];

  return (
    <section 
      id="how-it-works" 
      className="py-20 sm:py-28 bg-[#F8FAFC]/90 relative border-b border-slate-200/80 overflow-hidden"
    >
      {/* Subtle Grid Background & Ambient Lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-blue-100/35 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <Reveal3D direction="down" depth={24} rotation={6}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50/80 backdrop-blur-md border border-orange-200/80 text-orange-700 text-xs font-semibold mb-3.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
              <span>Implementation Lifecycle // 4 Simple Steps</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-tight">
              From missed calls to 24/7 voice automation in 4 steps.
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              No complicated telecom installations or hardware. We design, train, and connect an intelligent voice agent to your business line.
            </p>

            {/* Metric Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-5 text-xs font-mono text-slate-600">
              <span className="flex items-center gap-1.5 bg-white/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/90 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-[#F26522]" />
                Custom Voice Blueprint
              </span>
              <span className="flex items-center gap-1.5 bg-white/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/90 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                &lt;350ms Tested Latency
              </span>
              <span className="flex items-center gap-1.5 bg-white/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/90 shadow-xs">
                <Activity className="w-3.5 h-3.5 text-orange-600" />
                24/7 First-Ring Answering
              </span>
            </div>
          </div>
        </Reveal3D>

        {/* 4 Interactive Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {steps.map((step, idx) => {
            const isSelected = activeStepTab === idx;

            return (
              <Reveal3D 
                key={step.num}
                delay={idx * 0.05}
                direction={step.direction}
                depth={30}
                rotation={8}
                className="h-full"
              >
                <div
                  onClick={() => setActiveStepTab(idx)}
                  className="cursor-pointer group flex flex-col h-full relative"
                >
                  <SpotlightCard
                    enable3DTilt={true}
                    maxTilt={6}
                    variant="glass"
                    className={`p-5 sm:p-6 h-full flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-white/95 !border-orange-500/50 ring-2 ring-orange-400/25 shadow-[0_16px_36px_rgba(242,101,34,0.12),inset_0_1px_2px_rgba(255,255,255,1)]' 
                        : ''
                    }`}
                  >
                    <div>
                      {/* Top Row: Code Tag + Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xl font-extrabold font-mono text-slate-800 group-hover:text-slate-950 transition-colors">
                            {step.num}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">/ 04</span>
                        </div>
                        <div className={`p-2.5 rounded-2xl border transition-colors ${
                          isSelected 
                            ? 'bg-orange-50 border-orange-200 text-[#F26522]' 
                            : 'bg-white/80 border-white/90 text-slate-600 group-hover:text-slate-900 shadow-xs'
                        }`}>
                          {step.icon}
                        </div>
                      </div>

                      {/* Step Stage Code */}
                      <div className="text-[10px] font-mono font-bold tracking-wider text-[#F26522] uppercase mb-1">
                        {step.code}
                      </div>

                      {/* Step Title & Subtitle */}
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs font-medium text-orange-600 mt-0.5">
                        {step.subtitle}
                      </p>

                      {/* Step Description */}
                      <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom Footer: Timing & Inspect Action */}
                    <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-500">
                        {step.duration}
                      </span>
                      <span className={`flex items-center gap-1 transition-colors ${
                        isSelected ? 'text-[#F26522] font-bold' : 'text-slate-500 group-hover:text-slate-900'
                      }`}>
                        {isSelected ? 'Active' : 'Inspect'} &rarr;
                      </span>
                    </div>
                  </SpotlightCard>
                </div>
              </Reveal3D>
            );
          })}
        </div>

        {/* Telemetry Stage Inspector */}
        <Reveal3D delay={0.2} direction="up" depth={24} rotation={4}>
          <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_16px_40px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,1)]">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-200/60">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-orange-50/80 border border-orange-200 text-[#F26522] shadow-xs">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900 font-mono uppercase">
                      Stage Execution Inspector: {selectedStep.code}
                    </h4>
                    <span className="text-[10px] font-mono bg-emerald-50/80 border border-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full font-bold shadow-xs">
                      PROTOCOL: ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Detailed technical deliverable and safety guarantees for step {selectedStep.num}.
                  </p>
                </div>
              </div>

              {/* Step Switcher Tabs */}
              <div className="flex items-center gap-1 bg-white/75 backdrop-blur-md p-1 rounded-full border border-white/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                {steps.map((s, idx) => (
                  <button
                    key={s.num}
                    onClick={() => setActiveStepTab(idx)}
                    className={`px-3.5 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                      activeStepTab === idx
                        ? 'bg-[#F26522] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Step {s.num}
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-white/65 backdrop-blur-md border border-white/80 shadow-xs">
                <span className="text-[10px] text-slate-400 uppercase block mb-1.5 font-bold">
                  Stage Type
                </span>
                <div className="text-orange-700 font-bold">
                  {selectedStep.telemetry.stage}
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Estimated turnaround: {selectedStep.duration}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/65 backdrop-blur-md border border-white/80 shadow-xs">
                <span className="text-[10px] text-slate-400 uppercase block mb-1.5 font-bold">
                  Input Requirements
                </span>
                <ul className="space-y-1 text-[11px] text-slate-700">
                  {selectedStep.telemetry.inputs.map((inp, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white/65 backdrop-blur-md border border-white/80 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block mb-1.5 font-bold">
                    Verified Deliverable
                  </span>
                  <div className="text-[11px] text-emerald-800 font-bold">
                    {selectedStep.telemetry.deliverable}
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600" />
                  Guaranteed Usage-Based Rate Plan
                </div>
              </div>
            </div>
          </div>
        </Reveal3D>

        {/* CTA Bar */}
        <Reveal3D delay={0.25} direction="up" depth={20}>
          <div className="mt-12 text-center">
            <button
              onClick={onOpenAudit}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-sm transition-all cursor-pointer shadow-sm hover:shadow active:scale-[0.98]"
            >
              <span>Start Step 1: Claim Your Free Process Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal3D>

      </div>
    </section>
  );
};
