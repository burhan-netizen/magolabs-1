import ScrollFillText from '../ScrollFillText';
import Reveal from '../Reveal';
import BgVideo from '../BgVideo';

/* The light arrives with the person behind the work. */
export default function Dawn() {
  return (
    <section id="founder" aria-labelledby="founder-title" className="relative overflow-x-clip py-24 text-white md:py-36">
      <BgVideo name="dust" className="absolute inset-0 h-full w-full opacity-30 mix-blend-screen invert" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <Reveal>
          <figure className="relative">
            <div aria-hidden="true" className="absolute -inset-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,197,61,0.3),transparent)] blur-2xl" />
            <img src="/founder/portrait.webp" alt="Burhan Kapasi, founder of Mago Labs" width={1100} height={1258} loading="lazy" className="relative aspect-[4/5] w-full rounded-[28px] object-cover object-[50%_20%]" />
            <figcaption className="relative mt-4 text-[15px] text-white/70">Burhan Kapasi, founder</figcaption>
          </figure>
        </Reveal>
        <div>
          <h2 id="founder-title" className="n-h2">Built by a person, not a factory.</h2>
          <ScrollFillText
            as="p"
            dim={0.22}
            className="mt-10 text-[clamp(1.35rem,2.2vw,1.9rem)] font-medium leading-[1.4] tracking-[-0.01em]"
            text="I spent 8 years in banking and fintech, then left to build websites. My first client had been turned away by agency after agency because of his budget. I built him more than he asked for, at a price he could afford. He told me I took all his worries away, and he still sends people my way. Every project since gets the same care."
          />
        </div>
      </div>
    </section>
  );
}
