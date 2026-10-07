import React from 'react';
import { Logo } from './Logo';
import { 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  Linkedin, 
  Lock
} from 'lucide-react';
import { useSmoothScroll } from '../context/SmoothScrollContext';

interface FooterProps {
  onOpenAudit: () => void;
  onOpenBrandAssets?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAudit, onOpenBrandAssets }) => {
  const { scrollTo } = useSmoothScroll();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href, { offset: -80, duration: 1.2 });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showBadge={false} variant="dark" />
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Autonomous AI voice calling agents for businesses. We deploy human-sounding phone assistants connected to your phone lines, CRM, and calendars with sub-350ms latency.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:text-white hover:border-slate-600 transition-colors flex items-center gap-2 text-xs font-mono" 
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="mailto:support@upframa.com" 
                className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:text-white hover:border-slate-600 transition-colors flex items-center gap-2 text-xs font-mono" 
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Email</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-emerald-400" />
                SOC-2 Ready
              </span>
              <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-slate-400" />
                256-bit TLS Encryption
              </span>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#voice-ai" onClick={(e) => scrollToSection(e, '#voice-ai')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Voice AI Agent</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/60">Live</span>
                </a>
              </li>
              <li>
                <a href="#upcoming-services" onClick={(e) => scrollToSection(e, '#upcoming-services')} className="hover:text-white transition-colors">
                  Upcoming Services
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => scrollToSection(e, '#how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => scrollToSection(e, '#pricing')} className="hover:text-white transition-colors">
                  Starter Pricing
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Capabilities Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#voice-ai" onClick={(e) => scrollToSection(e, '#voice-ai')} className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
                  Autonomous Voice Agent (Live)
                </a>
              </li>
              <li>
                <a href="#upcoming-services" onClick={(e) => scrollToSection(e, '#upcoming-services')} className="hover:text-white transition-colors">
                  Invoice Auto-Entry (Upcoming)
                </a>
              </li>
              <li>
                <a href="#upcoming-services" onClick={(e) => scrollToSection(e, '#upcoming-services')} className="hover:text-white transition-colors">
                  Inventory Monitoring (Upcoming)
                </a>
              </li>
              <li>
                <a href="#upcoming-services" onClick={(e) => scrollToSection(e, '#upcoming-services')} className="hover:text-white transition-colors">
                  Shift Reporting (Upcoming)
                </a>
              </li>
              <li>
                <a href="#upcoming-services" onClick={(e) => scrollToSection(e, '#upcoming-services')} className="hover:text-white transition-colors">
                  Logistics & 3PL Sync (Upcoming)
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Consultation Column */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Consultation
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Book a diagnostic session to identify your first automated workflow with our engineering team.
            </p>

            <button
              onClick={onOpenAudit}
              className="w-full py-2.5 px-4 rounded-xl bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs hover:shadow-sm active:scale-[0.98]"
            >
              <span>Book Free Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {onOpenBrandAssets && (
              <button
                onClick={onOpenBrandAssets}
                className="w-full py-1 text-center text-[11px] font-mono text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
              >
                Brand Assets & Logos →
              </button>
            )}
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © 2026 UpFrama Technologies Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="mailto:support@upframa.com" className="hover:text-slate-300 transition-colors">support@upframa.com</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
