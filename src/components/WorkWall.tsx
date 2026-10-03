import { useEffect, useRef, type CSSProperties } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageLink from './PageLink';
import { CASE_STUDIES, FEATURED_CASE_STUDY_IDS } from '../data/caseStudies';
import { screenshotSrcSet } from '../utils/images';

interface WorkWallProps {
  onOpenWork: () => void;
}

// The projects with results to show lead, then the rest in their usual order.
const SITES = [
  ...FEATURED_CASE_STUDY_IDS.map((id) => CASE_STUDIES.find((cs) => cs.id === id)),
  ...CASE_STUDIES.filter((cs) => !FEATURED_CASE_STUDY_IDS.includes(cs.id)),
].filter((cs): cs is (typeof CASE_STUDIES)[number] => Boolean(cs && cs.screenshotUrl));

/** Where each tile starts before the wall comes together: sideways and vertical
 *  drift (px), depth (px, toward the viewer), spin (deg), and how late it sets off
 *  (0 to 1). Fixed numbers, not random, so the page renders the same every time. */
const SCATTER = [
  { x: -150, y: 90, z: 260, r: -7, d: 0.0 },
  { x: 60, y: -120, z: 420, r: 5, d: 0.1 },
  { x: 190, y: 70, z: 160, r: -4, d: 0.04 },
  { x: -70, y: -60, z: 520, r: 8, d: 0.16 },
  { x: 130, y: 150, z: 340, r: 6, d: 0.08 },
  { x: -200, y: -30, z: 120, r: -6, d: 0.2 },
  { x: 40, y: 110, z: 460, r: 4, d: 0.12 },
  { x: 220, y: -90, z: 280, r: -8, d: 0.24 },
  { x: -110, y: 160, z: 380, r: 7, d: 0.18 },
  { x: 90, y: -150, z: 200, r: -5, d: 0.28 },
  { x: -180, y: 40, z: 480, r: 5, d: 0.22 },
  { x: 160, y: 120, z: 300, r: -6, d: 0.3 },
];
const LAST_DELAY = 0.3;

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Home page: every website we have built, as one wall.
 *
 * It starts as a tilted wall of screenshots hanging in space. As the visitor
 * scrolls, the section holds in place, the view swings round to face the wall and
 * each screenshot flies into its place in a grid. Every tile opens the live
 * website in a new tab.
 *
 * The holding is done by the browser (position: sticky). The script only turns the
 * scroll position into two numbers: --wall (the view, 0 to 1) on the stage and --q
 * (0 to 1) on each tile, which the CSS in index.css turns into transforms. Without
 * the script, or with reduced motion, it is simply the finished grid.
 */
export default function WorkWall({ onOpenWork }: WorkWallProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const wall = wrap.querySelector<HTMLElement>('.wall-stage');
    const tiles: HTMLElement[] = Array.prototype.slice.call(wrap.querySelectorAll('.wall-tile'));
    if (!wall || !tiles.length) return;

    wrap.classList.add('is-wall');
    let queued = false;
    let lastP = -1;

    const apply = () => {
      queued = false;
      const vh = window.innerHeight;
      const rect = wrap.getBoundingClientRect();
      if (rect.top > vh * 1.2 || rect.bottom < -vh * 0.2) return;

      // The room the wall is held for: the wrapper is taller than the wall by this much.
      const hold = Math.max(1, rect.height - wall.offsetHeight);
      // 0 as the wall comes up the screen, 1 a little before the hold ends, so the
      // finished grid rests for a moment before the page moves on.
      const start = vh * 0.45;
      const end = -hold * 0.82;
      const p = clamp((start - rect.top) / (start - end));
      if (Math.abs(p - lastP) < 0.0005) return;
      lastP = p;

      wall.style.setProperty('--wall', easeInOut(p).toFixed(4));
      tiles.forEach((tile, i) => {
        const delay = SCATTER[i % SCATTER.length].d;
        // Tiles set off once the wall is nearly in place to be held, the last ones latest.
        const q = easeInOut(clamp((p - 0.15 - delay) / (0.85 - LAST_DELAY)));
        tile.style.setProperty('--q', q.toFixed(4));
      });
      wrap.classList.toggle('is-assembled', p > 0.97);
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      wrap.classList.remove('is-wall', 'is-assembled');
      wall.style.removeProperty('--wall');
      tiles.forEach((tile) => tile.style.removeProperty('--q'));
    };
  }, []);

  return (
    <section id="featured-work" className="wall-section relative bg-neutral-950 text-[#ffffff] font-sans">
      {/* Above the wall, so drifting screenshots pass behind the heading, not over it */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="max-w-3xl space-y-4">
            <span className="eyebrow eyebrow-on-dark">Our work</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Every website we have built.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              {SITES.length} live websites, each designed and coded from a blank page. Open any of them.
            </p>
          </div>
          <PageLink
            page="work"
            onNavigate={onOpenWork}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#ffffff] underline decoration-brand decoration-2 underline-offset-4 whitespace-nowrap"
          >
            Read the case studies <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </PageLink>
        </div>
      </div>

      <div ref={wrapRef} className="wall-wrap">
        <div className="wall-stage">
          <div className="wall-glow" aria-hidden="true" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ul className="wall-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {SITES.map((site, i) => {
                const s = SCATTER[i % SCATTER.length];
                return (
                  <li
                    key={site.id}
                    className="wall-tile"
                    style={{ '--sx': `${s.x}px`, '--sy': `${s.y}px`, '--sz': `${s.z}px`, '--sr': `${s.r}deg` } as CSSProperties}
                  >
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.clientName} website (opens in a new tab)`}
                      className="wall-card group block overflow-hidden rounded-xl border border-white/10 bg-neutral-900"
                    >
                      <div className="wall-bar hidden sm:flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/25" />
                        <span className="ml-2 truncate font-mono text-[10px] text-neutral-400">{site.domain.replace(/^www\./, '')}</span>
                      </div>
                      <div className="relative overflow-hidden">
                        <img
                          src={site.screenshotUrl}
                          srcSet={site.screenshotUrl && screenshotSrcSet(site.screenshotUrl)}
                          sizes="(max-width: 640px) 46vw, (max-width: 1024px) 31vw, 300px"
                          alt=""
                          width={900}
                          height={430}
                          loading="lazy"
                          decoding="async"
                          className="block aspect-[900/430] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                        <span className="wall-open absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand text-ink" aria-hidden="true">
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                      <div className="wall-label px-3 py-2.5 sm:px-4 sm:py-3">
                        <p className="truncate text-[13px] sm:text-sm font-semibold text-[#ffffff]">{site.clientName}</p>
                        <p className="mt-0.5 truncate font-mono text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-neutral-400">{site.industry}</p>
                      </div>
                    </a>
                  </li>
                );
              })}

              {/* The last place in the grid leads on to the stories behind the websites */}
              <li
                className="wall-tile"
                style={{ '--sx': `${SCATTER[11].x}px`, '--sy': `${SCATTER[11].y}px`, '--sz': `${SCATTER[11].z}px`, '--sr': `${SCATTER[11].r}deg` } as CSSProperties}
              >
                <PageLink
                  page="work"
                  onNavigate={onOpenWork}
                  className="wall-card group flex h-full min-h-[7.5rem] flex-col justify-between rounded-xl bg-brand p-4 sm:p-5 text-ink cursor-pointer"
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider">What changed</span>
                  <span className="flex items-end justify-between gap-2 text-base sm:text-lg font-bold leading-tight">
                    The stories behind them
                    <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </PageLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
