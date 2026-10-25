import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Calendar, Trophy, Users, ShieldCheck, ChevronRight } from 'lucide-react';
import { HackathonConfig } from '../types';

interface HeroProps {
  config: HackathonConfig;
  onRegisterClick: () => void;
  onExploreChallenges: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  onRegisterClick,
  onExploreChallenges,
}) => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(config.eventDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [config.eventDate]);

  return (
    <div className="relative overflow-hidden bg-[#050811] tech-grid-pattern pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/80">
      {/* Background imagery with measured cinematic scrim */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="/src/assets/images/hero_hackathon_stage_1792897963973.jpg"
          alt="MINT Hackathon Innovation Stage"
          className="w-full h-full object-cover opacity-20 filter brightness-75 contrast-125 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/85 to-[#050811]/90" />
        <div className="absolute inset-0 mint-glow-radial" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Notice / Metadata Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-6">
          <span className="uppercase tracking-widest font-semibold">National Innovation Initiative</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span className="text-slate-400">All India Engineering & Technology Sprint</span>
          <span aria-hidden="true" className="text-slate-600">/</span>
          <span className="text-slate-400">Edition 2026</span>
        </div>

        {/* Hero Headline & Value Proposition */}
        <div className="max-w-4xl">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] text-balance">
            WHERE INNOVATION <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              MEETS IMPACT.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl text-balance">
            Think beyond boundaries. Build the future. Compete with the brightest minds across the country to engineer production-ready prototypes that solve urgent national dilemmas.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={onRegisterClick}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-[#050811] bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-lg shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.55)] transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Register Your Team</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onExploreChallenges}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/40 rounded-lg transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Explore Challenges</span>
              <ChevronRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

          {/* Event Status Bar & Guarantee */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Official National Flagship Hackathon
            </span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Zero Entry Fee</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>100% Team IP Ownership</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>{config.totalPrizePool}</span>
          </div>
        </div>

        {/* Countdown Timer Block */}
        <div className="mt-12 lg:mt-16 max-w-4xl glass-card rounded-xl p-6 sm:p-8 border border-emerald-500/20 mint-glow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                <Calendar className="w-4 h-4" />
                <span>Hackathon Countdown</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Grand Finale Sprint Begins In
              </h2>
            </div>
            <div className="text-xs text-slate-400 font-mono text-left md:text-right">
              Target Opening: <span className="text-slate-200">{new Date(config.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-6 mt-6">
            <div className="bg-[#050811]/80 rounded-lg p-3 sm:p-5 border border-slate-800 text-center">
              <span className="block text-2xl sm:text-5xl font-mono font-bold text-white tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider mt-1 block">
                Days
              </span>
            </div>

            <div className="bg-[#050811]/80 rounded-lg p-3 sm:p-5 border border-slate-800 text-center">
              <span className="block text-2xl sm:text-5xl font-mono font-bold text-white tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider mt-1 block">
                Hours
              </span>
            </div>

            <div className="bg-[#050811]/80 rounded-lg p-3 sm:p-5 border border-slate-800 text-center">
              <span className="block text-2xl sm:text-5xl font-mono font-bold text-emerald-400 tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider mt-1 block">
                Minutes
              </span>
            </div>

            <div className="bg-[#050811]/80 rounded-lg p-3 sm:p-5 border border-slate-800 text-center">
              <span className="block text-2xl sm:text-5xl font-mono font-bold text-emerald-400 tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400 uppercase tracking-wider mt-1 block">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* Projected Statistics Strip (Mandatory clear identification of demo/benchmark content) */}
        <div className="mt-12 pt-8 border-t border-slate-800/80">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-xs font-mono text-slate-400">
              National Participation Metrics <span className="text-emerald-400/80">· Demonstration Benchmarks</span>
            </span>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              Projected for MINT 2026 Cycle
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="glass-card rounded-lg p-5 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Participant Cohort</div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 tabular-nums">
                2,500+
              </div>
              <div className="text-xs text-slate-500 mt-1">Student engineers & innovators</div>
            </div>

            <div className="glass-card rounded-lg p-5 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Registered Teams</div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-400 mt-1 tabular-nums">
                650+
              </div>
              <div className="text-xs text-slate-500 mt-1">From 28 states & union territories</div>
            </div>

            <div className="glass-card rounded-lg p-5 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Colleges & Universities</div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 tabular-nums">
                180+
              </div>
              <div className="text-xs text-slate-500 mt-1">IITs, NITs, BITS, and state universities</div>
            </div>

            <div className="glass-card rounded-lg p-5 border border-slate-800">
              <div className="text-xs text-slate-400 font-medium">Industry Challenges</div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-teal-400 mt-1 tabular-nums">
                24
              </div>
              <div className="text-xs text-slate-500 mt-1">Across 8 technological frontiers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
