import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { Session } from '../../types';
import { useJourney } from '../../context/JourneyContext';

interface SessionCardProps {
  session: Session;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const { records, unlockedSessions, requestUnlock, openSessionWorkspace } = useJourney();

  const isUnlocked = unlockedSessions.includes(session.n);
  const record = records.find(r => Number(r.session_number) === session.n);
  const status = isUnlocked ? (record?.status || 'Not Started') : 'Locked';

  let cardClasses = 'session-card rounded-2xl border-2 border-slate-100 bg-white p-5 shadow-sm flex flex-col justify-between';
  if (!isUnlocked) {
    cardClasses += ' bg-slate-50 opacity-95';
  } else if (status === 'Completed') {
    cardClasses += ' completed';
  } else if (status === 'In Progress') {
    cardClasses += ' in-progress';
  }

  const handleAction = () => {
    if (isUnlocked) {
      openSessionWorkspace(session.n);
    } else {
      requestUnlock(session.n);
    }
  };

  return (
    <article className={cardClasses}>
      <div>
        <div className="flex items-start justify-between">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-cream font-bold text-ink text-sm shadow-sm">
            0{session.n}
          </span>
          <span className="text-3xl select-none" role="img" aria-label={session.title}>
            {session.icon}
          </span>
        </div>

        <h3 className="mt-4 font-bold text-ink text-base leading-snug font-display">
          {session.title}
        </h3>

        <p className="mt-2 text-xs text-slate-600 leading-relaxed min-h-[38px]">
          {session.desc}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
            !isUnlocked
              ? 'bg-slate-200 text-slate-600'
              : status === 'Completed'
              ? 'bg-mint/20 text-emerald-800'
              : status === 'In Progress'
              ? 'bg-sun/30 text-amber-900'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          {!isUnlocked ? '🔒 Locked' : status}
        </span>

        <button
          type="button"
          onClick={handleAction}
          className={`rounded-xl px-3 py-2 text-xs font-bold text-white transition flex items-center gap-1 ${
            !isUnlocked
              ? 'bg-slate-400 hover:bg-slate-500'
              : 'bg-ink hover:bg-navy shadow'
          }`}
        >
          {!isUnlocked ? (
            <>
              <Lock className="h-3 w-3" /> Unlock
            </>
          ) : (
            <>
              Open <ArrowRight className="h-3 w-3" />
            </>
          )}
        </button>
      </div>
    </article>
  );
};
