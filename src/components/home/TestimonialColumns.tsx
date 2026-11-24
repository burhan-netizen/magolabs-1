import { Star } from 'lucide-react';
import PageLink from '../PageLink';
import { TESTIMONIALS, type Testimonial } from '../../data/testimonials';
import { getWorkDetailPath } from '../../utils/pageRoutes';
import { GOOGLE_PROFILE_URL } from './HeroV2';

function Card({ t, onOpen, hidden }: { key?: string; t: Testimonial; onOpen: (id: string) => void; hidden?: boolean }) {
  return (
    <figure className="rounded-[24px] bg-white p-6 shadow-[0_1px_0_rgba(22,19,15,0.06),0_20px_40px_-28px_rgba(22,19,15,0.35)] ring-1 ring-ink/5 md:p-7" aria-hidden={hidden || undefined}>
      <div className="flex text-[#E8A317]" aria-label={hidden ? undefined : '5 stars'}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-4 text-[1.02rem] leading-relaxed text-ink/85">“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full font-semibold text-white text-sm" style={{ background: t.accent }}>
          {t.initials}
        </span>
        <span className="min-w-0 text-sm">
          <span className="block font-semibold text-ink">{t.name}</span>
          <span className="block truncate text-ink/55">
            {t.role}, {t.company}
          </span>
        </span>
      </figcaption>
      {t.caseStudyId && !hidden && (
        <PageLink href={getWorkDetailPath(t.caseStudyId)} onNavigate={() => onOpen(t.caseStudyId!)} className="link-grow mt-5 inline-block text-sm font-semibold text-ink">
          See the website
        </PageLink>
      )}
    </figure>
  );
}

/**
 * Every client review, in three columns that drift past slowly (the middle one the
 * other way). Hovering a column stops it. Phones get one swipeable row.
 */
export default function TestimonialColumns({ onOpenCaseStudy }: { onOpenCaseStudy: (id: string) => void }) {
  const cols: Testimonial[][] = [[], [], []];
  TESTIMONIALS.forEach((t, i) => cols[i % 3].push(t));
  const speeds = ['70s', '84s', '76s'];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#EDE7DA] py-24 md:py-32">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="label-v2">In their words</span>
            <h2 className="display-lg mt-5 max-w-[14ch] text-[clamp(2.5rem,5.6vw,5rem)] text-ink">
              Clients say it <span className="font-serif-accent">better.</span>
            </h2>
          </div>
          <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4 rounded-full bg-white px-6 py-4 shadow-sm ring-1 ring-ink/5">
            <span className="display-lg text-4xl text-ink">5.0</span>
            <span className="text-sm leading-tight text-ink/70">
              <span className="flex text-[#E8A317]">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </span>
              <span className="link-grow">Read our Google reviews</span>
            </span>
          </a>
        </div>

        {/* Wide screens: drifting columns */}
        <div className="mask-y mt-14 hidden h-[760px] grid-cols-3 gap-5 overflow-hidden md:grid">
          {cols.map((col, c) => (
            <div key={c} className={`tcol-anim h-full overflow-hidden ${c === 1 ? "reverse" : ""}`} style={{ ['--dur' as string]: speeds[c] }}>
              <div className="tcol-track">
                {col.map((t) => (
                  <Card key={t.id} t={t} onOpen={onOpenCaseStudy} />
                ))}
                {col.map((t) => (
                  <Card key={`${t.id}-copy`} t={t} onOpen={onOpenCaseStudy} hidden />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Phones: swipe sideways */}
        <div className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:hidden [scrollbar-width:none]">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="w-[86%] flex-none snap-center">
              <Card t={t} onOpen={onOpenCaseStudy} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
