import React from 'react';
import { Logo } from './Logo';
import { 
  ShieldCheck, 
  ArrowRight, 
  Mail, 
  Linkedin, 
  Lock
} from 'lucide-react';

interface FooterProps {
  onOpenAudit: () => void;
  onOpenBrandAssets?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAudit, onOpenBrandAssets }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-[#09090B] border-t border-zinc-800 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-3">
            <Logo size="md" showBadge={false} />
            
            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed mt-2">
              AI business automation for manufacturing, warehousing, and logistics companies. We connect existing systems with zero disruption.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono" 
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
                <span>LinkedIn</span>
              </a>
              <a 
                href="mailto:support@upframa.com" 
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono" 
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5 text-zinc-400" />
                <span>Email</span>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-zinc-500">
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                SOC-2 Ready
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-zinc-400" />
                256-bit Encryption
              </span>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <a href="#solutions" onClick={(e) => scrollToSection(e, '#solutions')} className="hover:text-white transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => scrollToSection(e, '#how-it-works')} className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => scrollToSection(e, '#pricing')} className="hover:text-white transition-colors">
                  Pricing
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
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold">
              Solutions
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <a href="#solutions" onClick={(e) => scrollToSection(e, '#solutions')} className="hover:text-white transition-colors">
                  Production Automation
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={(e) => scrollToSection(e, '#solutions')} className="hover:text-white transition-colors">
                  Inventory Monitoring
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={(e) => scrollToSection(e, '#solutions')} className="hover:text-white transition-colors">
                  Purchase Approvals
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={(e) => scrollToSection(e, '#solutions')} className="hover:text-white transition-colors">
                  Warehouse Sync
                </a>
              </li>
              <li>
                <a href="#solutions" onClick={(e) => scrollToSection(e, '#solutions')} className="hover:text-white transition-colors">
                  Logistics & Tracking
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Consultation Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-200 font-semibold">
              Consultation
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Book a 30-minute diagnostic session to identify your first automated workflow.
            </p>

            <button
              onClick={onOpenAudit}
              className="w-full py-2 px-3 rounded-lg bg-[#F26522] hover:bg-[#DE5516] text-white font-medium text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Book Free Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {onOpenBrandAssets && (
              <button
                onClick={onOpenBrandAssets}
                className="w-full py-1 text-center text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                Brand Assets & Logos →
              </button>
            )}
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="mt-10 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <div>
            © 2026 UpFrama Technologies Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
            <a href="mailto:support@upframa.com" className="hover:text-zinc-300 transition-colors">support@upframa.com</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
