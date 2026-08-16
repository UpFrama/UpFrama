import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enable3DTilt?: boolean;
  maxTilt?: number;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(242, 101, 34, 0.16)',
  enable3DTilt = true,
  maxTilt = 8,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-maxTilt, maxTilt]);
  const brightness = useTransform(smoothMouseY, [0, 1], [1.05, 0.98]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });

    if (enable3DTilt) {
      const normX = Math.max(0, Math.min(1, x / rect.width));
      const normY = Math.max(0, Math.min(1, y / rect.height));
      mouseX.set(normX);
      mouseY.set(normY);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (enable3DTilt) {
      mouseX.set(0.5);
      mouseY.set(0.5);
    }
  };

  return (
    <div 
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }} 
      className="w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: enable3DTilt ? rotateX : 0,
          rotateY: enable3DTilt ? rotateY : 0,
          transformStyle: 'preserve-3d',
          filter: isHovered ? brightness : undefined,
        }}
        whileHover={{
          scale: 1.015,
          z: 15,
          transition: { duration: 0.2 },
        }}
        className={`relative overflow-hidden rounded-xl border border-zinc-800 bg-[#111113] transition-colors duration-200 ${className}`}
        {...props}
      >
        {/* Dynamic Cursor Spotlight Radial Layer */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />

        {/* Dynamic 3D Specular Light Glare */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0 mix-blend-overlay"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.4), transparent 60%)`,
          }}
        />

        <div className="relative z-10" style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
