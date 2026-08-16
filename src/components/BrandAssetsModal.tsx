import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck } from 'lucide-react';
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

  const svgMonogramCode = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 27 20 L 36 20 L 36 60 C 36 71 43 78 50 78 C 57 78 64 71 64 60 L 64 48 L 73 48 L 73 40 L 64 40 L 64 30 C 64 24 60 20 54 20 L 52 20 L 52 28 L 54 28 C 55.5 28 56 28.5 56 30 L 56 40 L 52 40 L 52 48 L 56 48 L 56 60 C 56 66 53 70 50 70 C 47 70 44 66 44 60 L 44 20 L 27 20 Z" fill="#F26522"/>
  <path d="M 54 20 C 65 20 73 26 73 37 L 73 40 L 64 40 L 64 37 C 64 30 59 28 54 28 L 52 28 L 52 20 L 54 20 Z" fill="#F26522"/>
  <path d="M 64 48 L 73 48 L 73 55 L 64 55 Z" fill="#F26522"/>
  <path d="M 50 30 L 63 46 L 55 46 L 55 74 L 45 74 L 45 46 L 37 46 L 50 30 Z" fill="#DE5516"/>
</svg>`;

  const assets = [
    {
      id: 'official-vertical-lockup',
      title: 'Official Vertical Brand Lockup',
      description: 'Icon on top with "Up" (orange) and "frama" (white / dark) underneath.',
      type: 'logos',
      render: (
        <div className="w-full h-44 rounded-xl bg-white border border-zinc-200 flex flex-col items-center justify-center p-4">
          <UpframaLogo size="md" layout="vertical" variant="light" />
        </div>
      ),
      svgString: svgMonogramCode,
      downloadName: 'upframa-vertical-official.svg'
    },
    {
      id: 'primary-dark-horizontal',
      title: 'Dark Horizontal Signature',
      description: 'Horizontal navbar and footer lockup for obsidian and dark interfaces.',
      type: 'logos',
      render: (
        <div className="w-full h-44 rounded-xl bg-[#111113] border border-zinc-800 flex items-center justify-center p-4">
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
        <div className="w-full h-44 rounded-xl bg-[#111113] border border-zinc-800 flex items-center justify-center p-4">
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
          <UpframaBanner className="scale-90 origin-center" />
        </div>
      ),
      svgString: svgMonogramCode,
      downloadName: 'upframa-banner.svg'
    }
  ];

  const filteredAssets = activeTab === 'all' ? assets : assets.filter(a => a.type === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#111113] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 bg-[#09090B] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-display">
              UpFrama Brand Kit & Logos
            </h3>
            <p className="text-xs text-zinc-400">
              Official brand identity marks, vector SVGs, and lockups.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="px-6 py-2.5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'all' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All ({assets.length})
            </button>
            <button
              onClick={() => setActiveTab('logos')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'logos' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Logos (3)
            </button>
            <button
              onClick={() => setActiveTab('banners')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'banners' ? 'bg-zinc-100 text-zinc-900 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Banners (1)
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-zinc-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#F26522]" /> #F26522
            </span>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="p-6 overflow-y-auto space-y-4 flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAssets.map((asset, idx) => (
              <div
                key={asset.id}
                className="p-4 rounded-xl bg-zinc-950 border border-zinc-850 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="mb-2.5">
                    {asset.render}
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white">
                      {asset.title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      {asset.description}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    Vector SVG
                  </span>
                  
                  <button
                    onClick={() => handleCopySvg(idx, asset.svgString)}
                    className="px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-200 font-mono flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied SVG</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#F26522]" />
                        <span>Copy SVG</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#09090B] border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>UpFrama Brand Kit</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium transition-colors cursor-pointer border border-zinc-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
