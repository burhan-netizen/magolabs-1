import { RefObject, useEffect } from 'react';

interface DepthOptions {
  /** Only runs at or below this viewport width. Wider screens have the pointer
   *  effects and the scroll-stack instead. */
  maxWidth?: number;
}

/**
 * Scroll depth for phones and tablets, where there is no pointer to react to.
 * Each card rises into place, tilting flat as it comes up the screen, and sinks
 * back a little as it leaves at the top, so the page reads as layers, not a list.
 *
 * Tied to the scroll position (nothing plays on a timer), and the script only
 * writes two numbers per card: --in (0 to 1, arriving) and --out (0 to 1, leaving).
 * The CSS in index.css turns those into transform and opacity. A card that has
 * arrived also gets `is-inview`, for one-off touches.
 *
 * If it never starts (wide screens, reduced motion, no JavaScript) the cards are
 * simply shown as they are.
 */
export function useScrollDepth(wrapRef: RefObject<HTMLElement | null>, cardSelector: string, options: DepthOptions = {}) {
  const { maxWidth = 1023 } = options;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const narrow = window.matchMedia(`(max-width: ${maxWidth}px)`);
    let cards: HTMLElement[] = [];
    let last: string[] = [];
    let queued = false;
    let active = false;

    const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

    /** Distance from the top of the document, ignoring any transform on the card
     *  (the transform is ours, so measuring it would make the effect chase itself). */
    const documentTop = (el: HTMLElement) => {
      let top = 0;
      let node: HTMLElement | null = el;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return top;
    };

    const apply = () => {
      queued = false;
      if (!active) return;
      const vh = window.innerHeight;
      const scrollTop = window.scrollY;
      // Read every position first, then write, so the browser lays out once.
      const boxes = cards.map((card) => {
        const top = documentTop(card) - scrollTop;
        return { top, bottom: top + card.offsetHeight };
      });
      cards.forEach((card, i) => {
        const { top, bottom } = boxes[i];
        // Arriving: starts as the card's top edge enters, done 45% of a screen later.
        const enter = clamp((vh - top) / (vh * 0.45));
        // Leaving: over the last half screen before the card is gone at the top.
        const leave = clamp((vh * 0.5 - bottom) / (vh * 0.5));
        const key = `${enter.toFixed(3)}|${leave.toFixed(3)}`;
        if (last[i] === key) return;
        last[i] = key;
        card.style.setProperty('--in', enter.toFixed(3));
        card.style.setProperty('--out', leave.toFixed(3));
        card.classList.toggle('is-inview', enter > 0.9 && leave < 0.6);
      });
    };

    const stop = () => {
      active = false;
      cards.forEach((card) => {
        card.classList.remove('is-depth', 'is-inview');
        card.style.removeProperty('--in');
        card.style.removeProperty('--out');
      });
      last = [];
    };

    const start = () => {
      stop();
      if (!narrow.matches) return;
      cards = Array.prototype.slice.call(wrap.querySelectorAll(cardSelector));
      if (!cards.length) return;
      active = true;
      cards.forEach((card) => card.classList.add('is-depth'));
      apply();
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    start();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    narrow.addEventListener('change', start);
    // Cards can be added or removed (the project filter), so pick up the new set.
    const observer = new MutationObserver(start);
    observer.observe(wrap, { childList: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      narrow.removeEventListener('change', start);
      observer.disconnect();
      stop();
    };
  }, [wrapRef, cardSelector, maxWidth]);
}
