import { useRef, type RefObject } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import PageLink from '../PageLink';

/* The sentence, in pieces. 'photo' marks where Burhan's face sits inside the line. */
const LINE: (string | 'photo')[] = [
  "Hi, I'm Burhan.",
  'I',
  'photo',
  'spent 8 years in banking and fintech, sitting across the table from business owners. Most of them were brilliant at what they did, and invisible online. So I left to build the websites they deserve, one honest project at a time.',
];

const WORDS = LINE.flatMap((part) => (part === 'photo' ? ['photo'] : part.split(' ')));
const MUTED_UNTIL = 3; // "Hi, I'm Burhan." stays in the muted serif voice

function Word({ word, i, progress, reduce }: { word: string; i: number; progress: MotionValue<number>; reduce: boolean | null }) {
  const start = i / WORDS.length;
  const opacity = useTransform(progress, [start, start + 1 / WORDS.length], [0.14, 1]);
  if (word === 'photo') {
    return (
      <motion.span style={{ opacity: reduce ? 1 : opacity }} className="is-photo mx-[0.12em] inline-block align-middle">
        <img
          src="/founder/portrait.webp"
          alt="Burhan Kapasi, founder of Mago Labs"
          width={160}
          height={96}
          loading="lazy"
          className="inline-block h-[0.95em] w-[1.6em] -translate-y-[0.06em] rounded-full object-cover object-[50%_25%] ring-2 ring-brand"
        />
      </motion.span>
    );
  }
  const muted = i < MUTED_UNTIL;
  return (
    <motion.span style={{ opacity: reduce ? 1 : opacity }} className={muted ? 'font-serif-accent text-ink/55' : undefined}>
      {word}
    </motion.span>
  );
}

export default function IntroSheet({ onReadStory, progressRef }: { onReadStory: () => void; progressRef: RefObject<HTMLElement | null> }) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: textRef, offset: ['start 0.85', 'end 0.45'] });

  return (
    <section
      ref={progressRef as RefObject<HTMLElement>}
      aria-label="About Mago Labs"
      className="relative z-10 -mt-8 rounded-t-[28px] bg-sheet shadow-[0_-30px_60px_-40px_rgba(20,18,14,0.35)] md:-mt-10 md:rounded-t-[40px]"
    >
      <div className="mx-auto max-w-[1100px] px-5 pb-28 pt-24 md:px-8 md:pb-40 md:pt-36">
        <p ref={textRef} className="hf-sheet-text text-ink">
          {WORDS.map((w, i) => (
            <span key={i}>
              <Word word={w} i={i} progress={scrollYProgress} reduce={reduce} />
              {i < WORDS.length - 1 ? ' ' : ''}
            </span>
          ))}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-16">
          <PageLink page="about" onNavigate={onReadStory} className="group inline-flex items-center gap-3 text-[15px] font-medium text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-ink transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="h-4 w-4" />
            </span>
            Read how Mago Labs started
          </PageLink>
          <span className="text-[14px] text-ink/50">Surat, India. Working with clients in 6 countries.</span>
        </div>
      </div>
    </section>
  );
}
