import { useEffect, useRef, type ReactNode } from 'react';

/* Each section names the colour behind it: navy for the dark story, off-white for
   the one light section. 70% navy, 20% off-white and white, 10% Mago yellow.
   The navigation bar follows whether the background is light. */
const NAVY = '#0A1733';
const PAPER = '#F5F4F0';
export const SKY: Record<string, { color: string; light: boolean }> = {
  hero: { color: NAVY, light: false },
  lights: { color: NAVY, light: false },
  services: { color: NAVY, light: false },
  founder: { color: NAVY, light: false },
  proof: { color: PAPER, light: true },
  'next-step': { color: NAVY, light: false },
};

export default function Sky({ children }: { children: ReactNode }) {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const sections = Object.keys(SKY)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const set = (id: string) => {
      const s = SKY[id];
      if (!s || !layer.current) return;
      layer.current.style.backgroundColor = s.color;
      root.dataset.homeSky = s.light ? 'light' : 'dark';
      window.dispatchEvent(new Event('homesky'));
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) set(e.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    set('hero');
    return () => {
      io.disconnect();
      delete root.dataset.homeSky;
      window.dispatchEvent(new Event('homesky'));
    };
  }, []);

  return (
    <>
      <div ref={layer} aria-hidden="true" className="n-sky pointer-events-none fixed inset-0 z-0" style={{ backgroundColor: SKY.hero.color }} />
      <div className="relative z-[1]">{children}</div>
    </>
  );
}
