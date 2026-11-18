import { useEffect, useRef, useState } from 'react';
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

/** A floating pill nav that tucks away while you scroll down and returns when you scroll up. */
export default function StudioNav({ onPageChange }: StudioNavProps) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 240) setHidden(false);
      lastY.current = y;
    };
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
      <header className={`studio st-nav${hidden && !open ? ' hide' : ''}`}>
        <nav aria-label="Main" className="st-nav-inner">
          <PageLink page="home" onNavigate={() => go('home')} className="st-logo" aria-label="Mago Labs home">
            <img src="/logo.png" alt="Mago Labs" width={300} height={200} />
          </PageLink>
          <div className="st-navlinks">
            {LINKS.map((l) => (
              <PageLink key={l.page} page={l.page} onNavigate={() => go(l.page)}>{l.label}</PageLink>
            ))}
            <a href="https://trades.magolabs.in">Outside India? ↗</a>
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
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2 6h14M2 12h14" />}
            </svg>
          </button>
        </nav>
        <div id="st-mobile-menu" className={`st-mobile-menu${open ? ' open' : ''}`}>
          {LINKS.map((l) => (
            <PageLink key={l.page} page={l.page} onNavigate={() => go(l.page)} className="big">{l.label}</PageLink>
          ))}
          <a href="https://trades.magolabs.in" style={{ marginTop: 8 }}>Outside India? ↗</a>
          <a href="#audit" className="st-btn st-btn-primary" style={{ marginTop: 14 }} onClick={() => setOpen(false)}>Get a free website audit</a>
        </div>
      </header>

      <div className="studio st-mbar">
        <a href={WHATSAPP_URL} target="_blank" rel="noopener" className="st-btn st-btn-ghost" aria-label="Chat with Mago Labs on WhatsApp">WhatsApp</a>
        <a href="#audit" className="st-btn st-btn-primary">Free website audit</a>
      </div>
    </>
  );
}
