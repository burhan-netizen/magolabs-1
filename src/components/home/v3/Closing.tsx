import { Phone } from 'lucide-react';
import LeadForm, { type LeadMode } from '../../LeadForm';
import { WhatsAppLogo } from '../../BrandIcons';
import { WHATSAPP_URL, CALL_URL, PHONE_DISPLAY } from '../../../utils/contactLinks';
import BgVideo from '../BgVideo';

export default function Closing({ mode, onModeChange }: { mode: LeadMode; onModeChange: (m: LeadMode) => void }) {
  return (
    <section id="next-step" aria-labelledby="next-title" className="relative isolate overflow-hidden bg-navy py-24 text-white md:py-32">
      <BgVideo name="street" className="absolute inset-0 -z-10 h-full w-full opacity-35" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,23,51,0.92),rgba(10,23,51,0.8))]" />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-20">
        <div className="lg:pt-6">
          <p className="v3-label text-white/55">The risk in waiting</p>
          <h2 id="next-title" className="v3-h2 mt-4 text-white">Every day you wait, someone picks the business <span className="text-brand">next door.</span></h2>
          <p className="mt-7 max-w-[44ch] text-[18px] leading-relaxed text-white/75">
            Your customers are searching right now. Send us your website, or tell us about your business if you don't have one yet.
          </p>
          <ul className="mt-9 space-y-3 text-[16px] text-white/85">
            {['Free audit or website plan, no obligation', 'A fixed quote before any work starts', 'Live in 5 to 28 days, and you own everything'].map((t) => (
              <li key={t} className="flex items-center gap-3"><span className="h-2 w-2 rotate-45 bg-brand" />{t}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-5 py-3 text-[15px] font-semibold text-[#06301A] hover:brightness-105">
              <WhatsAppLogo className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <a href={CALL_URL} className="inline-flex items-center gap-2.5 rounded-full border border-white/25 px-5 py-3 text-[15px] font-semibold text-white hover:bg-white/10">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <div className="rounded-[28px] bg-white p-6 text-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] md:p-8">
          <LeadForm idPrefix="home" source="Homepage" mode={mode} onModeChange={onModeChange} />
        </div>
      </div>
    </section>
  );
}
