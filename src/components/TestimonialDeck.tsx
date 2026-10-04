import { Fragment, useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type PanInfo } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS, TESTIMONIAL_INDUSTRIES, type Testimonial } from '../data/testimonials';

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
};

// The cards with a number to show lead; a short review opens the deck.
const ORDER = ['mihir-shah', 'darshan-galani', 'denish-dalal', 'manish-khandelwal', 'jay-mehta', 'harshit-chopra', 'smit-antala', 'manav-shah', 'ketan-mayani'];
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
}

function DeckCard({ item, index, depth, total, reduced, returning, onThrown, register, setDragging }: DeckCardProps) {
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
        <svg className="deck-mark" viewBox="0 0 48 36" aria-hidden="true">
          <path d="M0 36V21.6C0 9.4 6.6 2 19.2 0l2 5.4C14.6 7 11.4 10.6 11 16h9.2v20H0Zm26.8 0V21.6C26.8 9.4 33.4 2 46 0l2 5.4c-6.6 1.6-9.8 5.2-10.2 10.6H47v20H26.8Z" />
        </svg>

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

        <p className="deck-result">{RESULT[item.id]}</p>

        <footer className="deck-by">
          <span className="deck-initials">{item.initials}</span>
          <span className="min-w-0">
            <span className="block truncate text-sm sm:text-base font-semibold">{item.name}</span>
            <span className="deck-business block truncate text-xs sm:text-sm">{item.company}</span>
          </span>
        </footer>
      </motion.article>
    </motion.div>
  );
}

interface TestimonialDeckProps {
  eyebrow?: string;
  heading?: string;
  /** Shows the industry filter above the cards. */
  filter?: boolean;
}

type Industry = Testimonial['industry'] | 'All';

/**
 * Client reviews as a pile of cards. The top card can be dragged or flicked away
 * in any direction: let go far or fast enough and it flies off and goes to the
 * bottom of the pile, otherwise it springs back. The next card springs up to take
 * its place and its words rise into view a line at a time. The pile never says
 * how many cards it holds.
 *
 * Works by touch, by mouse (with a "Drag" badge that follows the pointer), with the
 * arrow keys, and with the previous and next buttons. Never moves on its own.
 * With `filter`, the pile can be narrowed to one industry.
 * With reduced motion the cards simply change, with a fade.
 */
export default function TestimonialDeck({ eyebrow = 'In their words', heading = 'What our clients say.', filter = false }: TestimonialDeckProps) {
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

  return (
    <section id="client-quotes" className="deck-section py-24 sm:py-28 bg-neutral-100 font-sans overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 lg:gap-y-8">
          <div className="lg:col-span-5 lg:row-start-1 lg:self-end">
            <div className="space-y-4">
              <span className="eyebrow">{eyebrow}</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">{heading}</h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-md">
                Don&rsquo;t take our word for it. Take theirs. Drag a card away to read the next.
              </p>
            </div>
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
              {top.name}, {top.company}: {top.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
