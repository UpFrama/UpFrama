import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  Play, 
  Pause, 
  RotateCcw, 
  Calendar, 
  Database, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Activity, 
  Bot, 
  User, 
  Radio, 
  PackageCheck, 
  FileText,
  PhoneCall
} from 'lucide-react';

interface VoiceAssistantSectionProps {
  onOpenAudit: (preset?: string) => void;
}

interface MessageItem {
  id: string;
  sender: 'caller' | 'assistant';
  senderName: string;
  timestamp: string;
  text: string;
  actionTag?: {
    label: string;
  };
}

interface Scenario {
  id: string;
  title: string;
  category: string;
  industry: string;
  callerName: string;
  callerNumber: string;
  durationSeconds: number;
  messages: MessageItem[];
  outcomes: {
    latency: string;
    confidence: string;
    actionTaken: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: 'booking',
    title: 'Book an Appointment',
    category: 'Booking & Scheduling',
    industry: 'Calendar Sync',
    callerName: 'Sarah Jenkins',
    callerNumber: '+1 (415) 890-2134',
    durationSeconds: 20,
    messages: [
      {
        id: 'msg-1',
        sender: 'caller',
        senderName: 'Sarah',
        timestamp: '00:02',
        text: "Hi, I'd like to book an appointment for tomorrow afternoon.",
      },
      {
        id: 'msg-2',
        sender: 'assistant',
        senderName: 'UpFrama Voice AI',
        timestamp: '00:06',
        text: "Sure! I have openings tomorrow at 2:00 PM or 4:30 PM. Which works best for you?",
        actionTag: {
          label: 'calendar.checkAvailability(date="tomorrow")',
        },
      },
      {
        id: 'msg-3',
        sender: 'caller',
        senderName: 'Sarah',
        timestamp: '00:11',
        text: "2:00 PM works great for me.",
      },
      {
        id: 'msg-4',
        sender: 'assistant',
        senderName: 'UpFrama Voice AI',
        timestamp: '00:15',
        text: "All set! You're booked for tomorrow at 2:00 PM. I've sent a confirmation text to your phone.",
        actionTag: {
          label: 'calendar.createEvent(time="14:00") + sms.sendConfirmation()',
        },
      },
    ],
    outcomes: {
      latency: '290ms',
      confidence: '99.9%',
      actionTaken: 'Appointment Booked & SMS Confirmation Sent',
    },
  },
  {
    id: 'tracking',
    title: 'Track an Order',
    category: 'Customer Support',
    industry: 'E-Commerce',
    callerName: 'David Miller',
    callerNumber: '+1 (212) 555-0192',
    durationSeconds: 22,
    messages: [
      {
        id: 'msg-1',
        sender: 'caller',
        senderName: 'David',
        timestamp: '00:02',
        text: "Hi! Can you check the delivery status of my order #8492?",
      },
      {
        id: 'msg-2',
        sender: 'assistant',
        senderName: 'UpFrama Voice AI',
        timestamp: '00:06',
        text: "Looking up order #8492... It was shipped via FedEx and is out for delivery today by 3:00 PM.",
        actionTag: {
          label: 'orders.lookup(orderId="8492", carrier="FedEx")',
        },
      },
      {
        id: 'msg-3',
        sender: 'caller',
        senderName: 'David',
        timestamp: '00:12',
        text: "Can you text me the live tracking link?",
      },
      {
        id: 'msg-4',
        sender: 'assistant',
        senderName: 'UpFrama Voice AI',
        timestamp: '00:16',
        text: "Done! I just sent the live FedEx tracking link to your registered mobile number.",
        actionTag: {
          label: 'sms.sendTrackingLink(phone="+1-555-0192")',
        },
      },
    ],
    outcomes: {
      latency: '310ms',
      confidence: '99.8%',
      actionTaken: 'Order Located & Live Tracking Link Texted',
    },
  },
  {
    id: 'quote',
    title: 'Request a Quote',
    category: 'Inbound Sales',
    industry: 'Lead Capture',
    callerName: 'Michael Chang',
    callerNumber: '+1 (650) 492-7710',
    durationSeconds: 24,
    messages: [
      {
        id: 'msg-1',
        sender: 'caller',
        senderName: 'Michael',
        timestamp: '00:02',
        text: "Hello, I want to get a pricing quote for a 50-person team.",
      },
      {
        id: 'msg-2',
        sender: 'assistant',
        senderName: 'UpFrama Voice AI',
        timestamp: '00:06',
        text: "I can help with that! What's the best email address to send the pricing package to?",
      },
      {
        id: 'msg-3',
        sender: 'caller',
        senderName: 'Michael',
        timestamp: '00:11',
        text: "It's michael@company.com.",
      },
      {
        id: 'msg-4',
        sender: 'assistant',
        senderName: 'UpFrama Voice AI',
        timestamp: '00:16',
        text: "Perfect! I emailed the custom 50-seat quote to michael@company.com and notified our sales specialist.",
        actionTag: {
          label: 'crm.sendQuote(email="michael@company.com", seats=50)',
        },
      },
    ],
    outcomes: {
      latency: '330ms',
      confidence: '99.5%',
      actionTaken: 'Quote Emailed & Lead Synced to CRM',
    },
  },
];

export const VoiceAssistantSection: React.FC<VoiceAssistantSectionProps> = ({ onOpenAudit }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [visibleMessageCount, setVisibleMessageCount] = useState(1);
  const [conversationCycle, setConversationCycle] = useState(0);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const activeScenario = SCENARIOS[selectedScenarioIndex];

  // Auto-scroll chat smoothly inside the container only
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [visibleMessageCount, conversationCycle]);

  // Voice playback / message progression loop with clean timeout management
  useEffect(() => {
    if (!isPlaying) return;

    let timeoutId: NodeJS.Timeout;
    const totalMessages = activeScenario.messages.length;

    if (visibleMessageCount < totalMessages) {
      timeoutId = setTimeout(() => {
        setVisibleMessageCount((prev) => prev + 1);
      }, 2500);
    } else {
      // Graceful pause after conversation completion before smoothly looping
      timeoutId = setTimeout(() => {
        if (chatScrollRef.current) {
          chatScrollRef.current.scrollTop = 0;
        }
        setVisibleMessageCount(1);
        setConversationCycle((c) => c + 1);
      }, 4000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isPlaying, visibleMessageCount, activeScenario.id, activeScenario.messages.length]);

  const handleSelectScenario = (index: number) => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = 0;
    }
    setSelectedScenarioIndex(index);
    setVisibleMessageCount(1);
    setConversationCycle(0);
    setIsPlaying(true);
  };

  const handleRestart = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = 0;
    }
    setVisibleMessageCount(1);
    setConversationCycle((c) => c + 1);
    setIsPlaying(true);
  };

  return (
    <section 
      id="voice-ai" 
      className="py-20 sm:py-28 bg-[#F8FAFC] relative border-b border-slate-200/80 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Flagship Highlight */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-3.5 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Flagship Service • Live & Ready to Deploy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight leading-tight">
            Autonomous Voice Calling Agent
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-2xl mx-auto">
            Our primary live operational service. Replace rigid phone menus with conversational voice AI running at <span className="font-semibold text-slate-900 font-mono">&lt;350ms latency</span>. Handles bookings, tracks customer orders, and syncs your ERP/CRM in real-time.
          </p>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Column: Interactive Scenario Switcher Card */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="p-6 sm:p-7 rounded-3xl h-full flex flex-col justify-between bg-white/80 backdrop-blur-xl border border-white/90 shadow-[0_15px_35px_rgba(15,23,42,0.05),inset_0_1px_2px_rgba(255,255,255,1)]">
              <div>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-950 tracking-tight">
                      Try A Real Example
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                      Click any scenario below to see how the voice AI answers questions and takes action automatically.
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-white border border-slate-200/80 shadow-xs text-slate-600 shrink-0">
                    <Activity className="w-4 h-4 text-[#F26522]" />
                  </div>
                </div>

                {/* Scenario Selector Pills Box */}
                <div className="rounded-2xl bg-slate-50/70 border border-slate-200/60 p-3 space-y-2 mt-4">
                  {SCENARIOS.map((scenario, idx) => {
                    const isSelected = selectedScenarioIndex === idx;
                    return (
                      <button
                        key={scenario.id}
                        type="button"
                        onClick={() => handleSelectScenario(idx)}
                        className={`w-full text-left p-3 rounded-xl transition-colors duration-150 flex items-start gap-3 cursor-pointer ${
                          isSelected
                            ? 'bg-white border border-orange-300 shadow-xs'
                            : 'bg-white/60 hover:bg-white border border-slate-200/60 text-slate-700'
                        }`}
                      >
                        <div 
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected 
                              ? 'bg-[#F26522] text-white shadow-xs' 
                              : 'bg-slate-100 text-slate-600 border border-slate-200/60'
                          }`}
                        >
                          {idx === 0 && <Calendar className="w-4 h-4" />}
                          {idx === 1 && <PackageCheck className="w-4 h-4" />}
                          {idx === 2 && <FileText className="w-4 h-4" />}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-slate-950' : 'text-slate-800'}`}>
                              {scenario.title}
                            </span>
                            <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0 font-medium">
                              {scenario.industry}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 truncate font-mono">
                            Caller: {scenario.callerName}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* 2x2 Feature Highlights */}
                <div className="grid grid-cols-2 gap-2.5 mt-4">
                  <div className="p-3 rounded-xl bg-white border border-slate-200/60 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="p-1.5 rounded-lg bg-orange-50 border border-orange-200/60 text-orange-600">
                        <Clock className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9.5px] font-mono font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/60">
                        Instant
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="text-[11.5px] font-bold text-slate-900">Natural Conversation</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Understands interruptions & pauses</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200/60 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200/60 text-emerald-600">
                        <Database className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9.5px] font-mono font-medium text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200/60">
                        Connected
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="text-[11.5px] font-bold text-slate-900">Automated Actions</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Schedules calendar & sends SMS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Meta & CTA */}
              <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11.5px] font-mono text-slate-500">
                <span>24/7 Phone Automation</span>
                <span 
                  className="text-[#F26522] font-semibold flex items-center gap-1 cursor-pointer hover:underline"
                  onClick={() => onOpenAudit(`AI Voice Automation - ${activeScenario.title}`)}
                >
                  Deploy Voice Agent &rarr;
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Live Call Transcript Panel */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="p-6 sm:p-7 rounded-3xl h-full flex flex-col justify-between bg-white/45 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(15,23,42,0.04),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_0_25px_rgba(255,255,255,0.3)]">
              <div>
                {/* Top Header Row */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-950 tracking-tight">
                      Live Call Preview
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                      See how the voice assistant hears the caller, speaks back, and completes tasks.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenAudit(`AI Voice Automation - ${activeScenario.title}`)}
                    className="w-9 h-9 rounded-full bg-white/70 backdrop-blur-md border border-white/90 shadow-xs flex items-center justify-center text-slate-700 hover:text-[#F26522] hover:bg-white hover:border-orange-300 hover:shadow transition-all cursor-pointer shrink-0"
                    title="Deploy Voice Agent"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtitle / Active Phone Call Banner Bar */}
                <div className="flex items-center justify-between mb-3.5 mt-2 bg-white/55 backdrop-blur-lg border border-white/80 rounded-xl px-3 py-2 shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-white shrink-0 shadow-2xs">
                      <PhoneCall className="w-3.5 h-3.5" />
                      {isPlaying && (
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          Caller: {activeScenario.callerName}
                        </span>
                        <span className="hidden sm:inline text-[10px] font-mono text-slate-600 bg-white/80 backdrop-blur-xs px-1.5 py-0.5 rounded border border-slate-200/50">
                          {activeScenario.callerNumber}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10.5px] font-mono text-slate-500">
                        <span className="text-slate-600 font-medium">Latency: {activeScenario.outcomes.latency}</span>
                        <span>•</span>
                        <span className="text-emerald-700 font-semibold">{activeScenario.outcomes.confidence} Accuracy</span>
                      </div>
                    </div>
                  </div>

                  {/* Header Controls */}
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {/* Live Audio Equalizer Pulse */}
                    {isPlaying && (
                      <div className="hidden sm:flex items-center gap-0.5 h-4 px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/70">
                        <span className="w-0.5 h-3 bg-emerald-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                        <span className="w-0.5 h-2 bg-emerald-600 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.15s]" />
                        <span className="w-0.5 h-3.5 bg-emerald-500 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.3s]" />
                        <span className="w-0.5 h-1.5 bg-emerald-600 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.1s]" />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-slate-700 hover:bg-white hover:border-orange-300 text-[11px] font-mono font-medium flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="w-3 h-3 text-slate-500" />
                          <span className="hidden sm:inline">Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 text-emerald-600" />
                          <span className="hidden sm:inline">Play</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleRestart}
                      className="p-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-slate-600 hover:text-slate-900 hover:bg-white hover:border-orange-300 shadow-2xs transition-colors cursor-pointer"
                      title="Restart Call"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Main Visual Window Container */}
                <div className="rounded-2xl bg-white/35 backdrop-blur-xl border border-white/75 p-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_8px_24px_rgba(15,23,42,0.03)] flex flex-col justify-between">
                  
                  {/* Window Header */}
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200/40">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                      <span className="text-[11px] font-mono text-slate-600 ml-1.5 font-semibold">
                        {activeScenario.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/80 shadow-2xs">
                      <Mic className="w-3 h-3 text-[#F26522]" />
                      <span className="text-[10px] font-mono text-slate-600 font-medium">Voice AI</span>
                    </div>
                  </div>

                  {/* Transcript Scroll Area - Fixed Height for Stability */}
                  <div 
                    ref={chatScrollRef}
                    className="space-y-3.5 h-[240px] overflow-y-auto pr-1 py-1 [scrollbar-width:thin]"
                  >
                    {activeScenario.messages.slice(0, visibleMessageCount).map((msg) => {
                      const isAssistant = msg.sender === 'assistant';

                      return (
                        <motion.div
                          key={`${activeScenario.id}-${msg.id}-${conversationCycle}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            ease: 'easeOut' 
                          }}
                          className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                        >
                          {/* Assistant Avatar */}
                          {isAssistant && (
                            <div className="shrink-0 mt-0.5">
                              <div className="w-6 h-6 rounded-lg bg-orange-50/90 text-[#F26522] border border-orange-200/80 flex items-center justify-center shadow-2xs backdrop-blur-xs">
                                <Bot className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          )}

                          <div className="max-w-[85%] space-y-1">
                            {/* Sender Name & Time */}
                            <div className={`flex items-center gap-1.5 text-[10.5px] font-mono text-slate-400 ${isAssistant ? '' : 'justify-end'}`}>
                              <span className="font-semibold text-slate-700">{msg.senderName}</span>
                              <span>•</span>
                              <span>{msg.timestamp}</span>
                            </div>

                            {/* Message Bubble */}
                            <div
                              className={`p-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                                isAssistant
                                  ? 'bg-white/85 backdrop-blur-md text-slate-800 border border-white/90 rounded-tl-xs'
                                  : 'bg-slate-900/90 backdrop-blur-md text-white rounded-tr-xs border border-slate-800'
                              }`}
                            >
                              <p>{msg.text}</p>
                            </div>

                            {/* Automated System Action Tag */}
                            {msg.actionTag && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: 0.08, ease: 'easeOut' }}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50/90 backdrop-blur-xs border border-emerald-200/80 text-emerald-800 text-[10.5px] font-mono shadow-2xs"
                              >
                                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span className="truncate">{msg.actionTag.label}</span>
                              </motion.div>
                            )}
                          </div>

                          {/* User Avatar */}
                          {!isAssistant && (
                            <div className="shrink-0 mt-0.5">
                              <div className="w-6 h-6 rounded-lg bg-white/80 backdrop-blur-xs text-slate-600 border border-slate-200/60 flex items-center justify-center shadow-2xs">
                                <User className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}

                    {/* Live Speaking / Responding Indicator */}
                    {visibleMessageCount < activeScenario.messages.length && isPlaying && (
                      <motion.div
                        key={`speaking-indicator-${activeScenario.id}-${visibleMessageCount}-${conversationCycle}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={`flex items-center gap-2 py-0.5 ${
                          activeScenario.messages[visibleMessageCount].sender === 'assistant' 
                            ? 'justify-start' 
                            : 'justify-end'
                        }`}
                      >
                        {activeScenario.messages[visibleMessageCount].sender === 'assistant' ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-orange-100/90 text-[#F26522] flex items-center justify-center text-[10px] shrink-0">
                              <Bot className="w-3 h-3" />
                            </div>
                            <div className="flex items-center gap-1.5 bg-white/75 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/90 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#F26522] animate-ping" />
                              <span className="text-[10px] font-mono text-slate-600 font-medium">AI speaking...</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 bg-white/75 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/90 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-ping" />
                              <span className="text-[10px] font-mono text-slate-600 font-medium">Caller speaking...</span>
                            </div>
                            <div className="w-5 h-5 rounded-md bg-slate-200/80 text-slate-600 flex items-center justify-center text-[10px] shrink-0">
                              <User className="w-3 h-3" />
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Output Footer Line */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/40 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-slate-400">Result:</span>
                      <span className="text-slate-800 font-semibold truncate">{activeScenario.outcomes.actionTaken}</span>
                    </div>
                    <span className="text-emerald-700 bg-emerald-50/80 backdrop-blur-xs px-2 py-0.5 rounded-md border border-emerald-200/70 font-medium shrink-0">
                      {activeScenario.outcomes.latency}
                    </span>
                  </div>

                </div>
              </div>

              {/* Bottom Card Meta */}
              <div className="mt-6 pt-3 border-t border-slate-200/50 flex items-center justify-between text-[11.5px] font-mono text-slate-500">
                <span>Autonomous Voice Telephony</span>
                <span 
                  className="text-[#F26522] font-semibold flex items-center gap-1 cursor-pointer hover:underline"
                  onClick={() => onOpenAudit(`AI Voice Automation - ${activeScenario.title}`)}
                >
                  Deploy Voice AI &rarr;
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
