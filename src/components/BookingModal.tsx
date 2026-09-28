'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { X, CheckCircle, Calendar, Phone, Mail, User, Building } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultResidence?: string;
}

export default function BookingModal({ isOpen, onClose, defaultResidence = 'The Penthouse (Worli)' }: BookingModalProps) {
  const [residence, setResidence] = useState(defaultResidence);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#050505]/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-2xl bg-[#1D201F] text-[#EFECE6] rounded-3xl p-8 md:p-12 border border-white/15 shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            {/* Ambient liquid glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-6 right-6 w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:scale-105 active:scale-95 transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <X size={18} />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 flex flex-col items-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-serif text-3xl md:text-4xl text-white">Viewing Scheduled</h3>
                <p className="font-sans text-sm text-white/70 max-w-md leading-relaxed">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. A private residential advisor will contact you within 24 hours to confirm your private walkthrough of {residence}.
                </p>
              </motion.div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D9383A]" />
                  <p className="font-sans text-xs tracking-[0.3em] uppercase opacity-50">Private Appointments</p>
                </div>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-2">
                  Book a <span className="italic font-light">Walkthrough</span>
                </h2>
                <p className="font-sans text-sm opacity-65 mb-8 leading-relaxed">
                  Experience the pinnacle of coastal architecture. Connect directly with our private client atelier.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest opacity-60 mb-2">Full Name</label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Lord / Lady / Dr. / Mr."
                          className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest opacity-60 mb-2">Email Address</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="client@sanctum.com"
                          className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest opacity-60 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98200 00000"
                          className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest opacity-60 mb-2">Preferred Date</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors [color-scheme:dark]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest opacity-60 mb-2">Select Residence</label>
                    <div className="relative">
                      <Building size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
                      <select
                        value={residence}
                        onChange={(e) => setResidence(e.target.value)}
                        className="w-full pl-11 pr-4 py-3.5 bg-[#171918] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/40 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="The Penthouse (Worli)">The Penthouse — Worli (4 Beds · ₹48 Cr)</option>
                        <option value="The Villa (Bandra)">The Villa — Bandra (6 Beds · ₹32 Cr)</option>
                        <option value="The Mansion (Juhu)">The Mansion — Juhu (8 Beds · ₹75 Cr)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="group relative w-full py-4 rounded-full overflow-hidden border border-white/30 font-sans text-xs uppercase tracking-[0.25em] font-medium text-white transition-all shadow-lg hover:border-white/60 active:scale-[0.99]"
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: 'blur(16px)',
                      }}
                    >
                      <span className="relative z-10 group-hover:text-[#1D201F] transition-colors duration-500">
                        Confirm Private Walkthrough
                      </span>
                      <div className="absolute inset-0 bg-[#EFECE6] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
