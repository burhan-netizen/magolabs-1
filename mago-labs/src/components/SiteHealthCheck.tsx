import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Smartphone,
  Zap,
  MousePointerClick,
  MapPin,
  PenTool,
  ArrowRight,
  RotateCcw,
  Sparkles,
  PartyPopper,
  AlertTriangle,
  ThumbsUp,
} from 'lucide-react';

interface QuizOption {
  label: string;
  score: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  icon: React.ComponentType<{ className?: string }>;
  options: QuizOption[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'mobile',
    question: 'On your phone, does your site feel like it was actually built for a phone?',
    icon: Smartphone,
    options: [
      { label: 'Yes, feels smooth and tactile', score: 3 },
      { label: "It's usable, but a bit clunky", score: 1.5 },
      { label: 'Honestly? Not really.', score: 0 },
    ],
  },
  {
    id: 'speed',
    question: 'How long before your homepage actually loads on 4G?',
    icon: Zap,
    options: [
      { label: 'Feels instant', score: 3 },
      { label: 'A couple seconds, tolerable', score: 1.5 },
      { label: 'Long enough to lose patience', score: 0 },
    ],
  },
  {
    id: 'action',
    question: 'Can a visitor call, WhatsApp, or book you in one tap, no hunting?',
    icon: MousePointerClick,
    options: [
      { label: 'One tap, right there', score: 3 },
      { label: "It's somewhere on the page", score: 1.5 },
      { label: 'They\'d have to dig for it', score: 0 },
    ],
  },
  {
    id: 'local',
    question: 'When people nearby search for what you do, do you show up on Google Maps?',
    icon: MapPin,
    options: [
      { label: 'Consistently in the top results', score: 3 },
      { label: 'Sometimes, inconsistently', score: 1.5 },
      { label: "I don't actually know", score: 0 },
    ],
  },
  {
    id: 'copy',
    question: 'Does your homepage text sound like generic filler, or like you?',
    icon: PenTool,
    options: [
      { label: 'It sounds like us, clearly', score: 3 },
      { label: "It's fine, a bit generic", score: 1.5 },
      { label: 'Total filler, if I\'m honest', score: 0 },
    ],
  },
];

const MAX_SCORE = QUESTIONS.length * 3;

function getBand(pct: number) {
  if (pct >= 75) {
    return {
      title: 'Ahead of the Curve',
      tone: 'You\'re doing more right than most local businesses. Small refinements could push you further ahead.',
      icon: ThumbsUp,
      color: 'text-emerald-500',
      ring: '#10B981',
    };
  }
  if (pct >= 40) {
    return {
      title: 'Solid, But Leaking Leads',
      tone: 'You have the basics, but the gaps you flagged are likely costing you real enquiries every week.',
      icon: AlertTriangle,
      color: 'text-amber-500',
      ring: '#F59E0B',
    };
  }
  return {
    title: 'Time for a Rebuild',
    tone: 'Your site is probably working against you more than for you. A custom rebuild would likely pay for itself fast.',
    icon: PartyPopper,
    color: 'text-rose-500',
    ring: '#F43F5E',
  };
}

export default function SiteHealthCheck() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>([]);

  const isDone = step >= QUESTIONS.length;
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const pct = Math.round((totalScore / MAX_SCORE) * 100);
  const band = isDone ? getBand(pct) : null;

  const answer = (score: number) => {
    setScores((prev) => [...prev, score]);
    setStep((s) => s + 1);
  };

  const restart = () => {
    setScores([]);
    setStep(0);
  };

  const goToContact = () => {
    const contactEl = document.getElementById('contact-footer');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const circumference = 2 * Math.PI * 54;

  return (
    <div id="site-health-check" className="max-w-2xl mx-auto bg-white rounded-3xl border border-neutral-200/90 shadow-xl overflow-hidden font-sans">
      <div className="p-8 sm:p-10 border-b border-neutral-100 bg-neutral-50/50 text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600">
          <Sparkles className="h-3.5 w-3.5" />
          60-Second Website Health Check
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-2">
          How's your website actually doing?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mt-2">
          Answer 5 honest questions. No email required, no fake stats, just a quick gut-check and a few pointers.
        </p>
      </div>

      <div className="p-8 sm:p-10 min-h-[320px] flex flex-col justify-center">
        {!isDone ? (
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="flex items-center gap-2">
              {QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    idx < step ? 'bg-blue-600' : idx === step ? 'bg-blue-300' : 'bg-neutral-100'
                  }`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    {(() => {
                      const Icon = QUESTIONS[step].icon;
                      return <Icon className="h-5 w-5 text-blue-600" />;
                    })()}
                  </div>
                  <p className="text-base sm:text-lg font-bold text-neutral-900 leading-snug text-left">
                    {QUESTIONS[step].question}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {QUESTIONS[step].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => answer(opt.score)}
                      className="w-full text-left px-5 py-3.5 rounded-xl border border-neutral-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all text-sm font-semibold text-neutral-700 hover:text-blue-900 cursor-pointer flex items-center justify-between group"
                    >
                      <span>{opt.label}</span>
                      <ArrowRight className="h-4 w-4 text-neutral-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="flex flex-col items-center text-center gap-5"
          >
            {/* Score gauge */}
            <div className="relative h-36 w-36">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="#F1F5F9" strokeWidth="10" />
                <motion.circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={band!.ring}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: circumference - (pct / 100) * circumference }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-neutral-900">{pct}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">Health Score</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className={`flex items-center justify-center gap-1.5 font-extrabold text-lg ${band!.color}`}>
                {(() => {
                  const Icon = band!.icon;
                  return <Icon className="h-5 w-5" />;
                })()}
                {band!.title}
              </div>
              <p className="text-sm text-neutral-500 max-w-md leading-relaxed">{band!.tone}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={goToContact}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-6 py-3 text-xs font-bold text-white transition-all cursor-pointer"
              >
                Talk Through My Results
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={restart}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 px-6 py-3 text-xs font-bold text-neutral-600 transition-all cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Retake Quiz
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
