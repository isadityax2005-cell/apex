'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultResidence?: string;
}

export default function BookCallModal({ isOpen, onClose, defaultResidence = 'General Inquiry' }: BookCallModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus trap & auto-focus & Lenis scroll lock
  useEffect(() => {
    const lenis = typeof window !== 'undefined' ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis : undefined;
    if (isOpen) {
      setStatus('idle');
      setErrorMessage('');
      setTimeout(() => firstInputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      lenis?.start();
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error('Please accept the privacy policy to proceed.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/book-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          consent,
          honeypot,
          residence: defaultResidence,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Oops! Something went wrong while submitting the form.');
      }

      setStatus('success');
      toast.success("Request received! Our sales manager will contact you shortly.");
      setTimeout(() => {
        onClose();
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setConsent(false);
        setStatus('idle');
      }, 3500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Oops! Something went wrong while submitting the form.';
      setStatus('error');
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#060807]/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-xl bg-[#171A19] text-[#EFECE6] rounded-3xl p-7 md:p-10 border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.6)] my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/15 transition-all text-white/70 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>

            {status === 'success' ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-6">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-serif text-3xl mb-3 text-white">We&apos;ve received your request</h3>
                <p className="font-serif text-lg italic text-[#C5A880] mb-4">Thank you.</p>
                <p className="font-sans text-sm opacity-75 max-w-md leading-relaxed">
                  Our sales manager will review your message and reply within one business day with comprehensive specifications and availability.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#C5A880] block mb-2">
                    {defaultResidence ? defaultResidence : 'Apex Residency Worli Sea Face'}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-white">Book a Call</h3>
                  <p className="font-sans text-xs opacity-60 mt-1">
                    Connect directly with our sales team for private floor plans and pricing.
                  </p>
                </div>

                {status === 'error' && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-xs">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field for spam bots */}
                  <input
                    type="text"
                    name="website_honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest opacity-60 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#C5A880] focus:outline-none transition-colors text-sm text-white placeholder-white/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-[11px] uppercase tracking-widest opacity-60 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#C5A880] focus:outline-none transition-colors text-sm text-white placeholder-white/20"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-[11px] uppercase tracking-widest opacity-60 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+34 600 000 000"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#C5A880] focus:outline-none transition-colors text-sm text-white placeholder-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-widest opacity-60 mb-1.5">
                      Message (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify preferred unit, terrace size, or viewing timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#C5A880] focus:outline-none transition-colors text-sm text-white placeholder-white/20 resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        required
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="mt-1 rounded border-white/30 text-[#C5A880] focus:ring-0"
                      />
                      <span className="font-sans text-xs opacity-65 leading-relaxed">
                        I agree to the processing of my personal data in accordance with the{' '}
                        <a href="/privacy" target="_blank" className="underline hover:text-white">
                          Privacy Policy
                        </a>.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full mt-4 py-4 rounded-full font-sans text-xs tracking-[0.25em] uppercase font-semibold bg-[#EFECE6] text-[#171A19] hover:bg-white transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <span>Submit Request</span>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
