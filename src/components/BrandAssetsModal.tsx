import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, Download } from 'lucide-react';
import { UpframaIcon, UpframaLogo, UpframaBanner } from './UpframaLogo';

interface BrandAssetsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandAssetsModal: React.FC<BrandAssetsModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'logos' | 'banners'>('all');

  if (!isOpen) return null;

  const handleCopySvg = (index: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const svgMonogramCode = `<svg width="500" height="560" viewBox="0 0 500 560" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 22 22 L 115 22 L 115 330 C 115 385 145 425 195 440 L 195 558 C 105 540 22 455 22 340 Z" stroke="#F26522" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 285 165 C 290 85 335 22 415 22 L 485 22 L 485 105 L 415 105 C 395 105 382 118 382 140 L 382 185 L 485 185 L 485 268 L 382 268 L 382 335 C 382 385 352 425 305 440 L 305 558 C 390 540 485 455 485 340 L 485 268" stroke="#F26522" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 205 558 L 205 270 L 122 270 L 250 145 L 378 270 L 295 270 L 295 558 Z" fill="#BA3700" stroke="#F26522" stroke-width="18" stroke-linejoin="round" stroke-linecap="round"/>
</svg>`;

  const assets = [
    {
      id: 'official-light-lockup',
      title: 'Official Light Horizontal Lockup',
      description: 'Horizontal lockup optimized for light backgrounds, reports, and headers.',
      type: 'logos',
      render: (
        <div className="w-full h-40 rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-4 shadow-xs">
          <UpframaLogo size="lg" layout="horizontal" variant="light" showBadge={true} badgeText="AI Ops" />
        </div>
      ),
      svgString: svgMonogramCode,
      downloadName: 'upframa-horizontal-light.svg'
    },
    {
      id: 'primary-dark-horizontal',
      title: 'Dark Horizontal Signature',
      description: 'Horizontal lockup for obsidian, slate, and dark interfaces.',
      type: 'logos',
      render: (
        <div className="w-full h-40 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center p-4 shadow-xs">
          <UpframaLogo size="lg" layout="horizontal" variant="dark" showBadge={false} />
        </div>
      ),
      svgString: svgMonogramCode,
      downloadName: 'upframa-horizontal-dark.svg'
    },
    {
      id: 'monogram-icon',
      title: 'UF Upward Arrow Monogram',
      description: 'Standalone geometric glyph for app icons, favicons, and telemetry.',
      type: 'logos',
      render: (
        <div className="w-full h-40 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-4 shadow-xs">
          <UpframaIcon size={64} variant="clean" />
        </div>
      ),
      svgString: svgMonogramCode,
      downloadName: 'upframa-monogram-icon.svg'
    },
    {
      id: 'twitter-header',
      title: 'Official Social Banner',
      description: 'Wide brand banner featuring the watermark monogram and identity.',
      type: 'banners',
      render: (
        <div className="w-full">
          <UpframaBanner className="scale-90 origin-center rounded-2xl" />
        </div>
      ),
      svgString: svgMonogramCode,
      downloadName: 'upframa-banner.svg'
    }
  ];

  const filteredAssets = activeTab === 'all' ? assets : assets.filter(a => a.type === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white/90 backdrop-blur-2xl border border-white/90 rounded-3xl shadow-[0_25px_60px_rgba(15,23,42,0.25),inset_0_1px_2px_rgba(255,255,255,1)] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-200/50 bg-white/60 backdrop-blur-md flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-950 font-display">
              UpFrama Brand Kit & Logos
            </h3>
            <p className="text-xs text-slate-500">
              Official vector SVGs, lockups, and design marks.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/80 backdrop-blur-xs border border-white/90 text-slate-500 hover:text-slate-900 hover:bg-white transition-colors cursor-pointer shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="px-6 py-3 border-b border-slate-200/50 bg-white/40 backdrop-blur-sm flex items-center gap-2">
          {(['all', 'logos', 'banners'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                activeTab === tab 
                  ? 'bg-[#F26522] text-white shadow-xs' 
                  : 'bg-white/70 border border-white/80 text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssets.map((asset, idx) => (
              <div 
                key={asset.id}
                className="p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/90 shadow-[0_4px_16px_rgba(15,23,42,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col justify-between"
              >
                <div>
                  <div className="mb-3">
                    {asset.render}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {asset.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {asset.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleCopySvg(idx, asset.svgString)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer shadow-xs"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy SVG</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`data:image/svg+xml;utf8,${encodeURIComponent(asset.svgString)}`}
                    download={asset.downloadName}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F26522] text-white text-xs font-semibold hover:bg-[#DE5516] transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Official Vector Brand Assets
          </span>
          <button 
            onClick={onClose}
            className="text-slate-700 font-semibold hover:underline"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
