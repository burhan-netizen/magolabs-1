import { ArrowUpRight } from 'lucide-react';
import { GOOGLE_PROFILE_URL, GOOGLE_REVIEW_URL } from '../utils/contactLinks';
import { TESTIMONIALS, type Testimonial } from '../data/testimonials';
import { getCaseStudyById } from '../data/caseStudies';

/** Mago Labs on Google. Update the rating and count here when new reviews come in. */
export const GOOGLE_RATING = '5.0';
export const GOOGLE_REVIEWS = 8;
/** Client logos drawn for a dark background (same as the home page logo wall). */
export const DARK_LOGOS = new Set(['jaymocivil']);

/** The one line on each review that says what changed. Each is either the client's
 *  own words from their review, or a result already published on the Work page. */
export const RESULT: Record<string, string> = {
  'darshan-galani': '34 new clients in 3 months',
  'smit-antala': 'Even better than we expected',
  'manav-shah': 'A website that backs up every sales call',
  'jay-mehta': 'Clear, professional and easy to trust',
  'manish-khandelwal': 'A real difference in how prospects respond',
  'ketan-mayani': 'Delivered on schedule',
  'mihir-shah': '25 to 58 patients a day',
  'harshit-chopra': 'From no website to a full catalogue',
  'denish-dalal': 'Enquiries directly through the site',
  'john-mouawad': 'The team smashed it',
  'juhi-bais': 'Changes made without issues',
};

/** Reviews with a number to show lead. */
export const ORDER = ['mihir-shah', 'darshan-galani', 'john-mouawad', 'denish-dalal', 'manish-khandelwal', 'juhi-bais', 'jay-mehta', 'harshit-chopra', 'smit-antala', 'manav-shah', 'ketan-mayani'];

export function getReview(id: string): Testimonial | undefined {
  return TESTIMONIALS.find((t) => t.id === id);
}

export function GoogleMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

/** The Google rating box, with the "Leave a review" line under it. */
export function GoogleRatingBox() {
  return (
    <>
      <a
        href={GOOGLE_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="deck-google group"
        aria-label={`Rated ${GOOGLE_RATING} out of 5 from ${GOOGLE_REVIEWS} Google reviews. Read all reviews on Google, opens in a new tab`}
      >
        <GoogleMark className="h-10 w-10 flex-none" />
        <span className="min-w-0">
          <span className="flex items-center gap-2">
            <span className="text-2xl font-bold text-neutral-900 leading-none">{GOOGLE_RATING}</span>
            <span className="text-[#FBBC04] text-lg leading-none tracking-[0.08em]" aria-hidden="true">★★★★★</span>
          </span>
          <span className="mt-1.5 block text-sm text-neutral-600">from {GOOGLE_REVIEWS} Google reviews</span>
        </span>
        <span className="deck-google-cta">
          Read all reviews
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </a>
      <p className="mt-3 text-sm text-neutral-600">
        Worked with us?{' '}
        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-neutral-900 underline decoration-brand decoration-2 underline-offset-4"
        >
          Leave a review<span className="sr-only"> on Google (opens in a new tab)</span>
        </a>
      </p>
    </>
  );
}

/** Who said it: the client's logo (or initials), name and business, and a Google
 *  badge linking to the profile when the review was left on Google. */
export function ReviewBy({ item, tone = 'light', badgeLink = true }: { item: Testimonial; tone?: 'light' | 'dark'; badgeLink?: boolean }) {
  const study = item.caseStudyId ? getCaseStudyById(item.caseStudyId) : undefined;
  const logo = study?.logoUrl;
  const badge = (
    <>
      <GoogleMark className="h-3.5 w-3.5" />
      Google review
    </>
  );
  return (
    <div className={`review-by review-by-${tone}`}>
      {logo ? (
        <span className={`review-logo ${DARK_LOGOS.has(study?.id ?? '') ? 'is-dark' : ''}`}>
          <img src={logo} alt="" loading="lazy" decoding="async" draggable={false} />
        </span>
      ) : (
        <span className="review-initials" style={{ background: item.accent }}>{item.initials}</span>
      )}
      <span className="min-w-0 flex-1">
        <span className="review-name">{item.name}</span>
        <span className="review-company">{item.company}</span>
      </span>
      {item.source === 'google' &&
        (badgeLink ? (
          <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="review-source">
            {badge}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <span className="review-source">{badge}</span>
        ))}
    </div>
  );
}
