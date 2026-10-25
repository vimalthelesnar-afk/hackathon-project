/**
 * MINT API Service
 * Connects to the full-stack Express server (/api/*) with seamless local resilience fallback.
 */

import {
  HackathonConfig,
  LeaderboardEntry,
  Announcement,
  TeamRegistration,
  ProjectSubmission,
} from '../types';
import {
  INITIAL_CONFIG,
  INITIAL_LEADERBOARD,
  INITIAL_ANNOUNCEMENTS,
} from '../data/mockData';

const TOKEN_KEY = 'mint_admin_token';

export const api = {
  // Config
  async getConfig(): Promise<HackathonConfig> {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    const cached = localStorage.getItem('mint_config');
    return cached ? JSON.parse(cached) : INITIAL_CONFIG;
  },

  async updateConfig(token: string, updates: Partial<HackathonConfig>): Promise<{ success: boolean; config: HackathonConfig }> {
    try {
      const res = await fetch('/api/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        return await res.json();
      }
      const data = await res.json();
      throw new Error(data.error || 'Failed to update configuration');
    } catch (err: any) {
      // Offline fallback
      const current = await this.getConfig();
      const updated = { ...current, ...updates };
      localStorage.setItem('mint_config', JSON.stringify(updated));
      return { success: true, config: updated };
    }
  },

  // Announcements
  async getAnnouncements(): Promise<Announcement[]> {
    try {
      const res = await fetch('/api/announcements');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    const cached = localStorage.getItem('mint_announcements');
    return cached ? JSON.parse(cached) : INITIAL_ANNOUNCEMENTS;
  },

  async addAnnouncement(token: string, payload: { title: string; content: string; category: string; priority: string }): Promise<Announcement> {
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create announcement');
    }
    const data = await res.json();
    return data.announcement;
  },

  async deleteAnnouncement(token: string, id: string): Promise<boolean> {
    const res = await fetch(`/api/announcements/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.ok;
  },

  // Registrations
  async registerTeam(payload: Omit<TeamRegistration, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; registrationId: string; registration: TeamRegistration }> {
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      return data;
    } catch (err: any) {
      if (err.message && !err.message.includes('fetch')) {
        throw err;
      }
      // If backend offline, persist to local demo storage
      const id = `MINT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newReg: TeamRegistration = {
        ...payload,
        id,
        status: 'Registered',
        createdAt: new Date().toISOString(),
      };
      const existingStr = localStorage.getItem('mint_local_registrations');
      const list: TeamRegistration[] = existingStr ? JSON.parse(existingStr) : [];
      list.unshift(newReg);
      localStorage.setItem('mint_local_registrations', JSON.stringify(list));
      return { success: true, registrationId: id, registration: newReg };
    }
  },

  async verifyRegistration(idOrEmail: string): Promise<any> {
    const res = await fetch(`/api/registrations/verify/${encodeURIComponent(idOrEmail)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Registration ID not found');
    }
    return await res.json();
  },

  async getAdminRegistrations(token: string): Promise<TeamRegistration[]> {
    const res = await fetch('/api/registrations', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch registrations');
    }
    return await res.json();
  },

  async updateRegistrationStatus(token: string, id: string, status: string): Promise<boolean> {
    const res = await fetch(`/api/registrations/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return res.ok;
  },

  // Submissions
  async submitProject(payload: {
    registrationId: string;
    projectTitle: string;
    selectedCategory: string;
    projectDescription: string;
    techStack: string[];
    repositoryUrl: string;
    demoVideoUrl: string;
    presentationUrl?: string;
  }): Promise<{ success: boolean; submissionId: string; submission: ProjectSubmission }> {
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Project submission failed');
    }
    return data;
  },

  async getAdminSubmissions(token: string): Promise<ProjectSubmission[]> {
    const res = await fetch('/api/submissions', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch submissions');
    }
    return await res.json();
  },

  // Leaderboard
  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const res = await fetch('/api/leaderboard');
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // Fallback
    }
    const cached = localStorage.getItem('mint_leaderboard');
    return cached ? JSON.parse(cached) : INITIAL_LEADERBOARD;
  },

  async updateLeaderboardEntry(token: string, id: string, updates: Partial<LeaderboardEntry>): Promise<LeaderboardEntry> {
    const res = await fetch(`/api/leaderboard/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update score');
    }
    const data = await res.json();
    return data.entry;
  },

  // Admin Auth
  async adminLogin(password: string): Promise<{ success: boolean; token: string }> {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Authentication rejected');
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },

  getStoredToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  adminLogout(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Contact
  async sendContactMessage(payload: { name: string; email: string; subject: string; message: string }): Promise<{ success: boolean; message: string; ticketId: string }> {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Message dispatch failed');
    }
    return data;
  },
};
