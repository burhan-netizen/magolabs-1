import { ArrowDown, ArrowUpRight } from 'lucide-react';
import PageLink from '../../PageLink';
import BgVideo from '../BgVideo';

/* Five client sites, waiting in the dark like shop windows. They switch on, one
   after another, when the page opens. */
const WINDOWS = ['drmihirshah', 'ladsonconcrete', 'darshangalani', 'jaymocivil', 'centurion'];

export default function NightHero({ onAudit }: { onAudit: () => void }) {
  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden text-white">
      <div aria-hidden="true" className="absolute inset-0">
        <BgVideo name="street" className="absolute inset-0 h-full w-full opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,18,0.55),rgba(7,10,18,0.35)_40%,rgba(7,10,18,0.95))]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-10 pt-32 md:px-8">
        <p className="n-in text-[14px] font-semibold uppercase tracking-[0.14em] text-white/45" style={{ animationDelay: '0.1s' }}>Website studio, Surat</p>
        <h1 className="n-h1 mt-6 max-w-[15ch]">
          <span className="n-in block" style={{ animationDelay: '0.2s' }}>Right now, someone is searching for what you do.</span>
          <span className="n-in mt-2 block text-white/35" style={{ animationDelay: '0.45s' }}>Most of them never find you.</span>
        </h1>
        <div className="n-in mt-10 flex flex-wrap items-center gap-5" style={{ animationDelay: '0.7s' }}>
          <PageLink page="contact" onNavigate={onAudit} className="group inline-flex items-center gap-3 rounded-full bg-brand py-3.5 pl-6 pr-3.5 text-[16px] font-bold text-ink shadow-[0_0_40px_rgba(255,197,61,0.35)] transition-shadow hover:shadow-[0_0_60px_rgba(255,197,61,0.6)]">
            Get found. Free website audit
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-brand transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight className="h-4 w-4" /></span>
          </PageLink>
          <a href="#lights" className="inline-flex items-center gap-2 text-[15px] font-medium text-white/60 hover:text-white">
            Watch the lights come on <ArrowDown className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* The dark shop windows */}
      <div aria-hidden="true" className="relative z-10 mx-auto mb-[-3vw] grid w-full max-w-[1500px] grid-cols-5 items-end gap-[1.4vw] px-[2vw]">
        {WINDOWS.map((id, i) => (
          <div key={id} className="n-window" style={{ animationDelay: `${1 + i * 0.35}s`, transform: `translateY(${[34, 12, 0, 12, 34][i]}px)` }}>
            <img src={`/screenshots/${id}.webp`} alt="" width={900} height={422} loading="eager" className="block aspect-[1920/900] w-full rounded-t-[10px] object-cover object-top" />
          </div>
        ))}
      </div>
    </section>
  );
}
