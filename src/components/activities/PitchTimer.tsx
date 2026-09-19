import React, { useState, useEffect, useRef } from 'react';

interface PitchTimerProps {
  onTimeEnd?: () => void;
}

export const PitchTimer: React.FC<PitchTimerProps> = ({ onTimeEnd }) => {
  const [seconds, setSeconds] = useState<number>(60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (isRunning && seconds > 0) {
      timerId = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else if (seconds === 0 && isRunning) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsRunning(false);
      onTimeEnd?.();
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRunning, seconds, onTimeEnd]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(60);
  };

  const minutesStr = Math.floor(seconds / 60);
  const secondsStr = String(seconds % 60).padStart(2, '0');

  return (
    <div className="rounded-2xl bg-[#fff0ee] p-5 border border-rose-100 space-y-4">
      <div>
        <p className="font-bold text-ink">Pitch Starter</p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 italic">
          “Hello, my name is… The problem I noticed is… My idea is… My idea helps… What makes my idea special is… My next step is…”
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <div 
          className="timer-dial relative grid h-20 w-20 shrink-0 place-items-center rounded-full shadow-inner"
          style={{ '--timer': seconds } as React.CSSProperties}
        >
          <strong className="relative z-10 text-xl font-bold text-ink">
            {minutesStr}:{secondsStr}
          </strong>
        </div>

        <div className="flex flex-wrap gap-2">
          {!isRunning ? (
            <button
              type="button"
              onClick={handleStart}
              className="rounded-xl bg-navy px-4 py-2.5 text-sm font-bold text-white shadow transition hover:opacity-90"
            >
              {seconds < 60 ? 'Resume' : 'Start Timer'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePause}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-sm transition hover:bg-slate-50"
            >
              Pause
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-sm transition hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
