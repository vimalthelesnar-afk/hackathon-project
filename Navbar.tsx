import React, { useState } from 'react';
import { Menu, X, Shield, Lock, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenRegister: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegister,
  onOpenAdmin,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Challenges', href: '#challenges' },
    { label: 'Timeline', href: '#schedule' },
    { label: 'Leaderboard', href: '#leaderboard' },
    { label: 'Submit Work', href: '#submissions' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050811]/90 backdrop-blur-md border-b border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="group flex items-center gap-2.5 text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
            aria-label="MINT Home"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[#050811] font-black text-lg shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:shadow-[0_0_22px_rgba(16,185,129,0.6)] transition-all">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-display tracking-wider text-2xl font-black bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                MINT
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 concise single-line text links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive ? 'text-emerald-400' : 'hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action button + discrete admin gate */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-emerald-300 hover:bg-emerald-950/40 rounded border border-slate-800 transition-colors whitespace-nowrap shrink-0"
              title="Organizer Admin Portal"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Console</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="px-5 py-2.5 text-sm font-semibold text-[#050811] bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_28px_rgba(16,185,129,0.5)] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              Register Team
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0F1D] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-900 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-400 hover:text-emerald-300 rounded border border-slate-800"
            >
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Portal</span>
            </button>
            <span className="text-xs text-slate-500 font-mono">MINT 2026 National</span>
          </div>
        </div>
      )}
    </header>
  );
};
