import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Search,
  Filter,
  Medal,
  Award,
  Sparkles,
  Info,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { LeaderboardEntry, ChallengeCategory } from '../types';
import { api } from '../services/api';
import { CHALLENGE_CATEGORIES } from '../data/mockData';

export const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'totalScore' | 'finalScore' | 'rank'>('rank');

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const data = await api.getLeaderboard();
      setEntries(data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const filteredEntries = entries
    .filter((entry) => {
      const matchesSearch =
        entry.teamName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.institution.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || entry.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'totalScore') return b.totalScore - a.totalScore;
      if (sortBy === 'finalScore') return b.finalScore - a.finalScore;
      return a.rank - b.rank;
    });

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-300">
          <Medal className="w-4 h-4 text-amber-400" />
          <span>01</span>
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="inline-flex items-center gap-1 font-mono font-bold text-slate-300">
          <Medal className="w-4 h-4 text-slate-400" />
          <span>02</span>
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="inline-flex items-center gap-1 font-mono font-bold text-amber-600">
          <Medal className="w-4 h-4 text-amber-600" />
          <span>03</span>
        </span>
      );
    }
    return <span className="font-mono text-slate-400">{String(rank).padStart(2, '0')}</span>;
  };

  return (
    <section id="leaderboard" className="py-20 bg-[#070B18] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>LIVE EVALUATION & STANDINGS</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>MINT NATIONAL LEADERBOARD</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Competition Standings.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Real-time score breakdown evaluated across technical architecture, innovation index, and final demonstration walkthroughs.
          </p>
        </div>

        {/* Clear Mandatory Sample Data Disclaimer Banner */}
        <div className="mt-6 p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-200/90 text-xs flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold text-amber-300">Demonstration Exhibition Standings:</span> The scores and rankings below reflect sample telemetry and test harness evaluation data. Actual national competition results will be continuously updated by the Jury Board during the Phase 05 Scrutiny and Grand Finale stages.
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search team, project, or college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#050811] border border-slate-800 rounded-lg pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Filter className="w-3.5 h-3.5 text-emerald-400" />
              <span>Track:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#050811] border border-slate-800 rounded-md px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-400"
              >
                <option value="all">All Tracks</option>
                {CHALLENGE_CATEGORIES.map((c) => (
                  <option key={c.category} value={c.category}>
                    {c.category}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchLeaderboard}
              className="p-1.5 text-slate-400 hover:text-white rounded-md border border-slate-800 bg-[#050811] hover:bg-slate-800 transition-colors cursor-pointer"
              title="Refresh Standings"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="mt-6 glass-card rounded-xl border border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#050811]/70 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Team & Institution</th>
                  <th className="py-3 px-4">Project Title</th>
                  <th className="py-3 px-4">Track</th>
                  <th className="py-3 px-4 text-right">Prelim (30%)</th>
                  <th className="py-3 px-4 text-right">Semi (30%)</th>
                  <th className="py-3 px-4 text-right">Final (40%)</th>
                  <th className="py-3 px-4 text-right">Total Score</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-400 font-mono">
                      Synchronizing with MINT Evaluation Cluster...
                    </td>
                  </tr>
                ) : filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-400">
                      No teams match the current filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredEntries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-slate-900/50 transition-colors group"
                    >
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {getRankBadge(entry.rank)}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                          {entry.teamName}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {entry.institution}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="text-slate-200 line-clamp-1 max-w-[240px]">
                          {entry.projectTitle}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-400 text-[11px]">
                        {entry.category}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-300">
                        {entry.preliminaryScore.toFixed(1)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-300">
                        {entry.semiFinalScore.toFixed(1)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-300">
                        {entry.finalScore.toFixed(1)}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-emerald-400 text-sm">
                        {entry.totalScore.toFixed(1)}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="text-[11px] font-mono text-slate-300">
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
