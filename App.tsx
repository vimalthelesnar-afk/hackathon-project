import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Challenges } from './components/Challenges';
import { RegistrationSection } from './components/RegistrationSection';
import { SubmissionSection } from './components/SubmissionSection';
import { Leaderboard } from './components/Leaderboard';
import { Schedule } from './components/Schedule';
import { Announcements } from './components/Announcements';
import { FaqContact } from './components/FaqContact';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { HackathonConfig, ChallengeCategory } from './types';
import { INITIAL_CONFIG } from './data/mockData';
import { api } from './services/api';

export default function App() {
  const [config, setConfig] = useState<HackathonConfig>(INITIAL_CONFIG);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState<ChallengeCategory | null>(null);
  const [prefilledRegId, setPrefilledRegId] = useState<string>('');
  const [activeSection, setActiveSection] = useState('hero');

  // Load config on startup
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const c = await api.getConfig();
        setConfig(c);
      } catch (err) {
        console.error('Failed to load initial config:', err);
      }
    };
    loadConfig();
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'challenges', 'schedule', 'leaderboard', 'submissions', 'faq'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenRegister = () => {
    const el = document.getElementById('register');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreChallenges = () => {
    const el = document.getElementById('challenges');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryForRegistration = (category: ChallengeCategory) => {
    setPreselectedCategory(category);
    handleOpenRegister();
  };

  const handleNavigateToSubmissions = (registrationId: string) => {
    setPrefilledRegId(registrationId);
    const el = document.getElementById('submissions');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenRegister={handleOpenRegister}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Landing & Countdown */}
        <Hero
          config={config}
          onRegisterClick={handleOpenRegister}
          onExploreChallenges={handleExploreChallenges}
        />

        {/* 2. Announcements & Notifications */}
        <Announcements />

        {/* 3. About MINT */}
        <About />

        {/* 4. Challenge Areas & Problem Statements */}
        <Challenges
          onSelectCategoryForRegistration={handleSelectCategoryForRegistration}
        />

        {/* 5. Team Registration Form */}
        <RegistrationSection
          preselectedCategory={preselectedCategory}
          onNavigateToSubmissions={handleNavigateToSubmissions}
        />

        {/* 6. Event Schedule & Timeline */}
        <Schedule />

        {/* 7. Competition Leaderboard */}
        <Leaderboard />

        {/* 8. Deliverable Submissions */}
        <SubmissionSection initialRegistrationId={prefilledRegId} />

        {/* 9. Contact & FAQ */}
        <FaqContact />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRegister={handleOpenRegister}
      />

      {/* Protected Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onConfigUpdated={(newCfg) => setConfig(newCfg)}
      />
    </div>
  );
}
