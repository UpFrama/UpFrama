import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useSmoothScroll } from '../context/SmoothScrollContext';

interface NavbarProps {
  onOpenAudit: () => void;
  onOpenBrandAssets?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAudit }) => {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const heroEl = document.getElementById('hero');
          const heroHeight = heroEl ? heroEl.offsetHeight : 800;

          // Hysteresis threshold to prevent flutter
          if (scrollY > heroHeight * 0.5) {
            setIsPastHero(true);
          } else if (scrollY < heroHeight * 0.35) {
            setIsPastHero(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Voice AI', href: '#voice-ai' },
    { name: 'Upcoming Services', href: '#upcoming-services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const offset = isPastHero ? -72 : -88;
    scrollTo(href, { offset, duration: 1.1 });
  };

  return (
    <>
      {/* Outer Floating Positioning Wrapper with smooth slide-in/out transitions */}
      <motion.header
        className="fixed inset-x-0 z-40 flex justify-center pointer-events-none"
        animate={{
          top: isPastHero ? 10 : 16,
          y: 0,
          opacity: 1,
          paddingLeft: isPastHero ? 14 : 24,
          paddingRight: isPastHero ? 14 : 24,
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Transparent Morphing Dock with overflow containment to prevent buttons spilling */}
        <motion.div
          className="pointer-events-auto w-full backdrop-blur-xl overflow-hidden"
          animate={{
            maxWidth: isPastHero ? 960 : 1280, // comfortable width so all buttons fit with zero overflow
            borderRadius: isPastHero ? 9999 : 24, // pill vs rounded-3xl
            paddingTop: isPastHero ? 6 : 10,
            paddingBottom: isPastHero ? 6 : 10,
            paddingLeft: isPastHero ? 16 : 24,
            paddingRight: isPastHero ? 16 : 24,
            backgroundColor: isPastHero ? 'rgba(255, 255, 255, 0.78)' : 'rgba(255, 255, 255, 0.95)',
            borderColor: isPastHero ? 'rgba(226, 232, 240, 0.75)' : 'rgba(226, 232, 240, 0.9)',
            boxShadow: isPastHero
              ? '0 14px 34px -4px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.8)'
              : '0 8px 24px -4px rgba(15, 23, 42, 0.05), 0 2px 6px rgba(15, 23, 42, 0.02), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
          }}
          style={{
            borderWidth: 1,
            borderStyle: 'solid',
          }}
          transition={{
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-3 w-full min-w-0">
            
            {/* Brand Logo with Smooth Fluid Scaling */}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#hero', { offset: 0, duration: 1 });
              }}
              className="flex items-center gap-2 group focus:outline-none shrink-0 transition-transform duration-200 active:scale-95"
            >
              <Logo 
                size={isPastHero ? 'sm' : 'md'} 
                showBadge={!isPastHero} 
                badgeText="AI Ops" 
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 shrink min-w-0 justify-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-medium transition-all duration-200 rounded-full whitespace-nowrap shrink-0 ${
                    isPastHero
                      ? 'text-xs text-slate-700 hover:text-slate-950 px-2 lg:px-2.5 py-1 hover:bg-slate-900/[0.06]'
                      : 'text-xs lg:text-sm text-slate-700 hover:text-slate-950 px-2.5 lg:px-3 py-1.5 hover:bg-slate-900/[0.05]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action & Status Area */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {/* Status Badge - only shown in wide top bar to keep dock ultra-clean */}
              {!isPastHero && (
                <div className="hidden lg:flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] bg-emerald-50/80 border border-emerald-200/70 text-emerald-800 font-mono">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Zero-Downtime Architecture</span>
                </div>
              )}

              {/* Book Audit CTA Button */}
              <button
                id="navbar-audit-btn"
                onClick={onOpenAudit}
                className={`inline-flex items-center justify-center font-semibold rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white transition-all duration-200 cursor-pointer shadow-xs hover:shadow active:scale-[0.98] whitespace-nowrap shrink-0 ${
                  isPastHero
                    ? 'px-3.5 py-1.5 text-xs gap-1.5'
                    : 'px-4 py-2 text-xs sm:text-sm gap-2'
                }`}
              >
                <span>{isPastHero ? 'Book Audit' : 'Book Free Audit'}</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1.5 md:hidden shrink-0">
              <button
                onClick={onOpenAudit}
                className={`rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold shadow-xs transition-all duration-200 whitespace-nowrap ${
                  isPastHero ? 'px-2.5 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'
                }`}
              >
                Audit
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`rounded-full bg-white/90 border border-slate-200/80 text-slate-700 hover:text-slate-950 focus:outline-none shadow-xs transition-all duration-200 ${
                  isPastHero ? 'p-1.5' : 'p-2'
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className={isPastHero ? 'w-4 h-4' : 'w-4 h-4'} />
                ) : (
                  <Menu className={isPastHero ? 'w-4 h-4' : 'w-4 h-4'} />
                )}
              </button>
            </div>

          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 top-20 z-40 bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:hidden flex flex-col justify-between border border-slate-200 shadow-2xl"
          >
            <div className="flex flex-col space-y-1.5">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">Navigation</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Ready
                </span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-semibold text-slate-800 hover:text-[#F26522] py-2.5 transition-colors flex items-center justify-between border-b border-slate-50 last:border-0"
                >
                  {link.name}
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </a>
              ))}
            </div>

            <div className="space-y-3 pt-5 border-t border-slate-100 mt-2">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Enterprise SLA:</span>
                <span className="text-slate-800 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  99.98% Uptime
                </span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAudit();
                }}
                className="w-full py-3 rounded-full bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Book a Free Automation Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
