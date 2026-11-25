import { ArrowDown, ArrowUpRight } from 'lucide-react';
import PageLink from '../../PageLink';
import BgVideo from '../BgVideo';


export default function NightHero({ onAudit }: { onAudit: () => void }) {
  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden text-white">
      <div aria-hidden="true" className="absolute inset-0">
        <BgVideo name="street" className="absolute inset-0 h-full w-full opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,23,51,0.7),rgba(10,23,51,0.45)_40%,rgba(10,23,51,0.96))]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 pt-32 md:px-8">
        <p className="n-in flex items-center gap-3 text-[15px] text-white/70" style={{ animationDelay: '0.1s' }}>
          <img src="/founder/portrait.webp" alt="" width={1100} height={1258} className="h-10 w-10 rounded-full object-cover object-[50%_22%] ring-2 ring-brand" />
          <span>Hi, I'm Burhan. I build websites from Surat.</span>
        </p>
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

    </section>
  );
}
