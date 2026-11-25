import { MessageCircle } from 'lucide-react';
import BgVideo from '../BgVideo';
import Reveal from '../Reveal';
import { WHATSAPP_URL } from '../../../utils/contactLinks';

const PHOTOS = [
  { src: '/founder/lanterns.webp', caption: 'Lantern streets', rot: -5, w: 900, h: 1351 },
  { src: '/founder/mountains.webp', caption: 'Mountain mornings', rot: 4, w: 900, h: 1200 },
  { src: '/founder/saigon.webp', caption: 'Saigon nights', rot: -3, w: 900, h: 1200 },
  { src: '/founder/beach.webp', caption: 'Beach days', rot: 6, w: 900, h: 1351 },
];

const OFF_CLOCK = ['Travelling anywhere new', 'Street food, every city', 'Cooking for friends', 'Movie nights', 'A full house of guests'];

export default function FounderSoul() {
  return (
    <section id="founder" aria-labelledby="founder-title">
      {/* 1. The person behind it */}
      <div className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#120D08] text-white lg:items-center">
        <img src="/founder/portrait.webp" alt="Burhan Kapasi, founder of Mago Labs, sitting in an armchair" width={1100} height={1258} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_0%] lg:object-[70%_0%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,13,8,0.95)_0%,rgba(18,13,8,0.7)_42%,rgba(18,13,8,0.1)_75%)] max-lg:bg-[linear-gradient(0deg,rgba(18,13,8,0.97)_0%,rgba(18,13,8,0.75)_50%,rgba(18,13,8,0.15)_100%)]" />
        <BgVideo name="dust" className="absolute inset-0 -z-10 h-full w-full opacity-25 mix-blend-screen invert" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-40 md:px-8 lg:py-0">
          <Reveal>
            <p className="v3-label text-white/60">The founder</p>
            <h2 id="founder-title" className="v3-glow mt-5 max-w-[11ch]">Built by a person, not a factory.</h2>
            <p className="mt-7 max-w-[40ch] text-[18px] leading-relaxed text-white/80">
              I'm Burhan Kapasi. Every website at Mago Labs goes through my hands, and I treat each one as if it were my own business.
            </p>
          </Reveal>
        </div>
      </div>

      {/* 2. The letter, and life off the clock */}
      <div className="relative isolate overflow-hidden bg-[#F4EFE6] py-24 md:py-32">
        <BgVideo name="dust" className="absolute inset-0 -z-10 h-full w-full opacity-60 mix-blend-multiply" />
        <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <article className="relative rounded-[6px] bg-[#FFFDF8] p-8 shadow-[0_30px_70px_-35px_rgba(60,40,10,0.45)] ring-1 ring-[#E9E0CF] md:p-12">
              <span aria-hidden="true" className="absolute -top-4 left-10 h-8 w-28 rotate-[-4deg] bg-[#FFD95C]/80" />
              <p className="v3-hand text-[30px] text-ink/80">I'll keep it simple.</p>
              <div className="mt-6 space-y-5 text-[17px] leading-[1.75] text-ink/80">
                <p>For 8 years I worked in banking and fintech. Good jobs, but full of rules, reports and micromanagement, and I knew I wasn't doing my best work. So I freelanced on the side, then took the leap and started Mago Labs full time.</p>
                <p>Soon after, a business owner came to me. He had been to agency after agency and couldn't afford any of them. When I told him my price, his face dropped. I had just left my job, but I built him far more than he asked for, within his budget.</p>
                <p>When he saw it, he was close to tears. <em className="font-semibold not-italic text-ink">"You took all my worries away,"</em> he said. He still sends people my way.</p>
                <p>That is the standard for every project here: I treat your business like my own, so you look as good online as you are in person.</p>
              </div>
              <div className="mt-9 flex items-center gap-4">
                <img src="/founder/portrait.webp" alt="" width={1100} height={1258} loading="lazy" className="h-14 w-14 rounded-full object-cover object-[50%_25%]" />
                <div>
                  <p className="v3-hand text-[34px] leading-none text-ink">Burhan</p>
                  <p className="mt-1 text-[13px] text-ink/55">Founder, Mago Labs</p>
                </div>
              </div>
            </article>
          </Reveal>

          <div className="relative">
            <Reveal>
              <p className="v3-label">Off the clock</p>
              <h3 className="v3-h3 mt-3">Life outside the laptop</h3>
            </Reveal>
            <div className="relative mt-10 grid grid-cols-2 gap-5 sm:gap-7">
              {PHOTOS.map((ph, i) => (
                <Reveal key={ph.src} delay={i * 0.08}>
                  <figure className="v3-polaroid bg-white p-2.5 pb-1 shadow-[0_20px_40px_-22px_rgba(60,40,10,0.55)]" style={{ ['--r' as string]: `${ph.rot}deg` }}>
                    <img src={ph.src} alt={`Burhan travelling: ${ph.caption.toLowerCase()}`} width={ph.w} height={ph.h} loading="lazy" className="aspect-[4/5] w-full object-cover" />
                    <figcaption className="v3-hand py-1.5 text-center text-[22px] text-ink/75">{ph.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>

            <div className="relative mt-10 flex flex-wrap items-start gap-6">
              <Reveal>
                <div className="v3-paper w-[250px] rotate-[-3deg] p-6">
                  <p className="v3-hand text-[26px] leading-none text-ink">What fuels me</p>
                  <ul className="mt-3 space-y-1.5">
                    {OFF_CLOCK.map((o) => <li key={o} className="v3-hand text-[21px] leading-tight text-ink/70">{o}</li>)}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="group block w-[170px] rotate-[4deg] bg-[#FFD95C] p-5 shadow-[0_18px_30px_-18px_rgba(60,40,10,0.6)] transition-transform duration-300 hover:rotate-0 hover:scale-105">
                  <p className="v3-hand text-[28px] leading-[1.05] text-ink">Say hi on WhatsApp</p>
                  <MessageCircle className="mt-3 h-6 w-6 text-ink transition-transform duration-300 group-hover:scale-125" />
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
