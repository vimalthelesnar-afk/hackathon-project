import React, { useState } from 'react';
import { Target, Users, Award, ShieldCheck, CheckCircle2, ChevronRight, Scale, Trophy, Gift } from 'lucide-react';
import { PRIZE_TIERS } from '../data/mockData';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rules' | 'evaluation' | 'prizes'>('overview');

  const evaluationRubric = [
    {
      criterion: 'Technical Depth & Architecture',
      weight: '30%',
      description: 'Code quality, system performance, robustness of backend and data models, handling edge cases, and architectural resilience under load.'
    },
    {
      criterion: 'Innovation & Originality',
      weight: '25%',
      description: 'Novelty of the solution, creative application of modern technologies (e.g. SLMs, zero-knowledge proofs, edge IoT), and differentiation from existing commercial software.'
    },
    {
      criterion: 'Real-World Impact & Feasibility',
      weight: '25%',
      description: 'Practical deployment feasibility, alignment with industry and civic pain points, economic viability, and user adoption barrier minimization.'
    },
    {
      criterion: 'Presentation & Demonstration Completeness',
      weight: '20%',
      description: 'Clarity of the live functional pitch, live working prototype readiness (no slide-only pitches), and effective technical responses to jury inquiries.'
    }
  ];

  const rulesList = [
    {
      title: 'Originality of Work',
      detail: 'All core project code and hardware layouts must be engineered during the hackathon period. Open-source libraries and public pretrained model weights are permitted if transparently declared.'
    },
    {
      title: 'Team Composition & Integrity',
      detail: 'Teams must consist of 2 to 4 members. Each participant can only be registered on a single team roster. Cross-institutional teams are permitted.'
    },
    {
      title: 'Intellectual Property Ownership',
      detail: 'Participants retain 100% intellectual property rights over all work created. No sponsor or organizer retains proprietary claim over participant IP.'
    },
    {
      title: 'Verification & Code of Conduct',
      detail: 'Shortlisted teams must provide valid collegiate ID or government verification. Zero tolerance policy for plagiarism, harassment, or unauthorized API compromise.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#070B18] border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>ABOUT MINT 2026</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>NATIONAL INITIATIVE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Catalyzing India's Next Generation of Technologists.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            MINT is a premier nationwide hackathon established to bridge the gap between academic brilliance and critical national challenges. We assemble passionate student developers, researchers, and designers for a high-intensity innovation sprint.
          </p>
        </div>

        {/* 2-Column Split: Visual Narrative & Core Mission */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between glass-card rounded-xl p-6 sm:p-8 border border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Our Purpose & National Vision
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Traditional hackathons often end at the presentation stage with superficial mockups. MINT is designed differently: our challenge statements are curated with national research bodies, defense institutes, healthcare coalitions, and industry leaders to tackle problems that demand deployment-ready engineering.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether deploying zero-latency deepfake detection algorithms, engineering offline clinical triage assistants for rural districts, or balancing renewable solar microgrids, MINT provides the launchpad, compute resources, and expert mentorship to make an immediate impact.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block mb-1">Competition Format</span>
                <span className="font-semibold text-slate-200">Online Heats + 36h Grand Finale</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Eligibility</span>
                <span className="font-semibold text-slate-200">Enrolled Students & Innovators &lt; 26</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Team Roster</span>
                <span className="font-semibold text-slate-200">2 to 4 Members per Team</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-xl overflow-hidden glass-card border border-slate-800 min-h-[300px]">
            <img
              src="/src/assets/images/hackathon_cyber_lab_1792897963939.jpg"
              alt="MINT Hackathon Collaborative Innovation Lab"
              className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-slate-300 bg-[#050811]/80 backdrop-blur-md p-3 rounded-lg border border-slate-800">
              <span className="text-emerald-400 font-semibold block mb-0.5">Collaborative Prototyping</span>
              Teams gain access to dedicated technical mentors, API sandbox keys, and hardware emulation harnesses.
            </div>
          </div>
        </div>

        {/* Tabbed In-Depth Guide: Rules, Rubric, Prizes */}
        <div className="mt-16">
          {/* Segmented Tab Controls (Functional buttons permitted) */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/90 rounded-lg border border-slate-800 max-w-fit overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Eligibility & Format
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'rules'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Rules & Guidelines
            </button>
            <button
              onClick={() => setActiveTab('evaluation')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'evaluation'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Evaluation Rubric
            </button>
            <button
              onClick={() => setActiveTab('prizes')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === 'prizes'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Prizes & Awards
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="mt-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card rounded-xl p-6 border border-slate-800">
                  <h4 className="text-base font-semibold text-white mb-2">Who Can Participate</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Undergraduate, postgraduate, and diploma scholars across Computer Science, Electronics, Mechanical, Bioengineering, and allied STEM disciplines. Interdisciplinary and multi-college teams are welcome.
                  </p>
                </div>
                <div className="glass-card rounded-xl p-6 border border-slate-800">
                  <h4 className="text-base font-semibold text-white mb-2">Stage 1: Preliminary Scrutiny</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Teams register online, choose their challenge track, and submit an architectural blueprint, technology stack justification, and a concise 3-minute video walk-through. Top 50 teams advance nationwide.
                  </p>
                </div>
                <div className="glass-card rounded-xl p-6 border border-slate-800">
                  <h4 className="text-base font-semibold text-white mb-2">Stage 2: 36-Hour Grand Finale</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Qualifying teams engage in a 36-hour sprint with continuous mentor check-ins, simulated attack vectors for cybersecurity, and live evaluation rounds leading to grand jury presentations.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rulesList.map((rule, idx) => (
                  <div key={idx} className="glass-card rounded-xl p-6 border border-slate-800">
                    <h4 className="text-base font-semibold text-emerald-300 mb-2">
                      0{idx + 1}. {rule.title}
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {rule.detail}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'evaluation' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {evaluationRubric.map((item, idx) => (
                  <div key={idx} className="glass-card rounded-xl p-6 border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-base font-semibold text-white">{item.criterion}</h4>
                      <span className="text-emerald-400 font-mono font-bold text-sm">{item.weight}</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'prizes' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRIZE_TIERS.map((tier, idx) => (
                  <div
                    key={idx}
                    className={`glass-card rounded-xl p-6 border transition-all ${
                      idx === 0
                        ? 'border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                        : 'border-slate-800'
                    }`}
                  >
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                      {tier.badge}
                    </div>
                    <h4 className="text-lg font-bold text-white">{tier.title}</h4>
                    <div className="text-2xl font-display font-extrabold text-emerald-400 mt-2 mb-4 tabular-nums">
                      {tier.amount}
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                      {tier.perks.map((perk, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
