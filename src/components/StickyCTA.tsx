import { useState, useEffect } from 'react';
import { Phone, Sparkles, X, MessageSquare } from 'lucide-react';
import { WhatsAppLogo } from './BrandIcons';
import { motion, AnimatePresence } from 'motion/react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useLanguage } from '../context/LanguageContext';

interface StickyCTAProps {
}

const LOCALIZED_TEXTS = {
  en: {
    callTitle: 'Call Burhan Kapasi',
    whatsappTitle: 'Chat on WhatsApp',
    menuOpen: 'Quick Contact Options',
    menuClose: 'Close Menu'
  },
  hi: {
    callTitle: 'बुर्हान कपासी को कॉल करें',
    whatsappTitle: 'व्हाट्सएप पर चैट करें',
    menuOpen: 'त्वरित संपर्क विकल्प',
    menuClose: 'मेनू बंद करें'
  },
  gu: {
    callTitle: 'બુરહાન કપાસીને કોલ કરો',
    whatsappTitle: 'વોટ્સએપ પર ચેટ કરો',
    menuOpen: 'ઝડપી સંપર્ક વિકલ્પો',
    menuClose: 'મેનુ બંધ કરો'
  }
};

export default function StickyCTA({}: StickyCTAProps) {
  const { language } = useLanguage();
  const t = LOCALIZED_TEXTS[language] || LOCALIZED_TEXTS.en;
  
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const [isExpanded, setIsExpanded] = useState(true);

  const whatsappUrl = 'https://wa.me/919099245605?text=Hi%20Mago%20Labs%2C%20I%20would%20like%20to%20discuss%20my%20website.';
  const callUrl = 'tel:+919099245605';

  // Sync expanded state with screen size changes
  useEffect(() => {
    if (isDesktop) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false); // Collapsed on mobile for space discipline
    }
  }, [isDesktop]);

  const toggleMenu = () => {
    if (!isDesktop) {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <div
      id="sticky-cta-container"
      className={`fixed z-50 flex flex-col items-center transition-all duration-300 ${
        isDesktop 
          ? 'bottom-6 right-6 gap-3' 
          : 'bottom-4 right-4 gap-2'
      }`}
    >
      {/* Expanded Button Stack with Animation */}
      <AnimatePresence>
        {isExpanded && (
          <div className={`flex flex-col items-center ${isDesktop ? 'gap-3' : 'gap-2'}`}>
            {/* WhatsApp Button */}
            <motion.a
              id="sticky-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={isDesktop ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.8, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 15 }}
              transition={{ duration: 0.2, delay: isDesktop ? 0.4 : 0.05 }}
              className={`flex items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 border border-emerald-500 cursor-pointer relative group ${
                isDesktop ? 'h-12 w-12' : 'h-9.5 w-9.5'
              }`}
              title={t.whatsappTitle}
            >
              <WhatsAppLogo className={isDesktop ? 'h-5 w-5' : 'h-4.5 w-4.5'} />
              
              {/* Desktop Hover Tooltip */}
              {isDesktop && (
                <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-150 origin-right bg-neutral-950 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-xl border border-neutral-800/85 whitespace-nowrap mr-1">
                  {t.whatsappTitle}
                </span>
              )}
            </motion.a>

            {/* Call Button */}
            <motion.a
              id="sticky-call-btn"
              href={callUrl}
              whileHover={{ scale: 1.1, translateY: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={isDesktop ? { opacity: 0, y: 20 } : { opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2, delay: isDesktop ? 0.2 : 0.1 }}
              className={`flex items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border border-blue-500 cursor-pointer relative group ${
                isDesktop ? 'h-12 w-12' : 'h-9.5 w-9.5'
              }`}
              title={t.callTitle}
            >
              <Phone className={isDesktop ? 'h-5 w-5' : 'h-4.5 w-4.5'} />
              
              {/* Desktop Hover Tooltip */}
              {isDesktop && (
                <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-150 origin-right bg-neutral-950 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg shadow-xl border border-neutral-800/85 whitespace-nowrap mr-1">
                  {t.callTitle}
                </span>
              )}
            </motion.a>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Dynamic Trigger Menu Button */}
      {!isDesktop && (
        <motion.button
          id="sticky-toggle-btn"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 dark:bg-neutral-800 text-white shadow-xl border border-neutral-800 dark:border-neutral-700 cursor-pointer relative"
          aria-label={isExpanded ? t.menuClose : t.menuOpen}
          title={isExpanded ? t.menuClose : t.menuOpen}
        >
          {/* Green active ping on trigger when menu is collapsed */}
          {!isExpanded && (
            <span className="absolute top-0 right-0 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          )}

          {/* Smooth Rotation Transition between Icons */}
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="flex items-center justify-center"
          >
            {isExpanded ? (
              <X className="h-5 w-5 text-neutral-400" />
            ) : (
              <MessageSquare className="h-4.5 w-4.5 text-blue-400 animate-pulse" />
            )}
          </motion.div>
        </motion.button>
      )}
    </div>
  );
}
