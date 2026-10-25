/**
 * MINT Hackathon Platform - Domain Types & Interfaces
 */

export type ChallengeCategory =
  | 'Cybersecurity & Digital Safety'
  | 'Artificial Intelligence & Machine Learning'
  | 'Smart Automation'
  | 'Healthcare Technology'
  | 'Green Technology & Sustainability'
  | 'FinTech & Digital Innovation'
  | 'Education Technology'
  | 'Open Innovation';

export interface ProblemStatement {
  id: string;
  category: ChallengeCategory;
  title: string;
  difficulty: 'Beginner-Friendly' | 'Intermediate' | 'Advanced';
  summary: string;
  problemScope: string;
  expectedDeliverables: string[];
  suggestedTech: string[];
  evaluationPointers: string[];
  industryPartner?: string;
}

export interface TeamMember {
  name: string;
  email: string;
  role?: string;
}

export interface TeamRegistration {
  id: string; // e.g. MINT-2026-4821
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  contactNumber: string;
  institution: string;
  state: string;
  city: string;
  memberCount: number;
  members: TeamMember[];
  category: ChallengeCategory;
  projectTitle: string;
  projectDescription: string;
  agreedToRules: boolean;
  status: 'Registered' | 'Shortlisted' | 'Finalist' | 'Disqualified';
  createdAt: string;
}

export interface ProjectSubmission {
  id: string;
  registrationId: string;
  teamName: string;
  projectTitle: string;
  selectedCategory: ChallengeCategory;
  projectDescription: string;
  techStack: string[];
  repositoryUrl: string;
  demoVideoUrl: string;
  presentationUrl?: string;
  submittedAt: string;
  verified: boolean;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  teamName: string;
  projectTitle: string;
  institution: string;
  category: ChallengeCategory;
  preliminaryScore: number;
  semiFinalScore: number;
  finalScore: number;
  totalScore: number;
  status: 'In Review' | 'Shortlisted' | 'Grand Finalist' | 'Champion' | 'Runner Up';
  isSampleData: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'Urgent' | 'Deadline' | 'Workshop' | 'General' | 'Results';
  publishedAt: string;
  priority: 'high' | 'normal';
  author: string;
}

export interface EventTimelineItem {
  id: string;
  phase: string;
  title: string;
  dateString: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  isConfigurable: boolean;
}

export interface HackathonConfig {
  eventName: string;
  tagline: string;
  eventDate: string; // ISO date for countdown
  registrationOpen: boolean;
  submissionsOpen: boolean;
  totalPrizePool: string;
  demoModeActive: boolean;
}
