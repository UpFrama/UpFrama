import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VoiceAssistantSection } from './components/VoiceAssistantSection';
import { ProblemSection } from './components/ProblemSection';
import { Solutions } from './components/Solutions';
import { HowItWorks } from './components/HowItWorks';
import { PricingStarter } from './components/PricingStarter';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { BrandAssetsModal } from './components/BrandAssetsModal';
import { ScrollToTop } from './components/ScrollToTop';
import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScrollContext';

function AppContent() {
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const { scrollTo, stop, start } = useSmoothScroll();

  // Control background scroll when brand assets modal is open
  useEffect(() => {
    if (isBrandModalOpen) {
      stop();
      document.body.style.overflow = 'hidden';
    } else {
      start();
      document.body.style.overflow = '';
    }
  }, [isBrandModalOpen, stop, start]);

  const handleOpenAudit = (_preset?: string) => {
    scrollTo('#discovery-calendar', { offset: -40, duration: 1.0 });
  };

  const handleExploreSolutions = () => {
    scrollTo('#voice-ai', { offset: -80, duration: 1.1 });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#F26522] selection:text-white flex flex-col relative antialiased">
      {/* Subtle Ambient Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-orange-100/40 via-amber-50/30 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute top-2/3 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-orange-50/50 via-rose-50/20 to-transparent rounded-full blur-3xl opacity-50" />
      </div>

      {/* 1. Header Navigation */}
      <Navbar
        onOpenAudit={() => handleOpenAudit()}
        onOpenBrandAssets={() => setIsBrandModalOpen(true)}
      />

      <main className="flex-grow">
        {/* 2. Hero with Plain English Value Prop & Simple Overview */}
        <Hero
          onOpenAudit={() => handleOpenAudit()}
          onExploreSolutions={handleExploreSolutions}
        />

        {/* 2.5. Autonomous AI Voice Assistant Services & Live Interactive Simulation */}
        <VoiceAssistantSection onOpenAudit={(preset) => handleOpenAudit(preset || 'AI Voice Assistant Implementation')} />

        {/* 3. Common Daily Time Wasters (4 focused problem areas) */}
        <ProblemSection onOpenAudit={(problem) => handleOpenAudit(problem || 'Operational Bottleneck Review')} />

        {/* 4. Upcoming Services Roadmap */}
        <Solutions onOpenAudit={(preset) => handleOpenAudit(preset)} />

        {/* 5. How It Works (4 simple steps) */}
        <HowItWorks onOpenAudit={() => handleOpenAudit('Discovery Session')} />

        {/* 6. Transparent Starter Pricing */}
        <PricingStarter onOpenAudit={(tier) => handleOpenAudit(tier)} />

        {/* 7. Live Cal.com Discovery Booking */}
        <FinalCta onOpenAudit={() => handleOpenAudit()} />

        {/* 8. Frequently Asked Questions ("Everything you need to know.") */}
        <FaqSection onOpenAudit={() => handleOpenAudit('FAQ Inquiry')} />
      </main>

      {/* 12. Footer */}
      <Footer
        onOpenAudit={() => handleOpenAudit()}
        onOpenBrandAssets={() => setIsBrandModalOpen(true)}
      />

      {/* Official Brand Assets & Logos Modal */}
      <BrandAssetsModal
        isOpen={isBrandModalOpen}
        onClose={() => setIsBrandModalOpen(false)}
      />

      {/* Floating Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <AppContent />
    </SmoothScrollProvider>
  );
}
