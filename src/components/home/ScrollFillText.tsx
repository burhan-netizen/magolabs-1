import { useRef, type ElementType } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';

interface ScrollFillTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Opacity of words that have not been read yet. */
  dim?: number;
  /** Words (lower case, without punctuation) drawn in the accent colour. */
  accentWords?: string[];
  accentClass?: string;
}

function Word({ word, range, progress, dim, className }: { word: string; range: [number, number]; progress: MotionValue<number>; dim: number; className?: string }) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <motion.span style={{ opacity }} className={className}>
      {word}
    </motion.span>
  );
}

/**
 * A line of text whose words light up one by one as it scrolls through the screen.
 * Every word is real text in the HTML; only its opacity changes.
 */
export default function ScrollFillText({ text, as: Tag = 'p', className = '', dim = 0.16, accentWords = [], accentClass = '' }: ScrollFillTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.88', 'start 0.32'] });
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => {
        const bare = word.toLowerCase().replace(/[^a-z0-9’']/g, '');
        const cls = accentWords.includes(bare) ? accentClass : undefined;
        return (
          <span key={i}>
            <Word word={word} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress} dim={reduce ? 1 : dim} className={cls} />
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </Tag>
  );
}
