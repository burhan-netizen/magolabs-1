import { useRef } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import PageLink from '../PageLink';
import { PageId } from '../../types';
import { useMediaQuery } from '../../hooks/useMediaQuery';

const MAIN_POINTS = [
  'Designed for your business from a blank page, never a template.',
  'Hand-coded to load fast on any phone and any network.',
  'Copy written by a human who has studied your buyers.',
  'Hosting included, and you own your domain and code.',
];

const SERVICES: { page: PageId; name: string; line: string }[] = [
  { page: 'service-web-design', name: 'Custom websites', line: 'The main thing we do' },
  { page: 'service-seo', name: 'Local SEO', line: 'Found for what you sell' },
  { page: 'service-gbp', name: 'Google Business Profile', line: 'On the map nearby' },
  { page: 'service-copywriting', name: 'Conversion copywriting', line: 'Words that build trust' },
  { page: 'service-social-media', name: 'Social media', line: 'Stay seen between visits' },
  { page: 'service-lead-generation', name: 'Lead generation', line: 'More conversations' },
  { page: 'service-paid-ads', name: 'Meta & Google ads', line: 'Traffic on demand' },
];

export default function ServicesTilt({ onNavigate, onAudit }: { onNavigate: (page: PageId) => void; onAudit: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const wide = useMediaQuery('(min-width: 1024px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['18%', '-22%']);

  return (
    <section id="services-overview" className="relative overflow-hidden bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <span className="label-v2">What we do</span>
        <h2 className="display-lg mt-5 max-w-[15ch] text-[clamp(2.5rem,5.6vw,5rem)] text-ink">
          One thing, done <span className="font-serif-accent">properly.</span>
        </h2>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
          {/* The main service, said plainly */}
          <article className="rounded-[32px] bg-ink p-8 text-paper md:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand">Website design &amp; development</p>
            <h3 className="display-lg mt-4 text-[clamp(2rem,3.4vw,3rem)]">A website that makes people call.</h3>
            <ul className="mt-8 space-y-4">
              {MAIN_POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-paper/80">
                  <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand text-ink">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <PageLink page="contact" onNavigate={onAudit} className="btn-v2 btn-primary">
                Get a free website audit
                <ArrowRight className="arrow h-4 w-4" />
              </PageLink>
              <PageLink page="service-web-design" onNavigate={() => onNavigate('service-web-design')} className="link-grow text-sm font-semibold text-paper">
                See how it works
              </PageLink>
            </div>
          </article>

          {/* Everything that goes alongside it, rolling past on a tilt */}
          <div ref={ref} className="relative lg:[perspective:1200px]">
            <p className="mb-4 text-sm text-ink/60 lg:hidden">Plus everything that helps it work:</p>
            <div className="lg:h-[560px] lg:overflow-hidden mask-y">
              <div className="origin-center lg:[transform:rotateX(18deg)_rotateZ(-7deg)] lg:pt-10">
              <motion.ul style={{ y: wide && !reduce ? y : 0 }}>
                {SERVICES.map((s, i) => (
                  <li key={s.page} className="border-b border-ink/10 last:border-0">
                    <PageLink
                      page={s.page}
                      onNavigate={() => onNavigate(s.page)}
                      className="group flex items-baseline justify-between gap-4 py-4 md:py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-ink/40">0{i + 1}</span>
                        <span className="display-lg text-[clamp(1.7rem,3.4vw,3.2rem)] text-ink transition-colors duration-300 group-hover:text-ink/45">
                          {s.name}
                        </span>
                      </span>
                      <span className="hidden items-center gap-1.5 whitespace-nowrap text-sm text-ink/55 transition-transform duration-300 group-hover:-translate-x-1 sm:inline-flex">
                        {s.line}
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </PageLink>
                  </li>
                ))}
              </motion.ul>
              </div>
            </div>
            <p className="mt-6 text-sm text-ink/60">
              Pricing for SEO, Google Business Profile and the rest depends on your goals.{' '}
              <PageLink page="contact" onNavigate={onAudit} className="link-grow font-semibold text-ink">Ask us</PageLink>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
