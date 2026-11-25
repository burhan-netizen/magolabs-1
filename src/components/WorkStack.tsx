import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageLink from './PageLink';
import { CASE_STUDIES, FEATURED_CASE_STUDY_IDS } from '../data/caseStudies';

interface WorkStackProps {
  onOpenWork: () => void;
}

const SITES = FEATURED_CASE_STUDY_IDS.map((id) => CASE_STUDIES.find((cs) => cs.id === id)).filter(
  (cs): cs is (typeof CASE_STUDIES)[number] => Boolean(cs)
);

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Home page: the work, as a stack of large cards.
 *
 * Each site is a big card that sticks near the top of the screen. Scrolling brings
 * the next card up over it, while the cards underneath shrink back and darken, so
 * the stack builds as you go. The top edges of earlier cards stay visible, like a
 * pile of case studies. With reduced motion the cards still stack, without the
 * shrinking.
 */
export default function WorkStack({ onOpenWork }: WorkStackProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] });

  return (
    <section id="featured-work" aria-labelledby="work-title" className="relative bg-neutral-950 text-white font-sans pt-24 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <span className="eyebrow eyebrow-on-dark">Our work</span>
            <h2 id="work-title" className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              A few of the websites we have built.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              For clinics, CA firms, manufacturers and contractors. Each one designed and coded from a blank page.
            </p>
          </div>
          <PageLink
            page="work"
            onNavigate={onOpenWork}
            className="group hidden md:inline-flex items-center gap-2 font-semibold text-white underline decoration-brand decoration-2 underline-offset-4"
          >
            See all work <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </PageLink>
        </div>

        <div ref={listRef} className="relative mt-14">
          {SITES.map((site, i) => (
            <StackCard key={site.id} site={site} index={i} total={SITES.length} progress={scrollYProgress} still={Boolean(reduce)} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <PageLink
            page="work"
            onNavigate={onOpenWork}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-deep px-7 py-4 text-base font-semibold text-ink transition-colors"
          >
            See all work <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </PageLink>
        </div>
      </div>
    </section>
  );
}

function StackCard({
  site,
  index,
  total,
  progress,
  still,
}: {
  site: (typeof SITES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
  still: boolean;
  key?: string;
}) {
  // Once the cards after this one arrive, it shrinks back a little for each of them.
  const start = index / total;
  const target = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [start, 1], [1, still ? 1 : target]);
  const dim = useTransform(progress, [start, Math.min(1, start + 2 / total)], [0, still || index === total - 1 ? 0 : 0.55]);

  const external = Boolean(site.url);
  const results = site.results?.slice(0, 2) ?? [];

  return (
    <div className="sticky pb-[8vh]" style={{ top: `calc(88px + ${index * 12}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: 'top center', maxWidth: 'min(1100px, calc((100vh - 300px) * 2.13))' }}
        className="relative mx-auto overflow-hidden rounded-[28px] border border-white/10 bg-neutral-900 shadow-[0_-24px_60px_-24px_rgba(0,0,0,0.9)]"
      >
        {/* The website */}
        <a
          href={site.url ?? `/work/${site.id}`}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          tabIndex={-1}
          aria-hidden="true"
          className="group block overflow-hidden"
        >
          <img
            src={`/screenshots/${site.id}-1920.webp`}
            srcSet={`/screenshots/${site.id}-480.webp 480w, /screenshots/${site.id}.webp 900w, /screenshots/${site.id}-1920.webp 1920w`}
            sizes="(min-width: 1140px) 1100px, 94vw"
            alt=""
            width={1920}
            height={900}
            loading="lazy"
            decoding="async"
            className="block aspect-[1920/900] w-full object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.03]"
          />
        </a>

        {/* The details */}
        <div className="flex flex-col gap-5 border-t border-white/10 p-5 sm:p-7 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
              {pad(index + 1)} / {pad(total)} · {site.industry}
            </p>
            <h3 className="mt-2 text-[clamp(1.4rem,2.4vw,2.2rem)] font-bold leading-[1.1] tracking-tight">{site.clientName}</h3>
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            {results.map((r) => (
              <div key={r.label}>
                <p className="text-[clamp(1.5rem,2.4vw,2.2rem)] font-bold leading-none text-brand">{r.value}</p>
                <p className="mt-1 text-xs text-neutral-400">{r.label}</p>
              </div>
            ))}
            <a
              href={site.url ?? `/work/${site.id}`}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              aria-label={`${site.clientName}: ${external ? 'visit the website (opens in a new tab)' : 'read the case study'}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold transition-colors hover:border-brand hover:bg-brand hover:text-ink"
            >
              {external ? 'Visit site' : 'Case study'}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>
        </div>

        {/* Earlier cards darken as new ones stack on top */}
        <motion.span aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />
      </motion.article>
    </div>
  );
}
