import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

interface CountUpProps {
  /** The number to land on. */
  to: number;
  /** Where to start counting from. */
  from?: number;
  /** Seconds the count takes. */
  duration?: number;
}

/**
 * Counts up to a number the first time it scrolls into view.
 * The final number is what is written into the page HTML, so search engines and
 * visitors without JavaScript (or who prefer reduced motion) always see the real figure.
 */
export default function CountUp({ to, from = 0, duration = 1.2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    setValue(from);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, from, to, duration]);

  return <span ref={ref} className="tabular-nums">{value}</span>;
}
