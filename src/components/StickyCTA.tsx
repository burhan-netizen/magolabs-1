import { useEffect, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { WhatsAppLogo } from './BrandIcons';
import { WHATSAPP_URL } from '../utils/contactLinks';

/**
 * The floating buttons, bottom right.
 *
 * WhatsApp stays out of the way on the first screen, appears once the visitor
 * scrolls, and hides again over the footer and the closing call to action, where
 * the same options are already on screen.
 *
 * A small back-to-top arrow appears after about two screens. It sits above the
 * WhatsApp button and slides down into its place when WhatsApp hides, so it is
 * still there at the bottom of the page, where it is most useful.
 */
export default function StickyCTA() {
  const [showChat, setShowChat] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    let queued = false;
    const update = () => {
      queued = false;
      const y = window.scrollY;
      const h = window.innerHeight;
      const end = document.querySelector('#reusable-contact-cta, footer');
      const nearEnd = end ? end.getBoundingClientRect().top < h - 80 : false;
      setShowChat(y > h * 0.6 && !nearEnd);
      setShowTop(y > h * 2);
    };
    const onScroll = () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  const spring = { type: 'spring' as const, stiffness: 400, damping: 30 };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <LayoutGroup>
        <AnimatePresence initial={false}>
          {showTop && (
            <motion.button
              key="top"
              layout={!reduced}
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              title="Back to top"
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              transition={spring}
              className="pointer-events-auto mr-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)] ring-1 ring-black/10 backdrop-blur-md transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 dark:bg-neutral-800/90 dark:text-white dark:ring-white/15 dark:hover:bg-neutral-700 sm:mr-1.5 sm:h-11 sm:w-11"
            >
              <ArrowUp className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2.25} aria-hidden="true" />
            </motion.button>
          )}
          {showChat && (
            <motion.a
              key="chat"
              layout={!reduced}
              id="sticky-whatsapp-btn"
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Burhan on WhatsApp (opens in a new tab)"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.9 }}
              transition={spring}
              className="group pointer-events-auto flex h-12 min-w-12 items-center justify-center rounded-full bg-[#1FA855] px-3.5 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-[padding,background-color] hover:bg-[#1a9a4d] sm:h-14 sm:min-w-14 sm:px-4 sm:hover:pr-5"
            >
              <WhatsAppLogo className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
              <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width,margin] duration-300 group-hover:ml-2 group-hover:max-w-[10rem] sm:inline-block">
                Chat with Burhan
              </span>
            </motion.a>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
