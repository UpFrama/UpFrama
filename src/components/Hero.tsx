import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  FileText, 
  Boxes, 
  Mail, 
  Database, 
  Smartphone, 
  BarChart3, 
  Cpu, 
  Terminal, 
  Check, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  Activity,
  RefreshCw
} from 'lucide-react';
import heroBgImg from '../assets/images/hero_abstract_bg_1786824926194.jpg';

interface HeroProps {
  onOpenAudit: () => void;
  onExploreSolutions: () => void;
}

interface WorkflowStep {
  id: string;
  stepNumber: string;
  category: 'source' | 'engine' | 'sync' | 'notify';
  title: string;
  subtitle: string;
  icon: string;
  latency: string;
  details: string;
  payload: {
    recordType: string;
    sourceApp: string;
    targetApp: string;
    fieldsProcessed: number;
    accuracy: string;
    sample: Record<string, string | number>;
  };
}

interface WorkflowPreset {
  id: string;
  name: string;
  tag: string;
  description: string;
  timeSaved: string;
  estAnnualSavings: string;
  nodes: WorkflowStep[];
  logs: string[];
}

// Static Presets defined outside component to prevent re-allocation & reference changes
const WORKFLOW_PRESETS: WorkflowPreset[] = [
  {
    id: 'invoice-po',
    name: 'Invoice & PO Auto-Entry',
    tag: 'Accounting & Operations',
    description: 'Incoming customer invoices & supplier POs are ingested from Outlook/Gmail, parsed accurately, and posted directly into QuickBooks & ERP.',
    timeSaved: '18 hrs / week',
    estAnnualSavings: '$38,500 / yr',
    nodes: [
      {
        id: 'n1',
        stepNumber: '01',
        category: 'source',
        title: 'Document Ingest',
        subtitle: 'Outlook / Gmail / Uploads',
        icon: 'mail',
        latency: '45ms',
        details: 'Detects new PO #4892 from email attachment (1.8MB PDF)',
        payload: {
          recordType: 'Purchase Order PDF',
          sourceApp: 'Microsoft Outlook 365',
          targetApp: 'UpFrama AI Core',
          fieldsProcessed: 18,
          accuracy: '99.98%',
          sample: {
            'Vendor': 'Apex Global Components',
            'PO_Number': 'PO-2026-8941',
            'Total_Amount': '$14,850.00',
            'Line_Items': 14,
            'Currency': 'USD'
          }
        }
      },
      {
        id: 'n2',
        stepNumber: '02',
        category: 'engine',
        title: 'Intelligent Parser',
        subtitle: 'Multi-line AI Extractor',
        icon: 'cpu',
        latency: '240ms',
        details: 'Extracts line items, SKUs, tax calculations, and vendor terms',
        payload: {
          recordType: 'Structured JSON Payload',
          sourceApp: 'Vision OCR Engine',
          targetApp: 'ERP Validation Filter',
          fieldsProcessed: 24,
          accuracy: '100%',
          sample: {
            'SKU_1': 'ST-409 (Qty: 500)',
            'SKU_2': 'BR-102 (Qty: 250)',
            'Tax_Calculated': '$1,188.00',
            'Terms': 'Net 30',
            'Confidence': '1.000'
          }
        }
      },
      {
        id: 'n3',
        stepNumber: '03',
        category: 'sync',
        title: 'ERP & Ledger Sync',
        subtitle: 'QuickBooks / SAP / Excel',
        icon: 'database',
        latency: '110ms',
        details: 'Records invoice directly in general ledger & updates inventory balance',
        payload: {
          recordType: 'Ledger Transaction',
          sourceApp: 'UpFrama Sync Router',
          targetApp: 'QuickBooks Enterprise',
          fieldsProcessed: 16,
          accuracy: '100%',
          sample: {
            'Status': 'POSTED',
            'Voucher_ID': 'VCH-98104',
            'GL_Account': '2010 - Accounts Payable',
            'Inventory_Updated': 'Yes (+750 units)',
            'Match_Score': '100%'
          }
        }
      },
      {
        id: 'n4',
        stepNumber: '04',
        category: 'notify',
        title: 'Instant Confirmation',
        subtitle: 'WhatsApp / Mobile Alert',
        icon: 'smartphone',
        latency: '80ms',
        details: 'Sends 1-tap manager approval & warehouse arrival notification',
        payload: {
          recordType: 'Push / WhatsApp Alert',
          sourceApp: 'Notification Service',
          targetApp: 'Operations Mobile Team',
          fieldsProcessed: 6,
          accuracy: 'Delivered',
          sample: {
            'Recipient': 'Ops Lead (+1 415-***-8821)',
            'Message': 'PO #4892 posted successfully ($14,850)',
            'Delivery_Status': 'Delivered (Read)',
            'Timestamp': '10:42:01.63',
            'Priority': 'Normal'
          }
        }
      }
    ],
    logs: [
      '10:42:01.04 [INGEST] PDF attachment detected: "PO_Apex_8941.pdf" (1.8MB)',
      '10:42:01.09 [PARSER] Multi-modal extraction initialized (14 line items identified)',
      '10:42:01.33 [VALIDATE] Cross-referenced vendor DB: Apex Global Components (ID: V-841)',
      '10:42:01.44 [LEDGER] QuickBooks API transaction created (Ref: VCH-98104)',
      '10:42:01.55 [INVENTORY] Stock quantities updated (+750 units allocated to Bay 4)',
      '10:42:01.63 [NOTIFY] WhatsApp alert delivered to Operations Manager'
    ]
  },
  {
    id: 'smart-stock',
    name: 'Smart Stock & Auto-Reorder',
    tag: 'Warehouse & Supply Chain',
    description: 'Monitors real-time stock levels across ERP and spreadsheets, forecasts shortages, and drafts supplier reorder emails automatically.',
    timeSaved: '14 hrs / week',
    estAnnualSavings: '$32,000 / yr',
    nodes: [
      {
        id: 's1',
        stepNumber: '01',
        category: 'source',
        title: 'Stock Monitor',
        subtitle: 'Live Inventory Feed',
        icon: 'boxes',
        latency: '60ms',
        details: 'Detects SKU #ST-409 stock level is below safety margin (18 / 100 units)',
        payload: {
          recordType: 'Inventory Threshold Event',
          sourceApp: 'Warehouse DB / Excel',
          targetApp: 'Replenishment Engine',
          fieldsProcessed: 12,
          accuracy: 'Real-time',
          sample: {
            'SKU': 'ST-409 (High-Temp Valve)',
            'Current_Qty': 18,
            'Min_Safety_Stock': 100,
            'Burn_Rate': '14 units/day',
            'Facility': 'Warehouse East #2'
          }
        }
      },
      {
        id: 's2',
        stepNumber: '02',
        category: 'engine',
        title: 'Forecast Engine',
        subtitle: 'Lead Time & Batch Sizing',
        icon: 'cpu',
        latency: '180ms',
        details: 'Calculates optimal reorder batch of 500 units based on supplier lead time',
        payload: {
          recordType: 'Replenishment Calculation',
          sourceApp: 'Predictive Model',
          targetApp: 'PO Generator',
          fieldsProcessed: 15,
          accuracy: '99.4%',
          sample: {
            'Optimal_Order_Qty': 500,
            'Supplier_Lead_Time': '4 Days',
            'Estimated_Stockout': 'Tomorrow 3:00 PM',
            'Contract_Rate': '$18.50 / unit',
            'Safety_Buffer': '12 Days'
          }
        }
      },
      {
        id: 's3',
        stepNumber: '03',
        category: 'sync',
        title: 'Draft PO Creator',
        subtitle: 'Auto-Vendor Rates',
        icon: 'fileText',
        latency: '95ms',
        details: 'Drafts vendor purchase order with pre-negotiated discount rates',
        payload: {
          recordType: 'Draft Purchase Order',
          sourceApp: 'PO Generator',
          targetApp: 'Supplier Portal / Email',
          fieldsProcessed: 14,
          accuracy: '100%',
          sample: {
            'Supplier': 'Precision Valve Corp',
            'Draft_PO': 'PO-DRAFT-4401',
            'Total': '$9,250.00',
            'Delivery_Target': 'Thursday 08:00',
            'Payment_Terms': 'Net 45'
          }
        }
      },
      {
        id: 's4',
        stepNumber: '04',
        category: 'notify',
        title: '1-Tap Approval',
        subtitle: 'Slack / Mobile Action',
        icon: 'smartphone',
        latency: '50ms',
        details: 'Delivers 1-tap "Approve & Send" card to Warehouse Director',
        payload: {
          recordType: 'Approval Request',
          sourceApp: 'Notification Broker',
          targetApp: 'Slack / WhatsApp',
          fieldsProcessed: 8,
          accuracy: 'Instant',
          sample: {
            'Action_Required': 'Approve PO-DRAFT-4401',
            'One_Click_Send': 'Enabled',
            'Status': 'Awaiting 1-Tap Tap',
            'Channel': '#procurement-approvals',
            'Urgency': 'High'
          }
        }
      }
    ],
    logs: [
      '10:42:01.02 [MONITOR] SKU ST-409 triggered low stock alert (18 < 100 threshold)',
      '10:42:01.08 [FORECAST] Calculated reorder quantity: 500 units (4-day supplier lead time)',
      '10:42:01.26 [VENDOR] Pulled preferred supplier rates from Precision Valve Corp',
      '10:42:01.35 [DRAFT_PO] PO-DRAFT-4401 generated with total value $9,250.00',
      '10:42:01.40 [DISPATCH] Sent 1-tap approval card to #procurement-approvals'
    ]
  },
  {
    id: 'daily-report',
    name: 'Daily Executive Brief',
    tag: 'Management & Operations',
    description: 'Pulls shift logs, sales figures, and operational metrics from multiple spreadsheets into a single daily summary delivered to leadership at 6 PM.',
    timeSaved: '10 hrs / week',
    estAnnualSavings: '$24,000 / yr',
    nodes: [
      {
        id: 'r1',
        stepNumber: '01',
        category: 'source',
        title: 'Spreadsheet Harvest',
        subtitle: 'Excel / Google Sheets / ERP',
        icon: 'database',
        latency: '75ms',
        details: 'Aggregates 4 distributed shift spreadsheets & daily sales tallies',
        payload: {
          recordType: 'Multi-Source Data Aggregation',
          sourceApp: '4x Distributed Spreadsheets',
          targetApp: 'Analytics Pipeline',
          fieldsProcessed: 48,
          accuracy: '100%',
          sample: {
            'Files_Synced': 'Shift_A.xlsx, Shift_B.xlsx, Orders.csv',
            'Total_Rows_Read': 1420,
            'Duplicates_Removed': 12,
            'Sync_Latency': '75ms',
            'Validation': 'Passed (0 errors)'
          }
        }
      },
      {
        id: 'r2',
        stepNumber: '02',
        category: 'engine',
        title: 'KPI & Anomaly Filter',
        subtitle: 'Automated Crunching',
        icon: 'cpu',
        latency: '220ms',
        details: 'Computes daily output, scrap rate, margin variance, and bottlenecks',
        payload: {
          recordType: 'KPI Compilation',
          sourceApp: 'Analytics Core',
          targetApp: 'Executive Template',
          fieldsProcessed: 20,
          accuracy: 'Verified',
          sample: {
            'Daily_Production': '4,850 Units (104% to target)',
            'Scrap_Rate': '0.42% (Down 0.18%)',
            'Total_Revenue': '$68,400.00',
            'Efficiency_Score': '98.6%',
            'Variance': '+4.1%'
          }
        }
      },
      {
        id: 'r3',
        stepNumber: '03',
        category: 'sync',
        title: 'Executive PDF Formatter',
        subtitle: 'Clean Visual Summary',
        icon: 'fileText',
        latency: '90ms',
        details: 'Generates branded 1-page visual summary PDF with highlighted trends',
        payload: {
          recordType: 'Executive Report Document',
          sourceApp: 'PDF Generator',
          targetApp: 'Email & WhatsApp Dispatch',
          fieldsProcessed: 10,
          accuracy: 'Branded',
          sample: {
            'Document_Title': 'Daily Executive Briefing',
            'Pages': '1 Page (High Density)',
            'Format': 'PDF + Mobile Summary',
            'Charts_Included': 'Output, Scrap, Variance',
            'Status': 'Compiled'
          }
        }
      },
      {
        id: 'r4',
        stepNumber: '04',
        category: 'notify',
        title: 'Evening Delivery',
        subtitle: 'Direct Inbox at 6:00 PM',
        icon: 'mail',
        latency: '40ms',
        details: 'Delivered directly to executive emails & team WhatsApp group',
        payload: {
          recordType: 'Scheduled Dispatch',
          sourceApp: 'Email & Messaging Service',
          targetApp: 'Leadership Team (5 Recipients)',
          fieldsProcessed: 5,
          accuracy: 'Delivered',
          sample: {
            'Recipients': 'CEO, COO, Head of Ops',
            'Delivery_Time': '18:00:00 (Daily)',
            'Attachment': 'executive-brief.pdf',
            'SMS_Summary': 'Sent to 3 numbers',
            'Confirmation': '100% Delivered'
          }
        }
      }
    ],
    logs: [
      '18:00:00.00 [CRON] Daily 6:00 PM operational harvest triggered',
      '18:00:00.08 [HARVEST] 4 distributed spreadsheets read and normalized (1,420 rows)',
      '18:00:00.30 [ANALYTICS] Production output calculated: 4,850 units (104% to target)',
      '18:00:00.39 [PDF] Branded 1-page Executive Brief generated',
      '18:00:00.43 [DISPATCH] Email & WhatsApp delivered to leadership team (5 recipients)'
    ]
  }
];

// Memoized, hardware-accelerated Background Component to prevent repaints/flicker/glitches
const HeroBackground = memo(() => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
      style={{
        transform: 'translate3d(0, 0, 0)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        contain: 'paint layout'
      }}
    >
      <img
        src={heroBgImg}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover object-center opacity-70 scale-100"
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
        style={{
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
      />
      {/* Soft gradient masks */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/60 via-[#09090B]/30 to-[#09090B]/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#09090B]/20 to-[#09090B]/60" />
      
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#F26522]/20 via-[#F26522]/5 to-transparent blur-[130px] rounded-full" />
    </div>
  );
});

HeroBackground.displayName = 'HeroBackground';

export const Hero: React.FC<HeroProps> = ({ onOpenAudit, onExploreSolutions }) => {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 2>(1);
  const [customSelectedNodeIndex, setCustomSelectedNodeIndex] = useState<number | null>(null);
  const [logFilter, setLogFilter] = useState<'all' | 'latest'>('all');
  const logsContainerRef = useRef<HTMLDivElement>(null);

  const currentPreset = WORKFLOW_PRESETS[activePresetIndex] || WORKFLOW_PRESETS[0];

  // Pure derived state - zero risk of cascading update loops
  const effectiveNodeIndex = customSelectedNodeIndex !== null ? customSelectedNodeIndex : activeStepIndex;
  const selectedNode = currentPreset.nodes[effectiveNodeIndex] || currentPreset.nodes[0];
  const terminalLogs = logFilter === 'latest' 
    ? [currentPreset.logs[Math.min(activeStepIndex, currentPreset.logs.length - 1)]]
    : currentPreset.logs.slice(0, Math.min(activeStepIndex + 2, currentPreset.logs.length));

  // Single cleanly controlled interval timer
  useEffect(() => {
    if (!isPlaying) return;
    const intervalTime = playbackSpeed === 1 ? 2600 : 1300;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % 4);
      setCustomSelectedNodeIndex(null);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const renderIcon = (iconName: string, className: string = 'w-4 h-4') => {
    switch (iconName) {
      case 'mail':
        return <Mail className={className} />;
      case 'cpu':
        return <Cpu className={className} />;
      case 'database':
        return <Database className={className} />;
      case 'smartphone':
        return <Smartphone className={className} />;
      case 'boxes':
        return <Boxes className={className} />;
      case 'fileText':
        return <FileText className={className} />;
      case 'barChart':
        return <BarChart3 className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-[#09090B] border-b border-zinc-800 overflow-hidden min-h-[920px]">
      {/* Decoupled Memoized Background */}
      <HeroBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* HERO TITLE & CALL TO ACTIONS */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 backdrop-blur-sm shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26522] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F26522]"></span>
            </span>
            <span className="text-xs font-mono text-zinc-300">
              Live Interactive Automation Engine
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-display leading-[1.12]">
            Automate the repetitive work in{' '}
            <span className="text-[#F26522]">
              your business.
            </span>
          </h1>

          {/* Plain English Subtitle */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed">
            We connect your spreadsheets, emails, invoices, and ERP databases so your team never wastes hours on manual data entry again.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="hero-get-audit-btn"
              onClick={onOpenAudit}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-sm transition-colors cursor-pointer shadow-md"
            >
              <span>Get a Free Workflow Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-explore-solutions-btn"
              onClick={onExploreSolutions}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-medium text-sm transition-colors cursor-pointer backdrop-blur-sm"
            >
              <span>Explore Solutions</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          {/* 3 Quick Guarantees */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-7 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Free Architecture Blueprint</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>No new software to learn</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#F26522]" />
              <span>Starts at $250 / workflow</span>
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* INTERACTIVE WORKFLOW PIPELINE SIMULATOR (ANIMATION) */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: 'easeOut' }}
          className="mt-10 max-w-5xl mx-auto"
        >
          <div className="rounded-2xl bg-[#111114]/95 border border-zinc-800 shadow-2xl backdrop-blur-md overflow-hidden">
            
            {/* Top Toolbar: Scenario Switcher + Playback Controls */}
            <div className="px-4 py-3 bg-[#16161A] border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3 min-h-[52px]">
              
              {/* Preset Selector Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
                {WORKFLOW_PRESETS.map((preset, idx) => {
                  const isSelected = idx === activePresetIndex;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setActivePresetIndex(idx);
                        setActiveStepIndex(0);
                        setCustomSelectedNodeIndex(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                        isSelected 
                          ? 'bg-[#F26522] text-white font-semibold shadow-sm'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                      }`}
                    >
                      <Activity className={`w-3 h-3 ${isSelected ? 'text-white' : 'text-zinc-500'}`} />
                      <span>{preset.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Controls (Play/Pause, Speed, Reset) */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Speed toggle */}
                <button
                  onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 2 : 1)}
                  className="px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-xs font-mono cursor-pointer transition-colors border border-zinc-700/50"
                  title="Toggle animation speed"
                >
                  {playbackSpeed}x Speed
                </button>

                {/* Reset */}
                <button
                  onClick={() => {
                    setActiveStepIndex(0);
                    setCustomSelectedNodeIndex(null);
                  }}
                  className="p-1.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 cursor-pointer transition-colors border border-zinc-700/50"
                  title="Reset simulation to step 1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {/* Play / Pause */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors border border-zinc-700"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3 h-3 text-orange-400" />
                      <span className="text-[11px] font-mono text-zinc-300">Live Flow</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-emerald-400" />
                      <span className="text-[11px] font-mono text-zinc-300">Resume</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Scenario Header Info with strict min-height */}
            <div className="p-4 sm:p-5 border-b border-zinc-800/80 bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-h-[78px]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-medium text-[#F26522] uppercase tracking-wider">
                    {currentPreset.tag}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs text-zinc-400">
                    Live Data Flow Pipeline
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl line-clamp-2">
                  {currentPreset.description}
                </p>
              </div>

              {/* Time and Dollar Savings Badges */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <div className="bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg text-xs text-emerald-300 font-medium inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saves {currentPreset.timeSaved}</span>
                </div>
                <div className="bg-orange-950/30 border border-orange-800/30 px-3 py-1.5 rounded-lg text-xs text-orange-300 font-mono inline-flex items-center gap-1">
                  <span>{currentPreset.estAnnualSavings}</span>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* 4 CONNECTED ANIMATED PIPELINE NODES */}
            {/* ======================================================== */}
            <div className="p-4 sm:p-6 space-y-6">
              
              {/* Nodes Row with Animated Connection Path */}
              <div className="relative">
                
                {/* SVG Animated Connector Line */}
                <div className="hidden md:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-zinc-800 z-0 pointer-events-none">
                  {/* Glowing Pulse moving across */}
                  <motion.div
                    animate={{
                      left: `${(activeStepIndex / 3) * 100}%`,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-2 bg-gradient-to-r from-transparent via-[#F26522] to-transparent blur-[2px]"
                  />
                  {/* Active fill line */}
                  <motion.div
                    animate={{
                      width: `${(activeStepIndex / 3) * 100}%`,
                    }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    className="h-full bg-gradient-to-r from-zinc-700 via-[#F26522] to-[#F26522]"
                  />
                </div>

                {/* 4 Step Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
                  {currentPreset.nodes.map((node, idx) => {
                    const isCurrent = idx === activeStepIndex;
                    const isCompleted = idx < activeStepIndex;
                    const isSelected = selectedNode?.id === node.id;

                    return (
                      <div
                        key={node.id}
                        onClick={() => {
                          setActiveStepIndex(idx);
                          setCustomSelectedNodeIndex(idx);
                          setIsPlaying(false);
                        }}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between min-h-[148px] ${
                          isCurrent
                            ? 'bg-zinc-800/90 border-[#F26522] shadow-lg ring-1 ring-[#F26522]/50 scale-[1.02]'
                            : isCompleted
                            ? 'bg-zinc-900/80 border-zinc-700/80 text-zinc-300'
                            : 'bg-zinc-900/40 border-zinc-800/60 text-zinc-500 opacity-75 hover:opacity-100'
                        }`}
                      >
                        {/* Top Node Badge */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold text-zinc-500">
                              STEP {node.stepNumber}
                            </span>
                            
                            {isCurrent ? (
                              <span className="flex items-center gap-1 text-[10px] font-mono font-semibold text-[#F26522] bg-[#F26522]/10 px-1.5 py-0.5 rounded border border-[#F26522]/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#F26522] animate-pulse" />
                                ACTIVE
                              </span>
                            ) : isCompleted ? (
                              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                                DONE
                              </span>
                            ) : (
                              <span className="text-[10px] font-mono text-zinc-600">
                                QUEUED
                              </span>
                            )}
                          </div>

                          {/* Node Icon & Name */}
                          <div className="flex items-center gap-2 mb-1.5">
                            <div className={`p-1.5 rounded-lg shrink-0 ${
                              isCurrent 
                                ? 'bg-[#F26522] text-white shadow-sm' 
                                : isCompleted 
                                ? 'bg-zinc-800 text-zinc-300' 
                                : 'bg-zinc-900 text-zinc-500'
                            }`}>
                              {renderIcon(node.icon, 'w-3.5 h-3.5')}
                            </div>
                            <span className={`text-xs font-bold truncate ${isCurrent ? 'text-white' : 'text-zinc-300'}`}>
                              {node.title}
                            </span>
                          </div>

                          <p className="text-[11px] text-zinc-400 leading-snug line-clamp-2 h-[28px]">
                            {node.subtitle}
                          </p>
                        </div>

                        {/* Latency / Execution Time */}
                        <div className="mt-3 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {node.latency}
                          </span>
                          <span className={isSelected ? 'text-[#F26522] font-semibold' : 'text-zinc-500'}>
                            Inspect &rarr;
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ======================================================== */}
              {/* LOWER SECTION: PAYLOAD INSPECTOR + LIVE TERMINAL LOGS */}
              {/* ======================================================== */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-2">
                
                {/* Left: Interactive Node Payload Inspector */}
                <div className="lg:col-span-7 p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col justify-between min-h-[265px]">
                  <div>
                    <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-zinc-800/80">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#F26522]" />
                        <h4 className="text-xs font-mono uppercase font-bold text-zinc-300 truncate">
                          Payload: {selectedNode?.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded shrink-0">
                        Accuracy: {selectedNode?.payload.accuracy}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 mb-2.5 line-clamp-1">
                      {selectedNode?.details}
                    </p>

                    {/* Key-Value Payload preview */}
                    <div className="rounded-lg bg-[#0D0D10] border border-zinc-800/80 p-3 space-y-1 font-mono text-[11px] min-h-[145px]">
                      <div className="flex justify-between text-zinc-500 border-b border-zinc-800/50 pb-1 mb-1 text-[10px]">
                        <span>Source: <strong className="text-zinc-300">{selectedNode?.payload.sourceApp}</strong></span>
                        <span>Target: <strong className="text-zinc-300">{selectedNode?.payload.targetApp}</strong></span>
                      </div>

                      {selectedNode?.payload.sample && Object.entries(selectedNode.payload.sample).slice(0, 5).map(([k, v]) => (
                        <div key={k} className="flex items-center justify-between text-xs py-0.5">
                          <span className="text-zinc-400 font-normal">{k}:</span>
                          <span className="text-amber-300/90 font-medium truncate max-w-[200px]">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-500 border-t border-zinc-800/60">
                    <span>Fields Processed: {selectedNode?.payload.fieldsProcessed}</span>
                    <span>Status: Verified & Synced</span>
                  </div>
                </div>

                {/* Right: Live Telemetry Terminal */}
                <div className="lg:col-span-5 p-4 rounded-xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between font-mono text-xs min-h-[265px]">
                  <div>
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-zinc-800">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#F26522]" />
                        <span className="text-[11px] text-zinc-300 font-bold uppercase">
                          Execution Stream
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-zinc-500">240 FPS</span>
                      </div>
                    </div>

                    <div 
                      ref={logsContainerRef}
                      className="space-y-1.5 text-[11px] text-zinc-400 h-[155px] overflow-y-auto pr-1"
                    >
                      {terminalLogs.map((log, lIdx) => (
                        <div key={lIdx} className="leading-relaxed flex items-start gap-1.5">
                          <span className="text-[#F26522] shrink-0">&gt;</span>
                          <span className={lIdx === terminalLogs.length - 1 ? 'text-zinc-200 font-semibold' : 'text-zinc-400'}>
                            {log}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500">
                    <span>Engine Uptime: 99.98%</span>
                    <button
                      onClick={() => setLogFilter(logFilter === 'all' ? 'latest' : 'all')}
                      className="text-zinc-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>{logFilter === 'all' ? 'Filter Stream' : 'Show All'}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Bottom Quick Callout */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 border-t border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F26522]" />
                  <span>Custom configured for your company with zero downtime.</span>
                </div>
                <button
                  onClick={onOpenAudit}
                  className="text-[#F26522] hover:text-orange-300 font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Build this pipeline for your business</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
