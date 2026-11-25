import { useEffect, useRef, type ReactNode } from 'react';

/* Each section names the sky behind it. As a section takes over the middle of the
   screen, the whole page background eases to its colour: night, dusk, dawn,
   morning, daylight. The navigation bar follows whether the sky is light. */
export const SKY: Record<string, { color: string; light: boolean }> = {
  hero: { color: '#070A12', light: false },
  lights: { color: '#0A1430', light: false },
  services: { color: '#151B45', light: false },
  founder: { color: '#3A2147', light: false },
  proof: { color: '#F6EEE2', light: true },
  'next-step': { color: '#FFC53D', light: true },
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
