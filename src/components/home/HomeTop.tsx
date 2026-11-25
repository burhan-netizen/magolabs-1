import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import HeroFloat from './HeroFloat';
import IntroSheet from './IntroSheet';

/**
 * The hero stays pinned while the intro sheet rises over it (from desktop up).
 * As the sheet arrives the hero dims and settles back a little.
 */
export default function HomeTop({
  onAudit,
  onOpenCaseStudy,
  onSeeWork,
  onReadStory,
}: {
  onAudit: () => void;
  onOpenCaseStudy: (id: string) => void;
  onSeeWork: () => void;
  onReadStory: () => void;
}) {
  const sheetRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sheetRef, offset: ['start end', 'start start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const shade = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

  return (
    <div className="relative">
      <div className="lg:sticky lg:top-0">
        <motion.div style={reduce ? undefined : { scale }} className="origin-top">
          <HeroFloat onAudit={onAudit} onOpenCaseStudy={onOpenCaseStudy} onSeeWork={onSeeWork} />
        </motion.div>
        {!reduce && <motion.div aria-hidden="true" style={{ opacity: shade }} className="pointer-events-none absolute inset-0 z-30 hidden bg-ink lg:block" />}
      </div>
      <IntroSheet onReadStory={onReadStory} progressRef={sheetRef} />
    </div>
  );
}
