import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, PhoneCall, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LANGUAGES } from '../utils/translations';

interface NavbarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

interface NavItem {
  label: string;
  id: PageId;
  tag?: string;
  subItems?: { label: string; id: PageId; tag?: string }[];
}

export default function Navbar({
  currentPage,
  onPageChange,
  isDarkMode,
  onToggleDarkMode,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: t('nav.home'), id: 'home' as PageId },
    {
      label: t('nav.services'),
      id: 'services' as PageId,
      subItems: [
        { label: t('nav.services.web'), id: 'service-web-design' as PageId },
        { label: t('nav.services.seo'), id: 'service-seo' as PageId },
        { label: t('nav.services.gbp'), id: 'service-gbp' as PageId },
        { label: t('nav.services.copywriting'), id: 'service-copywriting' as PageId },
      ],
    },
    { label: t('nav.portfolio'), id: 'portfolio' as PageId },
    {
      label: t('nav.about'),
      id: 'about-dropdown' as PageId,
      subItems: [
        { label: t('nav.about'), id: 'about' as PageId },
        { label: t('nav.whyChooseUs'), id: 'why-choose-us' as PageId },
        { label: t('nav.testimonials'), id: 'testimonials' as PageId },
        { label: t('nav.insights'), id: 'insights' as PageId, tag: t('common.soon') },
      ],
    },
    { label: t('nav.contact'), id: 'contact' as PageId },
  ];

  const handleNavClick = (pageId: PageId) => {
    onPageChange(pageId);
    setIsOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isServiceActive = currentPage.startsWith('service-');

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 dark:bg-[#1A1A1A]/85 border-b border-neutral-200/50 dark:border-neutral-800/50 backdrop-blur-md py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            id="navbar-logo-btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left focus:outline-none transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            {!logoError ? (
              <img
                src="/logo.png"
                alt="Mago Labs Logo"
                width={300}
                height={200}
                className="h-14 md:h-16 w-auto object-contain dark:invert select-none"
                onError={() => setLogoError(true)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex items-center bg-neutral-950 dark:bg-black px-4 py-2 rounded-xl border border-neutral-800/80 shadow-md">
                <span className="font-sans font-extrabold text-white tracking-tight text-lg md:text-xl">
                  Mago
                </span>
                <span className="font-sans font-light text-neutral-200/90 tracking-tight text-lg md:text-xl">
                  labs
                </span>
              </div>
            )}
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              if (item.subItems) {
                const isServices = item.id === 'services';
                const isAbout = item.id === 'about-dropdown';
                const isActive = isServices 
                  ? (currentPage === 'services' || isServiceActive)
                  : (currentPage === 'about' || currentPage === 'why-choose-us' || currentPage === 'testimonials' || currentPage === 'insights');
                const isOpen = openDropdown === item.id;

                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      id={`nav-item-${item.id}`}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                        isActive
                          ? 'text-neutral-900 bg-neutral-100/80 font-semibold dark:bg-neutral-800/80 dark:text-white'
                          : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800/60'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`nav-dropdown-${item.id}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 mt-1 w-64 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#1A1A1A] p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-lg"
                        >
                          {isServices && (
                            <>
                              <button
                                onClick={() => handleNavClick('services')}
                                className={`flex w-full items-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 transition-colors rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/60 hover:text-neutral-800 dark:hover:text-neutral-200 text-left`}
                              >
                                {t('nav.services.all')}
                              </button>
                              <hr className="my-1 border-neutral-100 dark:border-neutral-800" />
                            </>
                          )}
                          {item.subItems.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handleNavClick(sub.id)}
                              className={`flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors rounded-lg text-left ${
                                currentPage === sub.id
                                  ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/60 hover:text-neutral-950 dark:hover:text-white'
                              }`}
                            >
                              <span>{sub.label}</span>
                              {sub.tag && (
                                <span className="inline-flex items-center rounded-md bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600 dark:text-neutral-400 ring-1 ring-inset ring-neutral-500/10 dark:ring-neutral-400/10">
                                  {sub.tag}
                                </span>
                              )}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors rounded-full text-left ${
                    isActive
                      ? 'text-neutral-900 bg-neutral-100/80 font-semibold dark:bg-neutral-800/80 dark:text-white'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800/60'
                  }`}
                >
                  {item.label}
                  {item.tag && (
                    <span className="inline-flex items-center rounded-md bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600 dark:text-neutral-400 ring-1 ring-inset ring-neutral-500/10 dark:ring-neutral-400/10">
                      {item.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Consultation Button */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switcher */}
            <div
              className="relative"
              onMouseEnter={() => setLangDropdownOpen(true)}
              onMouseLeave={() => setLangDropdownOpen(false)}
            >
              <button
                id="lang-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all rounded-full border border-neutral-200/50 dark:border-neutral-800 cursor-pointer"
                title="Select Language"
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase font-semibold tracking-wider">{language}</span>
                <ChevronDown className={`h-3 w-3 opacity-60 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    id="lang-dropdown-menu"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-36 rounded-xl border border-neutral-200 dark:border-neutral-800/50 bg-white dark:bg-[#1A1A1A] p-1.5 shadow-xl ring-1 ring-black/5 backdrop-blur-lg"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2 text-xs font-medium transition-colors rounded-lg text-left cursor-pointer ${
                          language === lang.code
                            ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold'
                            : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-950 dark:hover:text-white'
                        }`}
                      >
                        <span>{lang.nativeName}</span>
                        <span className="text-[10px] uppercase opacity-50 font-mono">({lang.code})</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isDarkMode !== undefined && onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2.5 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800 transition-all cursor-pointer flex items-center justify-center border border-neutral-200/50 dark:border-neutral-800"
                aria-label="Toggle night-owl mode"
                title="Toggle night-owl mode"
              >
                {isDarkMode ? <Sun className="h-4 w-4 text-amber-500 fill-amber-500/20" /> : <Moon className="h-4 w-4 text-neutral-600" />}
              </button>
            )}
            <motion.button
              id="navbar-cta-btn"
              whileHover={{ y: -1, scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              whileTap={{ scale: 0.98, y: 0 }}
              animate={{
                boxShadow: [
                  "0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 0 0 0 rgba(37, 99, 235, 0.5)",
                  "0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 0 0 8px rgba(37, 99, 235, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeOut",
              }}
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white cursor-pointer transition-all"
            >
              <PhoneCall className="h-4 w-4" />
              {t('nav.cta')}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {isDarkMode !== undefined && onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                className="p-2.5 rounded-full text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center"
                aria-label="Toggle night-owl mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5 text-amber-500 fill-amber-500/20" /> : <Moon className="h-5 w-5 text-neutral-600" />}
              </button>
            )}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-b border-neutral-200 bg-white/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="space-y-1 px-4 pt-2 pb-6">
              {navItems.map((item) => {
                if (item.subItems) {
                  return (
                    <div key={item.id} className="space-y-1 py-1">
                      <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        {item.label}
                      </div>
                      {/* Services Link */}
                      <button
                        onClick={() => handleNavClick('services')}
                        className={`block w-full px-6 py-2 text-sm font-medium transition-colors rounded-lg text-left ${
                          currentPage === 'services'
                            ? 'bg-neutral-100 text-neutral-900 font-semibold'
                            : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800'
                        }`}
                      >
                        {t('nav.services.all')}
                      </button>
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleNavClick(sub.id)}
                          className={`block w-full px-6 py-2 text-sm font-medium transition-colors rounded-lg text-left ${
                            currentPage === sub.id
                              ? 'bg-blue-50 text-blue-600 font-semibold'
                              : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-800'
                          }`}
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex w-full items-center justify-between px-3 py-2.5 text-base font-medium transition-colors rounded-lg text-left ${
                      currentPage === item.id
                        ? 'bg-neutral-100 text-neutral-900 font-semibold'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {item.label}
                      {item.tag && (
                        <span className="inline-flex items-center rounded-md bg-neutral-100 px-1.5 py-0.5 text-[10px] font-medium text-neutral-600 ring-1 ring-inset ring-neutral-500/10">
                          {item.tag}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex flex-col gap-3">
                {/* Mobile Language Selection Row */}
                <div className="px-3 py-1 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/50 pb-3">
                  <span className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
                    <Globe className="h-4 w-4" /> Language
                  </span>
                  <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-800/40 p-1 rounded-lg">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                          language === lang.code
                            ? 'bg-white dark:bg-neutral-700 text-blue-600 dark:text-blue-400 shadow-sm'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                        }`}
                      >
                        {lang.nativeName}
                      </button>
                    ))}
                  </div>
                </div>

                {isDarkMode !== undefined && onToggleDarkMode && (
                  <button
                    onClick={onToggleDarkMode}
                    className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800/60 px-4 py-3 text-base font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="h-5 w-5 text-amber-500 fill-amber-500/20" />
                        {t('nav.theme.light')}
                      </>
                    ) : (
                      <>
                        <Moon className="h-5 w-5 text-neutral-500" />
                        {t('nav.theme.dark')}
                      </>
                    )}
                  </button>
                )}
                <motion.button
                  id="mobile-drawer-cta-btn"
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  animate={{
                    boxShadow: [
                      "0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 0 0 0 rgba(37, 99, 235, 0.5)",
                      "0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 0 0 6px rgba(37, 99, 235, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeOut",
                  }}
                  onClick={() => handleNavClick('contact')}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-base font-semibold text-white cursor-pointer transition-all"
                >
                  <PhoneCall className="h-5 w-5" />
                  {t('nav.cta')}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
