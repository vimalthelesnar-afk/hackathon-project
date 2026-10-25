import React, { useState } from 'react';
import {
  HelpCircle,
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Search,
  Loader2,
} from 'lucide-react';
import { FAQ_ITEMS } from '../data/mockData';
import { api } from '../services/api';

export const FaqContact: React.FC = () => {
  // FAQ state
  const [searchFaq, setSearchFaq] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [contactSuccess, setContactSuccess] = useState<{ message: string; ticketId: string } | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  const filteredFaqs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchFaq.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchFaq.toLowerCase()) ||
      item.category.toLowerCase().includes(searchFaq.toLowerCase())
  );

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactError(null);

    if (!name.trim()) {
      setContactError('Please enter your name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setContactError('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setContactError('Message must be at least 10 characters.');
      return;
    }

    setIsSending(true);

    try {
      const res = await api.sendContactMessage({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim() || 'General Inquiry',
        message: message.trim(),
      });

      setContactSuccess({
        message: res.message,
        ticketId: res.ticketId,
      });
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setContactError(err.message || 'Failed to dispatch inquiry.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="faq" className="py-20 bg-[#050811] tech-grid-pattern border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FAQ Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>FREQUENTLY ASKED QUESTIONS</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>KNOWLEDGE BASE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Got Questions?
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Clear answers regarding team formation, intellectual property rights, evaluation, and hardware/API provisions.
            </p>

            {/* Search FAQ */}
            <div className="mt-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search queries (e.g., IP ownership, fees, team size)..."
                value={searchFaq}
                onChange={(e) => setSearchFaq(e.target.value)}
                className="w-full bg-[#070B16] border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>

            {/* Accordion */}
            <div className="mt-6 space-y-3">
              {filteredFaqs.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No questions match your search. Contact the Secretariat via the form.
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;

                  return (
                    <div
                      key={idx}
                      className="glass-card rounded-xl border border-slate-800/90 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/40 transition-colors"
                      >
                        <span className="text-sm font-semibold text-white">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180 text-emerald-400' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/40">
                          <p>{faq.answer}</p>
                          <span className="mt-3 block text-[11px] font-mono text-emerald-400/80">
                            Category: {faq.category}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Contact Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 sticky top-24">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <Mail className="w-4 h-4" />
                <span>ORGANIZING SECRETARIAT</span>
              </div>
              <h3 className="text-xl font-bold text-white">
                Contact & Support Desk
              </h3>
              <p className="mt-1 text-xs text-slate-300">
                Inquiries regarding college registration verification, sponsorship, or mentorship panels.
              </p>

              {contactSuccess ? (
                <div className="mt-6 p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-white mb-1">Message Received!</h4>
                  <p className="text-xs text-slate-300 mb-3">{contactSuccess.message}</p>
                  <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 py-1 px-3 rounded inline-block">
                    Ticket Reference: {contactSuccess.ticketId}
                  </div>
                  <button
                    onClick={() => setContactSuccess(null)}
                    className="block mx-auto mt-4 text-xs text-slate-400 hover:text-white underline cursor-pointer"
                  >
                    Send another query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                  {contactError && (
                    <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{contactError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Your Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Iyer"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. maya@institution.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Team Verification Query"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Message <span className="text-emerald-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Describe your inquiry with detail..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-2.5 text-xs font-semibold text-[#050811] bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 disabled:opacity-50 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Inquiry</span>
                      </>
                    )}
                  </button>

                  <div className="pt-2 text-[11px] text-slate-500 font-mono text-center">
                    Official Desk: <span className="text-slate-400">secretariat@minthackathon.org</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
