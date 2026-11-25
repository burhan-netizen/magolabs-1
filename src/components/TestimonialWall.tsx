import { ArrowUpRight } from 'lucide-react';
import { getCaseStudyById } from '../data/caseStudies';
import type { Testimonial } from '../data/testimonials';
import { getWorkDetailPath } from '../utils/pageRoutes';
import PageLink from './PageLink';
import { GoogleRatingBox, ORDER, RESULT, ReviewBy, getReview } from './reviewBits';

/** The review that leads, shown large. */
const FEATURED = 'darshan-galani';

const REST = ORDER.filter((id) => id !== FEATURED)
  .map(getReview)
  .filter((t): t is Testimonial => Boolean(t));
const ROWS = [REST.filter((_, i) => i % 2 === 0), REST.filter((_, i) => i % 2 === 1)];

function WallCard({ item }: { key?: string; item: Testimonial }) {
  return (
    <article className="wall-card">
      <p className="wall-result">{RESULT[item.id]}</p>
      <blockquote className="wall-quote">&ldquo;{item.quote}&rdquo;</blockquote>
      <ReviewBy item={item} />
    </article>
  );
}

interface TestimonialWallProps {
  onOpenCaseStudy?: (id: string) => void;
}

/**
 * Home page reviews: one review shown large beside the Google rating, then every
 * other review on two slow rows that drift in opposite directions. Hovering or
 * tabbing into a row stops it; with motion turned off the rows scroll by hand.
 */
export default function TestimonialWall({ onOpenCaseStudy }: TestimonialWallProps) {
  const featured = getReview(FEATURED);
  const study = featured?.caseStudyId ? getCaseStudyById(featured.caseStudyId) : undefined;

  return (
    <section id="client-quotes" className="py-24 sm:py-28 bg-neutral-50 font-sans overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <span className="eyebrow">In their own words</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">
                What our clients say.
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-md">
                {ORDER.length} businesses, in their own words. Real reviews from real clients.
              </p>
            </div>
            <GoogleRatingBox />
          </div>

          {featured && (
            <figure className="wall-featured lg:col-span-7">
              <span className="wall-mark" aria-hidden="true">&ldquo;</span>
              <p className="wall-featured-result">{RESULT[featured.id]}</p>
              <blockquote className="wall-featured-quote">{featured.quote}</blockquote>
              <figcaption className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <ReviewBy item={featured} tone="dark" />
                {study && onOpenCaseStudy && (
                  <PageLink
                    href={getWorkDetailPath(study.id)}
                    onNavigate={() => onOpenCaseStudy(study.id)}
                    className="inline-flex flex-none items-center gap-1.5 text-sm font-semibold text-white hover:text-brand transition-colors cursor-pointer"
                  >
                    View case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </PageLink>
                )}
              </figcaption>
            </figure>
          )}
        </div>
      </div>

      <div className="wall-rows mt-16 sm:mt-20" aria-label="More client reviews">
        {ROWS.map((row, r) => (
          <div key={r} className={`wall-row ${r === 1 ? 'is-reverse' : ''}`}>
            <div className="wall-track">
              {row.map((item) => (
                <WallCard key={item.id} item={item} />
              ))}
              {/* A second copy makes the loop seamless; it is hidden from screen readers and the keyboard. */}
              <div className="wall-copy" aria-hidden="true" inert>
                {row.map((item) => (
                  <WallCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
