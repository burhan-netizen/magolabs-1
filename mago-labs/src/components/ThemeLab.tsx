import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Sliders, Check, Eye, Grid, EyeOff } from 'lucide-react';

export type ThemePreset = 'classic' | 'cyber' | 'editorial' | 'emerald';
export type GridAccent = 'dots' | 'blueprint' | 'clean';

interface ThemeDefinition {
  name: string;
  desc: string;
  primaryColor: string;
  badgeBg: string;
  fontDisplayName: string;
  variables: {
    '--color-blue-500': string;
    '--color-blue-600': string;
    '--color-blue-700': string;
    '--font-display': string;
    '--font-sans': string;
  };
}

const THEME_PRESETS: Record<ThemePreset, ThemeDefinition> = {
  classic: {
    name: 'Classic Corporate',
    desc: 'High-authority, tech-consulting deep slate.',
    primaryColor: '#2563EB',
    badgeBg: 'bg-blue-500',
    fontDisplayName: 'Plus Jakarta Sans',
    variables: {
      '--color-blue-500': '#3B82F6',
      '--color-blue-600': '#2563EB',
      '--color-blue-700': '#1D4ED8',
      '--font-display': '"Plus Jakarta Sans", system-ui, sans-serif',
      '--font-sans': '"Inter", system-ui, sans-serif',
    },
  },
  cyber: {
    name: 'Cyber Midnight',
    desc: 'Futuristic hyper-contrast neon violet.',
    primaryColor: '#8B5CF6',
    badgeBg: 'bg-violet-500',
    fontDisplayName: 'JetBrains Mono',
    variables: {
      '--color-blue-500': '#A78BFA',
      '--color-blue-600': '#8B5CF6',
      '--color-blue-700': '#7C3AED',
      '--font-display': '"JetBrains Mono", monospace',
      '--font-sans': '"JetBrains Mono", monospace',
    },
  },
  editorial: {
    name: 'Warm Editorial',
    desc: 'Cozy literary amber & serif luxury agency.',
    primaryColor: '#9A3412',
    badgeBg: 'bg-orange-700',
    fontDisplayName: 'Playfair Display',
    variables: {
      '--color-blue-500': '#C2410C',
      '--color-blue-600': '#9A3412',
      '--color-blue-700': '#7C2D12',
      '--font-display': '"Playfair Display", "Georgia", serif',
      '--font-sans': '"Inter", system-ui, sans-serif',
    },
  },
  emerald: {
    name: 'Minimal Emerald',
    desc: 'Clean organic eco-tech forest emerald.',
    primaryColor: '#059669',
    badgeBg: 'bg-emerald-600',
    fontDisplayName: 'Inter (Geometric)',
    variables: {
      '--color-blue-500': '#10B981',
      '--color-blue-600': '#059669',
      '--color-blue-700': '#047857',
      '--font-display': '"Inter", system-ui, sans-serif',
      '--font-sans': '"Inter", system-ui, sans-serif',
    },
  },
};

export default function ThemeLab() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState<ThemePreset>(() => {
    return (localStorage.getItem('mago-design-theme') as ThemePreset) || 'classic';
  });
  const [gridAccent, setGridAccent] = useState<GridAccent>(() => {
    return (localStorage.getItem('mago-grid-accent') as GridAccent) || 'dots';
  });
  const [showHalo, setShowHalo] = useState(() => {
    return localStorage.getItem('mago-halo-enabled') !== 'false';
  });

  // Apply Theme CSS Custom Variables
  useEffect(() => {
    const root = document.documentElement;
    const theme = THEME_PRESETS[activeTheme];

    // Remove older theme classes
    Object.keys(THEME_PRESETS).forEach((p) => {
      root.classList.remove(`theme-variant-${p}`);
    });
    // Add active theme class trigger
    root.classList.add(`theme-variant-${activeTheme}`);

    // Apply specific css variables directly to document element
    Object.entries(theme.variables).forEach(([key, value]) => {
      root.style.setProperty(key, value as string);
    });

    localStorage.setItem('mago-design-theme', activeTheme);
  }, [activeTheme]);

  // Apply Grid Accent Classes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('grid-dots', 'grid-blueprint', 'grid-clean');
    root.classList.add(`grid-${gridAccent}`);
    localStorage.setItem('mago-grid-accent', gridAccent);
  }, [gridAccent]);

  // Save Halo preference
  useEffect(() => {
    localStorage.setItem('mago-halo-enabled', String(showHalo));
    const root = document.documentElement;
    if (showHalo) {
      root.classList.add('cursor-halo-enabled');
    } else {
      root.classList.remove('cursor-halo-enabled');
    }
  }, [showHalo]);

  return (
    <>
      {/* Floating Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border border-neutral-800 dark:border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        title="Interactive Style Studio"
        id="theme-lab-launcher"
      >
        <Sliders className="h-5 w-5" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-600 text-[8px] font-bold text-white animate-pulse">
          Lab
        </span>
      </motion.button>

      {/* Slide-out Customizer Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="fixed bottom-40 left-6 z-40 w-80 max-h-[70vh] overflow-y-auto rounded-3xl p-6 glass-panel border border-neutral-200/80 shadow-2xl space-y-6 font-sans scrollbar-thin scrollbar-thumb-neutral-200"
            id="theme-lab-panel"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200/50">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4.5 w-4.5 text-blue-600 animate-pulse" />
                <span className="text-sm font-bold text-neutral-900 dark:text-white tracking-tight">
                  Creative Design Lab
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-neutral-400 hover:text-neutral-600 cursor-pointer p-1"
              >
                Close
              </button>
            </div>

            <p className="text-[11px] text-neutral-500 leading-relaxed">
              Showcasing fluid front-end control: switch theme systems, grid backdrops, and interactive cues in real-time.
            </p>

            {/* Presets Grid */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                Brand Palette & Fonts
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(THEME_PRESETS) as ThemePreset[]).map((p) => {
                  const thm = THEME_PRESETS[p];
                  const isActive = activeTheme === p;
                  return (
                    <button
                      key={p}
                      onClick={() => setActiveTheme(p)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer relative overflow-hidden ${
                        isActive
                          ? 'border-neutral-900 dark:border-white bg-neutral-900/5 dark:bg-white/5'
                          : 'border-neutral-200/60 hover:border-neutral-300 hover:bg-neutral-50/50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-3 w-3 rounded-full border border-neutral-300"
                            style={{ backgroundColor: thm.primaryColor }}
                          />
                          <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                            {thm.name}
                          </span>
                        </div>
                        <span className="text-[9px] text-neutral-400 block leading-tight">
                          {thm.desc}
                        </span>
                      </div>
                      {isActive && (
                        <Check className="h-4 w-4 text-neutral-900 dark:text-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Background Texture Overlay Selector */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <Grid className="h-3.5 w-3.5 text-neutral-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  Background Aesthetics
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'dots', label: 'Tech Dots' },
                  { id: 'blueprint', label: 'Blueprint' },
                  { id: 'clean', label: 'Clean' },
                ].map((item) => {
                  const isActive = gridAccent === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setGridAccent(item.id as GridAccent)}
                      className={`py-2 px-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer text-center ${
                        isActive
                          ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 border-neutral-900 dark:border-white shadow-sm'
                          : 'border-neutral-200 text-neutral-500 hover:border-neutral-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Cursor Halo Toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-200/50">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  Spotlight Cursor Halo
                </span>
                <span className="text-[9px] text-neutral-400 block">
                  Cursor tracking ambient aura
                </span>
              </div>
              <button
                onClick={() => setShowHalo(!showHalo)}
                className={`flex h-8 w-12 items-center justify-center rounded-lg border transition-all cursor-pointer ${
                  showHalo
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-neutral-200 text-neutral-400 hover:border-neutral-300'
                }`}
              >
                {showHalo ? <Eye className="h-4.5 w-4.5" /> : <EyeOff className="h-4.5 w-4.5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
