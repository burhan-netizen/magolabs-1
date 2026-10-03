import { RefObject, useEffect } from 'react';

interface StackOptions {
  /** px offset between cards in the finished deck. */
  stackDistance?: number;
  /** How much each card shrinks per step back in the deck. */
  scale?: number;
  /** px of blur per step back. */
  blur?: number;
  /** Only stack at or above this viewport width; below it the cards stay a plain list. */
  minWidth?: number;
}

/**
 * Scroll-stack: cards pin near the top of the screen as you scroll to them, and the
 * next card slides up and over the last, so the section ends as a deck.
 *
 * Runs on the page's normal scrolling (nothing is hijacked) and writes only
 * transform and filter, once per frame. If it never starts (small screens, reduced
 * motion, no JavaScript) the cards are simply a normal list.
 */
export function useScrollStack(wrapRef: RefObject<HTMLElement | null>, cardSelector: string, options: StackOptions = {}) {
  const { stackDistance = 22, scale: itemScale = 0.04, blur: blurAmount = 1.2, minWidth = 1024 } = options;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards: HTMLElement[] = Array.prototype.slice.call(wrap.querySelectorAll(cardSelector));
    if (cards.length < 2) return;

    // The pin releases against this marker.
    const end = document.createElement('div');
    end.className = 'stack-end';
    end.setAttribute('aria-hidden', 'true');
    wrap.appendChild(end);

    const STACK_POSITION = 0.14; // pin this far down the viewport
    const SCALE_END_POSITION = 0.06;
    const baseScale = 1 - (cards.length - 1) * itemScale;

    let rel: number[] = [];
    let relEnd = 0;
    let deckBottom = 0;
    let vh = 0;
    let last: ({ y: number; s: number; b: number } | undefined)[] = [];
    let queued = false;
    let active = false;

    const clear = () => {
      cards.forEach((c) => { c.style.transform = ''; c.style.filter = ''; });
      last = [];
    };

    const progress = (v: number, a: number, b: number) => (v < a ? 0 : v > b ? 1 : (v - a) / (b - a));

    const apply = () => {
      if (!active) return;
      const top = window.scrollY;
      const wrapTop = wrap.getBoundingClientRect().top + top;
      const stackPx = STACK_POSITION * vh;
      const scaleEndPx = SCALE_END_POSITION * vh;
      const pinEnd = wrapTop + relEnd - deckBottom;

      let topIndex = 0;
      for (let k = 0; k < cards.length; k++) {
        if (top >= wrapTop + rel[k] - stackPx - stackDistance * k) topIndex = k;
      }

      for (let i = 0; i < cards.length; i++) {
        const cardTop = wrapTop + rel[i];
        const pinStart = cardTop - stackPx - stackDistance * i;
        const target = baseScale + i * itemScale;
        const s = 1 - progress(top, pinStart, cardTop - scaleEndPx) * (1 - target);
        let ty = 0;
        if (top >= pinStart) ty = (top > pinEnd ? pinEnd : top) - cardTop + stackPx + stackDistance * i;
        const b = i < topIndex ? (topIndex - i) * blurAmount : 0;

        const t = { y: Math.round(ty * 100) / 100, s: Math.round(s * 1000) / 1000, b: Math.round(b * 100) / 100 };
        const p = last[i];
        if (p && Math.abs(p.y - t.y) < 0.1 && Math.abs(p.s - t.s) < 0.001 && Math.abs(p.b - t.b) < 0.1) continue;
        cards[i].style.transform = `translate3d(0,${t.y}px,0) scale(${t.s})`;
        cards[i].style.filter = t.b > 0 ? `blur(${t.b}px)` : '';
        last[i] = t;
      }
    };

    const measure = () => {
      vh = window.innerHeight;
      clear();
      // Stack only on wide screens, and only when a whole card fits on screen:
      // a card taller than the window would pin with its bottom out of reach.
      const tallest = Math.max(...cards.map((c) => c.offsetHeight));
      const shouldStack = window.innerWidth >= minWidth && tallest < vh * 0.78;
      active = shouldStack;
      wrap.classList.toggle('is-stacking', shouldStack);
      if (!shouldStack) return;

      const wrapTop = wrap.getBoundingClientRect().top;
      rel = cards.map((c) => c.getBoundingClientRect().top - wrapTop);
      relEnd = end.getBoundingClientRect().top - wrapTop;
      deckBottom = STACK_POSITION * vh + stackDistance * (cards.length - 1) + tallest;
      apply();
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; apply(); });
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    // Re-measure when anything above changes height (images decoding, fonts).
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      observer.disconnect();
      wrap.classList.remove('is-stacking');
      clear();
      end.remove();
    };
  }, [wrapRef, cardSelector, stackDistance, itemScale, blurAmount, minWidth]);
}
