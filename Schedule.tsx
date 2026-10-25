import React from 'react';
import { Calendar, Clock, Download, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { INITIAL_TIMELINE } from '../data/mockData';
import { EventTimelineItem } from '../types';

export const Schedule: React.FC = () => {
  const downloadIcsCalendar = () => {
    // Generate clean .ics format
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MINT National Hackathon//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:MINT 2026 Hackathon Milestones',
      ...INITIAL_TIMELINE.map((item, idx) => {
        return [
          'BEGIN:VEVENT',
          `UID:mint-2026-phase-${idx}@minthackathon.org`,
          `SUMMARY:MINT 2026: ${item.title}`,
          `DESCRIPTION:${item.description}`,
          'STATUS:CONFIRMED',
          'END:VEVENT',
        ].join('\r\n');
      }),
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'MINT_2026_Hackathon_Schedule.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="schedule" className="py-20 bg-[#050811] tech-grid-pattern border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
              <span>COMPETITION ROADMAP</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>7 CRITICAL PHASES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Event Timeline.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300">
              Structured national progression from track selection to the 36-hour Grand Finale and national jury presentations.
            </p>
          </div>

          <button
            onClick={downloadIcsCalendar}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/40 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add to Calendar (.ics)</span>
          </button>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-4">
          {INITIAL_TIMELINE.map((item, idx) => {
            const isCompleted = item.status === 'completed';
            const isCurrent = item.status === 'current';

            return (
              <div
                key={item.id}
                className={`glass-card rounded-xl p-5 sm:p-6 border transition-all ${
                  isCurrent
                    ? 'border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                    : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      ) : isCurrent ? (
                        <div className="w-7 h-7 rounded-full bg-emerald-400 text-[#050811] flex items-center justify-center font-mono font-bold text-xs">
                          {idx + 1}
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 font-mono text-xs">
                          {idx + 1}
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-emerald-400 font-semibold">{item.phase}</span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-400">{item.dateString}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white mt-1">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="self-start md:self-center shrink-0">
                    <span className="text-[11px] font-mono text-slate-400">
                      {isCurrent ? 'Phase Active' : isCompleted ? 'Completed' : 'Upcoming Stage'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center text-xs text-slate-500 font-mono">
          * Milestone schedule dates are subject to advisory updates by the National Scrutiny Board.
        </div>
      </div>
    </section>
  );
};
