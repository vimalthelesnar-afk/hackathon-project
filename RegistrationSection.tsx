import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Building,
  MapPin,
  FileText,
} from 'lucide-react';
import { CHALLENGE_CATEGORIES } from '../data/mockData';
import { ChallengeCategory, TeamRegistration, TeamMember } from '../types';
import { api } from '../services/api';

interface RegistrationSectionProps {
  preselectedCategory?: ChallengeCategory | null;
  onNavigateToSubmissions?: (registrationId: string) => void;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  preselectedCategory,
  onNavigateToSubmissions,
}) => {
  // Form State
  const [teamName, setTeamName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [institution, setInstitution] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [memberCount, setMemberCount] = useState<number>(3);
  const [members, setMembers] = useState<TeamMember[]>([
    { name: '', email: '', role: 'Software Engineer' },
    { name: '', email: '', role: 'Research / Design' },
  ]);
  const [category, setCategory] = useState<ChallengeCategory>(
    preselectedCategory || 'Cybersecurity & Digital Safety'
  );
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [agreedToRules, setAgreedToRules] = useState(false);

  // Status State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{
    id: string;
    teamName: string;
    category: string;
  } | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Sync preselected category if updated from parent
  useEffect(() => {
    if (preselectedCategory) {
      setCategory(preselectedCategory);
    }
  }, [preselectedCategory]);

  // Adjust member fields when memberCount changes
  const handleMemberCountChange = (count: number) => {
    setMemberCount(count);
    const requiredAdditionalMembers = count - 1; // Leader is member 1
    const newMembers = [...members];

    if (newMembers.length < requiredAdditionalMembers) {
      while (newMembers.length < requiredAdditionalMembers) {
        newMembers.push({ name: '', email: '', role: 'Developer' });
      }
    } else if (newMembers.length > requiredAdditionalMembers) {
      newMembers.splice(requiredAdditionalMembers);
    }
    setMembers(newMembers);
  };

  const handleMemberChange = (index: number, field: 'name' | 'email' | 'role', value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side validation checks
    if (!teamName.trim() || teamName.length < 3) {
      setErrorMsg('Team name must be at least 3 characters long.');
      return;
    }
    if (!leaderName.trim() || leaderName.length < 2) {
      setErrorMsg('Please provide the full name of the team leader.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!leaderEmail || !emailRegex.test(leaderEmail)) {
      setErrorMsg('Please provide a valid email address for the team leader.');
      return;
    }
    const cleanPhone = contactNumber.replace(/[\s-]/g, '');
    if (!cleanPhone || cleanPhone.length < 8) {
      setErrorMsg('Please provide a valid contact number.');
      return;
    }
    if (!institution.trim()) {
      setErrorMsg('Please specify your college, polytechnic, or institution.');
      return;
    }
    if (!state.trim() || !city.trim()) {
      setErrorMsg('Please provide both state and city of your institution.');
      return;
    }

    // Validate additional members
    for (let i = 0; i < members.length; i++) {
      if (!members[i].name.trim() || !members[i].email.trim()) {
        setErrorMsg(`Please fill in both name and email for Member ${i + 2}.`);
        return;
      }
      if (!emailRegex.test(members[i].email)) {
        setErrorMsg(`Please provide a valid email address for Member ${i + 2}.`);
        return;
      }
    }

    if (!projectTitle.trim() || projectTitle.length < 3) {
      setErrorMsg('Please enter a tentative project title.');
      return;
    }
    if (!projectDescription.trim() || projectDescription.length < 20) {
      setErrorMsg('Please provide a project abstract (minimum 20 characters).');
      return;
    }
    if (!agreedToRules) {
      setErrorMsg('You must agree to the MINT Hackathon competition rules.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.registerTeam({
        teamName,
        leaderName,
        leaderEmail,
        contactNumber,
        institution,
        state,
        city,
        memberCount,
        members,
        category,
        projectTitle,
        projectDescription,
        agreedToRules: true,
      });

      setSuccessResult({
        id: response.registrationId,
        teamName,
        category,
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Team registration failed. Please review your entries.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRegistrationId = () => {
    if (successResult) {
      navigator.clipboard.writeText(successResult.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <section id="register" className="py-20 bg-[#070B18] border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>OFFICIAL NATIONAL REGISTRATION</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>NO REGISTRATION FEE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Register Your Team.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            Secure your place in MINT 2026. Teams receive an official Registration ID required to submit project deliverables, access cloud credits, and join mentor AMA sessions.
          </p>
        </div>

        {/* Success Modal / State */}
        {successResult ? (
          <div className="glass-card rounded-2xl p-8 sm:p-10 border border-emerald-500/40 mint-glow-md text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400 mb-5">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
              Registration Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1 mb-2">
              Welcome, Team {successResult.teamName}!
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
              Your registration has been saved to the official MINT Registry. Keep your unique Registration ID safe; you will need it to submit project repositories and video deliverables.
            </p>

            {/* Registration ID Banner */}
            <div className="bg-[#050811] rounded-xl p-4 sm:p-6 border border-emerald-500/30 flex items-center justify-between gap-4 max-w-md mx-auto mb-8">
              <div className="text-left">
                <span className="text-xs font-mono text-slate-400 block">Unique Registration ID</span>
                <span className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 tracking-wider">
                  {successResult.id}
                </span>
              </div>

              <button
                onClick={copyRegistrationId}
                className="px-3.5 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedId ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  setSuccessResult(null);
                  setTeamName('');
                  setLeaderName('');
                  setLeaderEmail('');
                  setContactNumber('');
                  setProjectTitle('');
                  setProjectDescription('');
                  setAgreedToRules(false);
                }}
                className="px-5 py-2.5 text-xs text-slate-300 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
              >
                Register Another Team
              </button>

              <a
                href="#submissions"
                onClick={() => {
                  if (onNavigateToSubmissions) {
                    onNavigateToSubmissions(successResult.id);
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-[#050811] bg-gradient-to-r from-emerald-400 to-teal-300 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:from-emerald-300 transition-all cursor-pointer"
              >
                <span>Proceed to Submission Portal</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ) : (
          /* Registration Form */
          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-6 sm:p-10 border border-slate-800 space-y-8"
          >
            {errorMsg && (
              <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="leading-snug">{errorMsg}</div>
              </div>
            )}

            {/* Block 1: Team & Leader Essentials */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4 pb-2 border-b border-slate-800">
                <span>01. TEAM & LEADER DETAILS</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Team Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NeuralVortex"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Team Leader Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Arjun Swaminathan"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Leader Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="leader@college.edu"
                    value={leaderEmail}
                    onChange={(e) => setLeaderEmail(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Leader WhatsApp / Contact Number <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Block 2: Institution & Location */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4 pb-2 border-b border-slate-800">
                <span>02. INSTITUTION & GEOGRAPHY</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-1">
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    College / University Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IIT Madras"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    State / Union Territory <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tamil Nadu"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    City <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chennai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Block 3: Team Roster Composition */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-4 pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-emerald-400">
                  03. TEAM MEMBERS (2 TO 4 BUILDERS)
                </span>
                
                {/* Member Count Selector */}
                <div className="flex items-center gap-1">
                  {[2, 3, 4].map((count) => (
                    <button
                      type="button"
                      key={count}
                      onClick={() => handleMemberCountChange(count)}
                      className={`px-3 py-1 text-xs font-medium rounded-md cursor-pointer transition-colors ${
                        memberCount === count
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {count} Members
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-3.5 rounded-lg bg-[#050811]/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <div>
                    <span className="text-emerald-400 font-semibold">Member 1 (Leader): </span>
                    <span className="text-slate-200">{leaderName || 'To be completed above'}</span> ({leaderEmail || 'Email pending'})
                  </div>
                  <span className="text-slate-500 font-mono">Primary POC</span>
                </div>

                {members.map((member, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-[#050811]/40 border border-slate-800 space-y-3">
                    <div className="text-xs font-mono text-slate-400 flex items-center justify-between">
                      <span>Member 0{idx + 2} Details</span>
                      <span className="text-slate-500">Co-Innovator</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          required
                          placeholder={`Member ${idx + 2} Full Name`}
                          value={member.name}
                          onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                          className="w-full bg-[#070B16] border border-slate-700/80 rounded-md px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          placeholder={`Member ${idx + 2} Email`}
                          value={member.email}
                          onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                          className="w-full bg-[#070B16] border border-slate-700/80 rounded-md px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Primary Role (e.g. AI / UI)"
                          value={member.role || ''}
                          onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                          className="w-full bg-[#070B16] border border-slate-700/80 rounded-md px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Block 4: Track & Project Concept */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4 pb-2 border-b border-slate-800">
                <span>04. TRACK & PROJECT CONCEPT</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Selected Challenge Track <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ChallengeCategory)}
                    className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  >
                    {CHALLENGE_CATEGORIES.map((cat) => (
                      <option key={cat.category} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Proposed Project Title <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Autonomous Real-time Deepfake & Synthetic Voice Interceptor"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Project Abstract / Executive Description <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe the specific problem you are tackling, your proposed architectural solution, key technologies you will utilize, and the intended real-world impact..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-500 mt-1">
                    <span>Minimum 20 characters</span>
                    <span>{projectDescription.length} characters</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Agreement & Submission Button */}
            <div className="pt-4 border-t border-slate-800 space-y-5">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreedToRules}
                  onChange={(e) => setAgreedToRules(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-400/20"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  I agree to the official MINT Hackathon Code of Conduct, confirm that all submitted team credentials are authentic, and acknowledge that all engineered deliverables must be original work.
                </span>
              </label>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  Submissions are secured by the MINT National Verification Server.
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-[#050811] bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying & Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>Complete Team Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
