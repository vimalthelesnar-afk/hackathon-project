import React from 'react';
import { Mail, Globe, Github, Twitter, Linkedin, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenRegister }) => {
  return (
    <footer className="bg-[#03050B] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-[#050811] font-black text-base shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                M
              </div>
              <span className="font-display tracking-wider text-2xl font-black text-white">
                MINT
              </span>
            </div>

            <p className="text-emerald-400 font-mono text-xs">
              "Imagine. Innovate. Inspire."
            </p>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              MINT is India's flagship national-level technology hackathon, dedicated to bridging collegiate research breakthroughs with mission-critical challenges across defense, intelligence, energy, and digital sovereignty.
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
              Competition
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  About MINT 2026
                </a>
              </li>
              <li>
                <a href="#challenges" className="hover:text-emerald-400 transition-colors">
                  8 Challenge Tracks
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-emerald-400 transition-colors">
                  Milestone Schedule
                </a>
              </li>
              <li>
                <a href="#leaderboard" className="hover:text-emerald-400 transition-colors">
                  Live Standings
                </a>
              </li>
              <li>
                <a href="#submissions" className="hover:text-emerald-400 transition-colors">
                  Deliverable Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Guidelines */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
              Governance & Rules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  Evaluation Rubric (30/25/25/20)
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">
                  Intellectual Property Terms
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Participant Code of Conduct
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Eligibility & Verification
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="text-slate-400 hover:text-emerald-400 transition-colors text-left cursor-pointer"
                >
                  Admin & Jury Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Secretariat Contact */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-white uppercase tracking-wider font-semibold">
              Secretariat Desk
            </h4>
            <div className="space-y-2 text-xs leading-relaxed text-slate-400">
              <p>National Tech Innovation Coalition</p>
              <p>Department of Engineering & Research</p>
              <p className="font-mono text-emerald-400/90 pt-1">
                secretariat@minthackathon.org
              </p>
              <div className="pt-2">
                <button
                  onClick={onOpenRegister}
                  className="w-full py-2 px-3 text-xs font-semibold text-[#050811] bg-emerald-400 hover:bg-emerald-300 rounded transition-colors cursor-pointer"
                >
                  Register Team Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 MINT National Hackathon. All rights reserved. Intellectual Property remains with participating teams.
          </div>

          <div className="flex items-center gap-4">
            <span>Official Flagship Hackathon Platform</span>
            <span>·</span>
            <span className="font-mono text-emerald-400/80">Edition 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
