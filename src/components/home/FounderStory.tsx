import { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import ScrollFillText from './ScrollFillText';
import Reveal from './Reveal';

const PHOTOS = [
  { src: '/founder/lanterns.webp', w: 900, h: 1351, caption: 'Collecting colours in Vietnam', alt: 'Burhan sitting in front of a wall of glowing silk lanterns' },
  { src: '/founder/mountains.webp', w: 900, h: 1200, caption: 'Mountain air resets everything', alt: 'Burhan on a wooden balcony with mountains behind him' },
  { src: '/founder/saigon.webp', w: 900, h: 1200, caption: 'Night walks, new cities', alt: 'Burhan standing in front of a lit colonial building at night' },
  { src: '/founder/beach.webp', w: 900, h: 1351, caption: 'Sunsets, always', alt: 'Burhan walking barefoot along a beach at sunset' },
  { src: '/founder/swing.webp', w: 900, h: 1601, caption: 'Never too busy for a good café', alt: 'Burhan sitting on a hanging rattan swing seat' },
  { src: '/founder/stripes.webp', w: 739, h: 493, caption: 'Probably thinking about food', alt: 'Burhan smiling in a striped shirt' },
];

const LOVES = ['Travelling', 'Cooking', 'Trying new cuisines', 'Movies & Netflix', 'Hosting friends'];

/** Lets the photo row be dragged sideways with a mouse, as well as swiped. */
function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(pointer: fine)').matches) return;
    let down = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.classList.add('dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = () => {
      down = false;
      el.classList.remove('dragging');
    };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);
  return ref;
}

export default function FounderStory() {
  const stripRef = useDragScroll();
  const [devil, setDevil] = useState(false);

  return (
    <section id="founder" className="relative bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <span className="label-v2">The founder</span>

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Portrait, with a small surprise behind it */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[32px] bg-[#E4DDCF]">
                <img src="/founder/portrait.webp" alt="Burhan Kapasi, founder of Mago Labs" width={1100} height={1258} loading="lazy" decoding="async" className="block h-auto w-full" />
                <img
                  src="/founder/horns.webp"
                  alt=""
                  aria-hidden="true"
                  width={700}
                  height={700}
                  loading="lazy"
                  decoding="async"
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${devil ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
              <button
                type="button"
                onMouseEnter={() => setDevil(true)}
                onMouseLeave={() => setDevil(false)}
                onFocus={() => setDevil(true)}
                onBlur={() => setDevil(false)}
                onClick={() => setDevil((d) => !d)}
                aria-pressed={devil}
                className="absolute -right-3 top-8 rotate-6 cursor-pointer rounded-xl bg-brand px-4 py-3 text-left text-sm font-semibold text-ink shadow-lg transition-transform duration-300 hover:rotate-0 md:-right-6"
              >
                {devil ? 'After a deadline.' : 'Psst. Meet the real me.'}
              </button>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-ink">Burhan Kapasi</p>
                  <p className="text-sm text-ink/60">Founder, Mago Labs. Surat, India.</p>
                </div>
                <a
                  href="https://www.linkedin.com/in/burhanuddinkapasi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper transition-transform hover:-translate-y-0.5"
                  aria-label="Burhan Kapasi on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* The story */}
          <div>
            <h2 className="display-lg text-[clamp(2.6rem,5.8vw,5.2rem)] text-ink">
              I was never built for a <span className="font-serif-accent">cubicle.</span>
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink/75">
              <p>
                For eight years I worked in banking, fintech and insurance: IDFC FIRST Bank, Drip Capital, Credlix, Bandhan Life. Good companies, good people. But every day ran on rules, process, reports and someone watching over my shoulder. I have always been creative, always wanted to think differently, and I knew I wasn’t living up to what I could do.
              </p>
              <p>
                So I started building websites on the side. Nights, weekends, one project after another. Two years later, I took the leap and made Mago Labs my full-time work.
              </p>
            </div>

            <Reveal className="mt-14 rounded-[32px] bg-ink p-8 text-paper md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-brand">The client who made it worth it</p>
              <p className="mt-5 leading-relaxed text-paper/75">
                Soon after I left my job, a business owner came to me. He badly needed a website. He had been to agency after agency, and none of them fit his budget. When I gave him my quote, his face fell. He told me the truth: he needed this, but he couldn’t afford it.
              </p>
              <p className="mt-4 leading-relaxed text-paper/75">
                I had just started out myself and could have walked away. I didn’t. I built him something far better than he had asked for, at a price he could manage. When he saw it, he was close to tears.
              </p>
              <ScrollFillText
                as="blockquote"
                text="“You took all my worries away.”"
                className="display-lg mt-8 text-[clamp(2rem,4.2vw,3.6rem)] text-paper"
                dim={0.2}
                accentWords={['worries']}
                accentClass="font-serif-accent text-brand"
              />
              <p className="mt-6 leading-relaxed text-paper/75">
                He has been sending people my way ever since. That goodwill is still the best marketing I have, and it is the standard I hold every project to. Big budget or small, you get my full attention, because I know what it means to you.
              </p>
            </Reveal>

            <div className="mt-14">
              <h3 className="text-xl font-semibold text-ink">Outside of work</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {LOVES.map((l) => (
                  <li key={l} className="rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-sm text-ink/80">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Photo strip, draggable and swipeable */}
      <div ref={stripRef} className="photo-strip mt-16 flex snap-x gap-5 overflow-x-auto px-5 pb-6 sm:px-8 lg:px-[max(2rem,calc((100vw_-_1180px)/2_+_2rem))]" aria-label="Photos of Burhan travelling">
        {PHOTOS.map((p, i) => (
          <figure key={p.src} className={`flex-none snap-start ${i % 2 ? 'mt-10' : ''}`}>
            <div className={`overflow-hidden rounded-[22px] bg-[#E4DDCF] shadow-[0_24px_50px_-30px_rgba(22,19,15,0.6)] ${i % 2 ? 'rotate-[1.5deg]' : '-rotate-[1.5deg]'}`}>
              <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading="lazy" decoding="async" draggable={false} className="block h-[340px] w-auto select-none object-cover md:h-[420px]" />
            </div>
            <figcaption className="mt-3 font-mono text-xs text-ink/55">{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
