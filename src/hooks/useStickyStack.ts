import { RefObject, useEffect } from 'react';

interface StickyStackOptions {
  /** Only stacks at or below this viewport width. */
  maxWidth?: number;
  /** px below the top of the screen where the deck sits (clears the fixed header). */
  top?: number;
  /** px each card in the deck is offset from the one under it. */
  offset?: number;
}

/**
 * The scroll-stack for phones: each card stops under the header as you scroll to
 * it, and the next one slides up over it, so the list ends as a deck.
 *
 * The stopping is done by the browser itself (position: sticky), not by script,
 * so it stays locked to the finger. The script only decides whether the deck fits
 * on this screen and, as cards pile up, reports how deep each one sits (--depth),
 * which the CSS in index.css turns into a slight shrink and shade.
 *
 * If a card is too tall for the screen the deck is not used and the cards are a
 * plain list, as they are with reduced motion or without JavaScript.
 */
export function useStickyStack(wrapRef: RefObject<HTMLElement | null>, itemSelector: string, options: StickyStackOptions = {}) {
  const { maxWidth = 1023, top = 80, offset = 10 } = options;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const narrow = window.matchMedia(`(max-width: ${maxWidth}px)`);
    let items: HTMLElement[] = [];
    let last: string[] = [];
    let queued = false;
    let active = false;

    const clear = () => {
      active = false;
      wrap.classList.remove('is-sticky-stack');
      wrap.style.removeProperty('--stack-top');
      wrap.style.removeProperty('--stack-offset');
      items.forEach((item) => {
        item.style.removeProperty('--stack-i');
        item.style.removeProperty('--depth');
      });
      last = [];
    };

    const apply = () => {
      queued = false;
      if (!active) return;
      const vh = window.innerHeight;
      // How far each card has come to rest: 0 while it is still on its way up,
      // 1 once it sits in the deck.
      const settled = items.map((item, i) => {
        const restingTop = top + offset * i;
        return 1 - Math.min(1, Math.max(0, (item.getBoundingClientRect().top - restingTop) / (vh * 0.55)));
      });
      // A card's depth is the number of cards resting on top of it.
      let above = 0;
      for (let i = items.length - 1; i >= 0; i--) {
        const depth = Math.min(above, 4).toFixed(3);
        if (last[i] !== depth) {
          last[i] = depth;
          items[i].style.setProperty('--depth', depth);
        }
        above += settled[i];
      }
    };

    const measure = () => {
      clear();
      items = Array.prototype.slice.call(wrap.querySelectorAll(itemSelector));
      if (!narrow.matches || items.length < 2) return;
      // Every card has to fit under the header with the deck's edges showing,
      // or its bottom could never be scrolled into view.
      const tallest = Math.max(...items.map((item) => item.offsetHeight));
      if (tallest + top + offset * (items.length - 1) + 12 > window.innerHeight) return;

      active = true;
      wrap.style.setProperty('--stack-top', `${top}px`);
      wrap.style.setProperty('--stack-offset', `${offset}px`);
      items.forEach((item, i) => item.style.setProperty('--stack-i', String(i)));
      wrap.classList.add('is-sticky-stack');
      apply();
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    narrow.addEventListener('change', measure);
    // Re-check when the cards change size (images, fonts, rotation) or the set of
    // cards changes (the project filter).
    let width = window.innerWidth;
    const onResize = () => {
      // Phones fire resize as the address bar slides away; only a real change of
      // width needs the deck rebuilt.
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      measure();
    };
    window.addEventListener('resize', onResize);
    const mutations = new MutationObserver(measure);
    mutations.observe(wrap, { childList: true });
    // Images and fonts arriving change card heights; settle once they are in.
    const settle = window.setTimeout(measure, 1200);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      narrow.removeEventListener('change', measure);
      mutations.disconnect();
      window.clearTimeout(settle);
      clear();
    };
  }, [wrapRef, itemSelector, maxWidth, top, offset]);
}
