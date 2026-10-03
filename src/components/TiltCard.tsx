import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

interface TiltCardProps {
  children?: React.ReactNode;
  className?: string;
  /** Largest tilt in degrees. Keep it small: this is a hint of depth, not a toy. */
  maxTilt?: number;
}

/**
 * Tilts its contents gently toward the pointer, in 3D. Only reacts to a real mouse
 * (touch and pen are ignored) and does nothing for visitors who ask for reduced motion.
 */
export default function TiltCard({ children, className = '', maxTilt = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 20 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * maxTilt * 2);
    rotateX.set(-y * maxTilt * 2);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div ref={ref} onPointerMove={handleMove} onPointerLeave={reset} className={className} style={{ perspective: 1200 }}>
      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}>{children}</motion.div>
    </div>
  );
}
