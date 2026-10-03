import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import PageLink from './PageLink';
import { getWorkDetailPath } from '../utils/pageRoutes';

interface HeroShowcaseProps {
  onOpenCaseStudy: (id: string) => void;
}

// Real client websites, each with the one line worth knowing about it.
const SLIDES = [
  { id: 'drmihirshah', domain: 'drmihirshahsmilecareclinic.com', image: '/screenshots/drmihirshah.jpg', industry: 'Dental clinic', headline: '25 to 58 patients a day', detail: 'Dr. Mihir Shah Smile Care Clinic, within two months of launch.' },
  { id: 'darshangalani', domain: 'darshangalani.com', image: '/screenshots/darshangalani.jpg', industry: 'CA firm', headline: '34 new clients signed', detail: 'Darshan Galani & Co., within three months of launch.' },
  { id: 'santoshtimbers', domain: 'santoshtimbers.com', image: '/screenshots/santoshtimbers.jpg', industry: 'Timber importer', headline: 'From no website to a full catalogue', detail: 'Santosh Timbers, with a direct enquiry form for bulk buyers.' },
  { id: 'prabhakarprocessors', domain: 'prabhakarprocessors.com', image: '/screenshots/prabhakarprocessors.jpg', industry: 'Textile mill', headline: 'A redesign the team runs itself', detail: 'Prabhakar Processors, with a custom admin panel.' },
  { id: 'solway', domain: 'solwayenergies.com', image: '/screenshots/solway.jpg', industry: 'Solar and B2B energy', headline: 'A website that backs up every sales call', detail: 'SolWay Energies, built for corporate buyers.' },
];

const COUNT = SLIDES.length;
const CARD_WIDTH = 420;
const CARD_HEIGHT = 236; // browser bar plus screenshot, at full size
const VISIBLE = 2; // how many cards deep stay visible
const FALLOFF = 0.2; // how fast cards darken with depth
const BLUR = 3; // px of blur on the furthest visible card
const DURATION = 700; // ms per move
const AUTOPLAY_DELAY = 4200;

const clamp = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const wrap = (i: number) => ((i % COUNT) + COUNT) % COUNT;

/** How far card `index` sits behind the front, when the rail is at `pos`. */
function depthOf(index: number, pos: number): number {
  let d = wrap(index - pos);
  if (d > COUNT / 2) d -= COUNT;
  return d;
}

interface Rail { spread: number; depth: number; tilt: number; scale: number }
const DEFAULT_RAIL: Rail = { spread: 118, depth: 170, tilt: 22, scale: 0.88 };

/** The transform, shade and stacking order for one card. Only transform, opacity
 *  and filter change, so the browser can animate it without re-laying out the page. */
function cardStyle(index: number, pos: number, rail: Rail): React.CSSProperties {
  const d = depthOf(index, pos);
  const back = Math.max(0, d);
  const shown = Math.abs(d) <= VISIBLE + 0.5;
  const opacity = !shown ? 0 : d < 0 ? Math.max(0, 1 + d) : 1;
  const bright = Math.max(0.2, 1 - back * FALLOFF);
  const blur = Math.min(BLUR, (back / VISIBLE) * BLUR);
  return {
    transform: `translate(-50%,-50%) scale(${rail.scale.toFixed(3)}) translateX(${(rail.spread * d).toFixed(2)}px) translateZ(${(-rail.depth * d).toFixed(2)}px) rotateY(${(rail.tilt * clamp(d, 0, 1)).toFixed(3)}deg)`,
    opacity: Number(opacity.toFixed(3)),
    filter: `brightness(${bright.toFixed(3)}) blur(${blur.toFixed(2)}px)`,
    zIndex: Math.round(2000 - d * 20),
    pointerEvents: shown && opacity > 0.05 ? 'auto' : 'none',
  };
}

// Written into the page HTML, so the stack looks right before any script runs.
const INITIAL_STYLES = SLIDES.map((_, i) => cardStyle(i, 0, DEFAULT_RAIL));

/**
 * Hero showcase: real client websites on a 3D rail that recedes into the screen.
 * The front card is in focus; the ones behind are shaded and blurred. It advances
 * on its own while on screen, and stops for hover, keyboard focus and visitors who
 * ask for reduced motion (they get a still stack with working controls).
 */
export default function HeroShowcase({ onOpenCaseStudy }: HeroShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [focus, setFocus] = useState(0);

  // Animation state lives outside React: cards are moved by writing styles
  // directly each frame, so nothing re-renders while the rail is moving.
  const state = useRef({ pos: 0, focus: 0, raf: 0, rail: DEFAULT_RAIL, reduced: false });
  const goTo = useRef<(index: number, animate?: boolean) => void>(() => undefined);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;
    const st = state.current;
    st.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const layout = (pos: number) => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = cardStyle(i, pos, st.rail);
        el.style.transform = s.transform as string;
        el.style.opacity = String(s.opacity);
        el.style.filter = s.filter as string;
        el.style.zIndex = String(s.zIndex);
        el.style.pointerEvents = s.pointerEvents as string;
      });
    };

    const tweenTo = (target: number, animate: boolean) => {
      if (st.raf) cancelAnimationFrame(st.raf);
      st.raf = 0;
      const from = st.pos;
      const delta = target - from;
      if (!animate || st.reduced || !delta) {
        st.pos = wrap(target);
        layout(st.pos);
        return;
      }
      const t0 = performance.now();
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / DURATION);
        st.pos = from + delta * (1 - Math.pow(1 - k, 3));
        layout(st.pos);
        if (k < 1) st.raf = requestAnimationFrame(step);
        else {
          st.raf = 0;
          st.pos = wrap(st.pos);
          layout(st.pos);
        }
      };
      st.raf = requestAnimationFrame(step);
    };

    goTo.current = (raw: number, animate = true) => {
      const index = wrap(raw);
      let delta = wrap(index - st.pos);
      if (delta > COUNT / 2) delta -= COUNT;
      tweenTo(st.pos + delta, animate);
      st.focus = index;
      setFocus(index);
    };

    // On narrow screens the rail draws tighter instead of shrinking the cards to stamps.
    const fit = () => {
      const w = root.clientWidth;
      if (!w) return;
      const narrow = w < 480;
      const spread = narrow ? 52 : 118;
      // Width of the whole fan: the front card plus the edges showing behind it.
      const fan = spread * VISIBLE * 0.9;
      const scale = clamp(w / (CARD_WIDTH + fan + 16), 0.4, 1.2);
      st.rail = { spread, depth: narrow ? 140 : 170, tilt: narrow ? 16 : 22, scale };
      // The stack only fans one way, so shift it back to sit centred, and size
      // the stage to the cards so there is no dead space above or below.
      stage.style.setProperty('--hs-shift', `${((-fan * scale) / 2).toFixed(1)}px`);
      stage.style.height = `${Math.round(CARD_HEIGHT * scale + 36)}px`;
      layout(st.pos);
    };
    const observer = new ResizeObserver(fit);
    observer.observe(root);
    fit();

    // Swipe left or right on touch screens.
    let swipeX: number | null = null;
    const onDown = (e: PointerEvent) => { swipeX = e.clientX; };
    const onUp = (e: PointerEvent) => {
      if (swipeX === null) return;
      const dx = e.clientX - swipeX;
      swipeX = null;
      if (Math.abs(dx) > 40) goTo.current(st.focus + (dx < 0 ? 1 : -1));
    };
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointerup', onUp);

    // Autoplay: only while on screen and not being hovered or focused.
    let timer: number | null = null;
    let hovered = false;
    let focused = false;
    let onScreen = false;
    const sync = () => {
      const run = !st.reduced && onScreen && !hovered && !focused && !document.hidden;
      if (run && timer === null) timer = window.setInterval(() => goTo.current(st.focus + 1), AUTOPLAY_DELAY);
      if (!run && timer !== null) { window.clearInterval(timer); timer = null; }
    };
    const enter = () => { hovered = true; sync(); };
    const leave = () => { hovered = false; sync(); };
    const focusIn = () => { focused = true; sync(); };
    const focusOut = () => { focused = false; sync(); };
    root.addEventListener('mouseenter', enter);
    root.addEventListener('mouseleave', leave);
    root.addEventListener('focusin', focusIn);
    root.addEventListener('focusout', focusOut);
    document.addEventListener('visibilitychange', sync);
    const io = new IntersectionObserver((entries) => { onScreen = entries[0].isIntersecting; sync(); }, { threshold: 0.25 });
    io.observe(root);

    return () => {
      if (st.raf) cancelAnimationFrame(st.raf);
      if (timer !== null) window.clearInterval(timer);
      observer.disconnect();
      io.disconnect();
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('pointerup', onUp);
      root.removeEventListener('mouseenter', enter);
      root.removeEventListener('mouseleave', leave);
      root.removeEventListener('focusin', focusIn);
      root.removeEventListener('focusout', focusOut);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo.current(state.current.focus - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo.current(state.current.focus + 1); }
  };

  const active = SLIDES[focus];

  return (
    <div
      ref={rootRef}
      className="hero-showcase"
      role="region"
      aria-roledescription="carousel"
      aria-label="Websites we have built"
      onKeyDown={onKeyDown}
    >
      <div ref={stageRef} className="hero-showcase-stage">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="hero-showcase-card"
            style={INITIAL_STYLES[i]}
            onClick={() => { if (i !== state.current.focus) goTo.current(i); }}
            aria-hidden={i !== focus}
          >
            <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/10 bg-neutral-900">
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="h-2 w-2 rounded-full bg-white/25" />
              <span className="ml-2.5 font-mono text-[10px] text-neutral-400 truncate">{slide.domain}</span>
            </div>
            <img
              src={slide.image}
              alt={i === 0 ? 'The website Mago Labs built for Dr. Mihir Shah Smile Care Clinic' : `The website Mago Labs built for ${slide.detail.split(',')[0]}`}
              width={900}
              height={430}
              fetchPriority={i === 0 ? 'high' : 'low'}
              decoding="async"
              draggable={false}
              className="block w-full aspect-[900/430] object-cover object-top"
            />
          </div>
        ))}
      </div>

      {/* What the front card achieved. Changes with the card in focus. */}
      <div className="hero-showcase-caption">
        <div className="min-w-0" aria-live="polite">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">{active.industry}</p>
          <p className="mt-1.5 text-xl sm:text-2xl font-bold tracking-tight text-brand leading-tight">{active.headline}</p>
          <p className="mt-1 text-sm text-neutral-300">{active.detail}</p>
          <PageLink
            href={getWorkDetailPath(active.id)}
            onNavigate={() => onOpenCaseStudy(active.id)}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffffff] border-b border-white/30 hover:border-brand transition-colors cursor-pointer"
          >
            Read the case study <ArrowRight className="h-3.5 w-3.5" />
          </PageLink>
        </div>
        <div className="flex items-center shrink-0" role="group" aria-label="Choose a website">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo.current(i)}
              aria-label={`Show ${slide.detail.split(',')[0]}`}
              aria-current={i === focus ? 'true' : undefined}
              className={`hero-showcase-dot ${i === focus ? 'is-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
