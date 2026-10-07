import React from 'react';
import { UpframaIcon, UpframaLogo } from './UpframaLogo';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showBadge?: boolean;
  className?: string;
  variant?: 'default' | 'minimal' | 'light' | 'monochrome' | 'dark';
  badgeText?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showBadge = false,
  className = '',
  variant = 'default',
  badgeText = 'AI Ops',
}) => {
  if (variant === 'minimal') {
    const iconSizes = { sm: 24, md: 32, lg: 40, xl: 48, '2xl': 64 };
    return (
      <div className={`inline-flex items-center ${className}`}>
        <UpframaIcon size={iconSizes[size] || 32} />
      </div>
    );
  }

  const logoVariant = variant === 'dark' ? 'dark' : 'light';

  return (
    <UpframaLogo
      size={size}
      variant={logoVariant}
      showBadge={showBadge}
      className={className}
      badgeText={badgeText}
    />
  );
};

export { UpframaIcon, UpframaLogo };
