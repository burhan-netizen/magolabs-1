import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { WhatsAppLogo } from './BrandIcons';
import { WHATSAPP_URL } from '../utils/contactLinks';

/**
 * One quiet floating WhatsApp button, bottom right.
 *
 * It stays out of the way on the first screen, appears once the visitor scrolls,
 * and hides again over the footer and the closing call to action, where the same
 * options are already on screen.
 */
export default function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let queued = false;
    const update = () => {
      queued = false;
      const scrolled = window.scrollY > window.innerHeight * 0.6;
      const end = document.querySelector('#reusable-contact-cta, footer');
      const nearEnd = end ? end.getBoundingClientRect().top < window.innerHeight - 80 : false;
      setShow(scrolled && !nearEnd);
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

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          id="sticky-whatsapp-btn"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Burhan on WhatsApp (opens in a new tab)"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="group fixed bottom-4 right-4 z-50 flex h-12 min-w-12 items-center justify-center rounded-full bg-[#1FA855] px-3.5 text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.45)] ring-1 ring-black/5 transition-[padding,background-color] hover:bg-[#1a9a4d] sm:bottom-6 sm:right-6 sm:h-14 sm:min-w-14 sm:px-4 sm:hover:pr-5"
        >
          <WhatsAppLogo className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width,margin] duration-300 group-hover:ml-2 group-hover:max-w-[10rem] sm:inline-block">
            Chat with Burhan
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
