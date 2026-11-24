import { useEffect, useRef } from 'react';

const ITEMS = ['Custom websites', 'Local SEO', 'Google Business Profile', 'Copy that sells', 'Built in Surat, for the world'];
const GAP = '\u00a0\u00a0✦\u00a0\u00a0';

/**
 * A thick ink band that swoops across the page with the services running along it.
 * It moves on its own and speeds up while the visitor scrolls. Static for reduced motion.
 */
export default function CurveMarquee() {
  const textRef = useRef<SVGTextPathElement>(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const textEl = el.parentElement as unknown as SVGTextElement | null;
    // The text holds four copies of the phrase; wrapping by one copy keeps it seamless.
    const loop = (textEl?.getComputedTextLength() ?? 4000) / 4;
    let offset = -loop;
    let lastY = window.scrollY;
    let boost = 0;
    let frame = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el.ownerSVGElement as Element);

    const tick = () => {
      const y = window.scrollY;
      boost = boost * 0.9 + Math.min(Math.abs(y - lastY), 120) * 0.12;
      lastY = y;
      if (visible) {
        offset -= 1.1 + boost;
        if (offset < -loop * 2) offset += loop;
        el.setAttribute('startOffset', String(offset));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, []);

  return (
    <section aria-label="What we do, in short" className="relative -mt-6 overflow-hidden bg-paper py-4 md:-mt-10">
      <svg viewBox="0 0 1440 260" className="block w-[160%] -ml-[30%] md:w-[118%] md:-ml-[9%] h-auto" role="img" aria-label="Custom websites, local SEO, Google Business Profile, copy that sells. Built in Surat, for the world.">
        <defs>
          <path id="mago-curve" d="M -120 190 C 260 40, 620 40, 900 140 S 1380 250, 1600 70" />
        </defs>
        <use href="#mago-curve" fill="none" stroke="#16130F" strokeWidth="92" strokeLinecap="butt" />
        <text className="display-lg" fontSize="44" fill="#F5F1E8" dy="15" style={{ letterSpacing: '-0.01em' }}>
          <textPath ref={textRef} href="#mago-curve" startOffset="-1200">
            {[0, 1, 2, 3].flatMap((k) =>
              ITEMS.flatMap((item, i) => [
                <tspan key={`${k}-${i}`}>{item}</tspan>,
                <tspan key={`${k}-${i}-s`} fill="#FFC53D">{GAP}</tspan>,
              ])
            )}
          </textPath>
        </text>
      </svg>
    </section>
  );
}
