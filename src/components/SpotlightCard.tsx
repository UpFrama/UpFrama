import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enable3DTilt?: boolean;
  maxTilt?: number;
  variant?: 'glass' | 'glass-elevated' | 'glass-dark' | 'glass-subtle';
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(242, 101, 34, 0.09)',
  enable3DTilt = true,
  maxTilt = 6,
  variant = 'glass',
  style,
  ...props
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasPosition, setHasPosition] = useState(false);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 28, stiffness: 220, mass: 0.45 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt]);

  const updateCoordinates = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!outerRef.current) return;
    const rect = outerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
    setHasPosition(true);

    if (enable3DTilt) {
      const normX = Math.max(0, Math.min(1, x / rect.width));
      const normY = Math.max(0, Math.min(1, y / rect.height));
      mouseX.set(normX);
      mouseY.set(normY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCoordinates(e);
    if (!isHovered) {
      setIsHovered(true);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCoordinates(e);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (enable3DTilt) {
      mouseX.set(0.5);
      mouseY.set(0.5);
    }
  };

  const variantStyles = {
    glass: 'bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:bg-white/85 hover:border-slate-300 hover:shadow-[0_12px_28px_-8px_rgba(15,23,42,0.06),inset_0_1px_1px_rgba(255,255,255,1)]',
    'glass-elevated': 'bg-white/85 backdrop-blur-2xl border border-white/90 shadow-[0_16px_40px_rgba(15,23,42,0.06),inset_0_1px_2px_rgba(255,255,255,1)] hover:bg-white/95 hover:border-slate-300 hover:shadow-[0_16px_32px_-8px_rgba(15,23,42,0.08)]',
    'glass-dark': 'bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.15)] hover:border-slate-700 hover:bg-slate-900/90',
    'glass-subtle': 'bg-white/55 backdrop-blur-lg border border-white/70 shadow-[0_4px_20px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.8)] hover:bg-white/75 hover:border-slate-300',
  };

  return (
    <div 
      ref={outerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px', ...style }} 
      className="w-full h-full relative"
      {...props}
    >
      <motion.div
        animate={{
          y: isHovered ? -4 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: [0.25, 1, 0.5, 1],
        }}
        style={{
          rotateX: enable3DTilt ? rotateX : 0,
          rotateY: enable3DTilt ? rotateY : 0,
          willChange: 'transform',
        }}
        className={`relative overflow-hidden rounded-2xl transition-[background-color,border-color,box-shadow] duration-300 ease-out w-full h-full ${variantStyles[variant]} ${className}`}
      >
        {/* Full Orange Cursor Spotlight on Hover with smooth radius and soft blur */}
        <div
          className="pointer-events-none absolute -inset-4 transition-opacity duration-300 z-0 blur-[6px]"
          style={{
            opacity: isHovered && hasPosition ? 1 : 0,
            background: `radial-gradient(220px circle at ${position.x + 16}px ${position.y + 16}px, rgba(242, 101, 34, 0.22) 0%, rgba(242, 101, 34, 0.12) 38%, rgba(242, 101, 34, 0.03) 72%, transparent 100%)`,
          }}
        />

        {/* Ambient Top Specular Highlight Edge */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 z-0" />

        {/* Card Content - Pure, Unobstructed Click Layer */}
        <div className="relative z-10 w-full h-full pointer-events-auto" style={{ transform: 'none' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};

