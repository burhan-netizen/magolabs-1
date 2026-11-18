import { useEffect, useState } from 'react';
import PageLink from '../components/PageLink';
import { PageId } from '../types';
import { WHATSAPP_URL } from '../utils/contactLinks';

interface StudioNavProps {
  onPageChange: (page: PageId) => void;
}

const LINKS: { page: PageId; label: string }[] = [
  { page: 'work', label: 'Work' },
  { page: 'services', label: 'Services' },
  { page: 'pricing', label: 'Pricing' },
  { page: 'about', label: 'About' },
  { page: 'insights', label: 'Insights' },
];

/** Proof that sits above everything: real, attributed client results. */
const TICKER = [
  'Dr. Mihir Shah Smile Care · 25 → 58 patients a day',
  'Darshan Galani & Co. · 34 new clients in 3 months',
  'Jaymo Civil, Sydney · new website live',
  'Ladson Concrete, Florida · new website live',
  '5.0 on Google · 8 reviews',
];

export default function StudioNav({ onPageChange }: StudioNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (page: PageId) => {
    setOpen(false);
    onPageChange(page);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <div className="studio st-ticker" aria-label="Recent client results">
        <div className="st-ticker-track st-mono">
          {[0, 1].map((copy) =>
            TICKER.map((item, i) => (
              <span key={`${copy}-${i}`} aria-hidden={copy === 1 ? true : undefined} style={{ display: 'inline-flex', gap: 48 }}>
                <span>{item}</span>
                <span className="sep" aria-hidden="true">/</span>
              </span>
            ))
          )}
        </div>
      </div>

      <header className={`studio st-nav${scrolled ? ' scrolled' : ''}`}>
        <nav aria-label="Main" className="st-wrap st-nav-inner">
          <PageLink page="home" onNavigate={() => go('home')} className="st-logo" aria-label="Mago Labs home">
            <img src="/logo.png" alt="Mago Labs" width={300} height={200} />
          </PageLink>

          <div className="st-navlinks">
            {LINKS.map((l) => (
              <PageLink key={l.page} page={l.page} onNavigate={() => go(l.page)}>
                {l.label}
              </PageLink>
            ))}
            <a href="https://trades.magolabs.in" className="muted">Outside India? ↗</a>
          </div>

          <a href="#audit" className="st-btn st-btn-primary st-btn-sm st-nav-cta">Free website audit</a>

          <button
            type="button"
            className="st-menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="st-mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2 6h14M2 12h14" />}
            </svg>
          </button>
        </nav>

        <div id="st-mobile-menu" className={`st-mobile-menu${open ? ' open' : ''}`}>
          {LINKS.map((l) => (
            <PageLink key={l.page} page={l.page} onNavigate={() => go(l.page)}>
              {l.label}
            </PageLink>
          ))}
          <a href="https://trades.magolabs.in">Outside India? ↗</a>
          <a href="#audit" className="st-btn st-btn-primary" style={{ marginTop: 12, fontSize: 16, color: '#fff' }} onClick={() => setOpen(false)}>
            Get a free website audit
          </a>
        </div>
      </header>

      {/* Phones: the two ways to get in touch, always one tap away. */}
      <div className="studio st-mbar">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="st-btn st-btn-ghost" aria-label="Chat with Mago Labs on WhatsApp">WhatsApp</a>
        <a href="#audit" className="st-btn st-btn-primary">Free website audit</a>
      </div>
    </>
  );
}
