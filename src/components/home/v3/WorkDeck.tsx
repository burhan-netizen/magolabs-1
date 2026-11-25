import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import PageLink from '../../PageLink';
import BgVideo from '../BgVideo';
import { getWorkDetailPath } from '../../../utils/pageRoutes';

const WORK = [
  { id: 'drmihirshah', name: 'Dr. Mihir Shah Smile Care Clinic', tag: 'Dental clinic, Surat', result: '25 to 58 patients a day' },
  { id: 'ladsonconcrete', name: 'Ladson Concrete', tag: 'Concrete contractor, Florida', result: 'New website live' },
  { id: 'darshangalani', name: 'Darshan Galani & Co.', tag: 'CA firm, Surat', result: '34 new clients in 3 months' },
  { id: 'jaymocivil', name: 'Jaymo Civil', tag: 'Excavation and civil, Sydney', result: 'New website live' },
  { id: 'centurion', name: 'Centurion Strategic Ventures', tag: 'Loan advisory, India', result: 'New website live' },
  { id: 'prabhakarprocessors', name: 'Prabhakar Processors', tag: 'Textile mill, Surat', result: 'New website live' },
];

/* Where each card lands once it has been dealt: a fanned spread. */
const LAND = [
  { x: -33, y: 4, r: -6 },
  { x: -20, y: -3, r: -3 },
  { x: -7, y: 5, r: 1 },
  { x: 7, y: -2, r: -2 },
  { x: 20, y: 4, r: 3 },
  { x: 33, y: -3, r: 6 },
];

const STATS = [
  { value: '25 to 58', label: 'patients a day for a dental clinic, 2 months after launch' },
  { value: '63%', label: 'more appointment calls for the same clinic' },
  { value: '34', label: 'new clients in 3 months for a CA firm that had no website' },
  { value: '6', label: 'countries we build for: India, Australia, USA, UK, Canada, UAE' },
];

function Card({ w, i, progress, onOpen }: { w: (typeof WORK)[number]; i: number; progress: MotionValue<number>; onOpen: (id: string) => void; key?: string }) {
  const start = 0.05 + i * 0.1;
  const end = start + 0.22;
  const land = LAND[i];
  const x = useTransform(progress, [start, end], ['120vw', `${land.x}vw`]);
  const y = useTransform(progress, [start, end], ['30vh', `${land.y}vh`]);
  const rotate = useTransform(progress, [start, end], [24, land.r]);
  return (
    <motion.div style={{ x, y, rotate, zIndex: 10 + i }} className="absolute left-1/2 top-[54%] -ml-[clamp(135px,11.5vw,185px)] -mt-[clamp(95px,8.5vw,140px)] w-[clamp(270px,23vw,370px)]">
      <PageLink href={getWorkDetailPath(w.id)} onNavigate={() => onOpen(w.id)} className="group block rounded-[20px] bg-white p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-3">
        <img src={`/screenshots/${w.id}.webp`} srcSet={`/screenshots/${w.id}.webp 900w, /screenshots/${w.id}-1920.webp 1920w`} sizes="420px" alt={`${w.name} website by Mago Labs`} width={900} height={422} loading="lazy" className="block aspect-[1920/900] w-full rounded-[13px] object-cover object-top" />
        <div className="flex items-end justify-between gap-3 px-2 pb-1.5 pt-3.5">
          <div>
            <p className="text-[15px] font-bold leading-tight text-ink">{w.name}</p>
            <p className="mt-0.5 text-[13px] text-ink/55">{w.tag}</p>
          </div>
          <span className="shrink-0 rounded-full bg-brand px-2.5 py-1 text-[12px] font-semibold text-ink">{w.result}</span>
        </div>
      </PageLink>
    </motion.div>
  );
}

export default function WorkDeck({ onOpenCaseStudy, onSeeWork }: { onOpenCaseStudy: (id: string) => void; onSeeWork: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const titleScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.82]);
  const titleOpacity = useTransform(scrollYProgress, [0.4, 0.75], [1, 0.25]);

  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-navy text-white">
      {/* Desktop: the cards are dealt onto the table as you scroll */}
      <div ref={ref} className={`relative hidden lg:block ${reduce ? '' : 'h-[260vh]'}`}>
        <div className={`${reduce ? '' : 'sticky top-0'} h-[100svh] overflow-hidden`}>
          <BgVideo name="sweep" className="absolute inset-0 h-full w-full opacity-50" />
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,23,51,0.35),rgba(10,23,51,0.9)_75%)]" />
          <motion.div style={reduce ? undefined : { scale: titleScale, opacity: titleOpacity }} className="absolute inset-x-0 top-[13%] z-0 text-center">
            <p className="v3-label text-white/55">Selected work</p>
            <h2 id="work-title" className="v3-h2 mt-4 text-white">Real businesses. <span className="text-brand">Real results.</span></h2>
          </motion.div>
          {!reduce && WORK.map((w, i) => <Card key={w.id} w={w} i={i} progress={scrollYProgress} onOpen={onOpenCaseStudy} />)}
          {reduce && (
            <div className="absolute inset-x-0 top-[34%] mx-auto grid max-w-6xl grid-cols-3 gap-6 px-8">
              {WORK.slice(0, 3).map((w) => (
                <PageLink key={w.id} href={getWorkDetailPath(w.id)} onNavigate={() => onOpenCaseStudy(w.id)} className="block rounded-2xl bg-white p-2.5 text-ink">
                  <img src={`/screenshots/${w.id}.webp`} alt={`${w.name} website by Mago Labs`} width={900} height={422} className="block aspect-[1920/900] w-full rounded-xl object-cover object-top" />
                  <p className="px-2 pt-3 text-[15px] font-bold">{w.name}</p>
                </PageLink>
              ))}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-[7%] z-30 flex justify-center">
            <PageLink page="work" onNavigate={onSeeWork} className="group inline-flex items-center gap-3 rounded-full bg-white py-3 pl-6 pr-3 text-[15px] font-semibold text-ink hover:bg-brand">
              See all our work
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
            </PageLink>
          </div>
        </div>
      </div>

      {/* Phones and tablets: a swipe row */}
      <div className="relative overflow-hidden py-20 lg:hidden">
        <BgVideo name="sweep" className="absolute inset-0 h-full w-full opacity-40" />
        <div className="relative px-5">
          <p className="v3-label text-white/55">Selected work</p>
          <h2 className="v3-h2 mt-3 text-white">Real businesses. <span className="text-brand">Real results.</span></h2>
        </div>
        <div className="relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
          {WORK.map((w) => (
            <PageLink key={w.id} href={getWorkDetailPath(w.id)} onNavigate={() => onOpenCaseStudy(w.id)} className="w-[82vw] max-w-[380px] shrink-0 snap-center rounded-2xl bg-white p-2.5 text-ink">
              <img src={`/screenshots/${w.id}.webp`} alt={`${w.name} website by Mago Labs`} width={900} height={422} loading="lazy" className="block aspect-[1920/900] w-full rounded-xl object-cover object-top" />
              <div className="px-2 pb-1.5 pt-3">
                <p className="text-[15px] font-bold leading-tight">{w.name}</p>
                <p className="mt-0.5 text-[13px] text-ink/55">{w.tag}</p>
                <span className="mt-2.5 inline-flex rounded-full bg-brand px-2.5 py-1 text-[12px] font-semibold">{w.result}</span>
              </div>
            </PageLink>
          ))}
        </div>
        <div className="relative mt-6 px-5">
          <PageLink page="work" onNavigate={onSeeWork} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-ink">See all our work <ArrowUpRight className="h-4 w-4" /></PageLink>
        </div>
      </div>

      {/* Results, in real numbers */}
      <div className="relative border-t border-white/10">
        <dl className="mx-auto grid max-w-7xl grid-cols-1 gap-px px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.value} className="py-10 lg:px-6 lg:py-14 lg:first:pl-0">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="v3-stat block text-brand">{s.value}</span>
                <span className="mt-3 block max-w-[30ch] text-[15px] leading-snug text-white/65">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
