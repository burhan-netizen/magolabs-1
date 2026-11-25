import { TESTIMONIALS } from '../../../data/testimonials';
import Reveal from '../Reveal';

const PICK = ['john-mouawad', 'darshan-galani', 'smit-antala'];
const STEPS = [
  { t: 'Free audit', d: 'We tell you plainly what is keeping you invisible.' },
  { t: 'Fixed quote', d: 'Pages, words and price agreed before anything starts.' },
  { t: 'Design and build', d: 'You approve the design, then we build it.' },
  { t: 'Live in 5 to 28 days', d: 'You own everything. We stay one WhatsApp away.' },
];

export default function Morning() {
  const quotes = PICK.map((id) => TESTIMONIALS.find((t) => t.id === id)).filter((t): t is NonNullable<typeof t> => Boolean(t));
  return (
    <section id="proof" aria-labelledby="proof-title" className="relative rounded-t-[32px] bg-[#F5F4F0] py-24 text-ink md:rounded-t-[48px] md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <h2 id="proof-title" className="n-h2 max-w-[18ch]">Good morning. You've been found.</h2>
        <p className="mt-6 max-w-[46ch] text-[18px] leading-relaxed text-ink/65">What our clients say after the lights come on.</p>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.id} delay={i * 0.08} className="h-full">
              <figure className="flex h-full flex-col rounded-[24px] bg-white p-8 shadow-[0_30px_60px_-40px_rgba(10,23,51,0.35)]">
                <blockquote className="flex-1 text-[17px] leading-relaxed text-ink/80">"{q.quote}"</blockquote>
                <figcaption className="mt-7 border-t border-ink/10 pt-5">
                  <span className="block text-[15px] font-bold">{q.name}</span>
                  <span className="block text-[13px] text-ink/55">{q.role}, {q.company}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <h3 className="n-h3">How the lights come on</h3>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-[24px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className="bg-white p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[14px] font-bold text-ink">{i + 1}</span>
                <p className="mt-5 text-[19px] font-bold tracking-[-0.01em]">{s.t}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/65">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
