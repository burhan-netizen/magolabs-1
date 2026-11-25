import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity, useReducedMotion, MotionValue } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageLink from './PageLink';
import { CASE_STUDIES, FEATURED_CASE_STUDY_IDS } from '../data/caseStudies';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface WorkReelProps {
  onOpenWork: () => void;
}

const SITES = FEATURED_CASE_STUDY_IDS.map((id) => CASE_STUDIES.find((cs) => cs.id === id)).filter(
  (cs): cs is (typeof CASE_STUDIES)[number] => Boolean(cs)
);

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Home page: the work, as a pinned horizontal reel.
 *
 * On wide screens the section pins and scrolling down moves a row of large site
 * cards sideways. The cards lean with scroll speed, the screenshot inside each one
 * drifts against the card for depth, a giant outlined word slides behind them, and
 * a round "View" cursor follows the pointer over a card. Phones, and visitors who
 * ask for reduced motion, get the same cards in a row they can swipe.
 */
export default function WorkReel({ onOpenWork }: WorkReelProps) {
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 900px)');
  const pinned = wide && !reduce;

  return (
    <section id="featured-work" aria-labelledby="work-title" className="relative bg-neutral-950 text-white font-sans">
      {pinned ? <PinnedReel onOpenWork={onOpenWork} /> : <SwipeReel onOpenWork={onOpenWork} />}
    </section>
  );
}

function Counter({ count }: { count: MotionValue<number> }) {
  const [n, setN] = useState(1);
  useMotionValueEvent(count, 'change', (v) => setN(v));
  return (
    <p aria-hidden="true" className="hidden shrink-0 font-mono text-sm tracking-widest text-neutral-400 md:block">
      <span className="inline-block min-w-[2ch] text-2xl font-bold text-white">{pad(n)}</span> / {pad(SITES.length)}
    </p>
  );
}

function Heading({ count }: { count?: MotionValue<number> }) {
  return (
    <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl space-y-4">
        <span className="eyebrow eyebrow-on-dark">Our work</span>
        <h2 id="work-title" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
          A few of the websites we have built.
        </h2>
        <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
          For clinics, CA firms, manufacturers and contractors. Each one designed and coded from a blank page.
        </p>
      </div>
      {count && <Counter count={count} />}
    </div>
  );
}

function PinnedReel({ onOpenWork }: WorkReelProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // How far the row has to travel: its full width less one screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const x = useTransform(progress, (p) => -p * distance);
  const bigX = useTransform(progress, [0, 1], ['10%', '-45%']);
  const bar = useTransform(progress, [0, 1], [0, 1]);
  const count = useTransform(progress, (p) => Math.min(SITES.length, Math.max(1, Math.round(p * (SITES.length - 1)) + 1)));

  // Cards lean into the scroll and settle when it stops.
  const velocity = useVelocity(scrollYProgress);
  const skew = useSpring(useTransform(velocity, [-2, 0, 2], [5, 0, -5], { clamp: true }), { stiffness: 200, damping: 30 });

  // The round "View" cursor
  const cx = useMotionValue(-200);
  const cy = useMotionValue(-200);
  const sx = useSpring(cx, { stiffness: 500, damping: 40 });
  const sy = useSpring(cy, { stiffness: 500, damping: 40 });
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div
      ref={outerRef}
      style={{ height: `calc(100vh + ${distance}px)` }}
      onPointerMove={(e) => {
        cx.set(e.clientX);
        cy.set(e.clientY);
      }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        {/* A giant outlined word sliding behind the cards */}
        <motion.p
          aria-hidden="true"
          style={{ x: bigX }}
          className="reel-outline pointer-events-none absolute bottom-[4vh] left-0 select-none whitespace-nowrap text-[22vw] font-extrabold leading-none tracking-tighter"
        >
          Selected work Selected work
        </motion.p>

        <Heading count={count} />

        <motion.div ref={trackRef} style={{ x }} className="relative mt-10 flex w-max items-start gap-[4vw] pl-[max(1rem,calc((100vw-80rem)/2+2rem))] pr-[8vw]">
          {SITES.map((site, i) => (
            <ReelCard key={site.id} site={site} index={i} progress={progress} skew={skew} onHover={setHover} />
          ))}

          {/* The last stop: everything else */}
          <PageLink
            page="work"
            onNavigate={onOpenWork}
            className="group flex aspect-[1920/900] w-[34vw] shrink-0 flex-col items-start justify-end rounded-[28px] border border-white/15 p-10 transition-colors hover:border-brand hover:bg-brand hover:text-ink"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 group-hover:text-ink/60">75+ businesses helped</span>
            <span className="mt-3 flex items-center gap-4 text-[clamp(2rem,3.4vw,3.6rem)] font-bold leading-none tracking-tight">
              See all work <ArrowRight className="h-[0.8em] w-[0.8em] transition-transform duration-300 group-hover:translate-x-2" />
            </span>
          </PageLink>
        </motion.div>

        {/* Progress along the reel */}
        <div className="mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-px w-full bg-white/10">
            <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-brand" />
          </div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-50 -ml-12 -mt-12"
      >
        <motion.span
          animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-brand text-sm font-bold text-ink"
        >
          View <ArrowUpRight className="ml-0.5 h-4 w-4" />
        </motion.span>
      </motion.div>
    </div>
  );
}

function ReelCard({
  site,
  index,
  progress,
  skew,
  onHover,
}: {
  site: (typeof SITES)[number];
  index: number;
  progress: MotionValue<number>;
  skew: MotionValue<number>;
  onHover: (id: string | null) => void;
  key?: string;
}) {
  // The screenshot drifts against the card, so it feels like a window onto the site.
  const center = SITES.length > 1 ? index / (SITES.length - 1) : 0;
  const imgX = useTransform(progress, [center - 0.5, center + 0.5], ['4%', '-4%']);
  const external = Boolean(site.url);
  const result = site.results?.[0];

  return (
    <motion.a
      href={site.url ?? `/work/${site.id}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={`${site.clientName}, ${site.industry}. ${external ? 'Visit site (opens in a new tab)' : 'Read the case study'}`}
      onPointerEnter={() => onHover(site.id)}
      onPointerLeave={() => onHover(null)}
      style={{ skewX: skew }}
      className={`reel-card group block w-[52vw] max-w-[920px] shrink-0 cursor-none ${index % 2 === 1 ? 'mt-[6vh]' : ''}`}
    >
      <span className="relative block aspect-[1920/900] overflow-hidden rounded-[28px] bg-neutral-900 ring-1 ring-white/10">
        <motion.img
          src={`/screenshots/${site.id}-1920.webp`}
          srcSet={`/screenshots/${site.id}.webp 900w, /screenshots/${site.id}-1920.webp 1920w`}
          sizes="52vw"
          alt={`${site.clientName} website designed by Mago Labs`}
          width={1920}
          height={900}
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{ x: imgX }}
          className="absolute inset-y-0 left-[-5%] h-full w-[110%] max-w-none object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.05]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <span className="mt-5 flex items-start justify-between gap-6">
        <span className="flex min-w-0 items-baseline gap-4">
          <span className="font-mono text-sm text-neutral-500">{pad(index + 1)}</span>
          <span className="min-w-0">
            <span className="block truncate text-2xl font-bold tracking-tight transition-colors group-hover:text-brand">{site.clientName}</span>
            <span className="mt-1 block font-mono text-[11px] uppercase tracking-widest text-neutral-400">{site.industry}</span>
          </span>
        </span>
        {result && (
          <span className="shrink-0 text-right">
            <span className="block text-2xl font-bold text-brand">{result.value}</span>
            <span className="block text-xs text-neutral-400">{result.label}</span>
          </span>
        )}
      </span>
    </motion.a>
  );
}

/** Phones and reduced motion: the same cards in a row to swipe. */
function SwipeReel({ onOpenWork }: WorkReelProps) {
  return (
    <div className="py-24">
      <Heading />
      <div className="mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-4 sm:scroll-px-6 sm:px-6 [scrollbar-width:none]">
        {SITES.map((site, i) => {
          const external = Boolean(site.url);
          const result = site.results?.[0];
          return (
            <a
              key={site.id}
              href={site.url ?? `/work/${site.id}`}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={`${site.clientName}, ${site.industry}. ${external ? 'Visit site (opens in a new tab)' : 'Read the case study'}`}
              className="w-[84vw] max-w-[560px] shrink-0 snap-start"
            >
              <span className="block aspect-[1920/900] overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10">
                <img
                  src={`/screenshots/${site.id}-480.webp`}
                  srcSet={`/screenshots/${site.id}-480.webp 480w, /screenshots/${site.id}.webp 900w`}
                  sizes="84vw"
                  alt={`${site.clientName} website designed by Mago Labs`}
                  width={1920}
                  height={900}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </span>
              <span className="mt-4 flex items-start justify-between gap-4">
                <span className="min-w-0">
                  <span className="font-mono text-xs text-neutral-500">{pad(i + 1)}</span>
                  <span className="block truncate text-lg font-bold">{site.clientName}</span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-400">{site.industry}</span>
                </span>
                {result && <span className="shrink-0 text-right text-lg font-bold text-brand">{result.value}</span>}
              </span>
            </a>
          );
        })}
      </div>
      <div className="mt-10 flex justify-center px-4">
        <PageLink
          page="work"
          onNavigate={onOpenWork}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-deep px-7 py-4 text-base font-semibold text-ink transition-colors"
        >
          See all work <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </PageLink>
      </div>
    </div>
  );
}
