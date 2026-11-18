import PageLink from '../components/PageLink';
import LeadForm from '../components/LeadForm';
import { PageId } from '../types';
import { WHATSAPP_URL, CALL_URL, EMAIL_URL, EMAIL } from '../utils/contactLinks';
import { GOOGLE_PROFILE_URL, GOOGLE_REVIEW_URL } from './googleReviews';

interface StudioFooterProps {
  onPageChange: (page: PageId) => void;
}

/** The last word: a giant "Let's talk", the audit form, then the footer. */
export default function StudioFooter({ onPageChange }: StudioFooterProps) {
  const go = (page: PageId) => { onPageChange(page); window.scrollTo({ top: 0 }); };
  const link = (page: PageId, label: string) => <PageLink page={page} onNavigate={() => go(page)}>{label}</PageLink>;

  return (
    <footer id="audit" className="studio st-final st-dark st-grain" style={{ scrollMarginTop: 0 }}>
      <span className="st-float" style={{ width: 220, height: 220, background: 'var(--ember)', left: '-150px', top: '72%' }} aria-hidden="true" />
      <span className="st-float" style={{ width: 140, height: 140, background: 'var(--lime)', right: '6%', top: '12%', borderRadius: '0 0 0 100%' }} aria-hidden="true" />
      <span className="st-float" style={{ width: 90, height: 90, background: 'var(--peri)', right: '38%', bottom: '18%' }} aria-hidden="true" />

      <div className="st-wrap" style={{ paddingTop: 'clamp(110px, 12vw, 180px)', position: 'relative', zIndex: 3 }}>
        <div className="st-mono" style={{ color: 'var(--muted-dark)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
          <span className="st-dot" aria-hidden="true" />Reply within one business day
        </div>
        <h2 className="st-xl st-talk">
          <span className="st-stretch">Let’s</span> <span className="st-serif" style={{ color: 'var(--lime)' }}>talk.</span>
        </h2>

        <div className="st-split" style={{ alignItems: 'start', marginTop: 'clamp(48px, 6vw, 80px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <p className="st-lede" style={{ color: 'var(--body-dark)', maxWidth: 460 }}>
              Find out what your website is costing you. Send your site, or tell us you don’t have one yet. You get a free, plain-English audit or a plan for your first website. No obligation.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="st-btn st-btn-ghost">WhatsApp us</a>
              <a href={CALL_URL} className="st-btn st-btn-ghost">Call +91 90992 45605</a>
            </div>
          </div>
          <div className="st-form-card">
            <LeadForm idPrefix="home" source="Homepage" />
          </div>
        </div>

        <div className="st-foot st-g4">
          <div>
            <div className="st-mono" style={{ color: 'var(--muted-dark)', marginBottom: 8 }}>Studio</div>
            Mago Labs<br />Nanpura, Surat 395001, India<br />Mon to Sat, 9am to 7pm IST<br />
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener">Find us on Google Maps ↗</a>
          </div>
          <div>
            <div className="st-mono" style={{ color: 'var(--muted-dark)', marginBottom: 8 }}>Contact</div>
            <a href={EMAIL_URL}>{EMAIL}</a><br />
            <a href={CALL_URL}>+91 90992 45605</a><br />
            <a href={WHATSAPP_URL} target="_blank" rel="noopener">WhatsApp</a>
          </div>
          <div>
            <div className="st-mono" style={{ color: 'var(--muted-dark)', marginBottom: 8 }}>Explore</div>
            {link('work', 'Work')} · {link('services', 'Services')} · {link('pricing', 'Pricing')}<br />
            {link('about', 'About')} · {link('insights', 'Insights')} · {link('contact', 'Contact')}<br />
            {link('agencies', 'For agencies')} · <a href="https://trades.magolabs.in">Outside India ↗</a>
          </div>
          <div>
            <div className="st-mono" style={{ color: 'var(--muted-dark)', marginBottom: 8 }}>Follow</div>
            <a href="https://www.instagram.com/magolabs.in/" target="_blank" rel="noopener">Instagram</a> · <a href="https://www.linkedin.com/in/burhanuddinkapasi/" target="_blank" rel="noopener">LinkedIn</a><br />
            <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener" style={{ color: 'var(--lime)' }}>Leave us a Google review ↗</a>
          </div>
        </div>

        <div className="st-legal" style={{ paddingBottom: 40 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <span className="st-footmark"><img src="/logo.png" alt="Mago Labs" width={300} height={200} loading="lazy" /></span>
            © 2026 Mago Labs. Registered in India.
          </span>
          <span>{link('privacy', 'Privacy')} · {link('terms', 'Terms')} · {link('sitemap', 'Sitemap')}</span>
        </div>
      </div>
    </footer>
  );
}
