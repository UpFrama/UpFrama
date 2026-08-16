import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenAudit: () => void;
  onOpenBrandAssets?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAudit }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#09090B]/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-md'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none">
              <Logo size="md" showBadge={true} badgeText="AI Ops" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-150 py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action & Status */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Architecture: <strong className="text-zinc-200">Zero-Downtime Build</strong></span>
              </div>

              <button
                id="navbar-audit-btn"
                onClick={onOpenAudit}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F26522] hover:bg-[#DE5516] text-white text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer shadow-sm"
              >
                <span>Book a Free Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={onOpenAudit}
                className="px-3 py-1.5 rounded-lg bg-[#F26522] hover:bg-[#DE5516] text-white text-xs font-semibold"
              >
                Audit
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#09090B]/98 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col justify-between pb-8 border-b border-zinc-800">
          <div className="flex flex-col space-y-3">
            <div className="pb-3 border-b border-zinc-800">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">Navigation</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-semibold text-zinc-300 hover:text-white py-2 transition-colors flex items-center justify-between"
              >
                {link.name}
                <ArrowRight className="w-4 h-4 text-zinc-600" />
              </a>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-zinc-800">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Status: Online</span>
              <span className="text-zinc-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Pipelines
              </span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAudit();
              }}
              className="w-full py-3 rounded-lg bg-[#F26522] hover:bg-[#DE5516] text-white font-semibold text-center flex items-center justify-center gap-2"
            >
              <span>Book a Free Automation Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
