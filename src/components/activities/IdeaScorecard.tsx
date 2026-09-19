import React, { useState } from 'react';

interface IdeaScorecardProps {
  initialActive?: number[];
  onChange?: (activeIndices: number[]) => void;
}

const CRITERIA = [
  'Is it useful?',
  'Is it creative?',
  'Can I explain it?',
  'Can I develop it?',
  'Will someone benefit?'
];

export const IdeaScorecard: React.FC<IdeaScorecardProps> = ({ initialActive = [], onChange }) => {
  const [activeIndices, setActiveIndices] = useState<number[]>(initialActive);

  const toggleCriterion = (index: number) => {
    const next = activeIndices.includes(index)
      ? activeIndices.filter(i => i !== index)
      : [...activeIndices, index];
    setActiveIndices(next);
    onChange?.(next);
  };

  return (
    <div className="rounded-2xl bg-cream p-5 border border-amber-100">
      <div className="flex items-center justify-between">
        <p className="font-bold text-ink">Idea Scorecard</p>
        <span className="rounded-full bg-sun/30 px-3 py-1 text-sm font-bold text-ink">
          {activeIndices.length} / {CRITERIA.length}
        </span>
      </div>
      <div className="mt-4 grid gap-2">
        {CRITERIA.map((criterion, idx) => {
          const isActive = activeIndices.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => toggleCriterion(idx)}
              className={`rounded-xl border-2 p-3 text-left font-semibold transition-all ${
                isActive
                  ? 'border-navy bg-navy text-white shadow-sm'
                  : 'border-slate-200 bg-white text-ink hover:border-sun'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{criterion}</span>
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isActive ? 'Yes (+1)' : 'Tap to test'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
