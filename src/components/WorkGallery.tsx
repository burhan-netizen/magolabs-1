import { useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import PageLink from './PageLink';
import { CASE_STUDIES, FEATURED_CASE_STUDY_IDS } from '../data/caseStudies';
import { screenshotSrcSet } from '../utils/images';

interface WorkGalleryProps {
  onOpenWork: () => void;
}

// The projects with results to show lead, then the rest in their usual order.
const SITES = [
  ...FEATURED_CASE_STUDY_IDS.map((id) => CASE_STUDIES.find((cs) => cs.id === id)),
  ...CASE_STUDIES.filter((cs) => !FEATURED_CASE_STUDY_IDS.includes(cs.id)),
].filter((cs): cs is (typeof CASE_STUDIES)[number] => Boolean(cs && cs.screenshotUrl));

/** Where each frame hangs, off the centre line: across (share of the stage width)
 *  and up or down (share of its height). The last entry is the closing tile, dead centre. */
const PLACES = [
  { x: 0.2, y: -0.03 },
  { x: -0.2, y: 0.06 },
  { x: 0.13, y: 0.09 },
  { x: -0.22, y: -0.07 },
  { x: 0.22, y: 0.04 },
  { x: -0.13, y: -0.09 },
  { x: 0.18, y: 0.08 },
  { x: -0.2, y: -0.04 },
  { x: 0.11, y: 0.09 },
  { x: -0.22, y: -0.06 },
  { x: 0.2, y: 0.05 },
  { x: 0, y: 0 },
];

/** px between one frame and the next, along the line of sight. */
const GAP = 900;
/** How far back the camera starts, in gaps: far enough that the first frame is
 *  still out of sight behind the heading. */
const START = 1.6;
/** Must match the perspective set on .gallery-stage in index.css. */
const PERSPECTIVE = 1100;

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * Home page: a selection of the websites we have built, as a walk-through gallery.
 *
 * The section holds in place while the visitor scrolls, and the scroll moves the
 * camera forward down a corridor of website screenshots hanging in space. Each
 * one comes out of the distance, arrives in focus, then passes by. The one in
 * focus opens the live website in a new tab.
 *
 * The holding is done by the browser (position: sticky). The script turns the
 * scroll position into each frame's place and writes only transform and opacity.
 * Without the script, or with reduced motion, the same frames are a plain grid.
 */
export default function WorkGallery({ onOpenWork }: WorkGalleryProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const stage = wrap.querySelector<HTMLElement>('.gallery-stage');
    const rail = wrap.querySelector<HTMLElement>('.gallery-rail');
    const intro = wrap.querySelector<HTMLElement>('.gallery-intro');
    const count = wrap.querySelector<HTMLElement>('.gallery-count');
    const bar = wrap.querySelector<HTMLElement>('.gallery-bar');
    const frames: HTMLElement[] = Array.prototype.slice.call(wrap.querySelectorAll('.gallery-frame'));
    if (!stage || !rail || !frames.length) return;

    wrap.classList.add('is-gallery');
    const total = frames.length;
    let queued = false;
    let lastP = -1;
    let focused = -1;

    const apply = () => {
      queued = false;
      const vh = window.innerHeight;
      const rect = wrap.getBoundingClientRect();
      if (rect.top > vh * 1.2 || rect.bottom < -vh * 0.2) return;

      const travel = Math.max(1, rect.height - stage.offsetHeight);
      const p = clamp(-rect.top / travel);
      if (Math.abs(p - lastP) < 0.0004) return;
      lastP = p;

      const width = stage.clientWidth;
      const height = stage.clientHeight;
      // Narrow screens: frames are nearly as wide as the screen, so they stay close
      // to the centre line.
      const narrow = width < 640;
      const spread = narrow ? 0.28 : 1;
      // On a narrow screen a passing frame has nowhere to drift to, so it goes sooner.
      const fade = PERSPECTIVE * (narrow ? 0.13 : 0.2);
      // The camera starts well back, with the first frames faint in the distance
      // behind the heading, and stops in front of the last one.
      const camera = -START * GAP + p * (total + START) * GAP;

      let nearest = -1;
      let nearestDistance = Infinity;
      frames.forEach((frame, i) => {
        // Behind the focus plane is negative, in front of it (passing the camera) positive.
        const z = camera - (i + 1) * GAP;
        const place = PLACES[i % PLACES.length];
        // Frames drift outward as they pass, so they clear the view, not fill it.
        const pass = z > 0 ? 1 + (z / PERSPECTIVE) * 3 : 1;
        const x = place.x * width * spread * pass;
        const y = place.y * height * pass;

        // Out of the dark at the far end, and gone before they reach the camera.
        const fromFar = clamp((z + GAP * 2.6) / (GAP * 1.6));
        const toNear = 1 - clamp((z - 40) / fade);
        const opacity = Math.pow(fromFar, 1.5) * toNear;

        frame.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px)`;
        frame.style.opacity = opacity.toFixed(3);
        frame.style.visibility = opacity < 0.01 ? 'hidden' : 'visible';

        const distance = Math.abs(z);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = i;
        }
      });

      // Only the frame in focus can be opened: nobody should hit a moving target.
      const inFocus = nearestDistance < GAP * 0.4 ? nearest : -1;
      if (inFocus !== focused) {
        if (focused >= 0) frames[focused].classList.remove('is-focus');
        if (inFocus >= 0) frames[inFocus].classList.add('is-focus');
        focused = inFocus;
      }

      // A slow sway of the whole corridor, so the depth reads as depth.
      rail.style.transform = `rotateY(${(Math.sin(p * Math.PI * 3) * 2.5).toFixed(2)}deg) rotateX(${(1.5 - p * 3).toFixed(2)}deg)`;

      if (intro) {
        // The heading has cleared before the first frame arrives.
        const gone = clamp(p * (total + START) * 0.85);
        intro.style.opacity = (1 - gone).toFixed(3);
        intro.style.transform = `translate3d(0, ${(-gone * 40).toFixed(1)}px, 0) scale(${(1 + gone * 0.12).toFixed(3)})`;
        intro.style.visibility = gone >= 1 ? 'hidden' : 'visible';
      }
      if (count) {
        const shown = Math.min(SITES.length, Math.max(1, nearest + 1));
        count.textContent = String(shown).padStart(2, '0');
      }
      if (bar) bar.style.transform = `scaleX(${p.toFixed(4)})`;
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
      wrap.classList.remove('is-gallery');
      rail.style.transform = '';
      frames.forEach((frame) => {
        frame.classList.remove('is-focus');
        frame.style.transform = '';
        frame.style.opacity = '';
        frame.style.visibility = '';
      });
      if (intro) {
        intro.style.opacity = '';
        intro.style.transform = '';
        intro.style.visibility = '';
      }
    };
  }, []);

  return (
    <section id="featured-work" className="gallery-section relative bg-neutral-950 text-[#ffffff] font-sans">
      <div ref={wrapRef} className="gallery-wrap">
        <div className="gallery-stage">
          <div className="gallery-glow" aria-hidden="true" />

          <div className="gallery-intro mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
              <span className="eyebrow eyebrow-on-dark">Our work</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                A few of the websites we have built.
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
                A selection of our work for clinics, CA firms, manufacturers and more. Each one designed and coded from a blank page. Open any of them.
              </p>
            </div>
          </div>

          <div className="gallery-view mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ul className="gallery-rail grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
              {SITES.map((site) => (
                <li key={site.id} className="gallery-frame">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.clientName} website (opens in a new tab)`}
                    className="gallery-card group block overflow-hidden rounded-xl border border-white/10 bg-neutral-900"
                  >
                    <div className="gallery-chrome items-center gap-1.5 border-b border-white/10 px-3.5 py-2.5">
                      <span className="h-2 w-2 rounded-full bg-white/25" />
                      <span className="h-2 w-2 rounded-full bg-white/25" />
                      <span className="h-2 w-2 rounded-full bg-white/25" />
                      <span className="ml-2.5 truncate font-mono text-[10px] text-neutral-400">{site.domain.replace(/^www\./, '')}</span>
                    </div>
                    <div className="relative overflow-hidden">
                      <img
                        src={site.screenshotUrl}
                        srcSet={site.screenshotUrl && screenshotSrcSet(site.screenshotUrl)}
                        sizes="(max-width: 640px) 82vw, 620px"
                        alt=""
                        width={900}
                        height={430}
                        loading="lazy"
                        decoding="async"
                        className="block aspect-[900/430] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                      <span className="gallery-open absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand text-ink" aria-hidden="true">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="gallery-label flex items-baseline justify-between gap-3 px-3 py-2.5 sm:px-4 sm:py-3">
                      <p className="truncate text-[13px] sm:text-sm font-semibold text-[#ffffff]">{site.clientName}</p>
                      <p className="gallery-industry truncate font-mono text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-neutral-400">{site.industry}</p>
                    </div>
                  </a>
                </li>
              ))}

              {/* The corridor ends on the way to the stories behind the websites */}
              <li className="gallery-frame">
                <PageLink
                  page="work"
                  onNavigate={onOpenWork}
                  className="gallery-card gallery-end group flex h-full min-h-[7.5rem] flex-col justify-between rounded-xl bg-brand p-4 sm:p-6 text-ink cursor-pointer"
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider">What changed</span>
                  <span className="flex items-end justify-between gap-2 text-base sm:text-2xl font-bold leading-tight">
                    The stories behind them
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </PageLink>
              </li>
            </ul>
          </div>

          {/* Where you are in the corridor */}
          <div className="gallery-hud" aria-hidden="true">
            <span className="font-mono text-xs font-bold tracking-[0.16em] text-neutral-300">
              <span className="gallery-count text-brand">01</span> / {String(SITES.length).padStart(2, '0')}
            </span>
            <span className="gallery-track"><span className="gallery-bar" /></span>
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
