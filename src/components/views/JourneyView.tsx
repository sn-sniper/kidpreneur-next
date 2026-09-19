import React from 'react';
import { useJourney } from '../../context/JourneyContext';
import { SessionCard } from '../common/SessionCard';
import { ProgressRing } from '../common/ProgressRing';

export const JourneyView: React.FC = () => {
  const { records, sessions } = useJourney();

  const completedCount = records.filter(r => r.status === 'Completed').length;
  const totalSessions = sessions.length || 15;
  const progressPercent = Math.min(100, Math.round((completedCount / totalSessions) * 100));

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 space-y-9 animate-fadeIn">
      {/* Dashboard Banner */}
      <div className="rounded-4xl bg-ink p-7 text-white shadow-xl sm:p-10 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.16em] text-sun">My Journey Dashboard</p>
            <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-white">
              Small steps. Bright ideas.
            </h1>
            <p className="mt-2 text-slate-300 text-sm sm:text-base">
              Open a session, save your thinking, then celebrate your progress.
            </p>
          </div>

          <ProgressRing completedCount={completedCount} totalCount={totalSessions} />
        </div>

        {/* Horizontal Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
            <span>Overall Progress</span>
            <span>{progressPercent}% Completed</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-mint transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {sessions.map(session => (
          <SessionCard key={session.sessionNumber} session={{
            n: session.sessionNumber,
            title: session.title,
            desc: session.description,
            objective: session.objective,
            icon: session.icon,
            intro: '',
            challenge: '',
            reflection: '',
            action: ''
          }} />
        ))}
      </div>
    </div>
  );
};
