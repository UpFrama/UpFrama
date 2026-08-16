import React from 'react';
import upframaLogoImg from '../assets/images/upframa.png';

interface UpframaIconProps {
  size?: number | string;
  className?: string;
  variant?: 'orange' | 'light' | 'dark' | 'glow' | 'clean';
}

/**
 * Official UpFrama Brand Icon using upframa.png
 */
export const UpframaIcon: React.FC<UpframaIconProps> = ({
  size = 36,
  className = '',
}) => {
  const sizePx = typeof size === 'number' ? `${size}px` : size;
  return (
    <img
      src={upframaLogoImg}
      alt="UpFrama Icon"
      style={{ height: sizePx, width: 'auto' }}
      className={`shrink-0 select-none object-contain ${className}`}
      referrerPolicy="no-referrer"
    />
  );
};

interface UpframaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'dark' | 'light' | 'white' | 'orange';
  layout?: 'horizontal' | 'vertical';
  showBadge?: boolean;
  className?: string;
  badgeText?: string;
}

/**
 * Official UpFrama Logo Lockup using src/assets/images/upframa.png + UpFrama name
 */
export const UpframaLogo: React.FC<UpframaLogoProps> = ({
  size = 'md',
  variant = 'dark',
  layout = 'horizontal',
  showBadge = false,
  className = '',
  badgeText = 'AI Ops',
}) => {
  const sizeMap = {
    sm: { height: 'h-6', text: 'text-sm font-medium tracking-tight', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { height: 'h-7 sm:h-8', text: 'text-base sm:text-lg font-medium tracking-tight', badge: 'text-[10px] px-2 py-0.5' },
    lg: { height: 'h-8 sm:h-9', text: 'text-lg sm:text-xl font-medium tracking-tight', badge: 'text-xs px-2.5 py-0.5' },
    xl: { height: 'h-10 sm:h-11', text: 'text-xl sm:text-2xl font-medium tracking-tight', badge: 'text-xs px-3 py-1' },
    '2xl': { height: 'h-12 sm:h-14', text: 'text-2xl sm:text-3xl font-medium tracking-tight', badge: 'text-sm px-3.5 py-1' },
  };

  const config = sizeMap[size] || sizeMap.md;
  const isLight = variant === 'light';

  if (layout === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <img
          src={upframaLogoImg}
          alt="UpFrama"
          className={`${config.height} w-auto object-contain shrink-0`}
          referrerPolicy="no-referrer"
        />
        <div className={`font-sans tracking-tight mt-1.5 ${config.text}`}>
          <span className="text-[#F26522] font-medium">Up</span>
          <span className={isLight ? 'text-zinc-800 font-normal' : 'text-zinc-100 font-normal'}>Frama</span>
        </div>
        {showBadge && (
          <span className={`mt-1 font-mono font-medium tracking-wide bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-md ${config.badge}`}>
            {badgeText}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 select-none ${className}`}>
      <img
        src={upframaLogoImg}
        alt="UpFrama"
        className={`${config.height} w-auto object-contain shrink-0`}
        referrerPolicy="no-referrer"
      />
      
      {/* Brand Name Soft Minimal Typography */}
      <div className="flex items-center gap-2">
        <span className={`font-sans ${config.text} leading-none`}>
          <span className="text-[#F26522] font-semibold">Up</span>
          <span className={isLight ? 'text-zinc-800 font-normal' : 'text-zinc-100 font-normal'}>Frama</span>
        </span>

        {showBadge && (
          <span className={`font-mono font-normal tracking-wide bg-zinc-900/80 text-zinc-400 border border-zinc-800 rounded-md ${config.badge}`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Minimal UpFrama Banner Display
 */
export const UpframaBanner: React.FC<{ className?: string; onOpenAudit?: () => void }> = ({
  className = '',
  onOpenAudit,
}) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-[#121215] p-6 sm:p-8 ${className}`}>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <img
              src={upframaLogoImg}
              alt="UpFrama"
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="font-sans font-medium text-xl tracking-tight leading-none">
              <span className="text-[#F26522] font-semibold">Up</span>
              <span className="text-zinc-100 font-normal">Frama</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-md">
            AI-powered precision automation pipelines for industrial supply chains, logistics, and scaling operations.
          </p>
        </div>

        {onOpenAudit && (
          <button
            onClick={onOpenAudit}
            className="px-5 py-2.5 rounded-lg bg-[#F26522] hover:bg-[#DE5516] text-white font-medium text-xs sm:text-sm transition-colors cursor-pointer shrink-0 shadow-sm"
          >
            Schedule System Audit
          </button>
        )}
      </div>
    </div>
  );
};

export { upframaLogoImg };
