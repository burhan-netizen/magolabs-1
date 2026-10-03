/**
 * Small site-wide motion touches, written as plain DOM code with delegated
 * listeners so they cost almost nothing and work on any page:
 *
 *  1. Click ripple on the primary (amber) buttons.
 *  2. A soft light that follows the pointer across dark sections (.glow-follow).
 *  3. Magnetic pull on small icon buttons (.magnetic).
 *  4. Section headings that rise into place as they scroll into view.
 *  5. Scroll-linked progress (--p, 0 to 1) on elements marked [data-scroll-progress].
 *
 * Everything is skipped for visitors who ask for reduced motion: they get the
 * finished, still state.
 */

const BUTTON_SELECTOR = 'a.bg-brand.rounded-full, button.bg-brand.rounded-full';
/** Headings in every section after a page's first one. The first section is the
 *  hero, which must be visible the instant the page paints. */
const REVEAL_SELECTOR = 'main section ~ section h2, main section ~ section .eyebrow';

let started = false;
let revealObserver: IntersectionObserver | null = null;

function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Call once, when the app starts in the browser. */
export function initAmbientEffects(): void {
  if (started || typeof window === 'undefined') return;
  started = true;

  if (reducedMotion()) {
    document.documentElement.classList.remove('motion-ok');
    document.querySelectorAll<HTMLElement>('[data-scroll-progress]').forEach((el) => el.style.setProperty('--p', '1'));
    return;
  }

  // 1. Ripple: starts exactly where the pointer landed.
  document.addEventListener(
    'pointerdown',
    (e) => {
      const el = (e.target as Element | null)?.closest?.(BUTTON_SELECTOR) as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dot = document.createElement('span');
      dot.className = 'btn-ripple';
      dot.style.left = `${e.clientX - r.left}px`;
      dot.style.top = `${e.clientY - r.top}px`;
      dot.addEventListener('animationend', () => dot.remove());
      el.appendChild(dot);
      window.setTimeout(() => dot.remove(), 900);
    },
    { passive: true }
  );

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (finePointer) {
    // 2. Pointer light on dark sections: one listener, one write per frame.
    let glowQueued = false;
    let lastEvent: PointerEvent | null = null;
    document.addEventListener(
      'pointermove',
      (e) => {
        lastEvent = e;
        if (glowQueued) return;
        glowQueued = true;
        requestAnimationFrame(() => {
          glowQueued = false;
          if (!lastEvent) return;
          const host = (lastEvent.target as Element | null)?.closest?.('.glow-follow') as HTMLElement | null;
          if (!host) return;
          const r = host.getBoundingClientRect();
          host.style.setProperty('--gx', `${lastEvent.clientX - r.left}px`);
          host.style.setProperty('--gy', `${lastEvent.clientY - r.top}px`);
          host.setAttribute('data-glow', 'on');
        });
      },
      { passive: true }
    );

    // 3. Magnetic icons: a gentle pull toward the pointer, springing back on leave.
    document.addEventListener(
      'pointermove',
      (e) => {
        const el = (e.target as Element | null)?.closest?.('.magnetic') as HTMLElement | null;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.3;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(1.06)`;
        if (!el.dataset.magnetBound) {
          el.dataset.magnetBound = '1';
          el.addEventListener('pointerleave', () => { el.style.transform = ''; });
        }
      },
      { passive: true }
    );
  }

  // 4. Heading reveals.
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-inview', '');
        revealObserver?.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
  );

  // 5. Scroll progress for marked elements.
  let scrollQueued = false;
  const syncProgress = () => {
    scrollQueued = false;
    const vh = window.innerHeight || 800;
    document.querySelectorAll<HTMLElement>('[data-scroll-progress]').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > vh || r.bottom < 0) return;
      // Complete once the element is fully on screen (it may sit at the very
      // bottom of the page, where it can never travel far up the window).
      const p = Math.min(1, Math.max(0, (vh - r.top) / Math.min(vh * 0.9, r.height)));
      el.style.setProperty('--p', p.toFixed(3));
    });
  };
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(syncProgress);
  }, { passive: true });
  window.addEventListener('resize', syncProgress);
  syncProgress();
}

/** Call after each page change, so headings on the new page get watched too. */
export function refreshAmbientEffects(): void {
  if (!revealObserver) return;
  document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
    if (!el.hasAttribute('data-inview')) revealObserver?.observe(el);
  });
}
