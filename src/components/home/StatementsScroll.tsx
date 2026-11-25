import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import PageLink from '../PageLink';
import ScrollFillText from './ScrollFillText';

const STATEMENTS = [
  'Search is where most people meet you first.',
  'They decide in seconds whether you look like the real thing.',
  'If you don’t, they never call. And nobody tells you why.',
];

/**
 * The problem, one calm sentence per screen. The page slowly darkens from paper to
 * ink as the visitor reads, and each sentence lights up word by word.
 */
export default function StatementsScroll({ onAudit }: { onAudit: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const bg = useTransform(scrollYProgress, [0.03, 0.13], ['#F1EEE8', '#151310']);
  const fg = useTransform(scrollYProgress, [0.03, 0.13], ['#151310', '#F1EEE8']);

  return (
    <motion.section ref={ref} id="problem-section" style={{ backgroundColor: bg, color: fg }} className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[40svh] items-end pb-8">
          <p className="studio-label opacity-60">(01) The problem</p>
        </div>

        {STATEMENTS.map((line, i) => (
          <div key={line} className="flex min-h-[90svh] items-center justify-center">
            <ScrollFillText
              as={i === 0 ? 'h2' : 'p'}
              text={line}
              dim={0.14}
              className="studio-lg max-w-[18ch] text-center text-[clamp(2.4rem,6.2vw,6.4rem)]"
              accentWords={['seconds', 'never']}
              accentClass="font-serif-accent tracking-[-0.02em]"
            />
          </div>
        ))}

        <div className="flex min-h-[80svh] flex-col items-center justify-center pb-24 text-center">
          <p className="studio-xl text-[clamp(3rem,9vw,9rem)]">
            That’s the part <span className="font-serif-accent tracking-[-0.03em]">we fix.</span>
          </p>
          <PageLink page="contact" onNavigate={onAudit} className="group mt-12 inline-flex items-center gap-3 rounded-full bg-paper py-3 pl-6 pr-3 text-sm font-medium text-ink">
            See what your website is costing you
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-ink transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </PageLink>
        </div>
      </div>
    </motion.section>
  );
}
