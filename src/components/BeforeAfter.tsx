import React, { useState, useRef, useEffect } from 'react';
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
  TrendingUp,
  Cpu,
  Workflow,
  Layers,
  BarChart3,
  Bot,
  RefreshCw,
  Send,
  Lock,
  Flame,
  Check,
  PhoneCall,
  PhoneIncoming,
  PhoneForwarded,
  Mic,
  Calendar
} from 'lucide-react';
import { motion, useScroll, AnimatePresence } from 'motion/react';

interface BeforeAfterProps {
  onOpenAudit: (preset?: string) => void;
}

// 5 Storytelling stages as requested
interface TransformationStage {
  id: number;
  stageNumber: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  keyMetricLabel: string;
  keyMetricValue: string;
  icon: React.ReactNode;
}

// Available workflow presets to explore
interface WorkflowPreset {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  problemSummary: string;
  problemPain: string;
  problemLatency: string;
  aiIntervention: string;
  orchestrationTools: string[];
  transformationResult: string;
  afterLatency: string;
  deltaSpeed: string;
  annualSavings: string;
  terminalLogs: string[];
}

export const BeforeAfter: React.FC<BeforeAfterProps> = ({ onOpenAudit }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState(0);
  const [manualActiveStage, setManualActiveStage] = useState<number | null>(null);

  // Voice Calling Workflow Presets
  const workflows: WorkflowPreset[] = [
    {
      id: 'inbound-voice',
      name: '24/7 Inbound Reception & FAQ',
      category: 'Inbound Telephony',
      icon: <PhoneIncoming className="w-4 h-4 text-[#F26522]" />,
      problemSummary: 'Callers wait on hold for 8-12 minutes or get sent to voicemail during lunch hours and peak call volume surges.',
      problemPain: 'High caller abandonment rates (38%), angry customer reviews, and lost business to competitors.',
      problemLatency: '8 - 12 Min Hold Times',
      aiIntervention: 'Autonomous Voice Agent answers on ring 1, speaks human-like with sub-300ms latency, and resolves queries instantly.',
      orchestrationTools: ['Twilio / SIP', 'Deepgram Nova-2', 'LLM Dialog Engine', 'ElevenLabs Turbo'],
      transformationResult: 'Calls answered instantly 24/7. Over 78% of common inquiries resolved on first touch without human staff.',
      afterLatency: '< 300 Milliseconds',
      deltaSpeed: '99.5% Faster',
      annualSavings: '$42,000 / yr',
      terminalLogs: [
        '[SIP_INBOUND] Call connected from +1 (415) 892-0012',
        '[AUDIO_STREAM] Real-time voice stream initiated (<300ms)',
        '[INTENT_PARSER] Caller asked: "Do you have technicians available for emergency repair today?"',
        '[KNOWLEDGE_BASE] Retrieved emergency policy: Same-day slot available with 2hr window',
        '[VOICE_SYNTH] Spoke warm, natural response with zero audible robotic delay',
        '[CRM_DISPATCH] Transcript & call audio log committed to support ticket #89412'
      ]
    },
    {
      id: 'appointment-booking',
      name: 'Voice Appointment Booking',
      category: 'Scheduling Line',
      icon: <Calendar className="w-4 h-4 text-[#F26522]" />,
      problemSummary: 'Receptionists spend half their day playing phone tag, checking calendars, and manually texting appointment confirmations.',
      problemPain: 'Double bookings, scheduling errors, and lost weekend leads who call after the office closes.',
      problemLatency: '15 Mins / Booking',
      aiIntervention: 'Voice booking agent verifies customer details, checks live Google/Outlook calendar slots, and books appointments verbally.',
      orchestrationTools: ['Google Calendar API', 'Outlook 365', 'Twilio SMS', 'Voice Core'],
      transformationResult: 'Callers book, reschedule, or cancel appointments conversationally in under 90 seconds. Instant SMS confirmation sent.',
      afterLatency: '90 Seconds Total',
      deltaSpeed: '100% Automated',
      annualSavings: '$31,500 / yr',
      terminalLogs: [
        '[VOICE_CALL] Inbound booking request on direct scheduling line',
        '[SLOT_PARSER] Caller requested: "Thursday morning consultation around 10"',
        '[CALENDAR_API] Queried staff availability: 10:00 AM taken, 10:30 AM available',
        '[VOICE_STREAM] Proposed 10:30 AM slot; caller agreed verbally',
        '[CALENDAR_SYNC] Event booked in Google Calendar and synced to staff schedule',
        '[SMS_GATEWAY] Confirmation text & calendar invite delivered to caller phone'
      ]
    },
    {
      id: 'order-tracking',
      name: 'Order Status & Tracking Hotline',
      category: 'Customer Support',
      icon: <PhoneCall className="w-4 h-4 text-[#F26522]" />,
      problemSummary: 'Support staff repeatedly answers "Where is my order?" calls, keeping callers on hold while searching ERP and carrier portals.',
      problemPain: 'Support queues back up, staff burn out from repetitive queries, and callers get frustrated waiting.',
      problemLatency: '6 - 10 Mins / Call',
      aiIntervention: 'Voice agent captures order number verbally, queries carrier API and warehouse database in real time, and speaks the exact ETA.',
      orchestrationTools: ['FedEx / UPS APIs', 'Shopify / ERP', 'Voice Dialog Engine', 'Twilio'],
      transformationResult: 'Accurate verbal delivery update provided in 35 seconds. Driver tracking link sent via SMS automatically.',
      afterLatency: '35 Seconds / Call',
      deltaSpeed: '94% Time Saved',
      annualSavings: '$36,000 / yr',
      terminalLogs: [
        '[VOICE_CAPTURE] Spoken order code captured: "PO-8821"',
        '[AUTH_CHECK] Verified caller identity against phone number on record',
        '[CARRIER_LOOKUP] FedEx Freight API returned: Out for delivery by 2:15 PM',
        '[VOICE_SYNTH] Spoke clear delivery ETA and confirmed recipient delivery address',
        '[SMS_LINK] Sent live delivery driver tracking map via SMS'
      ]
    },
    {
      id: 'after-hours-lead',
      name: 'After-Hours Lead Qualifier',
      category: 'Inbound Sales',
      icon: <PhoneForwarded className="w-4 h-4 text-[#F26522]" />,
      problemSummary: 'Prospective buyers who call after 5:00 PM or on weekends hit voicemail. Over 80% hang up and call a competitor.',
      problemPain: 'High marketing spend wasted on inbound leads that never get called back in time.',
      problemLatency: '14+ Hours to Callback',
      aiIntervention: 'Voice agent answers instantly after hours, asks qualifying questions (budget, timeline, service needs), and schedules sales calls.',
      orchestrationTools: ['HubSpot CRM', 'Salesforce', 'Twilio Voice', 'Slack Alerts'],
      transformationResult: 'Zero lost leads. Qualified prospects booked straight into sales rep calendar within minutes of dialing.',
      afterLatency: '< 1 Second Answer',
      deltaSpeed: 'Instant Intake',
      annualSavings: '$54,000 / yr',
      terminalLogs: [
        '[AFTER_HOURS] Inbound call received on sales line at 9:42 PM Sunday',
        '[VOICE_INTAKE] Greeted caller warmly: "Thanks for calling UpFrama, how can we help?"',
        '[QUALIFICATION] Captured project scope: Commercial HVAC replacement, budget $40k+',
        '[LEAD_SCORE] Lead categorized as High Priority (Score: 94/100)',
        '[CALENDAR_RESERVE] Booked initial discovery call with VP of Sales for Monday 9:30 AM',
        '[SLACK_NOTIFY] Pushed hot lead briefing & call recording to #sales-leads channel'
      ]
    }
  ];

  const currentWorkflow = workflows[activeWorkflowIndex];

  // 5 Story stages
  const stages: TransformationStage[] = [
    {
      id: 0,
      stageNumber: '01',
      badge: 'THE CURRENT BOTTLENECK',
      badgeColor: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      title: 'Manual Friction & Human Latency',
      subtitle: 'Where operational hours and profit margins get lost.',
      description: currentWorkflow.problemSummary,
      keyMetricLabel: 'Daily Time Drag',
      keyMetricValue: currentWorkflow.problemLatency,
      icon: <XCircle className="w-5 h-5 text-rose-400" />
    },
    {
      id: 1,
      stageNumber: '02',
      badge: 'UPFRAMA AI INTERVENTION',
      badgeColor: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      title: 'Automated Ingestion & Intelligent Triggers',
      subtitle: 'Capturing events the moment they happen without human polling.',
      description: currentWorkflow.aiIntervention,
      keyMetricLabel: 'Capture Response',
      keyMetricValue: '< 50 Milliseconds',
      icon: <Zap className="w-5 h-5 text-[#F26522]" />
    },
    {
      id: 2,
      stageNumber: '03',
      badge: 'MULTI-AGENT ORCHESTRATION',
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      title: 'Connected Systems Working In Harmony',
      subtitle: 'AI models, databases, and business rules coordinating in real time.',
      description: `Seamless integration between ${currentWorkflow.orchestrationTools.join(', ')}. Data is validated, structured, and cross-referenced with zero copy-pasting.`,
      keyMetricLabel: 'Integration Layer',
      keyMetricValue: '100% Zero-Touch',
      icon: <Workflow className="w-5 h-5 text-blue-400" />
    },
    {
      id: 3,
      stageNumber: '04',
      badge: 'LIVE OPERATIONAL PIPELINE',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      title: 'Automated Streamlined Execution',
      subtitle: 'Clean background execution delivering instant outcomes.',
      description: currentWorkflow.transformationResult,
      keyMetricLabel: 'Execution Speed',
      keyMetricValue: currentWorkflow.afterLatency,
      icon: <Sparkles className="w-5 h-5 text-amber-400" />
    },
    {
      id: 4,
      stageNumber: '05',
      badge: 'MEASURABLE BUSINESS IMPACT',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      title: 'Verified ROI & Operational Peace of Mind',
      subtitle: 'Compounded hours saved and zero operational errors.',
      description: `Replacing human bottleneck friction with a rock-solid automated software engine. Guaranteed reliability, audit trails, and instant executive visibility.`,
      keyMetricLabel: 'Efficiency Delta',
      keyMetricValue: currentWorkflow.deltaSpeed,
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />
    }
  ];

  // Scroll tracking setup with native scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate active stage from scroll progress (0.0 to 1.0 mapped to 5 stages)
  const [scrollStage, setScrollStage] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (manualActiveStage !== null) return;
      // 5 stages evenly distributed
      const calculatedStage = Math.min(4, Math.max(0, Math.floor(latest * 5)));
      setScrollStage(prev => (prev !== calculatedStage ? calculatedStage : prev));
    });
    return () => unsubscribe();
  }, [scrollYProgress, manualActiveStage]);

  // Current active stage (either clicked or scroll-driven)
  const activeStageIndex = manualActiveStage !== null ? manualActiveStage : scrollStage;
  const currentStage = stages[activeStageIndex];

  return (
    <section 
      id="transformation"
      ref={containerRef}
      className="relative bg-[#060913] text-slate-100 border-y border-slate-800 selection:bg-[#F26522] selection:text-white"
      style={{ height: '240vh' }}
    >
      {/* 1. Subtle Ambient Accents */}
      <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-20 right-10 w-[500px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Subtle top/bottom edge dividers */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#060913] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#060913] to-transparent pointer-events-none z-10" />

      {/* 2. Sticky Full-Viewport Story Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-5 sm:py-7 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden z-20">
        
        {/* ======================================================== */}
        {/* 1. TOP BAR: SECTION HEADER & WORKFLOW SELECTOR           */}
        {/* ======================================================== */}
        <div className="shrink-0 pt-1 sm:pt-2">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-semibold tracking-wide uppercase">
                <Zap className="w-3 h-3 text-[#F26522]" />
                <span>Interactive Transformation Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight mt-1.5 flex items-center gap-2">
                <span>See the exact operational transformation.</span>
              </h2>
            </div>

            {/* Workflow Category Switcher */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold mr-1 shrink-0 hidden lg:inline">
                Preset:
              </span>
              {workflows.map((wf, idx) => {
                const isSelected = idx === activeWorkflowIndex;
                return (
                  <button
                    key={wf.id}
                    onClick={() => {
                      setActiveWorkflowIndex(idx);
                      setManualActiveStage(null);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#F26522] text-white font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <span>{wf.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. PROGRESS STEP RAIL                                    */}
          {/* ======================================================== */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-3 mt-3 pt-1">
            {stages.map((stg, idx) => {
              const isActive = activeStageIndex === idx;
              const isPast = activeStageIndex > idx;
              return (
                <button
                  key={stg.id}
                  onClick={() => setManualActiveStage(idx)}
                  className="group flex flex-col text-left cursor-pointer transition-all focus:outline-none"
                >
                  {/* Step Progress Bar Segment */}
                  <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden mb-1.5 relative border border-slate-700/30">
                    <div 
                      className={`h-full transition-all duration-200 rounded-full ${
                        isActive
                          ? 'bg-[#F26522] w-full'
                          : isPast
                          ? 'bg-slate-500 w-full'
                          : 'bg-transparent w-0'
                      }`}
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <span className={`text-[10px] font-mono font-bold transition-colors ${
                      isActive ? 'text-[#F26522]' : isPast ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {stg.stageNumber}
                    </span>
                    <span className={`text-[11px] font-semibold truncate transition-colors hidden sm:inline ${
                      isActive ? 'text-white font-bold' : isPast ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {stg.title.split(' ')[0]} {stg.title.split(' ')[1] || ''}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. MAIN STORY STAGE: SPLIT DYNAMIC INTERACTIVE VIEW       */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center my-auto py-2">
          
          {/* LEFT COLUMN: NARRATIVE & STAGE IMPACT DETAILS (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeStageIndex}-${currentWorkflow.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="space-y-4"
              >
                {/* Stage Badge */}
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wide uppercase border inline-flex items-center gap-1.5 ${currentStage.badgeColor}`}>
                    {currentStage.icon}
                    <span>Stage {currentStage.stageNumber} // {currentStage.badge}</span>
                  </span>
                </div>

                {/* Main Headline */}
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                    {currentStage.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-400 font-medium mt-1.5">
                    {currentStage.subtitle}
                  </p>
                </div>

                {/* Rich Description in Dark Glass */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                  {currentStage.description}
                </p>

                {/* Dynamic Metric Comparison Box */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">
                      {currentStage.keyMetricLabel}
                    </span>
                    <span className={`text-base sm:text-lg font-bold mt-0.5 block ${
                      activeStageIndex === 0 ? 'text-rose-400' : 'text-[#F26522]'
                    }`}>
                      {currentStage.keyMetricValue}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">
                      Annual Cost Impact
                    </span>
                    <span className="text-base sm:text-lg font-bold text-emerald-400 mt-0.5 block">
                      {currentWorkflow.annualSavings}
                    </span>
                  </div>
                </div>

                {/* Contextual Action Button */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => onOpenAudit(currentWorkflow.name)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <span>Get Blueprint for this Flow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
                    <span>Scroll or click to advance</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: CRISP DARK GLASS VISUALIZER (7 COLS) */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="w-full max-w-2xl rounded-3xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 overflow-hidden relative shadow-2xl">
              {/* Window Header in Dark Terminal Aesthetic */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800 text-xs font-mono relative z-10">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-slate-400 font-semibold ml-2">pipeline://{currentWorkflow.id}.upframa</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-[10px]">
                    STAGE {activeStageIndex + 1} OF 5
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#F26522]" />
                </div>
              </div>

              {/* Dynamic Visual Content per Stage */}
              <div className="relative min-h-[300px] sm:min-h-[340px] flex flex-col justify-between z-10">
                <AnimatePresence mode="wait">
                  
                  {/* STAGE 1: THE MANUAL PROBLEM (CHAOTIC DISCONNECTED WORKFLOW) */}
                  {activeStageIndex === 0 && (
                    <motion.div
                      key="stage-0-visual"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/50 flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-mono font-bold text-rose-300 uppercase tracking-wider">
                            Friction Detected: High Latency Human Process
                          </div>
                          <div className="text-sm font-bold text-slate-100 mt-1">
                            {currentWorkflow.problemPain}
                          </div>
                        </div>
                      </div>

                      {/* Chaotic Stalled Nodes in Dark Theme */}
                      <div className="grid grid-cols-3 gap-2.5 pt-1">
                        <div className="p-3 rounded-xl bg-slate-950 border border-rose-900/40 text-center relative overflow-hidden">
                          <div className="text-[10px] font-mono text-rose-400 font-bold uppercase">Manual Polling</div>
                          <div className="text-xs font-bold text-slate-200 mt-1">15+ Daily Logins</div>
                          <span className="text-[9px] text-slate-400 block mt-0.5">ERP Screen Waiting</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950 border border-rose-900/40 text-center relative overflow-hidden">
                          <div className="text-[10px] font-mono text-rose-400 font-bold uppercase">Context Switching</div>
                          <div className="text-xs font-bold text-slate-200 mt-1">3 Disconnected Apps</div>
                          <span className="text-[9px] text-slate-400 block mt-0.5">Manual Copy-Pasting</span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950 border border-rose-900/40 text-center relative overflow-hidden">
                          <div className="text-[10px] font-mono text-rose-400 font-bold uppercase">Delayed Reaction</div>
                          <div className="text-xs font-bold text-slate-200 mt-1">{currentWorkflow.problemLatency}</div>
                          <span className="text-[9px] text-slate-400 block mt-0.5">Stalled Data Flow</span>
                        </div>
                      </div>

                      {/* Visual Stalled Connection Graph */}
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                        <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
                          <XCircle className="w-4 h-4" />
                          <span>Status: Bottlenecked</span>
                        </span>
                        <span className="text-slate-400">Human Latency: High</span>
                        <span className="text-rose-400 font-bold">Error Risk: 12.4%</span>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 2: AI INTERVENTION (WEBHOOK & PARSER ACTIVATION) */}
                  {activeStageIndex === 1 && (
                    <motion.div
                      key="stage-1-visual"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-2xl bg-orange-950/20 border border-orange-900/40 flex items-start gap-3">
                        <Zap className="w-5 h-5 text-[#F26522] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-mono font-bold text-orange-300 uppercase tracking-wider">
                            AI Ingestion Activated: Zero Polling Required
                          </div>
                          <div className="text-sm font-bold text-slate-100 mt-1">
                            {currentWorkflow.aiIntervention}
                          </div>
                        </div>
                      </div>

                      {/* Ingestion Stream Cards in Dark Mode */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl bg-slate-950 border border-orange-900/40">
                          <div className="flex items-center justify-between text-[10px] font-mono text-orange-400 font-bold uppercase mb-1">
                            <span>Webhook Trigger</span>
                            <span className="bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded border border-orange-500/30">Active</span>
                          </div>
                          <p className="text-xs text-slate-300 font-medium">Listening to database events in real time with automated schema decoding.</p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-950 border border-orange-900/40">
                          <div className="flex items-center justify-between text-[10px] font-mono text-orange-400 font-bold uppercase mb-1">
                            <span>OCR & Document AI</span>
                            <span className="bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded border border-orange-500/30">Parsing</span>
                          </div>
                          <p className="text-xs text-slate-300 font-medium">Extracts messy PDFs, tables, and receipts directly into clean JSON.</p>
                        </div>
                      </div>

                      {/* Ingestion Speed Status */}
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
                        <span className="text-[#F26522] font-bold flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4" />
                          <span>Event Captured: 0.04s</span>
                        </span>
                        <span className="text-slate-400">Integrity: 100% Verified</span>
                        <span className="text-emerald-400 font-bold">Latency: -99%</span>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 3: MULTI-AGENT ORCHESTRATION GRAPH */}
                  {activeStageIndex === 2 && (
                    <motion.div
                      key="stage-2-visual"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-900/40 flex items-start gap-3">
                        <Workflow className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-mono font-bold text-blue-300 uppercase tracking-wider">
                            Multi-Node Orchestration Engine
                          </div>
                          <div className="text-sm font-bold text-slate-100 mt-1">
                            Connected software ecosystem executing in parallel.
                          </div>
                        </div>
                      </div>

                      {/* Live Tools Grid in Dark Theme */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {currentWorkflow.orchestrationTools.map((tool, tIdx) => (
                          <div 
                            key={tIdx} 
                            className="p-3 rounded-xl bg-slate-950 border border-blue-900/40 flex flex-col items-center text-center"
                          >
                            <span className="w-2 h-2 rounded-full bg-blue-400 mb-1.5" />
                            <span className="text-[11px] font-bold text-slate-200 truncate w-full">{tool}</span>
                            <span className="text-[9px] font-mono text-blue-400 mt-0.5">SYNCHRONIZED</span>
                          </div>
                        ))}
                      </div>

                      {/* Agent Logic Flow Diagram */}
                      <div className="p-3.5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[11px] space-y-1.5 border border-slate-800">
                        <div className="text-slate-500">// Parallel Execution Pipeline</div>
                        <div className="flex items-center justify-between text-emerald-400">
                          <span>[1] Ingestion Check</span>
                          <span className="text-slate-400">PASSED</span>
                        </div>
                        <div className="flex items-center justify-between text-blue-400">
                          <span>[2] Database Transaction Sync</span>
                          <span className="text-slate-400">PASSED</span>
                        </div>
                        <div className="flex items-center justify-between text-[#F26522]">
                          <span>[3] Outbound Notification Route</span>
                          <span className="text-slate-400">DISPATCHED</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 4: LIVE AUTOMATED EXECUTION TERMINAL */}
                  {activeStageIndex === 3 && (
                    <motion.div
                      key="stage-3-visual"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                            Zero-Touch Execution Stream
                          </div>
                          <div className="text-sm font-bold text-slate-100 mt-0.5">
                            {currentWorkflow.transformationResult}
                          </div>
                        </div>
                      </div>

                      {/* Live Terminal Stream */}
                      <div className="p-3.5 rounded-2xl bg-slate-950 text-slate-200 font-mono text-[10.5px] space-y-1.5 border border-slate-800">
                        <div className="text-slate-400 font-semibold mb-2 flex items-center justify-between border-b border-slate-800 pb-1.5">
                          <span>LIVE_EXECUTION_LOGS // {currentWorkflow.id}</span>
                          <span className="text-emerald-400 font-bold">STATUS: STREAMING</span>
                        </div>
                        {currentWorkflow.terminalLogs.map((log, lIdx) => (
                          <div key={lIdx} className="flex items-start gap-1.5 text-slate-300">
                            <span className="text-[#F26522] select-none font-bold">›</span>
                            <span>{log}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 5: FINAL BUSINESS OUTCOME & ROI DASHBOARD */}
                  {activeStageIndex === 4 && (
                    <motion.div
                      key="stage-4-visual"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/40 flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                            Operational Outcome Verified
                          </div>
                          <div className="text-sm font-bold text-slate-100 mt-1">
                            Manual bottleneck completely eliminated with guaranteed software uptime.
                          </div>
                        </div>
                      </div>

                      {/* Key Outcome Metric Pillars */}
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                          <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">Speed Delta</span>
                          <span className="text-lg font-bold text-emerald-400 block mt-1">{currentWorkflow.deltaSpeed}</span>
                          <span className="text-[10px] text-slate-400">Vs. Manual Human</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                          <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">Error Rate</span>
                          <span className="text-lg font-bold text-slate-100 block mt-1">0.00%</span>
                          <span className="text-[10px] text-slate-400">Full Audit Log</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                          <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold block">Net Savings</span>
                          <span className="text-lg font-bold text-[#F26522] block mt-1">{currentWorkflow.annualSavings}</span>
                          <span className="text-[10px] text-slate-400">Recurring ROI</span>
                        </div>
                      </div>

                      {/* Final Blueprint Launch Callout */}
                      <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white flex items-center justify-between">
                        <div className="text-xs font-mono">
                          <span className="text-emerald-400 font-bold block">Ready to deploy this pipeline?</span>
                          <span className="text-slate-400 text-[11px]">Free Process Architecture Blueprint included</span>
                        </div>
                        <button
                          onClick={() => onOpenAudit(currentWorkflow.name)}
                          className="px-4 py-2 rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white text-xs font-bold transition-all cursor-pointer active:scale-[0.98]"
                        >
                          Book Free Blueprint
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* 4. FOOTER CONTROLS: QUICK STAGE JUMP                     */}
        {/* ======================================================== */}
        <div className="shrink-0 pt-2 pb-1 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F26522]" />
            <span className="font-semibold text-slate-200">
              Stage {activeStageIndex + 1} of 5: {currentStage.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              disabled={activeStageIndex === 0}
              onClick={() => setManualActiveStage(Math.max(0, activeStageIndex - 1))}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Previous
            </button>
            <button
              disabled={activeStageIndex === 4}
              onClick={() => setManualActiveStage(Math.min(4, activeStageIndex + 1))}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              Next Stage
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
