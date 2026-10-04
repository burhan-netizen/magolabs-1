import { useEffect, useRef } from 'react';

interface LitQuote {
  quote: string;
  /** The phrase inside the quote that gets the amber marker. Must match the quote exactly. */
  key: string;
  name: string;
  initials: string;
  company: string;
  industry: string;
}

// Real client feedback, shortened from the full reviews on the Work page.
const QUOTES: LitQuote[] = [
  {
    quote: 'We finally have a website that reflects how we work with our clients: clear, professional, and easy to trust.',
    key: 'clear, professional, and easy to trust.',
    name: 'CA Jay Mehta',
    initials: 'JM',
    company: 'Jay Mehta & Co.',
    industry: 'Chartered Accountancy',
  },
  {
    quote: 'Absolutely professional people, know their work in best manner. I will absolutely recommend them for website related work.',
    key: 'absolutely recommend them',
    name: 'Dr. Mihir Shah',
    initials: 'MS',
    company: 'Dr. Mihir Shah Smile Care Clinic',
    industry: 'Dental & Healthcare',
  },
  {
    quote: 'Gorgeous website and amazing service from start to finish. Exactly what we needed for the business.',
    key: 'Exactly what we needed',
    name: 'Harshit Chopra',
    initials: 'HC',
    company: 'Santosh Timbers',
    industry: 'Timber & Wood Trading',
  },
  {
    quote: 'Very good website designs. Incredibly responsive team. Quick feedback turnaround. Great value.',
    key: 'Incredibly responsive team.',
    name: 'Manav Shah',
    initials: 'MS',
    company: 'SolWay Energies',
    industry: 'Solar & B2B Energy',
  },
];

/** Splits a quote into words, marking the ones inside the key phrase. */
function toWords(quote: string, key: string): { text: string; isKey: boolean }[] {
  const start = quote.indexOf(key);
  const end = start < 0 ? -1 : start + key.length;
  const words: { text: string; isKey: boolean }[] = [];
  const pattern = /\S+/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(quote))) {
    words.push({ text: match[0], isKey: start >= 0 && match.index >= start && match.index < end });
  }
  return words;
}

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

interface ScrollLitQuotesProps {
  /** Shown above the quotes. */
  eyebrow?: string;
  heading?: string;
}

/**
 * Client reviews in very large type. Each one starts dim, and its words light up
 * one after another as the visitor scrolls through it, with the key phrase picked
 * out in amber. The client's name arrives once the quote is fully lit.
 *
 * Tied to the page's normal scrolling: nothing is held or hijacked. The script only
 * marks words as lit; the colour change itself is a CSS transition. Without the
 * script, or with reduced motion, every quote is simply shown fully lit.
 */
export default function ScrollLitQuotes({ eyebrow = 'In their words', heading = 'What our clients say.' }: ScrollLitQuotesProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const figures: HTMLElement[] = Array.prototype.slice.call(root.querySelectorAll('.lit-quote'));
    const words = figures.map((figure) => Array.prototype.slice.call(figure.querySelectorAll('.lit-word')) as HTMLElement[]);
    const lit = figures.map(() => 0);
    if (!figures.length) return;

    root.classList.add('is-armed');
    let queued = false;
    let listening = false;

    const apply = () => {
      queued = false;
      const vh = window.innerHeight;
      figures.forEach((figure, i) => {
        const text = figure.querySelector<HTMLElement>('.lit-text');
        if (!text) return;
        const rect = text.getBoundingClientRect();
        // Starts as the quote's first line comes well into view, and is complete
        // while its last line is still comfortably on screen.
        const progress = clamp((vh * 0.78 - rect.top) / (rect.height + vh * 0.22));
        const count = Math.round(progress * words[i].length);
        if (count === lit[i]) return;
        const from = Math.min(count, lit[i]);
        const to = Math.max(count, lit[i]);
        for (let w = from; w < to; w++) words[i][w].classList.toggle('is-lit', w < count);
        lit[i] = count;
        figure.classList.toggle('is-done', count >= words[i].length);
      });
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(apply);
    };

    // No scroll work while the section is off screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
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
      { rootMargin: '20% 0px' }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      root.classList.remove('is-armed');
      figures.forEach((figure) => figure.classList.remove('is-done'));
      words.forEach((list) => list.forEach((word) => word.classList.remove('is-lit')));
    };
  }, []);

  return (
    <section id="client-quotes" className="py-24 sm:py-32 bg-neutral-50 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.1]">{heading}</h2>
        </div>

        <div ref={rootRef} className="lit-quotes mt-16 sm:mt-24 space-y-24 sm:space-y-40">
          {QUOTES.map((item, i) => {
            const words = toWords(item.quote, item.key);
            return (
              <figure key={item.name} className="lit-quote grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4">
                  <span className="font-mono text-xs font-bold tracking-[0.16em] text-neutral-500">
                    <span className="text-neutral-900">{String(i + 1).padStart(2, '0')}</span> / {String(QUOTES.length).padStart(2, '0')}
                  </span>
                  <span className="lit-rule" aria-hidden="true" />
                </div>

                <div className="lg:col-span-10">
                  <svg className="lit-mark" viewBox="0 0 48 36" aria-hidden="true">
                    <path d="M0 36V21.6C0 9.4 6.6 2 19.2 0l2 5.4C14.6 7 11.4 10.6 11 16h9.2v20H0Zm26.8 0V21.6C26.8 9.4 33.4 2 46 0l2 5.4c-6.6 1.6-9.8 5.2-10.2 10.6H47v20H26.8Z" />
                  </svg>
                  <blockquote className="lit-text mt-6 text-[1.75rem] leading-[1.25] sm:text-5xl sm:leading-[1.15] lg:text-[3.5rem] lg:leading-[1.12] font-semibold tracking-tight">
                    {words.map((word, w) => {
                      const next = words[w + 1];
                      // Inside the key phrase the space belongs to the word, so the amber runs unbroken.
                      const joined = word.isKey && next?.isKey;
                      return (
                        <span key={w}>
                          <span className={`lit-word ${word.isKey ? 'lit-key' : ''}`}>
                            {word.text}
                            {joined ? ' ' : ''}
                          </span>
                          {joined ? '' : ' '}
                        </span>
                      );
                    })}
                  </blockquote>

                  <figcaption className="lit-by mt-8 sm:mt-10 flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-neutral-950 text-sm font-bold text-[#ffffff]">
                      {item.initials}
                    </span>
                    <span>
                      <span className="block text-base font-semibold text-neutral-900">{item.name}</span>
                      <span className="block text-sm text-neutral-600">
                        {item.company} <span className="text-neutral-400" aria-hidden="true">/</span> {item.industry}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
