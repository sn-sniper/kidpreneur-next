import React from 'react';
import { useJourney } from '../../context/JourneyContext';

export const Toast: React.FC = () => {
  const { toasts } = useJourney();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex w-[min(92%,440px)] -translate-x-1/2 flex-col gap-2 pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="pointer-events-auto rounded-2xl bg-ink px-5 py-4 text-center font-semibold text-white shadow-2xl transition-all duration-350 border border-slate-700 animate-slideUp"
          role="status"
          aria-live="polite"
        >
          {toast.text}
        </div>
      ))}
    </div>
  );
};
