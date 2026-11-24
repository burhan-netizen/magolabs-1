import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import PageLink from '../PageLink';
import BgVideo from './BgVideo';
import { CASE_STUDIES } from '../../data/caseStudies';
import { getWorkDetailPath } from '../../utils/pageRoutes';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const ORDER = [
  'drmihirshah', 'jaymocivil', 'darshangalani', 'ladsonconcrete',
  'santoshtimbers', 'centurion', 'solway', 'prabhakarprocessors',
  'astrabizz', 'kdmayani', 'jaymehta', 'mnp',
  'momrise', 'tinyhumans', 'drmihirshah', 'jaymocivil',
];

function Tile({ id, onOpen, eager }: { key?: string; id: string; onOpen: (id: string) => void; eager?: boolean }) {
  const cs = CASE_STUDIES.find((c) => c.id === id);
  const name = cs?.clientName ?? id;
  return (
    <PageLink
      href={getWorkDetailPath(id)}
      onNavigate={() => onOpen(id)}
      aria-label={`Case study: ${name}`}
      className="group block overflow-hidden rounded-[14px] bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-1.5"
    >
      <div className="flex items-center gap-1 border-b border-black/5 bg-[#FBFAF7] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E4E1D9]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#E4E1D9]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#E4E1D9]" />
        <span className="ml-2 truncate font-mono text-[10px] text-ink/45">{cs?.domain?.replace(/^www\./, '') ?? name}</span>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={`/screenshots/full/${id}-300.webp`}
          alt={`${name} website designed by Mago Labs`}
          width={300}
          height={1218}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-x-0 top-0 h-auto w-full transition-transform duration-[2.4s] ease-out group-hover:-translate-y-[55%]"
        />
      </div>
    </PageLink>
  );
}

/**
 * The work, laid out on a tilted plane the visitor flies over. As they scroll, the
 * plane lifts and flattens into a readable wall of real client sites.
 */
export default function WorkFlyover({ onOpenCaseStudy, onSeeAll }: { onOpenCaseStudy: (id: string) => void; onSeeAll: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 768px)');
  const tiles = wide ? ORDER : ORDER.slice(0, 10);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const rotateX = useTransform(scrollYProgress, [0, 0.72], [56, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.72], [-15, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.72], [1.3, wide ? 0.8 : 0.9]);
  const headingOpacity = useTransform(scrollYProgress, [0.5, 0.66], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.72], ['16%', '-2%']);
  const ctaOpacity = useTransform(scrollYProgress, [0.66, 0.84], [0, 1]);

  const plane = (
    <div className={`grid gap-4 md:gap-5 ${wide ? 'grid-cols-4' : 'grid-cols-2'} w-[min(1180px,100%)]`}>
      {tiles.map((id, i) => (
        <Tile key={`${id}-${i}`} id={id} onOpen={onOpenCaseStudy} eager={i < 4} />
      ))}
    </div>
  );

  const heading = (
    <div>
      <span className="label-v2 on-dark">Our work</span>
      <h2 className="display-lg mt-4 text-[clamp(2.6rem,6vw,5.6rem)] text-paper">
        Selected <span className="font-serif-accent text-brand">work.</span>
      </h2>
      <p className="mt-4 max-w-md text-paper/65">
        Clinics, CA firms, manufacturers and contractors, from Surat to Sydney to Florida. Each one designed and coded from a blank page.
      </p>
    </div>
  );

  const cta = (
    <PageLink page="work" onNavigate={onSeeAll} className="btn-v2 btn-primary">
      See all work
      <ArrowRight className="arrow h-4 w-4" />
    </PageLink>
  );

  if (reduce) {
    return (
      <section id="work" className="relative bg-ink py-24 text-paper">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          {heading}
          <div className="mt-12">{plane}</div>
          <div className="mt-12">{cta}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" ref={ref} className="relative h-[260svh] bg-ink text-paper md:h-[300svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <BgVideo name="sweep" className="absolute inset-0 h-full w-full opacity-55" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-ink via-ink/30 to-ink" />

        <div className="absolute inset-0 flex items-center justify-center px-5 [perspective:1400px] sm:px-8">
          <motion.div style={{ rotateX, rotateZ, scale, y }} className="[transform-style:preserve-3d] will-change-transform">
            {plane}
          </motion.div>
        </div>

        <motion.div style={{ opacity: headingOpacity }} className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-ink via-ink/85 to-transparent pb-24 pt-24 md:pt-28">
          <div className="pointer-events-auto mx-auto max-w-[1180px] px-5 sm:px-8">{heading}</div>
        </motion.div>

        <motion.div style={{ opacity: ctaOpacity }} className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent pb-10 pt-24">
          <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8">
            <p className="hidden text-paper/70 sm:block">Hover any site to scroll through it.</p>
            {cta}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
