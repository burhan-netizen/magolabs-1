import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

const WHO = ['Dental clinics', 'CA firms', 'Manufacturers', 'Textile mills', 'Exporters', 'Contractors', 'Consultants', 'Loan advisors', 'Doctors', 'Local shops', 'You.'];
const ROW = 1.15; // em, the height of one word in the wheel

function Word({ word, i, p }: { word: string; i: number; p: MotionValue<number>; key?: string }) {
  // p runs 0..WHO.length-1 through the scroll; the word nearest p is the active one.
  const dist = useTransform(p, (v) => Math.abs(v - i));
  const opacity = useTransform(dist, [0, 1, 2.5], [1, 0.32, 0.08]);
  const rotateX = useTransform(p, (v) => (i - v) * -22);
  const last = i === WHO.length - 1;
  return (
    <motion.li style={{ opacity, rotateX, height: `${ROW}em` }} className="flex items-center whitespace-nowrap">
      {last ? <span className="rounded-[0.12em] bg-brand px-[0.15em] leading-[1.05]">{word}</span> : word}
    </motion.li>
  );
}

export default function BuiltFor() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const p = useTransform(scrollYProgress, [0.05, 0.9], [0, WHO.length - 1], { clamp: true });
  const y = useTransform(p, (v) => `${-v * ROW}em`);

  if (reduce) {
    return (
      <section aria-labelledby="built-for" className="bg-[#F4F3EF] py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 id="built-for" className="v3-h2">Built for the businesses that keep India running.</h2>
          <p className="mt-6 text-xl text-ink/70">{WHO.join(' · ')}</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="built-for" className="bg-[#F4F3EF]">
      <div ref={ref} className="relative h-[230vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-6 px-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:px-8">
            <div>
              <p className="v3-label">Who we work with</p>
              <h2 id="built-for" className="v3-h2 mt-4">Websites built for</h2>
              <p className="mt-5 max-w-[34ch] text-[17px] leading-relaxed text-ink/65">
                From a clinic in Surat to a civil contractor in Sydney. If your customers search before they call, we build for you.
              </p>
            </div>
            <div className="v3-wheel relative h-[3.6em] [perspective:900px]" aria-hidden="true">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[1.3em] bg-gradient-to-b from-[#F4F3EF] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[1.3em] bg-gradient-to-t from-[#F4F3EF] to-transparent" />
              <motion.ul style={{ y }} className="absolute left-0 top-[1.225em] [transform-style:preserve-3d]">
                {WHO.map((w, i) => <Word key={w} word={w} i={i} p={p} />)}
              </motion.ul>
            </div>
            <p className="sr-only">Dental clinics, CA firms, manufacturers, textile mills, exporters, contractors, consultants, loan advisors, doctors, local shops, and you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
