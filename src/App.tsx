import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustIntegrations } from './components/TrustIntegrations';
import { ProblemSection } from './components/ProblemSection';
import { Solutions } from './components/Solutions';
import { BeforeAfter } from './components/BeforeAfter';
import { HowItWorks } from './components/HowItWorks';
import { IntegrationsSection } from './components/IntegrationsSection';
import { PricingStarter } from './components/PricingStarter';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { AuditBookingModal } from './components/AuditBookingModal';
import { BrandAssetsModal } from './components/BrandAssetsModal';
import { ScrollToTop } from './components/ScrollToTop';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [auditPreset, setAuditPreset] = useState<string>('General Operational Workflows');

  const handleOpenAudit = (preset?: string) => {
    if (preset) {
      setAuditPreset(preset);
    }
    setIsAuditModalOpen(true);
  };

  const handleExploreSolutions = () => {
    const el = document.getElementById('solutions');
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0402] text-[#F8F5F2] selection:bg-[#F26522] selection:text-white flex flex-col">
      {/* 1. Header Navigation */}
      <Navbar
        onOpenAudit={() => handleOpenAudit()}
        onOpenBrandAssets={() => setIsBrandModalOpen(true)}
      />

      <main className="flex-grow">
        {/* 2. Hero with Plain English Value Prop & Interactive Live Demo */}
        <Hero
          onOpenAudit={() => handleOpenAudit()}
          onExploreSolutions={handleExploreSolutions}
        />

        {/* 3. Non-Invasive Tool Compatibility Ribbon */}
        <TrustIntegrations onOpenAudit={() => handleOpenAudit()} />

        {/* 4. Common Daily Time Wasters (4 focused problem areas) */}
        <ProblemSection onOpenAudit={(problem) => handleOpenAudit(problem || 'Operational Bottleneck Review')} />

        {/* 5. What We Automate (6 practical, high-impact workflows) */}
        <Solutions onOpenAudit={(preset) => handleOpenAudit(preset)} />

        {/* 6. Before vs After Comparison */}
        <BeforeAfter onOpenAudit={() => handleOpenAudit('Before vs After Roadmap')} />

        {/* 7. How It Works (4 simple steps) */}
        <HowItWorks onOpenAudit={() => handleOpenAudit('Discovery Session')} />

        {/* 8. Works with Your Existing Tools */}
        <IntegrationsSection onOpenAudit={() => handleOpenAudit('Custom Stack Integration')} />

        {/* 9. Transparent Starter Pricing ($250 per workflow) */}
        <PricingStarter onOpenAudit={(tier) => handleOpenAudit(tier)} />

        {/* 10. Frequently Asked Questions */}
        <FaqSection onOpenAudit={() => handleOpenAudit('FAQ Inquiry')} />

        {/* 11. Final Friendly CTA */}
        <FinalCta onOpenAudit={() => handleOpenAudit()} />
      </main>

      {/* 12. Footer */}
      <Footer
        onOpenAudit={() => handleOpenAudit()}
        onOpenBrandAssets={() => setIsBrandModalOpen(true)}
      />

      {/* Interactive Audit Booking Modal */}
      <AuditBookingModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        initialPreset={auditPreset}
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
