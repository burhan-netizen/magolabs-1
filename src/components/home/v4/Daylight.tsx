import { Phone } from 'lucide-react';
import LeadForm, { type LeadMode } from '../../LeadForm';
import { WhatsAppLogo } from '../../BrandIcons';
import { WHATSAPP_URL, CALL_URL, PHONE_DISPLAY } from '../../../utils/contactLinks';

export default function Daylight({ mode, onModeChange }: { mode: LeadMode; onModeChange: (m: LeadMode) => void }) {
  return (
    <section id="next-step" aria-labelledby="next-title" className="relative bg-brand py-24 text-ink md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,470px)] lg:gap-20">
        <div className="lg:pt-4">
          <h2 id="next-title" className="n-chosen">Be the one they choose.</h2>
          <p className="mt-8 max-w-[40ch] text-[19px] leading-relaxed text-ink/75">
            Send us your website, or tell us about your business if you don't have one yet. The audit is free, and so is the plan.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 rounded-full bg-ink px-5 py-3.5 text-[15px] font-semibold text-white hover:bg-black">
              <WhatsAppLogo className="h-5 w-5 text-[#25D366]" /> Chat on WhatsApp
            </a>
            <a href={CALL_URL} className="inline-flex items-center gap-2.5 rounded-full border-2 border-ink px-5 py-3 text-[15px] font-semibold text-ink hover:bg-ink hover:text-white">
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
        <div className="rounded-[28px] bg-white p-6 shadow-[0_40px_80px_-40px_rgba(90,60,0,0.6)] md:p-8">
          <LeadForm idPrefix="home" source="Homepage" mode={mode} onModeChange={onModeChange} />
        </div>
      </div>
    </section>
  );
}
