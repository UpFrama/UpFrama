import React from 'react';

interface UpframaIconProps {
  size?: number | string;
  className?: string;
  variant?: 'orange' | 'light' | 'dark' | 'glow' | 'clean';
}

/**
 * Official UpFrama Vector Monogram Icon
 * Exact vector replication of the UF Monogram with central upward arrow
 */
export const UpframaIcon: React.FC<UpframaIconProps> = ({
  size = 36,
  className = '',
  variant = 'orange',
}) => {
  const sizePx = typeof size === 'number' ? `${size}px` : size;
  const isDark = variant === 'dark';

  const strokeColor = isDark ? '#FFFFFF' : '#F26522';
  const arrowFill = isDark ? '#FFFFFF' : '#BA3700'; // Terracotta solid core
  const arrowStroke = isDark ? '#FFFFFF' : '#F26522';

  return (
    <svg
      style={{ width: sizePx, height: sizePx }}
      viewBox="0 0 500 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="UpFrama Logo Mark"
    >
      {/* Left 'U' Column Outer & Inner Stroke Path */}
      <path
        d="M 22 22 L 115 22 L 115 330 C 115 385 145 425 195 440 L 195 558 C 105 540 22 455 22 340 Z"
        stroke={strokeColor}
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right 'F' Glyph Contours & Outer Lower Arch */}
      <path
        d="M 285 165 C 290 85 335 22 415 22 L 485 22 L 485 105 L 415 105 C 395 105 382 118 382 140 L 382 185 L 485 185 L 485 268 L 382 268 L 382 335 C 382 385 352 425 305 440 L 305 558 C 390 540 485 455 485 340 L 485 268"
        stroke={strokeColor}
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Central Solid Terracotta Upward Arrow with Outlined Border */}
      <g>
        {/* Solid Arrow Shaft & Arrowhead */}
        <path
          d="M 205 558 L 205 270 L 122 270 L 250 145 L 378 270 L 295 270 L 295 558 Z"
          fill={arrowFill}
          stroke={arrowStroke}
          strokeWidth="18"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </g>
    </svg>
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
 * Official UpFrama Logo Lockup with Vector Icon + "Upframa" Wordmark
 */
export const UpframaLogo: React.FC<UpframaLogoProps> = ({
  size = 'md',
  variant = 'light',
  layout = 'horizontal',
  showBadge = false,
  className = '',
  badgeText = 'AI Ops',
}) => {
  const sizeMap = {
    sm: { iconSize: 26, text: 'text-base font-bold tracking-tight', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { iconSize: 32, text: 'text-lg sm:text-xl font-bold tracking-tight', badge: 'text-[10px] px-2 py-0.5' },
    lg: { iconSize: 40, text: 'text-xl sm:text-2xl font-bold tracking-tight', badge: 'text-xs px-2.5 py-0.5' },
    xl: { iconSize: 50, text: 'text-2xl sm:text-3xl font-bold tracking-tight', badge: 'text-xs px-3 py-1' },
    '2xl': { iconSize: 64, text: 'text-3xl sm:text-4xl font-bold tracking-tight', badge: 'text-sm px-3.5 py-1' },
  };

  const config = sizeMap[size] || sizeMap.md;
  const isDark = variant === 'dark';

  if (layout === 'vertical') {
    return (
      <div className={`inline-flex flex-col items-center text-center select-none ${className}`}>
        <UpframaIcon size={config.iconSize * 1.5} variant={isDark ? 'dark' : 'orange'} />
        <div className={`font-sans tracking-tight mt-2 ${config.text}`}>
          <span className="text-[#F26522]">Up</span>
          <span className={isDark ? 'text-slate-100' : 'text-[#3D1E0E]'}>frama</span>
        </div>
        {showBadge && (
          <span className={`mt-1 font-mono font-medium tracking-wide ${isDark ? 'bg-zinc-900 text-zinc-400 border-zinc-800' : 'bg-orange-50 text-orange-600 border-orange-200/80'} border rounded-md ${config.badge}`}>
            {badgeText}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <UpframaIcon size={config.iconSize} variant={isDark ? 'dark' : 'orange'} />
      
      {/* Official "Upframa" Wordmark: "Up" in #F26522, "frama" in #3D1E0E / slate-100 */}
      <div className="flex items-center gap-2">
        <span className={`font-sans ${config.text} leading-none select-none tracking-tight`}>
          <span className="text-[#F26522]">Up</span>
          <span className={isDark ? 'text-slate-100' : 'text-[#3D1E0E]'}>frama</span>
        </span>

        {showBadge && (
          <span className={`font-mono font-semibold tracking-wide ${isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-orange-50 text-orange-600 border-orange-200/80'} border rounded-full ${config.badge}`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};

export const UpframaBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 flex items-center justify-between shadow-md ${className}`}>
      <div className="flex items-center gap-4">
        <UpframaIcon size={48} variant="dark" />
        <div>
          <div className="text-xl font-bold font-sans">
            <span className="text-[#F26522]">Up</span>
            <span className="text-white">frama</span>
          </div>
          <div className="text-xs text-slate-400 font-mono">Autonomous Enterprise Workflow AI</div>
        </div>
      </div>
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-emerald-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Zero Downtime Active
      </div>
    </div>
  );
};
