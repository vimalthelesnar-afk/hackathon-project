import React, { useState, useEffect } from 'react';
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Code,
  Video,
  FileSpreadsheet,
  Loader2,
  Check,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { api } from '../services/api';
import { CHALLENGE_CATEGORIES } from '../data/mockData';
import { ChallengeCategory, ProjectSubmission } from '../types';

interface SubmissionSectionProps {
  initialRegistrationId?: string;
}

export const SubmissionSection: React.FC<SubmissionSectionProps> = ({
  initialRegistrationId,
}) => {
  const [regId, setRegId] = useState(initialRegistrationId || '');
  const [verifiedTeam, setVerifiedTeam] = useState<{
    id: string;
    teamName: string;
    institution: string;
    category: ChallengeCategory;
    projectTitle: string;
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  // Form Fields
  const [projectTitle, setProjectTitle] = useState('');
  const [category, setCategory] = useState<ChallengeCategory>('Cybersecurity & Digital Safety');
  const [description, setDescription] = useState('');
  const [techStackInput, setTechStackInput] = useState('React, TypeScript, Python, PyTorch');
  const [repoUrl, setRepoUrl] = useState('');
  const [demoVideoUrl, setDemoVideoUrl] = useState('');
  const [presentationUrl, setPresentationUrl] = useState('');

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionReceipt, setSubmissionReceipt] = useState<ProjectSubmission | null>(null);

  useEffect(() => {
    if (initialRegistrationId) {
      setRegId(initialRegistrationId);
      handleVerifyId(initialRegistrationId);
    }
  }, [initialRegistrationId]);

  const handleVerifyId = async (idToVerify: string) => {
    if (!idToVerify.trim()) return;
    setIsVerifying(true);
    setVerifyError(null);

    try {
      const data = await api.verifyRegistration(idToVerify.trim());
      setVerifiedTeam(data);
      if (data.projectTitle && !projectTitle) setProjectTitle(data.projectTitle);
      if (data.category) setCategory(data.category as ChallengeCategory);
    } catch (err: any) {
      setVerifiedTeam(null);
      setVerifyError(err.message || 'Registration ID not recognized in official records.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!regId.trim()) {
      setSubmitError('Please enter your Team Registration ID.');
      return;
    }
    if (!projectTitle.trim() || projectTitle.length < 3) {
      setSubmitError('Please provide a project title.');
      return;
    }
    if (!description.trim() || description.length < 30) {
      setSubmitError('Project description must be at least 30 characters.');
      return;
    }
    const urlPattern = /^https?:\/\/.+/i;
    if (!repoUrl || !urlPattern.test(repoUrl)) {
      setSubmitError('Please enter a valid HTTPS repository URL (e.g. GitHub/GitLab).');
      return;
    }
    if (!demoVideoUrl || !urlPattern.test(demoVideoUrl)) {
      setSubmitError('Please enter a valid HTTPS video demonstration link (e.g. YouTube/Loom).');
      return;
    }

    setIsSubmitting(true);

    try {
      const techList = techStackInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await api.submitProject({
        registrationId: regId.trim(),
        projectTitle: projectTitle.trim(),
        selectedCategory: category,
        projectDescription: description.trim(),
        techStack: techList,
        repositoryUrl: repoUrl.trim(),
        demoVideoUrl: demoVideoUrl.trim(),
        presentationUrl: presentationUrl ? presentationUrl.trim() : undefined,
      });

      setSubmissionReceipt(res.submission);
    } catch (err: any) {
      setSubmitError(err.message || 'Submission failed. Server rejected the payload.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="submissions" className="py-20 bg-[#050811] tech-grid-pattern border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span>DELIVERABLE SUBMISSION PORTAL</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>PHASE 04 SPRINT</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Submit Your Project.
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Registered teams must submit their code repository, video demonstration walkthrough, and architecture notes prior to the evaluation deadline.
          </p>
        </div>

        {submissionReceipt ? (
          <div className="glass-card rounded-2xl p-8 border border-emerald-500/40 text-center max-w-2xl mx-auto mint-glow-md">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-400 mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Server Confirmed
            </span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-2">
              Deliverables Successfully Logged!
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
              Your submission has been cataloged by the evaluation cluster. Jury members will review the GitHub repository commit tree and demonstration video.
            </p>

            <div className="bg-[#050811] rounded-xl p-5 border border-slate-800 text-left space-y-2 text-xs font-mono mb-6">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Submission Receipt ID</span>
                <span className="text-emerald-400 font-bold">{submissionReceipt.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Team Name</span>
                <span className="text-slate-200">{submissionReceipt.teamName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Project Title</span>
                <span className="text-slate-200 truncate max-w-[200px] sm:max-w-xs">{submissionReceipt.projectTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Timestamp</span>
                <span className="text-slate-400">{new Date(submissionReceipt.submittedAt).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmissionReceipt(null);
                setRepoUrl('');
                setDemoVideoUrl('');
                setPresentationUrl('');
              }}
              className="px-6 py-2.5 text-xs text-slate-300 hover:text-white border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Update or Submit Another Entry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6"
          >
            {submitError && (
              <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs sm:text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>{submitError}</div>
              </div>
            )}

            {/* Registration ID Verification */}
            <div className="p-4 rounded-xl bg-[#050811]/70 border border-slate-800">
              <label className="block text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                Step 1: Enter Team Registration ID
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  placeholder="e.g. MINT-2026-1042"
                  value={regId}
                  onChange={(e) => setRegId(e.target.value)}
                  className="flex-1 bg-[#0A0F1D] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white font-mono placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
                <button
                  type="button"
                  onClick={() => handleVerifyId(regId)}
                  disabled={isVerifying || !regId.trim()}
                  className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-50 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  {isVerifying ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Search className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span>Verify ID</span>
                </button>
              </div>

              {verifyError && (
                <div className="mt-2 text-xs text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{verifyError}</span>
                </div>
              )}

              {verifiedTeam && (
                <div className="mt-3 p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-emerald-300">
                      Team: {verifiedTeam.teamName}
                    </span>
                    <span className="text-slate-400 block">
                      {verifiedTeam.institution} · Track: {verifiedTeam.category}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                    Verified ID
                  </span>
                </div>
              )}
            </div>

            {/* Deliverable URLs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Final Project Title <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Official project title"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Challenge Track <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ChallengeCategory)}
                  className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                >
                  {CHALLENGE_CATEGORIES.map((cat) => (
                    <option key={cat.category} value={cat.category}>
                      {cat.category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Public Code Repository URL <span className="text-emerald-400">*</span></span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/your-team/project"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Must include comprehensive README and setup documentation.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-teal-400" />
                    <span>3-Minute Demo Video Walkthrough <span className="text-emerald-400">*</span></span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://youtube.com/watch?v=... or Loom"
                    value={demoVideoUrl}
                    onChange={(e) => setDemoVideoUrl(e.target.value)}
                    className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Unlisted YouTube, Loom, or Google Drive (public view).
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Presentation Deck / Whitepaper URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://speakerdeck.com/... or Canva / PDF"
                  value={presentationUrl}
                  onChange={(e) => setPresentationUrl(e.target.value)}
                  className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3.5 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Tech Stack Utilized (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js, WebAssembly, ONNX Runtime"
                  value={techStackInput}
                  onChange={(e) => setTechStackInput(e.target.value)}
                  className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Executive Architecture & Deployment Summary <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Summarize your engineering achievements, system architecture, benchmarks reached, and steps required to test the prototype..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#050811] border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 resize-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Server checks and logs all URLs upon commit.
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-xs font-semibold text-[#050811] bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 disabled:opacity-50 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Transmitting Deliverables...</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    <span>Submit Deliverables to Jury</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
