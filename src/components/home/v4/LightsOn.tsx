import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import PageLink from '../../PageLink';
import { getWorkDetailPath } from '../../../utils/pageRoutes';

const SITES = [
  { id: 'drmihirshah', name: 'Dr. Mihir Shah Smile Care Clinic', place: 'Dental clinic, Surat', big: '25 → 58', small: 'patients a day, two months after launch' },
  { id: 'darshangalani', name: 'Darshan Galani & Co.', place: 'CA firm, Surat', big: '34', small: 'new clients in three months, starting from no website' },
  { id: 'jaymocivil', name: 'Jaymo Civil', place: 'Excavation and civil, Sydney', big: 'Live', small: '"I\'m getting so much good feedback." John Mouawad, owner' },
  { id: 'ladsonconcrete', name: 'Ladson Concrete', place: 'Concrete contractor, Florida', big: 'Live', small: 'A new website and Google profile for Northeast Florida' },
];

function Slide({ s, i, n, p, onOpen }: { s: (typeof SITES)[number]; i: number; n: number; p: MotionValue<number>; onOpen: (id: string) => void; key?: string }) {
  const seg = 1 / n;
  const a = i * seg;
  const show = useTransform(p, [a - 0.02, a + 0.04, a + seg - 0.04, a + seg + 0.02], [0, 1, 1, i === n - 1 ? 1 : 0]);
  const light = useTransform(p, [a + 0.02, a + seg * 0.45], [0, 1]);
  const filter = useTransform(light, (v) => `grayscale(${1 - v}) brightness(${0.18 + v * 0.82})`);
  const glow = useTransform(light, (v) => `0 0 ${v * 120}px ${v * 10}px rgba(255,197,61,${v * 0.35})`);
  const y = useTransform(p, [a - 0.02, a + 0.06], [60, 0]);
  const textOpacity = useTransform(light, [0.55, 1], [0, 1]);
  return (
    <motion.div style={{ opacity: show }} className="absolute inset-0 flex items-center">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
        <motion.div style={{ y }}>
          <PageLink href={getWorkDetailPath(s.id)} onNavigate={() => onOpen(s.id)} className="block">
            <motion.div style={{ boxShadow: glow }} className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <motion.img style={{ filter }} src={`/screenshots/${s.id}-1920.webp`} alt={`${s.name} website by Mago Labs`} width={1920} height={900} loading="lazy" className="block aspect-[1920/900] w-full object-cover object-top" />
            </motion.div>
          </PageLink>
        </motion.div>
        <motion.div style={{ opacity: textOpacity }}>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/45">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</p>
          <p className="n-big mt-4 text-brand">{s.big}</p>
          <p className="mt-3 max-w-[30ch] text-[18px] leading-snug text-white/80">{s.small}</p>
          <p className="mt-8 text-[20px] font-bold text-white">{s.name}</p>
          <p className="text-[15px] text-white/50">{s.place}</p>
          <PageLink href={getWorkDetailPath(s.id)} onNavigate={() => onOpen(s.id)} className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-white underline decoration-white/30 underline-offset-[6px] hover:decoration-white">
            See the case study <ArrowUpRight className="h-4 w-4" />
          </PageLink>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function LightsOn({ onOpenCaseStudy, onSeeWork }: { onOpenCaseStudy: (id: string) => void; onSeeWork: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useTransform(scrollYProgress, [0.06, 0.96], [0, 1]);
  const introOpacity = useTransform(scrollYProgress, (v) => Math.max(0, 1 - v / 0.05));

  return (
    <section id="lights" aria-labelledby="lights-title" className="relative text-white">
      {/* Desktop: each site switches on as you scroll */}
      {!reduce && (
        <div ref={ref} className="relative hidden h-[520vh] lg:block">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <motion.div style={{ opacity: introOpacity }} className="absolute inset-0 flex items-center justify-center text-center">
              <h2 id="lights-title" className="n-h2 max-w-[16ch]">This is what happens when the lights come on.</h2>
            </motion.div>
            {SITES.map((s, i) => <Slide key={s.id} s={s} i={i} n={SITES.length} p={p} onOpen={onOpenCaseStudy} />)}
          </div>
        </div>
      )}

      {/* Phones, tablets and reduced motion: each site lights up as it scrolls into view */}
      <div className={`mx-auto max-w-3xl px-5 py-24 ${reduce ? '' : 'lg:hidden'}`}>
        <h2 className="n-h2">This is what happens when the lights come on.</h2>
        <div className="mt-14 space-y-16">
          {SITES.map((s) => (
            <PageLink key={s.id} href={getWorkDetailPath(s.id)} onNavigate={() => onOpenCaseStudy(s.id)} className="n-lit block">
              <img src={`/screenshots/${s.id}.webp`} alt={`${s.name} website by Mago Labs`} width={900} height={422} loading="lazy" className="block aspect-[1920/900] w-full rounded-xl object-cover object-top" />
              <p className="n-big mt-6 text-brand">{s.big}</p>
              <p className="mt-2 text-[17px] text-white/80">{s.small}</p>
              <p className="mt-4 font-bold">{s.name}</p>
              <p className="text-[14px] text-white/50">{s.place}</p>
            </PageLink>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <PageLink page="work" onNavigate={onSeeWork} className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[15px] font-semibold text-white hover:bg-white/10">
          See all our work <ArrowUpRight className="h-4 w-4" />
        </PageLink>
      </div>
    </section>
  );
}
