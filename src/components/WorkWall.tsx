import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageLink from './PageLink';
import { CASE_STUDIES, FEATURED_CASE_STUDY_IDS } from '../data/caseStudies';
import { FULL_SCREENSHOTS } from '../data/fullScreenshots';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface WorkWallProps {
  onOpenWork: () => void;
}

// The projects with results to show lead, then the rest in their usual order.
const SITES = [
  ...FEATURED_CASE_STUDY_IDS.map((id) => CASE_STUDIES.find((cs) => cs.id === id)),
  ...CASE_STUDIES.filter((cs) => !FEATURED_CASE_STUDY_IDS.includes(cs.id)),
].filter((cs): cs is (typeof CASE_STUDIES)[number] => Boolean(cs && FULL_SCREENSHOTS[cs.id]));

/** Deals the projects into columns in order: 4, 4, 3 across three, or 6, 5 across two. */
function intoColumns<T>(items: T[], count: number): T[][] {
  const size = Math.ceil(items.length / count);
  return Array.from({ length: count }, (_, c) => items.slice(c * size, (c + 1) * size));
}

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Home page: a tilted wall of the websites we have built.
 *
 * Columns of browser frames drift slowly, each the opposite way to its neighbour,
 * on a wall leaning back in 3D. As the section scrolls into view the wall turns to
 * face the visitor, and is flat by the time it reaches the middle of the screen.
 * Each frame holds a full-page screenshot that scrolls on hover, and opens the
 * live website in a new tab.
 *
 * The drift is a CSS animation (each column lists its frames twice, so the loop has
 * no seam). The script only reports how far the wall has turned (--turn, 0 to 1)
 * and stops everything while the section is off screen. With reduced motion it is
 * a flat, still grid.
 */
export default function WorkWall({ onOpenWork }: WorkWallProps) {
  const viewRef = useRef<HTMLDivElement>(null);
  const narrow = useMediaQuery('(max-width: 639px)');
  const columns = intoColumns(SITES, narrow ? 2 : 3);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const plane = view.querySelector<HTMLElement>('.wall-plane');
    if (!plane) return;

    let queued = false;
    let listening = false;
    let last = -1;

    const apply = () => {
      queued = false;
      const vh = window.innerHeight;
      const rect = view.getBoundingClientRect();
      // 0 as the wall's top edge enters the screen, 1 once its middle reaches the
      // middle of the screen. It stays flat from there on.
      const turn = ease(clamp((vh - rect.top) / (vh / 2 + rect.height / 2)));
      if (Math.abs(turn - last) < 0.001) return;
      last = turn;
      plane.style.setProperty('--turn', turn.toFixed(4));
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    // Nothing runs while the section is off screen: no drift, no scroll work.
    const observer = new IntersectionObserver(
      ([entry]) => {
        view.classList.toggle('is-live', entry.isIntersecting);
        if (entry.isIntersecting && !listening) {
          listening = true;
          window.addEventListener('scroll', onScroll, { passive: true });
          window.addEventListener('resize', onScroll);
          apply();
        } else if (!entry.isIntersecting && listening) {
          listening = false;
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('resize', onScroll);
        }
      },
      { rootMargin: '10% 0px' }
    );
    // Start tilted, so the wall is already leaning back when it first appears.
    plane.style.setProperty('--turn', '0');
    observer.observe(view);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      view.classList.remove('is-live');
      plane.style.removeProperty('--turn');
    };
  }, []);

  return (
    <section id="featured-work" className="wall-section relative bg-neutral-950 text-[#ffffff] font-sans py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="eyebrow eyebrow-on-dark">Our work</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            A few of the websites we have built.
          </h2>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            A selection of our work for clinics, CA firms, manufacturers and more. Each one designed and coded from a blank page.
          </p>
        </div>
      </div>

      <div ref={viewRef} className="wall-view">
        <div className="wall-plane mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {columns.map((column, c) => (
            <div key={`${columns.length}-${c}`} className={`wall-col ${c % 2 === 1 ? 'is-down' : ''}`}>
              {/* Listed twice so the drift loops without a seam. The second copy is
                  for the eye only: hidden from screen readers and the keyboard. */}
              {[0, 1].map((copy) =>
                column.map((site) => {
                  const shot = FULL_SCREENSHOTS[site.id];
                  return (
                    <a
                      key={`${site.id}-${copy}`}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={copy === 0 ? `${site.clientName}, ${site.industry}. Visit site (opens in a new tab)` : undefined}
                      aria-hidden={copy === 1 ? true : undefined}
                      tabIndex={copy === 1 ? -1 : undefined}
                      className={`wall-tile ${copy === 1 ? 'wall-clone' : ''}`}
                    >
                      <span className="wall-chrome">
                        <span className="wall-dot" />
                        <span className="wall-dot" />
                        <span className="wall-dot" />
                        <span className="wall-domain">{site.domain.replace(/^www\./, '')}</span>
                      </span>
                      <span className="wall-window">
                        <img
                          src={`/screenshots/full/${site.id}.webp`}
                          srcSet={`/screenshots/full/${site.id}-300.webp 300w, /screenshots/full/${site.id}.webp 560w`}
                          sizes="(max-width: 639px) 46vw, 400px"
                          alt=""
                          width={shot.width}
                          height={shot.height}
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                          className="wall-shot"
                        />
                        {/* Pointer and keyboard: who it is, and that the click leaves this site */}
                        <span className="wall-info">
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-semibold text-[#ffffff]">{site.clientName}</span>
                            <span className="block truncate font-mono text-[10px] font-medium uppercase tracking-wider text-neutral-300">{site.industry}</span>
                          </span>
                          <span className="wall-visit">
                            Visit site <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </span>
                      </span>
                      {/* Touch screens have no hover, so the name is always shown */}
                      <span className="wall-name">
                        <span className="truncate">{site.clientName}</span>
                        <ArrowUpRight className="h-3 w-3 shrink-0 text-brand" />
                      </span>
                    </a>
                  );
                })
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 flex justify-center">
        <PageLink
          page="work"
          onNavigate={onOpenWork}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-deep px-7 py-4 text-base font-semibold text-ink transition-colors cursor-pointer"
        >
          See all work <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </PageLink>
      </div>
    </section>
  );
}
