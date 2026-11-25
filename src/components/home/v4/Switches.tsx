import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import PageLink from '../../PageLink';
import type { PageId } from '../../../types';

const SERVICES: { id: PageId; name: string; line: string }[] = [
  { id: 'service-web-design', name: 'A website made for you', line: 'Designed from a blank page, fast on every phone, built to turn visitors into calls.' },
  { id: 'service-seo', name: 'Found on Google', line: 'So people searching for what you do find you first, not the business next door.' },
  { id: 'service-gbp', name: 'On the map', line: 'Your Google Business Profile set up properly, so calls start before anyone visits your site.' },
  { id: 'service-copywriting', name: 'Words that sell', line: 'Plain, clear copy that tells people what you do and why to pick you today.' },
];

function Row({ s, i, onNavigate }: { s: (typeof SERVICES)[number]; i: number; onNavigate: (p: PageId) => void; key?: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'start 0.45'] });
  const on = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const color = useTransform(on, (v) => `rgba(255,${Math.round(197 + (255 - 197) * (1 - v))},${Math.round(61 + (255 - 61) * (1 - v))},${0.18 + v * 0.82})`);
  const shadow = useTransform(on, (v) => `0 0 ${v * 36}px rgba(255,197,61,${v * 0.45})`);
  return (
    <li ref={ref} className="border-b border-white/10 py-8 md:py-10">
      <PageLink page={s.id} onNavigate={() => onNavigate(s.id)} className="group grid items-baseline gap-3 md:grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1fr)] md:gap-8">
        <span className="text-[14px] font-semibold text-white/35">0{i + 1}</span>
        <motion.span style={reduce ? { color: '#FFC53D' } : { color, textShadow: shadow }} className="n-row">{s.name}</motion.span>
        <span className="flex items-start justify-between gap-4 text-[17px] leading-relaxed text-white/65">
          {s.line}
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-white/40 transition-transform duration-300 group-hover:rotate-45 group-hover:text-brand" />
        </span>
      </PageLink>
    </li>
  );
}

export default function Switches({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 text-white md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 id="services-title" className="n-h2 max-w-[18ch]">Four switches we flip for you.</h2>
        <ul className="mt-14 border-t border-white/10">
          {SERVICES.map((s, i) => <Row key={s.id} s={s} i={i} onNavigate={onNavigate} />)}
        </ul>
      </div>
    </section>
  );
}
