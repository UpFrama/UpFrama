import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Workflow, 
  Boxes, 
  Cpu, 
  Truck, 
  FileText, 
  Bell, 
  MessageSquare,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface WhatWeAutomateProps {
  onOpenAudit: (exampleTitle?: string) => void;
}

export const WhatWeAutomate: React.FC<WhatWeAutomateProps> = ({ onOpenAudit }) => {
  const [activeScenario, setActiveScenario] = useState<number>(0);

  const scenarios = [
    {
      id: 'inventory-trigger',
      category: 'Inventory',
      trigger: 'When stock falls below minimum',
      action: 'Purchase team gets notified automatically.',
      source: 'Warehouse WMS / Barcode Scan',
      connector: 'UpFrama Threshold Monitor',
      output: 'Slack / WhatsApp / ERP Purchase Order Draft',
      latency: 'Instant (<2 sec)',
      icon: <Boxes className="w-4 h-4 text-zinc-300" />
    },
    {
      id: 'shipment-trigger',
      category: 'Logistics',
      trigger: 'When a shipment is delayed',
      action: 'Customer receives an automatic update.',
      source: 'Carrier GPS / EDI 214 Feed',
      connector: 'UpFrama Exception Handler',
      output: 'Personalized SMS & Updated ETA in CRM',
      latency: 'Automated 24/7',
      icon: <Truck className="w-4 h-4 text-zinc-300" />
    },
    {
      id: 'report-trigger',
      category: 'Management',
      trigger: 'Every evening at 6:00 PM',
      action: 'Management receives an AI-generated production report.',
      source: 'Shop Floor PLC / Shift Logs',
      connector: 'UpFrama Synthesis AI Agent',
      output: 'Executive PDF Summary via Email',
      latency: 'Scheduled Daily',
      icon: <FileText className="w-4 h-4 text-zinc-300" />
    }
  ];

  return (
    <section className="py-20 bg-[#09090B] relative border-b border-zinc-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F26522]" />
            WORKFLOW ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight">
            What We Can Automate
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-3">
            Connect your core operations directly to intelligent trigger-action pipelines with zero human latency.
          </p>
        </motion.div>

        {/* VISUAL ARCHITECTURE DIAGRAM with Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="max-w-3xl mx-auto p-6 sm:p-7 rounded-2xl bg-[#111113] border border-zinc-800 shadow-lg mb-12"
        >
          
          <div className="text-center pb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
              YOUR OPERATIONS
            </span>
          </div>

          {/* Level 1: ERP Box */}
          <div className="flex justify-center">
            <div className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
              <Database className="w-4 h-4 text-zinc-300" />
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block">CORE SYSTEM</span>
                <span className="text-sm font-semibold text-white">ERP / WMS / Database</span>
              </div>
            </div>
          </div>

          {/* Connecting Arrow Down */}
          <div className="flex justify-center my-2">
            <div className="w-0.5 h-6 bg-zinc-700 relative" />
          </div>

          {/* Level 2: Automation Engine Hub */}
          <div className="flex justify-center">
            <div className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-700 text-center relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200 text-[10px] font-mono font-medium tracking-wider uppercase">
                UpFrama Engine
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <Workflow className="w-4 h-4 text-[#F26522]" />
                <span className="text-base sm:text-lg font-bold text-white">
                  AUTOMATION & AI ENGINE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono mt-1">
                Event Mesh • Logic Validation • Intelligent Routing
              </p>
            </div>
          </div>

          {/* Branching Connectors */}
          <div className="grid grid-cols-3 max-w-xl mx-auto my-2 text-center">
            <div className="flex justify-center"><div className="w-0.5 h-6 bg-zinc-800" /></div>
            <div className="flex justify-center"><div className="w-0.5 h-6 bg-zinc-800" /></div>
            <div className="flex justify-center"><div className="w-0.5 h-6 bg-zinc-800" /></div>
          </div>

          {/* Level 3: Processing Branches */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
              <Boxes className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
              <span className="text-xs font-semibold text-white block">Inventory</span>
              <span className="text-[10px] text-zinc-500 font-mono">Stock & Reorder</span>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
              <Cpu className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
              <span className="text-xs font-semibold text-white block">AI Document</span>
              <span className="text-[10px] text-zinc-500 font-mono">OCR & Analysis</span>
            </div>

            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-center">
              <Truck className="w-4 h-4 text-zinc-400 mx-auto mb-1" />
              <span className="text-xs font-semibold text-white block">Logistics</span>
              <span className="text-[10px] text-zinc-500 font-mono">Tracking & ETA</span>
            </div>
          </div>

          {/* Branching Down to Output */}
          <div className="grid grid-cols-3 max-w-xl mx-auto my-2 text-center">
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-zinc-800" /></div>
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-zinc-800" /></div>
            <div className="flex justify-center"><div className="w-0.5 h-4 bg-zinc-800" /></div>
          </div>

          {/* Level 4: Final Output Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-850 text-center">
              <FileText className="w-3.5 h-3.5 text-zinc-400 mx-auto mb-1" />
              <span className="text-xs font-medium text-zinc-300 block">Reports</span>
              <span className="text-[10px] text-zinc-500 font-mono">Automated PDF</span>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-850 text-center">
              <Bell className="w-3.5 h-3.5 text-zinc-400 mx-auto mb-1" />
              <span className="text-xs font-medium text-zinc-300 block">Alerts</span>
              <span className="text-[10px] text-zinc-500 font-mono">Escalations</span>
            </div>

            <div className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-850 text-center">
              <MessageSquare className="w-3.5 h-3.5 text-zinc-400 mx-auto mb-1" />
              <span className="text-xs font-medium text-zinc-300 block">Notifications</span>
              <span className="text-[10px] text-zinc-500 font-mono">Customer/Team</span>
            </div>
          </div>

        </motion.div>

        {/* REAL TRIGGER → ACTION SCENARIOS with Staggered Scroll Animation */}
        <div className="space-y-3 max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-medium">
              Everyday Automation Pipelines
            </span>
          </div>

          {scenarios.map((scenario, idx) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setActiveScenario(idx)}
              className={`p-5 rounded-xl border transition-colors cursor-pointer ${
                activeScenario === idx
                  ? 'bg-zinc-850 border-zinc-700'
                  : 'bg-[#111113] border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                    {scenario.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-[#F26522] uppercase">
                        {scenario.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {scenario.latency}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      <span className="text-zinc-300">{scenario.trigger}</span>
                      <span className="text-zinc-500 mx-2">→</span>
                      <span className="text-white">{scenario.action}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenAudit(scenario.action);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-1 shrink-0 cursor-pointer"
                >
                  <span>Build This</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </button>
              </div>

              {activeScenario === idx && (
                <div className="mt-3 pt-3 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-850">
                    <span className="text-zinc-500 block text-[9px]">TRIGGER SOURCE</span>
                    <span className="text-zinc-300 text-[11px]">{scenario.source}</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-850">
                    <span className="text-zinc-500 block text-[9px]">MIDDLEWARE LOGIC</span>
                    <span className="text-zinc-200 text-[11px]">{scenario.connector}</span>
                  </div>
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-850">
                    <span className="text-zinc-500 block text-[9px]">AUTOMATED DESTINATION</span>
                    <span className="text-emerald-400 text-[11px]">{scenario.output}</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

