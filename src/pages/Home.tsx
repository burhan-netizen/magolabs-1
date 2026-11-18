import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import PageLink from '../components/PageLink';
import CountUp from '../components/CountUp';
import Price from '../components/Price';
import { PACKAGES } from '../data/packages';
import { TESTIMONIALS } from '../data/testimonials';
import { getWorkDetailPath } from '../utils/pageRoutes';
import { GOOGLE_PROFILE_URL, GOOGLE_RATING, GOOGLE_REVIEWS } from '../studio/googleReviews';

/* ---------------------------------------------------------------------------
   Mago Labs homepage, Direction 02 "Studio Play".
   Story: promise, proof, the problem, the work, results, who it is for, how it
   works, why us, prices, the founder, every client's words, questions, next step.
   House style: short sentences, plain words, written to "you". No em dashes.
--------------------------------------------------------------------------- */

interface HomeProps {
  onPageChange: (page: PageId) => void;
  onOpenCaseStudy: (id: string) => void;
}

type ShapeKind = 'circle' | 'half' | 'quarter' | 'ring' | 'pill' | 'split' | 'square' | 'dots' | 'arch';

function Shape({ kind, color, style }: { kind: ShapeKind; color: string; style?: CSSProperties }) {
  return <span className={`sh sh-${kind}`} style={{ background: color, color, ...style }} aria-hidden="true" />;
}

const TILES: { bg: string; sh: ShapeKind; c: string; back?: string }[] = [
  { bg: 'var(--accent)', sh: 'circle', c: 'var(--lime)' },
  { bg: 'var(--paper)', sh: 'quarter', c: 'var(--ember)', back: 'drmihirshah' },
  { bg: 'var(--ink-3)', sh: 'ring', c: 'var(--peri)' },
  { bg: 'var(--lime)', sh: 'half', c: 'var(--ink)' },
  { bg: 'var(--ember)', sh: 'arch', c: 'var(--paper)', back: 'jaymocivil' },
  { bg: 'var(--peri)', sh: 'dots', c: 'var(--accent)' },
  { bg: 'var(--paper)', sh: 'split', c: 'var(--accent)' },
  { bg: 'var(--ink-3)', sh: 'circle', c: 'var(--ember)', back: 'ladsonconcrete' },
  { bg: 'var(--lime)', sh: 'square', c: 'var(--accent)' },
  { bg: 'var(--accent)', sh: 'pill', c: 'var(--paper)', back: 'darshangalani' },
  { bg: 'var(--paper)', sh: 'ring', c: 'var(--ink)' },
  { bg: 'var(--ember)', sh: 'quarter', c: 'var(--lime)' },
  { bg: 'var(--ink-3)', sh: 'half', c: 'var(--lime)', back: 'centurion' },
  { bg: 'var(--peri)', sh: 'circle', c: 'var(--ink)' },
  { bg: 'var(--accent)', sh: 'split', c: 'var(--peri)', back: 'prabhakarprocessors' },
  { bg: 'var(--paper)', sh: 'dots', c: 'var(--ember)' },
];

const BAND_1 = ['Websites that win the call', '25 → 58 patients a day', '34 new clients in 3 months', '5.0 on Google', '6 countries'];
const BAND_2 = ['Design', 'Build', 'SEO', 'Copy', 'Google Profile', 'Social', 'Ads'];

const PROBLEMS: { title: string; desc: string; bg: string; sh: ShapeKind; c: string }[] = [
  { title: 'Visitors can’t tell what you do.', desc: 'They land, get confused and leave before they call. You never even know they were there.', bg: 'var(--lime)', sh: 'circle', c: 'var(--accent)' },
  { title: 'Nothing proves you’re good.', desc: 'No reviews, results or real work on the page means no reason to pick you over the next search result.', bg: 'var(--peri)', sh: 'quarter', c: 'var(--ink)' },
  { title: 'It looks older than your business.', desc: 'Next to a competitor’s new site, a dated one quietly costs you the job, even when your work is better.', bg: 'var(--ember)', sh: 'ring', c: 'var(--paper)' },
  { title: 'Google can’t find you.', desc: 'Or there’s no website at all, and the customer who searched for you finds the business next door.', bg: 'var(--paper)', sh: 'half', c: 'var(--accent)' },
];

const WORK = [
  { id: 'drmihirshah', name: 'Dr. Mihir Shah Smile Care', tag: 'Dental · Surat', big: '25→58', small: 'patients a day, within two months of launch', desc: 'A polished site with online booking for a second clinic, built to turn 25 years of experience into trust a first-time visitor can feel.' },
  { id: 'darshangalani', name: 'Darshan Galani & Co.', tag: 'Chartered accountants', big: '34', small: 'new clients in the first three months', desc: 'A first website for a CA practice that had never had one. Enquiries started arriving through Google for the first time.' },
  { id: 'jaymocivil', name: 'Jaymo Civil', tag: 'Excavation & civil · Sydney', big: 'SYD', small: 'built to win builder and developer enquiries', desc: 'A website that matches the size of the jobs they take on. Builders see real work, real clients and a clear way to get a quote.' },
  { id: 'ladsonconcrete', name: 'Ladson Concrete', tag: 'Concrete · Jacksonville, FL', big: 'USA', small: 'website and Google Business Profile', desc: 'A Jacksonville concrete contractor, set up to be found on Google and to turn local searches into quote requests.' },
  { id: 'centurion', name: 'Centurion Strategic Ventures', tag: 'Loan advisory · India', big: 'FIN', small: 'one-page site for a lending consultancy', desc: 'A loan advisory firm, presented with the credibility its clients look for before the first call.' },
];

const INDUSTRIES: { name: string; page?: PageId; site: string; note: string; bg: string; c: string }[] = [
  { name: 'Dentists & clinics', page: 'industry-dentists', site: 'drmihirshah', note: 'Calm, credentials and easy booking.', bg: 'var(--peri)', c: 'var(--accent)' },
  { name: 'Chartered accountants', page: 'industry-ca-firms', site: 'darshangalani', note: 'Authority, clarity and ICAI-friendly content.', bg: 'var(--lime)', c: 'var(--ink)' },
  { name: 'Textile & processing', page: 'industry-textile', site: 'prabhakarprocessors', note: 'Capacity, processes and buyer confidence.', bg: 'var(--ember)', c: 'var(--paper)' },
  { name: 'Manufacturing', page: 'industry-manufacturers', site: 'prabhakarprocessors', note: 'Products, plant and proof for serious buyers.', bg: 'var(--accent)', c: 'var(--lime)' },
  { name: 'Financial services', site: 'centurion', note: 'Trust first, then a clear next step.', bg: 'var(--paper)', c: 'var(--accent)' },
  { name: 'Contractors & construction', site: 'jaymocivil', note: 'Real jobs, service areas and fast quotes.', bg: 'var(--ember)', c: 'var(--ink)' },
  { name: 'Consulting & IT', page: 'industry-consultants', site: 'astrabizz', note: 'Expertise made easy to understand.', bg: 'var(--peri)', c: 'var(--ink)' },
  { name: 'Solar & energy', site: 'solway', note: 'Credibility for big-ticket B2B decisions.', bg: 'var(--lime)', c: 'var(--accent)' },
  { name: 'Trading & distribution', site: 'santoshtimbers', note: 'Scale and catalogue for bulk buyers.', bg: 'var(--accent)', c: 'var(--peri)' },
  { name: 'Online stores & brands', site: 'momrise', note: 'Pages built to sell, not just to look nice.', bg: 'var(--paper)', c: 'var(--ember)' },
];

const ALONGSIDE: { name: string; page?: PageId }[] = [
  { name: 'SEO', page: 'service-seo' },
  { name: 'Google Business Profile', page: 'service-gbp' },
  { name: 'Copywriting', page: 'service-copywriting' },
  { name: 'Social media', page: 'service-social-media' },
  { name: 'Paid ads', page: 'service-paid-ads' },
  { name: 'Lead generation', page: 'service-lead-generation' },
  { name: 'Website care' },
];

const STEPS = [
  { title: 'Free audit', desc: 'Send your website, or just your business name if you don’t have one. You get plain-English findings within one business day.' },
  { title: 'Fixed quote', desc: 'Scope, price and launch date agreed and signed before any work starts. No surprises later.' },
  { title: 'Design & build', desc: 'Designed and hand-coded for your business, with copy written to win the call. Live in 5 to 28 days.' },
  { title: 'Launch & support', desc: 'Hosting included, set up for Google, then 90 days of support after you go live.' },
];

const COMPARE = [
  { row: 'Designed for', us: 'Your business, from scratch', template: 'Whoever bought the theme', agency: 'Your business' },
  { row: 'Price', us: 'Fixed quote, from ₹17,999', template: 'Cheap, then add-ons', agency: 'Premium, plus retainers' },
  { row: 'Time to launch', us: '5 to 28 days', template: 'Fast, but looks like everyone', agency: 'Months' },
  { row: 'Who you talk to', us: 'The founder, directly', template: 'A support ticket', agency: 'An account manager' },
  { row: 'After launch', us: '90 days support, hosting included', template: 'You’re on your own', agency: 'Billed by the hour' },
];

const PACKAGE_DESC: Record<string, string> = {
  launch: 'Up to 5 pages. A professional presence, fast.',
  growth: 'Up to 10 pages with a content editor. Built to generate enquiries.',
  scale: '15+ pages. A premium presence for bigger firms.',
  commerce: 'An online store with up to 50 products to start.',
};
const PACKAGE_SHAPE: Record<string, { sh: ShapeKind; c: string }> = {
  launch: { sh: 'circle', c: 'var(--lime)' },
  growth: { sh: 'quarter', c: 'var(--accent)' },
  scale: { sh: 'ring', c: 'var(--ember)' },
  commerce: { sh: 'half', c: 'var(--peri)' },
};

export const FAQS = [
  { q: 'What do I get in the free audit?', a: 'A short, plain-English review of your website, or of your Google presence if you have no site yet: what stops visitors from calling, how you show up on Google, and what we would fix first. It arrives within one business day and there is no obligation.' },
  { q: 'How much does a website cost?', a: 'In India, packages start at ₹17,999 (Launch), ₹29,999 (Growth), ₹49,999 (Scale) and ₹64,999 (Commerce). Overseas prices start at $799 and show in your own currency. You get a fixed quote before any work starts, and hosting is included.' },
  { q: 'How long does it take?', a: '5 days for Launch, 14 for Growth, 21 for Scale and 28 for an online store, counted from when we have your content and your sign-off on the plan.' },
  { q: 'Will my website rank on Google?', a: 'Every site is built with the SEO groundwork done properly: fast pages, clean structure, local search setup and content written around what your customers search for. Rankings still take time, and anyone who promises you the top spot is guessing. We can also run ongoing SEO if you want to push further.' },
  { q: 'Do you use templates or website builders?', a: 'No. Every site is designed for your business and hand-coded by us, so it looks like you, loads fast and is not shared with anyone else.' },
  { q: 'I don’t have a website yet. Where do I start?', a: 'Send us your business name and what you do. We will check how customers find you today and send you a simple plan for your first website, usually the Launch or Growth package.' },
  { q: 'Who writes the content?', a: 'We do, as part of the build. We talk to you about your business, then write copy built to earn trust and enquiries. You approve every word before launch.' },
  { q: 'Can I update the website myself?', a: 'Yes. Growth and the larger packages come with an easy content editor for text, photos and blog posts. On Launch, we handle small updates for you during the support period.' },
  { q: 'What happens after launch?', a: 'You get 90 days of support for fixes and small changes. After that you can move to a website care plan, or simply get in touch when you need something.' },
  { q: 'Do you work with businesses outside India?', a: 'Yes. We work with clients in Australia, the USA, the UK, Canada and the UAE. Prices show in your own currency and calls happen at a time that suits you.' },
  { q: 'Can you help with SEO, ads and social media too?', a: 'Yes, alongside your website: SEO, Google Business Profile, copywriting, social media management, paid ads and lead generation. Ask us for pricing on any of these.' },
];

/* ---------- small hooks ---------- */

function useSuratTime(): string | null {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' }).format(new Date());
    setTime(fmt());
    const id = window.setInterval(() => setTime(fmt()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

/** Fades blocks up as they arrive. Content is visible by default; the hidden start
 *  state only applies while this observer is running (html.st-io). */
function useReveals() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('.studio .st-reveal'));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 }
    );
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
      io.observe(el);
    });
    document.documentElement.classList.add('st-io');
    return () => { io.disconnect(); document.documentElement.classList.remove('st-io'); };
  }, []);
}

/** Lets a mouse drag the testimonial rail sideways (touch scrolls natively). */
function useDragScroll(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let down = false; let startX = 0; let startLeft = 0; let moved = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; startX = e.clientX; startLeft = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; el.classList.add('dragging'); }
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => { down = false; el.classList.remove('dragging'); };
    const onClick = (e: MouseEvent) => { if (moved) { e.preventDefault(); e.stopPropagation(); } };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    el.addEventListener('click', onClick, true);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      el.removeEventListener('click', onClick, true);
    };
  }, [ref]);
}

function Head({ label, children, aside, dark }: { label: string; children: ReactNode; aside?: ReactNode; dark?: boolean }) {
  return (
    <div className="st-row st-reveal" style={{ marginBottom: 'clamp(40px, 5vw, 72px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <span className="st-mono st-label">{label}</span>
        {children}
      </div>
      {aside && <div style={{ maxWidth: 420, color: dark ? 'var(--body-dark)' : 'var(--body)' }}>{aside}</div>}
    </div>
  );
}

type ReviewCard = { key: string; kind: 'google' | 'client'; name: string; meta: string; quote: string | null; initials: string; shape: { sh: ShapeKind; c: string } };

export default function Home({ onPageChange, onOpenCaseStudy }: HomeProps) {
  const time = useSuratTime();
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState(0);
  const [filter, setFilter] = useState<'all' | 'google' | 'client'>('all');
  useReveals();
  useDragScroll(railRef);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const root = rootRef.current;
    if (!root) return;
    import('../studio/motion').then(({ initStudioMotion }) => initStudioMotion(root)).then((fn) => {
      if (cancelled) fn(); else cleanup = fn;
    }).catch(() => undefined);
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  const go = (page: PageId) => { onPageChange(page); window.scrollTo({ top: 0 }); };
  const openCase = (id: string) => { onOpenCaseStudy(id); window.scrollTo({ top: 0 }); };

  const reviews: ReviewCard[] = useMemo(() => {
    const shapes: { sh: ShapeKind; c: string }[] = [
      { sh: 'circle', c: 'var(--lime)' }, { sh: 'quarter', c: 'var(--ember)' }, { sh: 'ring', c: 'var(--peri)' }, { sh: 'half', c: 'var(--accent)' },
    ];
    const initials = (n: string) => n.replace(/^(CA|Dr\.)\s+/i, '').split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase();
    const g: ReviewCard[] = GOOGLE_REVIEWS.map((r, i) => ({
      key: `g-${i}`, kind: 'google', name: r.name, meta: 'Google review', quote: r.quote, initials: initials(r.name), shape: shapes[i % 4],
    }));
    const c: ReviewCard[] = TESTIMONIALS.map((t, i) => ({
      key: `c-${t.id}`, kind: 'client', name: t.name, meta: `${t.role}, ${t.company}`, quote: t.quote, initials: t.initials || initials(t.name), shape: shapes[(i + 2) % 4],
    }));
    // Interleave so the rail mixes both kinds when showing everything.
    const all: ReviewCard[] = [];
    for (let i = 0; i < Math.max(g.length, c.length); i++) {
      if (g[i]) all.push(g[i]);
      if (c[i]) all.push(c[i]);
    }
    return all;
  }, []);
  const shown = reviews.filter((r) => filter === 'all' || r.kind === filter);
  const scrollRail = (dir: number) => {
    const el = railRef.current;
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 880), behavior: 'smooth' });
  };

  const activeInd = INDUSTRIES[ind];
  const indSites = Array.from(new Set(INDUSTRIES.map((x) => x.site)));

  const homeSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      'name': 'Mago Labs',
      'description': 'Independent web design studio building custom websites for clinics, CA firms, manufacturers and contractors.',
      'image': 'https://www.magolabs.in/logo.png',
      '@id': 'https://www.magolabs.in/#localbusiness',
      'url': 'https://www.magolabs.in',
      'telephone': '+91 9099245605',
      'email': 'burhan@magolabs.in',
      'priceRange': '₹17,999 to ₹64,999',
      'hasMap': GOOGLE_PROFILE_URL,
      'sameAs': [GOOGLE_PROFILE_URL, 'https://www.instagram.com/magolabs.in/', 'https://www.linkedin.com/in/burhanuddinkapasi/'],
      'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': GOOGLE_RATING, 'reviewCount': String(GOOGLE_REVIEWS.length) },
      'areaServed': ['India', 'Australia', 'United States', 'United Kingdom', 'Canada', 'United Arab Emirates'],
      'address': { '@type': 'PostalAddress', 'streetAddress': 'Flat 102, Salute Residency, Central Bank Lane, Nanpura', 'addressLocality': 'Surat', 'postalCode': '395001', 'addressRegion': 'Gujarat', 'addressCountry': 'IN' },
      'openingHoursSpecification': { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], 'opens': '09:00', 'closes': '19:00' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQS.map((f) => ({ '@type': 'Question', 'name': f.q, 'acceptedAnswer': { '@type': 'Answer', 'text': f.a } })),
    },
  ];

  return (
    <div className="studio" ref={rootRef}>
      <SEO path="/" schemas={homeSchemas} />

      {/* ================= HERO ================= */}
      <section className="st-hero st-dark st-grain">
        <div className="st-wrap st-hero-grid">
          <div>
            <div className="st-mono st-hero-meta">
              <span className="st-dot" aria-hidden="true" />
              <span>Taking new projects · Surat, India{time ? ` · ${time} IST` : ''}</span>
            </div>
            <h1 className="st-xl st-h1">
              <span className="st-line"><span className="st-stretch">Websites</span></span>
              <span className="st-line"><span className="st-stretch">that win</span></span>
              <span className="st-line"><span className="st-serif" style={{ color: 'var(--lime)' }}>the call.</span></span>
            </h1>
          </div>
          <div className="st-tiles-wrap" aria-hidden="true">
            <div className="st-tiles">
              {TILES.map((t, i) => (
                <div className="tile-slot" key={i}>
                  <div className="tile" data-back={t.back || undefined}>
                    <div className="tile-face" style={{ background: t.bg }}>
                      <Shape kind={t.sh} color={t.c} />
                    </div>
                    {t.back && (
                      <div className="tile-face tile-back">
                        <img src={`/screenshots/full/${t.back}-300.webp`} alt="" width={300} height={1219} loading="lazy" decoding="async" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="st-wrap st-hero-foot">
          <div>
            <p className="st-lede">
              Mago Labs is an independent web design studio. We design and build custom websites for clinics, CA firms, manufacturers and contractors in 6 countries, and judge every one by the enquiries it brings in.
            </p>
            <div className="st-proof">
              <span style={{ color: 'var(--lime)', letterSpacing: 2 }} aria-hidden="true">★★★★★</span>
              <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener"><b>{GOOGLE_RATING}</b> on Google · {GOOGLE_REVIEWS.length} reviews</a>
              <span aria-hidden="true">·</span>
              <span><b>75+</b> businesses</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <a href="#audit" className="st-btn st-btn-primary">Get a free website audit <span className="st-arrow" aria-hidden="true">→</span></a>
            <a href="#work" className="st-btn st-btn-ghost">See the work</a>
          </div>
        </div>
      </section>

      {/* ================= MARQUEE BAND ================= */}
      <section className="st-band" aria-label="Highlights">
        <div className="st-band-row">
          {[0, 1].map((k) => (
            <span key={k} aria-hidden={k === 1 ? true : undefined}>
              {BAND_1.map((t, i) => (<span key={t}>{t}<i className={i % 2 ? 'sq' : undefined} /></span>))}
            </span>
          ))}
        </div>
        <div className="st-band-row alt" aria-hidden="true">
          {[0, 1, 2].map((k) => (
            <span key={k}>{BAND_2.map((t) => (<span key={t}>{t}<i /></span>))}</span>
          ))}
        </div>
      </section>

      {/* ================= PROBLEM (pinned, sideways) ================= */}
      <section className="st-prob st-dark st-grain" aria-labelledby="prob-h">
        <div style={{ paddingTop: 'clamp(96px, 10vw, 140px)', paddingBottom: 'clamp(72px, 8vw, 120px)', minHeight: '100svh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="st-wrap st-prob-head">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <span className="st-mono st-label">The problem</span>
              <h2 id="prob-h" className="st-xl st-h2">Most websites <span className="st-serif" style={{ color: 'var(--peri)' }}>lose the call.</span></h2>
            </div>
            <p className="st-lede" style={{ maxWidth: 380, color: 'var(--body-dark)' }}>Your website is the first meeting. Here’s how most of them lose it in five seconds.</p>
          </div>
          <div className="st-prob-track">
            {PROBLEMS.map((p, i) => (
              <article key={p.title} className="st-pcard" style={{ background: p.bg }}>
                <span className="shape-zone"><Shape kind={p.sh} color={p.c} /></span>
                <span className="num">0{i + 1}</span>
                <div><h3>{p.title}</h3><p>{p.desc}</p></div>
              </article>
            ))}
            <article className="st-pcard end">
              <span className="st-mono" style={{ color: 'var(--lime)' }}>No website yet?</span>
              <h3 className="st-xl" style={{ fontSize: 'clamp(48px, 5vw, 80px)', margin: 0 }}>Start with a <span className="st-serif">free plan.</span></h3>
              <p style={{ color: 'var(--body-dark)' }}>Tell us what you do. We’ll show you how customers find you today and what your first website should be.</p>
              <a href="#audit" className="st-btn st-btn-primary" style={{ alignSelf: 'flex-start' }}>Get my free plan <span className="st-arrow" aria-hidden="true">→</span></a>
            </article>
          </div>
        </div>
      </section>

      {/* ================= WORK (stacking cards) ================= */}
      <section id="work" className="st-dark st-pad" aria-labelledby="work-h" style={{ paddingTop: 40 }}>
        <div className="st-wrap">
          <Head
            label="Selected work"
            dark
            aside={<PageLink page="work" onNavigate={() => go('work')} className="st-btn st-btn-ghost">See all 14 projects <span className="st-arrow" aria-hidden="true">→</span></PageLink>}
          >
            <h2 id="work-h" className="st-xl st-h2">Work that <span className="st-serif" style={{ color: 'var(--lime)' }}>earns its keep.</span></h2>
          </Head>
          <div className="st-stack">
            {WORK.map((w, i) => (
              <article key={w.id} className="st-wcard">
                <div className="st-wcard-info">
                  <div className="idx st-mono"><span>0{i + 1} / 0{WORK.length}</span><span>{w.tag}</span></div>
                  <div>
                    <h3>{w.name}</h3>
                    <p style={{ marginTop: 18 }}>{w.desc}</p>
                  </div>
                  <div>
                    <div className="st-wcard-result"><b style={{ color: i % 2 ? 'var(--peri)' : 'var(--lime)' }}>{w.big}</b><span>{w.small}</span></div>
                    <PageLink href={getWorkDetailPath(w.id)} onNavigate={() => openCase(w.id)} className="st-link" style={{ display: 'inline-block', marginTop: 22 }}>
                      Read the case study <span className="st-arrow" aria-hidden="true">→</span>
                    </PageLink>
                  </div>
                </div>
                <PageLink href={getWorkDetailPath(w.id)} onNavigate={() => openCase(w.id)} className="st-wcard-shot" aria-label={`${w.name} case study`}>
                  <img src={`/screenshots/full/${w.id}.webp`} alt={`${w.name} website, designed by Mago Labs`} width={560} height={2275} loading="lazy" decoding="async" />
                  <span className="pill st-mono">Hover to scroll the site</span>
                </PageLink>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RESULTS ================= */}
      <section className="st-light st-pad" aria-labelledby="res-h">
        <div className="st-wrap">
          <Head label="Results" aside={<p className="st-lede">Real numbers from real clients. Every site we build is judged by what happens after launch.</p>}>
            <h2 id="res-h" className="st-xl st-h2">Pretty is the minimum. <span className="st-serif" style={{ color: 'var(--accent)' }}>Enquiries are the point.</span></h2>
          </Head>
          <div className="st-results st-reveal">
            <div className="st-res" style={{ background: 'var(--lime)' }}>
              <span className="shape-zone"><Shape kind="circle" color="var(--accent)" /></span>
              <div className="st-res-num">25<span style={{ fontSize: '0.6em' }}>→</span><CountUp from={25} to={58} duration={1.6} /></div>
              <div>
                <p>Patients a day at Dr. Mihir Shah’s new clinic, within two months of launch.</p>
                <PageLink href={getWorkDetailPath('drmihirshah')} onNavigate={() => openCase('drmihirshah')} className="st-link" style={{ color: 'var(--ink)' }}>Read the case study →</PageLink>
              </div>
            </div>
            <div className="st-res" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
              <span className="shape-zone"><Shape kind="ring" color="var(--ember)" /></span>
              <div className="st-res-num">+<CountUp to={63} />%</div>
              <div>
                <p>More appointment calls for the same clinic, which also started showing up in Google searches.</p>
                <PageLink href={getWorkDetailPath('drmihirshah')} onNavigate={() => openCase('drmihirshah')} className="st-link" style={{ color: 'var(--accent-on-dark)' }}>Read the case study →</PageLink>
              </div>
            </div>
            <div className="st-res" style={{ background: 'var(--peri)' }}>
              <span className="shape-zone"><Shape kind="quarter" color="var(--paper)" /></span>
              <div className="st-res-num"><CountUp to={34} /></div>
              <div>
                <p>New clients in three months for Darshan Galani &amp; Co., a CA firm that had never had a website.</p>
                <PageLink href={getWorkDetailPath('darshangalani')} onNavigate={() => openCase('darshangalani')} className="st-link" style={{ color: 'var(--ink)' }}>Read the case study →</PageLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INDUSTRIES ================= */}
      <section id="services" className="st-dark st-pad st-grain" aria-labelledby="ind-h">
        <div className="st-wrap">
          <Head label="Who we build for" dark aside={<p className="st-lede">Each industry wins trust differently. A clinic needs calm and credentials, a contractor needs proof of the work. We design for that.</p>}>
            <h2 id="ind-h" className="st-xl st-h2">75+ businesses. <span className="st-serif" style={{ color: 'var(--peri)' }}>10 industries.</span></h2>
          </Head>
          <div className="st-ind-grid">
            <ul className="st-ind-list">
              {INDUSTRIES.map((x, i) => {
                const inner = (
                  <>
                    <span className="t">{x.name}</span>
                    <span className="st-mono" style={{ fontSize: 11 }}>{String(i + 1).padStart(2, '0')}</span>
                  </>
                );
                return (
                  <li key={x.name}>
                    {x.page ? (
                      <PageLink page={x.page} onNavigate={() => go(x.page as PageId)} className={`st-ind-btn${i === ind ? ' on' : ''}`} onMouseEnter={() => setInd(i)} onFocus={() => setInd(i)}>{inner}</PageLink>
                    ) : (
                      <button type="button" className={`st-ind-btn${i === ind ? ' on' : ''}`} onMouseEnter={() => setInd(i)} onFocus={() => setInd(i)} onClick={() => setInd(i)} aria-pressed={i === ind}>{inner}</button>
                    )}
                  </li>
                );
              })}
            </ul>
            <div>
              <div className="st-ind-stage" aria-hidden="true">
                <div className="cell shot">
                  {indSites.map((s) => (
                    <img key={s} className={s === activeInd.site ? 'on' : undefined} src={`/screenshots/full/${s}-300.webp`} alt="" width={300} height={1219} loading="lazy" decoding="async" />
                  ))}
                </div>
                <div className="cell" style={{ background: activeInd.bg }}><Shape kind="circle" color={activeInd.c} style={{ transform: `rotate(${ind * 40}deg)` }} /></div>
                <div className="cell" style={{ background: 'var(--ink-3)' }}><Shape kind="quarter" color={activeInd.bg} style={{ transform: `rotate(${ind * 90}deg)` }} /></div>
                <div className="cell" style={{ background: activeInd.c === 'var(--ink)' ? 'var(--paper)' : activeInd.c }}><Shape kind="half" color={activeInd.bg} style={{ transform: `rotate(${ind * 180}deg)` }} /></div>
                <div className="cell" style={{ background: activeInd.bg }}><Shape kind="ring" color={activeInd.c} /></div>
                <div className="cell" style={{ background: 'var(--ink-3)' }}><Shape kind="dots" color={activeInd.bg} /></div>
              </div>
              <p className="st-ind-cap" aria-live="polite"><b style={{ color: 'var(--paper)' }}>{activeInd.name}:</b> {activeInd.note}</p>
            </div>
          </div>
          <div className="st-chips st-reveal">
            <span>Alongside every website:</span>
            {ALONGSIDE.map((s) => s.page ? (
              <PageLink key={s.name} page={s.page} onNavigate={() => go(s.page as PageId)} className="st-chip">{s.name}</PageLink>
            ) : (<span key={s.name} className="st-chip">{s.name}</span>))}
          </div>
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="st-light st-pad" aria-labelledby="proc-h">
        <div className="st-wrap st-proc">
          <div className="st-proc-sticky st-reveal">
            <span className="st-mono st-label">How it works</span>
            <h2 id="proc-h" className="st-xl st-h2" style={{ margin: '22px 0 26px' }}>Call to live site. <span className="st-serif" style={{ color: 'var(--accent)' }}>Four steps.</span></h2>
            <p className="st-lede" style={{ color: 'var(--body)', maxWidth: 420, marginBottom: 28 }}>No jargon, no surprise invoices. You always know what happens next and when.</p>
            <a href="#audit" className="st-btn st-btn-primary">Start with step one <span className="st-arrow" aria-hidden="true">→</span></a>
          </div>
          <ol className="st-steps">
            <span className="bar" aria-hidden="true" />
            {STEPS.map((s, i) => (
              <li key={s.title} className="st-step st-reveal">
                <span className="st-mono n">Step {i + 1} / 4</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ================= COMPARISON ================= */}
      <section className="st-dark st-pad st-grain" aria-labelledby="cmp-h">
        <div className="st-wrap">
          <Head label="Why Mago Labs" dark aside={<p className="st-lede">The craft of a big agency, the attention of a small studio, and a price you know before we start.</p>}>
            <h2 id="cmp-h" className="st-xl st-h2">Agency craft. <span className="st-serif" style={{ color: 'var(--lime)' }}>Studio attention.</span></h2>
          </Head>
          <div className="st-cmp st-reveal" tabIndex={0} aria-label="Comparison table, scrolls sideways on small screens">
            <table>
              <thead>
                <tr><td /><th scope="col" className="us">Mago Labs</th><th scope="col" className="them">Template site</th><th scope="col" className="them">Big agency</th></tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.row}><th scope="row">{r.row}</th><td className="us">{r.us}</td><td className="them">{r.template}</td><td className="them">{r.agency}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================= PRICING + FOUNDER ================= */}
      <section id="pricing" className="st-light st-pad" aria-labelledby="price-h">
        <div className="st-wrap">
          <Head label="Pricing" aside={<p className="st-lede">Every package is custom designed and includes hosting. Prices show in your own currency.</p>}>
            <h2 id="price-h" className="st-xl st-h2">Clear prices. <span className="st-serif" style={{ color: 'var(--accent)' }}>Fixed first.</span></h2>
          </Head>
          <div className="st-g4 st-g4-stack st-reveal">
            {PACKAGES.map((p) => (
              <PageLink key={p.id} page="pricing" onNavigate={() => go('pricing')} className={`st-price${p.id === 'growth' ? ' featured' : ''}`}>
                <span className="corner" aria-hidden="true"><Shape kind={PACKAGE_SHAPE[p.id].sh} color={PACKAGE_SHAPE[p.id].c} /></span>
                <span className="st-mono" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>{p.number} · {p.name}{p.id === 'growth' && <span className="st-badge">Most picked</span>}</span>
                <span>
                  <span className="from" style={{ display: 'block' }}>from</span>
                  <span className="amt"><Price pkg={p} /></span>
                </span>
                <span className="desc">{PACKAGE_DESC[p.id]}</span>
                <span className="days st-mono">Live in {p.days} days</span>
              </PageLink>
            ))}
          </div>
          <p className="st-reveal" style={{ margin: '28px 0 0', fontSize: 16, color: 'var(--body)' }}>
            Need something specific? <PageLink page="pricing" onNavigate={() => go('pricing')} className="st-link">Compare packages and add-ons →</PageLink>
          </p>

          <div id="about" className="st-founder" style={{ marginTop: 'clamp(120px, 14vw, 200px)' }}>
            <div className="st-founder-art st-reveal">
              <span className="b1" aria-hidden="true" />
              <img src="/burhan-founder.jpg" alt="Burhan Kapasi, founder of Mago Labs" width={768} height={960} loading="lazy" decoding="async" />
              <span className="b2" aria-hidden="true" />
            </div>
            <div className="st-reveal">
              <span className="st-mono st-label">A note from the founder</span>
              <h2 className="st-xl st-h3" style={{ margin: '22px 0 28px' }}>Most good businesses are better than they <span className="st-serif" style={{ color: 'var(--accent)' }}>look online.</span></h2>
              <p>I spent eight years in banking, fintech and insurance before starting Mago Labs. I saw strong businesses lose deals because their website made them look small. That’s what we fix.</p>
              <p>The studio stays small on purpose. You talk to me from the first call to launch, and every site is designed for one job: make the right people trust you enough to get in touch.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 10 }}>
                <span className="st-sign" aria-hidden="true">Burhan</span>
                <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.4 }}>Burhan Kapasi<br />Founder, Mago Labs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="st-dark st-pad st-grain" aria-labelledby="rev-h">
        <div className="st-wrap">
          <Head
            label="Clients"
            dark
            aside={<a className="st-gbadge" href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener"><b>{GOOGLE_RATING}</b><span>Rated on Google from {GOOGLE_REVIEWS.length} reviews ↗</span></a>}
          >
            <h2 id="rev-h" className="st-xl st-h2">{reviews.length} clients. <span className="st-serif" style={{ color: 'var(--peri)' }}>In their words.</span></h2>
          </Head>
          <div className="st-row" style={{ marginBottom: 28, alignItems: 'center' }}>
            <div className="st-filters" role="group" aria-label="Filter testimonials">
              <button type="button" className="st-filter" aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>All ({reviews.length})</button>
              <button type="button" className="st-filter" aria-pressed={filter === 'google'} onClick={() => setFilter('google')}>Google reviews ({GOOGLE_REVIEWS.length})</button>
              <button type="button" className="st-filter" aria-pressed={filter === 'client'} onClick={() => setFilter('client')}>Client stories ({TESTIMONIALS.length})</button>
            </div>
            <div className="st-rail-nav">
              <button type="button" onClick={() => scrollRail(-1)} aria-label="Previous testimonials">←</button>
              <button type="button" onClick={() => scrollRail(1)} aria-label="Next testimonials">→</button>
            </div>
          </div>
        </div>
        <div className="st-rail" ref={railRef} tabIndex={0} aria-label="Testimonials, scroll sideways">
          {shown.map((r) => (
            <figure key={r.key} className={`st-tcard ${r.kind}${r.quote && r.quote.length > 300 ? ' long' : ''}`} style={{ margin: 0 }}>
              <span className="corner" aria-hidden="true"><Shape kind={r.shape.sh} color={r.shape.c} /></span>
              <div>
                <div className="top">
                  <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
                  <span className="src st-mono">{r.kind === 'google' ? 'Google review' : 'Client story'}</span>
                </div>
                <blockquote style={{ marginTop: 18 }}>
                  {r.quote ? `“${r.quote}”` : <span style={{ opacity: 0.75 }}>Left a 5-star rating on Google.</span>}
                </blockquote>
              </div>
              <figcaption className="who">
                <span className="av" style={{ background: r.shape.c, color: 'var(--ink)' }} aria-hidden="true">{r.initials}</span>
                <span><b>{r.name}</b><span>{r.meta}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="st-light st-pad" aria-labelledby="faq-h">
        <div className="st-wrap st-split">
          <div className="st-reveal" style={{ alignSelf: 'start' }}>
            <span className="st-mono st-label">Questions</span>
            <h2 id="faq-h" className="st-xl st-h2" style={{ marginTop: 22 }}>Straight <span className="st-serif" style={{ color: 'var(--accent)' }}>answers.</span></h2>
          </div>
          <div className="st-faq st-reveal">
            {FAQS.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>{f.q}<span className="pm" aria-hidden="true">+</span></summary>
                <p className="ans">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
