import { ArrowUpRight } from 'lucide-react';
import { TESTIMONIALS } from '../../../data/testimonials';
import Reveal from '../Reveal';

const PICK = ['john-mouawad', 'darshan-galani', 'mihir-shah', 'smit-antala', 'jay-mehta', 'juhi-bais', 'harshit-chopra', 'manav-shah'];
const LOGO: Record<string, string> = {
  jaymocivil: 'jaymocivil', darshangalani: 'darshangalani', drmihirshah: 'drmihirshah', jaymehta: 'jaymehta', centurion: 'centurion', santoshtimbers: 'santoshtimbers', solway: 'solway',
};

export default function ClientWords() {
  const list = PICK.map((id) => TESTIMONIALS.find((t) => t.id === id)).filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <section aria-labelledby="words-title" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="v3-label">What clients say</p>
            <h2 id="words-title" className="v3-h2 mt-4 max-w-[18ch]">Technology changes. <span className="text-ink/40">People still matter.</span></h2>
          </div>
          <a href="https://maps.app.goo.gl/fnTiihMdcem2z4fn7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink underline decoration-ink/25 underline-offset-[6px] hover:decoration-ink">
            Read our Google reviews <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 columns-1 gap-5 md:columns-2 lg:columns-3">
          {list.map((t, i) => {
            const logo = t.caseStudyId ? LOGO[t.caseStudyId] : undefined;
            const big = i === 0;
            return (
              <Reveal key={t.id} delay={(i % 3) * 0.06} className="mb-5 break-inside-avoid">
                <figure className={`rounded-[24px] p-7 md:p-8 ${big ? 'bg-navy text-white' : 'bg-[#F4F3EF] text-ink'}`}>
                  <svg viewBox="0 0 32 24" className={`h-6 w-8 ${big ? 'text-brand' : 'text-ink/20'}`} fill="currentColor" aria-hidden="true">
                    <path d="M0 24V14C0 6 4 1 12 0l1 4c-4 1-6 4-6 8h6v12H0zm19 0V14c0-8 4-13 12-14l1 4c-4 1-6 4-6 8h6v12H19z" />
                  </svg>
                  <blockquote className={`mt-5 leading-relaxed ${big ? 'text-[20px] font-medium' : 'text-[16px] text-ink/80'}`}>{t.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {logo ? (
                      <img src={`/logos/sm/${logo}.webp`} alt="" width={44} height={44} loading="lazy" className="h-11 w-11 rounded-full bg-white object-contain p-1 ring-1 ring-black/5" />
                    ) : (
                      <span className="flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-bold text-white" style={{ background: t.accent }}>{t.initials}</span>
                    )}
                    <span>
                      <span className="block text-[15px] font-bold">{t.name}</span>
                      <span className={`block text-[13px] ${big ? 'text-white/60' : 'text-ink/55'}`}>{t.role}, {t.company}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
