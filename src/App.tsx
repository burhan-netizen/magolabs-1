import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from './types';
import { updateDocumentSEO } from './utils/seo';
import { getPageFromPath, getPathFromPage, getInsightSlugFromPath, getInsightDetailPath, getWorkSlugFromPath, getWorkDetailPath } from './utils/pageRoutes';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import ScrollToTop from './components/ScrollToTop';
import ContactCTA from './components/ContactCTA';
import PageLoader from './components/PageLoader';
import Home from './pages/Home';

// Everything except Home is code-split: most visitors land on Home first, so it
// stays in the main bundle, while every other route only downloads its JS when
// someone actually navigates there. This is the main fix for the site's own
// bundle size, since a web design agency shipping a slow site of its own is a
// direct contradiction of what it's selling.
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Work = lazy(() => import('./pages/Work'));
const WorkDetail = lazy(() => import('./pages/WorkDetail'));
const Insights = lazy(() => import('./pages/Insights'));
const InsightDetail = lazy(() => import('./pages/InsightDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Sitemap = lazy(() => import('./pages/Sitemap'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ThemeLab = lazy(() => import('./components/ThemeLab'));

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? getPageFromPath(window.location.pathname) : 'home'
  );
  const [renderPage, setRenderPage] = useState<PageId>(() =>
    typeof window !== 'undefined' ? getPageFromPath(window.location.pathname) : 'home'
  );
  const [currentSlug, setCurrentSlug] = useState<string | null>(() =>
    typeof window !== 'undefined'
      ? getInsightSlugFromPath(window.location.pathname) ?? getWorkSlugFromPath(window.location.pathname)
      : null
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
      setCurrentSlug(getInsightSlugFromPath(window.location.pathname) ?? getWorkSlugFromPath(window.location.pathname));
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
    setCurrentSlug(null);
    setCurrentPage(page);
  };

  const handleOpenPost = (slug: string) => {
    const path = getInsightDetailPath(slug);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentSlug(slug);
    setCurrentPage('insights-detail');
  };

  const handleOpenWork = (id: string) => {
    const path = getWorkDetailPath(id);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentSlug(id);
    setCurrentPage('work-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        return <ServiceDetail serviceId={renderPage} onPageChange={handlePageChange} onOpenCaseStudy={handleOpenWork} />;
      case 'work':
        return <Work onPageChange={handlePageChange} onOpenCaseStudy={handleOpenWork} />;
      case 'work-detail':
        return <WorkDetail id={currentSlug} onPageChange={handlePageChange} onOpenCaseStudy={handleOpenWork} />;
      case 'insights':
        return <Insights onPageChange={handlePageChange} onOpenPost={handleOpenPost} />;
      case 'insights-detail':
        return <InsightDetail slug={currentSlug} onPageChange={handlePageChange} />;
      case 'contact':
        return <Contact onPageChange={handlePageChange} />;
      case 'sitemap':
        return <Sitemap onPageChange={handlePageChange} />;
      case 'privacy':
        return <Privacy onPageChange={handlePageChange} />;
      case 'terms':
        return <Terms onPageChange={handlePageChange} />;
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
            <Suspense fallback={null}>{renderActivePage()}</Suspense>
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
      {isDemoMode && (
        <Suspense fallback={null}>
          <ThemeLab />
        </Suspense>
      )}

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
