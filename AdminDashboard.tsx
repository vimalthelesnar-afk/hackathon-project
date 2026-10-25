import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  X,
  Users,
  Award,
  Bell,
  Settings,
  UploadCloud,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter,
  Save,
  Trash2,
  ExternalLink,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import { api } from '../services/api';
import {
  TeamRegistration,
  ProjectSubmission,
  LeaderboardEntry,
  Announcement,
  HackathonConfig,
} from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  config: HackathonConfig;
  onConfigUpdated: (newConfig: HackathonConfig) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  config,
  onConfigUpdated,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'teams' | 'submissions' | 'scores' | 'announcements' | 'config'>('teams');

  // Data states
  const [teams, setTeams] = useState<TeamRegistration[]>([]);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Search/filter
  const [searchTeam, setSearchTeam] = useState('');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState('all');

  // Scoring edit state
  const [editingScoreId, setEditingScoreId] = useState<string | null>(null);
  const [scoreForm, setScoreForm] = useState<{
    prelim: number;
    semi: number;
    final: number;
    status: string;
  }>({ prelim: 90, semi: 90, final: 90, status: 'In Review' });

  // New announcement state
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnCategory, setNewAnnCategory] = useState('General');
  const [newAnnPriority, setNewAnnPriority] = useState('normal');

  // Config form state
  const [eventDateInput, setEventDateInput] = useState(config.eventDate.split('T')[0]);
  const [regOpenInput, setRegOpenInput] = useState(config.registrationOpen);
  const [subOpenInput, setSubOpenInput] = useState(config.submissionsOpen);
  const [prizePoolInput, setPrizePoolInput] = useState(config.totalPrizePool);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Check existing token on mount
  useEffect(() => {
    const existing = api.getStoredToken();
    if (existing) {
      setToken(existing);
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      loadAllAdminData(token);
    }
  }, [isAuthenticated, token]);

  const loadAllAdminData = async (activeToken: string) => {
    setLoadingData(true);
    try {
      const [tms, subs, lb, anns] = await Promise.all([
        api.getAdminRegistrations(activeToken).catch(() => []),
        api.getAdminSubmissions(activeToken).catch(() => []),
        api.getLeaderboard().catch(() => []),
        api.getAnnouncements().catch(() => []),
      ]);
      setTeams(tms);
      setSubmissions(subs);
      setLeaderboard(lb);
      setAnnouncements(anns);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoggingIn(true);

    try {
      const res = await api.adminLogin(passwordInput);
      setToken(res.token);
      setIsAuthenticated(true);
      setPasswordInput('');
    } catch (err: any) {
      setAuthError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    api.adminLogout();
    setToken(null);
    setIsAuthenticated(false);
  };

  const handleUpdateTeamStatus = async (id: string, status: string) => {
    if (!token) return;
    try {
      await api.updateRegistrationStatus(token, id, status);
      setTeams((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: status as any } : t))
      );
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleSaveScore = async (id: string) => {
    if (!token) return;
    try {
      const updated = await api.updateLeaderboardEntry(token, id, {
        preliminaryScore: scoreForm.prelim,
        semiFinalScore: scoreForm.semi,
        finalScore: scoreForm.final,
        status: scoreForm.status as any,
      });

      setLeaderboard((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
      setEditingScoreId(null);
    } catch (err) {
      alert('Score update failed');
    }
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newAnnTitle.trim() || !newAnnContent.trim()) return;

    try {
      const created = await api.addAnnouncement(token, {
        title: newAnnTitle.trim(),
        content: newAnnContent.trim(),
        category: newAnnCategory,
        priority: newAnnPriority,
      });
      setAnnouncements([created, ...announcements]);
      setNewAnnTitle('');
      setNewAnnContent('');
    } catch (err) {
      alert('Failed to post announcement');
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to remove this circular?')) return;
    try {
      await api.deleteAnnouncement(token, id);
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      alert('Failed to delete announcement');
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSaveStatus('Saving changes...');

    try {
      const res = await api.updateConfig(token, {
        eventDate: new Date(eventDateInput).toISOString(),
        registrationOpen: regOpenInput,
        submissionsOpen: subOpenInput,
        totalPrizePool: prizePoolInput,
      });
      onConfigUpdated(res.config);
      setSaveStatus('Configuration saved successfully!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus('Error updating configuration');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#0A0F1D] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#060A14] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                <span>MINT CENTRAL REPOSITORY</span>
                <span aria-hidden="true">·</span>
                <span>ADMINISTRATOR CLUSTER</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Hackathon Administration Console
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-xs text-rose-400 hover:text-rose-300 border border-rose-950 hover:bg-rose-950/30 rounded cursor-pointer"
              >
                Sign Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close admin modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-emerald-400 mb-4">
              <Lock className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Organizer Authentication</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Access the protected jury scrutiny roster, live score calibration matrix, and official circular broadcasting system.
            </p>

            {authError && (
              <div className="mb-4 p-3 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="text-left">
                <label className="block text-xs font-mono text-slate-300 mb-1">
                  Master Admin Secret Key
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter administrator password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Demo credentials hint for seamless evaluator verification */}
              <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-left text-[11px] font-mono text-emerald-300">
                <span className="font-semibold block mb-0.5 text-emerald-400">Demo Evaluation Credentials:</span>
                Secret: <code className="bg-slate-900 px-1 py-0.5 rounded text-white">mint2026admin</code>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-2.5 text-xs font-semibold text-[#050811] bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 disabled:opacity-50 rounded-lg shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying session...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Authorize Admin Session</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Management */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Admin Nav Tabs */}
            <div className="px-6 py-2.5 bg-[#080D1A] border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs font-medium">
              <button
                onClick={() => setActiveTab('teams')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'teams'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Teams Registry ({teams.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('submissions')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'submissions'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Submissions ({submissions.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('scores')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'scores'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Leaderboard & Scores</span>
              </button>

              <button
                onClick={() => setActiveTab('announcements')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'announcements'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Announcements ({announcements.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('config')}
                className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  activeTab === 'config'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Event Parameters</span>
              </button>
            </div>

            {/* Tab Panels */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* TAB 1: TEAMS REGISTRY */}
              {activeTab === 'teams' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="w-full sm:w-72 relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search team or leader..."
                        value={searchTeam}
                        onChange={(e) => setSearchTeam(e.target.value)}
                        className="w-full bg-[#050811] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      {teams.length} registered squads in database
                    </span>
                  </div>

                  <div className="glass-card rounded-xl border border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#050811] border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                            <th className="py-2.5 px-3">Reg ID</th>
                            <th className="py-2.5 px-3">Team & Leader</th>
                            <th className="py-2.5 px-3">Institution</th>
                            <th className="py-2.5 px-3">Track</th>
                            <th className="py-2.5 px-3">Members</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {teams
                            .filter(
                              (t) =>
                                t.teamName.toLowerCase().includes(searchTeam.toLowerCase()) ||
                                t.leaderName.toLowerCase().includes(searchTeam.toLowerCase()) ||
                                t.id.toLowerCase().includes(searchTeam.toLowerCase())
                            )
                            .map((team) => (
                              <tr key={team.id} className="hover:bg-slate-900/40">
                                <td className="py-2.5 px-3 font-mono font-semibold text-emerald-400">
                                  {team.id}
                                </td>
                                <td className="py-2.5 px-3">
                                  <div className="font-semibold text-white">{team.teamName}</div>
                                  <div className="text-[11px] text-slate-400">{team.leaderName} ({team.leaderEmail})</div>
                                </td>
                                <td className="py-2.5 px-3 text-slate-300">
                                  <div>{team.institution}</div>
                                  <div className="text-[11px] text-slate-500">{team.city}, {team.state}</div>
                                </td>
                                <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                                  {team.category}
                                </td>
                                <td className="py-2.5 px-3 font-mono tabular-nums text-slate-300">
                                  {team.memberCount} members
                                </td>
                                <td className="py-2.5 px-3">
                                  <select
                                    value={team.status}
                                    onChange={(e) => handleUpdateTeamStatus(team.id, e.target.value)}
                                    className="bg-[#050811] border border-slate-800 rounded px-2 py-1 text-[11px] text-slate-200"
                                  >
                                    <option value="Registered">Registered</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Finalist">Finalist</option>
                                    <option value="Disqualified">Disqualified</option>
                                  </select>
                                </td>
                                <td className="py-2.5 px-3 text-right">
                                  <button
                                    onClick={() => alert(`Abstract:\n${team.projectDescription}`)}
                                    className="text-[11px] text-emerald-400 hover:underline cursor-pointer"
                                  >
                                    View Pitch
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SUBMISSIONS */}
              {activeTab === 'submissions' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400 font-mono">
                    Evaluation links and code repositories submitted by teams:
                  </div>

                  <div className="space-y-3">
                    {submissions.length === 0 ? (
                      <div className="p-8 text-center text-xs text-slate-400">
                        No deliverable repositories submitted yet.
                      </div>
                    ) : (
                      submissions.map((sub) => (
                        <div key={sub.id} className="glass-card rounded-xl p-5 border border-slate-800 text-xs space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                            <div>
                              <span className="font-mono text-emerald-400 font-bold mr-2">{sub.id}</span>
                              <span className="text-white font-semibold">{sub.teamName}</span>
                              <span className="text-slate-500 font-mono ml-2">({sub.registrationId})</span>
                            </div>
                            <span className="text-slate-400 font-mono">
                              {new Date(sub.submittedAt).toLocaleString()}
                            </span>
                          </div>

                          <div className="text-sm font-bold text-white">
                            {sub.projectTitle}
                          </div>

                          <p className="text-slate-300 leading-relaxed">
                            {sub.projectDescription}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a
                              href={sub.repositoryUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-mono"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Code Repo</span>
                            </a>

                            <a
                              href={sub.demoVideoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-teal-400 hover:text-teal-300 flex items-center gap-1 font-mono"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Demo Video</span>
                            </a>

                            {sub.presentationUrl && (
                              <a
                                href={sub.presentationUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-300 hover:text-white flex items-center gap-1 font-mono"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Presentation Deck</span>
                              </a>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: LEADERBOARD & SCORE MANAGEMENT */}
              {activeTab === 'scores' && (
                <div className="space-y-4">
                  <div className="text-xs text-slate-400 font-mono">
                    Jury Score Matrix: adjust preliminary, semifinal, and final points.
                  </div>

                  <div className="glass-card rounded-xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#050811] border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase">
                          <th className="py-2.5 px-3">Rank</th>
                          <th className="py-2.5 px-3">Team Name</th>
                          <th className="py-2.5 px-3 text-right">Prelim (30%)</th>
                          <th className="py-2.5 px-3 text-right">Semi (30%)</th>
                          <th className="py-2.5 px-3 text-right">Final (40%)</th>
                          <th className="py-2.5 px-3 text-right">Total Score</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {leaderboard.map((entry) => (
                          <tr key={entry.id} className="hover:bg-slate-900/40">
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-400">
                              {entry.rank}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-white">
                              {entry.teamName}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                              {editingScoreId === entry.id ? (
                                <input
                                  type="number"
                                  step="0.5"
                                  value={scoreForm.prelim}
                                  onChange={(e) => setScoreForm({ ...scoreForm, prelim: parseFloat(e.target.value) || 0 })}
                                  className="w-16 bg-[#050811] border border-slate-700 px-1 py-0.5 text-right rounded"
                                />
                              ) : (
                                entry.preliminaryScore.toFixed(1)
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                              {editingScoreId === entry.id ? (
                                <input
                                  type="number"
                                  step="0.5"
                                  value={scoreForm.semi}
                                  onChange={(e) => setScoreForm({ ...scoreForm, semi: parseFloat(e.target.value) || 0 })}
                                  className="w-16 bg-[#050811] border border-slate-700 px-1 py-0.5 text-right rounded"
                                />
                              ) : (
                                entry.semiFinalScore.toFixed(1)
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                              {editingScoreId === entry.id ? (
                                <input
                                  type="number"
                                  step="0.5"
                                  value={scoreForm.final}
                                  onChange={(e) => setScoreForm({ ...scoreForm, final: parseFloat(e.target.value) || 0 })}
                                  className="w-16 bg-[#050811] border border-slate-700 px-1 py-0.5 text-right rounded"
                                />
                              ) : (
                                entry.finalScore.toFixed(1)
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400 tabular-nums">
                              {entry.totalScore.toFixed(1)}
                            </td>
                            <td className="py-2.5 px-3">
                              {editingScoreId === entry.id ? (
                                <select
                                  value={scoreForm.status}
                                  onChange={(e) => setScoreForm({ ...scoreForm, status: e.target.value })}
                                  className="bg-[#050811] border border-slate-700 px-1 py-0.5 rounded text-[11px]"
                                >
                                  <option value="In Review">In Review</option>
                                  <option value="Shortlisted">Shortlisted</option>
                                  <option value="Grand Finalist">Grand Finalist</option>
                                  <option value="Runner Up">Runner Up</option>
                                  <option value="Champion">Champion</option>
                                </select>
                              ) : (
                                <span className="text-[11px] font-mono text-slate-300">{entry.status}</span>
                              )}
                            </td>
                            <td className="py-2.5 px-3 text-right">
                              {editingScoreId === entry.id ? (
                                <div className="flex items-center justify-end gap-1">
                                  <button
                                    onClick={() => handleSaveScore(entry.id)}
                                    className="p-1 text-emerald-400 hover:text-emerald-300"
                                    title="Save Score"
                                  >
                                    <Save className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditingScoreId(null)}
                                    className="p-1 text-slate-400 hover:text-white"
                                    title="Cancel"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => {
                                    setEditingScoreId(entry.id);
                                    setScoreForm({
                                      prelim: entry.preliminaryScore,
                                      semi: entry.semiFinalScore,
                                      final: entry.finalScore,
                                      status: entry.status,
                                    });
                                  }}
                                  className="text-[11px] text-emerald-400 hover:underline cursor-pointer"
                                >
                                  Edit Scores
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 4: ANNOUNCEMENTS */}
              {activeTab === 'announcements' && (
                <div className="space-y-6">
                  {/* Create New Announcement Form */}
                  <form onSubmit={handleCreateAnnouncement} className="glass-card rounded-xl p-5 border border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-white">Broadcast New Circular</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          Circular Title
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Phase 04 Submission Window Extended by 2 Hours"
                          value={newAnnTitle}
                          onChange={(e) => setNewAnnTitle(e.target.value)}
                          className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-slate-400 mb-1">
                          Category
                        </label>
                        <select
                          value={newAnnCategory}
                          onChange={(e) => setNewAnnCategory(e.target.value)}
                          className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                        >
                          <option value="General">General</option>
                          <option value="Urgent">Urgent</option>
                          <option value="Deadline">Deadline</option>
                          <option value="Workshop">Workshop</option>
                          <option value="Results">Results</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-slate-400 mb-1">
                        Circular Content / Instructions
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Detail the instructions or milestone notes..."
                        value={newAnnContent}
                        onChange={(e) => setNewAnnContent(e.target.value)}
                        className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-semibold text-[#050811] bg-gradient-to-r from-emerald-400 to-teal-300 rounded-lg cursor-pointer"
                    >
                      Publish Announcement
                    </button>
                  </form>

                  {/* List of existing */}
                  <div className="space-y-3">
                    {announcements.map((ann) => (
                      <div key={ann.id} className="p-4 rounded-xl bg-[#050811] border border-slate-800 flex items-start justify-between gap-4 text-xs">
                        <div>
                          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 mb-1">
                            <span className="text-emerald-400">{ann.category}</span>
                            <span>·</span>
                            <span>{new Date(ann.publishedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="font-bold text-white">{ann.title}</div>
                          <p className="text-slate-300 mt-1">{ann.content}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteAnnouncement(ann.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: CONFIG */}
              {activeTab === 'config' && (
                <form onSubmit={handleSaveConfig} className="glass-card rounded-xl p-6 border border-slate-800 space-y-5 max-w-xl">
                  <h4 className="text-sm font-bold text-white">Event Parameters & Controls</h4>

                  {saveStatus && (
                    <div className="p-3 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs">
                      {saveStatus}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Grand Finale Countdown Target Date
                    </label>
                    <input
                      type="date"
                      value={eventDateInput}
                      onChange={(e) => setEventDateInput(e.target.value)}
                      className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Total Prize Pool Announcement Text
                    </label>
                    <input
                      type="text"
                      value={prizePoolInput}
                      onChange={(e) => setPrizePoolInput(e.target.value)}
                      className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={regOpenInput}
                        onChange={(e) => setRegOpenInput(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-emerald-500"
                      />
                      <span>National Team Registration Window Open</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                      <input
                        type="checkbox"
                        checked={subOpenInput}
                        onChange={(e) => setSubOpenInput(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-emerald-500"
                      />
                      <span>Deliverable Project Submissions Open</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-[#050811] bg-gradient-to-r from-emerald-400 to-teal-300 rounded-lg cursor-pointer"
                  >
                    Save Changes
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
