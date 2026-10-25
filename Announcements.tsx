import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Calendar, Award, Sparkles, Filter, RefreshCw } from 'lucide-react';
import { Announcement } from '../types';
import { api } from '../services/api';

export const Announcements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const data = await api.getAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      console.error('Failed to load announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const filtered = announcements.filter((item) => {
    if (categoryFilter === 'all') return true;
    return item.category.toLowerCase() === categoryFilter.toLowerCase();
  });

  return (
    <section id="announcements" className="py-20 bg-[#070B18] border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>DISPATCH & NOTIFICATIONS</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>OFFICIAL MINT BULLETIN</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Announcements & Alerts.
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Official circulars covering deadline notices, workshop schedules, sandbox credentials, and jury scrutiny updates.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs overflow-x-auto shrink-0">
            {['all', 'urgent', 'deadline', 'workshop', 'results'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 font-medium rounded-md capitalize cursor-pointer transition-colors ${
                  categoryFilter === cat
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Announcement Feed */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-slate-400 font-mono text-xs">
              Loading bulletin notifications...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No circulars found in this category.
            </div>
          ) : (
            filtered.map((item) => {
              const isUrgent = item.category === 'Urgent' || item.priority === 'high';

              return (
                <div
                  key={item.id}
                  className={`glass-card rounded-xl p-5 sm:p-6 border transition-all ${
                    isUrgent
                      ? 'border-rose-500/30 bg-rose-950/10'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className={isUrgent ? 'text-rose-400 font-bold' : 'text-emerald-400 font-semibold'}>
                        {item.category.toUpperCase()}
                      </span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400">
                        {new Date(item.publishedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <span className="text-slate-500">
                      Author: {item.author}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
