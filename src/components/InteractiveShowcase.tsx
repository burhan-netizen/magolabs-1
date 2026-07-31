import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Sparkles, 
  Layers, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Monitor, 
  Phone, 
  Smartphone,
  Eye,
  Check
} from 'lucide-react';

type TabId = 'performance' | 'themes' | 'layouts';
type ThemeId = 'classic' | 'cyber' | 'editorial' | 'emerald';
type LayoutId = 'hero' | 'services' | 'lead';

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>('performance');
  
  // Performance Simulator State
  const [auditProgress, setAuditProgress] = useState(0);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditLogs, setAuditLogs] = useState<string[]>([]);
  const [speedScore, setSpeedScore] = useState(42);

  // Themes state
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>('classic');

  // Layouts state
  const [selectedLayout, setSelectedLayout] = useState<LayoutId>('hero');

  // Interactive mouse shine effect for showcase card
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Run Speed Audit simulation
  const runSpeedAudit = () => {
    if (isAuditing) return;
    setIsAuditing(true);
    setAuditProgress(0);
    setSpeedScore(42);
    setAuditLogs([]);

    const logs = [
      '🔍 Auditing bundle files...',
      '⚡ Optimizing responsive layouts...',
      '🖼️ Compressing image assets to WebP...',
      '🛠️ Generating critical path CSS...',
      '🚀 Code structural health check: Perfect!',
      '🎉 Audit complete. Mobile score: 99/100!'
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      setAuditProgress((prev) => {
        const nextProgress = prev + 1.8;
        if (nextProgress >= 100) {
          clearInterval(interval);
          setSpeedScore(99);
          setIsAuditing(false);
          return 100;
        }
        return nextProgress;
      });

      // Add logs sequentially as progress builds
      const stepIndex = Math.floor((auditProgress / 100) * logs.length);
      if (stepIndex > currentStep && stepIndex < logs.length) {
        currentStep = stepIndex;
        setAuditLogs(prev => [...prev, logs[stepIndex]]);
      }
    }, 45);
  };

  // Initialize with finished audit logs or run automatically on load
  useEffect(() => {
    setAuditLogs([
      '⚡ Standby. Core Web Vitals audit ready.',
      '👉 Click "Run Speed Audit" to start simulation.'
    ]);
  }, []);

  // Theme definition mapping
  const themesData = {
    classic: {
      bg: 'bg-neutral-50',
      textMain: 'text-neutral-950',
      textMuted: 'text-neutral-500',
      accent: 'bg-blue-600',
      accentBorder: 'border-blue-100',
      cardBg: 'bg-white',
      accentText: 'text-blue-600',
      name: 'Classic Corporate',
      badge: 'Blue'
    },
    cyber: {
      bg: 'bg-neutral-950',
      textMain: 'text-neutral-100',
      textMuted: 'text-neutral-400',
      accent: 'bg-indigo-500',
      accentBorder: 'border-indigo-950',
      cardBg: 'bg-neutral-900',
      accentText: 'text-indigo-400',
      name: 'Cyber Midnight',
      badge: 'Indigo'
    },
    editorial: {
      bg: 'bg-amber-50/50',
      textMain: 'text-stone-900',
      textMuted: 'text-stone-500',
      accent: 'bg-amber-800',
      accentBorder: 'border-amber-200',
      cardBg: 'bg-white',
      accentText: 'text-amber-800',
      name: 'Editorial Cream',
      badge: 'Warm'
    },
    emerald: {
      bg: 'bg-emerald-50/20',
      textMain: 'text-emerald-950',
      textMuted: 'text-emerald-600/70',
      accent: 'bg-emerald-600',
      accentBorder: 'border-emerald-100',
      cardBg: 'bg-white',
      accentText: 'text-emerald-600',
      name: 'Minimal Emerald',
      badge: 'Eco'
    }
  };

  return (
    <div 
      className="w-full flex flex-col items-center justify-center space-y-8 font-sans"
      id="interactive-showcase-root"
    >
      {/* Simulation Selector Tabs */}
      <div className="flex p-1 bg-neutral-100/80 backdrop-blur-md rounded-full border border-neutral-200/50 w-full max-w-[420px] self-center">
        <button
          onClick={() => setActiveTab('performance')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'performance'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          id="tab-btn-performance"
        >
          <Zap className="h-3.5 w-3.5" />
          Speed Audit
        </button>
        <button
          onClick={() => setActiveTab('themes')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'themes'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          id="tab-btn-themes"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Aesthetics
        </button>
        <button
          onClick={() => setActiveTab('layouts')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'layouts'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          id="tab-btn-layouts"
        >
          <Layers className="h-3.5 w-3.5" />
          Layout UX
        </button>
      </div>

      {/* Main Container containing controls & mock phone */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full items-stretch">
        
        {/* Left Side: Simulation Interactive Panel */}
        <div className="md:col-span-6 flex flex-col justify-center space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === 'performance' && (
              <motion.div
                key="perf"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">Performance Core</span>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">Zero-Bloat Speed Engine</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Most standard templates are clogged with excess JavaScript that hurts conversion. Watch our system clean, bundle, and optimize code in real-time to guarantee 99+ Core Web Vitals.
                  </p>
                </div>

                <div className="bg-neutral-50 rounded-2xl border border-neutral-200/60 p-4 space-y-3 font-mono text-[10px] leading-relaxed text-neutral-600 h-36 overflow-y-auto scrollbar-thin shadow-inner">
                  <div className="flex items-center justify-between border-b border-neutral-200/50 pb-2 text-[9px] font-semibold text-neutral-400">
                    <span>Mago Optimization Engine v1.4</span>
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  {auditLogs.map((log, i) => (
                    <motion.div
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i}
                      className="flex items-start gap-1.5 text-neutral-700"
                    >
                      <span className="text-neutral-400 select-none">&gt;</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={runSpeedAudit}
                  disabled={isAuditing}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-75 disabled:hover:bg-blue-600 text-white font-bold py-3 px-6 text-sm tracking-tight transition-all active:translate-y-0.5 shadow-md shadow-blue-600/10 cursor-pointer"
                >
                  {isAuditing ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Auditing System ({Math.round(auditProgress)}%)
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Run Speed Audit
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {activeTab === 'themes' && (
              <motion.div
                key="themes"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">Visual Aesthetic</span>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">Tailored Identity Palette</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    We select typography and color styles that reflect your business authority. Toggle between a few of our curated presets to see how design molds perspective.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  {(Object.keys(themesData) as ThemeId[]).map((thm) => (
                    <button
                      key={thm}
                      onClick={() => setSelectedTheme(thm)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                        selectedTheme === thm
                          ? 'border-blue-600 bg-blue-50/20 shadow-sm'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-neutral-800">{themesData[thm].name}</span>
                        {selectedTheme === thm && (
                          <Check className="h-3.5 w-3.5 text-blue-600" />
                        )}
                      </div>
                      <div className="flex gap-1.5 mt-2">
                        <span className={`h-4 w-4 rounded-full border border-neutral-300/60 ${thm === 'classic' ? 'bg-blue-600' : thm === 'cyber' ? 'bg-indigo-500' : thm === 'editorial' ? 'bg-amber-800' : 'bg-emerald-600'}`} />
                        <span className={`h-4 w-4 rounded-full border border-neutral-300/60 ${thm === 'cyber' ? 'bg-neutral-950' : 'bg-white'}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'layouts' && (
              <motion.div
                key="layouts"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Layout Engineering</span>
                  <h3 className="text-xl font-bold text-neutral-900 tracking-tight">Structured Conversion UX</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Every section is engineered utilizing modern buyer psychology. Pick a page block to see its fluid, tactile structural representation inside the mobile frame.
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'hero', title: 'Authority Hero Frame', desc: 'Bold value proposition with action drivers.' },
                    { id: 'services', title: 'Trust Grid Capabilities', desc: 'Bento-styled clean grids highlighting conversion.' },
                    { id: 'lead', title: 'High-Intent Form Block', desc: 'Frictionless entry capture designed for mobile.' }
                  ].map((lay) => (
                    <button
                      key={lay.id}
                      onClick={() => setSelectedLayout(lay.id as LayoutId)}
                      className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        selectedLayout === lay.id
                          ? 'border-blue-600 bg-blue-50/20'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className={`mt-0.5 p-1.5 rounded-lg ${selectedLayout === lay.id ? 'bg-blue-100/50 text-blue-600' : 'bg-neutral-100 text-neutral-500'}`}>
                        <Layers className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-800">{lay.title}</div>
                        <div className="text-[10px] text-neutral-500 leading-tight mt-0.5">{lay.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Immersive, Stateful Interactive Mobile Frame */}
        <div className="md:col-span-6 flex items-center justify-center relative">
          {/* Sparkles background accent behind phone */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          {/* Glowing cursor aura effect on desktop */}
          <div 
            className="absolute h-56 w-56 rounded-full bg-blue-100/30 blur-3xl pointer-events-none transition-all duration-300 -z-10"
            style={{
              left: `${mousePos.x - 112}px`,
              top: `${mousePos.y - 112}px`,
              opacity: mousePos.x !== 0 ? 1 : 0
            }}
          />

          {/* Premium Device Frame */}
          <div 
            className="relative w-full max-w-[280px] aspect-[9/18.5] bg-neutral-900 rounded-[38px] border-[6px] border-neutral-950 shadow-2xl p-2.5 overflow-hidden flex flex-col cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            id="simulated-device-frame"
          >
            {/* Dynamic island notch */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-neutral-950 rounded-full z-[100] flex items-center justify-between px-3">
              <span className="h-1 w-1.5 rounded-full bg-blue-600/60" />
              <span className="h-1 w-1 rounded-full bg-neutral-800" />
            </div>

            {/* Inner Phone Content Container */}
            <div className={`flex-1 rounded-[28px] overflow-hidden flex flex-col justify-between p-4 transition-all duration-500 relative ${themesData[selectedTheme].bg}`}>
              
              {/* Phone Header Status Bar */}
              <div className="flex items-center justify-between text-[8px] font-bold opacity-75 pt-1.5">
                <span className={themesData[selectedTheme].textMain}>9:41 AM</span>
                <div className="flex items-center gap-1">
                  <span className={`h-2 w-2 rounded-full ${themesData[selectedTheme].textMain === 'text-neutral-100' ? 'bg-white' : 'bg-neutral-800'}`} style={{ opacity: 0.8 }} />
                  <span className={`h-1.5 w-3 rounded-sm border ${themesData[selectedTheme].textMain === 'text-neutral-100' ? 'border-white' : 'border-neutral-800'}`} />
                </div>
              </div>

              {/* Dynamic Simulated Interactive Canvas Content */}
              <div className="flex-1 flex flex-col justify-center py-4 space-y-4">
                <AnimatePresence mode="wait">
                  {/* Performance Mode Content */}
                  {activeTab === 'performance' && (
                    <motion.div
                      key="preview-perf"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="text-center space-y-4 flex flex-col items-center justify-center flex-1"
                    >
                      {/* Animated circular progress score indicator */}
                      <div className="relative h-28 w-28 flex items-center justify-center">
                        <svg className="absolute inset-0 h-full w-full transform -rotate-90">
                          <circle
                            cx="56"
                            cy="56"
                            r="44"
                            className="stroke-neutral-200/50 fill-none"
                            strokeWidth="6"
                          />
                          <motion.circle
                            cx="56"
                            cy="56"
                            r="44"
                            className={`fill-none ${speedScore > 90 ? 'stroke-emerald-500' : 'stroke-orange-500'}`}
                            strokeWidth="6"
                            strokeDasharray={`${2 * Math.PI * 44}`}
                            strokeDashoffset={`${2 * Math.PI * 44 * (1 - (isAuditing ? auditProgress : speedScore) / 100)}`}
                            transition={{ ease: 'easeOut', duration: 0.1 }}
                          />
                        </svg>
                        
                        <div className="text-center space-y-0.5">
                          <span className={`text-3xl font-extrabold tracking-tighter block ${themesData[selectedTheme].textMain}`}>
                            {Math.round(isAuditing ? auditProgress : speedScore)}
                          </span>
                          <span className={`text-[8px] font-bold uppercase tracking-widest block ${speedScore > 90 ? 'text-emerald-500' : 'text-neutral-400'}`}>
                            {isAuditing ? 'Auditing' : 'Lighthouse'}
                          </span>
                        </div>
                      </div>

                      {/* Diagnostic score bars */}
                      <div className="w-full space-y-2 pt-2 px-1">
                        <div className="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-sm p-2 rounded-xl border border-neutral-200/50 dark:border-neutral-800/40 space-y-1">
                          <div className="flex justify-between text-[8px] font-bold text-neutral-400">
                            <span>FIRST CONTENTFUL PAINT</span>
                            <span className={speedScore > 90 ? 'text-emerald-500' : 'text-orange-500'}>
                              {isAuditing ? `${(2.1 - (auditProgress/100)*1.7).toFixed(1)}s` : '0.4s'}
                            </span>
                          </div>
                          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-1 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-100 ${speedScore > 90 ? 'bg-emerald-500' : 'bg-orange-500'}`}
                              style={{ width: isAuditing ? `${auditProgress}%` : '100%' }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Aesthetics Mode Content */}
                  {activeTab === 'themes' && (
                    <motion.div
                      key="preview-theme"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 flex flex-col justify-between flex-1 py-1"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`text-[8px] font-mono tracking-wider ${themesData[selectedTheme].textMuted}`}>BRAND ASSET MOCK</span>
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${themesData[selectedTheme].accent} text-white`}>
                            {themesData[selectedTheme].badge}
                          </span>
                        </div>
                        
                        <div className="space-y-1 pt-1">
                          <div className={`text-lg font-black tracking-tight leading-none ${themesData[selectedTheme].textMain}`}>
                            Engineered Authority
                          </div>
                          <div className={`text-[9px] leading-relaxed ${themesData[selectedTheme].textMuted}`}>
                            Custom interfaces crafted to turn curious visitors into paying clients.
                          </div>
                        </div>
                      </div>

                      <div className={`rounded-xl p-3 border shadow-sm space-y-2.5 ${themesData[selectedTheme].cardBg} ${themesData[selectedTheme].accentBorder}`}>
                        <div className="flex gap-2 items-center">
                          <div className={`h-6 w-6 rounded-lg flex items-center justify-center text-white ${themesData[selectedTheme].accent}`}>
                            <Sparkles className="h-3 w-3" />
                          </div>
                          <div className="space-y-0.5">
                            <span className={`text-[9px] font-bold block ${themesData[selectedTheme].textMain}`}>Pure Blueprint</span>
                            <span className="text-[8px] text-neutral-400 block leading-none">0% Template Code</span>
                          </div>
                        </div>
                        <div className="h-1 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                          <div className={`h-full w-4/5 ${themesData[selectedTheme].accent}`} />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Layout Mode Content */}
                  {activeTab === 'layouts' && (
                    <motion.div
                      key="preview-layout"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="flex-1 flex flex-col justify-center space-y-3 py-1"
                    >
                      {selectedLayout === 'hero' && (
                        <div className="space-y-3 text-center">
                          <div className="inline-flex h-7 w-7 rounded-full bg-blue-50 border border-blue-100 items-center justify-center text-blue-600 mx-auto">
                            <Smartphone className="h-3.5 w-3.5" />
                          </div>
                          <div className={`text-sm font-extrabold tracking-tight ${themesData[selectedTheme].textMain}`}>
                            Custom Local Landing
                          </div>
                          <div className="w-24 h-1.5 bg-blue-600 rounded-full mx-auto" />
                          <div className="p-2 bg-white/60 dark:bg-neutral-900/60 rounded-xl space-y-1 border border-neutral-100">
                            <div className="h-1 w-full bg-neutral-200/80 rounded" />
                            <div className="h-1 w-5/6 bg-neutral-200/80 rounded mx-auto" />
                          </div>
                        </div>
                      )}

                      {selectedLayout === 'services' && (
                        <div className="space-y-2">
                          <span className={`text-[8px] font-mono tracking-wider ${themesData[selectedTheme].textMuted} block text-center`}>BENTO COMPONENT MODULES</span>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/40 p-2 rounded-xl text-left space-y-1">
                              <span className="h-1.5 w-4 bg-blue-600 rounded-full block" />
                              <span className={`text-[8px] font-extrabold block ${themesData[selectedTheme].textMain}`}>Design</span>
                              <div className="h-1 w-full bg-neutral-200/60 rounded" />
                            </div>
                            <div className="bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/40 p-2 rounded-xl text-left space-y-1">
                              <span className="h-1.5 w-4 bg-emerald-500 rounded-full block" />
                              <span className={`text-[8px] font-extrabold block ${themesData[selectedTheme].textMain}`}>SEO Optimization</span>
                              <div className="h-1 w-5/6 bg-neutral-200/60 rounded" />
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedLayout === 'lead' && (
                        <div className="space-y-2 p-2.5 bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/50 rounded-2xl">
                          <span className={`text-[8px] font-bold block ${themesData[selectedTheme].textMain}`}>Schedule Consultation</span>
                          <div className="space-y-1.5 pt-1">
                            <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded-md flex items-center px-1.5">
                              <span className="text-[7px] text-neutral-400">Full Name</span>
                            </div>
                            <div className="h-4 bg-neutral-100 dark:bg-neutral-800 rounded-md flex items-center px-1.5">
                              <span className="text-[7px] text-neutral-400">WhatsApp / Phone</span>
                            </div>
                            <div className="h-4.5 bg-blue-600 rounded-md flex items-center justify-center text-[7px] font-bold text-white">
                              Submit Inquiry
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Secure Shield & Conversion Footer */}
              <div className="border-t border-neutral-200/40 pt-2 flex items-center justify-between text-[7px] text-neutral-400 font-medium">
                <span className="flex items-center gap-0.5">
                  <CheckCircle2 className="h-2 w-2 text-emerald-500" />
                  SSL Secured
                </span>
                <span>By Mago Labs</span>
              </div>
            </div>
          </div>

          {/* Floating Widget (growth) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-[10%] right-[-10px] md:right-[-25px] w-36 bg-white p-3 rounded-2xl shadow-xl border border-neutral-100 space-y-1.5 z-10 font-sans"
          >
            <div className="h-1 w-8 bg-emerald-500 rounded-full" />
            <div className="font-extrabold text-[11px] text-neutral-950 tracking-tight flex items-center gap-1">
              <Check className="h-3 w-3 text-emerald-500" />
              100% Unique
            </div>
            <div className="text-[9px] text-neutral-500 leading-tight">No themes, builders, or generic templates used</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
