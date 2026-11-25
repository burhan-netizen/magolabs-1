import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageLink from './PageLink';
import { CASE_STUDIES } from '../data/caseStudies';

interface WorkSpiralProps {
  onOpenWork: () => void;
}

// Burhan's lead clients first, then the rest of the sites with sharp screenshots.
const IDS = [
  'drmihirshah',
  'darshangalani',
  'ladsonconcrete',
  'jaymocivil',
  'centurion',
  'prabhakarprocessors',
  'santoshtimbers',
  'solway',
  'astrabizz',
  'mnp',
  'kdmayani',
  'jaymehta',
];
const SITES = IDS.map((id) => CASE_STUDIES.find((cs) => cs.id === id)).filter(
  (cs): cs is (typeof CASE_STUDIES)[number] => Boolean(cs)
);

const STEP = 40; // degrees between cards around the spiral
const RISE = 74; // px each card sits below the one before
const RADIUS = 540; // px from the spiral axis; wide enough that neighbouring cards never touch
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Home page, wide screens: the work on a 3D spiral.
 *
 * The client websites sit on a helix around a vertical axis. The section pins
 * while you scroll through it, and scrolling turns the spiral and lifts it, so
 * each site in turn swings round to the front. Cards light up as they face you
 * and fade as they turn away. The details of the site at the front (name,
 * industry, result, link) sit beside the spiral and change with it.
 *
 * Phones and reduced motion get the stacked cards (WorkStack) instead; the
 * homepage chooses between them.
 */
export default function WorkSpiral({ onOpenWork }: WorkSpiralProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });

  const last = SITES.length - 1;
  const turn = useTransform(progress, (p) => p * last * STEP);
  const lift = useTransform(progress, (p) => -p * last * RISE);
  const sceneTransform = useTransform([turn, lift], ([t, y]: number[]) => `translateY(${y}px) rotateY(${-t}deg)`);

  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, 'change', (p) => {
    const i = Math.min(last, Math.max(0, Math.round(p * last)));
    if (i !== active) setActive(i);
  });
  const site = SITES[active];
  const result = site.results?.[0];
  const external = Boolean(site.url);
  const bar = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="featured-work" aria-labelledby="work-title" className="relative bg-neutral-950 text-white font-sans">
      <div ref={outerRef} style={{ height: `${100 + last * 32}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Faint rings on the floor of the stage, for depth */}
          <div aria-hidden="true" className="spiral-floor" />

          {/* The spiral */}
          <div className="spiral-stage" aria-hidden="true">
            <motion.div className="spiral-scene" style={{ transform: sceneTransform }}>
              {SITES.map((s, i) => (
                <SpiralCard key={s.id} site={s} index={i} turn={turn} />
              ))}
            </motion.div>
          </div>
          <div className="relative mx-auto grid h-full max-w-7xl grid-cols-12 items-center gap-8 px-4 pt-16 sm:px-6 lg:px-8 pointer-events-none [&_a]:pointer-events-auto">
            {/* The site at the front, in words */}
            <div className="col-span-5 relative z-10">
              <span className="eyebrow eyebrow-on-dark">Our work</span>
              <h2 id="work-title" className="mt-4 text-4xl xl:text-5xl font-bold tracking-tight leading-[1.02]">
                A few of the websites we have built.
              </h2>

              <div className="mt-12 min-h-[15rem]" aria-live="polite">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={site.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-400">
                      {pad(active + 1)} / {pad(SITES.length)} · {site.industry}
                    </p>
                    <h3 className="mt-3 text-3xl xl:text-4xl font-semibold tracking-tight">{site.clientName}</h3>
                    {result ? (
                      <p className="mt-5 flex items-baseline gap-3">
                        <span className="font-display text-5xl font-bold tracking-tight text-brand">{result.value}</span>
                        <span className="text-base text-neutral-300">{result.label.toLowerCase()}</span>
                      </p>
                    ) : (
                      <p className="mt-5 max-w-sm text-base leading-relaxed text-neutral-300">{site.scope.join(' · ')}</p>
                    )}
                    <a
                      href={site.url ?? `/work/${site.id}`}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="group mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition-colors hover:border-brand hover:bg-brand hover:text-ink"
                    >
                      {external ? 'Visit the website' : 'Read the case study'}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                      {external && <span className="sr-only">(opens in a new tab)</span>}
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <div className="h-px w-40 bg-white/15">
                  <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-brand" />
                </div>
                <PageLink
                  page="work"
                  onNavigate={onOpenWork}
                  className="group inline-flex items-center gap-2 text-sm font-semibold underline decoration-brand decoration-2 underline-offset-4"
                >
                  See all work <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </PageLink>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function SpiralCard({
  site,
  index,
  turn,
}: {
  site: (typeof SITES)[number];
  index: number;
  turn: MotionValue<number>;
  key?: string;
}) {
  // How squarely the card faces the visitor: 1 at the front, 0 side on, below 0 turned away.
  const facing = useTransform(turn, (t) => Math.cos(((index * STEP - t) * Math.PI) / 180));
  const opacity = useTransform(facing, [-1, -0.2, 0.6, 1], [0.22, 0.32, 0.8, 1]);
  const filter = useTransform(facing, [-1, 0.5, 1], ['brightness(0.35)', 'brightness(0.55)', 'brightness(1)']);

  return (
    <motion.div
      className="spiral-card"
      style={{
        transform: `translateY(${index * RISE}px) rotateY(${index * STEP}deg) translateZ(${RADIUS}px)`,
        opacity,
        filter,
      }}
    >
      <span className="spiral-bar">
        <i />
        <i />
        <i />
        <span>{site.domain.replace(/^www\./, '')}</span>
      </span>
      <img
        src={`/screenshots/${site.id}.webp`}
        alt=""
        width={900}
        height={422}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </motion.div>
  );
}
