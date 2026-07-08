import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { updateDocumentSEO } from './utils/seo';
import { getPageFromPath, getPathFromPage } from './utils/pageRoutes';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import ScrollToTop from './components/ScrollToTop';
import ContactCTA from './components/ContactCTA';
import PageLoader from './components/PageLoader';
import ThemeLab from './components/ThemeLab';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import WhyChooseUs from './pages/WhyChooseUs';
import ComingSoon from './pages/ComingSoon';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? getPageFromPath(window.location.pathname) : 'home'
  );
  const [renderPage, setRenderPage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? getPageFromPath(window.location.pathname) : 'home'
  );
  const [isRouteLoading, setIsRouteLoading] = useState<boolean>(false);
  const [isDemoMode] = useState<boolean>(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === 'true'
  );
  const { language } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('mago-labs-theme');
    if (saved) {
      return saved === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (currentPage !== renderPage) {
      setIsRouteLoading(true);
      const timer = setTimeout(() => {
        setRenderPage(currentPage);
        window.scrollTo({ top: 0, behavior: 'instant' });
        const timer2 = setTimeout(() => {
          setIsRouteLoading(false);
        }, 350);
        return () => clearTimeout(timer2);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPage, renderPage]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mago-labs-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mago-labs-theme', 'light');
    }
  }, [isDarkMode]);

  // Dynamic high-performance spotlight mouse-coordinate tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // One-time migration: rewrite any old #hash links (e.g. bookmarks, backlinks,
    // or search results indexed before the move to real paths) to the real URL.
    if (window.location.hash) {
      const legacyPage = window.location.hash.replace('#', '') as PageId;
      const realPath = getPathFromPage(legacyPage);
      window.history.replaceState({}, '', realPath);
      setCurrentPage(getPageFromPath(realPath));
    }

    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    updateDocumentSEO(currentPage);
  }, [currentPage, language]);

  const handlePageChange = (page: PageId) => {
    const path = getPathFromPage(page);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPage(page);
  };

  const renderActivePage = () => {
    switch (renderPage) {
      case 'home':
        return <Home onPageChange={handlePageChange} />;
      case 'about':
        return <About onPageChange={handlePageChange} />;
      case 'services':
        return <Services onPageChange={handlePageChange} />;
      case 'service-web-design':
      case 'service-seo':
      case 'service-gbp':
      case 'service-copywriting':
        return <ServiceDetail serviceId={renderPage} onPageChange={handlePageChange} />;
      case 'why-choose-us':
        return <WhyChooseUs onPageChange={handlePageChange} />;
      case 'portfolio':
      case 'testimonials':
      case 'insights':
        return <ComingSoon pageId={renderPage} onPageChange={handlePageChange} />;
      case 'contact':
        return <Contact onPageChange={handlePageChange} />;
      case 'sitemap':
        return <Sitemap onPageChange={handlePageChange} />;
      case 'not-found':
        return <NotFound onPageChange={handlePageChange} />;
      default:
        return <NotFound onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#1A1A1A] text-neutral-900 dark:text-[#F8F9FA] selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* Dynamic Header */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Page Area with Route Entrance Animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={renderPage}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(6px)', y: 12 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(6px)', y: -12 }}
            transition={{ duration: 0.35, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Strategic Call To Action Banner (show on all pages except Contact itself) */}
      {currentPage !== 'contact' && (
        <ContactCTA onPageChange={handlePageChange} />
      )}

      {/* Dynamic Footer */}
      <Footer onPageChange={handlePageChange} />

      {/* Floating CTA and Scroll-to-top Buttons */}
      <StickyCTA />
      <ScrollToTop />
      
      {/* Design Customizer Studio Hub: internal demo tool only, not for real visitors.
          Opt in during a client pitch/demo with ?demo=true, never shown by default. */}
      {isDemoMode && <ThemeLab />}

      {/* Dynamic Cursor Spotlight Overlay */}
      <div id="cursor-spotlight-halo" />

      {/* Central Route Transition Loader */}
      <AnimatePresence>
        {isRouteLoading && <PageLoader />}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
