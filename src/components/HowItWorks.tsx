import React, { useState } from 'react';
import { motion } from 'motion/react';
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
      code: 'STAGE_01 // INGEST',
      title: 'Share Your Process',
      subtitle: 'Tell us what takes your time',
      duration: 'Process Discovery',
      description: 'Describe the repetitive task, spreadsheet, or copy-paste workflow that slows your team down in a friendly, non-technical consultation.',
      icon: <MessageSquare className="w-5 h-5 text-[#F26522]" />,
      direction: 'left' as const,
      telemetry: {
        stage: 'REQUIREMENTS_CAPTURE',
        inputs: ['Process screenshots', 'Sample Excel/PDF templates', 'Tool list (ERP/CRM)'],
        deliverable: 'Identified bottleneck score & estimated hours saved'
      }
    },
    {
      num: '02',
      code: 'STAGE_02 // BLUEPRINT',
      title: 'Get a Free Blueprint',
      subtitle: 'See the plan before paying',
      duration: 'Tailored Architecture',
      description: 'We deliver a step-by-step visual architecture roadmap showing exactly how the automation will work with a clear, fixed-price quote.',
      icon: <FileCheck className="w-5 h-5 text-amber-400" />,
      direction: 'up' as const,
      telemetry: {
        stage: 'ARCHITECTURE_PROPOSAL',
        inputs: ['Data flow schema', 'API endpoint mappings', 'Fixed price agreement ($250+)'],
        deliverable: 'Complete interactive workflow diagram & safety audit'
      }
    },
    {
      num: '03',
      code: 'STAGE_03 // INTEGRATE',
      title: 'We Build & Test',
      subtitle: 'Zero disruption to your team',
      duration: 'Sandbox Validation',
      description: 'We connect your existing tools (Excel, ERP, Email, CRM) in a safe staging environment and test edge cases thoroughly so your work never stops.',
      icon: <Cpu className="w-5 h-5 text-[#F26522]" />,
      direction: 'up' as const,
      telemetry: {
        stage: 'SANDBOX_VALIDATION',
        inputs: ['100% test dataset', 'Exception error handlers', 'Failover safety loops'],
        deliverable: 'Passes 50+ stress tests with 100% data fidelity'
      }
    },
    {
      num: '04',
      code: 'STAGE_04 // AUTONOMOUS',
      title: 'Runs Automatically',
      subtitle: 'Live with ongoing support',
      duration: '24/7 Continuous Execution',
      description: 'Your new workflow runs quietly in the background 24/7. We monitor uptime, handle system updates, and ensure your business runs friction-free.',
      icon: <Rocket className="w-5 h-5 text-emerald-400" />,
      direction: 'right' as const,
      telemetry: {
        stage: 'CONTINUOUS_MONITORING',
        inputs: ['Auto-restarts', 'Encrypted TLS 1.3 audit logs', 'Monthly health reports'],
        deliverable: 'Zero manual hours wasted on recurring data entry'
      }
    }
  ];

  const selectedStep = steps[activeStepTab] || steps[0];

  return (
    <section 
      id="how-it-works" 
      className="py-20 sm:py-28 bg-[#09090B] relative border-b border-zinc-800 overflow-hidden"
    >
      {/* Industrial Blueprint Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f230f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f230f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Pop */}
        <Reveal3D direction="down" depth={35} rotation={8}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-400 text-xs font-mono mb-3.5 backdrop-blur-sm shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
              <span>DEPLOYMENT_LIFECYCLE // 4 STEPS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight leading-tight">
              From manual headache to automated in 4 easy steps.
            </h2>
            
            <p className="text-zinc-400 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
              No long enterprise contracts or complicated setups. We design, build, and deploy custom workflows tailored to your stack.
            </p>

            {/* Industrial Metric Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-5 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800 shadow-sm">
                <Clock className="w-3.5 h-3.5 text-[#F26522]" />
                Custom Architecture Blueprint
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Safe Staging Tests
              </span>
              <span className="flex items-center gap-1.5 bg-zinc-900/80 px-2.5 py-1 rounded border border-zinc-800 shadow-sm">
                <Activity className="w-3.5 h-3.5 text-orange-400" />
                24/7 Automated Uptime
              </span>
            </div>
          </div>
        </Reveal3D>

        {/* 4 Interactive Step Cards with 3D Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {steps.map((step, idx) => {
            const isSelected = activeStepTab === idx;

            return (
              <Reveal3D 
                key={step.num}
                delay={idx * 0.08}
                direction={step.direction}
                depth={50}
                rotation={14}
                className="h-full"
              >
                <div
                  onClick={() => setActiveStepTab(idx)}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between group h-full shadow-xl ${
                    isSelected 
                      ? 'bg-[#141418] border-[#F26522] ring-1 ring-[#F26522]/50 shadow-2xl scale-[1.02]' 
                      : 'bg-[#111114]/90 border-zinc-800/90 hover:border-zinc-700 hover:scale-[1.01]'
                  }`}
                >
                  {/* Industrial Corner Brackets */}
                  <div className="absolute top-2 left-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">┌</div>
                  <div className="absolute top-2 right-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">┐</div>
                  <div className="absolute bottom-2 left-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">└</div>
                  <div className="absolute bottom-2 right-2 text-[8px] font-mono text-zinc-700 pointer-events-none select-none">┘</div>

                  <div>
                    {/* Top Row: Code Tag + Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xl font-bold font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                          {step.num}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-600">/ 04</span>
                      </div>
                      <div className={`p-2 rounded-xl border transition-colors ${
                        isSelected 
                          ? 'bg-[#F26522]/20 border-[#F26522]/40 text-[#F26522]' 
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 group-hover:text-zinc-200'
                      }`}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Step Stage Code */}
                    <div className="text-[10px] font-mono font-bold tracking-wider text-[#F26522] uppercase mb-1">
                      {step.code}
                    </div>

                    {/* Step Title & Subtitle */}
                    <h3 className="text-base font-bold text-white leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs font-medium text-orange-400/90 mt-0.5">
                      {step.subtitle}
                    </p>

                    {/* Step Description */}
                    <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bottom Footer: Timing & Inspect Action */}
                  <div className="mt-6 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500">
                      {step.duration}
                    </span>
                    <span className={`flex items-center gap-1 transition-colors ${
                      isSelected ? 'text-[#F26522] font-bold' : 'text-zinc-400 group-hover:text-white'
                    }`}>
                      {isSelected ? 'Active' : 'Inspect'} &rarr;
                    </span>
                  </div>
                </div>
              </Reveal3D>
            );
          })}
        </div>

        {/* 3D Telemetry Stage Inspector */}
        <Reveal3D delay={0.25} direction="up" depth={40} rotation={8}>
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#111114]/95 border border-zinc-800 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#F26522]/20 border border-[#F26522]/40 text-[#F26522] shadow-sm">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white font-mono uppercase">
                      Stage Execution Inspector: {selectedStep.code}
                    </h4>
                    <span className="text-[10px] font-mono bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 px-2 py-0.5 rounded">
                      PROTOCOL: ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Detailed technical deliverable and safety guarantees for step {selectedStep.num}.
                  </p>
                </div>
              </div>

              {/* Quick Step Switcher Tabs */}
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-xl border border-zinc-800 shadow-inner">
                {steps.map((s, idx) => (
                  <button
                    key={s.num}
                    onClick={() => setActiveStepTab(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                      activeStepTab === idx
                        ? 'bg-[#F26522] text-white font-semibold shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Step {s.num}
                  </button>
                ))}
              </div>
            </div>

            {/* Stage Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-[#0C0C0F] border border-zinc-800/80 shadow-sm">
                <span className="text-[10px] text-zinc-500 uppercase block mb-1.5">
                  Stage Type
                </span>
                <div className="text-orange-400 font-bold">
                  {selectedStep.telemetry.stage}
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  Estimated turnaround: {selectedStep.duration}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0C0C0F] border border-zinc-800/80 shadow-sm">
                <span className="text-[10px] text-zinc-500 uppercase block mb-1.5">
                  Input Requirements
                </span>
                <ul className="space-y-1 text-[11px] text-zinc-300">
                  {selectedStep.telemetry.inputs.map((inp, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#F26522]" />
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0C0C0F] border border-zinc-800/80 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1.5">
                    Verified Deliverable
                  </span>
                  <div className="text-[11px] text-emerald-300 font-medium">
                    {selectedStep.telemetry.deliverable}
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-zinc-500 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-400" />
                  Guaranteed Fixed-Fee Quote
                </div>
              </div>
            </div>
          </div>
        </Reveal3D>

        {/* CTA Bar */}
        <Reveal3D delay={0.3} direction="up" depth={25}>
          <div className="mt-12 text-center">
            <button
              onClick={onOpenAudit}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-sm transition-all cursor-pointer shadow-xl hover:shadow-orange-500/25"
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
