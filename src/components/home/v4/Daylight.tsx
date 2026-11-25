import { Phone } from 'lucide-react';
import LeadForm, { type LeadMode } from '../../LeadForm';
import { WhatsAppLogo } from '../../BrandIcons';
import { WHATSAPP_URL, CALL_URL, PHONE_DISPLAY } from '../../../utils/contactLinks';

export default function Daylight({ mode, onModeChange }: { mode: LeadMode; onModeChange: (m: LeadMode) => void }) {
  return (
    <section id="next-step" aria-labelledby="next-title" className="relative overflow-hidden py-24 text-white md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,470px)] lg:gap-20">
        <div className="lg:pt-4">
          <h2 id="next-title" className="n-chosen">Be the one they <span className="n-glow">choose.</span></h2>
          <p className="mt-8 max-w-[40ch] text-[19px] leading-relaxed text-white/75">
            Send us your website, or tell us about your business if you don't have one yet. The audit is free, and so is the plan.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <img src="/founder/portrait.webp" alt="" width={1100} height={1258} loading="lazy" className="h-14 w-14 rounded-full object-cover object-[50%_22%] ring-2 ring-brand" />
            <p className="text-[16px] leading-snug text-white/80"><span className="v3-hand text-[26px] text-white">Burhan</span><br />reads every message himself.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-brand px-5 py-3.5 text-[15px] font-bold text-ink hover:bg-white">
              <WhatsAppLogo className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <a href={CALL_URL} className="inline-flex items-center gap-2.5 rounded-full border border-white/30 px-5 py-3 text-[15px] font-semibold text-white hover:bg-white/10">
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
