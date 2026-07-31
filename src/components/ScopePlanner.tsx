import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  HelpCircle,
  Clock, 
  ArrowRight,
  Monitor,
  Search,
  Globe,
  PenTool,
  Cpu,
  Layers,
  Zap
} from 'lucide-react';

interface ScopePlannerProps {
  onApplyPlan: (planDetails: {
    service: string;
    message: string;
  }) => void;
}

interface Step {
  id: number;
  title: string;
  subtitle: string;
}

const STEPS: Step[] = [
  { id: 1, title: 'Core Objective', subtitle: 'Select the primary service you require.' },
  { id: 2, title: 'Business Scale', subtitle: 'Help us align the technical scope to your size.' },
  { id: 3, title: 'Add-Ons', subtitle: 'Pick any extras you\u2019d like on your site.' },
  { id: 4, title: 'Delivery Timeline', subtitle: 'Choose your desired launch velocity.' },
  { id: 5, title: 'Architecture Review', subtitle: 'Your customized project blueprint.' },
];

export default function ScopePlanner({ onApplyPlan }: ScopePlannerProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>('Website Design & Development');
  const [businessScale, setBusinessScale] = useState<string>('Growing Business');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['Lead Form', 'SEO Optimization']);
  const [timelinePreference, setTimelinePreference] = useState<string>('Standard Premium (5 Days)');

  const serviceOptions = [
    {
      name: 'Website Design & Development',
      desc: 'Elite single page or multi-page custom build engineered for high conversion.',
      icon: Monitor,
      color: 'text-blue-600',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      name: 'Search Engine Optimization (SEO)',
      desc: 'Rank first in regional searches and capture local commercial intent organically.',
      icon: Search,
      color: 'text-emerald-600',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      name: 'Google Business Profile (GBP)',
      desc: 'Optimize maps, reviews, and proximity rankings to dominate your local market.',
      icon: Globe,
      color: 'text-purple-600',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      name: 'Conversion Copywriting',
      desc: 'Persuasive, high-authority copy written specifically to sell premium services.',
      icon: PenTool,
      color: 'text-amber-600',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      name: 'Full-Scale Agency Partnership',
      desc: 'End-to-end design, code, SEO, copy, and ongoing monthly expansion support.',
      icon: Cpu,
      color: 'text-rose-600',
      bg: 'bg-rose-500/10 border-rose-500/20'
    }
  ];

  const scaleOptions = [
    { name: 'Solo Specialist / Doctor', desc: 'Boutique practice, CA firm, or consultant requiring elite authority.' },
    { name: 'Growing Business', desc: 'SME expanding reach, upgrading old legacy sites, and scaling client lead flows.' },
    { name: 'Established Enterprise', desc: 'High-volume services, deep corporate pipelines, and multi-location footprints.' },
    { name: 'Industrial Exporter', desc: 'Factories, heavy engineering, or wholesale exporters targetting global markets.' }
  ];

  const featureOptions = [
    { name: 'Online Booking / Contact Form', desc: 'Let customers reach out or book you directly from the site, no back-and-forth calls.' },
    { name: 'Google Search Ranking (SEO)', desc: 'Help your business show up when people search for you online.' },
    { name: 'Interactive Quote Tool', desc: 'A quick step-by-step tool so visitors get an instant estimate before contacting you.' },
    { name: 'Smooth Animations & Effects', desc: 'A polished, modern feel as visitors scroll and interact with your site.' },
    { name: 'Multiple Languages', desc: 'Reach English, Hindi, and Gujarati speaking customers.' },
    { name: 'Extra-Fast Loading', desc: 'Your site loads quickly for every visitor, wherever they are.' }
  ];

  const timelineOptions = [
    { name: 'Express Sprint (3 Days)', desc: 'Accelerated engineering pipeline for quick-turn launches.' },
    { name: 'Standard Premium (5 Days)', desc: 'Our standard meticulously crafted and peer-reviewed cycle.' },
    { name: 'Elite Bespoke (7 Days)', desc: 'Complex interactive configurators, extensive content libraries, and testing.' }
  ];

  const toggleFeature = (featureName: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureName) 
        ? prev.filter(f => f !== featureName) 
        : [...prev, featureName]
    );
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  // Generate dynamic plan details
  const getPlanSummary = () => {
    const isExpress = timelinePreference.includes('Express');
    const isBespoke = timelinePreference.includes('Elite');
    let complexity = 'Standard Premium Spec';
    let designFocus = 'Conversion & Absolute Speed';

    if (isExpress) {
      complexity = 'High-Speed Core Architecture';
      designFocus = 'Rapid Market Presence & Clean Delivery';
    } else if (isBespoke) {
      complexity = 'Ultra-Premium Bespoke Spec';
      designFocus = 'Custom Micro-interactions & Deep Asset Libraries';
    }

    if (selectedService === 'Full-Scale Agency Partnership') {
      complexity = 'Omni-Channel Brand Authority Spec';
    }

    // Instead of a literal price quote (scope always needs a real conversation to
    // price accurately), this converts the same signals into a gamified, non-monetary
    // "intensity" score, keeps the step-5 reveal satisfying without committing to a number.
    const getIntensity = () => {
      let score = 45; // Website Design & Development baseline
      if (selectedService === 'Full-Scale Agency Partnership') score = 70;
      else if (selectedService === 'Search Engine Optimization (SEO)') score = 40;
      else if (selectedService === 'Google Business Profile (GBP)') score = 25;
      else if (selectedService === 'Conversion Copywriting') score = 35;

      if (businessScale.includes('Enterprise') || businessScale.includes('Exporter')) score += 20;
      score += selectedFeatures.length * 4;
      if (isBespoke) score += 15;
      if (isExpress) score += 10;

      score = Math.max(10, Math.min(100, Math.round(score)));

      let label = 'Foundational Build';
      if (score > 80) label = 'Elite Bespoke Architecture';
      else if (score > 60) label = 'Advanced Systems Build';
      else if (score > 35) label = 'Growth Engineering Spec';

      return { score, label };
    };

    return {
      complexity,
      designFocus,
      intensity: getIntensity(),
      duration: isExpress ? '3 Days' : isBespoke ? '7 Days' : '5 Days'
    };
  };

  const applyPlanToForm = () => {
    const plan = getPlanSummary();
    const messageBody = `Hey Burhan,\n\nI just utilized the Project Scope Planner and would love to consult on this customized blueprint:\n\n` +
      `• Core Objective: ${selectedService}\n` +
      `• Business Scale: ${businessScale}\n` +
      `• Desired Features: ${selectedFeatures.join(', ')}\n` +
      `• Timeline preference: ${timelinePreference}\n` +
      `• Estimated Duration: ${plan.duration}\n` +
      `• Target Blueprint: ${plan.complexity} focussing on ${plan.designFocus}\n\n` +
      `Please review this setup and let's hop on a call to schedule our initial mapping meeting!`;

    onApplyPlan({
      service: selectedService,
      message: messageBody
    });
  };

  const plan = getPlanSummary();

  return (
    <div id="mago-scope-planner" className="w-full bg-white dark:bg-[#121212] rounded-3xl border border-neutral-200/80 dark:border-neutral-800/85 shadow-xl p-6 sm:p-10 font-sans transition-all max-w-4xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-900">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 mb-2">
            <Sparkles className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Free &amp; No Obligation</span>
          </div>
          <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">Mago Project Scope Planner</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Assemble your bespoke digital blueprint step-by-step.</p>
        </div>

        {/* Steps Progress Visualizer */}
        <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-900/50 p-2 rounded-xl border border-neutral-200/40 dark:border-neutral-800/40">
          {STEPS.map(s => (
            <div 
              key={s.id}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentStep === s.id 
                  ? 'w-8 bg-blue-600' 
                  : s.id < currentStep 
                    ? 'w-2.5 bg-blue-500/40' 
                    : 'w-2.5 bg-neutral-200 dark:bg-neutral-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content Pane */}
      <div className="py-8 min-h-[380px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="space-y-6 text-left"
          >
            {/* Step Header */}
            <div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Step {currentStep} of 5: {STEPS[currentStep - 1].title}
              </span>
              <h4 className="text-base font-bold text-neutral-800 dark:text-neutral-100 mt-1">
                {STEPS[currentStep - 1].subtitle}
              </h4>
            </div>

            {/* Step 1: Core Service Selector */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceOptions.map(opt => {
                  const Icon = opt.icon;
                  const isSelected = selectedService === opt.name;
                  return (
                    <button
                      key={opt.name}
                      onClick={() => setSelectedService(opt.name)}
                      className={`p-4 text-left rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50/20 dark:bg-blue-950/20 dark:border-blue-500 shadow-sm' 
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-transparent'
                      }`}
                    >
                      <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center ${opt.bg}`}>
                        <Icon className={`h-5 w-5 ${opt.color}`} />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-neutral-900 dark:text-white">{opt.name}</span>
                          {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                        </div>
                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-normal">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 2: Business Scale Selector */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scaleOptions.map(opt => {
                  const isSelected = businessScale === opt.name;
                  return (
                    <button
                      key={opt.name}
                      onClick={() => setBusinessScale(opt.name)}
                      className={`p-5 text-left rounded-2xl border transition-all cursor-pointer flex flex-col justify-between h-36 ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50/20 dark:bg-blue-950/20 dark:border-blue-500 shadow-sm' 
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-transparent'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">{opt.name}</span>
                        <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-neutral-300 dark:border-neutral-700'
                        }`}>
                          {isSelected && <span className="h-1.5 w-1.5 bg-white rounded-full" />}
                        </div>
                      </div>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed mt-2">{opt.desc}</p>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 3: Add-Ons Selector */}
            {currentStep === 3 && (
              <div className="space-y-3">
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-semibold">Select all that apply:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {featureOptions.map(opt => {
                    const isSelected = selectedFeatures.includes(opt.name);
                    return (
                      <button
                        key={opt.name}
                        onClick={() => toggleFeature(opt.name)}
                        className={`p-4 text-left rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected 
                            ? 'border-blue-600 bg-blue-50/15 dark:bg-blue-950/15 dark:border-blue-500' 
                            : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-transparent'
                        }`}
                      >
                        <div className="space-y-1">
                          <span className="text-xs font-bold text-neutral-900 dark:text-white block">{opt.name}</span>
                          <span className="text-[9px] text-neutral-400 dark:text-neutral-500 block leading-tight">{opt.desc}</span>
                        </div>
                        <div className={`h-4.5 w-4.5 rounded border shrink-0 flex items-center justify-center ${
                          isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-neutral-300 dark:border-neutral-700'
                        }`}>
                          {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Timeline selector */}
            {currentStep === 4 && (
              <div className="grid grid-cols-1 gap-4">
                {timelineOptions.map(opt => {
                  const isSelected = timelinePreference === opt.name;
                  return (
                    <button
                      key={opt.name}
                      onClick={() => setTimelinePreference(opt.name)}
                      className={`p-5 text-left rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                        isSelected 
                          ? 'border-blue-600 bg-blue-50/20 dark:bg-blue-950/20 dark:border-blue-500 shadow-sm' 
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-transparent'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-neutral-900 dark:text-white block">{opt.name}</span>
                        <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block leading-relaxed">{opt.desc}</span>
                      </div>
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-neutral-300 dark:border-neutral-700'
                      }`}>
                        {isSelected && <span className="h-2 w-2 bg-white rounded-full" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 5: Final Review of Project Blueprint */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200/40 dark:border-neutral-800/40 space-y-4">
                  <h5 className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">Custom Engineering Spec</h5>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold block">SERVICE</span>
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block truncate">{selectedService}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold block">SCALE TIER</span>
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block truncate">{businessScale}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold block">TIMELINE</span>
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block truncate">{plan.duration}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold block">PROJECT INTENSITY</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block truncate">{plan.intensity.label}</span>
                    </div>
                  </div>

                  <hr className="border-neutral-200/45 dark:border-neutral-800/50 my-2" />

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold flex items-center gap-1">
                        <Zap className="h-3 w-3 text-amber-500" />
                        INTENSITY SCORE
                      </span>
                      <span className="text-[10px] font-mono font-bold text-neutral-600 dark:text-neutral-300">{plan.intensity.score}/100</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                      <motion.div
                        key={plan.intensity.score}
                        initial={{ width: 0 }}
                        animate={{ width: `${plan.intensity.score}%` }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold block">COMPLEXITY SCORE</span>
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block">{plan.complexity}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold block">FOCUS AXIS</span>
                      <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block">{plan.designFocus}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-semibold block">SELECTED MODULES ({selectedFeatures.length})</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedFeatures.map(f => (
                        <span key={f} className="text-[9px] font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/15">
                          {f}
                        </span>
                      ))}
                      {selectedFeatures.length === 0 && (
                        <span className="text-[9px] text-neutral-400 italic">None selected. Standard core layout features will apply.</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-tr from-blue-600/10 via-indigo-600/5 to-transparent border border-blue-500/20 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left space-y-1.5">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Ready to initiate your build roadmap?</span>
                    <p className="text-[10px] text-neutral-500 dark:text-neutral-400 max-w-lg leading-relaxed">
                      Apply this plan to auto-populate the Consultation booking module below. This gives us precise context to begin scheduling the project kick-off!
                    </p>
                  </div>
                  
                  <motion.button
                    id="scope-planner-apply-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={applyPlanToForm}
                    className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-3.5 text-xs transition-all shadow-md shadow-blue-600/15 hover:shadow-lg hover:shadow-blue-600/25 cursor-pointer"
                  >
                    <span>Apply Blueprint & Fill Form</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex justify-between items-center pt-6 border-t border-neutral-100 dark:border-neutral-900 mt-6">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`inline-flex items-center gap-1 text-xs font-bold py-2.5 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1 text-xs font-bold py-2.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-200 transition-all cursor-pointer"
            >
              <span>Continue</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="pt-2 text-center">
        <span className="text-[9px] text-neutral-400 font-mono">*Intensity score reflects relative scope & complexity based on your selections. Final pricing is always confirmed on your kickoff call.</span>
      </div>
    </div>
  );
}
