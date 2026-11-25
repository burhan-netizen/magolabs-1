import { useEffect, useState } from 'react';

/**
 * Preview-only font switcher, for choosing the site's fonts on the real pages.
 *
 * Opens with ?fonts=1 in the address (remembered for the browser tab). Visitors
 * never see it. Each option swaps the headline and text fonts site-wide through
 * CSS variables; the extra fonts are only downloaded once the switcher is open.
 */

interface FontOption {
  id: string;
  name: string;
  feel: string;
  display: string;
  sans: string;
  weight: number;
  track: string;
  load: () => Promise<unknown>;
}

const OPTIONS: FontOption[] = [
  {
    id: 'current',
    name: 'Bricolage + Instrument',
    feel: 'Current',
    display: '"Bricolage Grotesque Variable"',
    sans: '"Instrument Sans Variable"',
    weight: 750,
    track: '-0.03em',
    load: async () => undefined,
  },
  {
    id: 'poppins',
    name: 'Poppins',
    feel: 'Your old font',
    display: '"Poppins"',
    sans: '"Poppins"',
    weight: 700,
    track: '-0.025em',
    load: () =>
      Promise.all([
        import('@fontsource/poppins/latin-400.css'),
        import('@fontsource/poppins/latin-500.css'),
        import('@fontsource/poppins/latin-600.css'),
        import('@fontsource/poppins/latin-700.css'),
      ]),
  },
  {
    id: 'inter-tight',
    name: 'Inter Tight + Inter',
    feel: 'Clean and corporate',
    display: '"Inter Tight Variable"',
    sans: '"Inter Variable"',
    weight: 700,
    track: '-0.035em',
    load: () => Promise.all([import('@fontsource-variable/inter-tight/wght.css'), import('@fontsource-variable/inter/wght.css')]),
  },
  {
    id: 'archivo',
    name: 'Archivo + Inter',
    feel: 'Bold and industrial',
    display: '"Archivo Variable"',
    sans: '"Inter Variable"',
    weight: 800,
    track: '-0.035em',
    load: () => Promise.all([import('@fontsource-variable/archivo/wght.css'), import('@fontsource-variable/inter/wght.css')]),
  },
  {
    id: 'jakarta',
    name: 'Plus Jakarta Sans + Inter',
    feel: 'Premium and polished',
    display: '"Plus Jakarta Sans Variable"',
    sans: '"Inter Variable"',
    weight: 750,
    track: '-0.035em',
    load: () => Promise.all([import('@fontsource-variable/plus-jakarta-sans/wght.css'), import('@fontsource-variable/inter/wght.css')]),
  },
  {
    id: 'manrope',
    name: 'Manrope',
    feel: 'Modern and friendly',
    display: '"Manrope Variable"',
    sans: '"Manrope Variable"',
    weight: 750,
    track: '-0.035em',
    load: () => import('@fontsource-variable/manrope/wght.css'),
  },
  {
    id: 'schibsted',
    name: 'Schibsted Grotesk + Inter',
    feel: 'Sturdy, newspaper strong',
    display: '"Schibsted Grotesk Variable"',
    sans: '"Inter Variable"',
    weight: 750,
    track: '-0.03em',
    load: () => Promise.all([import('@fontsource-variable/schibsted-grotesk/wght.css'), import('@fontsource-variable/inter/wght.css')]),
  },
];

const KEY = 'mago-fontlab';

function apply(option: FontOption) {
  const root = document.documentElement.style;
  if (option.id === 'current') {
    ['--font-display', '--font-sans', '--h-weight', '--h-track'].forEach((v) => root.removeProperty(v));
    return;
  }
  root.setProperty('--font-display', `${option.display}, system-ui, sans-serif`);
  root.setProperty('--font-sans', `${option.sans}, system-ui, sans-serif`);
  root.setProperty('--h-weight', String(option.weight));
  root.setProperty('--h-track', option.track);
}

export default function FontLab() {
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState('current');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('fonts') === '1') sessionStorage.setItem(KEY, 'current');
      const saved = sessionStorage.getItem(KEY);
      if (saved) {
        setOpen(true);
        choose(saved);
      }
    } catch {
      /* storage blocked: the switcher simply stays closed */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (id: string) => {
    const option = OPTIONS.find((o) => o.id === id) ?? OPTIONS[0];
    setPicked(option.id);
    try {
      sessionStorage.setItem(KEY, option.id);
    } catch {
      /* ignore */
    }
    option.load().then(() => apply(option));
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[60] w-72 rounded-2xl border border-white/10 bg-neutral-950/95 p-3 text-white shadow-2xl backdrop-blur" style={{ fontFamily: 'system-ui, sans-serif' }}>
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center justify-between px-2 py-1 text-left text-xs font-semibold uppercase tracking-wider text-neutral-400"
      >
        Font preview <span>{collapsed ? 'Show' : 'Hide'}</span>
      </button>
      {!collapsed && (
        <ul className="mt-2 space-y-1">
          {OPTIONS.map((o, i) => (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => choose(o.id)}
                className={`w-full rounded-xl px-3 py-2 text-left transition-colors ${picked === o.id ? 'bg-brand text-neutral-950' : 'hover:bg-white/10'}`}
              >
                <span className="block text-sm font-semibold">
                  {i + 1}. {o.name}
                </span>
                <span className={`block text-xs ${picked === o.id ? 'text-neutral-800' : 'text-neutral-400'}`}>{o.feel}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
