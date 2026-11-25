import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import PageLink from '../PageLink';
import { getWorkDetailPath } from '../../utils/pageRoutes';

/* The deck of real client sites in the hero. The top card lifts away every few
   seconds and slides to the back, so the work is always in view. */
const DECK = [
  { id: 'drmihirshah', name: 'Dr. Mihir Shah Smile Care Clinic', tag: 'Dental clinic, Surat' },
  { id: 'jaymocivil', name: 'Jaymo Civil', tag: 'Civil contractor, Sydney' },
  { id: 'darshangalani', name: 'Darshan Galani & Co.', tag: 'CA firm, Surat' },
  { id: 'ladsonconcrete', name: 'Ladson Concrete', tag: 'Concrete, Florida' },
  { id: 'centurion', name: 'Centurion Strategic Ventures', tag: 'Loan advisory, India' },
];

const SLOTS = [
  { rotate: -3, x: 0, y: 0, scale: 1 },
  { rotate: 4, x: 18, y: -14, scale: 0.97 },
  { rotate: -7, x: -16, y: -26, scale: 0.94 },
  { rotate: 8, x: 26, y: -36, scale: 0.91 },
];

function Deck({ onOpenCaseStudy }: { onOpenCaseStudy: (id: string) => void }) {
  const reduce = useReducedMotion();
  const [top, setTop] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setInterval(() => setTop((v) => (v + 1) % DECK.length), 3200);
    return () => window.clearInterval(t);
  }, [reduce, paused]);

  const current = DECK[top];

  return (
    <div
      className="relative mx-auto w-full max-w-[520px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[1.55]">
        {DECK.map((card, i) => {
          const depth = (i - top + DECK.length) % DECK.length;
          const slot = SLOTS[Math.min(depth, SLOTS.length - 1)];
          const hidden = depth >= SLOTS.length;
          return (
            <motion.div
              key={card.id}
              className="absolute inset-0"
              style={{ zIndex: DECK.length - depth }}
              initial={false}
              animate={{
                rotate: slot.rotate,
                x: slot.x,
                y: slot.y,
                scale: slot.scale,
                opacity: hidden ? 0 : 1,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20, mass: 0.9 }}
            >
              <PageLink
                href={getWorkDetailPath(card.id)}
                onNavigate={() => onOpenCaseStudy(card.id)}
                tabIndex={depth === 0 ? 0 : -1}
                aria-hidden={depth === 0 ? undefined : true}
                className="block h-full overflow-hidden rounded-[18px] bg-white shadow-[0_40px_80px_-40px_rgba(17,15,12,0.55),0_2px_6px_rgba(17,15,12,0.06)] ring-1 ring-black/5"
              >
                <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#FAF9F6] px-3.5 py-2.5">
                  <span className="h-2 w-2 rounded-full bg-[#E2DED6]" />
                  <span className="h-2 w-2 rounded-full bg-[#E2DED6]" />
                  <span className="h-2 w-2 rounded-full bg-[#E2DED6]" />
                </div>
                <img
                  src={`/screenshots/${card.id}.webp`}
                  alt={`${card.name} website by Mago Labs`}
                  width={900}
                  height={430}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="block h-full w-full object-cover object-top"
                />
              </PageLink>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-7 flex items-baseline justify-between gap-4 text-sm" aria-live="polite">
        <span className="font-medium text-ink">{current.name}</span>
        <span className="text-ink/50">{current.tag}</span>
      </div>
    </div>
  );
}

export default function HeroStudio({ onAudit, onOpenCaseStudy }: { onAudit: () => void; onOpenCaseStudy: (id: string) => void }) {
  return (
    <section id="hero" className="relative flex flex-col overflow-hidden bg-paper pb-10 pt-28 md:pt-32 lg:min-h-[100svh]">
      <div className="order-2 mx-auto grid w-full max-w-7xl flex-1 gap-14 lg:order-1 px-4 sm:px-6 lg:grid-cols-[1fr_minmax(360px,500px)] lg:gap-20 lg:px-8">
        {/* Left: who we are, in one quiet paragraph */}
        <div className="studio-fade flex flex-col justify-between gap-10 lg:pt-8">
          <p className="studio-label text-ink/55">Website design studio, Surat. Working with India and the world.</p>
          <div className="max-w-[30rem]">
            <p className="text-xl leading-snug text-ink md:text-2xl">
              We design and build websites for businesses that want to be taken seriously. Fast, honest, made from a blank page.
            </p>
            <PageLink page="contact" onNavigate={onAudit} className="group mt-8 inline-flex items-center gap-3 rounded-full bg-ink py-3 pl-6 pr-3 text-sm font-medium text-paper transition-colors hover:bg-black">
              Get a free website audit
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-ink transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </PageLink>
          </div>
        </div>

        {/* Right: the work itself */}
        <div className="studio-fade-2 lg:self-center lg:pt-6">
          <Deck onOpenCaseStudy={onOpenCaseStudy} />
        </div>
      </div>

      {/* Bottom: the statement, edge to edge */}
      <div className="order-1 mx-auto mb-10 w-full max-w-7xl px-4 sm:px-6 lg:order-2 lg:mb-0 lg:mt-8 lg:px-8">
        <h1 className="text-ink">
          <span className="studio-xl block text-[clamp(3.4rem,10.6vw,11.2rem)]">
            <span className="studio-line"><span>Websites that</span></span>
            <span className="studio-line">
              <span>
                get you <span className="font-serif-accent tracking-[-0.03em]">chosen.</span>
              </span>
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
