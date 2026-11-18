import PageLink from '../components/PageLink';
import LeadForm from '../components/LeadForm';
import { PageId } from '../types';
import { WHATSAPP_URL, CALL_URL, EMAIL_URL, EMAIL } from '../utils/contactLinks';

interface StudioFooterProps {
  onPageChange: (page: PageId) => void;
}

const GOOGLE_PROFILE = 'https://maps.app.goo.gl/fnTiihMdcem2z4fn7';
const GOOGLE_REVIEW = 'https://g.page/r/CXyj1A87sv2BEBM/review';

/** The final call to action with the audit form, then the footer, in one dark panel. */
export default function StudioFooter({ onPageChange }: StudioFooterProps) {
  const go = (page: PageId) => {
    onPageChange(page);
    window.scrollTo({ top: 0 });
  };
  const link = (page: PageId, label: string) => (
    <PageLink page={page} onNavigate={() => go(page)}>{label}</PageLink>
  );

  return (
    <footer className="studio st-final">
      <div id="audit" className="st-panel st-on-dark" style={{ scrollMarginTop: 80 }}>
        <div className="st-wrap">
          <div className="st-split" style={{ alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <div className="st-mono" style={{ color: 'var(--muted-dark)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="st-dot" aria-hidden="true" />Reply within one business day
              </div>
              <h2 style={{ margin: 0, fontSize: 'clamp(40px, 5vw, 76px)', lineHeight: 0.94, letterSpacing: '-0.055em' }}>
                Find out what your website is <span className="st-serif" style={{ color: 'var(--accent-on-dark)' }}>costing you.</span>
              </h2>
              <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: '#CFCBC2', maxWidth: 460 }}>
                Send your website, or tell us you don’t have one yet. You get a free, plain-English audit or a plan for your first site. No obligation.
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
              <a href={GOOGLE_PROFILE} target="_blank" rel="noopener">Find us on Google Maps ↗</a>
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
              <a href="https://www.instagram.com/magolabs.in/" target="_blank" rel="noopener">Instagram</a> ·{' '}
              <a href="https://www.linkedin.com/in/burhanuddinkapasi/" target="_blank" rel="noopener">LinkedIn</a><br />
              <a href={GOOGLE_REVIEW} target="_blank" rel="noopener" style={{ color: 'var(--accent-on-dark)' }}>Leave us a Google review ↗</a>
            </div>
          </div>

          <div className="st-legal" style={{ marginTop: 48 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              <span className="st-footmark"><img src="/logo.png" alt="Mago Labs" width={300} height={200} loading="lazy" /></span>
              © 2026 Mago Labs. Registered in India.
            </span>
            <span>{link('privacy', 'Privacy')} · {link('terms', 'Terms')} · {link('sitemap', 'Sitemap')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
