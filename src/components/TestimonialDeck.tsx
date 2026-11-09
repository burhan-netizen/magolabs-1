import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type PanInfo } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { TESTIMONIALS, TESTIMONIAL_INDUSTRIES, type Testimonial } from '../data/testimonials';
import { getCaseStudyById } from '../data/caseStudies';
import { getWorkDetailPath } from '../utils/pageRoutes';
import PageLink from './PageLink';

/** Mago Labs on Google. Update the rating and count here when new reviews come in. */
const GOOGLE_PROFILE = 'https://maps.app.goo.gl/zSRNvN1V2VWFsnSb8';
const GOOGLE_RATING = '5.0';
const GOOGLE_REVIEWS = 7;
/** Client logos drawn for a dark background (same as the home page logo wall). */
const DARK_LOGOS = new Set(['jaymocivil']);

function GoogleMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

/** The one line on each card that says what changed. Each is either the client's
 *  own words from their review, or a result already published on the Work page. */
const RESULT: Record<string, string> = {
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

// The cards with a number to show lead; a short review opens the deck.
const ORDER = ['mihir-shah', 'darshan-galani', 'john-mouawad', 'denish-dalal', 'manish-khandelwal', 'juhi-bais', 'jay-mehta', 'harshit-chopra', 'smit-antala', 'manav-shah', 'ketan-mayani'];
const CARDS = ORDER.map((id) => TESTIMONIALS.find((t) => t.id === id)).filter((t): t is Testimonial => Boolean(t));

/** Card faces, in rotation, so the edges of the pile read as separate cards. */
const FACES = ['deck-paper', 'deck-ink', 'deck-amber'];
/** How each card lies in the pile when it is not on top (deg). */
const LEAN = [-3, 2.4, -1.6, 3.2, -2.6, 1.8, -3.4, 2.8, -2];
/** Cards visible behind the top one. */
const VISIBLE = 3;

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 26, mass: 0.9 };
const THROW = { type: 'spring' as const, stiffness: 70, damping: 18 };

interface DeckCardProps {
  key?: string;
  item: Testimonial;
  index: number;
  depth: number;
  total: number;
  reduced: boolean;
  /** Came back from the bottom of the pile (the "previous" button). */
  returning: boolean;
  onThrown: () => void;
  register: (id: string, fn: ((dx: number, dy: number) => void) | null) => void;
  setDragging: (dragging: boolean) => void;
  onOpenCaseStudy?: (id: string) => void;
}

function DeckCard({ item, index, depth, total, reduced, returning, onThrown, register, setDragging, onOpenCaseStudy }: DeckCardProps) {
  const isTop = depth === 0;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // The card turns in the direction it is pulled, and fades once it is well clear.
  const tilt = useTransform(x, [-360, 360], [-18, 18]);
  const fade = useTransform([x, y], ([dx, dy]: number[]) => 1 - Math.min(1, Math.max(0, (Math.hypot(dx, dy) - 240) / 320)));
  const [leaving, setLeaving] = useState(false);
  // Moves the card to a point, first stopping any move still in flight: left
  // running, an old throw would finish later and drag the card away again.
  const moves = useRef<{ stop: () => void }[]>([]);
  const moveTo = useCallback(
    (toX: number, toY: number, how: object, vx = 0, vy = 0) => {
      moves.current.forEach((move) => move.stop());
      moves.current = [animate(x, toX, { ...how, velocity: vx }), animate(y, toY, { ...how, velocity: vy })];
    },
    [x, y]
  );
  const quoteRef = useRef<HTMLQuoteElement>(null);

  // Send the card off in a direction, with the speed it was released at.
  const fling = useCallback(
    (dx: number, dy: number, vx = 0, vy = 0) => {
      const reach = Math.max(window.innerWidth, 900) * 0.9;
      const length = Math.hypot(dx, dy) || 1;
      setLeaving(true);
      moveTo((dx / length) * reach, (dy / length) * reach, THROW, vx, vy);
      onThrown();
      // Once it is out of sight it waits there, off to the side, until its turn comes round.
      window.setTimeout(() => setLeaving(false), 520);
    },
    [moveTo, onThrown]
  );

  useEffect(() => {
    register(item.id, isTop ? (dx, dy) => fling(dx, dy) : null);
    return () => register(item.id, null);
  }, [fling, isTop, item.id, register]);

  // Coming back into the visible pile: return to the centre. From the bottom
  // straight to the top (the previous button), it springs in from the side.
  useEffect(() => {
    if (leaving || depth > VISIBLE) return;
    if (isTop) {
      // Still off to the side when it is the top card again: a short pile, where a
      // thrown card comes straight back round.
      const away = Math.hypot(x.get(), y.get()) > 40;
      if (returning && !away && !reduced) x.set(-Math.max(window.innerWidth, 900) * 0.6);
      if (away || returning) moveTo(0, 0, reduced ? { duration: 0 } : SPRING);
    } else {
      moves.current.forEach((move) => move.stop());
      x.set(0);
      y.set(0);
    }
  }, [depth, isTop, leaving, moveTo, reduced, returning, x, y]);

  // Number each word by the line it sits on, so a line rises as one piece.
  useLayoutEffect(() => {
    const quote = quoteRef.current;
    if (!quote) return;
    const mark = () => {
      let line = -1;
      let top = -1;
      quote.querySelectorAll<HTMLElement>('.deck-word').forEach((word) => {
        if (word.offsetTop !== top) {
          top = word.offsetTop;
          line++;
        }
        word.style.setProperty('--line', String(line));
      });
    };
    mark();
    const observer = new ResizeObserver(mark);
    observer.observe(quote);
    return () => observer.disconnect();
  }, []);

  const onDragEnd = (_event: unknown, info: PanInfo) => {
    setDragging(false);
    const distance = Math.hypot(info.offset.x, info.offset.y);
    const speed = Math.hypot(info.velocity.x, info.velocity.y);
    if (distance > 130 || speed > 650) {
      // A flick goes where it was flicked; a slow drag goes where it was dragged.
      const useSpeed = speed > 400;
      fling(useSpeed ? info.velocity.x : info.offset.x, useSpeed ? info.velocity.y : info.offset.y, info.velocity.x, info.velocity.y);
    } else {
      moveTo(0, 0, SPRING);
    }
  };

  const shown = Math.min(depth, VISIBLE);
  const hidden = depth > VISIBLE && !leaving;
  const long = item.quote.length > 320;
  const medium = item.quote.length > 180;
  const study = item.caseStudyId ? getCaseStudyById(item.caseStudyId) : undefined;
  const logo = study?.logoUrl;

  return (
    <motion.div
      className="deck-slot"
      style={{ zIndex: leaving ? total + 1 : total - depth }}
      initial={false}
      animate={{
        y: shown * 16,
        scale: 1 - shown * 0.05,
        rotate: isTop || reduced ? 0 : LEAN[index % LEAN.length],
        opacity: hidden ? 0 : 1,
      }}
      transition={reduced ? { duration: 0.3 } : SPRING}
      aria-hidden={!isTop}
    >
      <motion.article
        className={`deck-card ${FACES[index % FACES.length]} ${isTop ? 'is-top' : ''}`}
        style={{ x, y, rotate: tilt, opacity: fade }}
        drag={isTop && !reduced}
        dragMomentum={false}
        dragElastic={1}
        onDragStart={() => setDragging(true)}
        onDragEnd={onDragEnd}
        whileDrag={{ scale: 1.03 }}
      >
        {/* What changed for them leads; their words back it up. */}
        <p className="deck-result">{RESULT[item.id]}</p>

        <blockquote ref={quoteRef} className={`deck-quote ${long ? 'is-long' : medium ? 'is-medium' : ''}`}>
          {item.quote.split(/\s+/).map((word, w) => (
            // The space sits outside the word's window, or it would be swallowed.
            <Fragment key={w}>
              <span className="deck-word">
                <span className="deck-word-in">{word}</span>
              </span>{' '}
            </Fragment>
          ))}
        </blockquote>

        <footer className="deck-by">
          {logo ? (
            <span className={`deck-logo ${DARK_LOGOS.has(study?.id ?? '') ? 'is-dark' : ''}`}>
              <img src={logo} alt="" loading="lazy" decoding="async" draggable={false} />
            </span>
          ) : (
            <span className="deck-initials">{item.initials}</span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm sm:text-base font-semibold">{item.name}</span>
            <span className="deck-business block truncate text-xs sm:text-sm">{item.company}</span>
          </span>
          {item.source === 'google' && (
            <span className="deck-source">
              <GoogleMark className="h-3.5 w-3.5" />
              Google review
            </span>
          )}
        </footer>

        {study && onOpenCaseStudy && (
          <PageLink
            href={getWorkDetailPath(study.id)}
            onNavigate={() => onOpenCaseStudy(study.id)}
            className="deck-case"
            tabIndex={isTop ? 0 : -1}
            onPointerDownCapture={(event: ReactPointerEvent) => event.stopPropagation()}
            aria-label={`Read the ${study.clientName} case study`}
          >
            View case study <ArrowUpRight className="h-4 w-4" />
          </PageLink>
        )}
      </motion.article>
    </motion.div>
  );
}

interface TestimonialDeckProps {
  eyebrow?: string;
  heading?: string;
  /** Shows the industry filter above the cards. */
  filter?: boolean;
  /** Opens a client's case study from their card. */
  onOpenCaseStudy?: (id: string) => void;
}

type Industry = Testimonial['industry'] | 'All';

/**
 * Client reviews as a pile of cards. The top card can be dragged or flicked away
 * in any direction: let go far or fast enough and it flies off and goes to the
 * bottom of the pile, otherwise it springs back. The next card springs up to take
 * its place and its words rise into view a line at a time. A counter beside the
 * arrows shows which card is on top. Beside the heading, the Google rating links
 * to the full list of reviews.
 *
 * Works by touch, by mouse (with a "Drag" badge that follows the pointer), with the
 * arrow keys, and with the previous and next buttons. Never moves on its own.
 * With `filter`, the pile can be narrowed to one industry.
 * With reduced motion the cards simply change, with a fade.
 */
export default function TestimonialDeck({ eyebrow = 'In their words', heading = 'What our clients say.', filter = false, onOpenCaseStudy }: TestimonialDeckProps) {
  const reduced = Boolean(useReducedMotion());
  // The ids in pile order, top card first.
  const [pile, setPile] = useState<string[]>(() => CARDS.map((card) => card.id));
  const [industry, setIndustry] = useState<Industry>('All');
  // The cards in play: all of them, or one industry's.
  const cards = industry === 'All' ? CARDS : CARDS.filter((card) => card.industry === industry);
  const chooseIndustry = (choice: Industry) => {
    setIndustry(choice);
    setReturning(false);
    setPile((choice === 'All' ? CARDS : CARDS.filter((card) => card.industry === choice)).map((card) => card.id));
  };
  const [returning, setReturning] = useState(false);
  const [armed, setArmed] = useState(false);
  const throwers = useRef<Record<string, ((dx: number, dy: number) => void) | null>>({});

  // The line-by-line reveal is only switched on once the script is running.
  useEffect(() => setArmed(!reduced), [reduced]);

  const register = useCallback((id: string, fn: ((dx: number, dy: number) => void) | null) => {
    throwers.current[id] = fn;
  }, []);

  const toBack = useCallback(() => {
    setReturning(false);
    setPile((current) => [...current.slice(1), current[0]]);
  }, []);

  const next = () => {
    const fling = throwers.current[pile[0]];
    if (fling && !reduced) fling(1, -0.25);
    else toBack();
  };
  const previous = () => {
    setReturning(true);
    setPile((current) => [current[current.length - 1], ...current.slice(0, -1)]);
  };

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      previous();
    }
  };

  // The "Drag" badge: follows the pointer over the deck, on devices with a mouse.
  const deckRef = useRef<HTMLDivElement>(null);
  const badgeX = useSpring(useMotionValue(0), { stiffness: 380, damping: 30, mass: 0.6 });
  const badgeY = useSpring(useMotionValue(0), { stiffness: 380, damping: 30, mass: 0.6 });
  const [hovering, setHovering] = useState(false);
  const [dragging, setDragging] = useState(false);
  const onPointerMove = (event: ReactPointerEvent) => {
    if (event.pointerType !== 'mouse' || !deckRef.current) return;
    const rect = deckRef.current.getBoundingClientRect();
    badgeX.set(event.clientX - rect.left);
    badgeY.set(event.clientY - rect.top);
    if (!hovering) setHovering(true);
  };

  const top = cards.find((card) => card.id === pile[0]) ?? cards[0];
  const single = cards.length < 2;
  const position = Math.max(0, cards.indexOf(top)) + 1;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="client-quotes" className="deck-section py-24 sm:py-28 bg-neutral-100 font-sans overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 lg:gap-y-8">
          <div className="lg:col-span-5 lg:row-start-1 lg:self-end">
            <div className="space-y-4">
              <span className="eyebrow">{eyebrow}</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">{heading}</h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-md">Real reviews from real clients.</p>
            </div>

            <a
              href={GOOGLE_PROFILE}
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
          </div>

          {/* Under the cards on a phone, where a thumb can reach them */}
          <div className="order-3 lg:order-none lg:col-span-5 lg:col-start-1 lg:row-start-2 lg:self-start">
            <div className="flex items-center justify-center lg:justify-start">
              <div className="flex items-center gap-3">
                <button type="button" onClick={previous} aria-label="Previous review" className="deck-button" disabled={single}>
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={next} aria-label="Next review" className="deck-button" disabled={single}>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <span className="deck-count" aria-hidden="true">
                  <span className="text-neutral-900">{pad(position)}</span> / {pad(cards.length)}
                </span>
              </div>
            </div>
          </div>

          <div className="order-2 lg:order-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:row-span-2 lg:self-center">
            {filter && (
              <div className="deck-filter" role="group" aria-label="Show reviews from one industry">
                {(['All', ...TESTIMONIAL_INDUSTRIES] as Industry[]).map((choice) => (
                  <button
                    key={choice}
                    type="button"
                    onClick={() => chooseIndustry(choice)}
                    aria-pressed={industry === choice}
                    className={`deck-chip ${industry === choice ? 'is-on' : ''}`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            )}

            <div
              ref={deckRef}
              className={`deck ${armed ? 'is-armed' : ''} ${dragging ? 'is-dragging' : ''}`}
              role="group"
              aria-roledescription="carousel"
              aria-label="Client reviews. Use the left and right arrow keys to move between them."
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerMove={onPointerMove}
              onPointerLeave={() => setHovering(false)}
            >
              {cards.map((item) => (
                <DeckCard
                  key={item.id}
                  item={item}
                  // The card's place in the full set, so its face and lean never change.
                  index={CARDS.indexOf(item)}
                  depth={Math.max(0, pile.indexOf(item.id))}
                  total={CARDS.length}
                  reduced={reduced}
                  returning={returning}
                  onThrown={toBack}
                  register={register}
                  setDragging={setDragging}
                  onOpenCaseStudy={onOpenCaseStudy}
                />
              ))}

              {!reduced && (
                <motion.span
                  className="deck-badge"
                  style={{ x: badgeX, y: badgeY }}
                  initial={false}
                  animate={{ scale: hovering ? (dragging ? 0.7 : 1) : 0, opacity: hovering ? 1 : 0 }}
                  transition={SPRING}
                  aria-hidden="true"
                >
                  Drag
                </motion.span>
              )}
            </div>

            {/* Read out to screen readers when the card changes */}
            <p className="sr-only" aria-live="polite">
              Review {position} of {cards.length}. {top.name}, {top.company}: {top.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
