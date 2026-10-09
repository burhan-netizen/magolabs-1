import { StrictMode, useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence, MotionConfig, useScroll, useSpring } from 'motion/react';
import { initAmbientEffects, refreshAmbientEffects } from './utils/ambient';
import { PageId } from './types';
import { lazyPage, LazyPage } from './utils/lazyPage';
import { updateDocumentSEO } from './utils/seo';
import { getPageFromPath, getPathFromPage, getInsightSlugFromPath, getInsightDetailPath, getWorkSlugFromPath, getWorkDetailPath } from './utils/pageRoutes';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyCTA from './components/StickyCTA';
import ScrollToTop from './components/ScrollToTop';
import ContactCTA from './components/ContactCTA';
import Home from './pages/Home';

// Everything except Home is code-split: most visitors land on Home first, so it
// stays in the main bundle, while every other route only downloads its JS when
// someone actually navigates there. This is the main fix for the site's own
// bundle size, since a web design agency shipping a slow site of its own is a
// direct contradiction of what it's selling.
const About = lazyPage(() => import('./pages/About'));
const Services = lazyPage(() => import('./pages/Services'));
const ServiceDetail = lazyPage(() => import('./pages/ServiceDetail'));
const Work = lazyPage(() => import('./pages/Work'));
const WorkDetail = lazyPage(() => import('./pages/WorkDetail'));
const Pricing = lazyPage(() => import('./pages/Pricing'));
const IndustryDetail = lazyPage(() => import('./pages/IndustryDetail'));
const Insights = lazyPage(() => import('./pages/Insights'));
const InsightDetail = lazyPage(() => import('./pages/InsightDetail'));
const Contact = lazyPage(() => import('./pages/Contact'));
const Sitemap = lazyPage(() => import('./pages/Sitemap'));
const Privacy = lazyPage(() => import('./pages/Privacy'));
const Terms = lazyPage(() => import('./pages/Terms'));
const NotFound = lazyPage(() => import('./pages/NotFound'));
const ThemeLab = lazy(() => import('./components/ThemeLab'));

/** Which code-split page component renders a given page. */
function pageComponentFor(page: PageId): LazyPage | null {
  switch (page) {
    case 'about': return About;
    case 'services': return Services;
    case 'service-web-design':
    case 'service-seo':
    case 'service-gbp':
    case 'service-copywriting': return ServiceDetail;
    case 'work': return Work;
    case 'work-detail': return WorkDetail;
    case 'pricing': return Pricing;
    case 'industry-dentists':
    case 'industry-ca-firms':
    case 'industry-manufacturers':
    case 'industry-textile':
    case 'industry-consultants':
    case 'industry-digital-products': return IndustryDetail;
    case 'insights': return Insights;
    case 'insights-detail': return InsightDetail;
    case 'contact': return Contact;
    case 'sitemap': return Sitemap;
    case 'privacy': return Privacy;
    case 'terms': return Terms;
    case 'not-found': return NotFound;
    default: return null; // Home ships in the main bundle
  }
}

/** Downloads the code for the page at a URL path. Used before the app attaches to
 *  the prerendered HTML, so the page is interactive in one step. */
export function preloadPageForPath(pathname: string): Promise<void> {
  const component = pageComponentFor(getPageFromPath(pathname));
  return component ? component.preload() : Promise.resolve();
}

/** Quietly fetches the code for the main pages once the first page is idle, so
 *  moving between pages is instant instead of waiting on a download. */
function preloadMainPages() {
  [Services, ServiceDetail, Work, WorkDetail, Pricing, About, Contact].forEach((page) => {
    void page.preload();
  });
}

interface AppProps {
  /** Path to render when there is no browser (build-time prerender). In the
   *  browser the real address bar is always used instead. */
  initialPath?: string;
}

function resolvePathname(initialPath?: string): string {
  return typeof window !== 'undefined' ? window.location.pathname : initialPath ?? '/';
}

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark);
  try {
    localStorage.setItem('mago-labs-theme', dark ? 'dark' : 'light');
  } catch {
    /* storage unavailable */
  }
}

function AppContent({ initialPath }: AppProps) {
  const [currentPage, setCurrentPage] = useState<PageId>(() => getPageFromPath(resolvePathname(initialPath)));
  const [currentSlug, setCurrentSlug] = useState<string | null>(() => {
    const pathname = resolvePathname(initialPath);
    return getInsightSlugFromPath(pathname) ?? getWorkSlugFromPath(pathname);
  });
  const [isDemoMode] = useState<boolean>(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === 'true'
  );
  // Starts light on both server and client so hydration matches. The saved choice
  // is applied to <html> before first paint by the inline script in index.html,
  // and mirrored into state here once the app is live.
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    let savedDark = false;
    try {
      savedDark = localStorage.getItem('mago-labs-theme') === 'dark';
    } catch {
      /* storage unavailable */
    }
    if (savedDark) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    applyTheme(next);
  };

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
    if (w.requestIdleCallback) {
      w.requestIdleCallback(preloadMainPages, { timeout: 4000 });
    } else {
      const timer = setTimeout(preloadMainPages, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Cursor spotlight tracking. Only the internal design demo (?demo=true) uses it,
  // so ordinary visitors do not pay for a listener on every mouse move.
  useEffect(() => {
    if (!isDemoMode) return;
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDemoMode]);

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

  // Site-wide motion touches (button ripple, pointer light, heading reveals).
  useEffect(() => {
    initAmbientEffects();
  }, []);
  useEffect(() => {
    // Watch the new page's headings once it has rendered (and again after the
    // page fade, for code-split pages that arrive a moment later).
    refreshAmbientEffects();
    const timers = [120, 500, 1200].map((ms) => window.setTimeout(refreshAmbientEffects, ms));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [currentPage, currentSlug]);

  // Reading progress bar along the top of the page.
  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    updateDocumentSEO(currentPage);
  }, [currentPage]);

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
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onPageChange={handlePageChange} onOpenCaseStudy={handleOpenWork} />;
      case 'about':
        return <About onPageChange={handlePageChange} />;
      case 'services':
        return <Services onPageChange={handlePageChange} />;
      case 'service-web-design':
      case 'service-seo':
      case 'service-gbp':
      case 'service-copywriting':
        return <ServiceDetail serviceId={currentPage} onPageChange={handlePageChange} onOpenCaseStudy={handleOpenWork} />;
      case 'work':
        return <Work onPageChange={handlePageChange} onOpenCaseStudy={handleOpenWork} />;
      case 'work-detail':
        return <WorkDetail id={currentSlug} onPageChange={handlePageChange} onOpenCaseStudy={handleOpenWork} />;
      case 'pricing':
        return <Pricing onPageChange={handlePageChange} />;
      case 'industry-dentists':
      case 'industry-ca-firms':
      case 'industry-manufacturers':
      case 'industry-textile':
      case 'industry-consultants':
      case 'industry-digital-products':
        return <IndustryDetail industryId={currentPage} onPageChange={handlePageChange} onOpenCaseStudy={handleOpenWork} />;
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#1A1A1A] text-neutral-900 dark:text-[#F8F9FA] selection:bg-brand selection:text-ink transition-colors duration-300">
      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} aria-hidden="true" />

      {/* Dynamic Header */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Page Area with Route Entrance Animations */}
      <main className="flex-grow">
        {/* initial={false}: the first page is already on screen from the prerendered
            HTML, so it must not fade in again. Later page changes get a short fade. */}
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
          <motion.div
            key={`${currentPage}:${currentSlug ?? ''}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
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
    </div>
  );
}

export default function App({ initialPath }: AppProps = {}) {
  return (
    <StrictMode>
      {/* reducedMotion="user": visitors who ask their device for less motion get
          instant changes in place of every slide and fade on the site. */}
      <MotionConfig reducedMotion="user">
        <LanguageProvider>
          <AppContent initialPath={initialPath} />
        </LanguageProvider>
      </MotionConfig>
    </StrictMode>
  );
}
