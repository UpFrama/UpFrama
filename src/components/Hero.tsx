import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
  PhoneCall,
  Mic,
  Calendar,
  MessageSquare,
  Volume2,
  Clock,
  Check,
  Database,
  Users
} from 'lucide-react';

interface HeroProps {
  onOpenAudit: () => void;
  onExploreSolutions: () => void;
}

interface CallScenario {
  id: string;
  title: string;
  badge: string;
  callerQuery: string;
  aiResponse: string;
  callerReply: string;
  systemActions: string[];
  latency: string;
  callDuration: string;
}

const CALL_SCENARIOS: CallScenario[] = [
  {
    id: 'appointment-booking',
    title: 'Appointment Booking',
    badge: 'Calendar & Scheduling',
    callerQuery: '"Hi, do you have any service appointments available this Thursday morning?"',
    aiResponse: '"Hello! Yes, checking our schedule right now... We have an opening at 10:30 AM with our senior technician. Would you like me to reserve that slot for you?"',
    callerReply: '"Yes please, 10:30 AM works great. My name is David Miller."',
    systemActions: [
      'Verified real-time calendar availability (32ms)',
      'Reserved 10:30 AM slot in Google Calendar',
      'Sent instant SMS confirmation with reschedule link'
    ],
    latency: '240ms',
    callDuration: '00:38'
  },
  {
    id: 'customer-support',
    title: 'Customer Support & FAQs',
    badge: '24/7 Reception & FAQs',
    callerQuery: '"Hi, I need to check the status of my order #88412."',
    aiResponse: '"I can check that for you right now David. Looking up order #88412... It was dispatched this morning and is on the FedEx delivery truck, scheduled to arrive by 2:15 PM today."',
    callerReply: '"That was so fast, thank you so much for the quick update!"',
    systemActions: [
      'Queried live order database & FedEx Freight API (45ms)',
      'Sent driver tracking link via SMS to caller mobile',
      'Logged complete call transcript to support CRM'
    ],
    latency: '260ms',
    callDuration: '00:42'
  },
  {
    id: 'after-hours-leads',
    title: 'After-Hours Lead Intake',
    badge: 'Lead Qualification',
    callerQuery: '"Hi, I am looking for a commercial quote for our 12,000 sq ft office facility."',
    aiResponse: '"Thanks for reaching out! I can collect the key details and have our operations director call you tomorrow morning at 9:00 AM. What is the best direct number for you?"',
    callerReply: '"You can reach me at this number, ask for Rachel from Apex Partners."',
    systemActions: [
      'Calculated commercial lead score: High Priority (12k sq ft)',
      'Scheduled morning briefing on Sales Director calendar',
      'Pushed instant notification to team Slack channel'
    ],
    latency: '220ms',
    callDuration: '00:49'
  }
];

// Interactive neural particle network with natural organic movement and subtle depth blur
const HeroNeuralCanvas = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for fluid hover interaction
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouse.targetX = e.clientX - rect.left;
        mouse.targetY = e.clientY - rect.top;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!canvas || e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        mouse.targetX = touch.clientX - rect.left;
        mouse.targetY = touch.clientY - rect.top;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave);

    const nodeCount = 52;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseRadius: number;
      radius: number;
      phase: number;
      pulseSpeed: number;
      color: string;
      glowColor: string;
    }> = [];

    const colorPalette = [
      { color: 'rgba(242, 101, 34, 0.85)', glow: 'rgba(242, 101, 34, 0.22)' }, // Brand Orange
      { color: 'rgba(56, 189, 248, 0.85)', glow: 'rgba(56, 189, 248, 0.22)' }, // Sky Blue
      { color: 'rgba(251, 191, 36, 0.85)', glow: 'rgba(251, 191, 36, 0.22)' }  // Amber
    ];

    for (let i = 0; i < nodeCount; i++) {
      const palette = colorPalette[i % colorPalette.length];
      const baseRadius = 2.2 + Math.random() * 1.8;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        baseRadius,
        radius: baseRadius,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.6 + Math.random() * 0.8,
        color: palette.color,
        glowColor: palette.glow
      });
    }

    // Active traveling data pulses along connections
    const pulses: Array<{
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
    }> = [];

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.012;

      // Smooth mouse position interpolation
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.1;
        mouse.y += (-1000 - mouse.y) * 0.1;
      }

      // 1. Move and update nodes with natural organic drift
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Smooth wave-like harmonic motion
        n.x += n.vx + Math.sin(time * n.pulseSpeed + n.phase) * 0.18;
        n.y += n.vy + Math.cos(time * n.pulseSpeed + n.phase) * 0.18;

        // Subtle gentle breathing radius pulsation
        n.radius = n.baseRadius + Math.sin(time * 1.4 + n.phase) * 0.5;

        // Smooth boundary reflection
        if (n.x < 10) { n.x = 10; n.vx *= -1; }
        if (n.x > width - 10) { n.x = width - 10; n.vx *= -1; }
        if (n.y < 10) { n.y = 10; n.vy *= -1; }
        if (n.y > height - 10) { n.y = height - 10; n.vy *= -1; }

        // Natural organic mouse interaction (smooth sinusoidal deflection)
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 190;

          if (dist < maxDist && dist > 4) {
            // Smooth bell curve force: gentle attraction that softens near the center
            const force = Math.sin((dist / maxDist) * Math.PI) * 0.55;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
            n.radius = n.baseRadius + (1 - dist / maxDist) * 1.4;
          }
        }
      }

      // 2. Draw connections with soft two-tone gradients
      const maxDistance = 155;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const normalized = 1 - dist / maxDistance;
            let alpha = normalized * normalized * 0.32;

            // Extra gentle illumination if near mouse
            if (mouse.active) {
              const midX = (n1.x + n2.x) * 0.5;
              const midY = (n1.y + n2.y) * 0.5;
              const dToMouse = Math.hypot(mouse.x - midX, mouse.y - midY);
              if (dToMouse < 160) {
                alpha += (1 - dToMouse / 160) * 0.22;
              }
            }

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);

            // Two-tone gradient connecting the nodes
            const grad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
            grad.addColorStop(0, n1.color.replace('0.85', `${Math.min(0.65, alpha)}`));
            grad.addColorStop(1, n2.color.replace('0.85', `${Math.min(0.65, alpha)}`));

            ctx.strokeStyle = grad;
            ctx.lineWidth = normalized * 1.2 + 0.5;
            ctx.stroke();

            // Spawn occasional flowing data pulses
            if (Math.random() < 0.0004 && pulses.length < 8) {
              pulses.push({
                fromIdx: i,
                toIdx: j,
                progress: 0,
                speed: 0.012 + Math.random() * 0.014
              });
            }
          }
        }
      }

      // 3. Render glowing traveling pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const nStart = nodes[pulse.fromIdx];
        const nEnd = nodes[pulse.toIdx];
        if (!nStart || !nEnd) {
          pulses.splice(p, 1);
          continue;
        }

        const px = nStart.x + (nEnd.x - nStart.x) * pulse.progress;
        const py = nStart.y + (nEnd.y - nStart.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#F26522';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Draw layered nodes with soft ambient glow and specular shine
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Soft outer ambient halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = n.glowColor;
        ctx.fill();

        // Inner solid core
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Subtle specular highlight for natural depth
        ctx.beginPath();
        ctx.arc(n.x - n.radius * 0.3, n.y - n.radius * 0.3, n.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-75 blur-[2px] z-0" 
    />
  );
});

HeroNeuralCanvas.displayName = 'HeroNeuralCanvas';

export const Hero: React.FC<HeroProps> = ({ onOpenAudit, onExploreSolutions }) => {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const activeScenario = CALL_SCENARIOS[activeScenarioIdx];

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-[#F8FAFC] border-b border-slate-200/80 overflow-hidden">
      
      {/* Background Subtle Particle Canvas */}
      <HeroNeuralCanvas />
      
      {/* Ambient Warm Gradient Orbs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-orange-300/35 via-amber-200/30 to-sky-200/30 blur-[90px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/3 -left-20 w-[420px] h-[420px] bg-gradient-to-br from-orange-400/20 to-rose-300/15 blur-[80px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/4 -right-20 w-[420px] h-[420px] bg-gradient-to-bl from-sky-400/20 to-indigo-300/15 blur-[80px] rounded-full pointer-events-none z-0" />

      {/* Subtle Matrix Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none z-0" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ======================================================== */}
        {/* HERO TITLE & CONFIDENT VALUE PROPOSITION */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          {/* Status Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-slate-200 shadow-xs backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F26522] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F26522]"></span>
            </span>
            <span className="text-xs font-semibold text-slate-700 tracking-tight flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#F26522]" />
              Autonomous Voice Calling Infrastructure
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-950 leading-[1.12]">
            Human-sounding AI Voice Agents for{' '}
            <span className="bg-gradient-to-r from-[#F26522] via-[#FF7A1A] to-[#EA580C] bg-clip-text text-transparent">
              your business.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Deploy 24/7 autonomous phone agents running at &lt;350ms latency. Handle inbound customer inquiries, appointment bookings, and order tracking with zero hold times.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="hero-get-audit-btn"
              onClick={onOpenAudit}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm hover:shadow active:scale-[0.98]"
            >
              <span>Deploy Your Voice Agent</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-explore-solutions-btn"
              onClick={onExploreSolutions}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/90 font-medium text-sm transition-all duration-200 cursor-pointer shadow-xs hover:border-slate-300"
            >
              <span>Try Live Voice Demo</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* 3 Quick Guarantees */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-7 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>&lt;350ms Conversational Latency</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Seamless Calendar & CRM Sync</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#F26522]" />
              <span>100% Usage-Based • Pay As You Go</span>
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* SIMPLE, INTUITIVE CALL OVERVIEW (REPLACES COMPLEX DASHBOARD) */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="mt-10 max-w-4xl mx-auto"
        >
          {/* Main Card Container */}
          <div className="rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,1)] overflow-hidden">
            
            {/* Header: Call Status Bar + Scenario Switcher */}
            <div className="p-3.5 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-medium text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Call Active • Line 1</span>
                </div>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  +1 (800) 492-9102
                </span>
              </div>

              {/* Quick Scenario Selector Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mr-1 hidden md:inline">
                  Example:
                </span>
                {CALL_SCENARIOS.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => setActiveScenarioIdx(idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                      activeScenarioIdx === idx
                        ? 'bg-[#F26522] text-white shadow-xs'
                        : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60'
                    }`}
                  >
                    {sc.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Phone Audio Visualizer */}
            <div className="px-5 py-3.5 bg-slate-50/80 border-b border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                  <Volume2 className="w-4 h-4 text-[#F26522]" />
                  <span>Audio Stream (HD Opus)</span>
                </div>
                {/* Animated Waveform Bars */}
                <div className="flex items-center gap-0.5 h-4">
                  {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50, 80, 65].map((height, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [`${Math.max(20, height * 0.3)}%`, `${height}%`, `${Math.max(20, height * 0.4)}%`],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8 + (i % 4) * 0.2,
                        ease: 'easeInOut',
                        delay: i * 0.05
                      }}
                      className="w-1 bg-[#F26522] rounded-full"
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-slate-500 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                  <Zap className="w-3 h-3 text-emerald-600" />
                  Response: {activeScenario.latency}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {activeScenario.callDuration}
                </span>
              </div>
            </div>

            {/* Conversation Flow Area */}
            <div className="p-4 sm:p-6 space-y-3.5 bg-gradient-to-b from-white to-slate-50/50">
              
              {/* 1. Caller Message */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-mono text-xs shrink-0 mt-0.5">
                  <PhoneCall className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div className="flex-1 bg-white p-3.5 rounded-2xl rounded-tl-sm border border-slate-200/90 shadow-2xs max-w-xl">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono font-semibold text-slate-500 uppercase tracking-wider">
                      Caller (Incoming Speech)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">00:04</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">
                    {activeScenario.callerQuery}
                  </p>
                </div>
              </div>

              {/* 2. AI Agent Response */}
              <div className="flex items-start gap-3 justify-end">
                <div className="flex-1 bg-orange-50/80 p-3.5 rounded-2xl rounded-tr-sm border border-orange-200/80 shadow-2xs max-w-xl">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
                      <span className="text-[11px] font-mono font-bold text-[#F26522] uppercase tracking-wider">
                        UpFrama Voice Agent
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded font-semibold">
                      ⚡ &lt;300ms
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-normal">
                    {activeScenario.aiResponse}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-[#F26522] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-2xs">
                  <Mic className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* 3. Caller Follow-up */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-mono text-xs shrink-0 mt-0.5">
                  <PhoneCall className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <div className="flex-1 bg-white p-3 rounded-2xl rounded-tl-sm border border-slate-200/90 shadow-2xs max-w-xl">
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {activeScenario.callerReply}
                  </p>
                </div>
              </div>

              {/* Live Automated Actions Executed */}
              <div className="pt-2 border-t border-slate-200/70">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#F26522]" />
                  <span>Real-Time Backend Actions Executed During Call:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {activeScenario.systemActions.map((action, i) => (
                    <div 
                      key={i} 
                      className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl px-3 py-2 text-[11px] text-emerald-900 font-medium flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Strip: Key Capabilities */}
            <div className="px-5 py-3 bg-slate-100/70 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F26522]" />
                Zero hold time • Answers on ring 1
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Natural barge-in & interruption handling
              </span>
              <button
                onClick={onOpenAudit}
                className="text-[#F26522] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Get a Voice Flow for Your Business</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

          {/* 3 High-Impact Pillar Cards Underneath Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-4">
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#F26522] flex items-center justify-center mb-2.5">
                <PhoneCall className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-950 font-display">1. Answers On Ring 1</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                24/7/365 instant reception. No busy signals, no voicemail tags, and zero lost weekend leads.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2.5">
                <Mic className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-950 font-display">2. Human-Like Cadence</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Ultra-low &lt;350ms latency with realistic pauses and seamless interruption handling.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2.5">
                <Calendar className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-950 font-display">3. Live System Actions</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Directly books calendar appointments, checks CRM records, and dispatches SMS confirmations.
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
