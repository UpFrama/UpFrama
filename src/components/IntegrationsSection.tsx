import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import { Reveal3D } from './Reveal3D';
import { SpotlightCard } from './SpotlightCard';

interface IntegrationsSectionProps {
  onOpenAudit: () => void;
}

export const IntegrationsSection: React.FC<IntegrationsSectionProps> = ({ onOpenAudit }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Tools' },
    { id: 'spreadsheets', name: 'Excel & Sheets' },
    { id: 'accounting', name: 'Accounting & ERP' },
    { id: 'communication', name: 'Email & WhatsApp' },
    { id: 'crm', name: 'CRM & Sales' },
    { id: 'shipping', name: 'Shipping & Carriers' }
  ];

  const tools = [
    // Spreadsheets
    { name: 'Microsoft Excel', category: 'spreadsheets', desc: 'Automate macros, data entry & reporting', badge: 'Office' },
    { name: 'Google Sheets', category: 'spreadsheets', desc: 'Real-time two-way cloud synchronization', badge: 'Cloud' },
    { name: 'Airtable', category: 'spreadsheets', desc: 'Structured database tables & operational tracking', badge: 'No-Code' },

    // Accounting & ERP
    { name: 'QuickBooks & Xero', category: 'accounting', desc: 'Auto-record invoices, bills & receipts', badge: 'Accounting' },
    { name: 'SAP & Oracle NetSuite', category: 'accounting', desc: 'Enterprise ERP purchase order & ledger sync', badge: 'Enterprise' },
    { name: 'Microsoft Dynamics & Odoo', category: 'accounting', desc: 'Synchronize inventory, sales & purchase orders', badge: 'ERP' },

    // Communication
    { name: 'Gmail & Outlook', category: 'communication', desc: 'Auto-extract attachments, invoices & emails', badge: 'Email' },
    { name: 'WhatsApp Business', category: 'communication', desc: 'Instant order alerts & customer updates', badge: 'Mobile' },
    { name: 'Slack & MS Teams', category: 'communication', desc: 'Internal team notifications & 1-tap approvals', badge: 'Chat' },

    // CRM & Sales
    { name: 'Salesforce & HubSpot', category: 'crm', desc: 'Sync customer orders, deals & fulfillment', badge: 'CRM' },
    { name: 'Shopify & WooCommerce', category: 'crm', desc: 'E-commerce order ingestion & stock updates', badge: 'Store' },
    { name: 'PostgreSQL & SQL Server', category: 'crm', desc: 'Direct database connections & custom queries', badge: 'Database' },

    // Shipping
    { name: 'FedEx, UPS & DHL', category: 'shipping', desc: 'Live tracking numbers & delivery updates', badge: 'Carriers' },
    { name: 'Custom Warehouse Systems', category: 'shipping', desc: 'Barcode scanning, stock levels & dock logs', badge: 'Warehouse' }
  ];

  const filteredTools = activeCategory === 'all' 
    ? tools 
    : tools.filter(t => t.category === activeCategory);

  return (
    <section id="integrations" className="py-16 sm:py-20 bg-[#09090B] relative border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Pop */}
        <Reveal3D direction="down" depth={35} rotation={8}>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-3 shadow-inner">
              <Layers className="w-3.5 h-3.5 text-[#F26522]" />
              <span>NO_NEW_SOFTWARE // NATIVE_STACK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-display text-white tracking-tight leading-tight">
              Works with the tools you already use every day.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl mx-auto">
              You don't need to replace your ERP, switch email apps, or migrate databases. We connect your existing tools quietly in the background.
            </p>
          </div>
        </Reveal3D>

        {/* Category Filters */}
        <Reveal3D delay={0.1} direction="up" depth={20}>
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#F26522] text-white font-semibold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </Reveal3D>

        {/* Tools Grid with 3D Tilt */}
        <Reveal3D delay={0.15} direction="up" depth={40} rotation={8}>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filteredTools.map((tool) => (
                <motion.div
                  key={tool.name}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.25 }}
                >
                  <SpotlightCard
                    enable3DTilt={true}
                    maxTilt={7}
                    className="p-4 rounded-xl bg-[#111114] border border-zinc-800 hover:border-zinc-700 transition-colors flex items-center justify-between shadow-md"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white">
                        {tool.name}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {tool.desc}
                      </p>
                    </div>

                    <span className="text-[10px] font-mono text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 shrink-0 ml-3 shadow-xs">
                      {tool.badge}
                    </span>
                  </SpotlightCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </Reveal3D>

        {/* Bottom Assurance */}
        <div className="mt-8 text-center text-xs font-mono text-zinc-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Have a custom system or in-house database? We can connect to it seamlessly.</span>
        </div>

      </div>
    </section>
  );
};
