import React from 'react';
import { motion } from 'motion/react';

interface Reveal3DProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'pop';
  className?: string;
  depth?: number;
  rotation?: number;
}

export const Reveal3D: React.FC<Reveal3DProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  depth = 40,
  rotation = 12,
}) => {
  const getInitialTransform = () => {
    switch (direction) {
      case 'left':
        return {
          opacity: 0,
          x: -40,
          y: 20,
          rotateY: rotation,
          rotateX: -rotation * 0.5,
          z: -depth,
          scale: 0.94,
        };
      case 'right':
        return {
          opacity: 0,
          x: 40,
          y: 20,
          rotateY: -rotation,
          rotateX: -rotation * 0.5,
          z: -depth,
          scale: 0.94,
        };
      case 'down':
        return {
          opacity: 0,
          y: -40,
          rotateX: -rotation,
          z: -depth,
          scale: 0.94,
        };
      case 'pop':
        return {
          opacity: 0,
          scale: 0.82,
          z: -depth * 1.5,
          rotateX: rotation * 0.8,
        };
      case 'up':
      default:
        return {
          opacity: 0,
          y: 35,
          rotateX: rotation,
          z: -depth,
          scale: 0.94,
        };
    }
  };

  return (
    <div style={{ perspective: '1200px', transformStyle: 'preserve-3d' }} className={className}>
      <motion.div
        initial={getInitialTransform()}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          scale: 1,
        }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.65,
          delay,
          ease: [0.22, 1, 0.36, 1], // Custom smooth 3D cubic bezier curve
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
