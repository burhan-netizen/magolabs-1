import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { WhatsAppLogo } from './BrandIcons';
import { WHATSAPP_URL } from '../utils/contactLinks';
import { detectCurrency } from '../hooks/useCurrency';

/** Where the visitor is starting from: an existing website, or none yet. */
export type LeadMode = 'audit' | 'new';

interface LeadFormProps {
  /** Prefix for field ids, so two forms can sit on one page. */
  idPrefix?: string;
  /** Recorded with the enquiry, so you can see which page it came from. */
  source?: string;
  /** Which starting point is selected. Leave out to let the form manage it. */
  mode?: LeadMode;
  onModeChange?: (mode: LeadMode) => void;
  /** Starting text for the message box, e.g. the package chosen on the pricing page. */
  presetMessage?: string;
}

interface LeadFormState {
  name: string;
  phone: string;
  website: string;
  business: string;
  message: string;
}

/** A form submission started by an AI agent in the browser (WebMCP), which waits
 *  for a plain-text result instead of reading the page. */
type AgentSubmitEvent = Event & { agentInvoked?: boolean; respondWith?: (result: Promise<string>) => void };

// Describes the form to AI agents browsing on a visitor's behalf (WebMCP), so they
// can fill it in reliably. The visitor still presses the button to send it.
const AGENT_TOOL = {
  toolname: 'request_free_website_audit',
  tooldescription:
    'Send an enquiry to Mago Labs, a website design studio. Use it to request a free audit of an existing website, or a free plan for a first website. Mago Labs replies within one business day.',
};

const EMPTY: LeadFormState = { name: '', phone: '', website: '', business: '', message: '' };

// The words that change with the visitor's starting point.
const MODE_COPY: Record<LeadMode, { tab: string; button: string; service: string; thanks: string }> = {
  audit: {
    tab: 'I have a website',
    button: 'Get my free audit',
    service: 'Free website audit',
    thanks: 'Burhan will look at your website and get back to you within one business day.',
  },
  new: {
    tab: 'I don’t have one yet',
    button: 'Get my free website plan',
    service: 'Free website plan (no website yet)',
    thanks: 'Burhan will put together a plan for your first website and get back to you within one business day.',
  },
};

const fieldClass =
  'w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-neutral-900 transition-colors';
const labelClass = 'block text-sm font-semibold text-neutral-900 mb-1.5';

/**
 * The one form on the site. Deliberately short: a name and a phone number are
 * enough to start a conversation, everything else is optional.
 */
export default function LeadForm({ idPrefix = 'lead', source = 'Website', mode, onModeChange, presetMessage }: LeadFormProps) {
  const [ownMode, setOwnMode] = useState<LeadMode>('audit');
  const activeMode = mode ?? ownMode;
  const copy = MODE_COPY[activeMode];
  const chooseMode = (next: LeadMode) => {
    setOwnMode(next);
    onModeChange?.(next);
  };

  const [form, setForm] = useState<LeadFormState>(EMPTY);
  useEffect(() => {
    if (presetMessage) setForm((prev) => (prev.message ? prev : { ...prev, message: presetMessage }));
  }, [presetMessage]);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  const update = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const outcome = send();
    const agentEvent = e.nativeEvent as AgentSubmitEvent;
    if (agentEvent.agentInvoked) agentEvent.respondWith?.(outcome);
  };

  /** Sends the enquiry. Resolves with a one-line result, which an AI agent reads. */
  const send = async (): Promise<string> => {
    const invalid = (message: string) => {
      setError(message);
      return `Not sent: ${message}`;
    };
    if (!form.name.trim()) return invalid('Please tell us your name.');
    if (form.phone.replace(/\D/g, '').length < 7) return invalid('Please enter a phone or WhatsApp number we can reach you on.');

    setError('');
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          website: activeMode === 'audit' ? form.website.trim() : '',
          businessName: activeMode === 'new' ? form.business.trim() : '',
          message: form.message.trim(),
          service: copy.service,
          // Tells you which price list this visitor was shown.
          source: detectCurrency() === 'USD' ? `${source} (outside India, saw USD prices)` : source,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || 'Something went wrong.');
      setStatus('sent');
      setForm(EMPTY);
      return `Enquiry sent. ${copy.thanks}`;
    } catch {
      setStatus('idle');
      setError('That did not go through. Please try again, or message us on WhatsApp.');
      return 'Not sent: the enquiry did not go through. Try again, or message Mago Labs on WhatsApp.';
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 sm:p-10 text-left space-y-4" role="status">
        <span className="eyebrow">Received</span>
        <h3 className="text-2xl font-bold text-neutral-900">Thank you. We have your details.</h3>
        <p className="text-base text-neutral-600 leading-relaxed">
          {copy.thanks}
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 underline decoration-brand decoration-2 underline-offset-4"
        >
          <WhatsAppLogo className="h-4 w-4 text-emerald-600" />
          Need an answer sooner? Message us on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate {...AGENT_TOOL} className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 text-left space-y-5">
      {/* Starting point: the same form serves people with a website and people without one */}
      <div role="radiogroup" aria-label="Where are you starting from?" className="grid grid-cols-2 gap-1 rounded-full bg-neutral-100 p-1">
        {(['audit', 'new'] as LeadMode[]).map((option) => {
          const selected = activeMode === option;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => chooseMode(option)}
              className={`rounded-full px-3 py-3 text-sm font-semibold transition-colors cursor-pointer ${
                selected ? 'bg-neutral-950 text-[#ffffff]' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {MODE_COPY[option].tab}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelClass}>Your name</label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            {...{ toolparamdescription: 'Full name of the person making the enquiry.' }}
            value={form.name}
            onChange={update}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className={labelClass}>Phone or WhatsApp</label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            {...{ toolparamdescription: 'Phone or WhatsApp number to reply on, with country code if outside India.' }}
            value={form.phone}
            onChange={update}
            className={fieldClass}
          />
        </div>
      </div>

      {activeMode === 'audit' ? (
        <div>
          <label htmlFor={`${idPrefix}-website`} className={labelClass}>Your website address</label>
          <input
            id={`${idPrefix}-website`}
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourbusiness.com"
            {...{ toolparamdescription: 'Address of the existing website to audit, for example yourbusiness.com.' }}
            value={form.website}
            onChange={update}
            className={fieldClass}
          />
        </div>
      ) : (
        <div>
          <label htmlFor={`${idPrefix}-business`} className={labelClass}>What does your business do?</label>
          <input
            id={`${idPrefix}-business`}
            name="business"
            type="text"
            autoComplete="organization"
            placeholder="For example: a dental clinic in Surat"
            {...{ toolparamdescription: 'What the business does and where, for a business with no website yet.' }}
            value={form.business}
            onChange={update}
            className={fieldClass}
          />
        </div>
      )}

      <div>
        <label htmlFor={`${idPrefix}-message`} className={labelClass}>
          Anything we should know? <span className="font-normal text-neutral-500">(optional)</span>
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={3}
          {...{ toolparamdescription: 'Optional. Anything else Mago Labs should know, such as goals, budget or timeline.' }}
          value={form.message}
          onChange={update}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand hover:bg-brand-deep px-6 py-4 text-base font-semibold text-ink transition-colors cursor-pointer disabled:opacity-60 disabled:pointer-events-none"
      >
        {status === 'sending' ? 'Sending...' : copy.button}
        {status !== 'sending' && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="text-xs text-neutral-500 leading-relaxed">
        Free, with no obligation. We reply within one business day and never send spam.
      </p>
    </form>
  );
}
