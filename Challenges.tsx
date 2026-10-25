import React, { useState } from 'react';
import {
  ShieldAlert,
  Cpu,
  Boxes,
  Activity,
  Leaf,
  Banknote,
  GraduationCap,
  Compass,
  ArrowRight,
  X,
  ExternalLink,
  Code2,
  CheckCircle,
  Building2,
  Filter,
} from 'lucide-react';
import { CHALLENGE_CATEGORIES, PROBLEM_STATEMENTS } from '../data/mockData';
import { ChallengeCategory, ProblemStatement } from '../types';

interface ChallengesProps {
  onSelectCategoryForRegistration: (category: ChallengeCategory) => void;
}

export const Challenges: React.FC<ChallengesProps> = ({
  onSelectCategoryForRegistration,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | null>(null);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');

  const getCategoryIcon = (category: ChallengeCategory) => {
    switch (category) {
      case 'Cybersecurity & Digital Safety':
        return <ShieldAlert className="w-6 h-6 text-emerald-400" />;
      case 'Artificial Intelligence & Machine Learning':
        return <Cpu className="w-6 h-6 text-teal-400" />;
      case 'Smart Automation':
        return <Boxes className="w-6 h-6 text-cyan-400" />;
      case 'Healthcare Technology':
        return <Activity className="w-6 h-6 text-emerald-400" />;
      case 'Green Technology & Sustainability':
        return <Leaf className="w-6 h-6 text-green-400" />;
      case 'FinTech & Digital Innovation':
        return <Banknote className="w-6 h-6 text-teal-300" />;
      case 'Education Technology':
        return <GraduationCap className="w-6 h-6 text-cyan-300" />;
      case 'Open Innovation':
        return <Compass className="w-6 h-6 text-emerald-300" />;
      default:
        return <Cpu className="w-6 h-6 text-emerald-400" />;
    }
  };

  const currentProblems = selectedCategory
    ? PROBLEM_STATEMENTS.filter((p) => p.category === selectedCategory)
    : [];

  const filteredModalProblems = currentProblems.filter((p) => {
    if (filterDifficulty === 'all') return true;
    return p.difficulty.toLowerCase().includes(filterDifficulty.toLowerCase());
  });

  return (
    <section id="challenges" className="py-20 bg-[#050811] tech-grid-pattern border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>CHALLENGE TRACKS</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>8 NATIONAL DOMAINS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Solve Mission-Critical Dilemmas.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Choose from 8 curated challenge areas designed with leading industry coalitions, scientific research councils, and national defense advisors.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CHALLENGE_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.category}
              className="glass-card glass-card-hover rounded-xl p-6 flex flex-col justify-between border border-slate-800 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    Track 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {cat.category}
                </h3>
                
                <p className="mt-2 text-xs text-emerald-400/90 font-mono">
                  {cat.tagline}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">
                  {cat.problemCount} Statements
                </span>

                <button
                  onClick={() => {
                    setSelectedCategory(cat.category);
                    setFilterDifficulty('all');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Problem Statements Modal / Drawer */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0A0F1D] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-800 bg-[#070B16] flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  {getCategoryIcon(selectedCategory)}
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <span>TRACK OVERVIEW</span>
                    <span aria-hidden="true">·</span>
                    <span>MINT 2026 SPECIFICATION</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                    {selectedCategory}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedCategory(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter bar */}
            <div className="px-6 py-3 bg-[#080D1A] border-b border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Filter className="w-3.5 h-3.5 text-emerald-400" />
                <span>Difficulty:</span>
                <button
                  onClick={() => setFilterDifficulty('all')}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    filterDifficulty === 'all'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterDifficulty('intermediate')}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    filterDifficulty === 'intermediate'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'hover:text-white'
                  }`}
                >
                  Intermediate
                </button>
                <button
                  onClick={() => setFilterDifficulty('advanced')}
                  className={`px-2 py-1 rounded cursor-pointer ${
                    filterDifficulty === 'advanced'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'hover:text-white'
                  }`}
                >
                  Advanced
                </button>
              </div>

              <span className="text-slate-500 font-mono">
                {filteredModalProblems.length} statement(s) displayed
              </span>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {filteredModalProblems.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <p>No problem statements match this filter criteria.</p>
                </div>
              ) : (
                filteredModalProblems.map((ps) => (
                  <div
                    key={ps.id}
                    className="glass-card rounded-xl p-6 border border-slate-800 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-emerald-400">
                          {ps.id}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-xs text-slate-400 font-mono">
                          {ps.difficulty}
                        </span>
                      </div>

                      {ps.industryPartner && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          <span>Advisory: {ps.industryPartner}</span>
                        </div>
                      )}
                    </div>

                    <h4 className="text-lg font-bold text-white">
                      {ps.title}
                    </h4>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {ps.summary}
                    </p>

                    <div className="bg-[#050811]/60 rounded-lg p-4 border border-slate-800/80">
                      <h5 className="text-xs font-mono uppercase text-emerald-400 font-semibold mb-2">
                        Problem Scope & Dilemma
                      </h5>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {ps.problemScope}
                      </p>
                    </div>

                    <div>
                      <h5 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-2">
                        Expected Deliverables
                      </h5>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                        {ps.expectedDeliverables.map((item, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                      <span className="text-xs text-slate-500 font-mono">Suggested Tools:</span>
                      {ps.suggestedTech.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-mono text-slate-300"
                        >
                          {tech}{tIdx < ps.suggestedTech.length - 1 ? ' · ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#070B16] border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Ready to engineer a solution for this track?
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-4 py-2 text-xs text-slate-300 hover:text-white rounded-lg cursor-pointer"
                >
                  Dismiss
                </button>

                <button
                  onClick={() => {
                    const cat = selectedCategory;
                    setSelectedCategory(null);
                    onSelectCategoryForRegistration(cat);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-[#050811] bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                >
                  Register Team for this Track
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
