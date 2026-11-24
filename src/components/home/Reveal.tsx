import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fades and lifts its content in the first time it scrolls into view. The hidden
 * state only applies once the head script has confirmed motion is welcome
 * (html.motion-ok), so without JavaScript, or with reduced motion, it is simply shown.
 */
export default function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number; key?: string | number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-in={inView ? '' : undefined} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
