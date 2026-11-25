import type { Testimonial } from '../data/testimonials';
import { RESULT, ReviewBy, getReview } from './reviewBits';

interface ReviewCardsProps {
  /** Testimonial ids, in the order to show them. */
  ids: string[];
  className?: string;
}

/** One to three client reviews as cards, for placing the right review on the right page. */
export default function ReviewCards({ ids, className = '' }: ReviewCardsProps) {
  const items = ids.map(getReview).filter((t): t is Testimonial => Boolean(t));
  if (!items.length) return null;
  const cols = items.length >= 3 ? 'lg:grid-cols-3 md:grid-cols-2' : items.length === 2 ? 'md:grid-cols-2' : 'max-w-3xl';
  return (
    <div className={`grid grid-cols-1 gap-5 ${cols} ${className}`}>
      {items.map((item) => (
        <figure key={item.id} className="wall-card is-static">
          <p className="wall-result">{RESULT[item.id]}</p>
          <blockquote className="wall-quote">&ldquo;{item.quote}&rdquo;</blockquote>
          <figcaption>
            <ReviewBy item={item} />
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
