import { useState, FormEvent, ChangeEvent } from 'react';
import { Phone, Mail, Clock, Send, CheckCircle2, MapPin, Calendar, Sparkles } from 'lucide-react';
import { WhatsAppLogo } from '../components/BrandIcons';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import SEO from '../components/SEO';
import ScopePlanner from '../components/ScopePlanner';

interface ContactProps {
  onPageChange: (page: PageId) => void;
}

interface FormState {
  name: string;
  phone: string;
  email: string;
  businessName: string;
  service: string;
  message: string;
}

export default function Contact({ onPageChange }: ContactProps) {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    service: 'Website Design & Development',
    message: '',
  });

  const handleApplyPlan = (plan: { service: string; message: string }) => {
    setFormData((prev) => ({
      ...prev,
      service: plan.service,
      message: plan.message,
    }));
    // Scroll down to contact form smoothly
    const contactFormEl = document.getElementById('name');
    if (contactFormEl) {
      contactFormEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        contactFormEl.focus();
      }, 500);
    }
  };

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const servicesDropdown = [
    'Website Design & Development',
    'Search Engine Optimization (SEO)',
    'Google Business Profile (GBP)',
    'Conversion Copywriting',
    'Full-Scale Agency Partnership',
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required.';
    if (!formData.phone.trim()) return 'Phone number is required.';
    if (!formData.email.trim()) return 'Email is required.';
    if (!/\S+@\S+\.\S+/.test(formData.email)) return 'Email is invalid.';
    if (!formData.message.trim()) return 'Please enter your project message.';
    return '';
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setErrorMsg('');
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit enquiry. Please try again.');
      }

      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        businessName: '',
        service: 'Website Design & Development',
        message: '',
      });
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again or contact us directly on WhatsApp.');
    }
  };

  const contactSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': 'https://www.magolabs.in/contact/#webpage',
      'url': 'https://www.magolabs.in/contact',
      'name': 'Contact Burhan Kapasi & Mago Labs',
      'description': 'Submit your enquiry or call Mago Labs directly. We provide consultation calls for doctors, CA firms, Manufacturers, and businesses.'
    }
  ];

  return (
    <>
      <SEO path="contact" schemas={contactSchemas} />

      {/* Hero Header */}
      <section id="contact-hero" className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white font-sans overflow-hidden border-b border-neutral-200/50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Get In Touch</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
              Let's Build Something Amazing
            </h1>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              Have a project, brand, factory, or firm in mind? Reach out below. I personally review every single message and respond within 1 business day.
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Direct conversation. No obligation. No sales-team handoff.
            </p>
          </div>
        </div>
      </section>

      {/* Scope Planner Section */}
      <section id="contact-scope-planner" className="py-16 bg-neutral-50/50 font-sans border-b border-neutral-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScopePlanner onApplyPlan={handleApplyPlan} />
        </div>
      </section>

      {/* Contact Form & Details split */}
      <section id="contact-split-section" className="py-24 bg-neutral-50 font-sans">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Direct Contact</span>
                <h2 className="text-2xl font-bold text-neutral-900">Direct Inquiries</h2>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Skip the form and communicate with us directly if you prefer immediate, real-world answers.
                </p>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                {/* Phone */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-neutral-200/60 shadow-sm hover:shadow-md transition-all">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Call Directly</span>
                    <p className="mt-1 font-sans text-neutral-900 font-bold text-base">
                      <a href="tel:+919099245605" className="hover:text-blue-600 transition-colors">
                        +91 9099245605
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-neutral-200/60 shadow-sm hover:shadow-md transition-all">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Send Email</span>
                    <p className="mt-1 font-sans text-neutral-900 font-bold text-base">
                      <a href="mailto:burhan@magolabs.in" className="hover:text-blue-600 transition-colors">
                        burhan@magolabs.in
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4 p-5 rounded-2xl bg-white border border-neutral-200/60 shadow-sm hover:shadow-md transition-all">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Business Hours</span>
                    <p className="mt-1 font-sans text-neutral-900 font-bold text-sm">
                      Monday – Saturday: 9:00 AM – 7:00 PM
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">Sunday: Closed</p>
                  </div>
                </div>

                {/* Google Business Profile */}
                <a
                  href="https://maps.app.goo.gl/MT8QiwA56T7NtyC18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-4 p-5 rounded-2xl bg-white border border-neutral-200/60 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Find Us on Google</span>
                    <p className="mt-1 font-sans text-neutral-900 font-bold text-base hover:text-blue-600 transition-colors">
                      View our Google Business Profile
                    </p>
                    <p className="text-[11px] text-neutral-400 mt-0.5">See reviews & get directions</p>
                  </div>
                </a>
              </div>

              {/* CTA Action Bar */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="tel:+919099245605"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-3 text-sm font-bold border border-neutral-800 transition-colors text-center"
                >
                  <Phone className="h-4 w-4" />
                  Call Now
                </a>
                <a
                  href="https://wa.me/919099245605?text=Hi%20Mago%20Labs%2C%20I%20would%20like%20to%20discuss%20my%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 text-sm font-bold border border-emerald-500 transition-colors text-center"
                >
                  <WhatsAppLogo className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href="mailto:burhan@magolabs.in"
                  className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-3 text-sm font-bold border border-neutral-800 transition-colors text-center"
                >
                  <Mail className="h-4 w-4" />
                  Email Us
                </a>
              </div>


            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 shadow-sm">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="contact-form"
                      onSubmit={handleFormSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2 mb-6">
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4" />
                          Project Enquiry
                        </span>
                        <h3 className="text-xl font-bold text-neutral-900">Map Out Your Digital Strategy</h3>
                      </div>

                      {errorMsg && (
                        <div className="p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-xs sm:text-sm font-medium">
                          {errorMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="e.g., Dr. Sameer Shah"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            placeholder="e.g., +91 98765 43210"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Email */}
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="e.g., sameer@yourcompany.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </div>

                        {/* Business Name */}
                        <div className="space-y-2">
                          <label htmlFor="businessName" className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                            Business Name
                          </label>
                          <input
                            type="text"
                            id="businessName"
                            name="businessName"
                            placeholder="e.g., Acme Corporation"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      {/* Service Required Dropdown */}
                      <div className="space-y-2">
                        <label htmlFor="service" className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                          Service Required *
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
                        >
                          {servicesDropdown.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-bold text-neutral-700 uppercase tracking-wide">
                          Briefly Describe Your Requirements *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          placeholder="Tell us about your business goals. E.g., 'We need a responsive custom website to showcase our services and capture premium client leads.'"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3.5 text-sm text-neutral-900 placeholder-neutral-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 text-base font-bold transition-all hover:translate-y-[-1px] disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-blue-600/10 cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              Submitting Details...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              Discuss Your Project
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-neutral-400 text-center leading-relaxed pt-2">
                        By submitting, you agree to receive a direct call or WhatsApp message regarding your project sitemap quote. We never send spam lists.
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success-message"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 space-y-6"
                    >
                      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600">
                        <CheckCircle2 className="h-10 w-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-extrabold text-neutral-900">Thank You! Message Received.</h3>
                        <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                          Hi there, I have received your request regarding <strong>{formData.service}</strong>.
                        </p>
                        <p className="text-neutral-500 text-sm leading-relaxed max-w-md mx-auto">
                          I will personal study your business online presence and get in touch with you via email or phone within the next 24 hours to schedule our discovery call.
                        </p>
                      </div>

                      <div className="pt-6 border-t border-neutral-100 max-w-xs mx-auto space-y-3">
                        <p className="text-xs text-neutral-400 uppercase font-bold tracking-widest">Immediate Inquiry?</p>
                        <a
                          href="https://wa.me/919099245605?text=Hi%20Mago%20Labs%2C%20I%20just%20submitted%20the%20contact%20form%20and%20would%20like%20to%20chat%20now."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3 text-sm font-bold shadow transition-colors"
                        >
                          <WhatsAppLogo className="h-4.5 w-4.5" />
                          Chat on WhatsApp Now
                        </a>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="text-xs text-neutral-500 hover:underline hover:text-neutral-800"
                        >
                          Submit another enquiry
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
