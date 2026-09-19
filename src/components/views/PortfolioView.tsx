import React from 'react';
import { useJourney } from '../../context/JourneyContext';

export const PortfolioView: React.FC = () => {
  const { records, openSessionWorkspace, sessions } = useJourney();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 space-y-9 animate-fadeIn">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[.18em] text-coral">Your Project Folder</p>
        <h1 className="font-display mt-2 text-3xl sm:text-4xl font-bold text-ink">
          My Kidpreneur Portfolio
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600 text-sm sm:text-base">
          Every saved session adds another page to your entrepreneurial story.
        </p>
      </div>

      <div className="portfolio-book rounded-[2rem] p-6 shadow-xl sm:p-10 border border-amber-200">
        <div className="grid gap-4 md:grid-cols-2">
          {sessions.map(s => {
            const record = records.find(x => Number(x.session_number) === s.sessionNumber);
            const isCompleted = record?.status === 'Completed';
            const hasNotes = Boolean(record?.notes || record?.reflection);

            return (
              <button
                key={s.sessionNumber}
                type="button"
                onClick={() => openSessionWorkspace(s.sessionNumber)}
                className={`flex items-start gap-4 rounded-2xl bg-white p-5 text-left shadow-sm border border-slate-200/80 transition hover:-translate-y-0.5 hover:shadow-md ${
                  isCompleted ? 'border-mint' : ''
                }`}
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl text-2xl font-bold ${
                    isCompleted ? 'bg-mint text-navy' : 'bg-cream text-ink'
                  }`}
                >
                  {isCompleted ? '✓' : s.icon}
                </span>

                <div>
                  <strong className="block text-ink font-bold text-base font-display">
                    {s.sessionNumber}. {s.title}
                  </strong>

                  <span className="mt-1 block text-xs text-slate-500">
                    {isCompleted
                      ? 'Completed & saved in journey'
                      : hasNotes
                      ? 'In progress (notes saved)'
                      : 'Complete this session to add page'}
                  </span>

                  {record?.notes && (
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed italic border-l-2 border-slate-200 pl-3">
                      &quot;{record.notes}&quot;
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
