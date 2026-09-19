import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

export const UnlockModal: React.FC = () => {
  const { unlockModalOpen, unlockTargetSession, closeUnlockModal, submitUnlockCode } = useJourney();
  const [code, setCode] = useState('');

  if (!unlockModalOpen || !unlockTargetSession) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitUnlockCode(code);
    if (success) {
      setCode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-3xl bg-ink p-8 shadow-2xl text-white border border-slate-700">
        <button
          type="button"
          onClick={closeUnlockModal}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sun/20 text-sun mb-3">
            <Lock className="h-6 w-6" />
          </div>
          <p className="font-bold uppercase tracking-[.16em] text-sun text-xs">Unlock Session {unlockTargetSession}</p>
          <h2 className="mt-2 text-2xl font-bold font-display">Enter Unlock Code</h2>
          <p className="mt-2 text-xs text-slate-300">
            Ask your course facilitator for the unlock code during your live session.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="unlock-code" className="sr-only">Unlock code</label>
          <input
            id="unlock-code"
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            className="w-full rounded-xl border-2 border-mint bg-white p-3.5 text-center text-lg font-bold uppercase tracking-widest text-ink placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-mint/30"
            placeholder={`E.g., SPARK${unlockTargetSession}`}
            maxLength={10}
            autoFocus
          />

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={closeUnlockModal}
              className="flex-1 rounded-xl border border-slate-600 px-4 py-3 font-bold text-slate-300 hover:bg-white/10 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-xl bg-mint px-4 py-3 font-bold text-navy shadow-lg hover:bg-mint/90 transition"
            >
              Unlock
            </button>
          </div>
        </form>

        <p className="mt-4 text-center text-[11px] text-slate-400">
          Tip: Passcodes are formatted like SPARK1, SPARK2, etc.
        </p>
      </div>
    </div>
  );
};
