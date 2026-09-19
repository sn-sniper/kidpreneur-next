import React from 'react';
import { useJourney } from '../../context/JourneyContext';
import { SessionCard } from '../common/SessionCard';

export const SessionsView: React.FC = () => {
  const { setActiveView, sessions } = useJourney();

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 space-y-8 animate-fadeIn">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">The Full Journey</p>
          <h1 className="font-display mt-1 text-3xl sm:text-4xl font-bold text-ink">
            Choose Your Next Adventure
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setActiveView('journey')}
          className="rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white shadow hover:bg-navy transition"
        >
          View My Progress
        </button>
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
